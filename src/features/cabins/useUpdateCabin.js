import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import { queryKeys } from "../../utils/queryKeys";
import { useToast } from "../../hooks/useToast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { success: toastSuccess, error: toastError } = useToast();

  return useMutation({
    mutationFn: updateCabin,
    onSuccess: data => {
      toastSuccess("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: queryKeys.cabins.all });
      console.table(data);
    },
    onError: error => {
      toastError(error);
      console.error(error);
    },
  });
}
