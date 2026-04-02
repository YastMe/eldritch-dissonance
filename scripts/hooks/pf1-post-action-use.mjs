export function onPf1PostActionUse(action) {
    if (!action.item.getFlag("eldritch-dissonance", "ignoreDissonance") && action.item.type === "spell") {
        action.item.timesUsed++;
    }
}