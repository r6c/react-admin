import React from "react";
import { Button, Card, Checkbox, Form, Input, Spin } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LoginParams } from "@/models/login";
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { useLogin } from "@/api";

import styles from "./index.module.less";
import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";

const initialValues: LoginParams = {
  username: "",
  password: "",
  // remember: true
};

const LoginForm: React.FC = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation() as any;

  // const dispatch = useAppDispatch();

  const onFinished = async (form: LoginParams) => {
    const result = await loginMutation.mutateAsync(form);

    if (result) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);

      const from = location.state?.from || "/dashboard";
      navigate(from);
    }
  };

  return (
    <div className={styles.container}>
      <Spin spinning={loginMutation.isLoading}>
        <Card>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>项目管理</span>
              </Link>
            </div>
          </div>
          <div className={styles.main}>
            <Form<LoginParams>
              onFinish={onFinished}
              initialValues={initialValues}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入用户名！" }]}
              >
                <Input size="large" placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码！" }]}
              >
                <Input type="password" size="large" placeholder="密码" />
              </Form.Item>
              <Form.Item>
                <Button size="large" htmlType="submit" type="primary">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default LoginForm;
