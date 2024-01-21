import RecruiterModel from "../model/recruiter.model.js";
import JobsModel from "../model/jobs.model.js";

/*Recruiter Controller: This class, handles the request for login, logout and registers*/

export default class RecruiterController {
  /*getLoginPage(req, res, next): Handles /login get Request, renders the login page.*/
  getLoginPage(req, res, next) {
    if (req.session.user) {
      return res.render("jobs", {
        jobs: JobsModel.getAll(),
        user: req.session.user,
      });
    }
    res.render("login", {
      status: null,
      msg: null,
    });
  }

  /*getRegisterPage(req, res, next): Handles /register get Request, renders the register page.*/
  getRegisterPage(req, res, next) {
    res.render("register");
  }

  /*postLogin(req, res, next): Handles /login post Request, checks the recruit model to check if the request email and password are in recruiter model, if present, the jobs page is render, if not appropriate error message is displayed in login page*/
  postLogin(req, res, next) {
    const recruiter = req.body;
    const found = RecruiterModel.isValid(recruiter);
    if (!found) {
      res.render("oops", { msg: "User Not Found! Please Register" });
    } else if (found.password != recruiter.password) {
      res.render("login", { status: "danger", msg: "Invalid Password" });
    } else {
      req.session.user = { email: found.email, name: found.name };

      res.render("jobs", {
        jobs: JobsModel.getAll(),
        user: req.session.user,
      });
    }
  }

  /*postRegister(req, res, next): Handles /register post Request, adds the req.body to the RecruiterModel class and Renders the login page*/
  postRegister(req, res, next) {
    RecruiterModel.addNewRecruiter(req.body);
    res.render("login", {
      status: "success",
      msg: "Registration Successful!!!",
    });
  }

  /*logout(req, res, next): Handles /logout get Request, destroy the session, and clears cookie*/
  logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
    res.clearCookie();
  }
}
