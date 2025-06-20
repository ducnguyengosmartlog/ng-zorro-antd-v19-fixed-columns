/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzTableVirtualScrollDirective<T> {
    templateRef: TemplateRef<{
        $implicit: T;
        index: number;
    }>;
    constructor(templateRef: TemplateRef<{
        $implicit: T;
        index: number;
    }>);
    static ngTemplateContextGuard<T>(_dir: NzTableVirtualScrollDirective<T>, _ctx: NzSafeAny): _ctx is {
        $implicit: T;
        index: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableVirtualScrollDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTableVirtualScrollDirective<any>, "[nz-virtual-scroll]", ["nzVirtualScroll"], {}, {}, never, never, true, never>;
}
