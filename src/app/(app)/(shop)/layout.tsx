import AppFooter from "@/components/molecules/appFooter";
import AppHeader from "@/components/molecules/appHeader";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col min-h-screen">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
