import tr from "./messages.json" assert { type: "json" };

export default function translate(input)
{
    var content = tr[input]

    if ( ! content )
    {
        return input;
    }

    var result = (Array.isArray(content) ? content.join('') : content);

    if (result.includes("${order}"))
    {
        var order = tr[window.current_faction.get_order()]
        return result.replaceAll("${order}", order)
    }
    if (result.includes("${ordered-building}"))
    {
        var value = tr[window.current_faction.get_value("ordered-building")]
        return result.replaceAll("${ordered-building}", value)
    }
    if (result.includes("${ritual-suit}"))
    {
        var suit = tr[window.current_faction.get_ritual_suit()]
        return result.replaceAll("${ritual-suit}", suit)
    }
    if (result.includes("${suit-selector}"))
    {
        let selector = [
        "<div class='suit-selector'>",
        "<label class='suit-label'><input type='radio' id='fox'><img class='suit-img' src='./images/fox.png'></label>",
        "<label class='suit-label'><input type='radio' id='mouse'><img class='suit-img' src='./images/mouse.png'></label>",
        "<label class='suit-label'><input type='radio' id='bunny'><img class='suit-img' src='./images/bunny.png'></label>",
        "<label class='suit-label'><input type='radio' id='bird'><img class='suit-img' src='./images/bird.png'></label>",
        "</div>"].join('');
        return result.replaceAll("${suit-selector}", selector)
    }


    return result;
}
