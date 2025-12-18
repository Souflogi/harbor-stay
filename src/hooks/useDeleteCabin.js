import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { deleteCabin } from "../services/apiCabins";
import { queryKeys } from "../utils/queryKeys";

/**
 * Custom hook for deleting a cabin
 * Handles mutation logic, cache invalidation, and user notifications
 * @returns {UseMutationResult} Mutation object with isPending, mutate, etc.
 */
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { success: toastSuccess, error: toastError } = useToast();

  // Configure and return the delete mutation
  return useMutation({
    mutationFn: deleteCabin,
    // Handle successful deletion
    onSuccess: () => {
      toastSuccess("Cabin successfully deleted.");
      // Refresh cabins list after deletion
      queryClient.invalidateQueries({ queryKey: queryKeys.cabins.all });
    },
    // Handle deletion errors
    onError: err => {
      const message = err.message || "Failed to delete cabin";
      toastError(message);
    },
  });
}
