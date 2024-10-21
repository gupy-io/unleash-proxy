"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
const unleash_client_1 = require("unleash-client");
class FakeUnleash extends unleash_client_1.Unleash {
    // fix constructor
    constructor(unleashConfig) {
        super(unleashConfig);
        this.toggleDefinitions = [];
        this.contexts = [];
        this.unleashConfig = unleashConfig;
    }
    isEnabled(name, context, fallbackValue) {
        this.contexts.push(context);
        // console.log(name, context, fallbackValue);
        return true;
    }
    getVariant(name, context, fallbackVariant) {
        // console.log(name, context, fallbackVariant);
        return { name: 'disabled', enabled: false };
    }
    forceGetVariant(name, context, fallbackVariant) {
        // console.log(name, context, fallbackVariant);
        return { name: 'disabled', enabled: false };
    }
    getFeatureToggleDefinition(toggleName) {
        const toggle = this.toggleDefinitions.find((t) => t.name === toggleName);
        if (!toggle) {
            throw new Error(`Could not find toggle=${toggleName}`);
        }
        return toggle;
    }
    getFeatureToggleDefinitions() {
        return this.toggleDefinitions;
    }
    count(toggleName, enabled) {
        throw new Error('Method not implemented.');
    }
    countVariant(toggleName, variantName) {
        throw new Error('Method not implemented.');
    }
}
exports.default = FakeUnleash;
//# sourceMappingURL=unleash.mock.js.map