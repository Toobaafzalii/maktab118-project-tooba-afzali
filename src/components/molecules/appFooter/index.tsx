"use client";

import TwLogo from "../../../../public/svg/TW-logo.svg";
import Telegram from "../../../../public/svg/Telegram.svg";
import Linkedin from "../../../../public/svg/LinkedIn.svg";
import Instagram from "../../../../public/svg/Instagram.svg";
import { useRouter } from "next/navigation";

const AppFooter: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full px-24 pt-10 pb-24 bg-dark-primary-surface-default flex flex-col md:flex-row justify-between items-start gap-10 text-dark-primary-text-title">
      <div className="flex flex-col justify-between items-start gap-5 max-w-xl w-full">
        <TwLogo
          className="cursor-pointer hover:scale-105"
          onClick={() => router.push("/")}
        />
        <span className="text-subtitle-16 text-dark-primary-text-title">
          تیبزی با الهام از زیبایی‌های بی‌کران طبیعت و با تمرکز بر کیفیت بی‌نقص،
          مجموعه‌ای از پوشاک منحصربه‌فرد را ارائه می‌دهد. هر لباس تیبزی نتیجه
          تلفیق هنر، طبیعت و تعهد به استانداردهای بالا است تا شما تجربه‌ای
          متفاوت از شیک‌پوشی و راحتی داشته باشید.
        </span>
      </div>
      <div className="flex justify-between items-start gap-14">
        <div className="flex flex-col justify-between items-start gap-2">
          <p className="text-title-18 cursor-default">دسترسی سریع</p>
          <p
            className="text-subtitle-16 cursor-pointer hover:scale-105 "
            onClick={() => router.push("/aboutUs")}
          >
            درباره‌ما
          </p>
          <p
            className="text-subtitle-16 cursor-pointer hover:scale-105 "
            onClick={() => router.push("/")}
          >
            محصولات
          </p>
          <p
            className="text-subtitle-16 cursor-pointer hover:scale-105 "
            onClick={() => router.push("/signup")}
          >
            ورود و ثبت‌نام
          </p>
          <p
            className="text-subtitle-16 cursor-pointer hover:scale-105 "
            onClick={() => router.push("/dashboard/logIn")}
          >
            ورود به داشبورد
          </p>
        </div>
        <div className="flex flex-col justify-between items-start gap-2">
          <p className="text-title-18 cursor-default"> تماس با ما</p>
          <p className="text-subtitle-16 hover:scale-105 cursor-default ">
            {" "}
            ۰۹۱۲ ۱۲۳ ۴۵۶۷
          </p>
          <p className="text-subtitle-16 cursor-pointer hover:scale-105 ">
            info@tibziwear.ir
          </p>
          <p className="text-subtitle-16 cursor-default">
            تهران، میدان اول، خیابان دوم، کوچه سوم، پلاک ۴، واحد ۵
          </p>
          <div className="flex justify-between items-center gap-6 py-2">
            <Instagram className="cursor-pointer hover:scale-105" />
            <Linkedin className="cursor-pointer hover:scale-105" />
            <Telegram className="cursor-pointer hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppFooter;
