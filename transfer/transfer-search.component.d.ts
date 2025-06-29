/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, EventEmitter, OnChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NzTransferSearchComponent implements OnChanges {
    private cdr;
    placeholder?: string;
    value?: string;
    disabled: boolean;
    readonly valueChanged: EventEmitter<string>;
    readonly valueClear: EventEmitter<void>;
    constructor(cdr: ChangeDetectorRef);
    _handle(): void;
    _clear(): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTransferSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTransferSearchComponent, "[nz-transfer-search]", ["nzTransferSearch"], { "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChanged": "valueChanged"; "valueClear": "valueClear"; }, never, never, true, never>;
    static ngAcceptInputType_disabled: unknown;
}
