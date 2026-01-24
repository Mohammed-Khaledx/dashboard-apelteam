"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { actionDeleteMember } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Plus, Trash2, Loader2 } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await actionDeleteMember(id);
      setOpen(false);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete member</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent className="bg-slate-900 border-slate-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            This action cannot be undone. This will permanently delete this team member
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
