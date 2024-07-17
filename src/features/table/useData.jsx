import { useQuery } from "@tanstack/react-query";
import { getData } from "../../api/apiData";

export default function useData(userId){
  const { isPending, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: ()=>getData(userId),
  })
  return {isPending, data, error}
}