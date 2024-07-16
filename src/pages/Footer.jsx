import LoginButton from "../features/auth/LoginButton";
import Logo from "../components/Logo";

function Footer() {
  return (
    <footer className="relative flex h-[25dvh] flex-col items-center justify-center gap-1 border-t-[3px] border-t-zinc-400 bg-zinc-100 p-10">
      <Logo textSize="text-2xl md:text-3xl" iconSize={42} />
      <LoginButton className="w-fit px-6 py-3">Try it Now</LoginButton>
      <a
        href="https://github.com/FrederickAurelio"
        rel="noreferrer"
        target="_blank"
        className="absolute bottom-1 left-2 text-sm underline md:text-base"
      >
        <div className="flex items-center gap-1">
          <img className="h-6 w-6 rounded-full" src="/profile.jpeg" />
          <p>Developed by: Frederick Aurelio Halim</p>
        </div>
      </a>
    </footer>
  );
}

export default Footer;
