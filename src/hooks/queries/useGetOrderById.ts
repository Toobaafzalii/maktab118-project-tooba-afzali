import { useQuery } from "@tanstack/react-query";
import { client } from "../../api/axios";
import { PATHS } from "../../api/paths";
import { QUERY_KEYS } from "./queryKeys";
import { SingleProductDto } from "./dtos/products";

const queryName = "getOrderById";
const apiRequestMethod = "get";
type QueryResponse = {
  status: string;
  data: {
    order: {
      user: string;
      products: [
        {
          product: {
            _id: string;
            price: number;
          };
          count: number;
          _id: string;
        }
      ];
      totalPrice: number;
      deliveryDate: Date;
      deliveryStatus: boolean;
      _id: string;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    };
  };
};
type QueryFnProps = { id: string };

const useGetOrderById = (props: QueryFnProps) => {
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
    isOrderByIdLoading: isPending,
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

export default useGetOrderById;
