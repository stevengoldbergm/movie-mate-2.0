// Temporary placeholder to allow testing routes
const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!true) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;