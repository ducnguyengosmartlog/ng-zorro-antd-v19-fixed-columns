import * as i1 from '@angular/cdk/overlay';
import { ConnectionPositionPair, CdkOverlayOrigin } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { ElementRef, booleanAttribute, Input, Directive, NgModule } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import * as i2 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const POSITION_MAP = {
    top: new ConnectionPositionPair({ originX: 'center', originY: 'top' }, { overlayX: 'center', overlayY: 'bottom' }),
    topCenter: new ConnectionPositionPair({ originX: 'center', originY: 'top' }, { overlayX: 'center', overlayY: 'bottom' }),
    topLeft: new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    topRight: new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
    right: new ConnectionPositionPair({ originX: 'end', originY: 'center' }, { overlayX: 'start', overlayY: 'center' }),
    rightTop: new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
    rightBottom: new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' }),
    bottom: new ConnectionPositionPair({ originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' }),
    bottomCenter: new ConnectionPositionPair({ originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' }),
    bottomLeft: new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    bottomRight: new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
    left: new ConnectionPositionPair({ originX: 'start', originY: 'center' }, { overlayX: 'end', overlayY: 'center' }),
    leftTop: new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' }),
    leftBottom: new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' })
};
const DEFAULT_TOOLTIP_POSITIONS = [POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left];
const DEFAULT_CASCADER_POSITIONS = [
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.topLeft,
    POSITION_MAP.topRight
];
const DEFAULT_MENTION_TOP_POSITIONS = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' })
];
const DEFAULT_MENTION_BOTTOM_POSITIONS = [
    POSITION_MAP.bottomLeft,
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
];
function getPlacementName(position) {
    for (const placement in POSITION_MAP) {
        if (position.connectionPair.originX === POSITION_MAP[placement].originX &&
            position.connectionPair.originY === POSITION_MAP[placement].originY &&
            position.connectionPair.overlayX === POSITION_MAP[placement].overlayX &&
            position.connectionPair.overlayY === POSITION_MAP[placement].overlayY) {
            return placement;
        }
    }
    return undefined;
}
const DATE_PICKER_POSITION_MAP = {
    bottomLeft: new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, undefined, 2),
    topLeft: new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }, undefined, -2),
    bottomRight: new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, undefined, 2),
    topRight: new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, undefined, -2)
};
const DEFAULT_DATE_PICKER_POSITIONS = [
    DATE_PICKER_POSITION_MAP.bottomLeft,
    DATE_PICKER_POSITION_MAP.topLeft,
    DATE_PICKER_POSITION_MAP.bottomRight,
    DATE_PICKER_POSITION_MAP.topRight
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzConnectedOverlayDirective {
    cdkConnectedOverlay;
    nzDestroyService;
    nzArrowPointAtCenter = false;
    constructor(cdkConnectedOverlay, nzDestroyService) {
        this.cdkConnectedOverlay = cdkConnectedOverlay;
        this.nzDestroyService = nzDestroyService;
        this.cdkConnectedOverlay.backdropClass = 'nz-overlay-transparent-backdrop';
        this.cdkConnectedOverlay.positionChange
            .pipe(takeUntil(this.nzDestroyService))
            .subscribe((position) => {
            if (this.nzArrowPointAtCenter) {
                this.updateArrowPosition(position);
            }
        });
    }
    updateArrowPosition(position) {
        const originRect = this.getOriginRect();
        const placement = getPlacementName(position);
        let offsetX = 0;
        let offsetY = 0;
        if (placement === 'topLeft' || placement === 'bottomLeft') {
            offsetX = originRect.width / 2 - 14;
        }
        else if (placement === 'topRight' || placement === 'bottomRight') {
            offsetX = -(originRect.width / 2 - 14);
        }
        else if (placement === 'leftTop' || placement === 'rightTop') {
            offsetY = originRect.height / 2 - 10;
        }
        else if (placement === 'leftBottom' || placement === 'rightBottom') {
            offsetY = -(originRect.height / 2 - 10);
        }
        if (this.cdkConnectedOverlay.offsetX !== offsetX || this.cdkConnectedOverlay.offsetY !== offsetY) {
            this.cdkConnectedOverlay.offsetY = offsetY;
            this.cdkConnectedOverlay.offsetX = offsetX;
            this.cdkConnectedOverlay.overlayRef.updatePosition();
        }
    }
    getFlexibleConnectedPositionStrategyOrigin() {
        if (this.cdkConnectedOverlay.origin instanceof CdkOverlayOrigin) {
            return this.cdkConnectedOverlay.origin.elementRef;
        }
        else {
            return this.cdkConnectedOverlay.origin;
        }
    }
    getOriginRect() {
        const origin = this.getFlexibleConnectedPositionStrategyOrigin();
        if (origin instanceof ElementRef) {
            return origin.nativeElement.getBoundingClientRect();
        }
        // Check for Element so SVG elements are also supported.
        if (origin instanceof Element) {
            return origin.getBoundingClientRect();
        }
        const width = origin.width || 0;
        const height = origin.height || 0;
        // If the origin is a point, return a client rect as if it was a 0x0 element at the point.
        return {
            top: origin.y,
            bottom: origin.y + height,
            left: origin.x,
            right: origin.x + width,
            height,
            width
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzConnectedOverlayDirective, deps: [{ token: i1.CdkConnectedOverlay }, { token: i2.NzDestroyService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: NzConnectedOverlayDirective, isStandalone: true, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: { nzArrowPointAtCenter: ["nzArrowPointAtCenter", "nzArrowPointAtCenter", booleanAttribute] }, providers: [NzDestroyService], exportAs: ["nzConnectedOverlay"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzConnectedOverlayDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cdkConnectedOverlay][nzConnectedOverlay]',
                    exportAs: 'nzConnectedOverlay',
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: () => [{ type: i1.CdkConnectedOverlay }, { type: i2.NzDestroyService }], propDecorators: { nzArrowPointAtCenter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverlayModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzOverlayModule, imports: [NzConnectedOverlayDirective], exports: [NzConnectedOverlayDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverlayModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzConnectedOverlayDirective],
                    exports: [NzConnectedOverlayDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function overlayZIndexSetter(overlayRef, zIndex) {
    if (!zIndex)
        return;
    overlayRef['_host'].style.zIndex = `${zIndex}`;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DATE_PICKER_POSITION_MAP, DEFAULT_CASCADER_POSITIONS, DEFAULT_DATE_PICKER_POSITIONS, DEFAULT_MENTION_BOTTOM_POSITIONS, DEFAULT_MENTION_TOP_POSITIONS, DEFAULT_TOOLTIP_POSITIONS, NzConnectedOverlayDirective, NzOverlayModule, POSITION_MAP, getPlacementName, overlayZIndexSetter };
//# sourceMappingURL=ng-zorro-antd-core-overlay.mjs.map
