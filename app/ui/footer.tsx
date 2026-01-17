// src/components/ui/Footer.tsx
export function Footer() {
  return (
    <footer
      style={{
        padding: 16,
        borderTop: '1px solid #ddd',
        textAlign: 'center',
      }}
    >
      © {new Date().getFullYear()} Team Dashboard
    </footer>
  );
}
