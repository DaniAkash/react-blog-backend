const jwt = require("jsonwebtoken");

const adminTokenGenerator = ({
  email = "",
} = {}) => {
  const token = jwt.sign({
    sub: "admin",
    email,
  },
  process.env.JWT_KEY,
  {
    expiresIn: "3 hours"
  });
  return token;
};

const adminTokenValidator = (token = "") => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    return data;
  } catch(e) {
    console.error(e);
    return false;
  }
}

exports.adminTokenGenerator = adminTokenGenerator;
exports.adminTokenValidator = adminTokenValidator;