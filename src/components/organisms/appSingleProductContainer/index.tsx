"use client";
import { AppButton } from "@/components/molecules/appButton";
import AppItemCounter from "@/components/molecules/appItemCounter";
import AppImage from "../appImage";
import PlusIcon from "../../../../public/svg/Plus.svg";
import ArrowLeft from "../../../../public/svg/ArrowLeft-gray.svg";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import { usePathname } from "next/navigation";
import AppSpinner from "@/components/atoms/appSpinner";
import NotFound from "@/app/(app)/notFound/page";
import { useState } from "react";
import useCartStore from "@/stores/useCartStore";

const AppSingleProductContainer: React.FC = () => {
  const pathname = usePathname();
  const productId = pathname.replace("/", "").split("/")[1];
  const { getProductById, isSingleProductByIdLoading, isError } =
    useSingleProductById({
      id: productId,
    });

  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartItems = useCartStore((state) => state.cartItems);

  const currentItem = cartItems.find((item) => item.id === productId);
  const itemCount = currentItem ? currentItem.quantity : 0;
  const [showCounter, setShowCounter] = useState(itemCount ? true : false);

  if (isSingleProductByIdLoading) {
    return (
      <div className="w-full h-full flex flex-col flex-1 justify-center items-center ">
        <AppSpinner />
      </div>
    );
  }

  if (isError) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    setShowCounter(true);
    if (itemCount === 0) {
      addItem(productId, 1);
    } else {
      updateQuantity(productId, itemCount + 1);
    }
  };

  const handleZeroCount = () => {
    removeItem(productId);
    setShowCounter(false);
  };

  const countChangeHandle = (count: number) => {
    updateQuantity(productId, count);
  };

  return (
    <div className="w-full relative flex justify-start items-start py-[60px] md:gap-20 px-10 ">
      <div className="flex flex-col justify-start items-center gap-5 max-w-xl w-full">
        {getProductById?.data.product.thumbnail && (
          <div className="flex flex-col gap-5">
            <AppImage
              src={getProductById?.data.product.thumbnail}
              className="w-full"
              isThumbnail
            />
            <AppImage
              src={getProductById?.data.product.thumbnail}
              className="w-full"
              isThumbnail
            />
            <AppImage
              src={getProductById?.data.product.thumbnail}
              className="w-full"
              isThumbnail
            />
          </div>
        )}
      </div>
      <div className="flex sticky top-20 flex-1 flex-col justify-start items-start gap-10 py-10">
        <span className="text-subtitle-20 text-light-primary-text-subtitle flex items-center gap-1.5">
          <span>{getProductById?.data.product.category.name}</span>
          <ArrowLeft />
          <span>{getProductById?.data.product.subcategory.name}</span>
        </span>
        <div className="flex flex-col justify-between items-start gap-3 text-light-primary-text-title">
          <span className="text-title-28">
            {getProductById?.data.product.name}
          </span>
          <span className="text-subtitle-20">
            {getProductById?.data.product.description}
          </span>
          <span className="text-subtitle-20 text-light-primary-text-subtitle">
            {`${getProductById?.data.product.brand} دیگر توضیحات: برند`}
          </span>
        </div>
        <div className="flex flex-col justify-between items-start gap-3">
          {showCounter ? (
            <AppItemCounter
              id={productId}
              max={getProductById?.data.product.quantity}
              onCountChange={countChangeHandle}
              onZeroCount={handleZeroCount}
              size="lg"
            />
          ) : (
            <AppButton
              text="افزودن به سبد خرید"
              variant="primary"
              iconRight={(className) => <PlusIcon className={className} />}
              size="xl"
              onClick={handleAddToCart}
              isDisabled={
                !getProductById?.data.product.quantity ||
                getProductById?.data.product.quantity === 0
              }
            />
          )}

          {getProductById?.data.product &&
          getProductById?.data.product.quantity > 0 ? (
            <span className="text-subtitle-28 text-light-primary-text-subtitle">
              {`موجودی در انبار: ${getProductById?.data.product.quantity}`}
            </span>
          ) : (
            <span className="text-subtitle-28 text-dark-error-text-negative">
              ناموجود در انبار
            </span>
          )}
        </div>
        <div className="w-full flex justify-end items-start px-8 text-title-24 text-light-primary-text-title">
          {`${getProductById?.data.product.price} تومان`}
        </div>
      </div>
    </div>
  );
};

export default AppSingleProductContainer;
