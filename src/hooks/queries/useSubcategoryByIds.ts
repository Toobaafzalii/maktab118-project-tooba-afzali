import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { SubcategoryByIdDto } from "./dtos/subcategories";

const queryName = "subcategoryByIds";
const apiRequestMethod = "get";
type QueryResponse = Array<SubcategoryByIdDto>;
type QueryFnProps = { ids: Array<string> };

const useSubcategoryByIds = () => {
  const { mutate, isPending, data } = useMutation<
    QueryResponse,
    unknown,
    QueryFnProps
  >({
    mutationKey: [QUERY_KEYS[queryName]],
    mutationFn: mutationFn,
  });

  return {
    [queryName]: mutate,
    issubcategoryByIdsLoading: isPending,
    subcategoryByIdsData: data,
  };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const promises = props.ids.map(async (id) => {
      const url = PATHS[queryName].replace(":id", id);
      const res = await client[apiRequestMethod](url);
      return res.data;
    });
    return Promise.all(promises).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};

export default useSubcategoryByIds;
