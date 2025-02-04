import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { OrdersDto } from "./dtos/orders";

const queryName = "orders";
const apiRequestMethod = "get";
type QueryResponse = OrdersDto;
type QueryFnProps = { page: number; deliveryStatus?: boolean };

const useOrders = (props: QueryFnProps) => {
  const { data, isPending, refetch } = useQuery<
    QueryFnProps,
    unknown,
    QueryResponse
  >({
    queryKey: [QUERY_KEYS[queryName], props.page],
    queryFn: () => queryFn(props),
    placeholderData: keepPreviousData,
  });

  return { [queryName]: data, isOrdersLoading: isPending, refetch };
};

const queryFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], {
      params: props,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useOrders;
