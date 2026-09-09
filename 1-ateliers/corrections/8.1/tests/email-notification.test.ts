import { describe, it, expect, vi } from "vitest";
import EmailNotification from "../../6.1/src/email-notification";

describe("Testing EmailNotification Class", () => {
  it("should have john@doe.com as email", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const emailNotif = new EmailNotification("john@doe.com", "secret", "Welcome!");
    expect(emailNotif.recipient).toBe("john@doe.com");
    consoleSpy.mockRestore();
  });

  it("should have api key equals to secret", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const dt = new Date();
    const emailNotif = new EmailNotification("john@doe.com", "secret", "Welcome!", dt);
    expect(emailNotif.apiKey).toBe("secret");
    emailNotif.send();
    consoleSpy.mockRestore();
  });

  it("should call console.log with email, date and message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const dt = new Date();
    const emailNotif = new EmailNotification("john@doe.com", "secret", "Welcome!", dt);
    emailNotif.send();

    expect(consoleSpy).toHaveBeenCalledWith(
      `[EMAIL -> john@doe.com] (${dt.toISOString()}) : Welcome!`,
    );
    consoleSpy.mockRestore();
  });
});
