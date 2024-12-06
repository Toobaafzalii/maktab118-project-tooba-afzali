"use client";

import React, { useMemo, useState } from "react";
import { Table } from "flowbite-react";
import AppRadioButtonTabs, { RadioButtonItem } from "../appRadialButton";
import { AppButton, AppButtonProps } from "../appButton";
import AppPagination from "../appPagination";

const customTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400 text-right",
  },
  body: {
    base: "group/body border-y-[1px] border-light-primary-border-default-subtle",
    cell: {
      base: "px-6 py-4",
    },
  },
  head: {
    base: "group/head uppercase bg-light-primary-surface-default-subtle",
    cell: {
      base: "px-6 py-4 text-right text-light-primary-text-subtle text-subtitle-12 cursor-pointer",
    },
  },
  row: {
    base: "group/row p-4 text-light-primary-text-title text-subtitle-14",
    striped:
      "odd:bg-light-primary-surface-default even:bg-light-primary-surface-object",
  },
};

type TableProps = {
  data?: any[];
  title?: string;
  headCells: Array<{ label: string; key: string; sortable?: boolean }>;
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
      <span className="ml-2">▲</span>
    ) : (
      <span className="ml-2">▼</span>
    );
  };

  return (
    <div className="overflow-x-auto shadow-md">
      <div className="w-full flex justify-between items-center bg-light-primary-surface-object p-4">
        <div className=" flex items-center gap-3">
          <p className="text-title-bold text-light-primary-text-title">
            {title}
          </p>
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
            tableButtons.map((item) => {
              return <AppButton {...item} />;
            })}
        </div>
      </div>

      <Table striped theme={customTheme}>
        <Table.Head>
          {headCells.map((headCell) => (
            <Table.HeadCell
              className={headCell.sortable ? "cursor-pointer" : ""}
              key={headCell.key}
              onClick={() => headCell.sortable && handleSort(headCell.key)}
            >
              {headCell.label}
              {headCell.sortable && renderSortArrow(headCell.key)}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {sortedData?.map((row, index) => (
            <Table.Row key={index}>
              {headCells.map((column) => {
                let value = row[column.key];
                if (column.key === "createdAt") {
                  const date = new Date(row[column.key]);
                  value = new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "full",
                  }).format(date);
                }
                if (column.key === "actions") {
                  value = actionButtons?.map((item) => <AppButton {...item} />);
                  value = (
                    <div className="flex items-center gap-1">{value}</div>
                  );
                }
                if (column.key === "thumbnail") {
                  value = <img className="w-8 h-8" src={value} />;
                }
                return <Table.Cell key={column.label}>{value}</Table.Cell>;
              })}
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
