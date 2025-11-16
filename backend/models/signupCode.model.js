import mongoose from "mongoose";

const signupCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please provide a signup code"],
      unique: true,
      uppercase: true,
      match: [/^[A-Z0-9]{6,10}$/, "Code must be 6-10 alphanumeric characters"],
    },
    role: {
      type: String,
      enum: ["agronomist", "supervisor"],
      required: [true, "Please specify the role for this code"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SignupCode = mongoose.model("SignupCode", signupCodeSchema);
export default SignupCode;
