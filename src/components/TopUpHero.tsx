export default function TopUpHero() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-16">
      <img
        src="/assets/hero-topup.png"
        alt="Top-Up Hero"
        className="w-[324px] h-[224px]"
      />

      <div className="text-center md:text-left">
        <p className="text-7xl md:text-7xl font-outfit font-bold leading-tight text-black">
          Ads Token Top-Up
        </p>
        <p className="text-lg font-roboto pt-7 font-medium text-black">
          Get more visibility.<br />
          Buy Ads Tokens to increase your ad placements.
        </p>
      </div>
    </div>
  );
}
