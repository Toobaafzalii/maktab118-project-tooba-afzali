"use client"
import { AppButton } from "@/components/molecules/appButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const categories = {
    "برای آقایان": ["تی شرت", "شلوار", "پولوشرت", "بیرون پوش", "کفش", "کیف"],
    "برای بانوان": ["مانتو", "دامن", "شلوار", "کفش", "کیف"],
    کالکشن‌ها: ["جدید", "محبوب", "تخفیف‌دار"],
  };


  const toggleDropdown = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  return (
<div className="flex flex-col justify-start items-center">
<header className="bg-light-primary-surface-negative text-white w-full sticky top-0 px-14 py-3">
      <div className="container mx-auto flex items-center justify-between ">
     
        <div className="font-bold text-title-28">TIBZI WEAR</div>

     
        <nav className="flex space-x-8 rtl:space-x-reverse">
          {Object.keys(categories).map((category) => (
            <div
              key={category}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(category)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
     
              <button
                className="flex items-center space-x-2 rtl:space-x-reverse focus:outline-none"
                onClick={() => toggleDropdown(category)}
              >
                <span>{category}</span>
                <span>▼</span>
              </button>

       
              {activeDropdown === category && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-light-primary-surface-negative-subtle shadow-lg z-10">
                  <ul>
                    {categories[category].map((item) => (
                      <li
                        key={item}
                        className="px-4 py-2 text-body-18 text-light-primary-text-negative-subtle hover:bg-light-primary-surface-negative-subtle cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <span  className="hover:text-gray-300 cursor-pointer" 
          onClick={() =>router.push("/aboutUs")}>
            درباره ما
          </span>
        </nav>
<div className="flex justify-center items-center" >
  <AppButton text="ورود/ثبت نام" variant="primary" onClick={() =>router.push("/login")}/>
<AppButton text="سبد خرید" variant="secondary"  onClick={() =>router.push("/cart")}/>
</div>
       
        </div>
    </header>
    <div className="container">{children}</div>
</div>
  );
}
