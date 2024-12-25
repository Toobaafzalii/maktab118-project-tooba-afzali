"use client";

import OrdersTable from "@/components/organisms/orders/ordersTable";

import React from "react";

const OrdersPage: React.FC = () => {
  return (
    <div className="w-full flex flex-1">
      <OrdersTable />
    </div>
  );
};
export default OrdersPage;
