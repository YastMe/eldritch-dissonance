export function onPf1ActorSheetRender(app, html, data) {
    if (data.actor.type === "npc" && data.actor.getFlag("core", "sheetClass") !== "pf1.ActorSheetPFNPC") return;
    if (data.actor.type !== "character" && data.actor.type !== "npc") return;
    const noManeuversDiv = html.find("div.form-group.stacked")[1];
    if (!noManeuversDiv) return;

    const eldritchDissonanceLabel = document.createElement("label");
    eldritchDissonanceLabel.classList.add("checkbox");
    const eldritchDissonanceInput = document.createElement("input");
    eldritchDissonanceInput.type = "checkbox";
    eldritchDissonanceInput.name = "flags.eldritch-dissonance.ignoreDissonance";
    eldritchDissonanceInput.id = eldritchDissonanceInput.name;
    eldritchDissonanceLabel.appendChild(eldritchDissonanceInput);
    eldritchDissonanceLabel.appendChild(document.createTextNode("Ignore Eldritch Dissonance"));
    if (data.actor.getFlag("eldritch-dissonance", "ignoreDissonance"))
        eldritchDissonanceInput.checked = true;
    else
        data.actor.setFlag("eldritch-dissonance", "ignoreDissonance", false);
    noManeuversDiv.append(eldritchDissonanceLabel);

	const ignoreFatigueLabel = document.createElement("label");
	ignoreFatigueLabel.classList.add("checkbox");
	const ignoreFatigueInput = document.createElement("input");
	ignoreFatigueInput.type = "checkbox";
	ignoreFatigueInput.name = "flags.eldritch-dissonance.ignoreFatigue";
	ignoreFatigueInput.id = ignoreFatigueInput.name;
	ignoreFatigueLabel.appendChild(ignoreFatigueInput);
	ignoreFatigueLabel.appendChild(document.createTextNode("Ignore Fatigue from low Spell Points"));
	if (data.actor.getFlag("eldritch-dissonance", "ignoreFatigue"))
		ignoreFatigueInput.checked = true;
	else
		data.actor.setFlag("eldritch-dissonance", "ignoreFatigue", false);
	noManeuversDiv.append(ignoreFatigueLabel);
}