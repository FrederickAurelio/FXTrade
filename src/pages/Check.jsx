import AV from "leancloud-storage/";
import { useNavigate } from "react-router-dom";
function Check({ children }) {
  const user = AV.User.current();
  const navigate = useNavigate();
  if (!user) {
    navigate("/forex/login/");
    return null;
  }
  return <>{children}</>;
}

export default Check;
