import React from "react";

export default function SecondaryCard({ pill, content, info, gradient }) {
  return (
    <div
      className={`w-[15rem] h-[12rem] relative mt-10 bg-gradient-to-b ${gradient} rounded-lg shadow-lg flex flex-col items-center justify-center text-white p-5`}
    >
      {/* Pill Label */}
      <div className="text-lg font-semibold">{pill}</div>

      {/* Main Content */}
      <h2 className="text-5xl font-bold mt-2">{content}</h2>

      {/* Info Text */}
      <div className="absolute bottom-4 text-sm">{info}</div>
    </div>
  );
}
