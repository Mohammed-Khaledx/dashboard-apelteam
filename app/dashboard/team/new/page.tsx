import Link from "next/link";
import { actionCreateMember } from "../../../lib/actions";
import TeamForm from "../TeamForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function AddMemberPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
          <p className="text-slate-400 mt-1">Create a new member for your team.</p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <UserPlus className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle>Member Details</CardTitle>
              <CardDescription>Fill in the information for the new team member.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TeamForm action={actionCreateMember} mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
