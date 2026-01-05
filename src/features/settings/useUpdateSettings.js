import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { useToast } from "../../hooks/useToast";
import { queryKeys } from "../../utils/queryKeys";

export function useUpdateSettings() {
  const { success: toastSuccess, error: toastError } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toastSuccess("Settings successfully updated.");
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
    onError: error => {
      toastError("Updating settings faild!");
      console.error(error);
    },
  });
}
