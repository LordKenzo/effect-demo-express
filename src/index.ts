import { Effect, Layer } from "effect";
import { ExpressService, ServerLive } from './server/setup';
import { BaseController } from './server/controllers';

const main = () => {
  // setAppLive: Uno strato sincrono che fornisce l'istanza live del servizio Express.
  const setAppLive = Layer.sync(ExpressService, () => ExpressService.Live);

  // BaseControllerLive: Uno strato che gestisce il ciclo di vita del controller, assicurandosi che le risorse vengano rilasciate correttamente.
  const BaseControllerLive = Layer.scopedDiscard(BaseController);

  // AppLive: Uno strato che combina ServerLive con setAppLive, fornendo il servizio Express configurato.
  const AppLive = ServerLive.pipe(Layer.provide(setAppLive));

  // ControllerLive: Uno strato che combina tutti i controller, in questo caso solo BaseControllerLive.
  const ControllerLive = Layer.mergeAll(BaseControllerLive);

  // program: Uno strato che combina AppLive con ControllerLive e setAppLive, fornendo tutte le configurazioni necessarie per avviare l'applicazione.
  const program = AppLive.pipe(
    Layer.provide(ControllerLive),
    Layer.provide(setAppLive)
  );

  // Effect.runFork(Layer.launch(program)): Avvia il programma in modo asincrono, eseguendo tutti gli effetti e gli strati configurati
  Effect.runFork(Layer.launch(program)).pipe(
    Effect.catchAll((error) =>
      Effect.sync(() => {
        console.error('Failed to start the application:', error);
        process.exit(1);
      })
    )
  );
};

main();
