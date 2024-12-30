import { Effect, Config, Either } from "effect";
import type { ConfigError } from "effect/ConfigError";

interface ConfigObject {
  port: string | number;
  server_url: string;
}

const program = Effect.gen(function* () {
  const port = yield* Config.string("PORT").pipe(Config.withDefault(8080));
  const server_url = yield* Config.string("server_url").pipe(
    Config.withDefault("http://localhost")
  );
  return {
    port,
    server_url,
  };
});

const config = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(program);
  if (Either.isLeft(failureOrSuccess)) {
    const error = failureOrSuccess.left;
    return yield* Effect.fail(error);
  } else {
    return failureOrSuccess.right;
  }
});

export const getConfig = (): Effect.Effect<
  ConfigObject,
  ConfigError,
  never
> => {
  return config;
};