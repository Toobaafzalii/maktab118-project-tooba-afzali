import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";

const queryName = "login";
const apiRequestMethod = "post";
type QueryResponse = any;
type QueryFnProps = any;

const useLogin = () => {
  const { mutate, isPending } = useMutation<
    QueryResponse,
    unknown,
    QueryFnProps
  >({
    mutationFn: mutationFn,
  });

  return { [queryName]: mutate, isLoginLoading: isPending };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], { ...props });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useLogin;
