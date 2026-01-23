import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyJwt } from "../lib/auth";
import { logout } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Users,
  FileText,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Menu
} from "lucide-react";

const navItems = [
  {
    label: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    label: "Competition Form",
    href: "/dashboard/compition-form",
    icon: FileText,
  },
];

function SidebarContent() {
  return (
    <>
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-slate-700/50 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
            <Image src="/apel.svg" alt="APEL" width={26} height={26} priority />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight text-white">APEL</div>
            <div className="text-xs text-slate-500">Team Dashboard</div>
          </div>
        </Link>
      </div>

      <Separator className="bg-slate-800/50" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider px-3 mb-4">
            Menu
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group"
            >
              <item.icon className="h-5 w-5 text-slate-500 group-hover:text-orange-400 transition-colors" />
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
      </ScrollArea>

      <Separator className="bg-slate-800/50" />

      {/* Logout */}
      <div className="p-4">
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-500 hover:text-red-400 hover:bg-red-950/30"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </form>
      </div>
    </>
  );
}

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
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex w-72 border-r border-slate-800/50 flex-col bg-slate-950/30 backdrop-blur-sm">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-slate-400 hover:text-white"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-72 p-0 bg-slate-950 border-slate-800"
                >
                  <div className="flex flex-col h-full">
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Logo */}
              <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-slate-700/50 flex items-center justify-center">
                  <Image src="/apel.svg" alt="APEL" width={20} height={20} priority />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">APEL</span>
              </Link>

              {/* Desktop Title */}
              <div className="hidden lg:flex items-center gap-3">
                <LayoutDashboard className="h-5 w-5 text-slate-500" />
                <h2 className="text-lg font-semibold tracking-tight text-white">
                  Dashboard
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-slate-800 items-center justify-center">
                <Image src="/apel.svg" alt="APEL" width={20} height={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

