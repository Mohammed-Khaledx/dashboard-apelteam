

import { actionCreateMember } from '../../../lib/actions';
import TeamForm from '../TeamForm';



export default function AddMemberPage() {


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Team Member</h1>
      <TeamForm action={actionCreateMember} mode="create" />
    </div>
  );
}
