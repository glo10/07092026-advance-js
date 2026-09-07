import { describe, test, expect, beforeEach, vi } from "vitest";
import {
  Counter,
} from "../src/counter";

describe("Counter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("Doit initialiser le compteur à 0", () => {
    const counter = new Counter();
    expect(counter.count).toBe(0);
  });

  test("Doit incrémenter le compteur après 1 seconde", () => {
    const counter = new Counter();
    counter.start();
    vi.advanceTimersByTime(1000);
    expect(counter.count).toBe(1);
  });

  test("Doit avoir le compteur égale à 3 après 3 appels", () => {
    const counter = new Counter();

    counter.start();
    counter.start();
    counter.start();
    vi.advanceTimersByTime(1000);

    expect(counter.count).toBe(3);
  });
});
