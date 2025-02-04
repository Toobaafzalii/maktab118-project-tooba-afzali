import React from "react";
import AppItemCounter from "@/components/molecules/appItemCounter";
import AppSpinner from "@/components/atoms/appSpinner";
import useSingleProductById from "@/hooks/queries/useGetProductById";
import AppImage from "@/components/organisms/appImage";
import { SingleProductDto } from "@/hooks/queries/dtos/products";

interface CartItemProps {
  id: string;
  onCountChange: (id: string, count: number) => void;
  product?: SingleProductDto["data"]["product"];
}

const AppCartDropdownItem: React.FC<CartItemProps> = ({
  id,
  onCountChange,
  product,
}) => {
  if (!product) {
    return (
      <div className="flex justify-between items-center gap-2 border-b-[1px] border-light-primary-border-default-subtle py-4">
        <span className="text-dark-error-text-negative">محصول یافت نشد</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center gap-2 border-b-[1px] border-light-primary-border-default-subtle py-4">
      <div className="flex justify-between items-center gap-3">
        <AppImage
          src={product.thumbnail}
          className="max-w-12 max-h-12 w-full h-full"
          isThumbnail
        />
        <span className="text-subtitle-14 text-light-primary-text-body line-clamp-2 min-w-[220px]">
          {product.name}
        </span>
      </div>
      <AppItemCounter
        id={id}
        min={1}
        max={product.quantity}
        onCountChange={(count) => onCountChange(id, count)}
        hasResetIcon={true}
        size="sm"
      />
    </div>
  );
};

export default AppCartDropdownItem;
