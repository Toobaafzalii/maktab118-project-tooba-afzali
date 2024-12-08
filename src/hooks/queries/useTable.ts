import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "./queryKeys";

type QueryName = keyof typeof QUERY_KEYS;

type QueryFnProps = Record<string, any>;

interface UseTableProps<T> {
  queryName: QueryName;
  apiRequestMethod?: "get" | "post" | "put" | "delete";
  queryParams?: QueryFnProps;
  enabled?: boolean;
  dataFormatter?: (data: T) => T;
}

const useTable = <T>({
  queryName,
  apiRequestMethod = "get",
  queryParams = {},
  enabled = true,
  dataFormatter = (data) => data as T,
}: UseTableProps<T>) => {
  const queryFn = async () => {
    try {
      const response = await client[apiRequestMethod](
        PATHS[queryName],
        queryParams
      );
      return dataFormatter(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "An error occurred");
      }
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery<T, AxiosError>({
    queryKey: [QUERY_KEYS[queryName], queryParams],
    queryFn,
    enabled,
  });

  return { data, isLoading, error };
};

export default useTable;
