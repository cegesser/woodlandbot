import Faction from "./faction.js";

export default class Riverfolk extends Faction
{
    static states = [
        "setup.riverfolk",
        "birdsong.stock-the-market",
        "birdsong.craft",
        "birdsong.set-order",
        "daylight.build-and-garrison",
        "daylight.recruit",
        "daylight.check-for-protectionism",
        "daylight.organize",
        "daylight.battle",
        "evening.score",
        "evening.racketeering",
        "evening.discard",
    ]

    get_states() { return Riverfolk.states; }

    get_first_game_state() { return 1; }

    new_turn()
    {
        super.new_turn();
        this.shield_condition = false;
        this.sword_condition = false;
    }

    name()
    {
        return "riverfolk";
    }

    abilities()
    {
        return [
            "ability.market",
            "ability.trade-posts",
            "ability.poor-manual-dexterity",
            "ability.hates-surprises",
        ]
    }

    title_foreground()
    {
        return "white"
    }

    title_background()
    {
        return "rgb(102, 198, 194)"
    }


    get_step_html()
    {
        if (this.get_step() === "daylight.build-and-garrison" && this.order === "bird")
        {
            return "daylight.build-and-garrison.bird.html";
        }

        if (this.get_step() === "daylight.recruit" && this.order === "bird")
        {
            return "daylight.recruit.bird.html";
        }

        if (this.get_step() === "daylight.organize"  )
        {
            if ( ! this.shield_condition && ! this.sword_condition ) {
                return "daylight.organize.empty.html";
            }
            if ( this.sword_condition ) {
                return "daylight.organize.sword.html";
            }
        }

        if (Riverfolk.states[this.state] === "daylight.battle" && this.shield_condition)
        {
            return "daylight.battle.shield.html";
        }

        if (Riverfolk.states[this.state] === "daylight.battle" && this.sword_condition)
        {
            return (this.order === "bird")
                ? "daylight.battle.sword.bird.html"
                : "daylight.battle.sword.html";
        }

        if (Riverfolk.states[this.state] === "evening.racketeering" && ! this.shield_condition && ! this.sword_condition)
        {
            return "evening.racketeering.empty.html";
        }

        if (Riverfolk.states[this.state] === "evening.discard" && this.shield_condition)
        {
            return "evening.discard.shield.html";
        }

        return super.get_step_html();
    }

    can_advance()
    {
        if (Riverfolk.states[this.state] === "birdsong.set-order")
        {
            return this.order !== "";
        }

        return super.can_advance()
    }

    after_update()
    {
        if (Riverfolk.states[this.state] === "birdsong.set-order")
        {
            super.update_order()
        }

        if (Riverfolk.states[this.state] === "daylight.check-for-protectionism")
        {
            var shield_check = document.getElementById('shield');
            var sword_check = document.getElementById('sword');

            shield_check.checked = this.shield_condition;
            sword_check.checked = this.sword_condition;

            var self = this;

            shield_check.addEventListener('change', function(){ self.shield_condition = shield_check.checked; window.perform_update(); } );
            sword_check.addEventListener('change', function(){ self.sword_condition = sword_check.checked; window.perform_update(); } );
        }
    }
}
