module.exports = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = err.message
  // let message = "Internal Server Error";
  switch (err.name) {
    case "Missing Token":
      status = 400;
      message = "Access Token is missing!";
      break;

    case "Invalid Token":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;

    case "Not Found":
      status = 404;
      message = "Data not Found!";
      break;

    case "Not Found":
      status = 404;
      message = "Data not Found!";
      break;

    case "Forbidden":
      status = 403;
      message = "You have no permission!";
      break;

    case "Forbidden":
      status = 403;
      message = "You have no permission!";
      break;

    case "SequelizeUniqueConstraintError":
      status = 400;
      if (err.errors[0].message === "email must be unique") {
        message = "Email is Already Registered";
      } else {
        message = err.errors[0].message;
      }
      break;

    case "Bad Request":
      status = 401;
      message = "Email or Password is Invalid";
      break;

    case "Unauthorized":
      status = 401;
      message = "Username or Password is incorrect";
      break;

    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;

    case "Duplicate":
      status = 401;
      message = "Already Bookmarked";
      break;
    default:
      break;
  }

  res.status(status).json({ message });
};
