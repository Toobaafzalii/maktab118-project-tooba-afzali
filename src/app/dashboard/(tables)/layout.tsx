"use client";

import { usePathname, useRouter } from "next/navigation";
import TextIndent from "../../../../public/svg/TextIndent.svg";
import TibziLogo from "../../../../public/svg/TibziLogo.svg";
import ListChecks from "../../../../public/svg/ListChecks.svg";
import BoxArrowUp from "../../../../public/svg/BoxArrowUp.svg";
import Tag from "../../../../public/svg/Tag.svg";
import Moon from "../../../../public/svg/Moon.svg";
import UArrow from "../../../../public/svg/ArrowUDownRight.svg";
import TWLogo from "../../../../public/svg/TW-logo.svg";
import UserAvatar from "../../../../public/svg/UserAvatar.svg";
import useAuthStore from "../../../stores/useAuthStore/index";
import AppPrivateRoute from "@/components/organisms/appPrivetRoute";
import { useMemo } from "react";

type Pathname = "/dashboard" | "/dashboard/products" | "/dashboard/prices";

const NavItem = ({
  path,
  currentPath,
  icon: Icon,
  label,
}: {
  path: string;
  currentPath: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}) => {
  const router = useRouter();
  const isActive = currentPath === path;

  const handleClick = () => {
    if (!isActive) router.push(path);
  };

  return (
    <div
      className={`flex justify-start items-center gap-3 py-3 px-5 w-full cursor-pointer ${
        isActive
          ? "bg-light-primary-surface-negative-subtle text-light-primary-text-negative"
          : "hover:bg-light-primary-surface-default text-light-primary-text-body"
      }`}
      onClick={handleClick}
    >
      <Icon
        className={`fill-current ${
          isActive
            ? "text-light-primary-text-negative"
            : "text-light-primary-text-body"
        }`}
      />
      <p className="text-subtitle-20">{label}</p>
    </div>
  );
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname() as Pathname;
  const router = useRouter();
  const { user, clearUser, isRehydrateStorage } = useAuthStore();

  const pageTitle: Record<Pathname, { title: string; description: string }> = {
    "/dashboard": {
      title: "مدیریت سفارش‌ها",
      description:
        "جدید ترین سفارش‌های وبسایت‌را مشاهده و آنها را مدیریت کنید.",
    },
    "/dashboard/products": {
      title: "مدیریت محصولات",
      description: "محصولات وبسایت را مشاهده و ویرایش کنید.",
    },
    "/dashboard/prices": {
      title: "مدیریت قیمت و موجودی",
      description: "قیمت و موجودی محصولات را مشاهده و ویرایش کنید.",
    },
  };

  const handleLogout = () => {
    clearUser();
    router.push("/dashboard/login");
  };

  const canAccess = useMemo(() => {
    return user?.role === "ADMIN";
  }, [user]);

  const { title = "", description = "" } = pageTitle[pathName] || {};
  if (!isRehydrateStorage) return null;
  return (
    <AppPrivateRoute redirectTo="/dashboard/logIn" canAccess={canAccess}>
      <div className="bg-light-primary-surface-default w-full flex justify-between items-start text-nowrap">
        <div className="bg-light-primary-surface-default-subtle min-h-screen sticky left-0 top-0 w-72 flex flex-col justify-start items-start gap-3 py-10 px-6">
          <div className="flex flex-col justify-start items-start gap-8 w-full">
            <div className="flex justify-between items-center w-full">
              <TibziLogo />
              <TextIndent />
            </div>

            <div className="py-8 border-y-[1px] border-light-primary-border-default-subtle w-full">
              <NavItem
                path="/dashboard"
                currentPath={pathName}
                icon={ListChecks}
                label="سفارش‌ها"
              />
              <NavItem
                path="/dashboard/products"
                currentPath={pathName}
                icon={BoxArrowUp}
                label="محصولات"
              />
              <NavItem
                path="/dashboard/prices"
                currentPath={pathName}
                icon={Tag}
                label="قیمت و موجودی"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 w-full">
            <div className="flex justify-start items-center gap-3 py-3 px-5 w-full cursor-pointer hover:bg-light-primary-surface-default">
              <Moon className="fill-current text-light-primary-text-body" />
              <p className="text-light-primary-text-body text-subtitle-20">
                تغییر به تم تیره
              </p>
            </div>
            <div
              className="flex justify-start items-center gap-3 py-3 px-5 w-full cursor-pointer hover:bg-light-primary-surface-default"
              onClick={() => router.push("/")}
            >
              <TWLogo className="fill-current text-light-primary-text-body" />
              <p className="text-light-primary-text-body text-subtitle-20">
                بازگشت به وبسایت
              </p>
            </div>
            <div
              className="flex justify-start items-center gap-3 py-3 px-5 w-full cursor-pointer hover:bg-light-primary-surface-default"
              onClick={() => handleLogout()}
            >
              <UArrow className="fill-current text-light-error-text-title" />
              <p className="text-light-error-text-title text-subtitle-20">
                خروج از حساب
              </p>
            </div>
          </div>

          <div className="mt-auto w-full pt-10 border-t-[1px] border-light-primary-border-default-subtle">
            <div className="flex justify-start items-center gap-4">
              <UserAvatar className="fill-current text-light-primary-text-body" />
              <div className="flex flex-col justify-start items-start gap-3">
                <p className="text-light-primary-text-title text-title-20">
                  {user?.firstName || "کاربر"} {user?.lastName || "ناشناس"}
                </p>
                <p className="text-light-primary-text-subtitle text-subtitle-14">
                  {user?.role === "ADMIN" ? "ادمین تیبزی" : "کاربر عادی"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 flex bg-light-primary-surface-default flex-col justify-start items-start gap-7 w-full">
          <div className="flex flex-col justify-start items-start gap-1 border-b-[1px] border-light-primary-border-default w-full pb-10">
            <p className="text-light-primary-text-title text-title-24">
              {title}
            </p>
            <p className="text-light-primary-text-subtitle text-subtitle-16">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </AppPrivateRoute>
  );
}
