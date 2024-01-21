/*Import nodemailer, Creates transporter, creates mailoptions and send mail. */

import nodemailer from "nodemailer";

/*Transporter is created, with service gmail and auth */
const sendMail = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "athithianv@gmail.com",
      pass: "spshjvmposizkqdn",
    },
  });

  /*Mailoptions sets from mail, to mail, subject and body */
  const mailOption = {
    from: "athithianv@gmail.com",
    to: req.body.email,
    subject: "Job Application Received",
    text: "Job Application Confirmation \n Dear User, \n Thank you for applying to a job at Easily. We have received your application and are currently reviewing it.\nIf your qualifications match our requirements, we will contact you for the next steps of the selection process.\nThank you for your interest in joining our team!\nBest regards,\nThe Easily Team",
  };

  /*sendMail method from transporter is call with mail opotion */
  try {
    const result = await transporter.sendMail(mailOption);
  } catch (err) {
    console.error(err);
  }
  next();
};

// Send Mail function is exported.
export default sendMail;
