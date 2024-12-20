import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";

const queryName = "editProductsByIds";
const apiRequestMethod = "patch";
type QueryResponse = any;
type QueryFnProps = Array<{ rowId: string; changes: Record<string, any> }>;

const useEditProductsByIds = () => {
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
    iseditByIdsLoading: isPending,
    editByIdsData: data,
  };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const promises = props.map(async ({ rowId, changes }) => {
      const url = PATHS[queryName].replace(":id", rowId);

      const res = await client[apiRequestMethod](url, changes);
      return res.data;
    });

    return Promise.all(promises);
  } catch (error) {
    throw error;
  }
};

export default useEditProductsByIds;
