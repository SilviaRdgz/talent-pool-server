const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  
  imageUrl: String,
  name: String,
  about: String,
  role: String,
  email: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
