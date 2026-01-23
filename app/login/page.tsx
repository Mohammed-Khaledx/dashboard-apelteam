"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { login } from "../lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await login(null, formData);

      if (result?.success) {
        router.push("/dashboard");
        router.refresh();
      } else if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="nebula-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-slate-700/50 flex items-center justify-center shadow-lg shadow-orange-500/10">
            <Image src="/apel.svg" alt="APEL" width={38} height={38} priority />
          </div>

          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            APEL
          </h1>
          <p className="text-slate-400 mt-2">Team Dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isPending}
                    placeholder="team@dashboard.com"
                    autoComplete="email"
                    className="pl-10 bg-slate-900/50 border-slate-700 focus:border-orange-500/50 focus:ring-orange-500/20 h-11"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isPending}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="pl-10 bg-slate-900/50 border-slate-700 focus:border-orange-500/50 focus:ring-orange-500/20 h-11"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Error Message */}
              {error && !isPending && (
                <Alert variant="destructive" className="bg-red-950/30 border-red-900/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-600 text-sm mt-6">
          © {new Date().getFullYear()} APEL Team. All rights reserved.
        </p>
      </div>
    </div>
  );
}
