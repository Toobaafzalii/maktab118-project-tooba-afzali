import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../queryKeys";

const queryName = "login";
const apiRequestMethod = "get";
type QueryResponse = any;
type QueryFnProps = any;

const useLogin = () => {
  const { data, isPending } = useQuery<QueryFnProps, unknown, QueryResponse>({
    queryKey: [QUERY_KEYS[queryName]],
    queryFn: queryFn,
  });

  return { [queryName]: data, isLoginLoading: isPending };
};

const queryFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], { ...props });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useLogin;
