import React, { FC, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
// import { useLocale } from '@/locales';
import { Navigate, RouteProps, useLocation } from "react-router";
import { useAtom } from "jotai";
import { userState } from "@/stores/user";
import { useGetCurrentUser } from "@/api";

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const [user, setUser] = useAtom(userState);

  console.log("user: ", user);
  const logged = user.username ? true : false;
  console.log("username: ", user.username, logged);
  const navigate = useNavigate();
  // const { formatMessage } = useLocale();
  const location = useLocation();

  const { data: currentUser, error } = useGetCurrentUser();

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    setUser({ ...user, username: currentUser?.name || "", logged: true });
  }, [currentUser]);

  if (error) {
    setUser({ ...user, logged: false });
    return <Navigate to="/login" />;
  }

  return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
