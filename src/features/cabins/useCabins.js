import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { queryKeys } from "../../utils/queryKeys";

export function useCabins() {
  return useQuery({
    queryKey: queryKeys.cabins.all,
    queryFn: getCabins,
  });
}
