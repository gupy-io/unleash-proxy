"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const config_1 = require("../config");
const logger_1 = require("../logger");
const unleash_mock_1 = __importDefault(require("./unleash.mock"));
test('should add environment to isEnabled calls', () => {
    let unleashSDK;
    const init = (opts) => {
        unleashSDK = new unleash_mock_1.default(opts);
        return unleashSDK;
    };
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'test',
        logLevel: logger_1.LogLevel.error,
    });
    config.disableMetrics = true;
    const client = new client_1.default(config, init);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    client.getEnabledToggles({});
    expect(fakeUnleash.contexts[0].environment).toBe('test');
    client.destroy();
});
test('should override environment to isEnabled calls', () => {
    let unleashSDK;
    const init = (opts) => {
        unleashSDK = new unleash_mock_1.default(opts);
        return unleashSDK;
    };
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'never-change-me',
        logLevel: logger_1.LogLevel.error,
    });
    config.disableMetrics = true;
    const client = new client_1.default(config, init);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    client.getEnabledToggles({ environment: 'some' });
    expect(fakeUnleash.contexts[0].environment).toBe('never-change-me');
    client.destroy();
});
test('should return all toggles', () => {
    let unleashSDK;
    const init = (opts) => {
        unleashSDK = new unleash_mock_1.default(opts);
        return unleashSDK;
    };
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'never-change-me',
        logLevel: logger_1.LogLevel.error,
    });
    config.disableMetrics = true;
    const client = new client_1.default(config, init);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-2',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-3',
        enabled: true,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    const result = client.getAllToggles({ environment: 'some' });
    expect(result.length).toBe(3);
    client.destroy();
});
test('should return default variant for disabled toggles', () => {
    let unleashSDK;
    const init = (opts) => {
        unleashSDK = new unleash_mock_1.default(opts);
        return unleashSDK;
    };
    const config = (0, config_1.createProxyConfig)({
        unleashApiToken: '123',
        unleashUrl: 'http://localhost:4242/api',
        proxySecrets: ['s1'],
        environment: 'never-change-me',
        logLevel: logger_1.LogLevel.error,
    });
    config.disableMetrics = true;
    const client = new client_1.default(config, init);
    const fakeUnleash = client.unleash;
    fakeUnleash.toggleDefinitions.push({
        name: 'test',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-2',
        enabled: false,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    fakeUnleash.toggleDefinitions.push({
        name: 'test-3',
        enabled: true,
        stale: false,
        strategies: [],
        variants: [],
        impressionData: true,
        type: 'experiment',
        project: 'default',
    });
    const result = client.getAllToggles({ environment: 'some' });
    expect(result.length).toBe(3);
    expect(result[0].variant?.name).toBe('disabled');
    expect(result[0].variant?.enabled).toBe(false);
    expect(result[1].variant?.name).toBe('disabled');
    expect(result[1].variant?.enabled).toBe(false);
    expect(result[2].variant?.name).toBe('disabled');
    expect(result[2].variant?.enabled).toBe(false);
    client.destroy();
});
//# sourceMappingURL=client.test.js.map