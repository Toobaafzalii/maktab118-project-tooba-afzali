import { useQuery } from "@tanstack/react-query";
import { client } from "../../api/axios";
import { PATHS } from "../../api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { SingleProductDto } from "./dtos/products";

const queryName = "getUserById";
const apiRequestMethod = "get";
type QueryResponse = {
  status: string
 data: {
  user: { _id: string
    accessToken: string;
    refreshToken: string;
    role: string;
    firstname: string;
    lastname: string;
    address: string
    phoneNumber: string}
 }
};
type QueryFnProps = { id: string };

const useGetUserById = (props: QueryFnProps) => {
  const { data, isPending, refetch, isError, isRefetching } = useQuery<
    QueryFnProps,
    unknown,
    QueryResponse
  >({
    queryKey: [QUERY_KEYS[queryName], props.id],
    queryFn: () => queryFn(props),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    [queryName]: data,
    isGetUserByIdIdLoading: isPending,
    refetch,
    isError,
    isRefetching,
  };
};

const queryFn = async (props: QueryFnProps) => {
  try {
    const url = PATHS[queryName].replace(":id", props.id);
    const res = await client[apiRequestMethod](url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useGetUserById;
