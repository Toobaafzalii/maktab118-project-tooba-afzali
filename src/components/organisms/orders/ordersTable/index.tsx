import AppSpinner from "@/components/atoms/appSpinner";
import AppTable from "@/components/molecules/appTable";
import useOrders from "@/hooks/queries/useOrders";
import React, { useEffect, useMemo, useState } from "react";
import Timer from "../../../../../public/svg/Timer.svg";
import CheckCircle from "../../../../../public/svg/CheckCircle.svg";
import CareLeft from "../../../../../public/svg/CaretLeft.svg";
import PlusSquare from "../../../../../public/svg/PlusSquare.svg";
import { AppButtonProps } from "@/components/molecules/appButton";

const ORDERS_HEADCELLS = [
  { label: "نام مشتری", key: "user", sortable: false },
  { label: "تاریخ سفارش", key: "createdAt", sortable: true },
  { label: "مجموع مبلغ", key: "totalPrice", sortable: true },
  { label: "عملیات", key: "actions", sortable: false },
];

const FILTERS = {
  key: "deliveryStatus",
  items: [
    {
      text: "تحویل شده",
      value: "true",
      icon: (className: string) => <CheckCircle className={className} />,
    },
    {
      text: "در انتظار تحویل",
      value: "false",
      icon: (className: string) => <Timer className={className} />,
    },
  ],
};

const OrdersTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [deliveryStatus, setDeliveryStatus] = useState(true);

  const { isOrdersLoading, orders, refetch } = useOrders({
    page,
    deliveryStatus,
  });

  useEffect(() => {
    refetch();
  }, [deliveryStatus, page]);

  const actionButtons: Array<AppButtonProps> = useMemo(() => {
    return [
      {
        text: "بررسی سفارش",
        iconLeft: (className: string) => <CareLeft className={className} />,
        onClick: () => {},
        variant: "secondary",
      },
    ];
  }, []);

  if (isOrdersLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center ">
        <AppSpinner />
      </div>
    );
  }
  return (
    <div className="w-full">
      <AppTable
        data={orders?.data.orders}
        headCells={ORDERS_HEADCELLS}
        filters={FILTERS}
        title="لیست سفارش ها"
        actionButtons={actionButtons}
        page={page}
        totalPages={orders?.total_pages}
        onPageChange={(page) => setPage(page)}
        onFilterChange={(value) =>
          setDeliveryStatus(value.value === "true" ? true : false)
        }
      />
    </div>
  );
};
export default OrdersTable;
