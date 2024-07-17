import { useState } from "react";
import { formatCurrency, formatNumber } from "../../utils/helpers";

function Sell({ cur, latestCur, datas }) {
  const transaction = datas.transactions.find((t) => t.asset === cur);
  const [sellQuantity, setSellQuantity] = useState(0);
  const sellPrice = sellQuantity / latestCur.rates[cur];

  return (
    <div className="flex w-[22rem] flex-col divide-y-2 divide-rose-700 px-3 py-2 text-center">
      <h1 className="text-xl font-semibold">Sell {transaction.asset}</h1>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Current Quantity:</p>
        <p>{formatNumber(transaction.quantity)}</p>
        <p>Current Price: </p>
        <p>{formatNumber(latestCur.rates[cur])}</p>
        <p>Balance:</p>
        <p>{formatCurrency(datas.balance, "CNY")}</p>
        <p>Sell Quantity:</p>
        <div className="flex">
          <input
            value={sellQuantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value < 0) setSellQuantity(0);
              else if (value > transaction.quantity)
                setSellQuantity(transaction.quantity);
              else setSellQuantity(value);
            }}
            className="w-32 rounded-md border border-zinc-300 pl-3"
            type="number"
          />
          <p>{transaction.asset}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Sell Price:</p>
        <p>{formatCurrency(sellPrice, "CNY")}</p>
        <button className="col-span-2 mt-6 cursor-pointer rounded-lg bg-rose-700 px-6 py-1 font-semibold text-white">
          SELL
        </button>
      </div>
    </div>
  );
}

export default Sell;
