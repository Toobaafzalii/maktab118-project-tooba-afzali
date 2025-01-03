import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "../../api/axios";
import { PATHS } from "../../api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { SubcategoriesDto } from "./dtos/subcategories";

const queryName = "subcategories";
const apiRequestMethod = "get";
type QueryResponse = SubcategoriesDto;
type QueryFnProps = { page: number , slugname?:string };

const useSubcategories = (props: QueryFnProps) => {
  const { data, isPending, refetch  , error } = useQuery<
    QueryFnProps,
    unknown,
    QueryResponse
  >({
    queryKey: [QUERY_KEYS[queryName], props.page , props.slugname],
    queryFn: () => queryFn(props),
    enabled:!!props
  });

  return { [queryName]: data, isSubcategoriesLoading: isPending, refetch , isSubCategoriesError : error };
};

const queryFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], {
      params: {
        ...props,
        limit: 1000,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useSubcategories;
