"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const app_1 = require("./app");
function start(opt = {}) {
    const port = process.env.PORT || process.env.PROXY_PORT || 3000;
    const app = (0, app_1.createApp)(opt);
    app.listen(port, () => 
    // eslint-disable-next-line no-console
    console.log(`Unleash-proxy is listening on port ${port}!`));
    return app;
}
exports.start = start;
//# sourceMappingURL=server.js.map