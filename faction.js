import translate from "./messages.js";

export default class Faction
{
    new_turn()
    {
        this.state = this.get_first_game_state();
        this.order = "";
    }

    get_states()
    {
        throw new Error('Not implemented!');
    }

    get_first_game_state() { return 1; }

    constructor()
    {
        this.class_name = this.constructor.name
        this.new_turn();
        this.state = 0;
        this.order = "";
    }

    name()
    {
        return "";
    }

    abilities()
    {
        return [
            "ability.poor-manual-dexterity",
            "ability.hates-surprises"
        ]
    }

    ability_html(ability)
    {
        return translate(ability+".html");
    }

    title_foreground()
    {
        return "transparent"
    }

    title_background()
    {
        return "transparent"
    }

    get_order()
    {
        return this.order;
    }

    get_phase()
    {
        var idx = this.get_step().indexOf('.');
        return this.get_step().substr(0, idx);
    }

    get_state()
    {
        return this.state;
    }

    get_step_at(index)
    {
        return this.get_states()[index];
    }

    get_step()
    {
        return this.get_step_at(this.state);
    }

    get_step_html()
    {
         return this.get_step()+".html";
    }

    can_go_back()
    {
        if (this.state < this.get_first_game_state())
        {
            return this.state > 0
        }
        else
        {
            return this.state > this.get_first_game_state();
        }
    }

    can_advance()
    {
        if (this.get_step() === "birdsong.default.set-order")
        {
            return this.order !== "";
        }

        return true;
    }

    next_step()
    {
        if (this.state+1 === this.get_first_game_state())
        {
            return "start-playing";
        }

        if (this.state+1 === this.get_states().length)
        {
            return "next-turn";
        }

        return this.get_step_at(this.state+1);
    }

    advance(delta)
    {
        this.state+=delta;
        if (this.state < 0 || this.state >= this.get_states().length)
        {
            this.new_turn();
        }
    }

    update_order()
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

    after_update()
    {
        if (this.get_step() === "birdsong.default.set-order") {
            this.update_order()
        }
    }
}
