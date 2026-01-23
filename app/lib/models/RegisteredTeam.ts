import mongoose from "mongoose";


const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Member name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^(010|011|012|015)\d{8}$/, "Invalid phone number format"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    nationalID: {
      type: String,
      required: [true, "National ID is required"],
      match: [/^\d{14}$/, "National ID must be 14 digits"],
    },
    studyYear: {
      type: String,
      required: [true, "Study year is required"],
      enum: ["prep", "first", "second", "third", "fourth"],
    },
    faculty: {
      type: String,
      required: [true, "Faculty is required"],
      trim: true,
    },
    university: {
      type: String,
      required: [true, "University is required"],
      trim: true,
    },
    government: {
      type: String,
      required: [true, "Government/City is required"],
      trim: true,
    },
  },
  { _id: false }
); // Don't create _id for subdocuments

const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Team name must be at least 2 characters"],
    },
    members: {
      type: [MemberSchema],
      validate: {
        validator: function (v: []) {
          return v.length >= 2 && v.length <= 5;
        },
        message: "Team must have between 2 and 5 members",
      },
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes for performance
TeamSchema.index({ teamName: 1 });
TeamSchema.index({ "members.email": 1 });
TeamSchema.index({ "members.phone": 1 });

// Prevent model recompilation in development
const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
