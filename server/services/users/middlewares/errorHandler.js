module.exports = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "BSONTypeError":
      status = 404;
      message = "User not found";
      break;

    case "Email Empty":
      status = 400;
      message = "Email is required";
      break;

    case "Password Empty":
      status = 400;
      message = "Password is required";
      break;

    case "Invalid Email Format":
      status = 400;
      message = "Invalid email format";
      break;

    case "Invalid Password Length":
      status = 400;
      message = "Minimum password is 8 characters";
      break;

    case "Unique Email Constraint":
      status = 400;
      message = "Email must be unique";
      break;
  }

  res.status(status).json({ message });
};
