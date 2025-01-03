import AppHeader from "@/components/molecules/appHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-light-primary-surface-default">
      <AppHeader />
      <div className="pt-20 flex flex-1 w-full justify-center mx-auto">
        {children}
      </div>
    </div>
  );
}
