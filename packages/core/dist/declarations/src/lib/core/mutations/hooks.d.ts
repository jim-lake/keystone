export declare function runSideEffectOnlyHook<HookName extends string, List extends {
    fields: Record<string, {
        hooks: {
            [Key in HookName]?: (args: {
                fieldKey: string;
            } & Args) => Promise<void> | void;
        };
    }>;
    hooks: {
        [Key in HookName]?: (args: any) => Promise<void> | void;
    };
    listKey: string;
}, Args extends Parameters<NonNullable<List['hooks'][HookName]>>[0]>(list: List, hookName: HookName, args: Args): Promise<void>;
//# sourceMappingURL=hooks.d.ts.map