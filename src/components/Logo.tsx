import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-3 no-underline">
      <div className="relative">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-300"
        >
          <path
            d="M13 28V12L27 28V12" 
            stroke="url(#necil_grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <defs>
            <linearGradient
              id="necil_grad"
              x1="13"
              y1="12"
              x2="27"
              y2="28"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#0891B2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mt-1 leading-none group-hover:text-gray-500 transition-colors">
          BLOG
        </span>
      </div>
    </Link>
  );
};