import { DatabaseProvider } from '../types';
import { InitialisedList } from './core/types-for-lists';
export declare function printTelemetryStatus(): void;
export declare function runTelemetry(cwd: string, lists: Record<string, InitialisedList>, dbProviderName: DatabaseProvider): Promise<void>;
export declare function enableTelemetry(): void;
export declare function disableTelemetry(): void;
export declare function resetTelemetry(): void;
//# sourceMappingURL=telemetry.d.ts.map