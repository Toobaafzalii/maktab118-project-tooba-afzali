import useGetUserById from "@/hooks/queries/useGetUserById";
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
  productsByIds: "products/:id",
  getUserById: "users/:id",
  editUserById: "users/:id",
  newOrder: "/orders",
  getOrderById: "/orders/:id",
  editOrderById: "/orders/:id",
  addCart : "/cart",
  updateCart : "/cart",
  deleteCart : "/cart",
  
};
