export default function Hero() {
    return (
      <section className="py-20 px-6 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find And <br /> Book Your <br /> Perfect Stay
          </h1>
          <p className="text-sm text-gray-300">
            The most seamless and secure way to book unique hotel experiences around the world.
          </p>
          <div className="flex gap-4">
            <button className="bg-orange-400 text-white py-2 px-6 rounded-md">Book Now</button>
            <button className="border border-white py-2 px-6 rounded-md">View Stays</button>
          </div>
        </div>
        <img src="/assets/hero-graphic.png" alt="Hero Graphic" className="w-80 mb-10 md:mb-0" />
      </section>
    );
  }
  