"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
const app_1 = require("../app");
const client_mock_1 = __importDefault(require("./client.mock"));
const unleashUrl = 'http://localhost:4242/test';
const unleashApiToken = 'unleashApiToken';
const proxySecrets = ['proxySecrets'];
let app;
beforeEach(() => {
    app = (0, app_1.createApp)({ proxySecrets, unleashUrl, unleashApiToken, enableOAS: true }, new client_mock_1.default([]));
});
test('should serve the OpenAPI UI', async () => {
    const res = await (0, supertest_1.default)(app).get('/docs/openapi/').expect(200);
    const body = res.text;
    expect(body).toMatchSnapshot();
});
test('validate open api response', async () => {
    const res = await (0, supertest_1.default)(app).get('/docs/openapi.json').expect(200);
    await swagger_parser_1.default.validate(res.body);
});
test('should serve the OpenAPI spec', async () => (0, supertest_1.default)(app)
    .get('/docs/openapi.json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect((res) => {
    // The version field is not set when running jest without yarn/npm.
    delete res.body.info.version;
    // This test will fail whenever there's a change to the API spec.
    // If the change is intended, update the snapshot with `jest -u`.
    expect(res.body).toMatchSnapshot();
}));
//# sourceMappingURL=openapi.test.js.map