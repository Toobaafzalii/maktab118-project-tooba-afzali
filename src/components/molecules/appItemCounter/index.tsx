"use client";
import Trash from "../../../../public/svg/big-trash.svg";
import Plus from "../../../../public/svg/PlusCounter.svg";
import Minus from "../../../../public/svg/MinusCounter.svg";
import { useEffect } from "react";
import useCartStore from "@/stores/useCartStore";
import useUpdateCart from "@/hooks/queries/useUpdateCard";
import useDeleteCart from "@/hooks/queries/useDeleteCart";

type AppItemCounterProps = {
  id: string;
  min?: number;
  max?: number;
  onCountChange?: (count: number) => void;
  onZeroCount?: () => void;
  size?: "sm" | "lg";
  hasResetIcon?: boolean;
};

const AppItemCounter: React.FC<AppItemCounterProps> = ({
  id,
  min = 1,
  max,
  onCountChange,
  onZeroCount,
  size = "sm",
  hasResetIcon = true,
}) => {
  const { cartItems, updateQuantity, removeItem } = useCartStore(
    (state) => state
  );
  const { updateCart } = useUpdateCart();
  const { deleteCart } = useDeleteCart();

  const currentItem = cartItems.find((item) => item.id === id);
  const count = currentItem ? currentItem.quantity : min;

  const increment = () => {
    if (max && count >= max) return;

    updateCart({ itemId: id, quantity: count + 1 });
  };

  const decrement = () => {
    if (count > min) {
      updateCart({ itemId: id, quantity: count - 1 });
    } else {
      deleteCart({ itemId: id });
      onZeroCount && onZeroCount();
    }
  };

  const reset = () => {
    deleteCart({ itemId: id });
    if (onZeroCount) {
      onZeroCount();
    }
  };

  useEffect(() => {
    // if (onCountChange) onCountChange(count);
  }, []);

  const sizeClasses = size === "lg" ? "gap-8 px-5 py-4 " : "gap-2.5 px-3 py-2 ";

  return (
    <div
      className={`flex justify-between items-center ${
        size === "lg" ? "gap-4" : "gap-2.5"
      }`}
    >
      <div
        className={`flex justify-between items-center bg-light-primary-surface-default-subtle border-light-primary-border-default-subtle border-[1px] ${sizeClasses}`}
      >
        <Plus
          className={`hover:scale-105 hover:cursor-pointer ${
            size === "sm" ? "w-[18px] h-[18px]" : ""
          }`}
          onClick={increment}
        />
        <span
          className={`min-w-5  text-light-primary-text-title text-center ${
            size === "lg" ? "text-title-16" : "text-subtitle-14"
          }`}
        >
          {count}
        </span>
        <Minus
          className={`hover:scale-105 hover:cursor-pointer ${
            size === "sm" ? "w-[18px] h-[18px]" : ""
          }`}
          onClick={decrement}
        />
      </div>
      {hasResetIcon && (
        <Trash
          onClick={reset}
          className={`hover:scale-105 hover:cursor-pointer ${
            size === "sm" ? "w-4 h-4" : ""
          }`}
        />
      )}
    </div>
  );
};

export default AppItemCounter;
