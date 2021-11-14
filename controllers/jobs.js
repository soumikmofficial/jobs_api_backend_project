const asyncWrapper = require("../middlewares/asyncWrapper");

const getAllJobs = asyncWrapper(async (req, res) => {
  res.send("all jobs");
});
const getSingleJob = asyncWrapper(async (req, res) => {
  res.send("single jobs");
});
const updateJob = asyncWrapper(async (req, res) => {
  res.send("update job");
});
const deleteJob = asyncWrapper(async (req, res) => {
  res.send("delete job");
});
const createJob = asyncWrapper(async (req, res) => {
  res.send("create job");
});

module.exports = {
  getAllJobs,
  getSingleJob,
  deleteJob,
  updateJob,
  createJob,
};
