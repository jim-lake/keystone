import { MemoExoticComponent, ReactElement } from 'react';
import { ArrayField, ComponentSchema, ConditionalField, FormField, GenericPreviewProps, ObjectField, RelationshipField } from './api';
export type NonChildFieldComponentSchema = FormField<any, any> | ObjectField | ConditionalField<FormField<any, any>, {
    [key: string]: ComponentSchema;
}> | RelationshipField<boolean> | ArrayField<ComponentSchema>;
export declare const FormValueContentFromPreviewProps: MemoExoticComponent<(props: GenericPreviewProps<NonChildFieldComponentSchema, unknown> & {
    autoFocus?: boolean;
    forceValidation?: boolean;
}) => ReactElement>;
export declare function canFieldBeFocused(schema: ComponentSchema): boolean;
//# sourceMappingURL=form-from-preview.d.ts.map