import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { SubcategoryByIdDto } from "./dtos/subcategories";
import { SingleProductDto } from "./dtos/products";

const queryName = "productsByIds";
const apiRequestMethod = "get";
type QueryResponse = SingleProductDto["data"]["product"][];
type QueryFnProps = { ids: Array<string> };

const useSingleProductByIds = (props: QueryFnProps) => {
  const { data, isPending, refetch, isError } = useQuery<
    unknown,
    unknown,
    QueryResponse
  >({
    queryKey: [QUERY_KEYS[queryName], props.ids],
    queryFn: () => queryFn({ ids: props.ids }),
  });

  return {
    [queryName]: data,
    isSingleProductByIdLoading: isPending,
    refetch,
    isError,
  };
};

const queryFn = async (props: QueryFnProps): Promise<QueryResponse> => {
  try {
    const promises = props.ids.map(async (id) => {
      const url = PATHS[queryName].replace(":id", id);
      const res = await client[apiRequestMethod]<SingleProductDto>(url);
      return res.data.data.product;
    });
    return Promise.all(promises).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};

export default useSingleProductByIds;
