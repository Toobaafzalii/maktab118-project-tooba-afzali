import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "../../api/axios";
import { PATHS } from "../../api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { CategoriesDto } from "./dtos/categories";

const queryName = "categories";
const apiRequestMethod = "get";
type QueryResponse = CategoriesDto;
type QueryFnProps = { page: number , slugname?: string };

const useCategories = (props: QueryFnProps) => {
  const { data, isPending, refetch, isError } = useQuery<
    QueryFnProps,
    unknown,
    QueryResponse
  >({
    queryKey: [QUERY_KEYS[queryName], props.page , props.slugname],
    queryFn: () => queryFn(props),
    placeholderData: keepPreviousData,
  });

  return {
    [queryName]: data,
    isCategoriesLoading: isPending,
    refetch,
    categoriesError: isError,
  };
};

const queryFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], {
      params: props,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useCategories;
