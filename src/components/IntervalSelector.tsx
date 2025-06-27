"use client";
import { useState } from "react";

interface Props {
  onSelect: (seconds: number) => void;
}

const presets = [180, 300, 600]; // 3,5,10 minutes

export default function IntervalSelector({ onSelect }: Props) {
  const [custom, setCustom] = useState(60);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {presets.map((sec) => (
          <button
            key={sec}
            className="px-3 py-1 rounded bg-blue-600 text-white"
            onClick={() => onSelect(sec)}
          >
            {sec / 60} min
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={custom}
          min={10}
          className="border px-2 py-1 w-20 text-center"
          onChange={(e) => setCustom(Number(e.target.value))}
        />
        <span>sec</span>
        <button
          className="px-3 py-1 rounded bg-green-600 text-white"
          onClick={() => onSelect(custom)}
        >
          Set
        </button>
      </div>
    </div>
  );
}
