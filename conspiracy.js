import Faction from "./faction.js";
import translate from "./messages.js";

export default class Conspiracy extends Faction
{
    static states = [
        "setup.conspiracy",
        "birdsong.default.set-order",
        "birdsong.default.caft",
        "birdsong.conspiracy.recruit",
        "birdsong.conspiracy.flip",
        "daylight.conspiracy.battle",
        "daylight.conspiracy.move",
        "daylight.conspiracy.plot",
        "daylight.conspiracy.thickens",
        "evening.conspiracy.score",
        "evening.default.discard",
    ]

    get_states() { return Conspiracy.states; }

    new_turn()
    {
        super.new_turn();
        this.expanded = false
    }

    constructor()
    {
        super();
    }

    name()
    {
        return "conspiracy";
    }

    abilities()
    {
        return [
            "ability.plots",
            "ability.nimble",
            "ability.embedded-agents",
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
        return "rgb(143, 107, 164)"
    }

    get_step_html()
    {
        if (this.get_step() === "birdsong.conspiracy.recruit") {
            var base = (this.get_order() === "bird")
                ? translate("birdsong.conspiracy.recruit.bird.html")
                : translate("birdsong.conspiracy.recruit.html")
            return base + "<br>" + translate("daylight.conspiracy.thickens.html");
        }
        if (this.get_step() === "daylight.conspiracy.battle" && this.get_order() === "bird") {
            return "daylight.conspiracy.battle.bird.html";
        }
        if (this.get_step() === "daylight.conspiracy.move" && this.get_order() === "bird") {
            return "daylight.conspiracy.move.bird.html";
        }
        if (this.get_step() === "daylight.conspiracy.plot" && this.get_order() === "bird") {
            return "daylight.conspiracy.plot.bird.html";
        }

        return super.get_step_html();
    }
}
