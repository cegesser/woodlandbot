import Faction from "./faction.js";
import translate from "./messages.js";

export default class Eyrie extends Faction
{
    static states = [
        "setup.eyrie",
        "birdsong.default.set-order",
        "birdsong.default.caft",
        "birdsong.eyrie.add-to-decree",
        "birdsong.eyrie.a-new-roost",
        "daylight.eyrie.recruit",
        "daylight.eyrie.move",
        "daylight.eyrie.battle",
        "daylight.eyrie.build",
        "evening.eyrie.score",
    ]

    get_states() { return Eyrie.states; }

    new_turn()
    {
        super.new_turn();
    }

    constructor()
    {
        super();

        this.decree = {};
        this.decree["fox"] = 0;
        this.decree["mouse"] = 0;
        this.decree["bunny"] = 0;
        this.decree["bird"] = 2;
    }

    name()
    {
        return "eyrie";
    }

    abilities()
    {
        return [
            "ability.the-decree",
            "ability.lords-of-the-forest",
            "ability.poor-manual-dexterity",
            "ability.hates-surprises",
        ]
    }

    ability_html(ability)
    {
        if (ability === "ability.the-decree")
        {
            return super.ability_html(ability)
                .replace("#{fox}", this.decree["fox"])
                .replace("#{mouse}", this.decree["mouse"])
                .replace("#{bunny}", this.decree["bunny"])
                .replace("#{bird}", this.decree["bird"]);
        }

        return super.ability_html(ability)
    }

    title_foreground()
    {
        return "rgb(251, 253, 255)"
    }

    title_background()
    {
        return "rgb(72, 131, 196)"
    }

    get_value(key) {
        return super.get_value(key)
    }

    adjust(suit)
    {
        return translate(this.get_step()+".html").replaceAll("#{suit}", translate(suit)).replaceAll("#{n}", "<b>"+this.decree[suit]+"</b>")
    }

    get_step_html()
    {
        if (this.get_step() === "daylight.eyrie.recruit") {
            var base = "";
            if (this.decree["fox"] > 0)
            {
                base += this.adjust("fox") + "<br><br>"
            }
            if (this.decree["mouse"] > 0)
            {
                base += this.adjust("mouse") + "<br><br>"
            }
            if (this.decree["bunny"] > 0)
            {
                base += this.adjust("bunny") + "<br><br>"
            }
            if (this.decree["bird"] > 0)
            {
                base += this.adjust("bird") + "<br><br>"
            }

            return base
        }

        if (this.get_step() === "daylight.eyrie.move") {
            var base = "";
            if (this.decree["fox"] > 0)
            {
                base += this.adjust("fox") + "<br><br>"
            }
            if (this.decree["mouse"] > 0)
            {
                base += this.adjust("mouse") + "<br><br>"
            }
            if (this.decree["bunny"] > 0)
            {
                base += this.adjust("bunny") + "<br><br>"
            }
            if (this.decree["bird"] > 0)
            {
                base += this.adjust("bird") + "<br><br>"
            }

            return base
        }

        if (this.get_step() === "daylight.eyrie.battle") {
            var base = "";
            if (this.decree["fox"] > 0)
            {
                base += this.adjust("fox")
                if (this.decree["fox"] > this.decree["mouse"] && this.decree["fox"] > this.decree["bunny"] && this.decree["fox"] > this.decree["bird"])
                {
                    base += translate("daylight.eyrie.battle.extra.html")
                }
                base += "<hr>"
            }
            if (this.decree["mouse"] > 0)
            {
                base += this.adjust("mouse")
                if (this.decree["mouse"] > this.decree["fox"] && this.decree["mouse"] > this.decree["bunny"] && this.decree["mouse"] > this.decree["bird"])
                {
                    base += translate("daylight.eyrie.battle.extra.html")
                }
                base += "<hr>"
            }
            if (this.decree["bunny"] > 0)
            {
                base += this.adjust("bunny")
                if (this.decree["bunny"] > this.decree["fox"] && this.decree["bunny"] > this.decree["mouse"] && this.decree["bunny"] > this.decree["bird"])
                {
                    base += translate("daylight.eyrie.battle.extra.html")
                }
                base += "<hr>"
            }
            if (this.decree["bird"] > 0)
            {
                base += this.adjust("bird")
                if (this.decree["bird"] > this.decree["fox"] && this.decree["bird"] > this.decree["mouse"] && this.decree["bird"] > this.decree["bunny"])
                {
                    base += translate("daylight.eyrie.battle.extra.html")
                }
                base += "<hr>"
            }

            return base
        }
        if (this.get_step() === "daylight.eyrie.build") {
            return this.adjust("bird")
        }



        return super.get_step_html();
    }

    next_step()
    {
        return super.next_step()
    }

    advance(delta)
    {
        super.advance(delta)

        if (this.get_step() === "birdsong.default.caft")
        {
            this.decree[this.get_order()] += 1
        }
    }


    after_update()
    {
        super.after_update()

        if (this.get_step() === "daylight.eyrie.build") {
            var turmoil = document.getElementById('turmoil');
            var self = this;
            turmoil.addEventListener('click', function(){
                self.decree["fox"] = 0;
                self.decree["mouse"] = 0;
                self.decree["bunny"] = 0;
                self.decree["bird"] = 2;
                turmoil.parentNode.removeChild(turmoil);
            } );
        }

        onclick='console.log(42)'
    }
}
