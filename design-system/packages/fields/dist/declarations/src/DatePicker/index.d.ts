/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { DateType } from '../types';
export type DateInputValue = string | undefined;
export type DatePickerProps = {
    onUpdate: (value: DateType) => void;
    onClear: () => void;
    onBlur?: () => void;
    value: DateType;
};
export declare function useEventCallback<Func extends (...args: any) => any>(callback: Func): Func;
export declare const DatePicker: ({ value, onUpdate, onClear, onBlur: _onBlur, ...props }: DatePickerProps) => jsx.JSX.Element;
//# sourceMappingURL=index.d.ts.map