import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import LoginButton from "../features/auth/LoginButton";

function Hero({ screenSize }) {
  useGSAP(() => {
    gsap.to("#img", {
      y: 0,
      scale: 1,
      duration: 3,
      ease: "power2.inOut",
      opacity: 1,
    });
    gsap.to("#hero", {
      delay: 2,
      ease: "power2.inOut",
      opacity: 1,
    });
  }, []);
  return (
    <section className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Navbar screenSize={screenSize} />
      <div
        id="hero"
        className="z-10 flex h-[88%] w-full flex-col items-center justify-center text-center text-2xl font-semibold opacity-0 md:h-[75%] md:text-5xl lg:text-6xl xl:text-7xl"
      >
        <h1 className="w-[26ch]">
          Foreign Exchange Trade Demo with{" "}
          <span className="font-bold text-emerald-700">Realtime</span> currency
        </h1>
        <LoginButton className="mt-20 animate-bounce px-6">
          Try it Now
        </LoginButton>
      </div>
      <img
        id="img"
        src={`${screenSize > 760 ? "/back.jpg" : "/Phoneback.jpg"}`}
        className="absolute h-full w-full scale-150 opacity-80 md:-translate-y-56 md:scale-[2] md:object-cover"
      />
    </section>
  );
}

export default Hero;
