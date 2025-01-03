import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import useCartStore, { CartItem } from "@/stores/useCartStore";
import { nextClient } from "@/api/nextClient";
import { AxiosError } from "axios";

const queryName = "deleteCart";
const apiRequestMethod = "delete";
type QueryResponse = { message: string };
type QueryFnProps = { itemId?: string; deleteAll?: boolean };

const useDeleteCart = () => {
  const { removeItem, setItems } = useCartStore();

  const { mutate, isPending } = useMutation<
    QueryResponse,
    AxiosError,
    QueryFnProps
  >({
    mutationFn: mutationFn,
    onSuccess(data, variables, context) {
      if (variables.deleteAll) {
        setItems([]);
      } else if (variables.itemId) {
        removeItem(variables.itemId);
      }
    },
    onError(error, variables, context) {
      if (error.status === 401) {
        if (variables.deleteAll) {
          setItems([]);
        } else if (variables.itemId) {
          removeItem(variables.itemId);
        }
      }
    },
  });

  return { [queryName]: mutate, isDeletingCart: isPending };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const res = await nextClient[apiRequestMethod](PATHS[queryName], {
      data: props,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useDeleteCart;
