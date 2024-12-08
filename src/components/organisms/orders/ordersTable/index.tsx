import AppSpinner from "@/components/atoms/appSpinner";
import AppTable, { HeadCells } from "@/components/molecules/appTable";
import useOrders from "@/hooks/queries/useOrders";
import React, { useEffect, useMemo, useState } from "react";
import Timer from "../../../../../public/svg/Timer.svg";
import CheckCircle from "../../../../../public/svg/CheckCircle.svg";
import ListChecks from "../../../../../public/svg/ListChecks.svg";
import CareLeft from "../../../../../public/svg/CaretLeft.svg";
import { AppButtonProps } from "@/components/molecules/appButton";
import useUserByIds from "@/hooks/queries/useUserByIds";

const FILTERS = {
  key: "deliveryStatus",
  items: [
    {
      text: "همه سفارشات",
      value: "all",
      icon: (className: string) => <ListChecks className={className} />,
    },
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
  const [deliveryStatus, setDeliveryStatus] = useState<boolean | null>(null);
  const { isOrdersLoading, orders, refetch } = useOrders({
    page,
    deliveryStatus: deliveryStatus ?? undefined,
  });
  const { isUserByIdsLoading, userByIds, userByIdsData } = useUserByIds();

  useEffect(() => {
    const userIds: Array<string> = [];
    orders?.data.orders.map((order) => {
      userIds.push(order.user);
    });
    const uniqeIds = new Set(userIds);
    userByIds({ ids: [...uniqeIds] });
  }, [orders]);

  const orderHeadCells: HeadCells = useMemo(() => {
    return [
      {
        label: "نام مشتری",
        key: "user",
        sortable: false,
        dataFormatter: (id: string) => {
          if (!userByIdsData || isUserByIdsLoading) {
            return "...";
          }
          let user = userByIdsData.find((user) => user.data.user._id === id)
            ?.data.user;
          const fullName =
            String(user?.firstname) ??
            "کاربر" + String(user?.lastname) ??
            "ناشناس";

          return fullName;
        },
      },
      { label: "تاریخ سفارش", key: "createdAt", sortable: true },
      { label: "مجموع مبلغ", key: "totalPrice", sortable: true },
      { label: "عملیات", key: "actions", sortable: false },
    ];
  }, [userByIdsData]);

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

  const onFilterChange = (value: { value: string }) => {
    setDeliveryStatus(
      value.value === "all" ? null : value.value === "true" ? true : false
    );
    setPage(1);
  };
  return (
    <div className="w-full">
      <AppTable
        data={orders?.data.orders}
        headCells={orderHeadCells}
        filters={FILTERS}
        title="لیست سفارش ها"
        actionButtons={actionButtons}
        page={page}
        totalPages={orders?.total_pages}
        onPageChange={(page) => setPage(page)}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};
export default OrdersTable;
