import { getAllMembers } from "../../lib/data";
import { AddMember, DeleteMemeber, UpdateMemebr } from "./buttonts";

export default async function MembersPage() {
  const members = await getAllMembers();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-slate-400 mt-1">Manage your team roster.</p>
        </div>
        <AddMember />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Group
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {members.map((m) => (
              <tr
                key={m._id}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4 text-white font-medium">{m.name}</td>
                <td className="px-6 py-4 text-slate-400">{m.role}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
                    {m.group.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <UpdateMemebr id={m._id} />
                    <DeleteMemeber id={m._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
