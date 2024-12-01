export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      AUTH LAYOUT
      {children}
    </div>
  );
}
