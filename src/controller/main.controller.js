import JobsModel from "../model/jobs.model.js";
import ApplicantModel from "../model/applicant.model.js";

/*MainContorller Class:
This class controller handle the request and response regarding the jobs page rendering, Individual job details Rendering,
posting a new job, updating a new job, deleting job, rendring job application, applying job.  
 */
export default class MainController {
  /*getMainPage(req, res, next): Handles Route request, renders the index page on response.*/
  getMainPage(req, res, next) {
    res.render("index", { user: req.session.user });
  }

  /*getJobPage(req, res, next): Handles /jobs request, renders the jobs page on response.*/
  getJobsPage(req, res, next) {
    res.render("jobs", { jobs: JobsModel.getAll(), user: req.session.user });
  }

  /*getPostNewPage(req, res, next): Handles /postNewJob request, renders the postNewJob page on response.*/
  getPostNewJobPage(req, res, next) {
    res.render("postNewJob", { errors: null, user: req.session.user });
  }

  /*postNewJob(req, res, next): Handles /postNewJob post request, add the req.body to the JobModel and renders the jobs page on response.*/
  postNewJob(req, res, next) {
    req.body.postedBy = req.session.user.email;
    JobsModel.addJob(req.body);
    res.render("jobs", { jobs: JobsModel.getAll(), user: req.session.user });
  }

  /*getJobDetails(req, res, next): Handles /jod/:id get request, it get the job with id from JobModel
   if job not available, renders the oops page with message:"Job not available" on response.
   else jobPage(contains details of the job) is rendered. */
  getJobDetails(req, res, next) {
    const id = req.params.id;
    const job = JobsModel.getJobByID(id);
    if (!job) {
      return res.render("oops", {
        msg: "Job not available",
        user: req.session.user,
      });
    }
    res.render("jobPage", { job: job, user: req.session.user });
  }

  /*deleteJob(req, res, next): Handles /deleteJob get request, calls deleteJob function in JobModel which deletes the job with paticular id.
  When job is not found, oops page is render else redirected to jobs page*/
  deleteJob(req, res, next) {
    const id = req.params.id;
    const found = JobsModel.deleteJob(id);
    res.redirect("/jobs");
  }

  /*updateJob(req, res, next): Handles /updateJob get request, it gets the job from jobModel, if job not found oops page is rendered. 
  Else, update form is render for the particular job.*/
  updateJob(req, res, next) {
    const id = req.params.id;
    req.body.postedBy = req.session.user.email;
    const job = JobsModel.getJobByID(id);
    if (!job) {
      return res.render("oops", {
        msg: "Job not available",
        user: req.session.user,
      });
    }
    res.render("updateJob", { errors: null, job: job, user: req.session.user });
  }

  /*postUpdateJob(req, res, next): Handles /postUpdateJob post request, it creates a new instance of JobModel class with req.body, the this new instance is replaced with the old job details with help of id.*/
  postUpdateJob(req, res, next) {
    const updatedJob = JobsModel.createJob(req.body);
    JobsModel.replaceJob(updatedJob);
    res.render("jobs", { jobs: JobsModel.getAll(), user: req.session.user });
  }

  /*getApplication(req, res, next): Handles /apply/:id get request, gets the job with id from jobModel and render the application form for the job.*/
  getApplication(req, res, next) {
    const job = JobsModel.getJobByID(req.params.id);
    res.render("applyJob", { job: job, user: req.session.user });
  }

  /*postApplication(req, res, next): Handles /apply post request, sets the remuseUrl from the resume directory append file name to it, add the applicant details to applicant model, add email to the jobmodel as applicant.*/
  postApplication(req, res, next) {
    const { id, name, email, contact } = req.body;
    const resumeUrl = "resumes/" + req.file.filename;
    ApplicantModel.addApplicant(id, name, email, contact, resumeUrl);
    JobsModel.addApplicant(id, email);
    res.redirect("/job/" + id);
  }

  /*getApplicantsPage(req, res, next): Handles /applicants/:id get request, gets the applicat of the particualr job and render the details of the applicant in a table form.*/
  getApplicantsPage(req, res, next) {
    const id = req.params.id;
    const applicants = JobsModel.getApplicants(id);

    if (applicants.length == 0) {
      return res.render("oops", {
        msg: "No Applications Yet",
        user: req.session.user,
      });
    }
    const applicantsDetails = ApplicantModel.getApplicantsDetails(applicants);
    res.render("applicantsPage", {
      applicants: applicantsDetails,
      user: req.session.user,
    });
  }

  search(req, res, next) {
    const searchInput = req.body.keyword;
    const jobs = JobsModel.getMatches(searchInput);
    res.render("jobs", { jobs: jobs, user: req.session.user });
  }
}
