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
    thumbnail: string;
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
