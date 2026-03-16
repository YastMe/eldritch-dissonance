export function onPf1ActorRest(actor, restType) {
    const spells = actor.items.filter((item) => item.type === "spell");
    for (const spell of spells) {
        if (restType.restoreDailyUses)
            spell.timesUsed = 0;
    }
}
