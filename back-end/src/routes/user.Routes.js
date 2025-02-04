const express = require("express");
const { registerUser, submitLoanRequest, addGuarantors, Forget_password, LoginUser } = require("../controllers/user.Controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/loan-request", submitLoanRequest);
router.post("/login", LoginUser);
router.post("/forgetPassword", Forget_password);


module.exports = router;