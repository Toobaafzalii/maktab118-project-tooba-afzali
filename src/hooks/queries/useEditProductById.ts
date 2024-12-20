import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";

const queryName = "editProductById";
const apiRequestMethod = "patch";
type QueryResponse = any;
type QueryFnProps = { id: string; payLoad: FormData };

const useEditProductById = () => {
  const mutation = useMutation<QueryResponse, unknown, QueryFnProps>({
    mutationKey: [QUERY_KEYS[queryName]],
    mutationFn: mutationFn,
  });

  return {
    [queryName]: mutation.mutate,
    isEditProductByIdLoading: mutation.isPending,
    editProductByIdData: mutation.data,
  };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const url = PATHS[queryName].replace(":id", props.id);
    const res = await client[apiRequestMethod](url, props.payLoad, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useEditProductById;
