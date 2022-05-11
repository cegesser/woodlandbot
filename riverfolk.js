export default class Riverfolk
{
    constructor()
    {
        this.states = [
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
        this.first_game_state=1;

        this.state = 0;
        this.order = "";
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
            "ability.poor-manual-dexterity",
            "ability.hates-surprises",
            "ability.market",
            "ability.trade-posts"
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

    get_order()
    {
        return this.order;
    }

    get_phase()
    {
        var idx = this.states[this.state].indexOf('.');
        return this.states[this.state].substr(0, idx);
    }

    get_step()
    {
        return this.states[this.state];
    }

    get_step_html()
    {
        if (this.states[this.state] === "daylight.build-and-garrison" && this.order === "bird")
        {
            return "daylight.build-and-garrison.bird.html";
        }

        if (this.states[this.state] === "daylight.recruit" && this.order === "bird")
        {
            return "daylight.recruit.bird.html";
        }

        if (this.states[this.state] === "daylight.organize" && ! this.shield_condition && ! this.sword_condition)
        {
            return "daylight.organize.empty.html";
        }

        if (this.states[this.state] === "daylight.battle" && this.shield_condition)
        {
            return "daylight.battle.shield.html";
        }

        if (this.states[this.state] === "daylight.battle" && this.sword_condition)
        {
            return (this.order === "bird")
                ? "daylight.battle.shield.html"
                : "daylight.battle.sword.html";
        }

        if (this.states[this.state] === "evening.racketeering" && ! this.shield_condition && ! this.sword_condition)
        {
            return "evening.racketeering.empty.html";
        }

        if (this.states[this.state] === "evening.discard" && this.shield_condition)
        {
            return "evening.discard.shield.html";
        }

        return this.states[this.state]+".html";
    }

    can_go_back()
    {
        if (this.state < this.first_game_state)
        {
            return this.state > 0
        }
        else
        {
            return this.state > this.first_game_state;
        }
    }

    can_advance()
    {
        if (this.states[this.state] === "birdsong.set-order")
        {
            return this.order !== "";
        }

        return true
    }

    next_step()
    {
        if (this.state+1 === this.first_game_state)
        {
            return "start-playing";
        }

        if (this.state+1 === this.states.length)
        {
            return "next-turn";
        }

        return this.states[this.state + 1];
    }

    advance(delta)
    {
        this.state+=delta;
        if (this.state < 0 || this.state >= this.states.length)
        {
            this.state = this.first_game_state;
            this.order = "";
            this.shield_condition = false;
            this.sword_condition = false;
        }
    }

    after_update()
    {
        if (this.states[this.state] === "birdsong.set-order")
        {
            var radios = [document.getElementById('fox'),
                          document.getElementById('mouse'),
                          document.getElementById('bunny'),
                          document.getElementById('bird')]

            var self = this;

            for (var radio of radios)
            {
                radio.checked = (radio.id === this.order);
                let suit = radio.id
                radio.addEventListener('click', function(){ self.order = suit; window.perform_update(); } );
            }
        }

        if (this.states[this.state] === "daylight.check-for-protectionism")
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
