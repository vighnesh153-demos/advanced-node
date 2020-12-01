const mongoose = require("mongoose");

console.log("**********************");
console.log("Tearing down...");
console.log("**********************");

module.exports = async () => {
  await mongoose.disconnect();
};
