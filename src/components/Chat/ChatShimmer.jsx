import React from "react";

/**
 * Loading placeholder for the chat window.
 * Mirrors the message-list layout — alternating left/right bubbles —
 * with a soft, slow "sweep" highlight (Apple/Hinge style), not a harsh blink.
 *
 * Not wired anywhere — render it while messages are being fetched.
 */
const Bone = ({ className = "" }) => (
  <div className={`chat-shimmer-bone ${className}`} />
);

const ChatShimmer = () => {
  // widths give the bubbles a natural, varied rhythm
  const rows = [
    { side: "start", w: "w-40" },
    { side: "end", w: "w-28" },
    { side: "start", w: "w-56" },
    { side: "end", w: "w-44" },
    { side: "start", w: "w-32" },
    { side: "end", w: "w-52" },
    { side: "start", w: "w-48" },
     { side: "start", w: "w-56" },
    { side: "end", w: "w-44" },
    { side: "start", w: "w-32" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      <style>{`
        @keyframes chatShimmerSweep {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .chat-shimmer-bone {
          border-radius: 9999px;
          background-color: #ececef;
          background-image: linear-gradient(
            100deg,
            rgba(236, 236, 239, 0) 30%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(236, 236, 239, 0) 70%
          );
          background-size: 200% 100%;
          background-repeat: no-repeat;
          animation: chatShimmerSweep 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-shimmer-bone { animation: none; }
        }
      `}</style>

      {/* Header */}
      {/* <div className="shrink-0 flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <Bone className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Bone className="h-3.5 w-32 rounded-md" />
          <Bone className="h-2.5 w-16 rounded-md" />
        </div>
      </div> */}

      {/* Messages */}
      <div className="px-6 py-4 overflow-hidden flex-1 flex flex-col gap-4">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex ${row.side === "end" ? "justify-end" : "justify-start"}`}
          >
            <Bone className={`h-10 ${row.w} rounded-2xl`} />
          </div>
        ))}
      </div>

      {/* Input bar */}
      {/* <div className="shrink-0 px-6 py-4 border-t border-gray-100">
        <Bone className="h-11 w-full rounded-full" />
      </div> */}
    </div>
  );
};

export default ChatShimmer;
