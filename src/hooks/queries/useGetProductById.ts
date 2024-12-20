import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "../../api/axios";
import { PATHS } from "../../api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { CategoriesDto } from "./dtos/categories";
import { SingleProductDto } from "./dtos/products";

const queryName = "getProductById";
const apiRequestMethod = "get";
type QueryResponse = SingleProductDto;
type QueryFnProps = { id: string };

const useSingleProductById = (props: QueryFnProps) => {
  const { data, isPending, refetch, isError } = useQuery<
    QueryFnProps,
    unknown,
    QueryResponse
  >({
    queryKey: [QUERY_KEYS[queryName], props.id],
    queryFn: () => queryFn(props),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    [queryName]: data,
    isSingleProductByIdLoading: isPending,
    refetch,
    isError,
  };
};

const queryFn = async (props: QueryFnProps) => {
  try {
    const url = PATHS[queryName].replace(":id", props.id);
    const res = await client[apiRequestMethod](url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useSingleProductById;
