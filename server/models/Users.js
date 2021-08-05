const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      deafult: "https://image.flaticon.com/icons/png/512/64/64572.png",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("users", UsersSchema);
module.exports = User;
