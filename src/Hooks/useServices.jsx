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
      const res = await axios.get("http://localhost:3000/services");
      return res.data;
    },
  });

  return { services, loading, refetch };
};

export default useServices;
