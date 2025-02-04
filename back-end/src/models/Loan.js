const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: "Pending" },
  subcategory: { type: String, required: true },
  initialAmount: { type: Number, required: true },
  guarantors: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      location: { type: String, required: true },
      cnic: { type: String, required: true },
    },
  ],
  status: { type: String, default: "Pending" },
  timestamp: {
    time: { type: String, required: true }, // 12-hour format time
    day: { type: String, required: true },  // Day name
    date: { type: String, required: true }  // DD/MM/YYYY
  }
});

module.exports = mongoose.model("Loan", loanSchema);
