"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const unleash_client_1 = require("unleash-client");
const metrics_1 = __importDefault(require("unleash-client/lib/metrics"));
const strategy_1 = require("unleash-client/lib/strategy");
const variant_1 = require("unleash-client/lib/variant");
class Client extends events_1.default {
    constructor(config, init = unleash_client_1.initialize) {
        super();
        this.ready = false;
        this.unleashApiToken = config.unleashApiToken;
        this.environment = config.environment;
        this.logger = config.logger;
        const customHeadersFunction = async () => ({
            Authorization: this.unleashApiToken,
        });
        // Unleash Client instance.
        this.unleash = init({
            url: config.unleashUrl,
            appName: config.unleashAppName,
            instanceId: config.unleashInstanceId,
            environment: this.environment,
            refreshInterval: config.refreshInterval,
            projectName: config.projectName,
            strategies: config.customStrategies,
            disableMetrics: true,
            namePrefix: config.namePrefix,
            tags: config.tags,
            customHeadersFunction,
            bootstrap: config.bootstrap,
            storageProvider: config.storageProvider,
            ...(!!config.httpOptions
                ? { httpOptions: config.httpOptions }
                : {}),
        });
        // Custom metrics Instance
        this.metrics = new metrics_1.default({
            disableMetrics: config.disableMetrics,
            appName: config.unleashAppName,
            instanceId: config.unleashInstanceId,
            strategies: strategy_1.defaultStrategies.map((s) => s.name),
            metricsInterval: config.metricsInterval,
            metricsJitter: config.metricsJitter,
            url: config.unleashUrl,
            customHeadersFunction,
            ...(!!config.httpOptions
                ? { httpOptions: config.httpOptions }
                : {}),
        });
        this.metrics.on('error', (msg) => this.logger.error(`metrics: ${msg}`));
        this.unleash.on('error', (msg) => this.logger.error(msg));
        this.unleash.on('ready', () => {
            this.emit('ready');
            this.ready = true;
            this.metrics.start();
        });
    }
    setUnleashApiToken(unleashApiToken) {
        this.unleashApiToken = unleashApiToken;
    }
    fixContext(context) {
        const { environment } = this;
        if (environment) {
            return { ...context, environment };
        }
        return context;
    }
    getAllToggles(inContext) {
        this.logger.debug('Get all feature toggles for provided context', inContext);
        const context = this.fixContext(inContext);
        const definitions = this.unleash.getFeatureToggleDefinitions() || [];
        return definitions.map((d) => {
            const enabled = this.unleash.isEnabled(d.name, context);
            const variant = enabled
                ? this.unleash.forceGetVariant(d.name, context)
                : (0, variant_1.getDefaultVariant)();
            return {
                name: d.name,
                enabled: enabled,
                variant: variant,
                impressionData: d.impressionData,
            };
        });
    }
    getEnabledToggles(inContext) {
        this.logger.debug('Get enabled feature toggles for provided context', inContext);
        const context = this.fixContext(inContext);
        const definitions = this.unleash.getFeatureToggleDefinitions() || [];
        return definitions
            .filter((d) => this.unleash.isEnabled(d.name, context))
            .map((d) => ({
            name: d.name,
            enabled: true,
            variant: this.unleash.forceGetVariant(d.name, context),
            impressionData: d.impressionData,
        }));
    }
    getDefinedToggles(toggleNames, inContext) {
        const context = this.fixContext(inContext);
        return toggleNames.map((name) => {
            const definition = this.unleash.getFeatureToggleDefinition(name);
            const enabled = this.unleash.isEnabled(name, context);
            this.metrics.count(name, enabled);
            return {
                name,
                enabled,
                variant: this.unleash.getVariant(name, context),
                impressionData: definition?.impressionData ?? false,
            };
        });
    }
    getFeatureToggleDefinitions() {
        return this.unleash.getFeatureToggleDefinitions();
    }
    /*
     * A very simplistic implementation which support counts.
     * In future we must consider to look at start/stop times
     * and adjust counting thereafter.
     */
    registerMetrics(metrics) {
        const { toggles } = metrics.bucket;
        Object.keys(toggles).forEach((toggleName) => {
            const yesCount = toggles[toggleName].yes ?? 0;
            const noCount = toggles[toggleName].no ?? 0;
            [...Array(yesCount)].forEach(() => this.metrics.count(toggleName, true));
            [...Array(noCount)].forEach(() => this.metrics.count(toggleName, false));
        });
    }
    destroy() {
        this.unleash.destroy();
    }
    isReady() {
        return this.ready;
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map