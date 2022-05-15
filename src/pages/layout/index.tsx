import React, { FC, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuList, MenuChild } from "@/models/menu.interface";
import { Outlet, useNavigate, useLocation, Link, To } from "react-router-dom";
import { useGetCurrentMenus } from "@/api";
import { useAtom } from "jotai";
import { userState } from "@/stores/user";

import type { MenuDataItem } from "@ant-design/pro-layout";
import ProLayout from "@ant-design/pro-layout";
import { SmileOutlined, HeartOutlined, FrownOutlined } from "@ant-design/icons";
// import { useLocale } from "@/locales";
import RightContent from "./components/RightContent";
import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";
import styles from "./index.module.less";
import Footer from "./components/Footer";

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const LayoutPage: FC = ({ children }) => {
  // const { data: menuList, error } = useGetCurrentMenus();
  const menulist = [
    {
      path: "/dashboard",
      name: "面板",
      locale: "menu.dashboard",
      icon: "heart",
    },
    {
      path: "/project",
      name: "Project",
      icon: "smile",
      locale: "menu.project",
      children: [
        {
          path: "/project/list",
          name: "Project List",
          locale: "menu.project.list",
          icon: "smile",
        },
      ],
    },
    {
      path: "/permission",
      name: "permission",
      locale: "menu.permission",
      icon: "smile",
      children: [
        {
          path: "/permission/list",
          name: "permission list",
          locale: "menu.permission.list",
          icon: "smile",
        },
      ],
    },
    {
      path: "/404",
      name: "404",
      locale: "menu.notfound",
      icon: "frown",
    },
  ];

  const [user, setUser] = useAtom(userState);
  const [pathname, setPathname] = useState("/welcome");
  const { device, collapsed, newUser, settings } = user;
  const isMobile = device === "MOBILE";
  const location = useLocation();
  const navigate = useNavigate();
  // const { formatMessage } = useLocale();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, location]);

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed });
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];
    menu.forEach((m) => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach((mu) => {
          MenuListAll.push(mu);
        });
      }
    });
    return MenuListAll;
  };

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

    return m;
  };

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
      onCollapse={toggle}
      // formatMessage={formatMessage}
      onMenuHeaderClick={() => navigate("/")}
      headerTitleRender={(
        logo: any,
        title:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined,
        props: any
      ) => (
        <a className={styles.layoutPageHeader}>
          <LogoSvg />
          {title}
        </a>
      )}
      menuHeaderRender={undefined}
      menuItemRender={(
        menuItemProps: { isUrl: any; path: To },
        defaultDom:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          // breadcrumbName: formatMessage({ id: "menu.home" }),
          breadcrumbName: "首页",
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => loopMenuItem(menulist)}
      // menuDataRender={() => m}
      rightContentRender={() => <RightContent />}
      footerRender={() => <Footer />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutPage;
