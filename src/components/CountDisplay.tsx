"use client";
interface Props {
  elapsed: number;
  remaining: number;
  count: number;
}

function format(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function CountDisplay({ elapsed, remaining, count }: Props) {
  return (
    <div className="text-center space-y-2">
      <div className="text-6xl font-bold">{format(elapsed)}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Next bell in {format(remaining)}
      </div>
      <div className="text-xl">🔔 {count}</div>
    </div>
  );
}
