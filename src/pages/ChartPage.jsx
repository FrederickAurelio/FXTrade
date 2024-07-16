import Chart from "../features/chart/Chart";
import SearchCurrency from "../features/chart/SearchCurrency";

function ChartPage() {
  return (
    <main className="flex h-full flex-col overflow-hidden p-3">
      <SearchCurrency />
      <Chart />
    </main>
  );
}

export default ChartPage;
