import init, { setup, run } from "./wasm/web_repl.js"
/** @typedef {import('./wasm/web_repl.js').State} State */

let state;

/** @returns {Promise<State>} */
function get_state() {
    let promise = new Promise((resolve, reject) => {
        if (state === undefined) {
            init().then(_ => {
                console.log("setup");
                state = setup();
                resolve(state);
            }).catch((r) => reject(r))
        } else {
            resolve(state);
        }
    });
    return promise;
}


document.getElementById("terminal").onsubmit = async (ev) => {

    ev.stopImmediatePropagation();
    ev.preventDefault();

    let code = document.getElementById("terminal_input").value;

    let output = document.getElementById("output");


    if (code === "clear") {
        output.innerHTML = "Type 'clear' to clear output.<br>";
        document.getElementById("terminal_input").value = "";
        return;
    }

    let out = run(code, await get_state());


    let code_history = document.createElement("span");
    code_history.textContent = " > " + code;
    output.appendChild(code_history);
    output.appendChild(document.createElement("br"));
    let result = document.createElement("span");
    result.textContent = out;
    output.appendChild(result);
    output.appendChild(document.createElement("br"));

    output.scrollTop = output.scrollHeight;

    document.getElementById("terminal_input").value = "";

}
