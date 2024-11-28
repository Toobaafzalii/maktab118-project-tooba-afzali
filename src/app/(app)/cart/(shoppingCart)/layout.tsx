export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      CART LAYOUT
      {children}
    </div>
  );
}
