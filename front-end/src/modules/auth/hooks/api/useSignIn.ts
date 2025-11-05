import { useMutation } from "@tanstack/react-query";
import type { SignInPayload } from "../../entity/signIn";
import { SignIn } from "../../api/signIn";
import type { ErrorObject } from "../../../../entity/Error";
import { toast } from "sonner";
import type { UserProfile } from "../../../../entity/user";

export const useSignIn = (
  onSuccess?: (res: UserProfile) => void,
  onError?: (err: ErrorObject) => void
) => {
  const { isError, error, mutate, isPending, data, isSuccess, reset, mutateAsync } = useMutation<
    UserProfile,
    ErrorObject,
    SignInPayload
  >({
    mutationFn: (payload: SignInPayload) => {
      return SignIn(payload);
    },
    onError: async (err) => {
      console.log(err);
      toast.error(err.message);
      onError?.(err);
    },
    onSuccess: async (res) => {
      onSuccess?.(res);
    },
  });

  return {
    isError,
    error,
    mutate,
    isPending,
    data,
    isSuccess,
    reset,
    mutateAsync,
  };
};
