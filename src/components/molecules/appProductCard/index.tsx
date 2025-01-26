"use client";
import AppImage from "@/components/organisms/appImage";
import { Card } from "flowbite-react";
import { AppButton } from "../appButton";
import PlusIcon from "../../../../public/svg/Plus.svg";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
import { MouseEvent } from "react";
import useAddCart from "@/hooks/queries/useAddCart";

type AppProductCardProps = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  thumbnail: string;
};

const customTheme = {
  root: {
    base: "relative flex rounded-none border border-gray-50 bg-white shadow-sm hover:cursor-pointer hover:shadow-md",
    children: "flex flex-col sm:flex-row h-full justify-between gap-2 p-4",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:bg-gray-100 ",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-none",
      on: "h-96 w-full rounded-none object-cover md:h-auto md:w-48 md:rounded-none ",
    },
  },
};

const AppProductCard: React.FC<AppProductCardProps> = ({
  id,
  name,
  price,
  thumbnail,
  quantity,
}) => {
  const router = useRouter();

  const addItem = useCartStore((state) => state.addItem);
  const { addCart } = useAddCart();

  const handleAddToCart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e?.stopPropagation();
    addCart([{ id, quantity: 1 }]);
  };

  return (
    <Card
      id={id}
      theme={customTheme}
      onClick={() => router.push(`/product/${id}`)}
      className="group max-w-sm overflow-hidden"
      renderImage={() => (
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          <AppImage
            src={thumbnail}
            className="w-full h-full transition-transform duration-300 ease-out object-cover "
            isThumbnail
          />
          <div className="absolute w-full z-30 bottom-0 left-0 right-0 p-4 flex items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
            <AppButton
              text="افزودن به سبد خرید"
              variant="secondary"
              iconRight={(className) => <PlusIcon className={className} />}
              fullWidth
              onClick={(e) => handleAddToCart(e)}
              isDisabled={!quantity || quantity === 0}
            />
          </div>
        </div>
      )}
    >
      <h5 className="text-caption-18 sm:text-subtitle-20 text-light-primary-text-title line-clamp-2">
        {name}
      </h5>
      <p className="text-caption-18 sm:text-title-20 text-light-primary-text-title">{`${price}ت`}</p>
    </Card>
  );
};

export default AppProductCard;
