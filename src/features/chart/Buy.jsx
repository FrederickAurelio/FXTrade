import { useState } from "react";
import { formatCurrency, formatNumber } from "../../utils/helpers";

function Buy({ cur, latestCur, datas, isOwn }) {
  const transaction = isOwn
    ? datas.transactions.find((t) => t.asset === cur)
    : { asset: cur, quantity: 0 };
  const [buyQuantity, setBuyQuantity] = useState(0);
  const totalPrice = buyQuantity / latestCur.rates[cur];
  const balance = datas.balance;

  return (
    <div className="flex w-[22rem] flex-col divide-y-2 divide-emerald-700 px-3 py-2 text-center">
      <h1 className="text-xl font-semibold">Buy {transaction.asset}</h1>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Current Quantity:</p>
        <p>{formatNumber(transaction.quantity)}</p>
        <p>Current Price: </p>
        <p>{formatNumber(latestCur.rates[cur])}</p>
        <p>Balance:</p>
        <p>{formatCurrency(balance, "CNY")}</p>
        <p>Buy Quantity:</p>
        <div className="flex">
          <input
            value={buyQuantity}
            onChange={(e) => {
              const value = e.target.value;
              const price = value / latestCur.rates[cur];
              if (value < 0) setBuyQuantity(0);
              else if (price > balance)
                setBuyQuantity(Math.trunc(balance * latestCur.rates[cur]));
              else setBuyQuantity(value);
            }}
            className="w-32 rounded-md border border-zinc-300 pl-3"
            type="number"
          />
          <p>{transaction.asset}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Total Price:</p>
        <p>{formatCurrency(totalPrice, "CNY")}</p>
        <button className="col-span-2 mt-6 cursor-pointer rounded-lg bg-emerald-700 px-6 py-1 font-semibold text-white">
          BUY
        </button>
      </div>
    </div>
  );
}

export default Buy;
