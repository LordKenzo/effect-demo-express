import { Effect } from "effect";
import { getConfig } from "../getConfig";

// Mock delle variabili d'ambiente
process.env["PORT"] = "3000";
process.env["server_url"] = "http://localhost:3000";

describe("getConfig", () => {
  it("should return the correct configuration", async () => {
    const result = await Effect.runPromise(getConfig());
    expect(result).toEqual({
      port: "3000",
      server_url: "http://localhost:3000",
    });
  });

  it("should use default values if environment variables are not set", async () => {
    delete process.env["PORT"];
    delete process.env["server_url"];

    const result = await Effect.runPromise(getConfig());
    expect(result).toEqual({
      port: 8080,
      server_url: "http://localhost",
    });
  });

  it("should handle configuration errors gracefully", async () => {
    // Simula un errore di configurazione
  });
});
