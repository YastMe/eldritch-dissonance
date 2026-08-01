function calculateCost(spell) {
	if (spell.system.spellPoints.cost) {
		if (Number(spell.system.spellPoints.cost) > 0 && !spell.getFlag("eldritch-dissonance", "ignoreDissonance"))
			return 1 + spell.system.level + spell.eldritchDissonance;
		else if (Number(spell.system.spellPoints.cost) === 0 && !spell.getFlag("eldritch-dissonance", "ignoreDissonance"))
			return Number(spell.system.spellPoints.cost) + spell.eldritchDissonance;
	}
	return 0;
}

export function onPf1PostActionUse(action) {
	const actor = action.actor;
	const item = action.item;
	const spellbook = actor.system.attributes.spells.spellbooks[item.system.spellbook];
	if (!item.getFlag("eldritch-dissonance", "ignoreDissonance") && item.type === "spell") {
		item.timesUsed++;
	}
	if (!actor.getFlag("eldritch-dissonance", "ignoreFatigue") && item.type === "spell" && spellbook.spellPoints.useSystem) {
		if (spellbook.spellPoints.value < spellbook.spellPoints.max / 2) {
			const dc = 10 + calculateCost(item);
			const content = `
				<div class="pf1 chat-card item-card" data-actor-id="${actor.id}" data-item-id="${item.id}">
					<div class="card-content">
						<section class="item-description">
							${actor.name} went below half spell point pool! Risking fatigue or exhaustion.
						</section>
					</div>
					<div class="chat-attack" data-index="0">
						<div class="card-button-group flexcol">
							<button data-action="save" data-type="will" data-dc="${dc}" data-gm-sensitive-inner="Will Save">
								Will Save DC ${dc}
							</button>
						</div>
					</div>
				</div>
			`;
			ChatMessage.create({
				user: game.user.id,
				speaker: ChatMessage.getSpeaker({ actor }),
				content: content,
			});
		}
	}
}