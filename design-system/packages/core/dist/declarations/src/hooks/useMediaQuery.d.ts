import facepaint from 'facepaint';
import { Theme } from '../types';
type BreakPoints = Theme['breakpoints'];
type BreakPoint = keyof BreakPoints;
export declare const useMediaQuery: () => {
    mq: facepaint.DynamicStyleFunction;
    maxBreak: (key: BreakPoint) => string;
    minBreak: (key: BreakPoint) => string;
};
export {};
//# sourceMappingURL=useMediaQuery.d.ts.map