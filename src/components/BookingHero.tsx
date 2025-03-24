import Image from "next/image";

export default function BookingHero() {
  return (
    <section className="w-[1065px] mx-auto grid grid-cols-12 gap-[15px] pt-36 pb-20 text-white">
      {/* Left Content */}
      <div className="col-span-12 md:col-span-6 space-y-6">
        <h1 className="text-6xl md:text-7xl font-Outfit font-bold leading-tight">
          Booking <br /> Your Stay
        </h1>
        <p className="text-base font-roboto font-medium pt-4">
          The most seamless and secure way to book unique hotel experiences around the world.
        </p>
      </div>

      {/* Right Image */}
      <div className="col-span-12 md:col-span-6 flex justify-center items-center">
        <Image
          src="/assets/room.png"
          alt="Room Graphic"
          width={360}
          height={360}
          className="w-[300px] md:w-[360px] h-auto"
        />
      </div>
    </section>
  );
}