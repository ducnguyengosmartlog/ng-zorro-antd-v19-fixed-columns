/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export type AggregateMethod = 'sum' | 'max' | 'min' | 'avg';
export declare class NzAggregatePipe implements PipeTransform {
    transform(value: number[], method: AggregateMethod): undefined | number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzAggregatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NzAggregatePipe, "nzAggregate", true>;
}
