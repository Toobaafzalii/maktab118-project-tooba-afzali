import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";

const queryName = "newOrder";
const apiRequestMethod = "post";
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
type QueryFnProps = {
  user: string;
  products: Array<{ product: string; count: number }>;
  deliveryStatus: boolean;
};

const useNewOrder = () => {
  const { mutate, isPending, data } = useMutation<
    QueryResponse,
    unknown,
    QueryFnProps
  >({
    mutationFn: mutationFn,
  });

  return {
    [queryName]: mutate,
    isNewOrderLoading: isPending,
    newOrderData: data,
  };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], props);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useNewOrder;
