import AppHeader from "@/components/molecules/appHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <AppHeader />;
  return <div>{children}</div>;
}
