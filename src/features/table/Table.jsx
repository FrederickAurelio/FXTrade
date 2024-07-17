import { useSearchParams } from "react-router-dom";
import { fakeLatestCur } from "../../utils/data";
import { formatCurrency, formatNumber } from "../../utils/helpers";
import TotalAsset from "./TotalAsset";

function Table({ setActiveTab, transactions }) {
  const [searchParam, setSearchParam] = useSearchParams();
  // later
  const latestCur = fakeLatestCur;

  return (
    <div className="flex w-full flex-col divide-y divide-zinc-200 overflow-x-auto xl:items-center xl:overflow-x-hidden">
      <div className="text grid w-[42rem] grid-cols-6 font-semibold">
        <p>Asset</p>
        <p>Quantity</p>
        <p>Avg Buy Price</p>
        <p>Current Price</p>
        <p>Current Value</p>
        <p className="text-end">Change(%)</p>
      </div>
      {transactions.map((cell, i) => (
        <div
          onClick={() => {
            searchParam.set("cur", cell.asset);
            setSearchParam(searchParam);
            setActiveTab("chart");
          }}
          key={i}
          className="grid w-[42rem] cursor-pointer grid-cols-6 text-start hover:bg-zinc-100"
        >
          <p className="py-1">{cell.asset}</p>
          <p className="py-1">{formatNumber(cell.quantity)}</p>
          <p className="py-1">{formatNumber(cell.avgBuyPrice)}</p>
          <p className="py-1">
            {formatNumber(latestCur.rates[cell.asset].toFixed(5))}
          </p>
          <p className="py-1">
            {formatCurrency(
              cell.quantity / latestCur.rates[cell.asset],
              "CNY",
            )}
          </p>
          <p
            className={`${
              ((cell.avgBuyPrice - latestCur.rates[cell.asset]) /
                latestCur.rates[cell.asset]) *
                100 >=
              0
                ? "text-emerald-700"
                : "text-rose-700"
            } py-1 text-end`}
          >
            {formatNumber(
              (
                ((cell.avgBuyPrice - latestCur.rates[cell.asset]) /
                  latestCur.rates[cell.asset]) *
                100
              ).toFixed(2),
            )}
            %
          </p>
        </div>
      ))}
      <TotalAsset latestCur={latestCur} transactions={transactions}/>
    </div>
  );
}

export default Table;
