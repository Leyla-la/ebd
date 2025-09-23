"use client";

export const Footer = () => {
  return (
  <footer className="border-t py-3 relative overflow-hidden">
      <div className="w-full h-5 flex items-center overflow-hidden relative">
        <div className="marquee-track w-full absolute left-0 top-0 h-full flex items-center">
          <span className="marquee-text text-green-700/80 text-sm font-semibold px-4">
            &copy; 2025 EBD. All rights reserved.
          </span>
          <span className="marquee-text text-green-700/80 text-sm font-semibold px-4">
            &copy; 2025 EBD. All rights reserved.
          </span>
        </div>
      </div>
      <style jsx>{`
        .marquee-track {
          width: 200%;
          animation: marquee 32s linear infinite;
        }
        .marquee-text {
          min-width: 100vw;
          display: inline-block;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
};
