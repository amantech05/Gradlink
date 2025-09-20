import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { mentors } from "../data/mockData";
import { useSearchParams } from "react-router-dom";

interface MessageItem {
  id: string;
  from: "me" | "mentor";
  text: string;
  ts: number;
}

interface Thread {
  id: string; // mentor id
  mentorName: string;
  messages: MessageItem[];
}

const STORAGE_KEY = "message_threads";

const Messages: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const listEndRef = useRef<HTMLDivElement | null>(null);
  const lastMessageFromMeRef = useRef(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [params] = useSearchParams();

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    let parsed: Thread[] = stored ? JSON.parse(stored) : [];
    setThreads(parsed);
    if (parsed.length) setActiveId(parsed[0].id);
  }, []);

  // Handle preselect via query params
  useEffect(() => {
    const mentorId = params.get("mentorId");
    const mentorName =
      params.get("mentorName") ||
      mentors.find((m) => m.id === mentorId)?.name ||
      "";
    if (!mentorId) return;
    setThreads((prev) => {
      const exists = prev.find((t) => t.id === mentorId);
      if (exists) {
        setActiveId(mentorId);
        return prev;
      }
      const newThread: Thread = {
        id: mentorId,
        mentorName: mentorName || "Mentor",
        messages: [],
      };
      const next = [newThread, ...prev];
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setActiveId(mentorId);
      return next;
    });
  }, [params]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  }, [threads]);

  const active = useMemo(
    () => threads.find((t) => t.id === activeId) || null,
    [threads, activeId]
  );

  const send = () => {
    if (!text.trim() || !active) return;
    const newMsg: MessageItem = {
      id: `${Date.now()}`,
      from: "me",
      text: text.trim(),
      ts: Date.now(),
    };
    lastMessageFromMeRef.current = true;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id ? { ...t, messages: [...t.messages, newMsg] } : t
      )
    );
    setText("");
    setTimeout(() => {
      const reply: MessageItem = {
        id: `${Date.now()}r`,
        from: "mentor",
        text: "Thanks for the message! I will get back to you.",
        ts: Date.now(),
      };
      lastMessageFromMeRef.current = false;
      setThreads((prev) =>
        prev.map((t) =>
          t.id === active.id ? { ...t, messages: [...t.messages, reply] } : t
        )
      );
    }, 800);
  };

  useEffect(() => {
    if (lastMessageFromMeRef.current && messageContainerRef.current) {
      const container = messageContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [active?.messages.length]);

  const startThreadWith = (mentorId: string, mentorName: string) => {
    const exists = threads.find((t) => t.id === mentorId);
    if (exists) {
      setActiveId(mentorId);
    } else {
      const newThread: Thread = { id: mentorId, mentorName, messages: [] };
      setThreads((prev) => [newThread, ...prev]);
      setActiveId(mentorId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Chat with mentors.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="bg-white rounded-2xl shadow-sm border p-4 lg:col-span-1">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Threads
            </h2>
            <div className="space-y-2">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveId(t.id)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    activeId === t.id
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    {t.mentorName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {t.messages[t.messages.length - 1]?.text ||
                      "No messages yet"}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-xs text-gray-500 mb-2">Start new thread</h3>
              <div className="grid grid-cols-2 gap-2">
                {mentors.slice(0, 6).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => startThreadWith(m.id, m.name)}
                    className="text-xs border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50"
                  >
                    {m.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="bg-white rounded-2xl shadow-sm border lg:col-span-2 flex flex-col min-h-0">
            {active ? (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-indigo-600" />
                    <div className="font-semibold text-gray-900">
                      {active.mentorName}
                    </div>
                  </div>
                </div>
                <div ref={messageContainerRef} className="overflow-y-auto h-[250px] border border-gray-200 m-4 rounded-lg p-4 space-y-3">
                  {active.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[80%] p-3 rounded-lg ${
                        m.from === "me"
                          ? "ml-auto bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="text-sm">{m.text}</div>
                      <div
                        className={`text-[10px] mt-1 ${
                          m.from === "me" ? "text-indigo-100" : "text-gray-500"
                        }`}
                      >
                        {new Date(m.ts).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                  <div ref={listEndRef} />
                </div>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") send();
                      }}
                      placeholder="Type a message"
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={send}
                      className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-600">
                Select a thread to start chatting.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Messages;

