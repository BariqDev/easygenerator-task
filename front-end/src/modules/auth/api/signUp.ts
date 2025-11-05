import { axiosInstance } from "../../../config/axios";
import type { UserProfile } from "../../../entity/user";
import type { SignUpPayload } from "../entity/signUp";

export const SignUp = async (payload: SignUpPayload) => {
  const response = await axiosInstance.post<UserProfile>("auth/signup", payload);

  return response.data;
};
