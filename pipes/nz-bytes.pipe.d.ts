/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PipeTransform } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export type ByteUnit = 'B' | 'kB' | 'KB' | 'MB' | 'GB' | 'TB';
export declare class NzBytesPipe implements PipeTransform {
    static formats: Record<ByteUnit, {
        max: number;
        prev?: ByteUnit;
    }>;
    transform(input: NzSafeAny, decimal?: number, from?: ByteUnit, to?: ByteUnit): NzSafeAny;
    static formatResult(result: number, unit: string): string;
    static calculateResult(format: {
        max: number;
        prev?: ByteUnit;
    }, bytes: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzBytesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NzBytesPipe, "nzBytes", true>;
}
