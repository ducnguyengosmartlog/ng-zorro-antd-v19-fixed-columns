/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * An injection token representing `afterNextRender` as an observable rather
 * than a callback-based API has been added. This might be necessary in code
 * where streams of data are already being used and we need to wait until
 * the change detection ends before performing any tasks.
 */
export declare const NZ_AFTER_NEXT_RENDER$: InjectionToken<Observable<void>>;
