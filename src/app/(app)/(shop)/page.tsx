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
import AppProductCard from "@/components/molecules/appProductCard";
import { useRouter } from "next/navigation";
import useSubcategories from "@/hooks/queries/useSubcategories";

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

  const banerImages = {
    men: [
      {
        src: "./png/birunPush-men.png",
        navigateTo: "/676c4e5c356fd2e734003a82/677410dd7ed059709dae448f",
      },
      {
        src: "./png/shalvar-men.png",
        navigateTo: "/676c4e5c356fd2e734003a82/676c5d6e356fd2e7340042c4",
      },
      {
        src: "./png/tshirt-men.png",
        navigateTo: "/676c4e5c356fd2e734003a82/676c6af6356fd2e7340045e5",
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
        navigateTo: "/676c4e27356fd2e734003a7e/676c4f03356fd2e734003ab1",
      },
      {
        src: "./png/shalvar-women.png",
        navigateTo: "/676c4e27356fd2e734003a7e/676eb09bce8dff5ee3b614c1",
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
        navigateTo: "/676c4e27356fd2e734003a7e/676c62e4356fd2e7340044bc",
      },
    ],
  };

  return (
    <div>
      <AppCarousel />
      <div className="w-full flex flex-col justify-between items-center gap-2 py-5 bg-light-primary-surface-object">
        <div className="w-full flex justify-between items-start p-10">
          <span className="text-title-32 text-light-primary-text-title">
            کالکشن کشمیر
          </span>
          <div className="flex flex-col justify-start items-start gap-10">
            <span className="text-subtitle-20 text-light-primary-text-title max-w-lg">
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
        {/* <div className="flex justify-between items-center p-5 gap-4 ">
          <AppProductCard
            thumbnail="https://cdn.shopify.com/s/files/1/0498/5713/4756/files/MLOJ3603_CML_0006_b09f4163-8130-4a61-9db1-32c5402d1941_600x.progressive.jpg?v=1729715138"
            name="تی‌شرت لوکس کمل"
            price={26500}
            quantity={1}
            id="1"
          />
          <AppProductCard
            thumbnail="https://cdn.shopify.com/s/files/1/0498/5713/4756/files/MLOJ3603_CML_0006_b09f4163-8130-4a61-9db1-32c5402d1941_600x.progressive.jpg?v=1729715138"
            name="تی‌شرت لوکس کمل"
            price={26500}
            quantity={1}
            id="2"
          />
          <AppProductCard
            thumbnail="https://cdn.shopify.com/s/files/1/0498/5713/4756/files/MLOJ3603_CML_0006_b09f4163-8130-4a61-9db1-32c5402d1941_600x.progressive.jpg?v=1729715138"
            name="تی‌شرت لوکس کمل"
            price={26500}
            quantity={1}
            id="3"
          />
        </div> */}
      </div>

      <div className="w-full flex flex-col justify-between items-start gap-10 p-[60px]">
        <p className="text-title-36 w-full text-nowrap">برای بانوان</p>
        <div className="w-full grid grid-cols- gap-4">
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

      <div className="w-full flex flex-col justify-between items-start gap-10 p-[60px] bg-light-primary-surface-object">
        <p className="text-title-36 w-full text-nowrap">برای آقایان</p>
        <div className="w-full grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
          {banerImages &&
            banerImages.men.map((baner, index) => {
              return (
                <AppImage
                  key={baner.src}
                  className={`cursor-pointer hover:shadow-md  hover:scale-[102%] transition-all duration-500 ${
                    index === 0 || index === 1
                      ? "grid col-span-3"
                      : "col-span-1"
                  }`}
                  src={baner.src}
                  onClick={() => router.push(baner.navigateTo)}
                />
              );
            })}
        </div>
      </div>

      <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-start pt-2">
        <div className="w-full flex-1 flex flex-col justify-between items-start gap-5 px-4">
          <span className="w-full text-title-28 text-light-primary-text-title mt-7">
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
