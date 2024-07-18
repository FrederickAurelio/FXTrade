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

export async function getLatestCurrency() {
  try {
    const apikey = import.meta.env.VITE_REACT_APP_CUR_KEY;
    const res = await fetch(`https://api.currencybeacon.com/v1/latest?api_key=${apikey}&base=CNY`);
    const data = res.json();
    return data;
  } catch (err) {
    toast.error("Failed to fetch chart data");
  }
}

async function findObjectId(tablename, userId, asset) {
  const query = new AV.Query(tablename);
  query.equalTo("user", {
    __type: "Pointer",
    className: "_User",
    objectId: userId,
  });
  if (asset) query.equalTo("asset", asset);
  const res = await query.find();
  return res[0].id;
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

    const objId = await findObjectId("userBalance", user.id);
    const userBalance = AV.Object.createWithoutData("userBalance", objId)
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

    const t_objId = await findObjectId("transactions", user.id, asset);
    const transactions = AV.Object.createWithoutData("transactions", t_objId);
    transactions.set("avgBuyPrice", avgBuyPrice);
    transactions.set("quantity", quantity);

    const b_objId = await findObjectId("userBalance", user.id);
    const userBalance = AV.Object.createWithoutData("userBalance", b_objId)
    userBalance.set("balance", Number(balance));

    await userBalance.save();
    await transactions.save();
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteTransaction({ balance, asset }) {
  try {
    const user = AV.User.current();

    const t_objId = await findObjectId("transactions", user.id, asset);
    const transactions = AV.Object.createWithoutData("transactions", t_objId);
    transactions.destroy();

    const b_objId = await findObjectId("userBalance", user.id);
    const userBalance = AV.Object.createWithoutData("userBalance", b_objId)
    userBalance.set("balance", Number(balance));

    await userBalance.save();
  } catch (error) {
    throw new Error(error.message)
  }
}



