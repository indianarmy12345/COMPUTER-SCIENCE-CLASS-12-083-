import { useEffect, useState, useSyncExternalStore } from "react";
import { chapters } from "./syllabus";
import type { Course } from "./courses";
import { lessonPath } from "./courses";

const KEY = "cs083:progress:v1";

type Progress = Record<string, true>;

const listeners = new Set<() => void>();

function read(): Progress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function write(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  listeners.forEach((l) => l());
}

export function markComplete(slug: string) {
  if (!slug) return;
  const p = read();
  if (p[slug]) return;
  p[slug] = true;
  write(p);
}

export function resetProgress() {
  write({});
}

export function resetCourseProgress(course: Course) {
  const p = read();
  for (const l of course.lessons) delete p[lessonPath(course.slug, l.slug)];
  write(p);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function useRawProgress(): Progress {
  const data = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(KEY) || "{}",
    () => "{}",
  );
  const [parsed, setParsed] = useState<Progress>({});
  useEffect(() => {
    try {
      setParsed(JSON.parse(data));
    } catch {
      setParsed({});
    }
  }, [data]);
  return parsed;
}

export function useProgress() {
  const parsed = useRawProgress();
  const total = chapters.length;
  const completed = chapters.filter((c) => parsed[c.slug]).length;
  return {
    map: parsed,
    isDone: (slug: string) => !!parsed[slug],
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

/** Progress for a specific course (Python, HTML, …). */
export function useCourseProgress(course: Course) {
  const parsed = useRawProgress();
  const total = course.lessons.length;
  const completed = course.lessons.filter(
    (l) => parsed[lessonPath(course.slug, l.slug)],
  ).length;
  return {
    isDone: (slug: string) => !!parsed[slug],
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

/** Auto-mark the current chapter complete when an example is run. */
export function useMarkOnRun() {
  return (slug: string) => markComplete(slug);
}
