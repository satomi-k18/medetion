"use client";
import { useState } from "react";
import IntervalSelector from "@/components/IntervalSelector";
import CountDisplay from "@/components/CountDisplay";
import TimerControls from "@/components/TimerControls";
import { useTimer } from "@/hooks/useTimer";
import { saveSession } from "@/hooks/useSessionStore";

export default function TimerTab() {
  const [interval, setIntervalSec] = useState(0);
  const timer = useTimer();

  const handleStart = () => {
    if (interval > 0) timer.start(interval);
  };

  const handleStop = () => {
    if (timer.count > 0) {
      const date = new Date().toISOString().slice(0, 10);
      saveSession({
        date,
        totalBells: timer.count,
        totalMinutes: Math.floor(timer.elapsedSec / 60),
      });
    }
    timer.stop();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <IntervalSelector onSelect={setIntervalSec} />
      <CountDisplay elapsed={timer.elapsedSec} remaining={timer.remainingSec} count={timer.count} />
      <TimerControls
        isRunning={timer.isRunning}
        onStart={handleStart}
        onPause={timer.pause}
        onResume={timer.resume}
        onStop={handleStop}
      />
    </div>
  );
}
