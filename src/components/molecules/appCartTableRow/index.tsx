import { FC } from "react";
import AppItemCounter from "@/components/molecules/appItemCounter";
import Trash from "../../../../public/svg/big-trash.svg";
import useCartStore from "@/stores/useCartStore";
import AppImage from "@/components/organisms/appImage";
import { Table } from "flowbite-react";
import { SingleProductDto } from "@/hooks/queries/dtos/products";
import { useRouter } from "next/navigation";

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
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleCountChange = (count: number) => {
    updateQuantity(itemId, count);
  };

  const handleRemoveFromCart = () => {
    removeItem(itemId);
  };

  if (!product) {
    return <div className="text-center text-red-500 py-4">محصول یافت نشد.</div>;
  }

  return (
    <Table.Row className="text-light-primary-text-title text-subtitle-20">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <div className="flex justify-start items-center gap-x-4">
          <span>{index}</span>
          <AppImage src={product.thumbnail} className="w-[100px] h-[100px]" />
          <span
            className="max-w-[300px] cursor-pointer line-clamp-2 text-wrap text-light-primary-text-title"
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
          size="lg"
        />
      </Table.Cell>
      <Table.Cell className="min-w-56">
        {product.price * quantity} تومان
      </Table.Cell>
      <Table.Cell className="min-w-20">
        <Trash
          onClick={handleRemoveFromCart}
          className="cursor-pointer hover:scale-105"
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default AppCartTableRow;
