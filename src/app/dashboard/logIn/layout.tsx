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
      className=" md:block flex h-screen min-h-screen bg-cover bg-no-repeat "
      style={{
        backgroundImage: "url(/png/admin-login-bg.png)",
      }}
    >
      <div className="flex flex-1 flex-col justify-center p-8 w-full md:w-1/2 lg:w-1/3 max-h-screen">
        <div className="bg-light-primary-surface-default p-5 gap-8 w-[609px] flex justify-between items-center">
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
        <div className="bg-light-primary-surface-default p-5 gap-2 w-[609px] flex justify-center items-center">
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
