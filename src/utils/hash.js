const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateHash = plainTextPassword => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainTextPassword, saltRounds, 
      (err, hash) => {
        if(err) {
          //failure
          reject(err);
        } else {
          //success
          resolve(hash);
        }
      })
  });
};

const generateHashSync = plainTextPassword => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

const compareHash = (plainTextPassword, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, passwordHash, 
      (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  });
};

exports.generateHash = generateHash;
exports.compareHash = compareHash;
exports.generateHashSync = generateHashSync;