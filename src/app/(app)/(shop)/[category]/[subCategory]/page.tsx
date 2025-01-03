"use client";
import { Filters } from "@/components/organisms/appFilteringSidebar";
import AppProductsList from "@/components/organisms/appProductsList";
import useCategories from "@/hooks/queries/useCategories";
import useSubcategoryByIds from "@/hooks/queries/useSubcategoryByIds";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArrowLeft from "../../../../../../public/svg/ArrowLeft-gray.svg";
import AppSelectBox from "@/components/atoms/appSelectBox";
import NotFound from "@/app/notFound/page";
import useSubcategories from "@/hooks/queries/useSubcategories";
import { toast } from "react-toastify";
import { client } from "@/api/axios";

const SubcategoryPage: React.FC = () => {
  const pathname = usePathname();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const { isSubCategoriesError, subcategories } = useSubcategories({
    page: 1,
    slugname: subCategoryFilter,
  });
  const { categories, categoriesError } = useCategories({
    page: 1,
    slugname: categoryFilter,
  });

  const [filters, setFilters] = useState<Filters>({
    sort: "",
    category: "",
    subcategories: [],
  });

  useEffect(() => {
    if (subcategories?.data?.subcategories && categories?.data?.categories) {
      setFilters({
        sort: "",
        category: categories?.data.categories?.[0]?._id,
        subcategories: [subcategories?.data.subcategories?.[0]?._id],
      });
    }
  }, [categories, subcategories]);

  useEffect(() => {
    setCategoryFilter(pathname.replace("/", "").split("/")[0]);
    setSubCategoryFilter(pathname.replace("/", "").split("/")[1]);
  }, [pathname]);

  if (categoriesError || isSubCategoriesError) {
    return <NotFound />;
  }

  return (
    <div className="flex mx-auto self-center flex-col flex-1 px-8">
      <div className="w-full flex justify-between items-end py-5 ">
        <span className="flex text-nowrap items-center justify-between gap-1">
          <span className="text-light-primary-text-subtitle text-subtitle-20">
            {categories &&
              categories?.data.categories.length > 0 &&
              categories.data.categories?.[0].name}
          </span>
          <ArrowLeft />
          <span className="text-subtitle-24 text-light-primary-text-body">
            {subcategories &&
              subcategories?.data.subcategories.length > 0 &&
              subcategories.data.subcategories?.[0].name
                .replace("بانوان", "")
                .replace("آقایان", "")}
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
