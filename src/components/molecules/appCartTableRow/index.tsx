import { FC } from "react";
import AppItemCounter from "@/components/molecules/appItemCounter";
import Trash from "../../../../public/svg/big-trash.svg";
import useCartStore from "@/stores/useCartStore";
import AppImage from "@/components/organisms/appImage";
import { Table } from "flowbite-react";
import { SingleProductDto } from "@/hooks/queries/dtos/products";
import { useRouter } from "next/navigation";
import useUpdateCart from "@/hooks/queries/useUpdateCard";
import useDeleteCart from "@/hooks/queries/useDeleteCart";
import { useMediaQuery } from "react-responsive";

interface AppCartItemProps {
  itemId: string;
  quantity: number;
  index: number;
  product?: SingleProductDto["data"]["product"];
}

const AppCartTableRow: FC<AppCartItemProps> = ({
  itemId,
  quantity,
  index,
  product,
}) => {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const { updateCart } = useUpdateCart();
  const { deleteCart } = useDeleteCart();

  const handleCountChange = (count: number) => {
    updateCart({ itemId, quantity: count });
  };

  const handleRemoveFromCart = () => {
    deleteCart({ itemId });
  };

  if (!product) {
    return <div className="text-center text-red-500 py-4">محصول یافت نشد.</div>;
  }

  return (
    <Table.Row className="text-light-primary-text-title text-subtitle-20 max-w-full">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
        <div className="flex justify-start items-center gap-x-4 md:min-w-[260px] ">
          <span
            className={
              isTabletOrMobile ? "text-subtitle-16 hidden sm:flex" : "sm:flex"
            }
          >
            {index}
          </span>
          <AppImage
            src={product.thumbnail}
            className={
              isTabletOrMobile
                ? "sm:w-[80px] sm:h-[80px] w-[54px] h-[54px]"
                : "w-[100px] h-[100px]"
            }
            isThumbnail
          />
          <span
            className={`line-clamp-2 text-wrap text-light-primary-text-title hidden md:flex ${
              isTabletOrMobile ? "text-subtitle-16" : ""
            }`}
            onClick={() => router.push(`/product/${product._id}`)}
          >
            {product.name}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <AppItemCounter
          id={itemId}
          min={1}
          max={product.quantity}
          onCountChange={handleCountChange}
          hasResetIcon={false}
          size={isTabletOrMobile ? "sm" : "lg"}
        />
      </Table.Cell>
      <Table.Cell className={isTabletOrMobile ? "text-subtitle-16" : ""}>
        {product.price * quantity} تومان
      </Table.Cell>
      <Table.Cell>
        <Trash
          onClick={handleRemoveFromCart}
          className="cursor-pointer hover:scale-105"
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default AppCartTableRow;
