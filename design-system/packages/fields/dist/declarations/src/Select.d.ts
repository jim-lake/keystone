/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import { Options, Props } from 'react-select';
import { WidthType } from './types';
type Option = {
    label: string;
    value: string;
    isDisabled?: boolean;
};
type BaseSelectProps = Omit<Props<Option, boolean>, 'value' | 'onChange' | 'isMulti' | 'isOptionDisabled'> & {
    width?: WidthType;
};
export { components as selectComponents } from 'react-select';
export declare function Select({ id, onChange, value, width: widthKey, portalMenu, styles, ...props }: BaseSelectProps & {
    value: Option | null;
    portalMenu?: true;
    onChange(value: Option | null): void;
}): jsx.JSX.Element;
export declare function MultiSelect({ id, onChange, value, width: widthKey, portalMenu, styles, ...props }: BaseSelectProps & {
    value: Options<Option>;
    portalMenu?: true;
    onChange(value: Options<Option>): void;
}): jsx.JSX.Element;
//# sourceMappingURL=Select.d.ts.map