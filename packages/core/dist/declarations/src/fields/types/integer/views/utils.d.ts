import { ChangeEvent, FocusEvent } from 'react';
type ParsedValueBase = undefined | symbol | boolean | object | number | null | bigint;
type Config<ParsedValue extends ParsedValueBase> = {
    parse: (value: string) => ParsedValue | string;
    format: (value: ParsedValue) => string;
};
export declare function useFormattedInput<ParsedValue extends ParsedValueBase>(config: Config<ParsedValue>, { value, onChange, onBlur, onFocus, }: {
    value: string | ParsedValue;
    onChange: (value: string | ParsedValue) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}): {
    value: string;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
    onFocus(event: FocusEvent<HTMLInputElement>): void;
    onBlur(event: FocusEvent<HTMLInputElement>): void;
};
export {};
//# sourceMappingURL=utils.d.ts.map