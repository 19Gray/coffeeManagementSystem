import nodemailer from "nodemailer";

const emailHost = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

console.log("[Email Service] Configuration check:");
console.log("[Email Service] HOST:", emailHost ? "✓ Set" : "✗ Missing");
console.log("[Email Service] PORT:", emailPort ? "✓ Set" : "✗ Missing");
console.log("[Email Service] USER:", emailUser ? "✓ Set" : "✗ Missing");
console.log("[Email Service] PASSWORD:", emailPassword ? "✓ Set" : "✗ Missing");

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: parseInt(emailPort) || 587,
  secure: emailHost?.includes("gmail")
    ? false
    : process.env.EMAIL_SECURE === "true",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("[Email Service] Configuration error:", error);
  } else {
    console.log("[Email Service] Ready to send emails");
  }
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || "Coffee Management System"}" <${
      process.env.EMAIL_FROM || process.env.EMAIL_USER
    }>`,
    to: email,
    subject: "Verify Your Email - Great Rift Coffee Management System",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5ede0;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #B8652A; text-align: center; margin-bottom: 20px;">Welcome to Great Rift Coffee</h1>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hello,
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for registering! To complete your sign-up process, please verify your email address by clicking the link below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #B8652A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Verify Email
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            Or copy and paste this link: <br/>
            <a href="${verificationUrl}" style="color: #B8652A; word-break: break-all;">${verificationUrl}</a>
          </p>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            This link will expire in 24 hours.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            If you didn't create this account, please ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[Email Service] Verification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email Service] Failed to send verification email:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || "Coffee Management System"}" <${
      process.env.EMAIL_FROM || process.env.EMAIL_USER
    }>`,
    to: email,
    subject: "Reset Your Password - Great Rift Coffee Management System",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5ede0;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #B8652A; text-align: center; margin-bottom: 20px;">Password Reset Request</h1>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            You requested to reset your password. Click the link below to set a new password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #B8652A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            This link will expire in 1 hour.
          </p>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[Email Service] Password reset email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(
      "[Email Service] Failed to send password reset email:",
      error
    );
    throw error;
  }
};

export default transporter;
