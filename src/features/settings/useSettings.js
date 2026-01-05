import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { queryKeys } from "../../utils/queryKeys";

export function useSettings() {
  return useQuery({
    queryFn: getSettings,
    queryKey: queryKeys.settings.all,
  });
}
