'use client';

import { useState, useTransition } from "react";
import { updateRegistrationSettings } from "../../lib/actions";

type Props = { initialOpen: boolean | undefined };

export default function RegistrationToggleForm({ initialOpen }: Props) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        const next = !isOpen;
        setIsOpen(next);

        const formData = new FormData();
        formData.set("isOpen", String(next));

        startTransition(async () => {
            await updateRegistrationSettings(formData);
        });
    };

    return (
        <form className="card p-6 space-y-6" action={updateRegistrationSettings}>
            <input type="hidden" name="isOpen" value={String(isOpen)} />
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={handleToggle}
                    disabled={isPending}
                    className={`relative w-28 h-14 rounded-full p-2 transition-all duration-300 focus:outline-none ${isOpen
                        ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-[0_10px_30px_rgba(255,115,29,0.5)]"
                        : "bg-slate-800 shadow-inner"
                        }`}
                >
                    <span
                        className={`absolute inset-0 rounded-full transition-opacity duration-300 blur-xl ${isOpen
                            ? "opacity-70 bg-gradient-to-r from-orange-500/50 via-pink-500/50 to-purple-600/50"
                            : "opacity-0"
                            }`}
                        aria-hidden
                    />
                    <span
                        className={`relative z-10 flex items-center h-full ${isOpen ? "justify-end pr-1" : "justify-start pl-1"
                            }`}
                    >
                        <span
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-900 font-semibold transition-all duration-300 ${isOpen ? "shadow-[0_10px_20px_rgba(255,115,29,0.35)]" : ""
                                }`}
                        >
                            {isPending ? (
                                <svg
                                    className="w-5 h-5 animate-spin text-slate-900"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" />
                                    <path className="opacity-75" d="M4 12a8 8 0 018-8" />
                                </svg>
                            ) : (
                                <span className="text-sm">{isOpen ? "On" : "Off"}</span>
                            )}
                        </span>
                    </span>
                </button>
                <div>
                    <p className="text-white font-medium">
                        {isOpen ? "Registration is open" : "Registration is closed"}
                    </p>
                    <p className="text-sm text-slate-400">
                        Tap to Open it. {isPending ? "Saving…" : "Changes save instantly."}
                    </p>
                </div>
            </div>
        </form>
    );
}