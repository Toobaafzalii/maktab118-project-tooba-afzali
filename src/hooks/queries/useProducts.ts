import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";

import { ProductsDto } from "./dtos/products";

const queryName = "products";
const apiRequestMethod = "get";
type QueryResponse = ProductsDto;
type QueryFnProps = {
  page: number;
  limit: number;
  sort?: string;
  subcategory?: string;
};

const useProducts = (props: QueryFnProps) => {
  const { data, isPending, refetch, isRefetching } = useQuery<
    QueryFnProps,
    unknown,
    QueryResponse
  >({
    queryKey: [
      QUERY_KEYS[queryName],
      props.page,
      props.sort,
      props.limit,
      props.subcategory,
    ],
    queryFn: () => queryFn(props),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return {
    [queryName]: data,
    isProductsLoading: isPending,
    refetch,
    isRefetching,
  };
};

const queryFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], {
      params: { ...props, limit: props.limit },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useProducts;
