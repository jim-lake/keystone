import type { Flags } from './cli';
export declare function dev(cwd: string, { dbPush, prisma, server, ui }: Pick<Flags, 'dbPush' | 'prisma' | 'server' | 'ui'>): Promise<() => Promise<void>>;
//# sourceMappingURL=dev.d.ts.map