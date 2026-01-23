import Link from "next/link";
import { getRegistrationFormState, getAllRegisteredTeams } from "../../lib/data";
import RegistrationToggleForm from "./RegistrationToggleForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileSpreadsheet, Settings, ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";

export default async function RegistrationSettings() {
  const settings = await getRegistrationFormState();
  const teams = await getAllRegisteredTeams();

  const stats = {
    total: teams.length,
    approved: teams.filter(t => t.status === "approved").length,
    pending: teams.filter(t => t.status === "pending").length,
    rejected: teams.filter(t => t.status === "rejected").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Competition Form</h1>
        <p className="text-slate-400 mt-1">Manage registration settings and view submitted teams.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Teams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Approved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-400">{stats.approved}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-yellow-400">
              <Clock className="h-4 w-4" />
              Pending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-red-400">
              <XCircle className="h-4 w-4" />
              Rejected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-400">{stats.rejected}</p>
          </CardContent>
        </Card>
      </div>

      {/* Registration Control Card */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Settings className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle>Registration Control</CardTitle>
              <CardDescription>Toggle registration on or off for new teams</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RegistrationToggleForm initialOpen={settings?.isOpen} />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FileSpreadsheet className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle>Manage Teams</CardTitle>
              <CardDescription>View, approve, and export registered teams data</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/compition-form/manage-data">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
              View All Teams
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}