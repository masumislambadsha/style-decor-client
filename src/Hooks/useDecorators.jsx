import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDecorators = () => {
  const {
    data: decorators = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/decorators");
      return res.data;
    },
  });

  return { decorators, loading, refetch };
};

export default useDecorators;
