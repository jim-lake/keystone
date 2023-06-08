/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { components as reactSelectComponents, Props } from 'react-select';
export declare const CheckMark: ({ isDisabled, isFocused, isSelected, }: {
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    isSelected?: boolean | undefined;
}) => jsx.JSX.Element;
export declare const OptionPrimitive: typeof reactSelectComponents['Option'];
type OptionsProps = Props<{
    label: string;
    value: string;
    isDisabled?: boolean;
}, boolean>;
export declare const Options: ({ components: propComponents, ...props }: OptionsProps) => jsx.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map