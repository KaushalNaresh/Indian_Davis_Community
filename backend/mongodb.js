const mongoose = require("mongoose");

const connectdb = () =>
    mongoose
    .connect("mongodb://127.0.0.1:27017/Indian_Davis_Community", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch(console.error);

module.exports = connectdb;
