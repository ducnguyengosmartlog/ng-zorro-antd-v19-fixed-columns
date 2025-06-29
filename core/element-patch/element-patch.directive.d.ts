/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * A patch directive to select the element of a component.
 */
export declare class NzElementPatchDirective {
    elementRef: ElementRef;
    get nativeElement(): NzSafeAny;
    constructor(elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzElementPatchDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzElementPatchDirective, "[nzElement], [nz-element]", ["nzElement"], {}, {}, never, never, true, never>;
}
