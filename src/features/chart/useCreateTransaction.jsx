import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTransaction } from "../../api/apiData";

export default function useCreateTransaction(onCloseModal) {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Transactions successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onCloseModal();
    },
    onError: (err) => toast.error(`Transactions Failed\n${err.message}`),
  });

  return { isCreating, create };
}
