import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { AxiosError } from "axios";
import { UserByIdDto } from "./dtos/users";
import { QUERY_KEYS } from "./queryKeys";

const queryName = "userByIds";
const apiRequestMethod = "get";
type QueryResponse = Array<UserByIdDto>;
type QueryFnProps = { ids: Array<string> };

const useUserByIds = () => {
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
    isUserByIdsLoading: isPending,
    userByIdsData: data,
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

export default useUserByIds;
