import { LineChart } from "@mui/x-charts/LineChart";
import { format } from "date-fns";
import { useScreenSize } from "../../context/ScreenContext";
import { useSearchParams } from "react-router-dom";
import { fakeLatestCur } from "../../utils/data";
import TimeSeries from "./TimeSeries";
import Modal from "../../components/Modal";
import Sell from "./Sell";
import Buy from "./Buy";
import useCurrency from "./useCurrency";
import Spinner from "../../components/Spinner";
import AV from "leancloud-storage/";
import useData from "../table/useData";

function Chart() {
  const user = AV.User.current();
  const { screenSize } = useScreenSize();
  const [searchParam, setSearchParam] = useSearchParams();
  const cur = searchParam.get("cur");

  const { currency, isPending } = useCurrency();
  const { isPending: isPending2, data: transactionData } = useData(user.id);
  
  //later
  const latestCur = fakeLatestCur;

  const isOwn = transactionData?.transactions.map((t) => t.asset).includes(cur);

  if (!cur)
    return (
      <p className="py-2 text-center text-base font-semibold text-emerald-700 md:text-lg">
        Search a currency to start forex trading
      </p>
    );

  if (isPending || isPending2) return <Spinner />;
  if (currency === undefined)
    return <p className="p-2 text-lg font-semibold">Offline..</p>;

  const dates = Object.entries(currency?.rates).map((a) => new Date(a[0]));
  const rates = Object.entries(currency?.rates).flatMap((a) =>
    Object.values(a[1]),
  );
  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row">
        <p className="px-1 py-1 text-xl font-bold md:text-2xl">
          1 CNY = {latestCur.rates[cur]} {cur}
        </p>
        <TimeSeries searchParam={searchParam} setSearchParam={setSearchParam} />
      </div>

      <LineChart
        xAxis={[
          {
            label: "Date",
            tickInterval: dates,
            data: [...dates, new Date(latestCur.date)],
            scaleType: "time",
            valueFormatter: (date) => format(date, "dd-MM-yy"),
          },
        ]}
        series={[
          {
            data: [...rates, latestCur.rates[cur]],
            label: cur,
            color: `${rates.at(1) <= rates.at(-1) ? "#047857" : "#be123c"}`,
            valueFormatter: (value) => value.toFixed(5),
          },
        ]}
        width={screenSize > 1020 ? (screenSize / 2) * 1.04 : screenSize * 1.04}
        height={400}
      />
      <div className="mt-8 flex justify-center gap-3">
        <Modal>
          <Modal.Open id="sell">
            <button
              disabled={!isOwn || transactionData === undefined}
              className={`${!isOwn || transactionData === undefined ? "cursor-not-allowed bg-zinc-300" : "cursor-pointer bg-rose-700 hover:scale-110"} rounded-lg px-8 py-2 font-semibold text-white duration-200`}
            >
              SELL
            </button>
          </Modal.Open>
          <Modal.Window id="sell">
            <Sell datas={transactionData} latestCur={latestCur} cur={cur} />
          </Modal.Window>

          <Modal.Open id="buy">
            <button
              disabled={transactionData === undefined}
              className={`${transactionData === undefined ? "cursor-not-allowed bg-zinc-300" : "cursor-pointer bg-emerald-700 hover:scale-110"} rounded-lg px-8 py-2 font-semibold text-white duration-200`}
            >
              BUY
            </button>
          </Modal.Open>
          <Modal.Window id="buy">
            <Buy
              isOwn={isOwn}
              datas={transactionData}
              latestCur={latestCur}
              cur={cur}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Chart;
