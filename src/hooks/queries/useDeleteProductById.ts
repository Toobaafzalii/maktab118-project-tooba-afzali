import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";

const queryName = "deleteProductById";
const apiRequestMethod = "delete";
type QueryResponse = any;
type QueryFnProps = { id: string };

const useDeleteProductById = () => {
  const mutation = useMutation<QueryResponse, unknown, QueryFnProps>({
    mutationKey: [QUERY_KEYS[queryName]],
    mutationFn: mutationFn,
  });

  return {
    [queryName]: mutation.mutate,
    isDeleteProductByIdLoading: mutation.isPending,
    deleteProductByIdData: mutation.data,
  };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const url = PATHS[queryName].replace(":id", props.id);
    const res = await client[apiRequestMethod](url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useDeleteProductById;
