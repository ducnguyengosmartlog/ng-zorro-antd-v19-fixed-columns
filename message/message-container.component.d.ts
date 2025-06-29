/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction } from '@angular/cdk/bidi';
import { NzMNContainerComponent } from './base';
import * as i0 from "@angular/core";
export declare class NzMessageContainerComponent extends NzMNContainerComponent {
    dir: Direction;
    top?: string | null;
    constructor();
    protected subscribeConfigChange(): void;
    protected updateConfig(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzMessageContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzMessageContainerComponent, "nz-message-container", ["nzMessageContainer"], {}, {}, never, never, true, never>;
}
