const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const {
  getAllJobs,
  getSingleJob,
  deleteJob,
  updateJob,
  createJob,
} = require("../controllers/jobs");

router
  .route("/")
  .get(authentication, getAllJobs)
  .post(authentication, createJob);
router
  .route("/:id")
  .get(authentication, getSingleJob)
  .patch(authentication, updateJob)
  .delete(authentication, deleteJob);

module.exports = router;
