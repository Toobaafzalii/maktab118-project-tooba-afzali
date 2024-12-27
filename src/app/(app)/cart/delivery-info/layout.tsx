"use client";
import TwLogoDark from "../../../../../public/svg/TW-logo.svg";
import ArrowLeft from "../../../../../public/svg/ArrowLeft-gray.svg";
import { usePathname, useRouter } from "next/navigation";
import AppPrivateRoute from "@/components/organisms/appPrivetRoute";
import { useMemo } from "react";
import useAuthStore from "@/stores/useAuthStore";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useAuthStore();

  const canAccess = useMemo(() => {
    return Boolean(user?.accessToken);
  }, [user]);

  return (
    <AppPrivateRoute redirectTo="/login" canAccess={canAccess}>
      <div className="relative min-h-screen flex flex-col bg-light-primary-surface-default">
        <div className="w-full sticky top-0 py-5 px-10 flex justify-between items-center bg-light-primary-surface-default-subtle">
          <div className="flex justify-between items-center gap-2">
            <TwLogoDark />
            <span className="text-title-24 text-light-primary-text-title">
              تکمیل خرید
            </span>
          </div>
          <div
            className="flex justify-between items-center gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <span className="text-title-24 text-light-primary-text-title">
              بازگشت
            </span>
            <ArrowLeft />
          </div>
        </div>
        <div className=" flex flex-1 container w-full"> {children}</div>
      </div>
    </AppPrivateRoute>
  );
}
