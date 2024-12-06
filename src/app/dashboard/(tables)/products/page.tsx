import ProductsTable from "@/components/organisms/products/productsTable";
import React from "react";
const ProductsPage: React.FC = () => {
  return (
    <div className="w-full flex flex-1">
      <ProductsTable />
    </div>
  );
};
export default ProductsPage;
