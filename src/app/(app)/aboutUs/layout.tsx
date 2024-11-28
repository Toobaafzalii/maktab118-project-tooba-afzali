export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      LAYOUT
      {children}
    </div>
  );
}
