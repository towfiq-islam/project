import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";

export default function useClientApi({
  endpoint,
  method = "get",
  key,
  onSuccess,
  onError,
  params,
  headers,
  queryOptions,
  mutationOptions,
  axiosOptions,
  enabled = true,
} = {}) {
  const axiosInstance = axiosPublic;

  // GET Request (useQuery)
  if (method === "get") {
    return useQuery({
      queryKey: key || [endpoint],
      queryFn: async () => {
        const res = await axiosInstance.get(endpoint, {
          params,
          headers,
          ...axiosOptions,
        });
        return res.data;
      },
      enabled,
      ...queryOptions,
    });
  }

  // POST, PUT, DELETE (useMutation)
  return useMutation({
    mutationKey: key || [endpoint],
    mutationFn: async (variables = {}) => {
      const dynamicEndpoint = variables?.endpoint || endpoint;
      const payload = variables?.data || variables;

      const res = await axiosInstance[method](dynamicEndpoint, payload, {
        headers,
        ...axiosOptions,
      });

      return res?.data;
    },
    onSuccess,
    onError,
    ...mutationOptions,
  });
}
