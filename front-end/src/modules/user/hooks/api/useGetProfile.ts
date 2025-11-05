import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/getProfile";
import type { UserProfile } from "../../../../entity/user";
import type { ErrorObject } from "../../../../entity/Error";

const useGetCategoryDetails = () => {
  const token = localStorage.getItem("access_token");
  const { isError, error, isFetching, data, isSuccess } = useQuery<UserProfile, ErrorObject>({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    retry: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: Boolean(token),
  });

  return {
    isError,
    error,
    isFetching,
    isSuccess,
    data,
  };
};

export default useGetCategoryDetails;
