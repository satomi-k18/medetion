"use client";
interface Props {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export default function TimerControls({
  isRunning,
  onStart,
  onPause,
  onResume,
  onStop,
}: Props) {
  return (
    <div className="flex gap-3 justify-center">
      {!isRunning && (
        <button className="btn-primary" onClick={onStart}>
          Start
        </button>
      )}
      {isRunning && (
        <button className="btn-secondary" onClick={onPause}>
          Pause
        </button>
      )}
      {!isRunning && (
        <button className="btn-secondary" onClick={onResume}>
          Resume
        </button>
      )}
      <button className="btn-danger" onClick={onStop}>
        Stop
      </button>
      <style jsx>{`
        .btn-primary {
          @apply px-4 py-2 rounded bg-blue-600 text-white;
        }
        .btn-secondary {
          @apply px-4 py-2 rounded bg-gray-600 text-white;
        }
        .btn-danger {
          @apply px-4 py-2 rounded bg-red-600 text-white;
        }
      `}</style>
    </div>
  );
}
