About Website:
Job website portal that allows recruiter to post and manage job listings and provides a user friendly platform for job seekers to find and apply for suitable roles.

Contollers:

    1. MainContorller Class: This class controller handle the request and response regarding the jobs page rendering, Individual job details Rendering, posting a new job, updating a new job, deleting job, rendring job application, applying job.

    Methods:
        1. getMainPage(req, res, next): Handles Route request, renders the index page on response.

        2. getJobPage(req, res, next): Handles /jobs request, renders the jobs page on response.

        3. getPostNewPage(req, res, next): Handles /postNewJob request, renders the postNewJob page on response.

        4. postNewJob(req, res, next): Handles /postNewJob post request, add the req.body to the JobModel and renders the jobs page on response.

        5.getJobDetails(req, res, next): Handles /jod/:id get request, it get the job with id from JobModel if job not available, renders the oops page with message:"Job not available" on response.else jobPage(contains details of the job) is rendered.

        6. deleteJob(req, res, next): Handles /deleteJob get request, calls deleteJob function in JobModel which deletes the job with paticular id. When job is not found, oops page is render else redirected to jobs page

        7. updateJob(req, res, next): Handles /updateJob get request, it gets the job from jobModel, if job not found oops page is rendered. Else, update form is render for the particular job.

        8. postUpdateJob(req, res, next): Handles /postUpdateJob post request, it creates a new instance of JobModel class with req.body, the this new instance is replaced with the old job details with help of id.

        9. getApplication(req, res, next): Handles /apply/:id get request, gets the job with id from jobModel and render the application form for the job

        10. postApplication(req, res, next): Handles /apply post request, sets the remuseUrl from the resume directory append file name to it, add the applicant details to applicant model, add email to the jobmodel as applicant

        11. getApplicantsPage(req, res, next): Handles /applicants/:id get request, gets the applicat of the particualr job and render the details of the applicant in a table form.


    2. Recruiter Controller: This class, handles the request for login, logout and registers

    Methods:
        1. getRegisterPage(req, res, next): Handles /register get Request, renders the register page.

        2. postLogin(req, res, next): Handles /login post Request, checks the recruit model to check if the request email and password are in recruiter model, if present, the jobs page is render, if not appropriate error message is displayed in login page.

        3. postRegister(req, res, next): Handles /register post Request, adds the req.body to the RecruiterModel class and Renders the login page.

        4. logout(req, res, next): Handles /logout get Request, destroy the session, and clears cookie.

MiddleWares: Contains middlewares.

    1. auth(req, res, next): It provides authorization, i.e., if the user is logged in, he gets access to certain pages, if not oops page is rendered

    2. fileUpload: Imports multer, sets up storage configuration, destiation is set to public/resumes and multer sets with storage config and a limit of 5 mb.

    3. sendMail: Import nodemailer, Creates transporter, creates mailoptions and send mail.

    4. setLastVisit: checks if request contains lastvisit in cookies, if yes set date current date to locals as res. Then set current date as lastVisist in cookie.

    5. Validation Request: Sets rules for the date collected from form and throws error accordingly.

Models: Contains recruiter model, applicant and Job model
