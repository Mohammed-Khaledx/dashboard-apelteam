export type MemberGroup =
    | "general_supervisors"
    | "supervisors"
    | "general_leaders"
    | "leaders"
    | "vices"
    | "graduates";

export type MemberStatus = "active" | "graduated";
export type Gender = "male" | "female";

export interface MemberDTO {
    name: string;
    role: string;
    thumbnail: string | null;
    group: MemberGroup;
    order: number;
    gender: Gender;
    status: MemberStatus;
}

// This represents a member as it comes from your API/Database
export interface Member extends MemberDTO {
    _id: string; // Map the MongoDB _id to a string here
    createdAt?: Date;

}


// Registered Teams
export interface RegisteredMember {
  name: string;
  phone: string;
  email: string;
  nationalID: string;
  studyYear: string;
  faculty: string;
  university: string;
  government: string;
}

export interface RegisteredTeam {
  _id: string;
  teamName: string;
  members: RegisteredMember[];
  registeredAt: Date;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

