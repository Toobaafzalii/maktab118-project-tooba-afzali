"use client";

import AppTable from "@/components/molecules/appTable";
import OrdersTable from "@/components/organisms/orders/ordersTable";
import useTable from "@/hooks/queries/useTable";
import React from "react";

const OrdersPage: React.FC = () => {
  return (
    <div className="w-full flex flex-1">
      <OrdersTable />
    </div>
  );
};
export default OrdersPage;
