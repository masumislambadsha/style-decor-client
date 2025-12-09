import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useServices = () => {
  const {
    data: services = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get("https://style-decor-server-two.vercel.app/services");
      return res.data;
    },
  });

  return { services, loading, refetch };
};

export default useServices;
