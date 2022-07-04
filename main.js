import translate   from "./messages.js";
import NullFaction from "./null-faction.js";
import Cats        from "./cats.js";
import Eyrie       from "./eyrie.js";
import Alliance    from "./alliance.js";
import Vagabot     from "./vagabot.js";
import Lizards     from "./lizards.js";
import Riverfolk   from "./riverfolk.js";
import Duchy       from "./duchy.js";
import Conspiracy  from "./conspiracy.js";

var current_faction_name = localStorage.getItem('current_faction_name');
var current_factions_str = localStorage.getItem('current_factions');
console.log(current_faction_name)
console.log(current_factions_str)

var factions = []
var current_faction = null;

if (current_faction_name && current_factions_str)
{
    var current_factions_state = JSON.parse(current_factions_str);
    if (current_factions_state)
    {
        factions = [];
        for (let faction_state of current_factions_state)
        {
            var faction = eval("new " + faction_state.class_name + "()");//new this[current_faction_name]()
            console.log(faction_state.class_name);
            for (let [key, value] of Object.entries(faction_state))
            {
                faction[key] = value
            }
            console.log(JSON.stringify(faction))
            factions.push(faction)
            if (faction.name() === current_faction_name)
            {
                current_faction = faction;
            }
        }
    }
}

function save_state()
{
    localStorage.setItem('current_faction_name', current_faction.name());
    localStorage.setItem('current_factions', JSON.stringify(factions));
}

function select_new_faction()
{
    document.getElementById("select-faction-message").replaceChildren(document.createTextNode(translate("select-faction-message")))
    var modal = document.getElementById("faction-modal-box");
    modal.style.display = "block";

    var confirm_button = document.getElementById("game-start");
    confirm_button.replaceChildren(document.createTextNode(translate("game-start")))
    confirm_button.onclick = function() {

        factions = [];
        for (let selector of document.getElementsByClassName("faction-selector"))
        {
            if (selector.checked) factions.push(eval("new " + selector.id + "()"));
        }

        if (factions.length > 0)
        {
            console.log("Selecting: "+JSON.stringify(factions))
            current_faction = factions[0]
            modal.style.display = "none";
            save_state()
            update()
        }
    }
}

function toggle_abilities()
{
    var panel = document.getElementById('faction-title').nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = (panel.scrollHeight + 30) + "px";
    }
}

function advance_state(delta)
{
    current_faction.advance(delta);

    if (current_faction.get_state() === current_faction.get_first_game_state())
    {
        var i = factions.indexOf(current_faction);
        i = (i+1) % factions.length
        current_faction = factions[i]
    }

    save_state();
    update();

    document.getElementById('faction-title').nextElementSibling.style.maxHeight = null;
}

function update()
{
    if ( ! current_faction )
    {
        select_new_faction()
    }

    window.current_faction = current_faction;

    {
        var faction_title = document.createElement("p");
        faction_title.className = "no-margin";
        faction_title.appendChild(document.createTextNode(translate(current_faction.name())));

        var faction_icon = document.createElement("img");
        faction_icon.className = "faction-icon";
        faction_icon.src = "./images/"+current_faction.name()+".png";
        faction_title.appendChild(faction_icon)

        var faction_title_contents = document.getElementById('faction-title');
        faction_title_contents.replaceChildren(faction_title)
        faction_title_contents.style.color = current_faction.title_foreground();
        faction_title_contents.style.background = current_faction.title_background();
    }

    {
        document.getElementById('faction-abilities').replaceChildren([])

        var div = document.createElement("div");
        div.className = "navbar";
        document.getElementById('faction-abilities').appendChild(div);

        var reset = document.createElement("a");
        div.appendChild(reset);
        reset.href = "#";
        reset.className = "button3";
        reset.appendChild(document.createTextNode(translate("restart")));
        reset.addEventListener('click', function () {
            var modal = document.getElementById("modal-box");
            modal.style.display = "block";

            document.getElementById("modal-message").replaceChildren(document.createTextNode(translate("restart-question")))

            var close_button = document.getElementById("modal-close")
            close_button.replaceChildren(document.createTextNode(translate("no")))
            close_button.onclick = function() {
                modal.style.display = "none";
                document.getElementById('faction-title').nextElementSibling.style.maxHeight = null;
            }

            var confirm_button = document.getElementById("modal-confirm");
            confirm_button.replaceChildren(document.createTextNode(translate("yes")))
            confirm_button.onclick = function() {
                modal.style.display = "none";
                document.getElementById('faction-title').nextElementSibling.style.maxHeight = null;
                current_faction = new NullFaction();
                window.localStorage.clear();
                update();
                select_new_faction();
            }
        });

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
            ability_text.innerHTML = current_faction.ability_html(ability);
            div.appendChild(ability_text);
        }
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

    document.getElementById('next-step-button').text = "⊳ " + translate(current_faction.next_step());


    document.getElementById('next-step-button').style.display = (current_faction.can_advance() ? "block" : "none");
    document.getElementById('prev-step-button').style.display = (current_faction.can_go_back() ? "block" : "none");

    current_faction.after_update()
}

