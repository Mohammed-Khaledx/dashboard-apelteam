
import mongoose, { Schema, model, models } from "mongoose";

export const MemberGroups = [
    "general_supervisors",
    "supervisors",
    "general_leaders",
    "leaders",
    "vices",
    "graduates",
] as const;

export type MemberGroup = (typeof MemberGroups)[number];

// Define gender enum
export const Genders = ["male", "female"] as const;
export type Gender = (typeof Genders)[number];

// Define status enum
export const MemberStatuses = ["active", "graduated"] as const;
export type MemberStatus = (typeof MemberStatuses)[number];

export interface IMember {
    name: string;
    role: string;
    thumbnail: string | null;
    group: MemberGroup;
    order: number;
    gender: Gender;
    status: MemberStatus;
    createdAt: Date;
}

const MemberSchema = new Schema<IMember>({
    name: { type: String, required: true },
    role: { type: String, required: true },
    thumbnail: { type: String },
    group: {
        type: String,
        enum: MemberGroups,
        required: true,
    },
    order: { type: Number, required: true, default: 0 },
    gender: {
        type: String,
        enum: Genders,
        required: true,
    },
    status: {
        type: String,
        enum: MemberStatuses,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

MemberSchema.pre("save", function () {
    // 'this' refers to the document being saved
    if (this.gender === "female") {
        this.thumbnail = "https://cavrac2fayzzho5v.public.blob.vercel-storage.com/team/1768686255699-apel-women-N4TrfINpuymlgX4zqWH2hZz8QHSlSz.jpg";
    } 
    // Optional: Add a default for males too if needed
    else if (this.gender === "male" && !this.thumbnail) {
        this.thumbnail = "https://your-blob-storage.com/default-male-avatar.png";
    }
});
// Prevent model overwrite in dev
export const CoreMember =
    models.Member || model<IMember>("Member", MemberSchema);
