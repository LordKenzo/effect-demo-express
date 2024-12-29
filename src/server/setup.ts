import cookieParser from "cookie-parser";
import { Context, Effect, Layer, Either } from "effect";
import express from "express";
import type { Express } from "express";
import { getConfig } from "../utility/getConfig";

interface ExpressServiceImpl {
  readonly setApp: Effect.Effect<Express, never>;
}
export class ExpressService extends Context.Tag("ExpressService")<
  ExpressService,
  ExpressServiceImpl
>() {
  static readonly Live = ExpressService.of({
    setApp: Effect.succeed(express().use(cookieParser())),
  });
}

// export class ExpressService extends Context.Tag("ExpressService")<
//   ExpressService,
//   typeof base
// >() {}
// export const base = express().use(cookieParser());

export const ServerLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const configOrFail = yield* Effect.either(getConfig());
    if (Either.isLeft(configOrFail)) {
      const error = configOrFail.left;
      console.log(error);
      return;
    }
    const config = configOrFail.right;
    const port = config.port;
    const server_url = config.server_url;

    const { setApp } = yield* ExpressService;
    const app = yield* setApp;

    yield* Effect.acquireRelease(
      Effect.sync(() => {
        const server = app.listen(port, () => {
          console.log(`Listening at ${server_url}:${port}`);
        });
        return server;
      }),
      (server) => Effect.sync(() => server.close())
    );
  })
);
