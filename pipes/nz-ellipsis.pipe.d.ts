/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzEllipsisPipe implements PipeTransform {
    transform(value: NzSafeAny, length?: number, suffix?: string): NzSafeAny;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzEllipsisPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NzEllipsisPipe, "nzEllipsis", true>;
}
