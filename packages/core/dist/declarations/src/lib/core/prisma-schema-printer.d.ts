import { DatabaseProvider } from '../../types';
import { InitialisedList } from './types-for-lists';
export declare function printPrismaSchema(lists: Record<string, InitialisedList>, prismaClientPath: string | undefined, provider: DatabaseProvider, prismaPreviewFeatures?: readonly string[] | null, additionalPrismaDatasourceProperties?: {
    [key: string]: string;
} | null, extendPrismaCompleteSchema?: (schema: string) => string): string;
//# sourceMappingURL=prisma-schema-printer.d.ts.map