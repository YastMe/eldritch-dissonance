export function onLibWrapperReady() {
    libWrapper.register("eldritch-dissonance", "globalThis.pf1.actionUse.ActionUse.prototype.prepareChargeCost", async function (wrapped, ...args) {
        if (this.item.type !== "spell" || (this.item.type === "spell" && !this.item.spellbook.spellPoints.useSystem))
            return wrapped(...args);
        if (this.actor.getFlag("eldritch-dissonance", "ignoreDissonance"))
            return wrapped(...args);

        const rollData = this.shared.rollData;
        rollData.chargeCostBonus += this.item.eldritchDissonance;
        this.item.timesUsed++;
        return wrapped(...args);
    }, "WRAPPER");
}
