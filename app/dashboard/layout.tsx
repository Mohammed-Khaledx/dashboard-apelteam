import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyJwt } from "../lib/auth";
import { logout } from "../lib/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesN = await cookies();
  const token = cookiesN.get("auth_token")?.value;

  if (!token) redirect("/login");

  try {
    verifyJwt(token);
  } catch {
    redirect("/login");
  }

  return (
    <div className="nebula-bg min-h-screen flex">
      <aside className="w-64 border-r border-slate-800/50 p-6 flex flex-col">
        <Link href="/dashboard" className="mb-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-center">
            <Image src="/apel.svg" alt="APEL" width={24} height={24} priority />
          </div>

          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight text-white">APEL</div>
            <div className="text-xs text-slate-500">Team Dashboard</div>
          </div>
        </Link>

        <nav className="flex-1">
          <ul className="space-y-2">
            {/* <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <span>Home</span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/dashboard/team"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <span>Team</span>
              </Link>
            </li>
          </ul>
        </nav>

        <form action={logout} className="mt-auto">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
          >
            <span>Logout</span>
          </button>
        </form>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-slate-800/50 px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Dashboard
          </h2>

          <div className="h-9 w-9 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-center">
            <Image src="/apel.svg" alt="APEL" width={20} height={20} />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

