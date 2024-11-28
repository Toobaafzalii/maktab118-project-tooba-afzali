export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      DASHBOARD LAYOUT
      {children}
    </div>
  );
}
