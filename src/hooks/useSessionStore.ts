"use client";
import { openDB, DBSchema } from "idb";
import { useCallback, useEffect, useState } from "react";

export interface Session {
  date: string; // YYYY-MM-DD
  totalBells: number;
  totalMinutes: number;
}

interface SessionDB extends DBSchema {
  sessions: {
    key: string; // date
    value: Session;
  };
}

const dbPromise = openDB<SessionDB>("meditation-counter", 1, {
  upgrade(db) {
    db.createObjectStore("sessions");
  },
});

// Helper functions usable without React
export async function saveSession(session: Session) {
  const db = await dbPromise;
  await db.put("sessions", session, session.date);
}

export async function getSessionsByMonth(yyyyMM: string) {
  const db = await dbPromise;
  const tx = db.transaction("sessions");
  const store = tx.objectStore("sessions");
  const all = await store.getAll();
  return all.filter((s) => s.date.startsWith(yyyyMM));
}

export function useSessionStore() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    dbPromise.then(() => setReady(true));
  }, []);

  const saveSessionHook = useCallback(async (session: Session) => {
    const db = await dbPromise;
    await db.put("sessions", session, session.date);
  }, []);

  const getSessionsByMonthHook = useCallback(async (yyyyMM: string) => {
    const db = await dbPromise;
    const tx = db.transaction("sessions");
    const store = tx.objectStore("sessions");
    const all = await store.getAll();
    return all.filter((s) => s.date.startsWith(yyyyMM));
  }, []);

  return { isReady, saveSession: saveSessionHook, getSessionsByMonth: getSessionsByMonthHook };
}
