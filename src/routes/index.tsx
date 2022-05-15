import React, { lazy, FC } from "react";

import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import LayoutPage from "@/pages/layout";
import WrapperRouteComponent from "./config";
import { useRoutes, RouteObject } from "react-router-dom";
import RouteItem from "@/models/route.interface";
import SuspendFallbackLoading from "@/pages/layout/suspendFallbackLoading";

const NotFound = lazy(() => import("@/pages/404"));

export const LocalRouteList: RouteItem[] = [
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
        name: "面板",
        icon: "heart",
        element: (
          <WrapperRouteComponent>
            <Dashboard />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "*",
        element: (
          <WrapperRouteComponent>
            <NotFound />
          </WrapperRouteComponent>
        ),
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
