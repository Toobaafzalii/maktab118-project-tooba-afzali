"use client";
import { AppButton } from "@/components/molecules/appButton";
import ArrowLeft from "../../../../public/svg/CaretLeft.svg";
import useCartStore from "@/stores/useCartStore";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import { number } from "zod";
import { SingleProductDto } from "@/hooks/queries/dtos/products";

type AppOrderDetailsCardProps = {
  hasButton: boolean;
  products?: SingleProductDto["data"]["product"][];
};

const AppOrderDetailsCard: React.FC<AppOrderDetailsCardProps> = ({
  hasButton,
  products,
}) => {
  const cartItems = useCartStore((state) => state.cartItems);

  const totalPrice = useMemo(() => {
    let total = 0;
    products?.forEach(({ price }, index) => {
      total += price * cartItems[index].quantity;
    });
    return total;
  }, [products, cartItems]);

  const router = useRouter();

  return (
    <div className="flex sticky top-[216px] flex-col justify-between items-center bg-light-primary-surface-default-subtle p-4 gap-10 text-light-primary-text-body max-w-[400px] w-full flex-grow drop-shadow-sm">
      <div className="w-full flex justify-between items-center gap-2">
        <span className="text-title-18"> جزییات خرید</span>
        <span className="text-subtitle-16">{`(${cartItems.length}) محصول`}</span>
      </div>
      <div className="w-full flex justify-between items-center gap-2">
        <span className="text-subtitle-16 text-light-primary-text-subtitle">
          مجموع خرید
        </span>
        <span className="text-title-18 text-light-primary-text-body">
          {totalPrice}
        </span>
      </div>
      <div className="w-full flex justify-between items-center gap-2">
        <span className="text-subtitle-16 text-light-primary-text-subtitle">
          {"مالیات بر ارزش افزوده(٪۱۰)"}
        </span>
        <span className="text-title-18 text-light-primary-text-body">
          {totalPrice / 10}
        </span>
      </div>
      <div className="w-full flex justify-between items-center gap-2">
        <span className="text-subtitle-16 text-light-primary-text-subtitle">
          هزینه ارسال
        </span>
        <span className="text-title-18 text-light-primary-text-body">
          رایگان
        </span>
      </div>
      <div className="w-full flex justify-between items-center gap-2 pt-6 pb-2 border-t-[1px] border-light-primary-border-default-subtle">
        <span className="text-subtitle-16 text-light-primary-text-subtitle">
          مبلغ قابل پرداخت
        </span>
        <span className="text-title-18 text-light-primary-text-body">
          {totalPrice + totalPrice / 10}
        </span>
      </div>
      {hasButton && (
        <AppButton
          text="تکمیل سفارش"
          variant="primary"
          fullWidth
          iconLeft={(className) => <ArrowLeft className={className} />}
          isDisabled={cartItems.length < 1}
          onClick={() => router.push("/cart/delivery-info")}
        />
      )}
    </div>
  );
};

export default AppOrderDetailsCard;
