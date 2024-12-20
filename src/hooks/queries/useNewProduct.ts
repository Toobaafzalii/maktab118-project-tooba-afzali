import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { AxiosError } from "axios";
import { AddProductDto, ProductDto } from "./dtos/products";
import { ProductFormValues } from "@/components/organisms/appNewProductModal";
import { headers } from "next/headers";

const queryName = "newProduct";
const apiRequestMethod = "post";
type QueryResponse = any;
type QueryFnProps = FormData;

const useNewProduct = () => {
  const { mutate, isPending, data } = useMutation<
    QueryResponse,
    unknown,
    QueryFnProps
  >({
    mutationFn: mutationFn,
  });

  return {
    [queryName]: mutate,
    isNewProductLoading: isPending,
    newProductData: data,
  };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], props, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useNewProduct;
