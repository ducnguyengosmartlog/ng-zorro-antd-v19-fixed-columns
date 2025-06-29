/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
declare const iconTypeMap: {
    readonly error: "close-circle-fill";
    readonly validating: "loading";
    readonly success: "check-circle-fill";
    readonly warning: "exclamation-circle-fill";
};
export declare class NzFormItemFeedbackIconComponent implements OnChanges {
    cdr: ChangeDetectorRef;
    status: NzValidateStatus;
    constructor(cdr: ChangeDetectorRef);
    iconType: (typeof iconTypeMap)[keyof typeof iconTypeMap] | null;
    ngOnChanges(_changes: SimpleChanges): void;
    updateIcon(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzFormItemFeedbackIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzFormItemFeedbackIconComponent, "nz-form-item-feedback-icon", ["nzFormFeedbackIcon"], { "status": { "alias": "status"; "required": false; }; }, {}, never, never, true, never>;
}
export {};
