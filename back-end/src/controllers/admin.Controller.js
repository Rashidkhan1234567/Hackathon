const Loan = require("../models/Loan");

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Loan.find().populate("user");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { tokenNumber } = req.body;
    const loan = await Loan.findById(id);
    loan.slip.tokenNumber = tokenNumber;
    await loan.save();
    res.status(200).json({ message: "Application status updated", loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
