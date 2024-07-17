import { format, subDays } from "date-fns";
import AV from "leancloud-storage/";
import toast from "react-hot-toast";

export async function getData(userId) {
  try {
    const query = new AV.Query("transactions");
    query.equalTo("user", {
      __type: "Pointer",
      className: "_User",
      objectId: userId,
    });
    const transactionsRes = await query.find();
    const transactions = transactionsRes.map((list) => (
      list.attributes
    ))
    const query2 = new AV.Query("userBalance");
    query2.equalTo("user", {
      __type: "Pointer",
      className: "_User",
      objectId: userId,
    });
    const balanceRes = await query2.find();
    const { balance } = balanceRes[0].attributes;
    const response = {
      balance,
      transactions
    }
    return response;
  } catch (error) {
    toast.error("Failed to fetch data");
  }
}

export async function getCurrency(cur, time) {
  try {
    const day = {
      "1m" : 30,
      "6m" : 183,
      "1y" : 366,
      "3y" : 1096,
    }
    const date = format(subDays(new Date(), day[time]), "yyyy-MM-dd")
    const res = await fetch(`https://api.frankfurter.app/${date}..?to=${cur}&base=CNY`);
    const data = res.json();
    return data;
  } catch (err) {
    toast.error("Failed to fetch data");
  }
}