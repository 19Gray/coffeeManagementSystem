import mongoose from "mongoose";
import readline from "readline";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import dotenv from "dotenv";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function createSuperuser() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error(
        "✗ MongoDB URI not found. Please set MONGO_URI in .env file"
      );
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");

    // Get superuser details
    console.log("\n=== Create Superuser (CEO/Admin) ===\n");

    const name = await question("Enter full name: ");
    const email = await question("Enter email: ");
    const password = await question("Enter password (min 6 characters): ");
    const phone = await question("Enter phone (optional): ");
    const organizationName = await question("Enter organization name: ");

    // Validate inputs
    if (!name || !email || !password || !organizationName) {
      console.error("✗ All fields except phone are required");
      process.exit(1);
    }

    if (password.length < 6) {
      console.error("✗ Password must be at least 6 characters");
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("✗ User with this email already exists");
      process.exit(1);
    }

    const tempOrg = await Organization.create({
      name: organizationName,
      owner: new mongoose.Types.ObjectId(), // Temporary placeholder
      ownerEmail: email,
      status: "active",
      settings: {
        timezone: "UTC",
        currency: "USD",
      },
    });

    console.log(`✓ Organization "${organizationName}" created`);

    const superuser = await User.create({
      name,
      email,
      password, // Let the pre-save hook hash it
      phone: phone || undefined,
      organization: tempOrg._id, // Reference the organization
      role: "ceo",
      status: "active",
      isVerified: true,
      verificationOTP: null,
      verificationTokenExpiry: null,
    });

    console.log(`✓ Superuser "${name}" created`);

    tempOrg.owner = superuser._id;
    await tempOrg.save();

    console.log("✓ Organization updated with owner");

    console.log("\n=== Superuser Details ===");
    console.log(`Name: ${superuser.name}`);
    console.log(`Email: ${superuser.email}`);
    console.log(`Role: ${superuser.role}`);
    console.log(`Organization: ${tempOrg.name}`);
    console.log(`Status: ${superuser.status}`);
    console.log(`Verified: ${superuser.isVerified}`);
    console.log("\nYou can now login with these credentials.");
  } catch (error) {
    console.error("✗ Error creating superuser:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.disconnect();
    console.log("\n✓ Disconnected from MongoDB");
    process.exit(0);
  }
}

createSuperuser();
