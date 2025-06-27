"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

export interface TimerState {
  count: number;
  elapsedSec: number;
  remainingSec: number;
  isRunning: boolean;
  intervalSec: number;
}

export function useTimer() {
  const [state, setState] = useState<TimerState>({
    count: 0,
    elapsedSec: 0,
    remainingSec: 0,
    isRunning: false,
    intervalSec: 0,
  });

  const playerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const nextBellTimeRef = useRef<number>(0);
  const tickIdRef = useRef<NodeJS.Timeout | null>(null);

  // lazy-load Tone.js on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("tone").then((Tone) => {
      const player = new Tone.Player("/bell.wav").toDestination();
      playerRef.current = player;
    });
  }, []);

  const stopTicker = () => {
    if (tickIdRef.current) {
      clearInterval(tickIdRef.current);
      tickIdRef.current = null;
    }
  };

  const playBell = () => {
    if (playerRef.current) {
      try {
        playerRef.current.start();
      } catch {
        // ignore
      }
    } else {
      // fallback HTML Audio
      const a = new Audio("/bell.wav");
      a.play();
    }
  };

  const start = useCallback((intervalSec: number) => {
    stop(); // reset
    const now = Date.now();
    startTimeRef.current = now;
    nextBellTimeRef.current = now + intervalSec * 1000;
    setState({
      count: 0,
      elapsedSec: 0,
      remainingSec: intervalSec,
      isRunning: true,
      intervalSec,
    });

    tickIdRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      let count = state.count;
      if (now >= nextBellTimeRef.current) {
        playBell();
        count += 1;
        nextBellTimeRef.current += intervalSec * 1000;
      }
      setState((prev) => ({
        ...prev,
        count,
        elapsedSec: elapsed,
        remainingSec: intervalSec - (elapsed % intervalSec),
      }));
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    if (!state.isRunning) return;
    stopTicker();
    setState((prev) => ({ ...prev, isRunning: false }));
  }, [state.isRunning]);

  const resume = useCallback(() => {
    if (state.isRunning || state.intervalSec === 0) return;
    const now = Date.now();
    startTimeRef.current = now - state.elapsedSec * 1000;
    nextBellTimeRef.current = now + state.remainingSec * 1000;
    setState((prev) => ({ ...prev, isRunning: true }));
    tickIdRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      let count = state.count;
      if (now >= nextBellTimeRef.current) {
        playBell();
        count += 1;
        nextBellTimeRef.current += state.intervalSec * 1000;
      }
      setState((prev) => ({
        ...prev,
        count,
        elapsedSec: elapsed,
        remainingSec: state.intervalSec - (elapsed % state.intervalSec),
      }));
    }, 1000);
  }, [state]);

  const stop = useCallback(() => {
    stopTicker();
    setState({
      count: 0,
      elapsedSec: 0,
      remainingSec: 0,
      isRunning: false,
      intervalSec: 0,
    });
  }, []);

  useEffect(() => () => stopTicker(), []);

  return { ...state, start, pause, resume, stop };
}
