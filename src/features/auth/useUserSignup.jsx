import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export function useUserSignup() {
  const navigate = useNavigate();
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Signup successfully");
      navigate("/forex/app/")
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, signup };
}
