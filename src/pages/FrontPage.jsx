import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import { useScreenSize } from "../context/ScreenContext";

function FrontPage() {
  const { screenSize } = useScreenSize();
  return (
    <>
      <Hero screenSize={screenSize} />
      <About />
      <Features screenSize={screenSize} />
      <Testimonial />
      <Footer />
    </>
  );
}

export default FrontPage;
