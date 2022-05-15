import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useLocale } from '@/locales';

const NotFoundPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  // const { formatMessage } = useLocale();
  return (
    <Result
      status="404"
      title="404"
      // subTitle={formatMessage({ id: "gloabal.tips.notfound" })}
      subTitle="Not Found"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {/* {formatMessage({ id: "gloabal.tips.backHome" })} */}
          Back Home
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
