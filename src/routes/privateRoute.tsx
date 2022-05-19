import React, { FC, useEffect } from "react";
// import { useLocale } from '@/locales';
import { Navigate, RouteProps, useLocation } from "react-router";
import { useAtom } from "jotai";
import { userState } from "@/stores/user";
import { useGetCurrentUser } from "@/api";

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const [user, setUser] = useAtom(userState);

  const logged = user.username ? true : false;
  const { data: currentUser, error } = useGetCurrentUser();
  // const { formatMessage } = useLocale();

  if (error) {
    setUser({ ...user, logged: false });
    return <Navigate to="/login" />;
  }

  if (location.pathname === "/login") {
    setUser({ ...user, username: currentUser?.name || "", logged: true });
  } else {
    useEffect(() => {
      setUser({ ...user, username: currentUser?.name || "", logged: true });
    }, [currentUser]);
  }

  return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
