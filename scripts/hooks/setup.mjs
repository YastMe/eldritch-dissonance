export function setupHook() {
    console.log("Spell Points | Setting up module");
    const moduleName = "eldritch-dissonance"; 

    Object.defineProperty(globalThis.pf1.documents.item.ItemSpellPF.prototype, "eldritchDissonance", {
        get() {
            if (!this.spellbook.spellPoints.useSystem || this.system.level <= 0) return 0;
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