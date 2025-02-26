"use client";

import { AppButton } from "@/components/molecules/appButton";
import AppCarousel from "@/components/molecules/appCarousel";
import AppFilteringSidebar, {
  Filters,
} from "@/components/organisms/appFilteringSidebar";
import AppImage from "@/components/organisms/appImage";
import AppProductsList from "@/components/organisms/appProductsList";
import React, { useState } from "react";
import ArrowLeft from "../../../../public/svg/ArrowLeft.svg";
import { useRouter } from "next/navigation";
import useSubcategories from "@/hooks/queries/useSubcategories";
import { useMediaQuery } from "react-responsive";

const collectionImages = [
  "./png/collection-image-1.png",
  "./png/collection-image-2.png",
];

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters | null>(null);
  const onFiltersChange = (filters: Filters) => {
    setFilters(filters);
  };
  const { subcategories } = useSubcategories({ page: 1 });
  const isSmallScreenSize = useMediaQuery({ query: "(max-width: 716px)" });

  const banerImages = {
    men: [
      {
        src: "./png/birunPush-men.png",
        navigateTo: "/676c4e5c356fd2e734003a82/byrwn-pwsh-aaqayan",
      },
      {
        src: "./png/shalvar-men.png",
        navigateTo: "/676c4e5c356fd2e734003a82/shlwar-aaqayan",
      },
      {
        src: "./png/tshirt-men.png",
        navigateTo: "/676c4e5c356fd2e734003a82/ty-shrt-aaqayan",
      },
      {
        src: "./png/baftani-men.png",
        navigateTo: "/676c4e5c356fd2e734003a82/",
      },
      { src: "./png/kafsh-men.png", navigateTo: "/676c4e5c356fd2e734003a82/" },
    ],
    women: [
      {
        src: "./png/birunPush-women.png",
        navigateTo: "/676c4e27356fd2e734003a7e/byrwn-pwsh-banwan",
      },
      {
        src: "./png/shalvar-women.png",
        navigateTo: "/676c4e27356fd2e734003a7e/shlwar-banwan",
      },
      {
        src: "./png/tshirt-women.png",
        navigateTo: "/676c4e27356fd2e734003a7e/",
      },
      {
        src: "./png/baftani-women.png",
        navigateTo: "/676c4e27356fd2e734003a7e/",
      },
      {
        src: "./png/kafsh-women.png",
        navigateTo: "/676c4e27356fd2e734003a7e/kfsh-banwan",
      },
    ],
  };

  return (
    <div>
      <AppCarousel />
      <div className="w-full flex flex-col justify-between items-center gap-2 py-5 bg-light-primary-surface-object">
        <div className="w-full flex justify-between items-start p-10">
          <span className="text-title-24 md:text-title-32 text-light-primary-text-title">
            کالکشن کشمیر
          </span>
          <div className="flex flex-col justify-start items-start gap-10">
            <span className="text-subtitle-16 md:text-subtitle-20 text-light-primary-text-title max-w-lg">
              با مجموعه‌ای خیره‌کننده از تازه‌ترین‌ها، قدم به دنیای مد بگذارید.
              کالکشن کشمیر تیبزی، نگاهی مدرن به فرهنگی غنی را ارائه می‌کند!
            </span>
            <AppButton
              text="مشاهده کالکشن"
              variant="primary"
              outline
              iconLeft={(className) => <ArrowLeft className={className} />}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-0.5">
          {collectionImages &&
            collectionImages.map((img) => {
              return <AppImage key={img} src={img} className="w-[49%]" />;
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-between items-start gap-10 p-[40px] lg:p-[60px]">
        <p className="text-title-28 md:text-title-36 w-full text-nowrap">
          برای بانوان
        </p>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
          {banerImages &&
            banerImages.women.map((baner, index) => {
              return (
                <AppImage
                  key={baner.src}
                  className={`cursor-pointer hover:shadow-md hover:scale-[102%] transition-all duration-500 ${
                    index === 0 ? "grid col-span-2" : "col-span-1"
                  }`}
                  src={baner.src}
                  onClick={() => router.push(baner.navigateTo)}
                />
              );
            })}
        </div>
      </div>

      <div className="w-full flex flex-col justify-between items-start gap-10 p-[40px] lg:p-[60px] bg-light-primary-surface-object">
        <p className="text-title-28 md:text-title-36 w-full text-nowrap">
          برای آقایان
        </p>
        <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-4 ">
          {banerImages &&
            banerImages.men.map((baner, index) => {
              return (
                <AppImage
                  key={baner.src}
                  className={`cursor-pointer hover:shadow-md hover:scale-[102%] transition-all duration-500 ${
                    index === 0 || index === 1
                      ? "grid col-span-2 lg:col-span-3"
                      : "col-span-1 lg:col-span-2"
                  }`}
                  src={baner.src}
                  onClick={() => router.push(baner.navigateTo)}
                />
              );
            })}
        </div>
      </div>

      <div
        className={`w-full flex justify-between items-start pt-2 ${
          isSmallScreenSize ? "flex-col-reverse " : "flex-row"
        }`}
      >
        <div className="w-full flex-1 flex flex-col justify-between items-start gap-5 px-4">
          <span className="w-full text-title-24 md:text-title-28 text-light-primary-text-title mt-7">
            لیست محصولات
          </span>
          <AppProductsList filters={filters} size="sm" />
        </div>
        <AppFilteringSidebar onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
};
export default LandingPage;
