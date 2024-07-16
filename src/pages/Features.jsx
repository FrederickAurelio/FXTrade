function Features({ screenSize }) {
  return (
    <section
      id="features"
      className="flex h-[200dvh] w-full flex-col overflow-hidden bg-zinc-100 px-6 py-5 md:h-dvh md:py-10 xl:px-36"
    >
      {screenSize < 760 && (
        <h1 className="py-5 text-center text-xl font-bold">Features</h1>
      )}
      <div className="grid h-full w-full grid-rows-12 gap-6 md:grid-cols-3 md:grid-rows-8">
        {screenSize > 760 && (
          <h1 className="flex items-end justify-center text-xl font-bold md:col-start-1 md:row-start-1 md:row-end-1 md:text-3xl">
            Features
          </h1>
        )}
        <div className="feature-container row-start-1 row-end-5 md:col-start-1 md:row-start-2 md:row-end-8">
          <img className="w-[80%] px-3 pb-2" src="/features1.png" />
          <div className="px-3 text-justify">
            <h2 className="mb-1 text-xl font-semibold">
              Trade Anywhere, Anytime
            </h2>
            <p className="text-sm md:text-base">
              Our platform is designed to work seamlessly on both mobile and
              desktop devices. Whether you{"'"}re at home or on the go, you can
              access the app and manage your trades with ease.
            </p>
          </div>
        </div>
        <div className="feature-container row-start-5 row-end-8 md:col-start-2 md:row-start-1 md:row-end-6">
          <img className="w-1/2 px-2 mb-2" src="/features2.png" />
          <div className="px-3 text-justify">
            <h2 className="mb-2 text-xl font-semibold">Navigate with Ease</h2>
            <p className="text-sm md:text-base">
              Experience a seamless and intuitive user interface designed to
              make your trading activities simple and efficient. Whether you are
              a beginner or an experienced trader, our app provides a
              user-friendly experience that caters to your needs.
            </p>
          </div>
        </div>
        <div className="feature-container row-start-8 row-end-10 md:col-start-2 md:row-start-6 md:row-end-9">
          <img className="w-[60%] px-2 pb-2" src="/features5.png" />
          <div className="px-2 text-justify">
            <h2 className="mb-1 text-xl font-semibold">
              Learn to Trade with No Risk
            </h2>
            <p className="text-sm md:text-base">
              Our app uses fake money, allowing you to learn and hone your
              trading skills without the fear of losing real money. Perfect for
              beginners and those looking to improve their strategies.
            </p>
          </div>
        </div>
        <div className="feature-container row-start-10 row-end-13 md:col-start-3 md:row-start-3 md:row-end-7">
          <img
            className="w-[50%] px-3 pb-4 md:w-[40%] md:pb-2"
            src="/features.png"
          />
          <div className="px-3 text-justify">
            <h2 className="mb-1 text-xl font-semibold">
              Realtime Exchange Currency
            </h2>
            <p className="text-sm md:text-base">
              Our app provides real-time updates on currency exchange rates,
              ensuring you have the latest data at your fingertips. Make
              informed trading decisions with accurate and timely information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
