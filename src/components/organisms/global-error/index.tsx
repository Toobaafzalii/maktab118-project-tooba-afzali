"use client";

import { FallbackProps } from "react-error-boundary";
import AppHeader from "@/components/molecules/appHeader";

interface ErrorDetails {
  title: string;
  description: string;
  image: string;
}

const errorMap: Record<string, ErrorDetails> = {
  "403": {
    title: "همه درها بسته بودند!",
    description:
      "متاسفانه دسترسی به این بخش برای شما امکان پذیر نیست، لطفا دسترسی خود به اینترنت را بررسی کرده و در صورت استفاده از VPN، آن را غیر فعال کنید. سپس دوباره امتحان کنید.",
    image: "/svg/error-403.svg",
  },
  "500": {
    title: "یه مشکل فنی کوچیک پیش اومده!",
    description:
      "بابت بروز این مشکل عذر خواهیم، در تلاشیم به سرعت مشکل را حل کنیم.",
    image: "/svg/error-500.svg",
  },
  "501": {
    title: "این صفحه در دست ساخت است!",
    description:
      "متاسفانه، این بخش هنوز آماده نیست و فعلاً دسترسی به این صفحه امکان‌پذیر نیست. نگران نباشید، این به معنی خراب بودن صفحه نیست، بزودی این بخش در دسترس قرار می‌گیرد.",
    image: "/svg/error-501.svg",
  },
  "502": {
    title: "متاسفیم، ارتباط برقرار نشد!",
    description:
      "متاسفانه نمی‌تونید صفحه‌ای که دنبالش هستید رو باز کنید. احتمالا یه مشکل کوچیک وجود داره. امیدواریم به زودی برطرف بشه.",
    image: "/svg/error-502.svg",
  },
  "503": {
    title: "سرویس در حال حاضر در دسترس نیست!",
    description:
      "درحال تلاشیم خیلی زود مشکل را برطرف کنیم، لطفاً چند دقیقه دیگر دوباره امتحان کنید.",
    image: "/svg/error-503.svg",
  },
  "504": {
    title: "بازکردن این صفحه بیش از حد طول کشید دوباره امتحان کنید.",
    description:
      "بابت مشکل پیش آمده متاسفیم، تیم فنی ما در تلاش برای حل مشکل پیش آمده می‌باشد و امیدواریم در اولین فرصت، این مشکل رفع شود.",
    image: "/svg/error-504.svg",
  },
};

const GlobalErrorBoundary = ({ error }: FallbackProps) => {
  const errorCode = error?.message || "500";
  const errorDetails = errorMap[errorCode] || errorMap["500"];

  return (
    <div>
      <AppHeader />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-10">
        <img src={errorDetails.image} />
        <h1 className="text-light-primary-text-title text-display-48 max-w-3xl text-center">
          {errorDetails.title}
        </h1>
        <p className="text-right text-light-primary-text-subtitle text-subtitle-20">
          {errorDetails.description}
        </p>
      </div>
    </div>
  );
};

export default GlobalErrorBoundary;
