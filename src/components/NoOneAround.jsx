import React from "react";
import noOneAround from "../assets/NoOneAround.png";
import logo from "../assets/logo.png";
/**
 * Empty state shown when every available profile has been visited.
 * Calm, premium feel (Apple / Nike) — soft entrance, gentle floating
 * artwork, and a single clear action.
 */
const NoOneAround = ({ onRefresh }) => {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-6">
      <style>{`
        @keyframes noneRise {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes noneFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes noneGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .none-float, .none-glow { animation: none !important; }
        }
      `}</style>

      <div
        className="flex flex-col items-center text-center max-w-sm"
        style={{ animation: "noneRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both" }}
      >
        {/* Artwork with soft glow + float */}
        <div className="relative mb-8">
          <div
            className="none-glow absolute inset-0 m-auto h-44 w-44 rounded-full bg-gradient-to-tr from-rose-200 to-indigo-200 blur-3xl"
            style={{ animation: "noneGlow 5s ease-in-out infinite" }}
          />
          <img
            src={logo}
            alt="No one around"
            className="none-float relative w-56 h-56 object-contain"
            style={{ animation: "noneFloat 6s ease-in-out infinite" }}
          />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          You're all caught up
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
          There's no one new around right now. Check back soon — fresh profiles
          show up throughout the day.
        </p>

        <button
          onClick={onRefresh}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-black hover:shadow-md active:scale-95"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default NoOneAround;