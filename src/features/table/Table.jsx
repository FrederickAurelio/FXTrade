import { useSearchParams } from "react-router-dom";
import { fakeTableData } from "../../utils/data";
import { formatCurrency, formatNumber } from "../../utils/helpers";
import TotalAsset from "./TotalAsset";

function Table({ setActiveTab }) {
  const [searchParam, setSearchParam] = useSearchParams();

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
      {fakeTableData.map((cell, i) => (
        <div
          onClick={() => {
            searchParam.set("cur", cell.asset);
            setSearchParam(searchParam);
            setActiveTab("chart");
          }}
          key={i}
          className="text-start grid w-[42rem] cursor-pointer grid-cols-6 hover:bg-zinc-100"
        >
          <p className="py-1">{cell.asset}</p>
          <p className="py-1">{formatNumber(cell.quantity)}</p>
          <p className="py-1">{formatNumber(cell.buyPrice)}</p>
          <p className="py-1">{formatNumber(cell.currentPrice)}</p>
          <p className="py-1">
            {formatCurrency(cell.quantity / cell.currentPrice, "CNY")}
          </p>
          <p
            className={`${
              ((cell.buyPrice - cell.currentPrice) / cell.currentPrice) * 100 >=
              0
                ? "text-emerald-700"
                : "text-rose-700"
            } py-1 text-end`}
          >
            {formatNumber(
              (
                ((cell.buyPrice - cell.currentPrice) / cell.currentPrice) *
                100
              ).toFixed(2),
            )}
            %
          </p>
        </div>
      ))}
      <TotalAsset />
    </div>
  );
}

export default Table;
