

import "dotenv/config"; // Must be first!

import { connectDB } from "../lib/db";
import { CoreMember } from "../lib/models/CoreMember";

import {
  generalSupervisors,
  supervisors,
  generalLeaders,
  leaders,
  vices,
  graduates,
} from "../data/coreteam"; // adjust path if needed

// Helper to infer gender
function inferGender(thumbnail: string): "male" | "female" {
  // Simple rule: if "women" appears in file name → female
  return /women/i.test(thumbnail) ? "female" : "male";
}

async function seed() {
  await connectDB();

  console.log("Seeding team members...");

  // Flatten all members with groups and order
  const all: {
    group: string;
    member: { thumbnail: string; name: string; role: string };
  }[] = [
      ...generalSupervisors.map((m, i) => ({ group: "general_supervisors", member: m })),
      ...supervisors.map((m, i) => ({ group: "supervisors", member: m })),
      ...generalLeaders.map((m, i) => ({ group: "general_leaders", member: m })),
      ...leaders.map((m, i) => ({ group: "leaders", member: m })),
      ...vices.map((m, i) => ({ group: "vices", member: m })),
      ...graduates.map((m, i) => ({ group: "graduates", member: m })),
    ];

  // Remove existing
  await CoreMember.deleteMany({});
  console.log("Cleared existing members.");

  // Insert
  for (let index = 0; index < all.length; index++) {
    const { group, member } = all[index];

    const gender = inferGender(member.thumbnail);

    // If female and no upload provided, use default female avatar
    const thumbnailPath =
      member.thumbnail && member.thumbnail.trim().length > 0
        ? `/images/team/${member.thumbnail}`
        : gender === "female"
          ? "/images/defaults/female-avatar.jpg"
          : "/images/defaults/male-avatar.jpg";

    const status = group === "graduates" ? "graduated" : "active";

    await CoreMember.create({
      name: member.name,
      role: member.role,
      thumbnail: thumbnailPath,
      group: group,
      order: index,
      gender,
      status,
    });
  }

  console.log("Team seeding complete.");
  process.exit(0);
}

seed();
