"use client";
import { Filters } from "@/components/organisms/appFilteringSidebar";
import AppProductsList from "@/components/organisms/appProductsList";
import useCategories from "@/hooks/queries/useCategories";
import useSubcategoryByIds from "@/hooks/queries/useSubcategoryByIds";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArrowLeft from "../../../../../../public/svg/ArrowLeft-gray.svg";
import AppSelectBox from "@/components/atoms/appSelectBox";
import NotFound from "@/app/(app)/notFound/page";

const SubcategoryPage: React.FC = () => {
  const pathname = usePathname();
  const { subcategoryByIds, subcategoryByIdsData, subcategoryByIdsError } =
    useSubcategoryByIds();
  const { categories, categoriesError } = useCategories({ page: 1 });

  const categoryFilter = pathname.replace("/", "").split("/")[0];
  const subCategoryFilter = pathname.replace("/", "").split("/")[1];

  const [filters, setFilters] = useState<Filters>({
    sort: "",
    category: categoryFilter,
    subcategories: [subCategoryFilter],
  });

  useEffect(() => {
    subcategoryByIds({ ids: [subCategoryFilter] });
  }, [subCategoryFilter]);

  if (categoriesError || subcategoryByIdsError) {
    return <NotFound />;
  }

  return (
    <div className="flex mx-auto self-center flex-col flex-1 px-8">
      <div className="w-full flex justify-between items-end py-5 ">
        <span className="flex text-nowrap items-center justify-between gap-1">
          <span className="text-light-primary-text-subtitle text-subtitle-20">
            {
              categories?.data.categories.find(
                (category) => category._id === categoryFilter
              )?.name
            }
          </span>
          <ArrowLeft />
          <span className="text-subtitle-24 text-light-primary-text-body">
            {subcategoryByIdsData &&
              subcategoryByIdsData?.length > 0 &&
              subcategoryByIdsData[0].data.subcategory.name}
          </span>
        </span>
        <div className="w-[14%]">
          <AppSelectBox
            options={[
              { name: "جدیدترین", value: "createdAt" },
              { name: "قدیمی‌ترین", value: "-createdAt" },
              { name: "ارزان‌ترین", value: "price" },
              { name: "گران‌ترین", value: "-price" },
            ]}
            id="sortBy"
            sizing="sm"
            onValueChange={(value: string) =>
              setFilters((prev) => ({ ...prev, sort: value }))
            }
          />
        </div>
      </div>
      <AppProductsList filters={filters} size="lg" />
    </div>
  );
};
export default SubcategoryPage;
