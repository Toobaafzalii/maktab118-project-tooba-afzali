import useSubcategoryById from "@/hooks/queries/useSubcategoryByIds";

export const PATHS = {
  login: "/auth/login",
  signup: "/auth/signup",
  token: "/auth/token",
  orders: "/orders",
  products: "/products",
  users: "/users",
  userByIds: "/users/:id",
  subcategoryByIds: "/subcategories/:id",
  newProduct: "/products",
  categories: "/categories",
  subcategories: "/subcategories",
  editProductById: "/products/:id",
  getProductById: "/products/:id",
  deleteProductById: "products/:id",
  editProductsByIds: "products/:id",
};
