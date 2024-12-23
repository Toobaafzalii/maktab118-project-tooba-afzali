import AppHeader from "@/components/molecules/appHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-light-primary-surface-default">
      <AppHeader />
      <div className="pt-20 flex flex-1 container w-full"> {children}</div>
    </div>
  );
}
