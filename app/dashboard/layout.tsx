import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJwt } from '../lib/auth';
import { LogoutButton } from "@/app/ui/LogoutButton";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesN = await cookies()
  const token = cookiesN.get('auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    verifyJwt(token);
  } catch {
    redirect('/login');
  }

 return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 200,
          padding: 16,
          borderRight: '1px solid #ddd',
        }}
      >
        <h3>Dashboard</h3>

        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link href="/dashboard">Home</Link>
            </li>
            <li>
              <Link href="/dashboard/team">Team</Link>
            </li>
            <li>
              <Link href="/dashboard/users">Users</Link>
            </li>
            <li>
              <Link href="/dashboard/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Area */}
      <div style={{ flex: 1 }}>
        {/* Header */}
        <header
          style={{
            padding: 16,
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Team Dashboard</span>

          <form action={logout}>
            <button type="submit">Logout</button>
          </form>
        </header>

        {/* Page Content */}
        <main style={{ padding: 16 }}>{children}</main>
      </div>
    </div>
  );

}

import { logout } from '../lib/actions';
import Link from 'next/link';

