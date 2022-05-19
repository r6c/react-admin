import { LogoutParams, LogoutResult } from "@/models/login";
import { useCreate } from "./request";

export const useLogout = () => {
  return useCreate<LogoutParams, LogoutResult>("/api/user/logout");
};
