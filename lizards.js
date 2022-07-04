import Faction from "./faction.js";
import translate from "./messages.js";

export default class Lizards extends Faction
{
    static states = [
        "setup.lizards",
        "birdsong.lizards.set-order",
        "birdsong.lizards.perform-conspiracies",
        "daylight.lizards.rituals",
        "evening.lizards.score",
        "evening.lizards.discard-lost-souls",
        "evening.lizards.return-revealed-cards",
        "evening.lizards.craft",
    ]

    get_states() { return Lizards.states; }

    get_first_game_state() { return 1; }

    new_turn()
    {
        super.new_turn();
        this.ritual_suit = "";
    }

    constructor()
    {
        super();
        this.conspiracy = 0;
        this.ritual_suit = "";
    }

    get_ritual_suit() {
        return this.ritual_suit;
    }

    name()
    {
        return "lizards";
    }

    abilities()
    {
        return [
            "ability.pilgrims",
            "ability.robot-revenge",
            "ability.gardens",
            "ability.lost-souls",
            "ability.poor-manual-dexterity",
            "ability.hates-surprises",
        ]
    }

    title_foreground()
    {
        return "rgb(119, 37, 16)"
    }

    title_background()
    {
        return "rgb(247, 239, 112)"
    }

    can_advance()
    {
        if (this.get_step() === "birdsong.lizards.set-order")
        {
            return this.order !== "";
        }

        return super.can_advance();
    }

    get_step_html()
    {
        if (this.get_step() === "birdsong.lizards.perform-conspiracies")
        {
            var html = translate("birdsong.lizards.perform-conspiracies.html")

            html += "<div class='navbar' id='advance-conspiracy'><a>⊳</a>";
            html += "<a class='lizard-conspiracy-name'>" + translate("lizards.conspiracies.convert") + "</a>";
            html += "<a class='lizard-conspiracy-name'>" + translate("lizards.conspiracies.crusade") + "</a>";
            html += "<a class='lizard-conspiracy-name'>" + translate("lizards.conspiracies.convert") + "</a>";
            html += "<a class='lizard-conspiracy-name'>" + translate("lizards.conspiracies.crusade") + "</a>";
            html += "<a class='lizard-conspiracy-name'>" + translate("lizards.conspiracies.sanctify") + "</a>";
            html += "</div>";

            var key = "lizards.conspiracies.sanctify";
            if (this.conspiracy == 0 || this.conspiracy == 2) {
                key = "lizards.conspiracies.convert";
            }
            else if (this.conspiracy == 1 || this.conspiracy == 3) {
                key = "lizards.conspiracies.crusade";
            }

            html += "<b>" + translate(key) + ":</b> ";
            if (this.get_order() == "bird") {
                html += translate(key + ".bird.html");
            }
            else {
                html += translate(key + ".html");
            }

            return html
        }
        else if (this.get_step() === "daylight.lizards.rituals") {
            var html = translate("daylight.lizards.rituals.html")
            if (this.ritual_suit !== "") {
                if (this.ritual_suit === "bird") {
                    html += translate("daylight.lizards.rituals.sacrifice.html")
                }
                else {
                    html += translate("daylight.lizards.rituals.recruit.html")
                }
            }
            return html;
        }
        else if (this.get_step() == "evening.lizards.score" && this.get_order() == "bird")
        {
            return "evening.lizards.score.bird.html";
        }

        return super.get_step_html();
    }

    after_update()
    {
        if (this.get_step() === "birdsong.lizards.set-order") {
            super.update_order()
        }
        else if (this.get_step() === "birdsong.lizards.perform-conspiracies") {
            var conspiracies = document.getElementsByClassName('lizard-conspiracy-name');
            conspiracies[this.conspiracy].className += " lizard-current-conspiracy-name"

            var advance = document.getElementById('advance-conspiracy');
            var self = this;
            advance.addEventListener('click', function(){
                ++self.conspiracy;
                if (self.conspiracy > 4) self.conspiracy = 0;
                window.perform_update();
            } );
        }
        else if (this.get_step() === "daylight.lizards.rituals") {
            var radios = [document.getElementById('fox'),
                          document.getElementById('mouse'),
                          document.getElementById('bunny'),
                          document.getElementById('bird')]

            var self = this;

            for (var radio of radios)
            {
                radio.checked = (radio.id === this.ritual_suit);
                let suit = radio.id
                radio.addEventListener('click', function(){ self.ritual_suit = suit; window.perform_update(); } );
            }
        }
    }
}
