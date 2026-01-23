"use client";

import { RegisteredTeam } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";

interface Props {
  teams: RegisteredTeam[];
}

export default function DownloadButton({ teams }: Props) {
  const downloadCSV = () => {
    const headers = [
      "Team Name",
      "Status",
      "Registered At",
      "Member Name",
      "Email",
      "Phone",
      "National ID",
      "Study Year",
      "Faculty",
      "University",
      "Government",
    ];

    const rows: string[][] = [];

    teams.forEach((team) => {
      team.members.forEach((member, idx) => {
        rows.push([
          idx === 0 ? team.teamName : "",
          idx === 0 ? team.status : "",
          idx === 0 ? new Date(team.registeredAt).toISOString() : "",
          member.name,
          member.email,
          member.phone,
          member.nationalID,
          member.studyYear,
          member.faculty,
          member.university,
          member.government,
        ]);
      });
    });

    const csvContent = [
      headers.join(","),
      ...rows
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `registered-teams-${new Date()
      .toISOString()
      .split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(teams, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `registered-teams-${new Date()
      .toISOString()
      .split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (teams.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-slate-900 border-slate-700"
      >
        <DropdownMenuItem
          onClick={downloadCSV}
          className="cursor-pointer hover:bg-slate-800"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-400" />
          Download CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={downloadJSON}
          className="cursor-pointer hover:bg-slate-800"
        >
          <FileJson className="mr-2 h-4 w-4 text-blue-400" />
          Download JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}