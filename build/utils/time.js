"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.start = void 0;
let startTime, endTime;
function start() {
    startTime = performance.now();
}
exports.start = start;
;
function end() {
    endTime = performance.now();
    let seconds = Math.round((endTime - startTime) / 1000);
    return seconds;
}
exports.end = end;
