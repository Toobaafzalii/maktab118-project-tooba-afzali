import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";

export interface EditUserPayload {
    firstname: string
    lastname: string
    phoneNumber: string
    address: string
} 

const queryName = "editUserById";
const apiRequestMethod = "patch";
type QueryResponse = any;
type QueryFnProps = { id: string; payLoad:EditUserPayload };

const useEditUserById = () => {
  const mutation = useMutation<QueryResponse, unknown, QueryFnProps>({
    mutationKey: [QUERY_KEYS[queryName]],
    mutationFn: mutationFn,
  });

  return {
    [queryName]: mutation.mutate,
    isEditUserByIdLoading: mutation.isPending,
    editUserByIdData: mutation.data,
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

export default useEditUserById;
