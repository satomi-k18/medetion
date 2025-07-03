'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  /* ------------------ 状態 ------------------ */
  const [intervalMin, setIntervalMin] = useState(10);   // ベル間隔
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const [running, setRunning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  /* ------------------ タイマー ------------------ */
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) return 0;
        const next = prev - 1;
        if (next % (intervalMin * 60) === 0) audioRef.current?.play();
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, intervalMin]);

  /* ------------------ ヘルパー ------------------ */
  const mmss = (sec: number) =>
    `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  /* ------------------ UI ------------------ */
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-2xl font-bold">瞑想ベルタイマー</h1>

      {/* ベル間隔ドロップダウン */}
      <select
        className="border rounded px-3 py-1"
        value={intervalMin}
        onChange={(e) => setIntervalMin(+e.target.value)}
        disabled={running}
      >
        <option value={3}>ベル間隔: 3分</option>
        <option value={5}>ベル間隔: 5分</option>
        <option value={10}>ベル間隔: 10分</option>
      </select>

      {/* スタート／ポーズ ボタン */}
      <button
        onClick={() => setRunning((p) => !p)}
        className="w-40 h-40 rounded-full font-bold text-lg shadow
                   bg-gradient-to-br from-yellow-200 to-yellow-400"
      >
        {running ? 'PAUSE' : 'START'}
      </button>

      {/* 残り時間 */}
      <div className="text-4xl font-semibold tracking-widest">{mmss(secondsLeft)}</div>

      {/* ベル音 */}
      <audio ref={audioRef} src="/sounds/bell.mp3" preload="auto" />
    </main>
  );
}

