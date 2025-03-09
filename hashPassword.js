const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("Hashed Password:", hashedPassword);
  return hashedPassword;
}

const hashedPassword = hashPassword("123321");

// hemşire, doktor, admin eklenebilir

hashedPassword.then((result) => {
  console.log(result);
});
