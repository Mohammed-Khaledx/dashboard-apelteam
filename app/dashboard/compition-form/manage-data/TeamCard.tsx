"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Calendar, Users } from "lucide-react";
import { RegisteredTeam } from "@/app/lib/types";
import TeamStatusUpdate from "./TeamStatusUpdate";

interface Props {
  team: RegisteredTeam;
}

export default function TeamCard({ team }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const statusStyles = {
    approved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-slate-800/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Users className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{team.teamName}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(team.registeredAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <span className="text-slate-600">•</span>
                    <span>{team.members.length} members</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={statusStyles[team.status]}>
                  {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                </Badge>
                <TeamStatusUpdate teamId={team._id} currentStatus={team.status} />
                <Button variant="ghost" size="icon">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="rounded-lg border border-slate-800 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 bg-slate-800/50 hover:bg-slate-800/50">
                    <TableHead className="text-slate-400">Name</TableHead>
                    <TableHead className="text-slate-400">Email</TableHead>
                    <TableHead className="text-slate-400">Phone</TableHead>
                    <TableHead className="text-slate-400">National ID</TableHead>
                    <TableHead className="text-slate-400">Year</TableHead>
                    <TableHead className="text-slate-400">Faculty</TableHead>
                    <TableHead className="text-slate-400">University</TableHead>
                    <TableHead className="text-slate-400">Government</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.members.map((member, idx) => (
                    <TableRow key={idx} className="border-slate-800 hover:bg-slate-800/30">
                      <TableCell className="font-medium text-white">{member.name}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{member.email}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{member.phone}</TableCell>
                      <TableCell className="text-slate-400 text-sm font-mono">{member.nationalID}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                          {member.studyYear}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">{member.faculty}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{member.university}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{member.government}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}