import './globals.css';

export const metadata = {
  title: 'Team Dashboard',
  description: 'Internal dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
