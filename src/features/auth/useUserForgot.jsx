import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgot as forgotApi } from "../../api/authApi";

export function useUserForgot() {
  const navigate = useNavigate();
  const { isPending, mutate:forgot } = useMutation({
    mutationFn: forgotApi,
    onSuccess: () => {
      toast.success("We already sent an email to you");
      navigate("/forex/login/")
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, forgot };
}
