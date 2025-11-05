import { useMutation } from "@tanstack/react-query";
import type { SignUpPayload } from "../../entity/signUp";
import type { ErrorObject } from "../../../../entity/Error";
import { SignUp } from "../../api/signUp";
import { toast } from "sonner";
import type { UserProfile } from "../../../../entity/user";

export const useSignUp = (
  onSuccess?: (res: UserProfile) => void,
  onError?: (err: ErrorObject) => void
) => {
  const { isError, error, mutate, isPending, data, isSuccess, reset, mutateAsync } = useMutation<
    UserProfile,
    ErrorObject,
    SignUpPayload
  >({
    mutationFn: (payload: SignUpPayload) => {
      return SignUp(payload);
    },
    onError: async (err) => {
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
