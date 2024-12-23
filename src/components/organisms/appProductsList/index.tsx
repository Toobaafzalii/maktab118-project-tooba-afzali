"use client";
import AppSpinner from "@/components/atoms/appSpinner";
import AppPagination from "@/components/molecules/appPagination";
import AppProductCard from "@/components/molecules/appProductCard";
import useProducts from "@/hooks/queries/useProducts";
import { useEffect, useState } from "react";
import { Filters } from "../appFilteringSidebar";

type AppProductsListProps = {
  filters: Filters | null;
  size: "sm" | "lg";
};

const AppProductsList: React.FC<AppProductsListProps> = ({ filters, size }) => {
  const [page, setPage] = useState(1);
  const { isProductsLoading, products, refetch } = useProducts({
    page,
    ...(filters?.sort && {
      sort: filters?.sort,
    }),
    ...(filters?.subcategories && {
      subcategory: filters?.subcategories[0],
    }),
  });

  useEffect(() => {
    refetch();
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
    refetch();
  }, [filters]);

  if (isProductsLoading) {
    return (
      <div className="w-full h-full flex flex-col flex-1 justify-center items-center container">
        <AppSpinner />
      </div>
    );
  }

  return (
    <div className="container w-full self-center flex flex-col justify-between items-center gap-6 py-10">
      <div
        className={`w-full grid space-y-2 ${
          size === "sm"
            ? " grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-x-2 "
            : " grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 space-x-3 "
        }`}
      >
        {products &&
          products.data.products.map(
            ({ price, name, thumbnail, _id, quantity }) => {
              return (
                <AppProductCard
                  id={_id}
                  key={_id}
                  thumbnail={thumbnail}
                  name={name}
                  price={price}
                  quantity={quantity}
                />
              );
            }
          )}
      </div>
      <AppPagination
        page={page}
        totalPages={products?.total_pages}
        onPageChange={(page) => handlePageChange(page)}
      />
    </div>
  );
};

export default AppProductsList;
