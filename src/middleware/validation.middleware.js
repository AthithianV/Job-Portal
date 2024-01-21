/*Validation Request: Sets rules for the date collected from form and throws error accordingly. */

import { body, validationResult } from "express-validator";
import JobsModel from "../model/jobs.model.js";

const validateRequest = async (req, res, next) => {
  // 1. set up rules
  const rules = [
    // if the category is "select job category" which means category is not selected, so the error "Job category must be selected".
    body("category")
      .trim()
      .custom((value, { req }) => {
        if (req.body.category == "Select Job category") {
          throw new Error("Job category must be selected");
        }
        return true;
      }),

    // designation from body is checked if it is set to "Select job Desgination" if yes error is throw,
    body("designation").custom((value, { req }) => {
      if (req.body.designation == "Select Job Designation") {
        throw new Error("Job Designation must be selected");
      }
      return true;
    }),

    // Deadline is checked if it is set to today's date or anu previous date, if yes throws error message.
    body("deadline").custom((value, { req }) => {
      const today = new Date().toISOString();
      const applyBy = req.body.deadline;
      if (applyBy <= today) {
        throw new Error("Apply by date should be greater than posted date");
      }
      return true;
    }),

    // Openings is checked if its value is 0 or lesser, then error message is throw.
    body("openings").custom((value, { req }) => {
      if (Number(req.body.openings) < 1) {
        throw new Error("There should be atleast one position");
      }
      return true;
    }),

    // Skills must have aleast one skill in it.
    body("skills").custom((value, { req }) => {
      if (req.body.skills.length == 0) {
        throw new Error("Atleast one skill must be selected");
      }
      return true;
    }),
  ];

  //2. Run each rule.
  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  // If validation errors is not empty then updateJob  or postNewjob page is render accordingly with error msg.
  if (!validationErrors.isEmpty()) {
    if (req.body.updated) {
      const job = JobsModel.getJobByID(req.params.id);
      return res.render("updateJob", {
        job: job,
        errors: validationErrors.array()[0].msg,
      });
    }
    return res.render("postNewJob", {
      errors: validationErrors.array()[0].msg,
    });
  }
  next();
};

export default validateRequest;
