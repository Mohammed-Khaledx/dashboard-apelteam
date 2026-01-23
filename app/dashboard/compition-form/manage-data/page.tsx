import { getAllRegisteredTeams } from "@/app/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DownloadButton from "./DownloadButton";
import TeamStatusUpdate from "./TeamStatusUpdate";
import TeamCard from "./TeamCard";

export default async function ManageDataPage() {
  const teams = await getAllRegisteredTeams();

  const pendingTeams = teams.filter(t => t.status === "pending");
  const approvedTeams = teams.filter(t => t.status === "approved");
  const rejectedTeams = teams.filter(t => t.status === "rejected");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/compition-form">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Registered Teams</h1>
            <p className="text-slate-400 mt-1">
              {teams.length} team{teams.length !== 1 ? "s" : ""} registered
            </p>
          </div>
        </div>
        <DownloadButton teams={teams} />
      </div>

      {teams.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Users className="h-12 w-12 text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No teams registered yet.</p>
            <p className="text-slate-500 text-sm mt-1">Teams will appear here once they register.</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-800">
              All ({teams.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              Pending ({pendingTeams.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Approved ({approvedTeams.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              Rejected ({rejectedTeams.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {teams.map((team) => (
              <TeamCard key={team._id} team={team} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingTeams.length === 0 ? (
              <EmptyState message="No pending teams" />
            ) : (
              pendingTeams.map((team) => (
                <TeamCard key={team._id} team={team} />
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4 mt-6">
            {approvedTeams.length === 0 ? (
              <EmptyState message="No approved teams" />
            ) : (
              approvedTeams.map((team) => (
                <TeamCard key={team._id} team={team} />
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {rejectedTeams.length === 0 ? (
              <EmptyState message="No rejected teams" />
            ) : (
              rejectedTeams.map((team) => (
                <TeamCard key={team._id} team={team} />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="flex items-center justify-center py-8">
        <p className="text-slate-500">{message}</p>
      </CardContent>
    </Card>
  );
}