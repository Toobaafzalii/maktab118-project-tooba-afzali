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
import useSubcategoryByIds from "@/hooks/queries/useSubcategoryByIds";
import AppProductModal from "@/components/organisms/appNewProductModal";
import AppConfrimModal from "@/components/molecules/appConfrimModal";
import useDeleteProductById from "@/hooks/queries/useDeleteProductById";
import AppEditProductModal from "../../appEditProductModal";

const ProductsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteConfrimModalOpen, setIsDeleteConfrimModalOpen] =
    useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const { issubcategoryByIdsLoading, subcategoryByIds, subcategoryByIdsData } =
    useSubcategoryByIds();
  const { isProductsLoading, products, refetch, isRefetching } = useProducts({
    limit: 6,
    page,
  });
  const { deleteProductById, isDeleteProductByIdLoading } =
    useDeleteProductById();

  const actionButtons: Array<AppButtonProps> = useMemo(() => {
    return [
      {
        text: "ویرایش",
        iconLeft: (className) => <Pencil className={className} />,
        onClick: (rowId) => {
          if (typeof rowId === "string") setSelectedItemId(rowId);
          setIsEditProductModalOpen(true);
        },
        variant: "secondary",
      },
      {
        text: "حذف",
        iconRight: (className) => <Trash className={className} />,
        onClick: (rowId) => {
          if (typeof rowId === "string") setSelectedItemId(rowId);
          setIsDeleteConfrimModalOpen(true);
        },
        variant: "failure",
      },
    ];
  }, [setIsDeleteConfrimModalOpen]);

  const productHeadCells = [
    { label: "تصویر", key: "thumbnail", sortable: false },
    { label: "نام محصول", key: "name", sortable: false },
    {
      label: "دسته بندی",
      key: "subcategory",
      sortable: true,
      dataFormatter: (id: string) => {
        if (!subcategoryByIdsData || issubcategoryByIdsLoading) {
          return "...";
        }
        let subcategory = subcategoryByIdsData.find(
          (subcategory) => subcategory.data.subcategory._id === id
        )?.data.subcategory;
        const fullName = String(subcategory?.name ?? "---");
        return fullName;
      },
    },
    { label: "برند", key: "brand", sortable: false },
    { label: "عملیات", key: "actions", sortable: false },
  ];

  useEffect(() => {
    const subcategoryIds: Array<string> = [];
    products?.data.products.map((product) => {
      subcategoryIds.push(product.subcategory);
    });
    const uniqeIds = new Set(subcategoryIds);
    subcategoryByIds({ ids: [...uniqeIds] });
  }, [products]);

  const tableButtons: Array<AppButtonProps> = useMemo(() => {
    return [
      {
        text: "افزودن محصول جدید",
        iconLeft: (className: string) => <PlusSquare className={className} />,
        onClick: () => setIsNewProductModalOpen(true),
        variant: "primary",
      },
    ];
  }, []);

  useEffect(() => {
    refetch();
  }, [page]);

  const handleConfrimDelete = (rowId?: string) => {
    if (rowId) {
      deleteProductById(
        { id: rowId },
        {
          onSuccess: () => {
            console.log(`product with ID: ${rowId} deleted`);
            refetch();
          },
          onError: (error) => {
            console.log("Error deleting product:", error);
          },
        }
      );
      setSelectedItemId(null);
      setIsDeleteConfrimModalOpen(false);
    }
  };

  if (isProductsLoading || isRefetching) {
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
        headCells={productHeadCells}
        title="لیست محصولات"
        actionButtons={actionButtons}
        tableButtons={tableButtons}
        page={page}
        totalPages={products?.total_pages}
        onPageChange={(page) => setPage(page)}
      />

      {isNewProductModalOpen && (
        <AppProductModal
          onSuccess={() => {
            refetch();
          }}
          onClose={() => setIsNewProductModalOpen(false)}
        />
      )}
      {isDeleteConfrimModalOpen && (
        <AppConfrimModal
          onConfrim={() =>
            selectedItemId && handleConfrimDelete(selectedItemId)
          }
          message="از حدف این محصول مطمئن هستید؟"
          buttonTitles={["لغو", "تایید"]}
          onClose={() => setIsDeleteConfrimModalOpen(false)}
        />
      )}
      {isEditProductModalOpen && selectedItemId && (
        <AppEditProductModal
          productId={selectedItemId}
          onSuccess={() => {
            refetch();
          }}
          onClose={() => setIsEditProductModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductsTable;
