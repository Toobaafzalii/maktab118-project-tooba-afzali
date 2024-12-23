import TwLogoDark from "../../../../../public/svg/TW-logo.svg";
import ArrowLeft from "../../../../../public/svg/ArrowLeft-gray.svg";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen flex flex-col bg-light-primary-surface-default">
      <div className="w-full sticky top-0 py-5 px-10 flex justify-between items-center bg-light-primary-surface-default-subtle">
        <div className="flex justify-between items-center gap-2">
          <TwLogoDark />
          <span className="text-title-24 text-light-primary-text-title">
            تکمیل خرید
          </span>
        </div>
        <div className="flex justify-between items-center gap-2 cursor-pointer">
          <span className="text-title-24 text-light-primary-text-title">
            بازگشت
          </span>
          <ArrowLeft />
        </div>
      </div>
      <div className=" flex flex-1 container w-full"> {children}</div>
    </div>
  );
}
