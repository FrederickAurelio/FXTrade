import InputForm from "../components/InputForm";
import { Link } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";

function ForgotPass() {
  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center gap-4 bg-zinc-100">
      <div className="container flex w-fit flex-col items-center p-8">
        <HiOutlineLockClosed size={80} className="text-emerald-700" />
        <p className="text-lg font-bold text-emerald-700">Forgot Password?</p>
        <p className="mb-4 w-72 text-center text-sm">
          Enter your email, and we{"'"}ll send you a link to get back into your
          account.
        </p>
        <form className="flex flex-col items-center gap-1">
          <InputForm type="email" placeholder="Email" />
          <button
            type="submit"
            className="mb-4 mt-2 w-full rounded-xl bg-emerald-700 py-[6px] font-semibold text-zinc-50"
          >
            Send login link
          </button>
        </form>
      </div>

      <div className="container w-80 text-center">
        <Link to="/forex/signup/" className="font-semibold text-emerald-700">
          Back to Login
        </Link>
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

export default ForgotPass;
