import express from "express";
import ejsLayouts from "express-ejs-layouts";
import MainController from "./src/controller/main.controller.js";
import path from "path";
import RecruiterController from "./src/controller/recruiter.controller.js";
import session from "express-session";
import auth from "./src/middleware/auth.middleware.js";
import validateRequest from "./src/middleware/validation.middleware.js";
import uploadFile from "./src/middleware/fileUpload.middleware.js";
import sendMail from "./src/middleware/sendMail.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/setLastVisit.middle.js";
import { authDeleteUpdate } from "./src/middleware/authDeleteUpdate.middleware.js";

// Creates Server.
const server = express();
const mainController = new MainController();
const recruiterController = new RecruiterController();

server.use(express.static("public"));
server.use(cookieParser());
server.use(setLastVisit);
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(ejsLayouts);

// Sets up EJS Layout and view engine(EJS)
server.set("view engine", "ejs");
server.set("views", path.resolve("src", "views"));

// Get Methods
server.get("/", mainController.getMainPage);
server.get("/jobs", mainController.getJobsPage);
server.get("/login", recruiterController.getLoginPage);
server.get("/register", recruiterController.getRegisterPage);
server.get("/logout", recruiterController.logout);
server.get("/postNewJob", auth, mainController.getPostNewJobPage);

server.get("/job/:id", mainController.getJobDetails);
server.get("/deleteJob/:id", mainController.deleteJob);
server.get("/updateJob/:id", mainController.updateJob);
server.get("/apply/:id", mainController.getApplication);
server.get(
  "/applicants/:id",
  authDeleteUpdate,
  mainController.getApplicantsPage
);

server.post("/register", recruiterController.postRegister);
server.post("/login", recruiterController.postLogin);
server.post("/postNewJob", validateRequest, mainController.postNewJob);
server.post("/update", validateRequest, mainController.postUpdateJob);
server.post("/search", mainController.search);

server.post(
  "/apply",
  uploadFile.single("resume"),
  sendMail,
  mainController.postApplication
);

server.listen(3000, () => {
  console.log("Server listening at port 3000");
});
