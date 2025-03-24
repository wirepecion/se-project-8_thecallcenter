export default function Hero() {
    return (
      <section className="grid grid-cols-12 max-w-[75%] mx-auto gap-x-[15px] pt-36 pb-36 bg-[#000235] ">
        {/* Left content */}
        <div className="col-span-12 md:col-span-6 space-y-6">
          <h1 className="text-8xl text-white md:text-7xl font-Outfit font-bold leading-tight">
            Find And <br /> Book Your <br /> Perfect Stay
          </h1>
          <p className="text-base text-white font-roboto font-medium pt-7">
            The most seamless and secure way to book unique hotel experiences around the world.
          </p>
          <div className="col-span-12 md:col-span-4 flex space-x-4">
            <button className="bg-orange-400 text-white rounded-md w-[200px]">Book Now</button>
            <button className="border text-white border-white py-2 px-6 rounded-md">View Stays</button>
          </div>
        </div>
  
        {/* Right image */}
        <div className="col-span-12 md:col-span-6 flex justify-center">
          <img src="/assets/hero-graphic.png" alt="Hero Graphic" className="w-80" />
        </div>
      </section>
    );
  }
  