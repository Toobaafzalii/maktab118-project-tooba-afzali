"use client";
import { AppButton } from "@/components/molecules/appButton";
import AppImage from "../appImage";
import PlusIcon from "../../../../public/svg/Plus.svg";
import ArrowLeft from "../../../../public/svg/ArrowLeft-gray.svg";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import { usePathname } from "next/navigation";
import AppSpinner from "@/components/atoms/appSpinner";
import NotFound from "@/app/(app)/notFound/page";

const AppSingleProductContainer: React.FC = () => {
  const pathname = usePathname();
  const productId = pathname.replace("/", "").split("/")[1];
  const { getProductById, isSingleProductByIdLoading, isError } =
    useSingleProductById({
      id: productId,
    });

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

  return (
    <div className=" relative w-full flex justify-start items-start py-[60px] md:gap-20 px-10 ">
      <div className="flex flex-col justify-start items-center gap-5 max-w-xl w-full  ">
        {getProductById?.data.product.thumbnail && (
          <div className="flex flex-col gap-5">
            <AppImage
              src={getProductById?.data.product.thumbnail}
              className=" w-full"
              isThumbnail
            />
            <AppImage
              src={getProductById?.data.product.thumbnail}
              className=" w-full"
              isThumbnail
            />
            <AppImage
              src={getProductById?.data.product.thumbnail}
              className=" w-full"
              isThumbnail
            />
          </div>
        )}
      </div>
      <div className="sticky top-0 flex flex-1 flex-col justify-start items-start gap-10 py-10">
        <span className="text-subtitle-20 text-light-primary-text-subtitle flex items-center gap-1.5">
          <span>{getProductById?.data.product.category.name}</span>
          <ArrowLeft />
          <span>{getProductById?.data.product.subcategory.name}</span>
        </span>
        <div className="flex flex-col justify-between items-start gap-3 text-light-primary-text-title">
          <span className="text-title-28 ">
            {getProductById?.data.product.name}
          </span>
          <span className="text-subtitle-20">
            {getProductById?.data.product.description}
          </span>
        </div>
        <div className="flex flex-col justify-between items-start gap-3 ">
          <AppButton
            text="افزودن به سبد خرید"
            variant="primary"
            iconRight={(className) => <PlusIcon className={className} />}
            isDisabled={!getProductById?.data.product.quantity}
            size="xl"
          />
          <span className="text-subtitle-28 text-light-primary-text-subtitle">{` موجودی در انبار: ${getProductById?.data.product.quantity}`}</span>
        </div>
        <div className="w-full flex justify-end items-start px-9 text-title-24 text-light-primary-text-title">{`${getProductById?.data.product.price} تومان`}</div>
      </div>
    </div>
  );
};

export default AppSingleProductContainer;
