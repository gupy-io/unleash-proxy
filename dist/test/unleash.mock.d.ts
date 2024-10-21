import { Context, Unleash, Variant } from 'unleash-client';
import { FeatureInterface } from 'unleash-client/lib/feature';
import { FallbackFunction } from 'unleash-client/lib/helpers';
import { UnleashConfig } from 'unleash-client/lib/unleash';
declare class FakeUnleash extends Unleash {
    toggleDefinitions: FeatureInterface[];
    contexts: Context[];
    unleashConfig: UnleashConfig;
    constructor(unleashConfig: UnleashConfig);
    isEnabled(name: string, context?: Context, fallbackFunction?: FallbackFunction): boolean;
    isEnabled(name: string, context?: Context, fallbackValue?: boolean): boolean;
    getVariant(name: string, context?: Context, fallbackVariant?: Variant): Variant;
    forceGetVariant(name: string, context?: Context, fallbackVariant?: Variant): Variant;
    getFeatureToggleDefinition(toggleName: string): FeatureInterface;
    getFeatureToggleDefinitions(): FeatureInterface[];
    count(toggleName: string, enabled: boolean): void;
    countVariant(toggleName: string, variantName: string): void;
}
export default FakeUnleash;
