import { setupHook } from "./hooks/setup.mjs";
import { onLibWrapperReady } from "./hooks/lib-wrapper-ready.mjs";
import { onPf1ActorRest } from "./hooks/pf1-actor-rest.mjs";
import { onPf1ActorSheetRender } from "./hooks/actor-sheet.mjs";

Hooks.once('setup', () => {
    setupHook();
});

Hooks.once("libWrapper.Ready", onLibWrapperReady);

Hooks.on("pf1ActorRest", onPf1ActorRest);

Hooks.on("renderActorSheet", (app, html, data) => {
    onPf1ActorSheetRender(app, html, data);
});