"use client";
import AppSpinner from "@/components/atoms/appSpinner";
import AppTable from "@/components/molecules/appTable";
import useOrders from "@/hooks/queries/useOrders";
import React, { useEffect, useMemo, useState } from "react";
import Pencil from "../../../../../public/svg/Pencil.svg";
import Trash from "../../../../../public/svg/Trash.svg";
import PlusSquare from "../../../../../public/svg/PlusSquare.svg";
import { AppButtonProps } from "@/components/molecules/appButton";
import useProducts from "@/hooks/queries/useProducts";

const PRODUCT_HEADCELLS = [
  { label: "تصویر", key: "thumbnail", sortable: false },
  { label: "نام محصول", key: "name", sortable: false },
  { label: "دسته بندی", key: "subcategory", sortable: true },
  { label: "برند", key: "brand", sortable: false },
  { label: "عملیات", key: "actions", sortable: false },
];

const ProductsTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { isProductsLoading, products, refetch } = useProducts({
    page,
  });

  const actionButtons: Array<AppButtonProps> = useMemo(() => {
    return [
      {
        text: "ویرایش",
        iconLeft: (className: string) => <Pencil className={className} />,
        onClick: () => {},
        variant: "secondary",
      },
      {
        text: "حذف",
        iconRight: (className: string) => <Trash className={className} />,
        onClick: () => {},
        variant: "failure",
      },
    ];
  }, []);

  const tableButtons: Array<AppButtonProps> = useMemo(() => {
    return [
      {
        text: "افزودن محصول جدید",
        iconLeft: (className: string) => <PlusSquare className={className} />,
        onClick: () => {},
        variant: "primary",
      },
    ];
  }, []);

  useEffect(() => {
    refetch();
  }, [page]);

  if (isProductsLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center ">
        <AppSpinner />
      </div>
    );
  }
  return (
    <div className="w-full">
      <AppTable
        data={products?.data.products}
        headCells={PRODUCT_HEADCELLS}
        title="لیست محصولات"
        actionButtons={actionButtons}
        tableButtons={tableButtons}
        page={page}
        totalPages={products?.total_pages}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};
export default ProductsTable;
