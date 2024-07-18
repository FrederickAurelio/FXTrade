import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTransaction } from "../../api/apiData";

export default function useDeleteTransaction(onCloseModal) {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deletes } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transactions successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onCloseModal();
    },
    onError: (err) => toast.error(`Transactions Failed\n${err.message}`),
  });

  return { isDeleting, deletes };
}
