"use client";
import { Pagination } from "flowbite-react";
import { useState } from "react";

interface AppPaginationProps {
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const customTheme = {
  base: "",
  layout: {
    table: {
      base: "text-subtitle-14 text-light-primary-text-subtitle bg-light-primary-surface-default-subtle",
      span: "text-subtitle-14 text-light-primary-text-subtitle",
    },
  },
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-l-lg border border-light-gray-border-default bg-white px-3 py-2  text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700     ",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-r-lg border-[1px] border-light-gray-border-default bg-white px-3 py-2  text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700     ",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 border !border-light-gray-border-default bg-white py-2  !text-light-primary-text-subtitle text-subtitle-14 ",
      active:
        "!bg-light-primary-surface-default !text-light-primary-text-title text-title-14  ",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
};

const AppPagination: React.FC<AppPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto sm:justify-center">
      <Pagination
        dir="ltr"
        currentPage={page}
        totalPages={totalPages ?? 0}
        onPageChange={onPageChange}
        showIcons
        nextLabel=""
        previousLabel=""
        theme={customTheme}
      />
      <div className=" text-light-primary-text-caption text-body-14">{`صفحه ${page} از${totalPages}  `}</div>
    </div>
  );
};

export default AppPagination;
