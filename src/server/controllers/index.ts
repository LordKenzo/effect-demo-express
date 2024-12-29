import { Effect } from "effect";
import type { Request, Response } from "express";
import { ExpressService } from "../setup";

export const BaseController = Effect.gen(function* (_) {
  const { setApp } = yield* ExpressService;
  const app = yield* setApp;

  const body = (_req: Request, res: Response) =>
    Effect.sync(() => {
      res.send({ message: "Hello World" });
    });

  app.get("/", async (req: Request, res: Response) => {
    await Effect.runPromise(body(req, res));
  });
});
