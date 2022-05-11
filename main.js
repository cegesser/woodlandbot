import tr from "./messages.json" assert { type: "json" };
import Riverfolk from "./riverfolk.js";

var current_faction = new Riverfolk();

function translate(input)
{
    var content = tr[input]

    var result = (Array.isArray(content) ? content.join('') : content);

    if (result.includes("${order}"))
    {
        var order = tr[current_faction.get_order()]
        return result.replaceAll("${order}", order)
    }

    return result;
}

function advance_state(delta)
{
    current_faction.advance(delta);
    update();
}

function update()
{
    {
        var faction_title = document.createElement("p");
        faction_title.className = "no-margin";
        faction_title.appendChild(document.createTextNode(translate(current_faction.name())));

        var faction_title_contents = document.getElementById('faction-title');
        faction_title_contents.replaceChildren(faction_title)
        faction_title_contents.style.color = current_faction.title_foreground();
        faction_title_contents.style.background = current_faction.title_background();
    }

    document.getElementById('faction-abilities').replaceChildren([])
    for (var ability of current_faction.abilities())
    {
        var div = document.createElement("div");
        document.getElementById('faction-abilities').appendChild(div);

        var ability_title = document.createElement("p");
        ability_title.className = "title";
        ability_title.appendChild(document.createTextNode(translate(ability)));
        div.appendChild(ability_title);

        var ability_text = document.createElement("p");
        ability_text.className = "content";
        ability_text.appendChild(document.createTextNode(translate(ability+".html")));
        div.appendChild(ability_text);
    }


    {
        var day_phase = document.createElement("p");
        day_phase.className = "no-margin";
        day_phase.appendChild(document.createTextNode(translate(current_faction.get_phase())));

        document.getElementById('day-phase').replaceChildren(day_phase);
        document.getElementById('day-phase').className = "day-phase " + current_faction.get_phase();
    }


    {
        var phase_step = document.createElement("div");
        document.getElementById('phase-step').replaceChildren(phase_step);

        var div = document.createElement("div");

        var step = document.createElement("p");
        step.className = "step title";
        step.appendChild(document.createTextNode(translate(current_faction.get_step())));
        phase_step.appendChild(step);

        var content = document.createElement("p");
        content.className = "content";
        content.innerHTML = translate(current_faction.get_step_html());
        phase_step.appendChild(content);
    }

    document.getElementById('prev-step-button').text = translate("prev-step");
    document.getElementById('next-step-button').text = translate(current_faction.next_step());


    document.getElementById('next-step-button').style.display = (current_faction.can_advance() ? "block" : "none");
    document.getElementById('prev-step-button').style.display = (current_faction.can_go_back() ? "block" : "none");

    current_faction.after_update()
}

window.perform_update = update;

document.getElementById('prev-step-button').addEventListener('click', function (){ advance_state(-1) });
document.getElementById('next-step-button').addEventListener('click', function (){ advance_state(+1) });


document.getElementById('faction-title').addEventListener("click", function() {
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
});

update();
