import { Effect, Layer } from "effect";
import { ExpressService, ServerLive } from "./server/setup";
import { BaseController } from "./server/controllers";

const main = () => {
  const setAppLive = Layer.sync(ExpressService, () => ExpressService.Live);

  const BaseControllerLive = Layer.scopedDiscard(BaseController);

  const AppLive = ServerLive.pipe(Layer.provide(setAppLive));

  const ControllerLive = Layer.mergeAll(BaseControllerLive);

  const program = AppLive.pipe(
    Layer.provide(ControllerLive),
    Layer.provide(setAppLive)
  );

  Effect.runFork(Layer.launch(program));
};

main();
