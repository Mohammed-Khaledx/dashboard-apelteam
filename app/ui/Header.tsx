// src/components/ui/Header.tsx
import { LogoutButton } from './LogoutButton';

export function Header() {
  return (
    <header
      style={{
        padding: 16,
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <h3>Dashboard</h3>
      <LogoutButton />
    </header>
  );
}
