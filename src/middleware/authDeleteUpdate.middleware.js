import JobsModel from "../model/jobs.model.js";

export const authDeleteUpdate = (req, res, next) => {
  const job = JobsModel.getJobByID(req.params.id);

  if (!req.session.user) {
    res.send("This action can be performed only by recruiters");
    res.render("oops", {
      msg: "This action can be performed only by recruiters",
    });
  } else if (req.session.user.email != job.postedBy) {
    // res.send(
    //   "Posts can only be updated, deleted or View applicants by the recruiter who created it."
    // );
    res.render("oops", {
      msg: "Posts can only be updated, deleted or View applicants by the recruiter who created it.",
    });
  } else {
    next();
  }
};
