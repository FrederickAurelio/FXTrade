import { useEffect, useState } from "react";
import ChartPage from "./ChartPage";
import TablePage from "./TablePage";
import { useScreenSize } from "../context/ScreenContext";
import { HiMiniChartBar, HiMiniTableCells } from "react-icons/hi2";
import AV from "leancloud-storage/";
import { useNavigate } from "react-router-dom";

function AppPage() {
  const [activeTab, setActiveTab] = useState("chart");
  const { screenSize } = useScreenSize();

  const user = AV.User.current();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/forex/login/");
  }, [navigate, user]);


  return (
    <>
      <main className="grid h-[93dvh] w-full bg-zinc-100 lg:h-dvh lg:grid-cols-2 lg:divide-x-2 lg:divide-zinc-200">
        {screenSize > 1020 && (
          <>
            <ChartPage/>
            <TablePage setActiveTab={setActiveTab} />
          </>
        )}
        {screenSize <= 1020 ? (
          activeTab === "chart" ? (
            <ChartPage/>
          ) : (
            <TablePage setActiveTab={setActiveTab} />
          )
        ) : (
          ""
        )}
      </main>
      {screenSize <= 1020 && (
        <div className="flex h-[7dvh] border-t border-emerald-700 bg-zinc-50 text-emerald-700">
          <div
            onClick={() => setActiveTab("chart")}
            className={`flex h-full w-full items-center justify-center border-r border-emerald-700 ${activeTab === "chart" ? "bg-emerald-100" : "text-zinc-300"}`}
          >
            <HiMiniChartBar size={32} />
          </div>
          <div
            onClick={() => setActiveTab("table")}
            className={`flex h-full w-full items-center justify-center ${activeTab === "table" ? "bg-emerald-100" : "text-zinc-300"}`}
          >
            <HiMiniTableCells size={32} />
          </div>
        </div>
      )}
    </>
  );
}

export default AppPage;
