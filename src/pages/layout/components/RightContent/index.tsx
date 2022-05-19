import { Tag, Space, Menu } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";

import Avatar from "./AvatarDropdown";
import HeaderDropdown from "../HeaderDropdown";
// import "./index.less";
import classes from "./index.module.less";
import { useAtom } from "jotai";
import { userState } from "@/stores/user";
import SelectLang from "./SelectLang";
import { ReactComponent as LanguageSvg } from "@/assets/header/language.svg";

export type SiderTheme = "light" | "dark";

const ENVTagColor = {
  dev: "orange",
  test: "green",
  pre: "#87d068",
};

const GlobalHeaderRight: React.FC = () => {
  const [user, setUser] = useAtom(userState);

  const { settings } = user;
  let className = classes.right;

  if (
    (settings.navTheme === "dark" && settings.layout === "top") ||
    settings.layout === "mix"
  ) {
    className = `${classes.right} ${classes.dark}`;
  }
  return (
    <Space className={className}>
      <Avatar />

      <SelectLang className={classes.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
