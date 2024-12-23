"use client";
import { AppButton } from "@/components/molecules/appButton";
import ArrowLeft from "../../../../public/svg/CaretLeft.svg";
import useCartStore from "@/stores/useCartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import { number } from "zod";

type AppOrderDetailsCardProps = {
  hasButton: boolean;
};

const AppOrderDetailsCard: React.FC<AppOrderDetailsCardProps> = ({
  hasButton,
}) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productDetails, setProductDetails] = useState<
    {
      id: string;
      price: number;
      quantity: number;
    }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productPromises = cartItems.map((item) =>
        useSingleProductById({ id: item.id })
      );

      const productResponses = await Promise.all(productPromises);

      const productsWithPrice = productResponses.map((data, index) => {
        const price = data.getProductById?.data.product.price || 0;
        return {
          id: cartItems[index].id,
          price,
          quantity: cartItems[index].quantity,
        };
      });

      setProductDetails(productsWithPrice);
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  useEffect(() => {
    if (productDetails.length > 0) {
      let total = 0;
      productDetails.forEach((product) => {
        total += product.quantity * product.price;
      });
      setTotalPrice(total);
    }
  }, [productDetails, cartItems]);

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
