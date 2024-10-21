"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const unleash_client_1 = require("unleash-client");
const config_1 = require("../config");
const https = __importStar(require("https"));
test('should require "unleashUrl', () => {
    const t = () => (0, config_1.createProxyConfig)({});
    expect(t).toThrow(TypeError);
    expect(t).toThrow('You must specify the unleashUrl option (UNLEASH_URL)');
});
test('should require "unleashApiToken', () => {
    const t = () => (0, config_1.createProxyConfig)({ unleashUrl: 'some' });
    expect(t).toThrow(TypeError);
    expect(t).toThrow('You must specify the unleashApiToken option (UNLEASH_API_TOKEN)');
});
test('should be valid options', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        proxySecrets: ['s1'],
    });
    expect(config.unleashUrl).toBe('some');
});
test('should set trust proxy', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        proxySecrets: ['s1'],
        trustProxy: true,
    });
    expect(config.trustProxy).toBe(true);
});
test('should set instanceId', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        unleashInstanceId: 'someId1',
        proxySecrets: ['s1'],
    });
    expect(config.unleashInstanceId).toBe('someId1');
});
test('should generate instanceId', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        proxySecrets: ['s1'],
    });
    expect(config.unleashInstanceId).toBeDefined();
    expect(config.unleashInstanceId.length).toBeGreaterThan(3);
});
test('should set trust proxy to "loopback"', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        proxySecrets: ['s1'],
        trustProxy: 'loopback',
    });
    expect(config.trustProxy).toBe('loopback');
});
test('should set trust proxy via env var', () => {
    process.env.TRUST_PROXY = 'true';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        proxySecrets: ['s1'],
    });
    expect(config.trustProxy).toBe(true);
    delete process.env.TRUST_PROXY;
});
test('should allow options via env', () => {
    process.env.UNLEASH_URL = 'some';
    process.env.UNLEASH_API_TOKEN = 'token';
    process.env.UNLEASH_PROXY_CLIENT_KEYS = 's1';
    process.env.UNLEASH_INSTANCE_ID = 'i1';
    const config = (0, config_1.createProxyConfig)({});
    expect(config.unleashUrl).toBe('some');
    expect(config.unleashApiToken).toBe('token');
    expect(config.clientKeys.length).toBe(1);
    expect(config.clientKeys[0]).toBe('s1');
    expect(config.unleashInstanceId).toBe('i1');
    // cleanup
    delete process.env.UNLEASH_URL;
    delete process.env.UNLEASH_API_TOKEN;
    delete process.env.UNLEASH_PROXY_CLIENT_KEYS;
    delete process.env.UNLEASH_INSTANCE_ID;
});
test('should allow old "UNLEASH_PROXY_SECRETS" option via env', () => {
    process.env.UNLEASH_URL = 'some';
    process.env.UNLEASH_API_TOKEN = 'token';
    process.env.UNLEASH_PROXY_SECRETS = 's1-token, s2-token';
    const config = (0, config_1.createProxyConfig)({});
    expect(config.unleashUrl).toBe('some');
    expect(config.unleashApiToken).toBe('token');
    expect(config.clientKeys.length).toBe(2);
    expect(config.clientKeys[0]).toBe('s1-token');
    expect(config.clientKeys[1]).toBe('s2-token');
    // cleanup
    delete process.env.UNLEASH_URL;
    delete process.env.UNLEASH_API_TOKEN;
    delete process.env.UNLEASH_PROXY_SECRETS;
});
test('should load custom activation strategy', () => {
    class TestStrat extends unleash_client_1.Strategy {
        constructor() {
            super('TestStrat');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isEnabled(parameters, context) {
            return true;
        }
    }
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
        customStrategies: [new TestStrat()],
    });
    expect(config.customStrategies?.length).toBe(1);
    if (config.customStrategies) {
        expect(config.customStrategies[0].name).toBe('TestStrat');
    }
    else {
        throw new Error('Expected custom strategy to be set!');
    }
});
test('should load custom activation strategy from file', () => {
    const base = path.resolve('');
    process.env.UNLEASH_CUSTOM_STRATEGIES_FILE = `${base}/src/examples/custom-strategies.js`;
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.customStrategies?.length).toBe(1);
    if (config.customStrategies) {
        expect(config.customStrategies[0].name).toBe('FromFile');
    }
    else {
        throw new Error('Expected custom strategy to be set!');
    }
    delete process.env.UNLEASH_CUSTOM_STRATEGIES_FILE;
});
test('should set namePrefix via options', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        namePrefix: 'somePrefix',
        clientKeys: ['s1'],
    });
    expect(config.namePrefix).toBe('somePrefix');
});
test('should set namePrefix via env', () => {
    process.env.UNLEASH_NAME_PREFIX = 'prefixViaEnv';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.namePrefix).toBe('prefixViaEnv');
    delete process.env.UNLEASH_CUSTOM_STRATEGIES_FILE;
});
test('should set storageProvider via options', () => {
    class FakeStorage {
        async set() {
            return void 0;
        }
        async get() {
            return void 0;
        }
    }
    const fakeStorage = new FakeStorage();
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        storageProvider: fakeStorage,
        clientKeys: ['s1'],
    });
    expect(config.storageProvider).toBe(fakeStorage);
});
test('should not set a storageProvider if none is in config', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.storageProvider).toBeUndefined();
});
test('should not set tags', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        proxySecrets: ['s1'],
    });
    expect(config.tags).toBeUndefined();
});
test('should set tags via opts', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        proxySecrets: ['s1'],
        tags: [{ name: 'simple', value: 'proxy' }],
    });
    expect(config.tags).toStrictEqual([{ name: 'simple', value: 'proxy' }]);
});
test('should not set tags with empty env var', () => {
    process.env.UNLEASH_TAGS = '';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.tags).toBeUndefined();
    delete process.env.UNLEASH_CUSTOM_STRATEGIES_FILE;
});
test('should set tags with env var', () => {
    process.env.UNLEASH_TAGS = 'simple:proxy, demo:test';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.tags).toStrictEqual([
        { name: 'simple', value: 'proxy' },
        { name: 'demo', value: 'test' },
    ]);
    delete process.env.UNLEASH_CUSTOM_STRATEGIES_FILE;
});
test('should read serverSideSdkConfig from env vars', () => {
    process.env.EXP_SERVER_SIDE_SDK_CONFIG_TOKENS = 'super1, super2';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.serverSideSdkConfig?.tokens).toStrictEqual([
        'super1',
        'super2',
    ]);
    delete process.env.EXP_SERVER_SIDE_SDK_CONFIG_TOKENS;
});
test('should read bootstrap from env vars', () => {
    process.env.EXP_BOOTSTRAP_URL = 'https://boostrap.unleash.run';
    process.env.EXP_BOOTSTRAP_AUTHORIZATION = 'AUTH-BOOTSTRAP';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.bootstrap).toStrictEqual({
        url: 'https://boostrap.unleash.run',
        urlHeaders: { Authorization: 'AUTH-BOOTSTRAP' },
    });
    delete process.env.EXP_BOOTSTRAP_URL;
    delete process.env.EXP_BOOTSTRAP_AUTHORIZATION;
});
test('should load cors origin and max age from env', () => {
    process.env.CORS_ORIGIN = 'https://my-custom-domain.com/test';
    process.env.CORS_METHODS = 'GET, POST';
    process.env.CORS_ALLOWED_HEADERS = 'X-Custom-Header';
    process.env.CORS_EXPOSED_HEADERS = 'ETag, X-Custom-Header';
    process.env.CORS_CREDENTIALS = 'true';
    process.env.CORS_MAX_AGE = '1234567';
    process.env.CORS_PREFLIGHT_CONTINUE = 'true';
    process.env.CORS_OPTIONS_SUCCESS_STATUS = '200';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.cors.origin).toBe('https://my-custom-domain.com/test');
    expect(config.cors.methods).toStrictEqual('GET, POST');
    expect(config.cors.allowedHeaders).toStrictEqual('X-Custom-Header');
    expect(config.cors.exposedHeaders).toStrictEqual('ETag, X-Custom-Header');
    expect(config.cors.credentials).toBe(true);
    expect(config.cors.maxAge).toBe(1234567);
    expect(config.cors.preflightContinue).toBe(true);
    expect(config.cors.optionsSuccessStatus).toBe(200);
    delete process.env.CORS_ORIGIN;
    delete process.env.CORS_METHODS;
    delete process.env.CORS_ALLOWED_HEADERS;
    delete process.env.CORS_EXPOSED_HEADERS;
    delete process.env.CORS_CREDENTIALS;
    delete process.env.CORS_MAX_AGE;
    delete process.env.CORS_PREFLIGHT_CONTINUE;
    delete process.env.CORS_OPTIONS_SUCCESS_STATUS;
});
test('should load cors options provided', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
        cors: {
            origin: ['https://test.com/x', 'http://example.com'],
            maxAge: 9876,
            optionsSuccessStatus: 418,
        },
    });
    expect(config.cors.origin).toStrictEqual([
        'https://test.com/x',
        'http://example.com',
    ]);
    expect(config.cors.maxAge).toBe(9876);
    expect(config.cors.optionsSuccessStatus).toBe(418);
});
test('should transform comma-separated list of urls from env and set cors origin as an array', () => {
    process.env.CORS_ORIGIN =
        'https://my-custom-domain.com,https://example.com/my-custom-page';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.cors.origin).toStrictEqual([
        'https://my-custom-domain.com',
        'https://example.com/my-custom-page',
    ]);
    delete process.env.CORS_ORIGIN;
});
test('should set CORS default values', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.cors.origin).toBe('*');
    expect(config.cors.methods).toBe('GET, POST');
    expect(config.cors.allowedHeaders).toBeUndefined();
    expect(config.cors.exposedHeaders).toBe('ETag');
    expect(config.cors.credentials).toBe(false);
    expect(config.cors.maxAge).toBe(172800);
    expect(config.cors.preflightContinue).toBe(false);
    expect(config.cors.optionsSuccessStatus).toBe(204);
});
test('should load the passed-in http agent when config.httpOptions is provided', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
        httpOptions: {
            agent: () => https.globalAgent,
        },
    });
    expect(config.httpOptions?.agent?.(new URL('https://example.com'))).toBe(https.globalAgent);
});
test('should not set config.httpOptions if no http options are provided at creation', () => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.httpOptions).toBeUndefined();
});
test('should load config.httpOptions.rejectUnauthorized from env', () => {
    process.env.HTTP_OPTIONS_REJECT_UNAUTHORIZED = 'true';
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
    });
    expect(config.httpOptions?.rejectUnauthorized).toBe(true);
    delete process.env.HTTP_OPTIONS_REJECT_UNAUTHORIZED;
});
test.each([
    '/base/path',
    '/base/path',
    'base/path/',
    'base/path',
    '     base/path     ',
])('%s as proxyBasePath should yield /base/path as base path', async (p) => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
        proxyBasePath: p,
    });
    expect(config.proxyBasePath).toBe(`/base/path`);
});
test.each(['', '     ', '   ', undefined])(`%s as base path should be treated the same as empty string`, (p) => {
    const config = (0, config_1.createProxyConfig)({
        unleashUrl: 'some',
        unleashApiToken: 'some',
        clientKeys: ['s1'],
        proxyBasePath: p,
    });
    expect(config.proxyBasePath).toBe(``);
});
//# sourceMappingURL=config.test.js.map