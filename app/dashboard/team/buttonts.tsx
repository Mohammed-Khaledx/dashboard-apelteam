import Link from "next/link";
import { actionDeleteMember } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Plus, Trash2 } from "lucide-react";

export function AddMember() {
  return (
    <Link href="/dashboard/team/new">
      <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 gap-2">
        <Plus className="h-4 w-4" />
        Add Member
      </Button>
    </Link>
  );
}

export function UpdateMemebr({ id }: { id: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/dashboard/team/${id}/edit`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit member</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DeleteMemeber({ id }: { id: string }) {
  const deleteMemberWithId = actionDeleteMember.bind(null, id);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form action={deleteMemberWithId}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-950/30"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete member</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
