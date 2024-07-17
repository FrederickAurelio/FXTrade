import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../api/authApi";
import toast from "react-hot-toast";

export function useUserLogin() {
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("Login successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, login };
}
