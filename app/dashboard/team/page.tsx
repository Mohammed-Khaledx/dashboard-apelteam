import Image from "next/image";
import { getAllMembers } from "../../lib/data";
import { AddMember, DeleteMemeber, UpdateMemebr } from "./buttonts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserCheck, GraduationCap } from "lucide-react";

export default async function MembersPage() {
  const members = await getAllMembers();

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    graduated: members.filter((m) => m.status === "graduated").length,
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const groupColors: Record<string, string> = {
    general_supervisors:
      "bg-purple-500/20 text-purple-400 border-purple-500/30",
    supervisors: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    general_leaders: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    leaders: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    vices: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    graduates: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-slate-400 mt-1">
            Manage your team roster and member information.
          </p>
        </div>
        <AddMember />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-emerald-400">
              <UserCheck className="h-4 w-4" />
              Active
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-400">
              {stats.active}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2 text-orange-400">
              <GraduationCap className="h-4 w-4" />
              Graduated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-400">
              {stats.graduated}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Members Table */}
      <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>
            A list of all team members with their roles and groups.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Member</TableHead>
                <TableHead className="text-slate-400">Role</TableHead>
                <TableHead className="text-slate-400">Group</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow
                  key={m._id}
                  className="border-slate-800/50 hover:bg-slate-800/30"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-slate-700">
                        {m.thumbnail ? (
                          <AvatarImage src={m.thumbnail} alt={m.name} />
                        ) : null}
                        <AvatarFallback className="bg-slate-800 text-slate-300 text-sm">
                          {getInitials(m.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{m.name}</p>
                        <p className="text-xs text-slate-500 capitalize">
                          {m.gender}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400">{m.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        groupColors[m.group] || "bg-slate-800 text-slate-300"
                      }
                    >
                      {m.group.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        m.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                      }
                    >
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <UpdateMemebr id={m._id} />
                      <DeleteMemeber id={m._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
