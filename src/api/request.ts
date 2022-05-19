import { createContext } from "react";
import Axios, { AxiosInstance } from "axios";
import { notification } from "antd";
import { useContext } from "react";
import qs from "qs";
import { useQuery, useMutation, useQueryClient } from "react-query";

const axios = Axios.create({
  baseURL: "",
  timeout: 25000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config: any) => {
    // Read token for anywhere, in this case directly from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    console.log("response:", response);
    if (response.status === 200 && data.code === 200) {
      return data.data;
    }

    notification.error({
      message: `请求错误 ${response.data.code}: ${response}`,
      description: data.msg || "Error",
    });

    if (response.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(new Error(response.statusText || "Error"));
  },
  (error) => {
    console.log("err:", error, error.response); // for debug

    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          window.location.href = "/login";
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          window.location.href = "/login";
          break;
        // 404请求不存在
        case 404:
          notification.error({
            message: `请求不存在`,
            description: error.response.data?.msg || "Error",
          });
          break;
        case 406:
          notification.error({
            message: `请求参数有误`,
            description: error.response.data?.msg || "Error",
          });
          break;
        default:
          notification.error({
            message: `请求错误`,
            description: error.response.data?.msg || "Error",
          });
      }
    }

    // throw new Error(error);
    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
    get: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

const transformPagination = (pagination: any) => {
  if (!pagination) return;

  const current = pagination.current
    ? pagination.current
    : pagination.defaultCurrent;
  const pageSize = pagination.pageSize
    ? pagination.pageSize
    : pagination.defaultPageSize;

  let offset = 0;
  if (current && pageSize) {
    offset = (current - 1) * pageSize;
  }

  return {
    offset,
    limit: pageSize,
  };
};

const transformFilters = (filters: any) => {
  if (!filters) return;
  let result: any[] = [];
  for (let key in filters) {
    if (!filters[key] || filters[key] === null) continue;
    result = [...result, [key + ":eq:" + filters[key]]];
  }
  return result;
};

const transformSorter = (sorter: any) => {
  if (!sorter) return;

  let result = "";
  if (sorter.field && sorter.order) {
    let order: string = "desc";
    if (sorter.order === "ascend") order = "asc";
    result = sorter.field + " " + order;
  }

  return result;
};

type listParams = {
  limit?: number;
  offset?: number;
  filter?: string[];
  order?: string;
};
const useGetList = <T>(
  key: string,
  url: string,
  pagination?: any,
  filters?: any,
  sorter?: any
) => {
  const axios = useAxios();

  const service = async () => {
    let params: listParams = {};

    params = { ...transformPagination(pagination) };
    params.filter = transformFilters(filters);
    params.order = transformSorter(sorter);

    const data: T = await axios.get(`${url}`, {
      params,
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });

    return data;
  };

  return useQuery(key, () => service());
};

const useGetOne = <T>(key: string, url: string, params?: any) => {
  const axios = useAxios();

  const service = async () => {
    const data: T = await axios.get(`${url}`, params);

    return data;
  };
  return useQuery(key, () => service());
};

const useCreate = <T, U>(url: string) => {
  const axios = useAxios();
  const service = async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  };

  return useMutation(service);
};

const useUpdate = <T>(url: string) => {
  const axios = useAxios();
  // const queryClient = useQueryClient();
  // return useMutation(async (item: T) => {
  //   const data: T = await axios.patch(`${url}`, item);
  //   return data;
  // });
  const service = async (item: T) => {
    const data: T = await axios.patch(`${url}`, item);
    return data;
  };

  return useMutation(service);
};

const useDelete = <T>(url: string) => {
  const axios = useAxios();
  // const queryClient = useQueryClient();
  // return useMutation(async (id: number) => {
  //   const data: T = await axios.delete(`${url}?id=${id}`);
  //   return data;
  // });
  const service = async (id: number) => {
    const data: T = await axios.delete(`${url}?id=${id}`);
    return data;
  };

  return useMutation(service);
};

const useBatch = (url: string) => {
  const axios = useAxios();
  // const queryClient = useQueryClient();
  // return useMutation(async (ids: number[]) => {
  //   const data = await axios.post(`${url}`, { idList: ids });
  //   return data;
  // });

  const service = async (ids: number[]) => {
    const data = await axios.post(`${url}`, { idList: ids });
    return data;
  };

  return useMutation(service);
};

export { useGetOne, useGetList, useUpdate, useCreate, useDelete, useBatch };

export default axios;
