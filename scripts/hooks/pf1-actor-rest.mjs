const moduleName = "eldritch-dissonance";

export function onPf1ActorRest(actor, restType) {
    const spells = actor.itemTypes.spell;
    if (spells.length && restType.restoreDailyUses) {
        const update = spells.map(s => ({
            _id: s.id,
            flags: { [moduleName]: { timesUsed: 0}}
        }));
        actor.updateEmbeddedDocuments("Item", update);
    }
}