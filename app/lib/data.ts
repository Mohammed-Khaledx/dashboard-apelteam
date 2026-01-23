import { connectDB } from "./db";
import { CoreMember } from "./models/CoreMember";
import { IRegistrationSetting, RegistrationSetting } from "./models/FormSetting";
import { Member, MemberDTO, RegisteredTeam } from "./types";
import Team from "./models/RegisteredTeam";

export async function getAllMembers(): Promise<Member[]> {
  await connectDB();
  const docs = await CoreMember.find().sort({ order: 1 }).lean();
  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(), // Convert ObjectId to string
  })) as Member[];
}

export async function getMemberById(id: string): Promise<Member | null> {
  await connectDB();
  const doc = await CoreMember.findById(id).lean();
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id.toString(),
  } as Member;
}

// used by action
export async function deleteMemberById(id: string): Promise<void> {
  await connectDB();
  await CoreMember.findByIdAndDelete(id);
}

export async function createMember(data: MemberDTO): Promise<void> {
  await connectDB();
  await CoreMember.create(data);
}

export async function updateMemberById(
  id: string,
  data: Partial<MemberDTO>
): Promise<void> {
  await connectDB();
  await CoreMember.findByIdAndUpdate(id, data);
}

// 

export async function getRegistrationFormState(): Promise<IRegistrationSetting | null> {
  await connectDB();
  const doc = await RegistrationSetting.findOne().lean();
  return doc as IRegistrationSetting | null;
}



export async function getAllRegisteredTeams(): Promise<RegisteredTeam[]> {
  await connectDB();
  const docs = await Team.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  })) as RegisteredTeam[];
}
