import * as wasm from "./web_repl_bg.wasm";
import { __wbg_set_wasm } from "./web_repl_bg.js";
__wbg_set_wasm(wasm);
export * from "./web_repl_bg.js";
