"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";

import { login } from "../lib/actions";

export default function LoginPage() {
  const [state, action] = useActionState(login, null);
  const [email, setEmail] = useState("");

  if (state?.success) {
    redirect("/dashboard");
  }

  return (
    <div className="nebula-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-center">
            <Image src="/apel.svg" alt="APEL" width={34} height={34} priority />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">APEL</h1>
          <p className="text-slate-400 mt-2">Sign in to your dashboard</p>
        </div>

        <div className="card p-8">
          <form action={action} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                placeholder="team@dashboard.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full btn-highlight py-3 font-medium">
              Sign In
            </button>

            {state?.error && (
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-400 text-center">
                {state.error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
