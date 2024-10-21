"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInstanceId = void 0;
const os_1 = require("os");
function generateInstanceId() {
    let info;
    try {
        info = (0, os_1.userInfo)();
    }
    catch (e) {
        // unable to read info;
    }
    const prefix = info
        ? info.username
        : `generated-${Math.round(Math.random() * 1000000)}-${process.pid}`;
    return `${prefix}-${(0, os_1.hostname)()}`;
}
exports.generateInstanceId = generateInstanceId;
//# sourceMappingURL=util.js.map