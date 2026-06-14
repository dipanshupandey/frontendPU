import React from "react";

/**
 * Loading placeholder that mirrors the FeedCard layout.
 * Uses a soft, slow "sweep" highlight (Apple/Nike/Hinge style) instead of
 * a harsh blink — driven by the keyframes injected below.
 */
const Bone = ({ className = "" }) => (
  <div className={`shimmer-bone rounded-md ${className}`} />
);

const FeedShimmer = () => {
  return (
    <div className="w-[350px] h-[560px] bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col animate-[shimmerFade_0.6s_ease-out]">
      {/* Inline styles for the shimmer sweep + entrance fade */}
      <style>{`
        @keyframes shimmerSweep {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes shimmerFade {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .shimmer-bone {
          background-color: #ececef;
          background-image: linear-gradient(
            100deg,
            rgba(236, 236, 239, 0) 30%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(236, 236, 239, 0) 70%
          );
          background-size: 200% 100%;
          background-repeat: no-repeat;
          animation: shimmerSweep 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer-bone { animation: none; }
        }
      `}</style>

      {/* Image */}
      <div className="h-full w-full p-2">
        <Bone className="w-full h-full rounded-2xl" />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Name */}
          <Bone className="h-6 w-2/3" />

          {/* About */}
          <div className="space-y-2">
            <Bone className="h-3 w-16" />
            <Bone className="h-3 w-full" />
            <Bone className="h-3 w-5/6" />
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Bone className="h-3 w-16" />
            <Bone className="h-3 w-3/4" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center gap-52 pt-3">
          <Bone className="h-8 w-8 rounded-full" />
          <Bone className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default FeedShimmer;
