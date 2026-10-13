import { paperOne, type MockTest, type MockQuestion, type MockSection, type MockTopic } from "./mock-tests";
import { paperTwo } from "./mock-papers/paper-two";
import { paperThree } from "./mock-papers/paper-three";

export const mockTests: MockTest[] = [paperOne, paperTwo, paperThree];

export function getMockTest(slug: string): MockTest | undefined {
  return mockTests.find((t) => t.slug === slug);
}

export function totalMarks(test: MockTest): number {
  return test.questions.reduce((s, q) => s + q.marks, 0);
}

export type Breakdown = {
  key: string;
  scored: number;
  total: number;
  correct: number;
  count: number;
};

export function scoreTest(
  test: MockTest,
  answers: Record<string, number | undefined>,
): {
  scored: number;
  total: number;
  correct: number;
  attempted: number;
  bySection: Breakdown[];
  byTopic: Breakdown[];
} {
  const sectionMap = new Map<string, Breakdown>();
  const topicMap = new Map<string, Breakdown>();
  let scored = 0;
  let correct = 0;
  let attempted = 0;

  const bump = (map: Map<string, Breakdown>, key: string, q: MockQuestion, ok: boolean) => {
    const row = map.get(key) ?? { key, scored: 0, total: 0, correct: 0, count: 0 };
    row.total += q.marks;
    row.count += 1;
    if (ok) {
      row.scored += q.marks;
      row.correct += 1;
    }
    map.set(key, row);
  };

  for (const q of test.questions) {
    const given = answers[q.id];
    const ok = given === q.answer;
    if (given !== undefined) attempted += 1;
    if (ok) {
      scored += q.marks;
      correct += 1;
    }
    bump(sectionMap, q.section as MockSection, q, ok);
    bump(topicMap, q.topic as MockTopic, q, ok);
  }

  return {
    scored,
    total: totalMarks(test),
    correct,
    attempted,
    bySection: [...sectionMap.values()].sort((a, b) => a.key.localeCompare(b.key)),
    byTopic: [...topicMap.values()].sort((a, b) => b.total - a.total),
  };
}

/* ---- Last attempt storage (local only) ---- */

const KEY = "codelearners:mock-results:v1";

export type StoredResult = {
  slug: string;
  scored: number;
  total: number;
  at: string;
};

export function saveResult(r: StoredResult) {
  if (typeof window === "undefined") return;
  try {
    const all: Record<string, StoredResult> = JSON.parse(localStorage.getItem(KEY) || "{}");
    all[r.slug] = r;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

export function readResults(): Record<string, StoredResult> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
