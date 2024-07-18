import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTransaction } from "../../api/apiData";

export default function useUpdateTransaction(onCloseModal) {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      toast.success("Transactions successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onCloseModal();
    },
    onError: (err) => toast.error(`Transactions Failed\n${err.message}`),
  });

  return { isUpdating, update };
}
