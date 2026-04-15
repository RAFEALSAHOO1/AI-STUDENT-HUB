import { Link } from "react-router-dom";
import Image from "/brand/logo.svg";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all duration-300">
          <img
            src={Image}
            alt="AI Student Hub"
            width={40}
            height={40}
            className="object-contain drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]"
            loading="eager"
          />
          <span className="text-white font-semibold text-lg tracking-wide">
            AI Student Hub
          </span>
        </div>
      </div>
    </header>
  );
}