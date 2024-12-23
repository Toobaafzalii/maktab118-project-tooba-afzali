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

const banerImages: Array<{ src: string; navigateTo: string }> = [
  { src: "./png/biroonPush.png", navigateTo: "b" },
  { src: "./png/pants.png", navigateTo: "b" },
  { src: "./png/t-shirt.png", navigateTo: "b" },
];

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
        <div className="flex justify-between items-center gap-2">
          {collectionImages &&
            collectionImages.map((img) => {
              return <AppImage key={img} src={img} className="w-[49%]" />;
            })}
        </div>
        <div className="flex justify-between items-center p-5 gap-4">
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
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 p-5">
        {banerImages &&
          banerImages.map((baner) => {
            return (
              <AppImage
                key={baner.src}
                className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-500"
                src={baner.src}
                onClick={() => router.push(baner.navigateTo)}
              />
            );
          })}
      </div>

      <div className="w-full flex justify-between items-start">
        <div className="w-full flex-1 flex flex-col justify-between items-start gap-5 px-4">
          <span className="w-full text-title-28 text-light-primary-text-title">
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
