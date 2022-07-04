import Faction from "./faction.js";
import translate from "./messages.js";

export default class Vagabot extends Faction
{
    static states = [
        "setup.vagabot",
        "birdsong.default.set-order",
        "birdsong.default.caft",
        "birdsong.vagabot.slip",
        "daylight.vagabot.action1",
        "daylight.vagabot.action2",
        "daylight.vagabot.action3",
        "evening.vagabot.refresh",
        "evening.vagabot.repair",
        "evening.default.discard",
    ]

    static actions = {
        "fox":   ["daylight.vagabot.explore", "daylight.vagabot.special", "daylight.vagabot.battle"],
        "bunny": ["daylight.vagabot.special", "daylight.vagabot.aid",     "daylight.vagabot.battle"],
        "mouse": ["daylight.vagabot.quest",   "daylight.vagabot.aid",     "daylight.vagabot.battle"],
        "bird":  ["daylight.vagabot.explore", "daylight.vagabot.quest",   "daylight.vagabot.battle"],
    }

    get_states() { return Vagabot.states; }

    new_turn()
    {
        super.new_turn();
    }

    constructor()
    {
        super();
    }

    name()
    {
        return "vagabot";
    }

    abilities()
    {
        return [
            "ability.nimble",
            "ability.lone-wanderer",
            "ability.poor-manual-dexterity",
            "ability.hates-surprises",
        ]
    }

    title_foreground()
    {
        return "rgb(251, 253, 255)"
    }

    title_background()
    {
        return "rgb(116, 127, 116)"
    }

    get_value(key) {
        return super.get_value(key)
    }

    get_step_at(index)
    {
        var step = super.get_step_at(index);
        if (step.startsWith("daylight.vagabot.action"))
        {
            var index = parseInt(step.substring(23)) - 1
            return Vagabot.actions[this.get_order()][index];
        }

        return step
    }

    get_step_html()
    {

        return super.get_step_html();
    }

    next_step()
    {
        return super.next_step()
    }

    advance(delta)
    {
        super.advance(delta)
    }


    after_update()
    {
        super.after_update()

        if (this.get_step() === "birdsong.vagabot.slip") {
            var evening = document.getElementById('slip-to-evening');
            var self = this;
            evening.addEventListener('click', function(){
                self.state = 7;
                window.perform_update()
            } );
        }
    }
}
