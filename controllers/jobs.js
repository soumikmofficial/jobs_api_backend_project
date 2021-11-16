const asyncWrapper = require("../middlewares/asyncWrapper");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

// ..............................get all jobs..................................
const getAllJobs = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ success: true, nbHits: jobs.length, jobs });
});

// ..............................get single job..................................
const getSingleJob = asyncWrapper(async (req, res) => {
  // getting userId and jobId
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  // fetching
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with an ID of ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, job });
});

// ..............................update job..................................
const updateJob = asyncWrapper(async (req, res) => {
  // getting userId, jobId and body
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Company and Position fields cannot be empty");
  }
  // fetching
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with an ID of ${jobId}`);
  }
  res.status(StatusCodes.CREATED).json({ success: true, job });
});

// ..............................delete job..................................
const deleteJob = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with an ID of ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
});

// ..............................create job..................................
const createJob = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  req.body.createdBy = userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ success: true, job });
});

module.exports = {
  getAllJobs,
  getSingleJob,
  deleteJob,
  updateJob,
  createJob,
};
