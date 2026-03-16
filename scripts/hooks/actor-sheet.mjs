export function onPf1ActorSheetRender(app, html, data) {
    const noManeuversDiv = html.find("div.form-group.stacked")[1];
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
}