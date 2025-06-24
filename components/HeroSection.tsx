export default function HeroSection() {
  return (
    <section className="relative text-center px-6 py-24 bg-gradient-to-r from-indigo-100 via-white to-indigo-100 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Crafting Beautiful <span className="text-indigo-600">Web Experiences</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 md:text-xl">
          We build blazing-fast, modern websites that engage, convert, and grow your business.
          Whether you're launching a product or revamping your brand, we’re your full-stack partner.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white border border-gray-300 text-gray-800 text-lg font-semibold rounded-full hover:border-indigo-400 hover:text-indigo-600 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Optional: decorative background pattern or blob */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at center, #6366f1 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>
    </section>
  );
}
