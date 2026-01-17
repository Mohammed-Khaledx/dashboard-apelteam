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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit {member.name}</h1>

      <TeamForm action={updateMemberWithId} mode="edit" initialData={member} />
    </div>
  );
}
