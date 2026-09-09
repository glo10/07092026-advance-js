import { describe, it, expect, vi } from "vitest";
import { finalSettings, theme, otherSettings } from "../../6.1/src/config";

describe("Testing Settings Constants", () => {
  it("should correctly merge default and user settings", () => {
    expect(finalSettings).toEqual({
      theme: "dark",
      notifications: true,
      sidebar: true,
      language: "fr",
    });
  });

  it("should correctly extract theme", () => {
    expect(theme).toBe("dark");
  });

  it("should correctly extract remaining settings", () => {
    expect(theme).toBe("dark");
  });
});
