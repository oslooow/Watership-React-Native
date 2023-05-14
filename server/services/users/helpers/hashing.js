const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed
}

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password,hashedPassword)
}
module.exports = { hashPassword, comparePassword };