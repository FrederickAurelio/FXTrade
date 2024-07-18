import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


function About() {
  const img = useRef(null);
  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: img.current,
        start: "bottom bottom",
      },
    });
    timeline.to("#h", {
      duration: 1,
      opacity: 1,
      stagger: 0.2,
      y: 0,
      ease: "power2.inOut",
    });
    timeline.to("#p", {
      delay: -0.8,
      duration: 1,
      opacity: 1,
      stagger: 0.2,
      y: 0,
      ease: "power2.inOut",
    });
  });

  return (
    <section id="why" className="flex w-full flex-col overflow-hidden">
      <div className="h-dvh w-full px-6 py-5 md:px-10 lg:px-20">
        <h1 className="text-xl font-bold md:text-3xl lg:mb-4 xl:mb-16">
          Why Us
        </h1>
        <div className="grid h-full w-full grid-rows-4 px-2 xl:px-28">
          <img
            className="row-span-1 h-full w-full object-cover md:row-span-2"
            src="/forex/about2.png"
            ref={img}
          />
          <div className="row-span-3 mt-4 flex flex-col gap-5 text-justify md:row-span-2 md:flex-row lg:px-6">
            <div className="md:flex-1">
              <h2 id="h" className="translate-y-10 text-xl font-bold opacity-0">
                Trade Forex with a{" "}
                <span className="font-bold text-emerald-700">Minimalist</span>{" "}
                and Fast Platform
              </h2>
              <p id="p" className="translate-y-10 opacity-0">
                Our platform is designed with simplicity and speed in mind.
                Enjoy a clean, clutter-free interface that lets you focus on
                what matters most—your trades. Experience lightning-fast
                performance, ensuring you never miss an opportunity in the
                fast-paced forex market.
              </p>
            </div>
            <div className="md:flex-1">
              <h2 id="h" className="translate-y-10 text-xl font-bold opacity-0">
                Effortless Trading with Our{" "}
                <span className="font-bold text-emerald-700">Easy-to-Use</span>{" "}
                App
              </h2>
              <p id="p" className="translate-y-10 opacity-0">
                Trading forex has never been easier. Our app is built to provide
                an intuitive and seamless user experience, making it accessible
                for both beginners and experienced traders. With user-friendly
                navigation and straightforward tools, you can manage your trades
                effortlessly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
