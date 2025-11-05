import { axiosInstance } from "../../../config/axios";
import type { UserProfile } from "../../../entity/user";
import type { SignInPayload } from "../entity/signIn";

export const SignIn = async (payload: SignInPayload) => {
  const response = await axiosInstance.post<UserProfile>("auth/signin", payload);

  return response.data;
};
