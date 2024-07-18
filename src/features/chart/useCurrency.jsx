import { useQuery } from "@tanstack/react-query";
import { getCurrency } from "../../api/apiData";
import { useSearchParams } from "react-router-dom";

export default function useCurrency() {
  const [searchParam] = useSearchParams();
  const time = searchParam.get("time") || "1m";
  const cur = searchParam.get("cur");

  const {
    isPending,
    data: currency,
    error,
  } = useQuery({
    queryKey: ["cur", cur, time],
    queryFn: () => getCurrency(cur, time),
  });
  return { isPending, currency, error };
}
