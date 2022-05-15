import React from "react";
import { Spin } from "antd";

const SuspendFallbackLoading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Spin tip="加载中..."></Spin>
    </div>
  );
};

export default SuspendFallbackLoading;
