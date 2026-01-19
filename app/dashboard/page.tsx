import { redirect } from "next/navigation";

export default function DashboardPage() {

  redirect('/dashboard/team')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-slate-400 mt-1">Here&apos;s what&apos;s happening with your team.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Total Members</p>
          <p className="text-3xl font-bold">42</p>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Active</p>
          <p className="text-3xl font-bold text-emerald-400">38</p>
        </div>
        <div className="card p-6">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Graduated</p>
          <p className="text-3xl font-bold text-orange-400">4</p>
        </div>
      </div>
    </div>
  );
}