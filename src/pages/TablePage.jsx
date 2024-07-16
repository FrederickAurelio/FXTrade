import LogoutButton from "../features/auth/LogoutButton";
import Table from "../features/table/Table";
import { formatCurrency } from "../utils/helpers";

function TablePage({ setActiveTab }) {
  const balance = 39000;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-zinc-50 p-3">
      <div className="mb-8 flex items-start justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">
          Balance: {formatCurrency(balance, "CNY")}
        </h1>
        <LogoutButton />
      </div>
      <Table setActiveTab={setActiveTab} />
    </div>
  );
}

export default TablePage;
