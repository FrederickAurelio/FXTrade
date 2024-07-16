import { LineChart } from "@mui/x-charts/LineChart";
import { format } from "date-fns";
import { useScreenSize } from "../../context/ScreenContext";
import { useSearchParams } from "react-router-dom";
import { fakeData } from "../../utils/data";
import TimeSeries from "./TimeSeries";
import Modal from "../../components/Modal";
import Sell from "./Sell";
import Buy from "./Buy";

function Chart() {
  const { screenSize } = useScreenSize();
  const [searchParam, setSearchParam] = useSearchParams();
  const cur = searchParam.get("cur");
  if (!cur)
    return (
      <p className="py-2 text-center text-base font-semibold text-emerald-700 md:text-lg">
        Search a currency to start forex trading
      </p>
    );

  const dates = Object.entries(fakeData.rates).map((a) => new Date(a[0]));
  const rates = Object.entries(fakeData.rates).flatMap((a) =>
    Object.values(a[1]),
  );

  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row">
        <p className="px-1 py-1 text-xl font-bold md:text-2xl">
          1 CNY = {rates.at(-1)} {cur}
        </p>
        <TimeSeries searchParam={searchParam} setSearchParam={setSearchParam} />
      </div>

      <LineChart
        xAxis={[
          {
            label: "Date",
            tickInterval: dates,
            data: dates,
            scaleType: "time",
            valueFormatter: (date) => format(date, "dd-MM-yy"),
          },
        ]}
        series={[
          {
            data: rates,
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
            <button className="cursor-pointer rounded-lg bg-rose-700 px-8 py-2 font-semibold text-white duration-200 hover:scale-110">
              SELL
            </button>
          </Modal.Open>
          <Modal.Window id="sell">
            <Sell />
          </Modal.Window>

          <Modal.Open id="buy">
            <button className="cursor-pointer rounded-lg bg-emerald-700 px-8 py-2 font-semibold text-white duration-200 hover:scale-110">
              BUY
            </button>
          </Modal.Open>
          <Modal.Window id="buy">
            <Buy />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Chart;
