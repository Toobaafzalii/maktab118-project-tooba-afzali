"use client";
import React, { useEffect, useState } from "react";
import AppRadioButtonTabs from "@/components/molecules/appRadialButton";
import GenderFemale from "../../../../public/svg/GenderFemale.svg";
import GenderMale from "../../../../public/svg/GenderMale.svg";
import { AppButton } from "@/components/molecules/appButton";
import AppSelectBox from "@/components/atoms/appSelectBox";
import useSubcategories from "@/hooks/queries/useSubcategories";
import AppCheckbox from "@/components/atoms/appCheckbox";
import useCategories from "@/hooks/queries/useCategories";

type AppFilteringSidebarProps = {
  onFiltersChange: (filters: Filters) => void;
};

export type Filters = {
  sort: string;
  category: string;
  subcategories: Array<string>;
};

const AppFilteringSidebar: React.FC<AppFilteringSidebarProps> = ({
  onFiltersChange,
}) => {
  const { subcategories } = useSubcategories({ page: 1 });
  const { categories } = useCategories({ page: 1 });
  const [filters, setFilters] = useState<Filters>({
    sort: "",
    category: "",
    subcategories: [] as string[],
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<
    { _id?: string; name: string }[]
  >([]);

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
    }));

    const filtered = subcategories?.data.subcategories.filter(
      (subcategory) => subcategory.category === value
    );
    setFilters((filters) => ({ ...filters, subcategories: [] }));
    setFilteredSubcategories(filtered || []);
  };

  useEffect(() => {
    handleCategoryChange(categories?.data.categories?.[0]._id ?? "");
  }, [categories]);

  const handleSubcategoriesChange = (value: string) => {
    if (!value) return;

    setFilters((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(value)
        ? prev.subcategories.filter((item) => item !== value)
        : [...prev.subcategories, value],
    }));
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };


  return (
    <div className="sticky max-w-96 w-full top-0 right-[100%] py-10 px-6 min-h-screen flex flex-col justify-start items-start gap-6 bg-light-primary-surface-object text-light-primary-text-title">
      <span className="w-full text-title-24">فیلتر و دسته بندی</span>

      <div className="w-full flex justify-between items-end gap-24 py-6 border-y b-y-[1px] border-light-primary-border-default">
        <span className="text-title-20 text-nowrap">نمایش بر اساس</span>
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

      <span className="w-full text-title-20">نمایش دسته بندی‌ها</span>
      <div className="flex flex-col justify-between items-center gap-5">
        <AppRadioButtonTabs
          items={
            categories?.data.categories.map((item) => {
              return {
                text: item.name,
                value: item._id,
                icon: (className) =>
                  item.name === "men" ? (
                    <GenderMale className={className} />
                  ) : (
                    <GenderFemale className={className} />
                  ),
              };
            }) ?? []
          }
          onActiveItemChange={(selectedItem) =>
            handleCategoryChange(selectedItem)
          }
        />
      </div>

      <div className="w-full flex flex-wrap gap-4">
        {filteredSubcategories.map((subcategory) => (
          <AppCheckbox
            key={subcategory._id}
            text={subcategory.name.replace("آقایان","").replace("بانوان","")}
            value={subcategory._id || ""}
            onSelect={(value) => {
              handleSubcategoriesChange(value as string);
            }}
          />
        ))}
      </div>

      <AppButton
        fullWidth
        text="اعمال فیلتر"
        variant="primary"
        onClick={applyFilters}
      />
    </div>
  );
};

export default AppFilteringSidebar;
