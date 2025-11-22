import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // Use STARTTLS instead of direct SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates in development
    },
  });

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || "Great Rift Coffee"}" <${
      process.env.EMAIL_FROM || process.env.EMAIL_USER
    }>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[Email Service] Email sent: ${info.messageId}`);
  return info;
};

export const sendVerificationEmail = async (email, otp, userName) => {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #e8f5e9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #2e7d32; text-align: center; margin-bottom: 20px;">Welcome to Great Rift Coffee</h1>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hello ${
          userName || "there"
        },</p>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for registering with Great Rift Coffee Management System! To complete your sign-up process, please use the following One-Time Password (OTP):
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; display: inline-block;">
            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Your verification code:</p>
            <p style="font-size: 36px; font-weight: bold; color: #2e7d32; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">
              ${otp}
            </p>
          </div>
        </div>
        
        <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          Enter this code on the verification page to activate your account.
        </p>
        
        <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">This code will expire in 15 minutes.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          If you didn't create this account, please ignore this email.
        </p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      email,
      subject: "Verify Your Email - Great Rift Coffee Management System",
      html,
    });
    console.log("[Email Service] Verification OTP sent to:", email);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error(
      "[Email Service] Failed to send verification email:",
      error.message
    );
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/reset-password?token=${resetToken}`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #e8f5e9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #2e7d32; text-align: center; margin-bottom: 20px;">Password Reset Request</h1>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          You requested to reset your password. Click the link below to set a new password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #2e7d32; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">This link will expire in 1 hour.</p>
        
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      email,
      subject: "Reset Your Password - Great Rift Coffee Management System",
      html,
    });
    console.log("[Email Service] Password reset email sent to:", email);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error(
      "[Email Service] Failed to send password reset email:",
      error.message
    );
    throw error;
  }
};

export const sendInviteEmail = async (email, token, role, inviterName) => {
  const inviteUrl = `${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/accept-invite?token=${token}`;

  const roleDisplayNames = {
    "ict-manager": "ICT Manager",
    "operations-manager": "Operations Manager",
    agronomist: "Agronomist",
    supervisor: "Supervisor",
  };

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #e8f5e9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #2e7d32; text-align: center; margin-bottom: 20px;">You've Been Invited!</h1>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hello,</p>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          <strong>${inviterName}</strong> has invited you to join Great Rift Coffee Management System as a <strong>${roleDisplayNames[role]}</strong>.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${inviteUrl}" style="background-color: #2e7d32; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
            Accept Invitation
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          Click the button above to set up your account and define your password.
        </p>
        
        <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
          This invitation will expire in 7 days.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          If you didn't expect this invitation, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      email,
      subject: `Invitation to Join Great Rift Coffee as ${roleDisplayNames[role]}`,
      html,
    });
    console.log("[Email Service] Invite email sent to:", email);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error(
      "[Email Service] Failed to send invite email:",
      error.message
    );
    throw error;
  }
};

export default sendEmail;
