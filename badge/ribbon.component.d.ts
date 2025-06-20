/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NzRibbonComponent implements OnChanges {
    nzColor: string | undefined;
    nzPlacement: 'start' | 'end';
    nzText: string | TemplateRef<void> | null;
    presetColor: string | null;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzRibbonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzRibbonComponent, "nz-ribbon", ["nzRibbon"], { "nzColor": { "alias": "nzColor"; "required": false; }; "nzPlacement": { "alias": "nzPlacement"; "required": false; }; "nzText": { "alias": "nzText"; "required": false; }; }, {}, never, ["*"], true, never>;
}
