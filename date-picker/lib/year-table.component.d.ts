import { DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
import { DateBodyRow, DateCell, YearCell } from './interface';
import * as i0 from "@angular/core";
export declare class YearTableComponent extends AbstractTable {
    private dateHelper;
    MAX_ROW: number;
    MAX_COL: number;
    constructor(dateHelper: DateHelperService);
    makeHeadRow(): DateCell[];
    makeBodyRows(): DateBodyRow[];
    getClassMap(cell: YearCell): Record<string, boolean>;
    private isDisabledYear;
    private addCellProperty;
    private chooseYear;
    static ɵfac: i0.ɵɵFactoryDeclaration<YearTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YearTableComponent, "year-table", ["yearTable"], {}, {}, never, never, true, never>;
}
