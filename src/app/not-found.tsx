"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-10">
      <img src="./svg/404-error.svg" />
      <h1 className="text-light-primary-text-title text-display-48 text-center">
        صفحه‌ای که دنبالش هستی رو پیدا نکردیم!
      </h1>
      <p className="text-right text-light-primary-text-subtitle text-subtitle-20">
        شاید نکات زیر بهتون کمک کنه:
        <br />
        بررسی لینک:شاید یه اشتباهی توی تایپ کردنش رخ داده باشه. یه بار دیگه دقیق
        نگاه کنید.
        <br />
        بازگشت به صفحه اصلی: به
        <span
          className="text-light-primary-text-subtitle text-title-20 cursor-pointer"
          onClick={() => router.push("/")}
        >
          &nbsp; صفحه اصلی &nbsp;
        </span>
        برگردید و دوباره از اونجا شروع کنید.
      </p>
    </div>
  );
}
