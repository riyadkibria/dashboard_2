export default function HeroSection() {
  return (
    <section className="relative text-center px-6 py-28 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 overflow-hidden">
      {/* Floating background blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
      ></div>
      <div
        aria-hidden="true"
        className="absolute top-10 right-10 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"
      ></div>

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
          Crafting <span className="text-indigo-600">Beautiful Web Experiences</span>
        </h1>
        <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed drop-shadow-sm">
          We create blazing-fast, modern websites that captivate, convert, and elevate your brand.
          Whether you&apos;re launching a new product or redefining your digital presence, we&apos;re your full-stack partner every step of the way.
        </p>

        {/* Responsive buttons */}
        <div className="mt-12 flex justify-center gap-6">
          <button className="px-6 md:px-10 py-3 md:py-4 bg-indigo-600 text-white text-base md:text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition shadow-indigo-500/50">
            Get Started
          </button>
          <button className="px-6 md:px-10 py-3 md:py-4 bg-white border-2 border-indigo-600 text-indigo-600 text-base md:text-lg font-semibold rounded-full hover:bg-indigo-50 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
