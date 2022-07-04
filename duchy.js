import Faction from "./faction.js";
import translate from "./messages.js";

export default class Duchy extends Faction
{
    static states = [
        "setup.duchy",
        "birdsong.default.set-order",
        "birdsong.default.caft",
        "birdsong.duchy.recruit",
        "daylight.duchy.dig",
        "daylight.duchy.battle",
        "daylight.duchy.build",
        "daylight.duchy.ministers",
        "evening.duchy.rally",
        "evening.duchy.score",
        "evening.duchy.sway",
        "evening.default.discard",
    ]

    get_states() { return Duchy.states; }

    get_first_game_state() { return 1; }

    new_turn()
    {
        super.new_turn();
    }

    constructor()
    {
        super();
        this.ministers = [];
    }

    name()
    {
        return "duchy";
    }

    abilities()
    {
        return [
            "ability.minister-selector",
            "ability.the-burrow",
            "ability.cost-of-errors",
            "ability.poor-manual-dexterity",
            "ability.hates-surprises",
        ]
    }

    title_foreground()
    {
        return "rgb(240, 241, 241)"
    }

    title_background()
    {
        return "rgb(198, 169, 151)"
    }

    get_step_html()
    {
        if (this.get_step() === "birdsong.duchy.recruit" && this.ministers.indexOf("foremole") > -1)
        {
            return translate("birdsong.duchy.recruit.html")
              + "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.foremole.html");
        }
        if (this.get_step() === "daylight.duchy.dig" && this.get_order() === "bird")
        {
            return "daylight.duchy.dig.bird.html";
        }
        if (this.get_step() === "daylight.duchy.battle")
        {
            var base = (this.get_order() === "bird")
                       ? translate("daylight.duchy.battle.bird.html")
                       : translate("daylight.duchy.battle.html");

            if (this.ministers.indexOf("captain") > -1)
            {
                base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.captain.html");
            }

            return base;
        }
        if (this.get_step() === "daylight.duchy.ministers")
        {
            var base = translate("daylight.duchy.ministers.html")
            if (this.ministers.indexOf("marshall") > -1)  base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.marshall.html")
            if (this.ministers.indexOf("brigadier") > -1) base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.brigadier.html")
            if (this.ministers.indexOf("banker") > -1)    base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.banker.html")
            if (this.ministers.indexOf("mayor") > -1)     base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.mayor.html")
            if (this.ministers.indexOf("earl") > -1)      base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.earl.html")
            if (this.ministers.indexOf("baron") > -1)     base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.baron.html")
            if (this.ministers.indexOf("duchess") > -1)   base += "<br><img src='./images/crown.png' class='intext'> " + translate("duchy.ministers.duchess.html")

            return base;
        }
        if (this.get_step() === "evening.duchy.rally" && this.get_order() === "bird")
        {
            return "evening.duchy.rally.bird.html";
        }
        if (this.get_step() === "evening.duchy.sway")
        {
            var base = (this.get_order() === "bird")
                       ? translate("evening.duchy.sway.bird.html")
                       : translate("evening.duchy.sway.html");
            return base;
        }

        return super.get_step_html();
    }

    after_update()
    {
        //if (this.get_step() === "evening.duchy.sway")
        {
            var self = this;
            for (var checkbox of document.getElementsByClassName('minister-selection-checkbox'))
            {
                if (this.ministers.indexOf(checkbox.id) > -1) {
                    checkbox.checked = true;
                }

                checkbox.addEventListener('change', function(event){
                    var checkbox = event.target;
                    if (checkbox.checked) {
                        self.ministers.push(checkbox.id)
                    }
                    else {
                        var index = self.ministers.indexOf(checkbox.id);
                        if (index > -1) {
                            self.ministers.splice(index, 1);
                        }
                    }
                    window.perform_update();
                } );
            }
        }

        super.after_update()
    }
}
