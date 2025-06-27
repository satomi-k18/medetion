"use client";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Hello, Next.js 15!</h1>
    </main>
  );
}

  return (
    <Tabs defaultValue="timer" className="mx-auto max-w-md p-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="timer">Timer</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="timer">
        <TimerTab />
      </TabsContent>
      <TabsContent value="history">
        <HistoryTab />
      </TabsContent>
    </Tabs>
  );
}
 
 
import CountDisplay from "@/components/CountDisplay";
import TimerControls from "@/components/TimerControls";
import CalendarView from "@/components/CalendarView";
import { useTimer } from "@/hooks/useTimer";
import { useSessionStore } from "@/hooks/useSessionStore";
  const [interval, setIntervalSec] = useState(0);
  const [activeTab, setActiveTab] = useState<"timer" | "history">("timer");
  const timer = useTimer();
  const { saveSession } = useSessionStore();

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
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "timer" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          onClick={() => setActiveTab("timer")}
        >
          Timer
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>
      {activeTab === "timer" && (
        <>
          <IntervalSelector onSelect={setIntervalSec} />
          <CountDisplay
            elapsed={timer.elapsedSec}
            remaining={timer.remainingSec}
            count={timer.count}
          />
          <TimerControls
            isRunning={timer.isRunning}
            onStart={handleStart}
            onPause={timer.pause}
            onResume={timer.resume}
            onStop={handleStop}
          />
        </>
      )}
      {activeTab === "history" && <CalendarView />}
    </div>
  );
}
