import Faction from "./faction.js";
import translate from "./messages.js";

export default class Alliance extends Faction
{
    static states = [
        "setup.alliance",
        "birdsong.default.set-order",
        "birdsong.default.caft",
        "birdsong.alliance.revolt",
        "daylight.alliance.spread-sympathy",
        "daylight.alliance.surprise-revolt",
        "daylight.alliance.public-pity",
        "evening.alliance.organize",
        "evening.alliance.recruit",
        "evening.default.discard",
    ]

    get_states() { return Alliance.states; }

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
        return "alliance";
    }

    abilities()
    {
        return [
            "ability.automated-ambush",
            "ability.automated-outrage",
            "ability.crackdown",
            "ability.poor-manual-dexterity",
        ]
    }

    title_foreground()
    {
        return "rgb(251, 253, 255)"
    }

    title_background()
    {
        return "rgb(81, 157, 38)"
    }

    get_step_html()
    {
        if (this.get_step() === "birdsong.alliance.revolt" && this.get_order() === "bird") {
            return "birdsong.alliance.revolt.bird.html";
        }
        if (this.get_step() === "daylight.alliance.spread-sympathy" && this.get_order() === "bird") {
            return "daylight.alliance.spread-sympathy.bird.html";
        }
        if (this.get_step() === "daylight.alliance.surprise-revolt" && this.get_order() === "bird") {
            return "daylight.alliance.surprise-revolt.bird.html";
        }

        return super.get_step_html();
    }

    next_step()
    {
        if (this.get_step() === "daylight.cats.move") {
            if (this.get_order() === "bird") {
                return this.get_states()[this.state+2];
            }
        }
        return super.next_step()
    }

    advance(delta)
    {
        super.advance(delta)
        if (this.get_step() === "daylight.cats.expand") {
            if (this.get_order() === "bird") {
                if (delta > 0) this.state+=1
                if (delta < 0) this.state-=1
            }
        }
    }


    after_update()
    {


        super.after_update()
    }
}
