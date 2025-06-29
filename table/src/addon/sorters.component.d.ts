import { OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableSortOrder } from '../table.types';
import * as i0 from "@angular/core";
export declare class NzTableSortersComponent implements OnChanges {
    sortDirections: NzTableSortOrder[];
    sortOrder: NzTableSortOrder;
    contentTemplate: TemplateRef<NzSafeAny> | null;
    isUp: boolean;
    isDown: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableSortersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTableSortersComponent, "nz-table-sorters", never, { "sortDirections": { "alias": "sortDirections"; "required": false; }; "sortOrder": { "alias": "sortOrder"; "required": false; }; "contentTemplate": { "alias": "contentTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
