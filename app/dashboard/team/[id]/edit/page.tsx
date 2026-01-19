import { notFound } from "next/navigation";
import { getMemberById } from "@/app/lib/data";
import { actionUpdateMember } from "@/app/lib/actions";
import TeamForm from "../../TeamForm";

export default async function EditMemberPage(props: { params: { id: string } }) {
  const params = await props.params;
  const id = params.id;

  const member = await getMemberById(id);
  if (!member) notFound();

  const updateMemberWithId = actionUpdateMember.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Member</h1>
        <p className="text-slate-400 mt-1">Update details for {member.name}.</p>
      </div>
      
      <div className="card p-6">
        <TeamForm action={updateMemberWithId} mode="edit" initialData={member} />
      </div>
    </div>
  );
}
