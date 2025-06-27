"use client";
import React from "react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getSessionsByMonth, Session } from "@/hooks/useSessionStore";

interface Props {}

export default function CalendarView({}: Props) {
  const [month, setMonth] = useState(dayjs());
  const [isReady, setReady] = useState(false);
  const [sessions, setSessions] = useState<Record<string, { totalBells: number; totalMinutes: number }>>({});

  useEffect(() => {
    // mark ready when first mounted; IndexedDB initializes lazily in helper
    setReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const key = month.format("YYYY-MM");
    getSessionsByMonth(key).then((list: Session[]) => {
      const map: Record<string, any> = {};
      list.forEach((s) => (map[s.date] = s));
      setSessions(map);
    });
  }, [month, isReady, getSessionsByMonth]);

  const startOfMonth = month.startOf("month");
  const daysInMonth = month.daysInMonth();
  const weeks: React.ReactElement[][] = [];
  let cells: React.ReactElement[] = [];

  for (let i = 0; i < startOfMonth.day(); i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = startOfMonth.set("date", d);
    const iso = date.format("YYYY-MM-DD");
    const hasSession = !!sessions[iso];
    cells.push(
      <div key={iso} className="h-16 flex items-center justify-center relative">
        <span>{d}</span>
        {hasSession && (
          <span className="absolute bottom-1 w-2 h-2 rounded-full bg-green-500" />
        )}
      </div>
    );
  }

  // chunk into weeks of 7
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <button onClick={() => setMonth(month.subtract(1, "month"))}>{"<"}</button>
        <h2 className="text-lg font-bold">{month.format("MMMM YYYY")}</h2>
        <button onClick={() => setMonth(month.add(1, "month"))}>{">"}</button>
      </div>
      <div className="grid grid-cols-7 gap-2 border p-2">
        {weeks.map((week, idx) => (
          <div key={idx} className="contents">
            {week}
          </div>
        ))}
      </div>
    </div>
  );
}
