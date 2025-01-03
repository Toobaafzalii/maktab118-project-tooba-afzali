"use client";

import useGetOrderById from "@/hooks/queries/useGetOrderById";
import { useSearchParams } from "next/navigation";
import React from "react";

const Test: React.FC = () => {
  const searchParams = useSearchParams();
  const result = searchParams.get("result");
  const orderId = searchParams.get("id");
  const { getOrderById } = useGetOrderById({ id: orderId || "" });

  const isSuccess = result === "success";

  return (
    <div className="p-10 flex flex-col justify-center items-center gap-2">
      <h1
        className={`${
          isSuccess
            ? "text-green-600 px-2.5 py-2 bg-green-100 rounded-md text-subtitle-24"
            : "text-red-600 px-2.5 py-2 bg-red-100 rounded-md text-subtitle-24"
        }`}
      >
        {result === "success"
          ? "ثبت سفارش با موفقیت انجام شد"
          : "ثبت سفارش موفقیت آمیز نبود"}
      </h1>
      {isSuccess && (
        <div className="text-center">
          <h1>کد سفارش: {getOrderById?.data.order._id}</h1>
          <h1>مجموع قیمت: {getOrderById?.data.order.totalPrice}</h1>
        </div>
      )}
    </div>
  );
};

export default Test;
