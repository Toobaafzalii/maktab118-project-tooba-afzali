import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import useCartStore, { CartItem } from "@/stores/useCartStore";
import { nextClient } from "@/api/nextClient";
import { AxiosError } from "axios";

const queryName = "updateCart";
const apiRequestMethod = "patch";
type QueryResponse = { message: string };
type QueryFnProps = { itemId: string; quantity: number };

const useUpdateCart = () => {
  const { updateQuantity } = useCartStore();

  const { mutate, isPending } = useMutation<
    QueryResponse,
    AxiosError,
    QueryFnProps
  >({
    mutationFn: mutationFn,
    onSuccess(data, variables, context) {
      updateQuantity(variables.itemId, variables.quantity);
    },
    onError(error, variables, context) {
      if (error.status === 401) {
        updateQuantity(variables.itemId, variables.quantity);
      }
    },
  });

  return { [queryName]: mutate, isCartUpdating: isPending };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const res = await nextClient[apiRequestMethod](PATHS[queryName], props);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useUpdateCart;
