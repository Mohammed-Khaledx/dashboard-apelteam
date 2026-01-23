"use client";

import { useTransition } from "react";
import { updateTeamStatus } from "@/app/lib/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Props {
  teamId: string;
  currentStatus: "pending" | "approved" | "rejected";
}

export default function TeamStatusUpdate({ teamId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === currentStatus) return;

    startTransition(async () => {
      await updateTeamStatus(teamId, newStatus as "pending" | "approved" | "rejected");
    });
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {isPending && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
      <Select value={currentStatus} onValueChange={handleStatusChange} disabled={isPending}>
        <SelectTrigger className="w-[130px] bg-slate-900/50 border-slate-700 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700">
          <SelectItem value="pending" className="text-yellow-400 focus:text-yellow-400 focus:bg-yellow-500/10">
            Pending
          </SelectItem>
          <SelectItem value="approved" className="text-emerald-400 focus:text-emerald-400 focus:bg-emerald-500/10">
            Approved
          </SelectItem>
          <SelectItem value="rejected" className="text-red-400 focus:text-red-400 focus:bg-red-500/10">
            Rejected
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}