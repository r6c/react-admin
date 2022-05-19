import { MenuDataItem } from "@ant-design/pro-layout";

export const LocalMenulist: MenuDataItem[] = [
  {
    path: "/dashboard",
    name: "面板",
    locale: "menu.dashboard",
  },
  {
    name: "设置",
    locale: "menu.project",
    children: [
      {
        path: "/setting",
        name: "设置",
        locale: "menu.project.list",
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    locale: "menu.notfound",
  },
];
