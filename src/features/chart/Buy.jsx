import { useState } from "react";
import { fakeTableData } from "../../utils/data";
import { formatCurrency, formatNumber } from "../../utils/helpers";

function Buy() {
  const data = fakeTableData[0];
  const [buyQuantity, setBuyQuantity] = useState(0);
  const totalPrice = buyQuantity / data.currentPrice;
  const balance = 39000;

  return (
    <div className="flex w-[22rem] flex-col divide-y-2 divide-emerald-700 px-3 py-2 text-center">
      <h1 className="text-xl font-semibold">Buy {data.asset}</h1>
      <div className="grid grid-cols-2 px-2 text-start text-lg">
        <p>Current Quantity:</p>
        <p>{formatNumber(data.quantity)}</p>
        <p>Current Price: </p>
        <p>{formatNumber(data.currentPrice)}</p>
        <p>Balance:</p>
        <p>{formatCurrency(balance, "CNY")}</p>
        <p>Buy Quantity:</p>
        <div className="flex">
          <input
            value={buyQuantity}
            onChange={(e) => {
              const value = e.target.value;
              const price = value / data.currentPrice;
              if (value < 0) setBuyQuantity(0);
              else if (price > balance)
                setBuyQuantity(Math.trunc(balance * data.currentPrice));
              else setBuyQuantity(value);
            }}
            className="w-32 rounded-md border border-zinc-300 pl-3"
            type="number"
          />
          <p>{data.asset}</p>
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
