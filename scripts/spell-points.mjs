Hooks.once('setup', () => {
    setupHook();
});

function setupHook() {
    console.log("Spell Points | Setting up module");
    const moduleName = "spell-points"; 

    Object.defineProperty(globalThis.pf1.documents.item.ItemSpellPF.prototype, "eldritchDissonance", {
        get() {
            if (!this.spellbook.spellPoints.useSystem) return 0;
            else if (this.spellbook.prepared)
                return this.timesUsed * this.system.level;
            else
                return this.timesUsed;
        },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(globalThis.pf1.documents.item.ItemSpellPF.prototype, "timesUsed", {
        get() {
            return this.getFlag(moduleName, "timesUsed") ?? 0;
        },
        set(value) {
            const newValue = Math.max(0, value);
            if (this.timesUsed !== newValue)
                this.setFlag(moduleName, "timesUsed", newValue);
        },
        configurable: true,
        enumerable: true
    });
}

Hooks.once("libWrapper.Ready", () => {
    libWrapper.register('spell-points', 'globalThis.pf1.actionUse.ActionUse.prototype.prepareChargeCost', async function (wrapped, ...args) {
        if (this.item.type !== "spell" || (this.item.type === "spell" && !this.item.spellbook.spellPoints.useSystem && this.item.system.level > 0))
            return wrapped(...args);
        const rollData = this.shared.rollData;
        rollData.chargeCostBonus += this.item.eldritchDissonance;
        this.item.timesUsed++;
        return wrapped(...args);
    }, 'WRAPPER');
});

Hooks.on("pf1ActorRest", async (actor, restType) => {
    const spells = actor.items.filter(i => i.type === "spell");
    for (const spell of spells)
        if (restType.restoreDailyUses)
            spell.timesUsed = 0;
});