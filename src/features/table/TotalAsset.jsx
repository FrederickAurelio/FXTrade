import { fakeTableData } from "../../utils/data";
import { formatCurrency, formatNumber } from "../../utils/helpers";

function TotalAsset() {
  const buyValue = fakeTableData
    .map((data) => data.quantity / data.buyPrice)
    .reduce((acc, v) => (acc += v), 0);

  const curValue = fakeTableData
    .map((data) => data.quantity / data.currentPrice)
    .reduce((acc, v) => (acc += v), 0);

  return (
    <div className="grid w-[42rem] grid-cols-6 font-semibold">
      <p className="py-1">Total:</p>
      <p className="col-start-5 py-1">{formatCurrency(curValue, "CNY")}</p>
      <p
        className={`${
          ((curValue - buyValue) / buyValue) * 100 >= 0
            ? "text-emerald-700"
            : "text-rose-700"
        } col-start-6 py-1 text-end`}
      >
        {formatNumber((((curValue - buyValue) / buyValue) * 100).toFixed(2))}%
      </p>
    </div>
  );
}

export default TotalAsset;
