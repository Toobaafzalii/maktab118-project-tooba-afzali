import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import useCartStore from "@/stores/useCartStore";
import useAddCart from "./useAddCart";

const queryName = "login";
const apiRequestMethod = "post";
type QueryResponse = {
  "status": string,
  "token": {
      "accessToken": string,
      "refreshToken": string
  },
  "data": {
      "user": {
          "_id": string
          "firstname": string
          "lastname": string
          "username": string
          "password": string
          "phoneNumber": string
          "address": string
          "role": string
          "createdAt": Date
          "updatedAt": Date
          "__v": number,
          "refreshToken": string
      }
  }
};
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
