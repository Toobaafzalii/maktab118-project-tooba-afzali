"use client";

import AppSpinner from "@/components/atoms/appSpinner";
import AppOrderDetailsCard from "@/components/molecules/appOrderDetailsCard";
import AppShoppingCartTable from "@/components/organisms/appShoppingCartTable";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import useSingleProductByIds from "@/hooks/queries/useGetProductByIds";
import useCartStore from "@/stores/useCartStore";
import { useEffect } from "react";

const ShoppingCartPage: React.FC = () => {
  const { cartItems } = useCartStore((state) => state);
  const { productsByIds, isSingleProductByIdLoading } = useSingleProductByIds({
    ids: cartItems.map((item) => item.id),
  });

  if (isSingleProductByIdLoading) {
    return (
      <div className=" flex flex-1 items-center justify-center">
        <AppSpinner />
      </div>
    );
  }

  return (
    <div className="relative bg-light-primary-surface-default flex flex-col lg:flex-row flex-grow flex-1 justify-between items-center md:items-start p-10 w-full  gap-x-2 gap-y-10 ">
      {cartItems.length <= 0 ? (
        <div className="flex flex-1 justify-center items-center self-center">
          محصولی در سبد خرید شما وجود ندارد.
        </div>
      ) : (
        <div className="w-full flex-1 flex-grow">
          <AppShoppingCartTable products={productsByIds} />
        </div>
      )}
      <AppOrderDetailsCard products={productsByIds} hasButton={true} />
    </div>
  );
};
export default ShoppingCartPage;
