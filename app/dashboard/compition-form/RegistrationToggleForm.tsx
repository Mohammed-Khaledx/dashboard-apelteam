'use client';

import { useState, useTransition } from "react";
import { updateRegistrationSettings } from "../../lib/actions";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

type Props = { initialOpen: boolean | undefined };

export default function RegistrationToggleForm({ initialOpen }: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen ?? false);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newValue = !isOpen;
    setIsOpen(newValue);

    const formData = new FormData();
    formData.set("isOpen", String(newValue));

    startTransition(async () => {
      await updateRegistrationSettings(formData);
    });
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="font-medium text-white">Registration Status</span>
            <Badge
              variant={isOpen ? "default" : "secondary"}
              className={isOpen
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-700 text-slate-400"
              }
            >
              {isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            {isOpen
              ? "New teams can currently register for the competition."
              : "Registration is currently closed for new teams."
            }
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isPending && (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        )}
        {/* Custom toggle button since Switch may not be rendering */}
        <button
          type="button"
          role="switch"
          aria-checked={isOpen}
          onClick={handleToggle}
          disabled={isPending}
          className={`
            relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
            disabled:cursor-not-allowed disabled:opacity-50
            ${isOpen 
              ? "bg-gradient-to-r from-orange-500 to-pink-500" 
              : "bg-slate-600"
            }
          `}
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 
              transition duration-200 ease-in-out
              ${isOpen ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </button>
      </div>
    </div>
  );
}