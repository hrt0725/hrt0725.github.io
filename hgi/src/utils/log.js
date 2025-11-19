export const logBack = window.console.log;
const logfuncs = []

export function addEvent(name, func) {
    logfuncs.push({ name: name, func: func });
};

export function removeEvent(name) {
    const index = logfuncs.findIndex(item => item.name === name);
    if (index > -1) {
        logfuncs.splice(index, 1);
    }
};

window.console.log = (data) => {
    logBack(data);
    for (let index = 0; index < logfuncs.length; index++) {
        logfuncs[index].func(data);
    }
}