import Spinner from "../components/Spinner";
import LogoutButton from "../features/auth/LogoutButton";
import Table from "../features/table/Table";
import useData from "../features/table/useData";
import { formatCurrency } from "../utils/helpers";
import AV from "leancloud-storage/";

function TablePage({ setActiveTab }) {
  const user = AV.User.current();
  const { isPending, data } = useData(user.id);

  if (isPending) return <Spinner />;
  if (data?.balance === undefined)
    return <p className="p-2 text-lg font-semibold">Offline..</p>;
  
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-zinc-50 p-3">
      <div className="mb-8 flex items-start justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">
          Balance: {formatCurrency(data?.balance, "CNY")}
        </h1>
        <LogoutButton username={user.attributes.username} />
      </div>
      <Table transactions={data?.transactions} setActiveTab={setActiveTab} />
    </div>
  );
}

export default TablePage;
