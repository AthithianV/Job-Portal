/* setLastVisit: checks if request contains lastvisit in cookies, if yes set date current date to locals as res. Then set current date as lastVisist in cookie.*/

export const setLastVisit = (req, res, next) => {
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 100,
  });
  next();
};
