import { Link } from "react-router-dom";

function LoginButton({ children, className }) {
  return (
    <Link to="/forex/login/" className={`my-1 rounded-full bg-emerald-700 px-4 py-2 font-semibold text-zinc-50 duration-200 hover:scale-105 text-base ${className}`}>
      {children}
    </Link>
  );
}

export default LoginButton;
