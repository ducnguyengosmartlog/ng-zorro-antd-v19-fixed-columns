import { NzDateMode } from '../standard-types';
import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';
import * as i0 from "@angular/core";
export declare class DecadeHeaderComponent extends AbstractPanelHeader {
    previous(): void;
    next(): void;
    mode: NzDateMode;
    get startYear(): number;
    get endYear(): number;
    superPrevious(): void;
    superNext(): void;
    getSelectors(): PanelSelector[];
    static ɵfac: i0.ɵɵFactoryDeclaration<DecadeHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DecadeHeaderComponent, "decade-header", ["decadeHeader"], {}, {}, never, never, true, never>;
}
