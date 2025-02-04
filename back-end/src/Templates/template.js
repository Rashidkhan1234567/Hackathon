const emailTemplates = {
  register: (name, email, password) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h1 style="color: #333;">Welcome, ${name}!</h1>
        <p>Thank you for registering with us. Here are your login details:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please change your password after logging in.</p>
      </div>
    `,

  login: (name) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h1 style="color: #333;">Hello, ${name}!</h1>
        <p>You have successfully logged in to your account.</p>
      </div>
    `,

  forgetPassword: (name, newPassword) => `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h1 style="color: #333;">Password Reset</h1>
        <p>Hi ${name},</p>
        <p>Your password has been reset successfully. Here is your new password:</p>
        <p><strong>${newPassword}</strong></p>
        <p>Please change your password after logging in.</p>
      </div>
    `,

    loanRequest: (name, amount, status) => `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f4f4f4; max-width: 600px; margin: auto; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
      <div style="background-color: #007bff; color: #ffffff; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px;">Loan Request Status</h1>
      </div>
      <div style="padding: 20px; color: #333;">
        <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 16px;">Your loan request of <strong style="color: #28a745;">$${amount}</strong> has been <strong style="color: ${status === 'Approved' ? '#28a745' : '#dc3545'};">${status}</strong>.</p>
        <p style="font-size: 14px;">For more details, log in to your account.</p>
      </div>
      <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
        <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 5px;">Login to Your Account</a>
      </div>
    </div>
  `,
  guarantorNotification: (guarantorName, borrowerName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f4f4f4; max-width: 600px; margin: auto; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
    <div style="background-color: #17a2b8; color: #ffffff; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; text-align: center;">
      <h1 style="margin: 0; font-size: 20px;">Guarantor Request</h1>
    </div>
    <div style="padding: 20px; color: #333;">
      <p style="font-size: 16px;">Dear <strong>${guarantorName}</strong>,</p>
      <p style="font-size: 16px;">You have been requested to be a guarantor for <strong>${borrowerName}</strong>.</p>
      <p style="font-size: 14px;">Please log in to your account to accept or decline this request.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
      <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #17a2b8; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 5px;">View Request</a>
    </div>
  </div>
`,
guarantorUserNotification: (borrowerName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f4f4f4; max-width: 600px; margin: auto; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
    <div style="background-color: #28a745; color: #ffffff; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; text-align: center;">
      <h1 style="margin: 0; font-size: 20px;">Guarantor Request Sent</h1>
    </div>
    <div style="padding: 20px; color: #333;">
      <p style="font-size: 16px;">Dear <strong>${borrowerName}</strong>,</p>
      <p style="font-size: 16px;">Your request for guarantors has been sent successfully.</p>
      <p style="font-size: 14px;">We will notify you once the guarantors respond.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
      <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 5px;">Check Status</a>
    </div>
  </div>
`,
loanRequestAdminNotify: (userName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f4f4f4; max-width: 600px; margin: auto; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
    <div style="background-color: #343a40; color: #ffffff; padding: 15px; border-top-left-radius: 10px; border-top-right-radius: 10px; text-align: center;">
      <h1 style="margin: 0; font-size: 20px;">New Loan Request</h1>
    </div>
    <div style="padding: 20px; color: #333;">
      <p style="font-size: 16px;">Dear Admin,</p>
      <p style="font-size: 16px;">A new loan request has been submitted by <strong>${userName}</strong>.</p>
      <p style="font-size: 14px;">Please review the request in the admin panel.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
      <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #343a40; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 5px;">View Request</a>
    </div>
  </div>
`,

};

export default emailTemplates;
