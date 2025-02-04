const express = require("express");
const { getAllApplications, updateApplicationStatus } = require("../controllers/admin.Controller");

const router = express.Router();

router.get("/applications", getAllApplications);
router.put("/application/:id", updateApplicationStatus);

module.exports = router;