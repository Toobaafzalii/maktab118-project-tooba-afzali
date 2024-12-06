"use client";
import AppSpinner from "@/components/atoms/appSpinner";
import AppTable from "@/components/molecules/appTable";

import React, { useEffect, useMemo, useState } from "react";

import Pencil from "../../../../../public/svg/Pencil.svg";
import { AppButtonProps } from "@/components/molecules/appButton";
import useProducts from "@/hooks/queries/useProducts";

const PRICE_HEADCELLS = [
  { label: "تصویر", key: "thumbnail", sortable: false },
  { label: "نام محصول", key: "name", sortable: false },
  { label: "قیمت", key: "price", sortable: true },
  { label: "موجودی", key: "quantity", sortable: false },
];

const PricesTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { isProductsLoading, products, refetch } = useProducts({
    page,
  });

  const tableButtons: Array<AppButtonProps> = useMemo(() => {
    return [
      {
        text: "ویرایش",
        iconLeft: (className: string) => <Pencil className={className} />,
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
        headCells={PRICE_HEADCELLS}
        title="لیست قیمت و موجودی"
        tableButtons={tableButtons}
        page={page}
        totalPages={products?.total_pages}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};
export default PricesTable;
