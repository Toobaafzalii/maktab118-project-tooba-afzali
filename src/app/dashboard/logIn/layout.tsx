"use client";

import { AppButton } from "@/components/molecules/appButton";
import ArrowLeft from "../../../../public/svg/ArrowLeft.svg";
import TibziLogo from "../../../../public/svg/TibziLogo.svg";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div
      className="relative flex h-screen bg-cover bg-no-repeat "
      style={{
        backgroundImage: "url(/png/admin-login-bg.png)",
      }}
    >
      <div className="flex flex-col justify-center   sm:w-[609px]      w-[90%] !h-screen  absolute right-8 left-8 sm:left-0 ">
        <div className="bg-light-primary-surface-default p-5 gap-8 w-full flex justify-between items-center">
          <TibziLogo />
          <div onClick={() => router.push("/")}>
            <AppButton
              text="بازگشت"
              iconLeft={(className) => <ArrowLeft className={className} />}
              size="l"
              variant="secondary"
            />
          </div>
        </div>
        {children}
        <div className="bg-light-primary-surface-default p-5 gap-2 w-full flex justify-center items-center">
          <p className=" text-light-primary-text-subtitle text-subtitle-16">
            ادمین نیستید؟
          </p>
          <div onClick={() => router.push("/login")}>
            <AppButton
              text="ورود کاربران"
              iconLeft={(className) => <ArrowLeft className={className} />}
              size="l"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
