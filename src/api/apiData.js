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
    const transactionsRes = await query.find() || [];
    const transactions = transactionsRes.map((list) => (
      list.attributes
    )) || [];
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
    toast.error(`Failed to fetch transactions data\n${error.message}`);
  }
}

export async function getCurrency(cur, time) {
  if (!cur) return null;
  try {
    const day = {
      "1m": 30,
      "6m": 183,
      "1y": 366,
      "3y": 1096,
    }
    const date = format(subDays(new Date(), day[time]), "yyyy-MM-dd")
    const res = await fetch(`https://api.frankfurter.app/${date}..?to=${cur}&base=CNY`);
    const data = res.json();
    return data;
  } catch (err) {
    toast.error("Failed to fetch chart data");
  }
}

export async function createTransaction({ asset, avgBuyPrice, quantity, balance }) {
  try {
    const user = AV.User.current();
    const Transactions = AV.Object.extend("transactions");
    const transactions = new Transactions();
    transactions.set("asset", asset);
    transactions.set("avgBuyPrice", Number(avgBuyPrice));
    transactions.set("quantity", Number(quantity));
    transactions.set("user", user);

    const query2 = new AV.Query("userBalance");
    query2.equalTo("user", {
      __type: "Pointer",
      className: "_User",
      objectId: user.id,
    });
    const balanceRes = await query2.find();

    const userBalance = AV.Object.createWithoutData("userBalance", balanceRes[0].id)
    userBalance.set("balance", Number(balance));

    const acl = new AV.ACL();
    acl.setReadAccess(user, true);
    acl.setWriteAccess(user, true)

    transactions.setACL(acl);
    await userBalance.save();
    await transactions.save();
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateTransaction({ asset, avgBuyPrice, quantity, balance }) {
  try {
    const user = AV.User.current();

    const query = new AV.Query("transactions");
    query.equalTo("user", {
      __type: "Pointer",
      className: "_User",
      objectId: user.id,
    });
    query.equalTo("asset", asset);
    const transactionsRes = await query.find();
    const transactions = AV.Object.createWithoutData("transactions", transactionsRes[0].id);
    transactions.set("avgBuyPrice", avgBuyPrice);
    transactions.set("quantity", quantity);

    const query2 = new AV.Query("userBalance");
    query2.equalTo("user", {
      __type: "Pointer",
      className: "_User",
      objectId: user.id,
    });
    const balanceRes = await query2.find();
    const userBalance = AV.Object.createWithoutData("userBalance", balanceRes[0].id)
    userBalance.set("balance", Number(balance));

    await userBalance.save();
    await transactions.save();
  } catch (err) {
    throw new Error(err);
  }
}