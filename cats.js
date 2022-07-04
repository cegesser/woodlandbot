import Faction from "./faction.js";
import translate from "./messages.js";

export default class Cats extends Faction
{
    static states = [
        "setup.cats",
        "birdsong.default.set-order",
        "birdsong.default.caft",
        "daylight.cats.batle",
        "daylight.cats.recruit",
        "daylight.cats.build",
        "daylight.cats.move",
        "daylight.cats.expand",
        "evening.cats.score",
        "evening.default.discard",
    ]

    get_states() { return Cats.states; }

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
        return "cats";
    }

    abilities()
    {
        return [
            "ability.the-keep",
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
        return "rgb(221, 93, 29)"
    }

    get_value(key) {
        if (this.get_order() === "fox") {
            return "cats.sawmill";
        }
        if (this.get_order() === "bunny") {
            return "cats.workshop";
        }
        if (this.get_order() === "mouse") {
            return "cats.recruiter";
        }
        return super.get_value(key)
    }

    get_step_html()
    {
        if (this.get_step() === "daylight.cats.batle" && this.get_order() === "bird") {
            return "daylight.cats.batle.bird.html";
        }
        if (this.get_step() === "daylight.cats.recruit" && this.get_order() === "bird") {
            return "daylight.cats.recruit.bird.html";
        }
        if (this.get_step() === "daylight.cats.build" && this.get_order() === "bird") {
            return "daylight.cats.build.bird.html";
        }
        if (this.get_step() === "daylight.cats.move") {
            if (this.get_order() === "bird") {
                return "daylight.cats.move.bird.html";
            }
//            else {
//                var base = translate("daylight.cats.move.html")
//                if ( ! this.expanded )
//                {
//                    base += "<br><br>" + translate("daylight.cats.expand.html")
//                }
//                return base;
//            }
        }
        if (this.get_step() === "evening.cats.score" && this.get_order() === "bird") {
            return "evening.cats.score.bird.html";
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
