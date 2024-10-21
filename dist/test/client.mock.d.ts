/// <reference types="node" />
import EventEmitter from 'events';
import { Context } from 'unleash-client';
import { FeatureInterface } from 'unleash-client/lib/feature';
import { FeatureToggleStatus, IClient, IMetrics } from '../client';
declare class MockClient extends EventEmitter implements IClient {
    apiToken: String;
    queriedContexts: Context[];
    toggles: FeatureToggleStatus[];
    metrics: IMetrics[];
    constructor(toggles?: FeatureToggleStatus[]);
    getFeatureToggleDefinitions(): FeatureInterface[];
    isReady(): boolean;
    setUnleashApiToken(apiToken: string): void;
    getAllToggles(context: Context): FeatureToggleStatus[];
    getEnabledToggles(context: Context): FeatureToggleStatus[];
    getDefinedToggles(toggleNames: string[], context: Context): FeatureToggleStatus[];
    registerMetrics(metrics: IMetrics): void;
}
export default MockClient;
