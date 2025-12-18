import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { createCabine } from "../services/apiCabins";
import { queryKeys } from "../utils/queryKeys";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { success: toastSuccess, error: toastError } = useToast();

  return useMutation({
    mutationFn: createCabine,
    onSuccess: data => {
      console.log(data);
      toastSuccess("Cabin successfuly added.");
      queryClient.invalidateQueries({ queryKey: queryKeys.cabins.all });
    },
    onError: error => {
      toastError(error);
      console.error(error);
    },
  });
}
