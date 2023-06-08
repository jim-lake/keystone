import { Block } from '..';
import { InlineFromExternalPaste } from './utils';
export declare function deserializeHTML(html: string): DeserializedNodes;
type DeserializedNode = InlineFromExternalPaste | Block;
type DeserializedNodes = [DeserializedNode, ...DeserializedNode[]];
export declare function deserializeHTMLNode(el: globalThis.Node): DeserializedNode[];
export {};
//# sourceMappingURL=html.d.ts.map