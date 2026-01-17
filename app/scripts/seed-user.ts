import mongoose from "mongoose";
import 'dotenv/config';

import bcrypt from "bcryptjs";
import { User } from "../lib/models/User";
import { connectDB } from "../lib/db";

async function seed() {
  await connectDB();

  const email = "team@dashboard.com";
  const password = "password123";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("User already exists");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    passwordHash,
  });

  console.log("User created:", email);
  process.exit(0);
}

seed();
