import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import useCartStore, { CartItem } from "@/stores/useCartStore";
import { nextClient } from "@/api/nextClient";
import { AxiosError } from "axios";

const queryName = "addCart";
const apiRequestMethod = "post";
type QueryResponse = {
  data: {
    cartItems: CartItem[];
  };
};
type QueryFnProps = CartItem[];

const useAddCart = () => {
  const { setItems, addItem } = useCartStore();
  const { mutate, isPending } = useMutation<
    QueryResponse,
    AxiosError,
    QueryFnProps
  >({
    mutationFn: mutationFn,
    onSuccess(data, variables, context) {
      setItems(data.data.cartItems);
    },
    onError(error, variables, context) {
      if (error.status === 401 && variables.length === 1) {
        addItem(variables[0].id, variables[0].quantity);
      }
    },
  });

  return { [queryName]: mutate, isAddingCart: isPending };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const res = await nextClient[apiRequestMethod](PATHS[queryName], props);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useAddCart;
