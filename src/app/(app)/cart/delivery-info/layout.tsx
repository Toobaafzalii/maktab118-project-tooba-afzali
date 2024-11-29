export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      PLAIN LAYOUT
      {children}
    </div>
  );
}
