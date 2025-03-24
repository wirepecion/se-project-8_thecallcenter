export default function AboutUs() {
    return (
      <section className="grid grid-cols-12 max-w-[75%] mx-auto gap-x-[15px] py-20 px-4 text-white bg-[#000235]">
        {/* Heading */}
        <div className="col-span-12 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-roboto font-bold">About Us</h2>
          <p className="text-sm text-gray-400 font-outfit mt-2">
            Four Words, Countless Possibilities. That’s How The CEDT Team Builds Your Perfect Stay.
          </p>
        </div>
  
        {/* Keywords Section */}
        <div className="col-span-12 flex justify-around text-center font-roboto text-xl font-semibold mb-10">
          <div>Code</div>
          <div>Explore</div>
          <div>Design</div>
          <div>Travel</div>
        </div>
  
        {/* Team Members */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-span-12 md:col-span-4 mb-8">
            <div className="bg-[#1b1b45] p-6 rounded-lg text-center">
              <img
                src={`/assets/avatar-${i}.jpg`}
                alt={`Siravut ${i}`}
                className="mx-auto rounded-full w-20 h-20 mb-4 object-cover"
              />
              <h4 className="font-roboto font-bold text-lg">Siravut</h4>
              <p className="text-sm text-gray-400 font-outfit mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper scelerisque.
              </p>
              <span className="inline-block mt-4 text-xs font-bold text-orange-400">UX/UI</span>
            </div>
          </div>
        ))}
      </section>
    );
  }
  