import { axiosInstance } from "../../../config/axios";
import type { UserProfile } from "../../../entity/user";

export const getProfile = async () => {
  const token = localStorage.getItem("access_token");

  const response = await axiosInstance.get<UserProfile>("user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
