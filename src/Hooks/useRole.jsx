import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      // console.log("role api response:", res.data);
      return res.data.role || "user";
    },
    enabled: !!user?.email,
  });

  const role = data || "user";
  // console.log("useRole ->", user?.email, role, "loading:", isLoading);

  return [role, isLoading];
};


export default useRole;
