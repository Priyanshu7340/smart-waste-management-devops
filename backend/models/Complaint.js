const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  description: String,
  status: { type: String, default: "Pending" },
  image: String,
  latitude: String,
  longitude: String,
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", complaintSchema);
