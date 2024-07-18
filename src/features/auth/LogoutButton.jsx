import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AV from "leancloud-storage/";
import toast from "react-hot-toast";

function LogoutButton({ username }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleClick() {
    queryClient.clear();
    AV.User.logOut();
    navigate("/forex/login/");
    toast("Logout successfully")
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm">{username}</span>
      <button onClick={handleClick} className="text-rose-700 hover:scale-110">
        <HiOutlineLogout size={20} />
      </button>
    </div>
  );
}

export default LogoutButton;
