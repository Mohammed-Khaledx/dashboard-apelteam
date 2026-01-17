import Link from "next/link";
import { getAllMembers } from "../../lib/data";
import { AddMember, DeleteMemeber, UpdateMemebr } from "./buttonts";

export default async function MembersPage() {
  const members = await getAllMembers();
  console.log(members)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>

      <AddMember />

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Group</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td className="border px-4 py-2">{m.name}</td>
              <td className="border px-4 py-2">{m.role}</td>
              <td className="border px-4 py-2">{m.group}</td>
              <td className="border px-4 py-2">
                <UpdateMemebr id={m._id}/>
              

                <DeleteMemeber id={m._id} />

              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
