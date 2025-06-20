/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NzI18nPipe implements PipeTransform {
    private _locale;
    transform(path: string, keyValue?: object): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzI18nPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NzI18nPipe, "nzI18n", true>;
}
