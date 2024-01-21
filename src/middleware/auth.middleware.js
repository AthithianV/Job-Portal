/*auth(req, res, next): It provides authorization, i.e., if the user is logged in, he gets access to certain pages, if not oops page is rendered*/

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.render("oops", {
      msg: "Only Recruiter can view this page. Please Register/Login to Continue",
    });
  }
  next();
};

export default auth;
