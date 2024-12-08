"use client";

import React, { memo, useMemo, useState } from "react";
import { Table } from "flowbite-react";
import AppRadioButtonTabs, { RadioButtonItem } from "../appRadialButton";
import { AppButton, AppButtonProps } from "../appButton";
import AppPagination from "../appPagination";
import CaretDown from "../../../../public/svg/CaretDown.svg";
import CaretUp from "../../../../public/svg/CaretUP.svg";

const customTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500  text-right",
  },
  body: {
    base: "group/body border-y-[1px] border-light-primary-border-default-subtle",
    cell: {
      base: "px-6 py-4",
    },
  },
  head: {
    base: "group/head uppercase !bg-light-primary-surface-default-subtle",
    cell: {
      base: "px-6 py-4 text-right !text-light-primary-text-subtle text-subtitle-12 cursor-pointer",
    },
  },
  row: {
    base: "group/row p-4 !text-light-primary-text-title !text-subtitle-14",
    striped:
      "odd:bg-light-primary-surface-default even:bg-light-primary-surface-object",
  },
};

export type HeadCells = Array<{
  label: string;
  key: string;
  sortable?: boolean;
  dataFormatter?: (value: string) => string;
}>;

type TableProps = {
  data?: any[];
  title?: string;
  headCells: HeadCells;
  filters?: {
    key: string;
    items: RadioButtonItem[];
  };
  tableButtons?: AppButtonProps[];
  actionButtons?: AppButtonProps[];
  onFilterChange?: (props: { value: string; key: string }) => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
};

const AppTable: React.FC<TableProps> = ({
  data,
  headCells,
  filters,
  title,
  tableButtons,
  actionButtons,
  onFilterChange = (props) => props,
  page,
  onPageChange,
  totalPages,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<string>("");

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  const sortedData = useMemo(() => {
    if (!data) return [];
    return data.sort((a, b) => {
      const key = sortBy as keyof typeof a;
      if (a[key] < b[key]) return sortOrder === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortBy, sortOrder]);

  const renderSortArrow = (key: string) => {
    if (sortBy !== key) return null;
    return sortOrder === "desc" ? (
      <span className="ml-2 inline">
        <CaretUp />
      </span>
    ) : (
      <span className="ml-2 inline">
        <CaretDown />
      </span>
    );
  };

  const formatValue = (column: any, row: any) => {
    let value = row[column.key];
    if (column.key === "createdAt" || column.key === "updatedAt") {
      const date = new Date(row[column.key]);
      value = new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "full",
      }).format(date);
    } else if (column.key === "actions") {
      value = actionButtons?.map((item) => <AppButton {...item} />);
      value = <div className="flex items-center gap-1">{value}</div>;
    } else if (column.key === "thumbnail") {
      value = <img className="w-8 h-8" src={value} />;
    } else if (column.dataFormatter) {
      value = column.dataFormatter(value);
    } else if (["price", "totalPrice"].includes(column.key)) {
      value = `${value} تومان`;
    }
    return value;
  };

  return (
    <div className="overflow-x-auto shadow-md">
      <div className="w-full flex justify-between items-center bg-light-primary-surface-object p-4">
        <div className="flex items-center gap-3">
          <p className="text-title-18 text-light-primary-text-title">{title}</p>
          {filters && (
            <AppRadioButtonTabs
              items={filters.items}
              onActiveItemChange={(value) =>
                onFilterChange({ value, key: filters.key })
              }
            />
          )}
        </div>
        <div className="flex items-center gap-x-1.5">
          {tableButtons &&
            tableButtons.map((item, index) => (
              <AppButton key={index} {...item} />
            ))}
        </div>
      </div>

      <Table striped theme={customTheme}>
        <Table.Head>
          {headCells.map((headCell) => (
            <Table.HeadCell
              className={` ${headCell.sortable ? "cursor-pointer" : ""}`}
              key={headCell.key}
              onClick={() => headCell.sortable && handleSort(headCell.key)}
            >
              <span className="flex items-center gap-1">
                {headCell.label}
                {headCell.sortable && renderSortArrow(headCell.key)}
              </span>
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {sortedData?.map((row, index) => (
            <Table.Row key={index}>
              {headCells.map((column, headIndex) => (
                <Table.Cell
                  className={
                    headIndex === 0
                      ? "text-light-primary-text-title w-[60%] font-app-peyda-medium"
                      : "min-w-52"
                  }
                  key={column.label}
                >
                  {formatValue(column, row)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="w-full flex items-center bg-light-primary-surface-object p-4">
        <AppPagination
          page={page}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default AppTable;
