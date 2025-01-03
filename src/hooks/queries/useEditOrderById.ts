import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";

const queryName = "editOrderById";
const apiRequestMethod = "patch";
type QueryResponse = any;
type QueryFnProps = { id: string; payLoad: {deliveryStatus: boolean}};

const useEditOrderById = () => {
  const mutation = useMutation<QueryResponse, unknown, QueryFnProps>({
    mutationKey: [QUERY_KEYS[queryName]],
    mutationFn: mutationFn,
  });

  return {
    [queryName]: mutation.mutate,
    isEditOrderByIdLoading: mutation.isPending,
    editProductByIdData: mutation.data,
  };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const url = PATHS[queryName].replace(":id", props.id);
    const res = await client[apiRequestMethod](url, props.payLoad);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useEditOrderById;
