import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/api/axios";
import { PATHS } from "@/api/paths";
import { AxiosError } from "axios";

const queryName = "login";
const apiRequestMethod = "post";
type QueryResponse = {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      password: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      refreshToken: string;
    };
  };
};

type QueryFnProps = {
  username: string;
  password: string;
};

const useLogin = () => {
  const { mutate, isPending } = useMutation<
    QueryResponse,
    AxiosError,
    QueryFnProps
  >({
    mutationFn: mutationFn,
  });

  return { [queryName]: mutate, isLoginLoading: isPending };
};

const mutationFn = async (props: QueryFnProps) => {
  try {
    const res = await client[apiRequestMethod](PATHS[queryName], {
      data: {
        ...props,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default useLogin;
