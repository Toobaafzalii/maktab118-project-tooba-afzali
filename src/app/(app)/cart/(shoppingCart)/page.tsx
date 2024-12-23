"use client";

import AppOrderDetailsCard from "@/components/molecules/appOrderDetailsCard";
import AppShoppingCartTable from "@/components/organisms/appShoppingCartTable";

const ShoppingCartPage: React.FC = () => {
  return (
    <div className="relative bg-light-primary-surface-default flex flex-grow justify-between items-start p-10 w-full text-nowrap gap-2">
      <AppShoppingCartTable />
      <AppOrderDetailsCard hasButton={true} />
    </div>
  );
};
export default ShoppingCartPage;
