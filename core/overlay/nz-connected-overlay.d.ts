/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import * as i0 from "@angular/core";
export declare class NzConnectedOverlayDirective {
    private readonly cdkConnectedOverlay;
    private readonly nzDestroyService;
    nzArrowPointAtCenter: boolean;
    constructor(cdkConnectedOverlay: CdkConnectedOverlay, nzDestroyService: NzDestroyService);
    private updateArrowPosition;
    private getFlexibleConnectedPositionStrategyOrigin;
    private getOriginRect;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzConnectedOverlayDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzConnectedOverlayDirective, "[cdkConnectedOverlay][nzConnectedOverlay]", ["nzConnectedOverlay"], { "nzArrowPointAtCenter": { "alias": "nzArrowPointAtCenter"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_nzArrowPointAtCenter: unknown;
}
