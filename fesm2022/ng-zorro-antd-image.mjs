import { __esDecorate, __runInitializers } from 'tslib';
import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { Input, ViewEncapsulation, ChangeDetectionStrategy, Component, EventEmitter, inject, ViewChild, Injector, Injectable, booleanAttribute, Directive, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, filter, take, switchMap } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { CdkDragHandle, CdkDrag } from '@angular/cdk/drag-drop';
import { ESCAPE, LEFT_ARROW, RIGHT_ARROW, hasModifierKey } from '@angular/cdk/keycodes';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import * as i3 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular, isNotNil } from 'ng-zorro-antd/core/util';
import * as i5 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i4 from '@angular/platform-browser';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import * as i3$1 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImageGroupComponent {
    nzScaleStep = null;
    images = [];
    addImage(image) {
        this.images.push(image);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzImageGroupComponent, isStandalone: true, selector: "nz-image-group", inputs: { nzScaleStep: "nzScaleStep" }, exportAs: ["nzImageGroup"], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-image-group',
                    exportAs: 'nzImageGroup',
                    template: '<ng-content></ng-content>',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { nzScaleStep: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME$1 = 'image';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * fit content details: https://github.com/NG-ZORRO/ng-zorro-antd/pull/6154#issuecomment-745025554
 *
 * calc position x,y point
 *
 * CASE (width <= clientWidth && height <= clientHeight):
 *
 * ------------- clientWidth -------------
 * |                                     |
 * |        ------ width ------          |
 * |        |                 |          |
 * |        |                 |          |
 * client   height            |          |
 * Height   |                 |          |
 * |        |                 |          |
 * |        -------------------          |
 * |                                     |
 * |                                     |
 * ---------------------------------------
 * fixedPosition = { x: 0, y: 0 }
 *
 *
 *
 * CASE (width > clientWidth || height > clientHeight):
 *
 * ------------- clientWidth -------------
 * |        |                            |
 * |        top                          |
 * |        |                            |
 * |--left--|--------------- width -----------------
 * |        |                                      |
 * client   |                                      |
 * Height   |                                      |
 * |        |                                      |
 * |        |                                      |
 * |        height                                 |
 * |        |                                      |
 * ---------|                                      |
 *          |                                      |
 *          |                                      |
 *          |                                      |
 *          ----------------------------------------
 *
 *
 * - left || top > 0
 *   left -> 0 || top -> 0
 *
 * - (left + width) < clientWidth || (top + height) < clientHeight
 * - left | top + width | height < clientWidth | clientHeight -> Back left | top + width | height === clientWidth | clientHeight
 *
 * DEFAULT:
 * - hold position
 *
 */
function getFitContentPosition(params) {
    let fixPos = {};
    if (params.width <= params.clientWidth && params.height <= params.clientHeight) {
        fixPos = {
            x: 0,
            y: 0
        };
    }
    if (params.width > params.clientWidth || params.height > params.clientHeight) {
        fixPos = {
            x: fitPoint(params.left, params.width, params.clientWidth),
            y: fitPoint(params.top, params.height, params.clientHeight)
        };
    }
    return fixPos;
}
function getOffset(node) {
    const box = node.getBoundingClientRect();
    const docElem = document.documentElement;
    // use docElem.scrollLeft to support IE
    return {
        left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
        top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
    };
}
function getClientSize() {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    return {
        width,
        height
    };
}
function fitPoint(start, size, clientSize) {
    const startAddSize = start + size;
    const offsetStart = (size - clientSize) / 2;
    let distance = null;
    if (size > clientSize) {
        if (start > 0) {
            distance = offsetStart;
        }
        if (start < 0 && startAddSize < clientSize) {
            distance = -offsetStart;
        }
    }
    else {
        if (start < 0 || startAddSize > clientSize) {
            distance = start < 0 ? offsetStart : -offsetStart;
        }
    }
    return distance;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImagePreviewOptions {
    nzKeyboard = true;
    nzNoAnimation = false;
    nzMaskClosable = true;
    nzCloseOnNavigation = true;
    nzZIndex;
    nzZoom;
    nzRotate;
    nzFlipHorizontally;
    nzFlipVertically;
    nzScaleStep;
    nzDirection;
}

const initialPosition = {
    x: 0,
    y: 0
};
const NZ_DEFAULT_SCALE_STEP = 0.5;
const NZ_DEFAULT_ZOOM = 1;
const NZ_DEFAULT_ROTATE = 0;
class NzImagePreviewComponent {
    ngZone;
    cdr;
    nzConfigService;
    config;
    destroy$;
    sanitizer;
    _defaultNzZoom = NZ_DEFAULT_ZOOM;
    _defaultNzScaleStep = NZ_DEFAULT_SCALE_STEP;
    _defaultNzRotate = NZ_DEFAULT_ROTATE;
    images = [];
    index = 0;
    isDragging = false;
    visible = true;
    animationStateChanged = new EventEmitter();
    scaleStepMap = new Map();
    previewImageTransform = '';
    previewImageWrapperTransform = '';
    operations = [
        {
            icon: 'close',
            onClick: () => {
                this.onClose();
            },
            type: 'close'
        },
        {
            icon: 'zoom-in',
            onClick: () => {
                this.onZoomIn();
            },
            type: 'zoomIn'
        },
        {
            icon: 'zoom-out',
            onClick: () => {
                this.onZoomOut();
            },
            type: 'zoomOut'
        },
        {
            icon: 'rotate-right',
            onClick: () => {
                this.onRotateRight();
            },
            type: 'rotateRight'
        },
        {
            icon: 'rotate-left',
            onClick: () => {
                this.onRotateLeft();
            },
            type: 'rotateLeft'
        },
        {
            icon: 'swap',
            onClick: () => {
                this.onHorizontalFlip();
            },
            type: 'flipHorizontally'
        },
        {
            icon: 'swap',
            onClick: () => {
                this.onVerticalFlip();
            },
            type: 'flipVertically',
            rotate: 90
        }
    ];
    zoomOutDisabled = false;
    position = { ...initialPosition };
    previewRef;
    closeClick = new EventEmitter();
    imageRef;
    imagePreviewWrapper;
    document = inject(DOCUMENT);
    zoom;
    rotate;
    scaleStep;
    flipHorizontally;
    flipVertically;
    get animationDisabled() {
        return this.config.nzNoAnimation ?? false;
    }
    get maskClosable() {
        const defaultConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME$1) || {};
        return this.config.nzMaskClosable ?? defaultConfig.nzMaskClosable ?? true;
    }
    constructor(ngZone, cdr, nzConfigService, config, destroy$, sanitizer) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.nzConfigService = nzConfigService;
        this.config = config;
        this.destroy$ = destroy$;
        this.sanitizer = sanitizer;
        this.zoom = this.config.nzZoom ?? this._defaultNzZoom;
        this.scaleStep = this.config.nzScaleStep ?? this._defaultNzScaleStep;
        this.rotate = this.config.nzRotate ?? this._defaultNzRotate;
        this.flipHorizontally = this.config.nzFlipHorizontally ?? false;
        this.flipVertically = this.config.nzFlipVertically ?? false;
        this.updateZoomOutDisabled();
        this.updatePreviewImageTransform();
        this.updatePreviewImageWrapperTransform();
    }
    ngOnInit() {
        fromEventOutsideAngular(this.imagePreviewWrapper.nativeElement, 'mousedown')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.isDragging = true;
        });
        fromEventOutsideAngular(this.imagePreviewWrapper.nativeElement, 'wheel')
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
            this.ngZone.run(() => this.wheelZoomEventHandler(event));
        });
        fromEventOutsideAngular(this.document, 'keydown')
            .pipe(filter(event => event.keyCode === ESCAPE), takeUntil(this.destroy$))
            .subscribe(() => {
            this.ngZone.run(() => {
                this.onClose();
                this.markForCheck();
            });
        });
    }
    setImages(images, scaleStepMap) {
        if (scaleStepMap)
            this.scaleStepMap = scaleStepMap;
        this.images = images;
        this.markForCheck();
    }
    switchTo(index) {
        this.index = index;
        this.markForCheck();
    }
    next() {
        if (this.index < this.images.length - 1) {
            this.reset();
            this.index++;
            this.updatePreviewImageTransform();
            this.updatePreviewImageWrapperTransform();
            this.updateZoomOutDisabled();
            this.markForCheck();
        }
    }
    prev() {
        if (this.index > 0) {
            this.reset();
            this.index--;
            this.updatePreviewImageTransform();
            this.updatePreviewImageWrapperTransform();
            this.updateZoomOutDisabled();
            this.markForCheck();
        }
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    onClose() {
        this.visible = false;
        this.closeClick.emit();
    }
    onZoomIn() {
        const zoomStep = this.scaleStepMap.get(this.images[this.index].src ?? this.images[this.index].srcset) ?? this.scaleStep;
        this.zoom += zoomStep;
        this.updatePreviewImageTransform();
        this.updateZoomOutDisabled();
    }
    onZoomOut() {
        if (this.zoom > 1) {
            const zoomStep = this.scaleStepMap.get(this.images[this.index].src ?? this.images[this.index].srcset) ?? this.scaleStep;
            this.zoom -= zoomStep;
            this.updatePreviewImageTransform();
            this.updateZoomOutDisabled();
            if (this.zoom <= 1) {
                this.reCenterImage();
            }
        }
    }
    onRotateRight() {
        this.rotate += 90;
        this.updatePreviewImageTransform();
    }
    onRotateLeft() {
        this.rotate -= 90;
        this.updatePreviewImageTransform();
    }
    onSwitchLeft(event) {
        event.preventDefault();
        event.stopPropagation();
        this.prev();
    }
    onSwitchRight(event) {
        event.preventDefault();
        event.stopPropagation();
        this.next();
    }
    onHorizontalFlip() {
        this.flipHorizontally = !this.flipHorizontally;
        this.updatePreviewImageTransform();
    }
    onVerticalFlip() {
        this.flipVertically = !this.flipVertically;
        this.updatePreviewImageTransform();
    }
    wheelZoomEventHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        this.handlerImageTransformationWhileZoomingWithMouse(event, event.deltaY);
        this.handleImageScaleWhileZoomingWithMouse(event.deltaY);
        this.updatePreviewImageWrapperTransform();
        this.updatePreviewImageTransform();
        this.markForCheck();
    }
    onAnimationStart(event) {
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        this.animationStateChanged.emit(event);
    }
    onDragEnd(event) {
        this.isDragging = false;
        const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
        const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
        const { left, top } = getOffset(this.imageRef.nativeElement);
        const { width: clientWidth, height: clientHeight } = getClientSize();
        const isRotate = this.rotate % 180 !== 0;
        const fitContentParams = {
            width: isRotate ? height : width,
            height: isRotate ? width : height,
            left,
            top,
            clientWidth,
            clientHeight
        };
        const fitContentPos = getFitContentPosition(fitContentParams);
        if (isNotNil(fitContentPos.x) || isNotNil(fitContentPos.y)) {
            this.position = { ...this.position, ...fitContentPos };
        }
        else if (!isNotNil(fitContentPos.x) && !isNotNil(fitContentPos.y)) {
            this.position = {
                x: event.source.getFreeDragPosition().x,
                y: event.source.getFreeDragPosition().y
            };
        }
    }
    sanitizerResourceUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    updatePreviewImageTransform() {
        this.previewImageTransform = `scale3d(${this.zoom * (this.flipHorizontally ? -1 : 1)}, ${this.zoom * (this.flipVertically ? -1 : 1)}, 1) rotate(${this.rotate}deg)`;
    }
    updatePreviewImageWrapperTransform() {
        this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }
    updateZoomOutDisabled() {
        this.zoomOutDisabled = this.zoom <= 1;
    }
    handlerImageTransformationWhileZoomingWithMouse(event, deltaY) {
        let scaleValue;
        const imageElement = this.imageRef.nativeElement;
        const elementTransform = getComputedStyle(imageElement).transform;
        const matrixValue = elementTransform.match(/matrix.*\((.+)\)/);
        if (matrixValue) {
            scaleValue = +matrixValue[1].split(', ')[0];
        }
        else {
            scaleValue = this.zoom;
        }
        const x = (event.clientX - imageElement.getBoundingClientRect().x) / scaleValue;
        const y = (event.clientY - imageElement.getBoundingClientRect().y) / scaleValue;
        const halfOfScaleStepValue = deltaY < 0 ? this.scaleStep / 2 : -this.scaleStep / 2;
        this.position.x += -x * halfOfScaleStepValue * 2 + imageElement.offsetWidth * halfOfScaleStepValue;
        this.position.y += -y * halfOfScaleStepValue * 2 + imageElement.offsetHeight * halfOfScaleStepValue;
    }
    handleImageScaleWhileZoomingWithMouse(deltaY) {
        if (this.isZoomedInWithMouseWheel(deltaY)) {
            this.onZoomIn();
        }
        else {
            this.onZoomOut();
        }
        if (this.zoom <= 1) {
            this.reCenterImage();
        }
    }
    isZoomedInWithMouseWheel(delta) {
        return delta < 0;
    }
    reset() {
        this.zoom = this.config.nzZoom ?? this._defaultNzZoom;
        this.scaleStep = this.config.nzScaleStep ?? this._defaultNzScaleStep;
        this.rotate = this.config.nzRotate ?? this._defaultNzRotate;
        this.flipHorizontally = false;
        this.flipVertically = false;
        this.reCenterImage();
    }
    reCenterImage() {
        this.position = { ...initialPosition };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImagePreviewComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: NzImagePreviewOptions }, { token: i3.NzDestroyService }, { token: i4.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzImagePreviewComponent, isStandalone: true, selector: "nz-image-preview", host: { listeners: { "@fadeMotion.start": "onAnimationStart($event)", "@fadeMotion.done": "onAnimationDone($event)" }, properties: { "class.ant-image-preview-moving": "isDragging", "style.zIndex": "config.nzZIndex", "@.disabled": "config.nzNoAnimation", "@fadeMotion": "visible ? 'enter' : 'leave'" }, classAttribute: "ant-image-preview-root" }, providers: [NzDestroyService], viewQueries: [{ propertyName: "imageRef", first: true, predicate: ["imgRef"], descendants: true }, { propertyName: "imagePreviewWrapper", first: true, predicate: ["imagePreviewWrapper"], descendants: true, static: true }], exportAs: ["nzImagePreview"], ngImport: i0, template: `
    <div class="ant-image-preview-mask"></div>

    <div class="ant-image-preview-operations-wrapper">
      @if (images.length > 1) {
        <div
          class="ant-image-preview-switch-left"
          [class.ant-image-preview-switch-left-disabled]="index <= 0"
          (click)="onSwitchLeft($event)"
        >
          <nz-icon nzType="left" nzTheme="outline" />
        </div>
        <div
          class="ant-image-preview-switch-right"
          [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
          (click)="onSwitchRight($event)"
        >
          <nz-icon nzType="right" nzTheme="outline" />
        </div>
      }

      <ul class="ant-image-preview-operations">
        @if (images.length > 1) {
          <li class="ant-image-preview-operations-progress">{{ index + 1 }} / {{ images.length }}</li>
        }

        @for (option of operations; track option) {
          <li
            class="ant-image-preview-operations-operation"
            [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
            (click)="option.onClick()"
          >
            <nz-icon
              class="ant-image-preview-operations-icon"
              [nzType]="option.icon"
              [nzRotate]="option.rotate ?? 0"
              nzTheme="outline"
            />
          </li>
        }
      </ul>
    </div>

    <div
      class="ant-image-preview-wrap"
      tabindex="-1"
      (click)="maskClosable && $event.target === $event.currentTarget && onClose()"
    >
      <div class="ant-image-preview" role="dialog" aria-modal="true">
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
        <div class="ant-image-preview-content">
          <div class="ant-image-preview-body">
            <div
              class="ant-image-preview-img-wrapper"
              #imagePreviewWrapper
              cdkDrag
              [style.transform]="previewImageWrapperTransform"
              [cdkDragFreeDragPosition]="position"
              (cdkDragEnded)="onDragEnd($event)"
            >
              @for (image of images; track image; let imageIndex = $index) {
                @if (imageIndex === index) {
                  <img
                    cdkDragHandle
                    class="ant-image-preview-img"
                    #imgRef
                    [attr.src]="sanitizerResourceUrl(image.src)"
                    [attr.srcset]="image.srcset"
                    [attr.alt]="image.alt"
                    [style.width]="image.width"
                    [style.height]="image.height"
                    [style.transform]="previewImageTransform"
                  />
                }
              }
            </div>
          </div>
        </div>
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i5.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { kind: "directive", type: CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer", "cdkDragScale"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], animations: [fadeMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImagePreviewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-image-preview',
                    exportAs: 'nzImagePreview',
                    animations: [fadeMotion],
                    template: `
    <div class="ant-image-preview-mask"></div>

    <div class="ant-image-preview-operations-wrapper">
      @if (images.length > 1) {
        <div
          class="ant-image-preview-switch-left"
          [class.ant-image-preview-switch-left-disabled]="index <= 0"
          (click)="onSwitchLeft($event)"
        >
          <nz-icon nzType="left" nzTheme="outline" />
        </div>
        <div
          class="ant-image-preview-switch-right"
          [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
          (click)="onSwitchRight($event)"
        >
          <nz-icon nzType="right" nzTheme="outline" />
        </div>
      }

      <ul class="ant-image-preview-operations">
        @if (images.length > 1) {
          <li class="ant-image-preview-operations-progress">{{ index + 1 }} / {{ images.length }}</li>
        }

        @for (option of operations; track option) {
          <li
            class="ant-image-preview-operations-operation"
            [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
            (click)="option.onClick()"
          >
            <nz-icon
              class="ant-image-preview-operations-icon"
              [nzType]="option.icon"
              [nzRotate]="option.rotate ?? 0"
              nzTheme="outline"
            />
          </li>
        }
      </ul>
    </div>

    <div
      class="ant-image-preview-wrap"
      tabindex="-1"
      (click)="maskClosable && $event.target === $event.currentTarget && onClose()"
    >
      <div class="ant-image-preview" role="dialog" aria-modal="true">
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
        <div class="ant-image-preview-content">
          <div class="ant-image-preview-body">
            <div
              class="ant-image-preview-img-wrapper"
              #imagePreviewWrapper
              cdkDrag
              [style.transform]="previewImageWrapperTransform"
              [cdkDragFreeDragPosition]="position"
              (cdkDragEnded)="onDragEnd($event)"
            >
              @for (image of images; track image; let imageIndex = $index) {
                @if (imageIndex === index) {
                  <img
                    cdkDragHandle
                    class="ant-image-preview-img"
                    #imgRef
                    [attr.src]="sanitizerResourceUrl(image.src)"
                    [attr.srcset]="image.srcset"
                    [attr.alt]="image.alt"
                    [style.width]="image.width"
                    [style.height]="image.height"
                    [style.transform]="previewImageTransform"
                  />
                }
              }
            </div>
          </div>
        </div>
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
      </div>
    </div>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-image-preview-root',
                        '[class.ant-image-preview-moving]': 'isDragging',
                        '[style.zIndex]': 'config.nzZIndex',
                        '[@.disabled]': 'config.nzNoAnimation',
                        '[@fadeMotion]': `visible ? 'enter' : 'leave'`,
                        '(@fadeMotion.start)': 'onAnimationStart($event)',
                        '(@fadeMotion.done)': 'onAnimationDone($event)'
                    },
                    imports: [NzIconModule, CdkDragHandle, CdkDrag],
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: NzImagePreviewOptions }, { type: i3.NzDestroyService }, { type: i4.DomSanitizer }], propDecorators: { imageRef: [{
                type: ViewChild,
                args: ['imgRef']
            }], imagePreviewWrapper: [{
                type: ViewChild,
                args: ['imagePreviewWrapper', { static: true }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImagePreviewRef {
    previewInstance;
    config;
    overlayRef;
    destroy$ = new Subject();
    constructor(previewInstance, config, overlayRef) {
        this.previewInstance = previewInstance;
        this.config = config;
        this.overlayRef = overlayRef;
        overlayRef
            .keydownEvents()
            .pipe(filter(event => this.config.nzKeyboard &&
            (event.keyCode === ESCAPE || event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) &&
            !hasModifierKey(event)))
            .subscribe(event => {
            event.preventDefault();
            if (event.keyCode === ESCAPE) {
                previewInstance.onClose();
            }
            if (event.keyCode === LEFT_ARROW) {
                this.prev();
            }
            if (event.keyCode === RIGHT_ARROW) {
                this.next();
            }
        });
        overlayRef.detachments().subscribe(() => {
            this.overlayRef.dispose();
        });
        previewInstance.closeClick
            .pipe(take(1), switchMap(() => previewInstance.animationStateChanged), filter(event => event.phaseName === 'done'), takeUntil(this.destroy$))
            .subscribe(() => {
            this.close();
        });
    }
    switchTo(index) {
        this.previewInstance.switchTo(index);
    }
    next() {
        this.previewInstance.next();
    }
    prev() {
        this.previewInstance.prev();
    }
    close() {
        this.destroy$.next();
        this.overlayRef.dispose();
    }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class NzImageService {
    overlay;
    injector;
    nzConfigService;
    directionality;
    constructor(overlay, injector, nzConfigService, directionality) {
        this.overlay = overlay;
        this.injector = injector;
        this.nzConfigService = nzConfigService;
        this.directionality = directionality;
    }
    preview(images, options, zoomMap) {
        return this.display(images, options, zoomMap);
    }
    display(images, config, scaleStepMap) {
        const configMerged = { ...new NzImagePreviewOptions(), ...(config ?? {}) };
        const overlayRef = this.createOverlay(configMerged);
        const previewComponent = this.attachPreviewComponent(overlayRef, configMerged);
        previewComponent.setImages(images, scaleStepMap);
        const previewRef = new NzImagePreviewRef(previewComponent, configMerged, overlayRef);
        previewComponent.previewRef = previewRef;
        return previewRef;
    }
    attachPreviewComponent(overlayRef, config) {
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: OverlayRef, useValue: overlayRef },
                { provide: NzImagePreviewOptions, useValue: config }
            ]
        });
        const containerPortal = new ComponentPortal(NzImagePreviewComponent, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createOverlay(config) {
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME$1) || {};
        const overLayConfig = new OverlayConfig({
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global(),
            disposeOnNavigation: config.nzCloseOnNavigation ?? globalConfig.nzCloseOnNavigation ?? true,
            direction: config.nzDirection || globalConfig.nzDirection || this.directionality.value
        });
        return this.overlay.create(overLayConfig);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageService, deps: [{ token: i1$1.Overlay }, { token: i0.Injector }, { token: i1.NzConfigService }, { token: i3$1.Directionality }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1$1.Overlay }, { type: i0.Injector }, { type: i1.NzConfigService }, { type: i3$1.Directionality }] });

const NZ_CONFIG_MODULE_NAME = 'image';
let NzImageDirective = (() => {
    let _nzDisablePreview_decorators;
    let _nzDisablePreview_initializers = [];
    let _nzDisablePreview_extraInitializers = [];
    let _nzFallback_decorators;
    let _nzFallback_initializers = [];
    let _nzFallback_extraInitializers = [];
    let _nzPlaceholder_decorators;
    let _nzPlaceholder_initializers = [];
    let _nzPlaceholder_extraInitializers = [];
    let _nzScaleStep_decorators;
    let _nzScaleStep_initializers = [];
    let _nzScaleStep_extraInitializers = [];
    return class NzImageDirective {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzDisablePreview_decorators = [WithConfig()];
            _nzFallback_decorators = [WithConfig()];
            _nzPlaceholder_decorators = [WithConfig()];
            _nzScaleStep_decorators = [WithConfig()];
            __esDecorate(null, null, _nzDisablePreview_decorators, { kind: "field", name: "nzDisablePreview", static: false, private: false, access: { has: obj => "nzDisablePreview" in obj, get: obj => obj.nzDisablePreview, set: (obj, value) => { obj.nzDisablePreview = value; } }, metadata: _metadata }, _nzDisablePreview_initializers, _nzDisablePreview_extraInitializers);
            __esDecorate(null, null, _nzFallback_decorators, { kind: "field", name: "nzFallback", static: false, private: false, access: { has: obj => "nzFallback" in obj, get: obj => obj.nzFallback, set: (obj, value) => { obj.nzFallback = value; } }, metadata: _metadata }, _nzFallback_initializers, _nzFallback_extraInitializers);
            __esDecorate(null, null, _nzPlaceholder_decorators, { kind: "field", name: "nzPlaceholder", static: false, private: false, access: { has: obj => "nzPlaceholder" in obj, get: obj => obj.nzPlaceholder, set: (obj, value) => { obj.nzPlaceholder = value; } }, metadata: _metadata }, _nzPlaceholder_initializers, _nzPlaceholder_extraInitializers);
            __esDecorate(null, null, _nzScaleStep_decorators, { kind: "field", name: "nzScaleStep", static: false, private: false, access: { has: obj => "nzScaleStep" in obj, get: obj => obj.nzScaleStep, set: (obj, value) => { obj.nzScaleStep = value; } }, metadata: _metadata }, _nzScaleStep_initializers, _nzScaleStep_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        elementRef;
        nzImageService;
        cdr;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzSrc = '';
        nzSrcset = '';
        nzDisablePreview = __runInitializers(this, _nzDisablePreview_initializers, false);
        nzFallback = (__runInitializers(this, _nzDisablePreview_extraInitializers), __runInitializers(this, _nzFallback_initializers, null));
        nzPlaceholder = (__runInitializers(this, _nzFallback_extraInitializers), __runInitializers(this, _nzPlaceholder_initializers, null));
        nzScaleStep = (__runInitializers(this, _nzPlaceholder_extraInitializers), __runInitializers(this, _nzScaleStep_initializers, null));
        dir = __runInitializers(this, _nzScaleStep_extraInitializers);
        backLoadImage;
        status = 'normal';
        backLoadDestroy$ = new Subject();
        destroy$ = new Subject();
        document = inject(DOCUMENT);
        parentGroup = inject(NzImageGroupComponent, { optional: true });
        get previewable() {
            return !this.nzDisablePreview && this.status !== 'error';
        }
        constructor(nzConfigService, elementRef, nzImageService, cdr, directionality) {
            this.nzConfigService = nzConfigService;
            this.elementRef = elementRef;
            this.nzImageService = nzImageService;
            this.cdr = cdr;
            this.directionality = directionality;
        }
        ngOnInit() {
            this.backLoad();
            if (this.parentGroup) {
                this.parentGroup.addImage(this);
            }
            if (this.directionality) {
                this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                    this.dir = direction;
                    this.cdr.detectChanges();
                });
                this.dir = this.directionality.value;
            }
        }
        ngOnDestroy() {
            this.destroy$.next();
            this.destroy$.complete();
        }
        onPreview() {
            if (!this.previewable) {
                return;
            }
            if (this.parentGroup) {
                // preview inside image group
                const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
                const previewImages = previewAbleImages.map(e => ({ src: e.nzSrc, srcset: e.nzSrcset }));
                const previewIndex = previewAbleImages.findIndex(el => this === el);
                const scaleStepMap = new Map();
                previewAbleImages.forEach(imageDirective => {
                    scaleStepMap.set(imageDirective.nzSrc ?? imageDirective.nzSrcset, imageDirective.nzScaleStep ?? this.parentGroup.nzScaleStep ?? this.nzScaleStep ?? NZ_DEFAULT_SCALE_STEP);
                });
                const previewRef = this.nzImageService.preview(previewImages, {
                    nzDirection: this.dir
                }, scaleStepMap);
                previewRef.switchTo(previewIndex);
            }
            else {
                // preview not inside image group
                const previewImages = [{ src: this.nzSrc, srcset: this.nzSrcset }];
                this.nzImageService.preview(previewImages, {
                    nzDirection: this.dir,
                    nzScaleStep: this.nzScaleStep ?? NZ_DEFAULT_SCALE_STEP
                });
            }
        }
        getElement() {
            return this.elementRef;
        }
        ngOnChanges(changes) {
            const { nzSrc } = changes;
            if (nzSrc) {
                this.getElement().nativeElement.src = nzSrc.currentValue;
                this.backLoad();
            }
        }
        /**
         * use internal Image object handle fallback & placeholder
         *
         * @private
         */
        backLoad() {
            this.backLoadImage = this.document.createElement('img');
            this.backLoadImage.src = this.nzSrc;
            this.backLoadImage.srcset = this.nzSrcset;
            this.status = 'loading';
            // unsubscribe last backLoad
            this.backLoadDestroy$.next();
            this.backLoadDestroy$.complete();
            this.backLoadDestroy$ = new Subject();
            if (this.backLoadImage.complete) {
                this.status = 'normal';
                this.getElement().nativeElement.src = this.nzSrc;
                this.getElement().nativeElement.srcset = this.nzSrcset;
            }
            else {
                if (this.nzPlaceholder) {
                    this.getElement().nativeElement.src = this.nzPlaceholder;
                    this.getElement().nativeElement.srcset = '';
                }
                else {
                    this.getElement().nativeElement.src = this.nzSrc;
                    this.getElement().nativeElement.srcset = this.nzSrcset;
                }
                // The `nz-image` directive can be destroyed before the `load` or `error` event is dispatched,
                // so there's no sense to keep capturing `this`.
                fromEvent(this.backLoadImage, 'load')
                    .pipe(takeUntil(this.backLoadDestroy$), takeUntil(this.destroy$))
                    .subscribe(() => {
                    this.status = 'normal';
                    this.getElement().nativeElement.src = this.nzSrc;
                    this.getElement().nativeElement.srcset = this.nzSrcset;
                });
                fromEvent(this.backLoadImage, 'error')
                    .pipe(takeUntil(this.backLoadDestroy$), takeUntil(this.destroy$))
                    .subscribe(() => {
                    this.status = 'error';
                    if (this.nzFallback) {
                        this.getElement().nativeElement.src = this.nzFallback;
                        this.getElement().nativeElement.srcset = '';
                    }
                });
            }
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageDirective, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: NzImageService }, { token: i0.ChangeDetectorRef }, { token: i3$1.Directionality }], target: i0.ɵɵFactoryTarget.Directive });
        static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: NzImageDirective, isStandalone: true, selector: "img[nz-image]", inputs: { nzSrc: "nzSrc", nzSrcset: "nzSrcset", nzDisablePreview: ["nzDisablePreview", "nzDisablePreview", booleanAttribute], nzFallback: "nzFallback", nzPlaceholder: "nzPlaceholder", nzScaleStep: "nzScaleStep" }, host: { listeners: { "click": "onPreview()" } }, exportAs: ["nzImage"], usesOnChanges: true, ngImport: i0 });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'img[nz-image]',
                    exportAs: 'nzImage',
                    host: {
                        '(click)': 'onPreview()'
                    }
                }]
        }], ctorParameters: () => [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: NzImageService }, { type: i0.ChangeDetectorRef }, { type: i3$1.Directionality }], propDecorators: { nzSrc: [{
                type: Input
            }], nzSrcset: [{
                type: Input
            }], nzDisablePreview: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzFallback: [{
                type: Input
            }], nzPlaceholder: [{
                type: Input
            }], nzScaleStep: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImageModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule, imports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent], exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule, providers: [NzImageService], imports: [NzImagePreviewComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
                    exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
                    providers: [NzImageService]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_CONFIG_MODULE_NAME$1 as NZ_CONFIG_MODULE_NAME, NZ_DEFAULT_SCALE_STEP, NzImageDirective, NzImageGroupComponent, NzImageModule, NzImagePreviewComponent, NzImagePreviewOptions, NzImagePreviewRef, NzImageService, getClientSize, getFitContentPosition, getOffset };
//# sourceMappingURL=ng-zorro-antd-image.mjs.map
