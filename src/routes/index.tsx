import React, { lazy, FC } from "react";

import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import LayoutPage from "@/pages/layout";
import WrapperRouteComponent from "./auth";
import { useRoutes, RouteObject } from "react-router-dom";
import SettingPage from "@/pages/setting";

const NotFound = lazy(() => import("@/pages/404"));

const LocalRouteList: RouteObject[] = [
  {
    path: "/",
    element: (
      <WrapperRouteComponent auth={true}>
        <LayoutPage />
      </WrapperRouteComponent>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(LocalRouteList);
  return element;
};

export default RenderRouter;
