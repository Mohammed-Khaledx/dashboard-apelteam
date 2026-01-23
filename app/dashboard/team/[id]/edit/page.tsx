import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberById } from "@/app/lib/data";
import { actionUpdateMember } from "@/app/lib/actions";
import TeamForm from "../../TeamForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserCog } from "lucide-react";

export default async function EditMemberPage(props: { params: { id: string } }) {
  const params = await props.params;
  const id = params.id;

  const member = await getMemberById(id);
  if (!member) notFound();

  const updateMemberWithId = actionUpdateMember.bind(null, id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/team">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Member</h1>
          <p className="text-slate-400 mt-1">Update details for {member.name}.</p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <UserCog className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle>Member Details</CardTitle>
              <CardDescription>Update the member&apos;s information below.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TeamForm action={updateMemberWithId} mode="edit" initialData={member} />
        </CardContent>
      </Card>
    </div>
  );
}
