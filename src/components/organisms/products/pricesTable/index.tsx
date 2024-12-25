"use client";
import AppSpinner from "@/components/atoms/appSpinner";
import AppTable from "@/components/molecules/appTable";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Pencil from "../../../../../public/svg/Pencil.svg";
import X from "../../../../../public/svg/X-icon.svg";
import { AppButtonProps } from "@/components/molecules/appButton";
import useProducts from "@/hooks/queries/useProducts";
import useEditProductsByIds from "@/hooks/queries/useEditProductsByIds";

const PRICE_HEADCELLS = [
  { label: "تصویر", key: "thumbnail", sortable: false },
  { label: "نام محصول", key: "name", sortable: false },
  { label: "قیمت", key: "price", sortable: true },
  { label: "موجودی", key: "quantity", sortable: true },
];

const PricesTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editedRows, setEditedRows] = useState<
    Array<{ rowId: string; changes: Record<string, any> }>
  >([]);
  const editedRowsRef = useRef(editedRows);

  const { isProductsLoading, products, refetch } = useProducts({ page });
  const { editProductsByIds } = useEditProductsByIds();

  useEffect(() => {
    editedRowsRef.current = editedRows;
  }, [editedRows]);

  useEffect(() => {
    refetch();
  }, [page]);

  const toggleEditMode = () => {
    if (editMode && editedRowsRef.current.length > 0) {
      editProductsByIds(editedRowsRef.current, {
        onSuccess: () => {
          console.log("Successfully updated rows");
          setEditedRows([]); // Reset the state
          setEditMode(false);
          refetch();
        },
        onError: (error) => {
          console.error("Failed to update rows", error);
        },
      });
    } else {
      setEditMode((prevMode) => !prevMode);
    }
  };

  const handleCancel = () => {
    setEditedRows([]);
    setEditMode(false);
  };

  const handleInputChange = (id: string, key: string, value: any) => {
    setEditedRows((prev) => {
      const existingIndex = prev.findIndex((row) => row.rowId === id);
      if (existingIndex >= 0) {
        const updatedRow = {
          rowId: id,
          changes: {
            ...prev[existingIndex].changes,
            [key]: value,
          },
        };
        return [
          ...prev.slice(0, existingIndex),
          updatedRow,
          ...prev.slice(existingIndex + 1),
        ];
      } else {
        const newRow = { rowId: id, changes: { [key]: value } };
        return [...prev, newRow];
      }
    });
  };

  const tableButtons: Array<AppButtonProps> = useMemo(() => {
    const buttons: Array<AppButtonProps> = [
      {
        text: editMode ? "ذخیره" : "ویرایش",
        onClick: toggleEditMode,
        variant: editMode ? "secondary" : "primary",
        iconLeft: (className: string) => <Pencil className={className} />,
      },
    ];

    if (editMode) {
      buttons.unshift({
        text: "لغو",
        onClick: handleCancel,
        variant: "failure",
        iconLeft: (className: string) => <X className={className} />,
      });
    }

    return buttons;
  }, [editMode]);

  if (isProductsLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
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
        isEditMode={editMode}
        onInputChange={handleInputChange}
        editedRows={editedRows}
      />
    </div>
  );
};

export default PricesTable;
