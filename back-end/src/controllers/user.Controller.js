const User = require("../models/User");
const Loan = require("../models/Loan");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const config = require("../configs/config");
const {
  registerTemplateText,
  default: emailTemplates,
} = require("../Templates/template");

const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

const sendEmail = async (email, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email,
      pass: config.app_pass,
    },
  });

  const mailOptions = {
    from: config.email,
    to: email,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return true;
  } catch (error) {
    console.error("Email sending failed: ", error);
    throw error;
  }
};

exports.Forget_password = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if( user.password !== oldPassword){
      return res.status(400).send({ error: "Incorrect password" });
    }

    user.password = newPassword;
    user.change_password = false
    await user.save();
    await sendEmail(
      email,
      "Password Reset",
      emailTemplates.forgetPassword(user.name, newPassword)
    );
    res.status(200).json({ message: "New password sent to your email" });
  } catch (err) {
    res.status(500).send({ error: "Password reset failed" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, cnic } = req.body;

    if (!name || !email || !cnic) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { cnic }] });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already registered!"
            : "CNIC already registered!",
      });
    }

    const password = generateRandomPassword();
    const newUser = new User({ name, email, cnic, password });
    await newUser.save();
const adminEmail = "rashidkhaan618@gmail.com" 
    await sendEmail(
      email,
      "Password for Loan Application",
      emailTemplates.register(name, email, password)
    );
    await sendEmail(
      adinEmail,
      "New User Loan Request",
      emailTemplates.loanRequestAdminNotify(name)
    )
    res.status(201).json({
      message:
        "User registered successfully. Password has been sent to your email.",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not found!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    if (user.change_password === "true") {
      return res.status(200).json({ message: "/forget_password" });
    } else {
      await sendEmail(
        email,
        "Login Successful",
        `You have successfully logged in`
      );
      return res.status(200).json({ message: "/dashboard", userId: user._id });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.submitLoanRequest = async (req, res) => {
  try {
    const now = new Date();
    
    // Create 12-hour time format
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    
    const date = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3');

    const loanData = {
        ...req.body,
        timestamp: {
            time,
            day,
            date
        }
    };

    const loan = new Loan(loanData);
    await loan.save();

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR'
        }).format(amount);
    };

    // Create applicant email content
    const applicantEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Loan Application Submitted Successfully</h2>
            <p>Dear ${loan.name},</p>
            <p>Your loan application has been submitted with the following details:</p>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Loan Amount:</strong> ${formatCurrency(loan.amount)}</p>
                <p><strong>Duration:</strong> ${loan.duration}</p>
                <p><strong>Category:</strong> ${loan.category} - ${loan.subcategory}</p>
                <p><strong>Submission Time:</strong> ${time}</p>
                <p><strong>Date:</strong> ${day}, ${date}</p>
                <p><strong>Application ID:</strong> ${loan._id}</p>
            </div>

            <h3>Guarantors Details:</h3>
            ${loan.guarantors.map(g => `
                <div style="background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px;">
                    <p><strong>Name:</strong> ${g.name}</p>
                    <p><strong>Email:</strong> ${g.email}</p>
                    <p><strong>Location:</strong> ${g.location}</p>
                </div>
            `).join('')}
        </div>
    `;

    // Send email to applicant
    await sendEmail(
        loan.email,
        "Loan Application Submitted Successfully",
        applicantEmailContent
    );

    // Send emails to each guarantor
    for (const guarantor of loan.guarantors) {
        const guarantorEmailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Loan Guarantor Confirmation</h2>
                <p>Dear ${guarantor.name},</p>
                <p>You have been added as a guarantor for the following loan application:</p>
                
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <p><strong>Applicant Name:</strong> ${loan.name}</p>
                    <p><strong>Loan Amount:</strong> ${formatCurrency(loan.amount)}</p>
                    <p><strong>Duration:</strong> ${loan.duration}</p>
                    <p><strong>Submission Time:</strong> ${time}</p>
                    <p><strong>Date:</strong> ${day}, ${date}</p>
                    <p><strong>Application ID:</strong> ${loan._id}</p>
                </div>

                <p>Your Role as Guarantor:</p>
                <div style="background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px;">
                    <p><strong>Name:</strong> ${guarantor.name}</p>
                    <p><strong>Email:</strong> ${guarantor.email}</p>
                    <p><strong>Location:</strong> ${guarantor.location}</p>
                    <p><strong>CNIC:</strong> ${guarantor.cnic}</p>
                </div>

                <p style="color: #666;">If you have not agreed to be a guarantor for this loan, please contact us immediately.</p>
            </div>
        `;

        await sendEmail(
            guarantor.email,
            `Loan Guarantor Confirmation for ${loan.name}'s Application`,
            guarantorEmailContent
        );
    }

    // Send success response
    res.status(201).json({ 
        message: "Loan request submitted successfully", 
        loan 
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
