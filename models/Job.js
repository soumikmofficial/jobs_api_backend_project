const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company cannot be empty"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Position cannot be empty"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Must provide a job creator"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
