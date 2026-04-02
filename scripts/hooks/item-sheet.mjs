export function onPf1ItemSheetRender(app, html, data) {
    const miscDiv = html.find(".spell-misc .form-group.stacked")[0] ?? html.find(".spell-misc")[0];
    if (!miscDiv) return;
    const eldritchDissonanceLabel = document.createElement("label");
    eldritchDissonanceLabel.classList.add("checkbox");
    const eldritchDissonanceInput = document.createElement("input");
    eldritchDissonanceInput.type = "checkbox";
    eldritchDissonanceInput.name = "flags.eldritch-dissonance.ignoreDissonance";
    eldritchDissonanceInput.id = eldritchDissonanceInput.name;
    eldritchDissonanceLabel.appendChild(eldritchDissonanceInput);
    eldritchDissonanceLabel.appendChild(document.createTextNode("Ignore Eldritch Dissonance"));
    if (data.item.getFlag("eldritch-dissonance", "ignoreDissonance"))
        eldritchDissonanceInput.checked = true;
    else
        data.item.setFlag("eldritch-dissonance", "ignoreDissonance", false);
    miscDiv.append(eldritchDissonanceLabel);
}