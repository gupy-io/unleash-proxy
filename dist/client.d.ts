/// <reference types="node" />
import EventEmitter from 'events';
import { Context, Unleash, Variant } from 'unleash-client';
import { FeatureInterface } from 'unleash-client/lib/feature';
import { IProxyConfig } from './config';
export declare type FeatureToggleStatus = {
    name: string;
    enabled: boolean;
    impressionData: boolean;
    variant?: Variant;
};
interface VariantBucket {
    [s: string]: number;
}
interface Bucket {
    toggles: {
        [s: string]: {
            yes?: number;
            no?: number;
            variants?: VariantBucket;
        };
    };
}
export interface IMetrics {
    bucket: Bucket;
}
export interface IClient extends EventEmitter {
    setUnleashApiToken: (unleashApiToken: string) => void;
    getEnabledToggles: (context: Context) => FeatureToggleStatus[];
    getDefinedToggles: (toggleNames: string[], context: Context) => FeatureToggleStatus[];
    getAllToggles: (context: Context) => FeatureToggleStatus[];
    getFeatureToggleDefinitions(): FeatureInterface[];
    registerMetrics(metrics: IMetrics): void;
    isReady(): boolean;
}
declare class Client extends EventEmitter implements IClient {
    unleash: Unleash;
    private unleashApiToken;
    private environment?;
    private metrics;
    private logger;
    private ready;
    constructor(config: IProxyConfig, init?: Function);
    setUnleashApiToken(unleashApiToken: string): void;
    fixContext(context: Context): Context;
    getAllToggles(inContext: Context): FeatureToggleStatus[];
    getEnabledToggles(inContext: Context): FeatureToggleStatus[];
    getDefinedToggles(toggleNames: string[], inContext: Context): FeatureToggleStatus[];
    getFeatureToggleDefinitions(): FeatureInterface[];
    registerMetrics(metrics: IMetrics): void;
    destroy(): void;
    isReady(): boolean;
}
export default Client;
