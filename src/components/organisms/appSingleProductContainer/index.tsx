"use client";
import { AppButton } from "@/components/molecules/appButton";
import AppItemCounter from "@/components/molecules/appItemCounter";
import AppImage from "../appImage";
import PlusIcon from "../../../../public/svg/Plus.svg";
import ArrowLeft from "../../../../public/svg/ArrowLeft-gray.svg";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import { usePathname } from "next/navigation";
import AppSpinner from "@/components/atoms/appSpinner";
import NotFound from "@/app/notFound/page";
import { useMemo } from "react";
import useCartStore from "@/stores/useCartStore";
import { get } from "http";
import useAddCart from "@/hooks/queries/useAddCart";
import useUpdateCart from "@/hooks/queries/useUpdateCard";
import useDeleteCart from "@/hooks/queries/useDeleteCart";

const AppSingleProductContainer: React.FC = () => {
  const pathname = usePathname();
  const productId = pathname.replace("/", "").split("/")[1];
  const { getProductById, isSingleProductByIdLoading, isError } =
    useSingleProductById({
      id: productId,
    });

  const { addCart } = useAddCart();
  const { updateCart } = useUpdateCart();
  const { deleteCart } = useDeleteCart();

  const removeItem = useCartStore((state) => state.removeItem);
  const cartItems = useCartStore((state) => state.cartItems);
  const currentItem = useMemo(
    () => cartItems.find((item) => item.id === productId),
    [cartItems, productId]
  );
  const itemCount = useMemo(
    () => (currentItem ? currentItem.quantity : 0),
    [cartItems]
  );

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
    if (itemCount === 0) {
      addCart([{ id: productId, quantity: 1 }]);
    } else {
      updateCart({ itemId: productId, quantity: itemCount + 1 });
    }
  };

  const handleZeroCount = () => {
    deleteCart({ itemId: productId });
  };

  const countChangeHandle = (count: number) => {
    updateCart({ itemId: productId, quantity: count });
  };

  return (
    <div className="w-full relative flex justify-start items-start py-[60px] md:gap-20 px-10 ">
      <div className="flex flex-col justify-start items-center gap-5 max-w-xl w-full">
        {getProductById?.data.product.images && (
          <div className="flex flex-col gap-5">
            {
              <AppImage
                src={getProductById.data.product.thumbnail}
                className="w-full"
                isThumbnail
              />
            }
            {getProductById.data.product.images.map((image, index) => (
              <AppImage key={index} src={image} className="w-full" />
            ))}
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
          <span
            dangerouslySetInnerHTML={{
              __html: getProductById?.data.product.description as TrustedHTML,
            }}
            className="text-subtitle-20"
          ></span>
          <span className="text-subtitle-20 text-light-primary-text-subtitle">
            {` دیگر توضیحات: برند ${getProductById?.data.product.brand}`}
          </span>
        </div>
        <div className="flex flex-col justify-between items-start gap-3">
          {itemCount > 0 ? (
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
