export default class NullFaction
{
    constructor()
    {

    }

    name()
    {
        return "";
    }

    abilities()
    {
        return []
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
        return "";
    }

    get_step()
    {
        return "";
    }

    get_step_html()
    {
        return "";
    }

    can_go_back()
    {
        return false;
    }

    can_advance()
    {
        return false;
    }

    next_step()
    {
        return "";
    }

    advance(delta)
    {

    }

    after_update()
    {

    }
}
