import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { queryKeys } from "../../utils/queryKeys";
import { useToast } from "../../hooks/useToast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { success: toastSuccess, error: toastError } = useToast();

  return useMutation({
    mutationFn: createCabin,
    onSuccess: data => {
      toastSuccess("Cabin successfuly added.");
      queryClient.invalidateQueries({ queryKey: queryKeys.cabins.all });
      console.log(data);
    },
    onError: error => {
      toastError(error);
      console.error(error);
    },
  });
}
