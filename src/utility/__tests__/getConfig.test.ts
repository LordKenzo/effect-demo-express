import { Effect, Exit } from "effect";
import { getConfig } from "../getConfig";

// Mock delle variabili d'ambiente
process.env["PORT"] = "3000";
process.env["server_url"] = "http://localhost:3000";

describe("getConfig", () => {
  let originalPort = process.env["PORT"];
  beforeEach(() => {
    // Salva valore originale
    originalPort = process.env["PORT"];
  });

  afterEach(() => {
    // Ripristina valore originale
    process.env["PORT"] = originalPort;
  });
  it("should return the correct configuration", async () => {
    const result = await Effect.runPromise(getConfig());
    expect(result).toEqual({
      port: 3000,
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
    // Simula l'errore di configurazione
    process.env["PORT"] = "nonUnNumero";

    // Lancia il processo e ottieni l'Exit
    const result = await Effect.runPromiseExit(getConfig());

    // Verifichiamo che il risultato sia un Failure
    expect(Exit.isFailure(result)).toBe(true);
  });
});