window.perform_update = update;

document.getElementById('prev-step-button').addEventListener('click', function (){ advance_state(-1) });
document.getElementById('next-step-button').addEventListener('click', function (){ advance_state(+1) });


document.getElementById('faction-title').addEventListener("click", function() {
    toggle_abilities()
});

{
    !function(t,e){"use strict";"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(t,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var a=e.createEvent("CustomEvent");return a.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),a},t.CustomEvent.prototype=t.Event.prototype),e.addEventListener("touchstart",function(t){if("true"===t.target.getAttribute("data-swipe-ignore"))return;s=t.target,r=Date.now(),n=t.touches[0].clientX,a=t.touches[0].clientY,u=0,i=0},!1),e.addEventListener("touchmove",function(t){if(!n||!a)return;var e=t.touches[0].clientX,r=t.touches[0].clientY;u=n-e,i=a-r},!1),e.addEventListener("touchend",function(t){if(s!==t.target)return;var e=parseInt(l(s,"data-swipe-threshold","20"),10),o=parseInt(l(s,"data-swipe-timeout","500"),10),c=Date.now()-r,d="",p=t.changedTouches||t.touches||[];Math.abs(u)>Math.abs(i)?Math.abs(u)>e&&c<o&&(d=u>0?"swiped-left":"swiped-right"):Math.abs(i)>e&&c<o&&(d=i>0?"swiped-up":"swiped-down");if(""!==d){var b={dir:d.replace(/swiped-/,""),touchType:(p[0]||{}).touchType||"direct",xStart:parseInt(n,10),xEnd:parseInt((p[0]||{}).clientX||-1,10),yStart:parseInt(a,10),yEnd:parseInt((p[0]||{}).clientY||-1,10)};s.dispatchEvent(new CustomEvent("swiped",{bubbles:!0,cancelable:!0,detail:b})),s.dispatchEvent(new CustomEvent(d,{bubbles:!0,cancelable:!0,detail:b}))}n=null,a=null,r=null},!1);var n=null,a=null,u=null,i=null,r=null,s=null;function l(t,n,a){for(;t&&t!==e.documentElement;){var u=t.getAttribute(n);if(u)return u;t=t.parentNode}return a}}(window,document);

    document.addEventListener('swiped-left', function(e) {
        if (current_faction.can_advance()) advance_state(+1);
    });

    document.addEventListener('swiped-right', function(e) {
        if (current_faction.can_go_back()) advance_state(-1);
    });

//    document.addEventListener('swiped-down', function(e) {
//        var panel = document.getElementById('faction-title').nextElementSibling;
//        panel.style.maxHeight = panel.scrollHeight + "px";
//    });

//    document.addEventListener('swiped-up', function(e) {
//        var panel = document.getElementById('faction-title').nextElementSibling;
//        panel.style.maxHeight = null;
//    });
}

update();
