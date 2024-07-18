import { useQuery } from "@tanstack/react-query";
import { getLatestCurrency } from "../../api/apiData";

export default function useLatestCurrency() {
  const {
    isPending,
    data: latestCur,
    error,
  } = useQuery({
    queryKey: ["latest"],
    queryFn: () => getLatestCurrency(),
    refetchInterval: 60000,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { isPending, latestCur, error };
}
