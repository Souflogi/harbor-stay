import { toast } from "react-toastify";

/**
 * Custom hook for displaying toast notifications
 * Provides toast methods for success, error, info, warning, and loading states
 * @returns {Object} Toast notification methods
 */
export function useToast() {
  return {
    success: message => toast.success(message),
    error: message => toast.error(message),
    info: message => toast.info(message),
    warning: message => toast.warning(message),
    loading: message => toast.loading(message),
  };
}
