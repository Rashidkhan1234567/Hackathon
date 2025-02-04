// // Importing required modules
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

// // Initialize the Express app
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect(
//   "mongodb+srv://rashidkhaan618:Lg6uliz9syLLLChM@userdata.qylxc.mongodb.net/saylani"
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Schemas and Models
// const UserSchema = new mongoose.Schema({
//   cnic: String,
//   email: String,
//   name: String,
//   password: String,
// });

// // UserSchema.pre("save", function (next) {
// //   if (!this.otp) {
// //     this.otp = generateOtp();
// //     const payload = {
// //       from: "hamailkhan213@gmail.com",
// //       to: this.email,
// //       subject: "Safro",
// //       text: "hi password is " + this.password,
// //     };
// //     sendEmail({
// //       ...payload,
// //     })
// //       .then((res) => console.log(`Success sending email to ${this.email}`))
// //       .catch((err) => console.log(`Error sending email to ${this.email}`));
// //   }
// //   next();
// // });

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: true,
//   auth: {
//     appName: "Safro",
//     user: "rashidkhaan618@gmail.com",
//     pass: "paac vyrl zwyg jynr",
//   },
// });

// const LoanRequestSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   category: String,
//   subcategory: String,
//   amount: Number,
//   loanPeriod: Number,
//   guarantors: [
//     {
//       name: String,
//       email: String,
//       cnic: String,
//       location: String,
//     },
//   ],
//   status: { type: String, default: "Pending" },
// });

// const AppointmentSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   tokenNumber: String,
//   appointmentDate: Date,
//   officeLocation: String,
// });

// const User = mongoose.model("User", UserSchema);
// const LoanRequest = mongoose.model("LoanRequest", LoanRequestSchema);
// const Appointment = mongoose.model("Appointment", AppointmentSchema);

// // API Endpoints

// // User Registration
// app.post("/register", async (req, res) => {
//   const { cnic, email, name } = req.body;
//   const password = crypto.randomBytes(8).toString("hex");

//   try {
//     const user = new User({ cnic, email, name, password });
//     await user.save();

//     const payload = {
//       from: "rashidkhaan618@gmail.com",
//       to: email,
//       subject: "Password",
//       text: "hi password is " + password,
//     };

//     const response = await transporter
//       .sendMail({
//         from: "rashidkhaan618@gmail.com",
//         ...payload,
//       })
//       .then((res) => console.log("Send Email"))
//       .catch((err) => console.log("Not send", err.message));

//     return res
//       .status(201)
//       .send({ message: "User registered successfully", password });
//   } catch (err) {
//     return res.status(500).send({ error: "Registration failed" });
//   }
// });
// // User Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email, password });
//     if (user) {
//       res.status(200).send({ message: "Login successful", userId: user._id });
//     } else {
//       res.status(401).send({ error: "Invalid credentials" });
//     }
//   } catch (err) {
//     res.status(500).send({ error: "Login failed" });
//   }
// });

// // Submit Loan Request
// app.post("/loan-request", async (req, res) => {
//   const { userId, category, subcategory, amount, loanPeriod, guarantors } =
//     req.body;

//   try {
//     const loanRequest = new LoanRequest({
//       userId,
//       category,
//       subcategory,
//       amount,
//       loanPeriod,
//       guarantors,
//     });
//     await loanRequest.save();
//     res.status(201).send({ message: "Loan request submitted successfully" });
//   } catch (err) {
//     res.status(500).send({ error: "Loan request submission failed" });
//   }
// });

// // Generate Appointment Slip
// app.post("/generate-slip", async (req, res) => {
//   const { userId, officeLocation } = req.body;
//   const tokenNumber = crypto.randomBytes(4).toString("hex");
//   const appointmentDate = new Date();
//   appointmentDate.setDate(appointmentDate.getDate() + 7); // Appointment after 7 days

//   try {
//     const appointment = new Appointment({
//       userId,
//       tokenNumber,
//       appointmentDate,
//       officeLocation,
//     });
//     await appointment.save();
//     res.status(201).send({
//       message: "Appointment slip generated successfully",
//       slip: {
//         tokenNumber,
//         appointmentDate,
//         officeLocation,
//       },
//     });
//   } catch (err) {
//     res.status(500).send({ error: "Slip generation failed" });
//   }
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

