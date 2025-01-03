"use client";
import AppPrivateRoute from "@/components/organisms/appPrivetRoute";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import TwLogoDark from "../../../../public/svg/TW-logo-dark.svg";
import ArrowLeft from "../../../../public/svg/ArrowLeft-gray.svg";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, isRehydrateStorage } = useAuthStore();

  const canAccess = useMemo(() => {
    return Boolean(user?.accessToken);
  }, [user]);

  if (!isRehydrateStorage) return null;
  return (
    <AppPrivateRoute redirectTo="/login" canAccess={canAccess}>
      <div className="relative min-h-screen flex flex-col bg-light-primary-surface-default">
        <div className="w-full sticky top-0 py-5 px-10 flex justify-between items-center bg-light-primary-surface-default-subtle">
          <div className="flex justify-between items-center gap-2">
            <TwLogoDark />
            <span className="text-title-24 text-light-primary-text-title">
              وضعیت ثبت سفارش
            </span>
          </div>
          <div
            className="flex justify-between items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-title-24 text-light-primary-text-title">
              بازگشت به خانه
            </span>
            <ArrowLeft />
          </div>
        </div>
        <div className=" flex flex-1 w-full justify-center mx-auto">
          {children}
        </div>
      </div>
    </AppPrivateRoute>
  );
}
