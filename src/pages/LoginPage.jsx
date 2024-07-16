import InputForm from "../components/InputForm";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function LoginPage() {
  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center gap-4 bg-zinc-100">
      <div className="container w-fit p-8">
        <Logo textSize="text-3xl" iconSize={40} className="mb-6" />
        <form className="flex flex-col items-center gap-1">
          <InputForm type="text" placeholder="Username or email" />
          <InputForm type="password" placeholder="Password" />
          <button
            type="submit"
            className="mb-4 mt-2 w-full rounded-xl bg-emerald-700 py-[6px] font-semibold text-zinc-50"
          >
            Log in
          </button>
          <Link
            to="/forex/forgot/"
            className="cursor-pointer text-xs md:text-sm"
          >
            Forgot Password?
          </Link>
        </form>
      </div>

      <div className="container w-80 text-center">
        <p className="text-sm">
          Don{"'"}t have an account?{" "}
          <Link to="/forex/signup/" className="font-semibold text-emerald-700">
            Sign up
          </Link>
        </p>
      </div>

      <Link
        to="/forex/"
        className="absolute left-1 top-1 cursor-pointer font-semibold text-emerald-700 hover:scale-105"
      >
        {"<--- Back"}
      </Link>
    </section>
  );
}

export default LoginPage;
