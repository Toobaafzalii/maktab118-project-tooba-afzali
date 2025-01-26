"use client";
import { FC } from "react";
import { Table } from "flowbite-react";
import useCartStore from "@/stores/useCartStore";
import AppCartTableRow from "@/components/molecules/appCartTableRow";
import { SingleProductDto } from "@/hooks/queries/dtos/products";

const customTheme = {
  root: {
    base: "!w-full !flex-1 flex-grow text-right bg-light-primary-surface-default-subtle ",
    shadow: "absolute left-0 top-0 -z-10 h-full w-full bg-white drop-shadow-sm",
    wrapper: "relative p-4 bg-light-primary-surface-default-subtle",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-6 py-4",
    },
  },
  head: {
    base: "group/head uppercase bg-light-primary-surface-object text-light-primary-text-subtitle text-subtitle-16",
    cell: {
      base: "px-6 py-3 text-light-primary-text-subtitle",
    },
  },
  row: {
    base: "group/row border-b-[1px] border-light-primary-border-default-subtle",
    hovered: "hover:bg-gray-50 ",
    striped: "",
  },
};

interface Props {
  products?: SingleProductDto["data"]["product"][];
}
const AppShoppingCartTable: FC<Props> = ({ products }) => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="overflow-x-auto flex flex-col flex-grow flex-1 justify-start items-start w-full gap-5">
      <span className="text-title-24 text-light-primary-text-title">
        {` سبد خرید (${cartItems.length})`}
      </span>
      <span className="text-subtitle-16 text-light-primary-text-subtitle">
        جهت مشاهده جزئیات محصولات روی نام آنها کلیک کنید.
      </span>
      <Table dir="rtl" theme={customTheme} className="w-f">
        <Table.Head>
          <Table.HeadCell>محصول</Table.HeadCell>
          <Table.HeadCell>تعداد</Table.HeadCell>
          <Table.HeadCell>مجموع قیمت</Table.HeadCell>
          <Table.HeadCell>. . . .</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cartItems.map((item, index) => (
            <AppCartTableRow
              key={item.id}
              itemId={item.id}
              quantity={item.quantity}
              index={index + 1}
              product={products?.[index]}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AppShoppingCartTable;
