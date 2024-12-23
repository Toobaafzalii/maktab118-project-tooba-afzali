"use client";
import React from "react";
import { AppButton } from "@/components/molecules/appButton";
import Eye from "../../../../public/svg/Eye.svg";
import ArrowLeft from "../../../../public/svg/CaretLeft.svg";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
import AppCartDropdownItem from "@/components/molecules/appCartDropdownItem";

interface Props {
  onClose: () => void;
}

const AppCartDropdown: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();

  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleCountChange = (id: string, count: number) => {
    updateQuantity(id, count);
  };

  return (
    <div className="fixed inset-x-0 bg-gray-900 bg-opacity-30 z-50 cursor-pointer">
      <div
        className="fixed inset-0 bg-gray-700 opacity-30"
        onClick={onClose}
      ></div>

      <div className="max-w-[434px] absolute top-6 left-6 p-4 bg-light-primary-surface-default-subtle flex flex-col justify-start items-center gap-2 shadow-md max-h-[80vh] overflow-y-auto no-scrollbar">
        <div className="w-full flex justify-between items-start gap-2.5">
          <span className="text-title-18 text-dark-primary-text-negative">
            سبد خرید
          </span>
          <span className="text-subtitle-16 text-light-primary-text-body">
            {`${cartItems.length} محصول در سبد`}
          </span>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col w-full gap-4 py-4 border-b-[1px] border-light-primary-border-default-subtle">
            {cartItems.map((item) => (
              <AppCartDropdownItem
                key={item.id}
                id={item.id}
                onCountChange={handleCountChange}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center py-4">
            <span className="text-subtitle-16 text-light-primary-text-subtitle">
              محصولی در سبد خرید وجود ندارد
            </span>
          </div>
        )}

        <div className="w-full flex justify-between items-start gap-2.5">
          <AppButton
            text="مشاهده سبد"
            variant="primary"
            outline
            iconRight={(className) => <Eye className={className} />}
            isDisabled={cartItems.length < 1}
            fullWidth
            onClick={() => router.push("/cart")}
          />
          <AppButton
            text="نهایی سازی خرید"
            variant="primary"
            iconLeft={(className) => <ArrowLeft className={className} />}
            fullWidth
            onClick={() => router.push("/cart/delivery-info")}
            isDisabled={cartItems.length < 1}
            disabled={cartItems.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AppCartDropdown;
