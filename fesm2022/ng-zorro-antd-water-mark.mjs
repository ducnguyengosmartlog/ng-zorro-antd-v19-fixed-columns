import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, numberAttribute, Input, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
function getPixelRatio() {
    return window.devicePixelRatio || 1;
}
function toLowercaseSeparator(key) {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}
function getStyleStr(style) {
    const keys = Object.keys(style);
    const styleCss = keys.map((key) => `${toLowercaseSeparator(key)}: ${style[key]};`);
    return styleCss.join(' ');
}
/** Whether to re-render the watermark */
function reRendering(mutation, watermarkElement) {
    let flag = false;
    // Whether to delete the watermark node
    if (mutation.removedNodes.length) {
        flag = Array.from(mutation.removedNodes).some(node => node === watermarkElement);
    }
    // Whether the watermark dom property value has been modified
    if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
        flag = true;
    }
    return flag;
}
/** Rotate with the watermark as the center point */
function rotateWatermark(ctx, rotateX, rotateY, rotate) {
    ctx.translate(rotateX, rotateY);
    ctx.rotate((Math.PI / 180) * Number(rotate));
    ctx.translate(-rotateX, -rotateY);
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
const BaseSize = 2;
const FontGap = 3;
class NzWaterMarkComponent {
    el;
    cdr;
    nzWidth = 120;
    nzHeight = 64;
    nzRotate = -22;
    nzZIndex = 9;
    nzImage = '';
    nzContent = '';
    nzFont = {};
    nzGap = [100, 100];
    nzOffset = [this.nzGap[0] / 2, this.nzGap[1] / 2];
    document = inject(DOCUMENT);
    waterMarkElement = this.document.createElement('div');
    stopObservation = false;
    observer = new MutationObserver(mutations => {
        if (this.stopObservation) {
            return;
        }
        mutations.forEach(mutation => {
            if (reRendering(mutation, this.waterMarkElement)) {
                this.destroyWatermark();
                this.renderWatermark();
            }
        });
    });
    constructor(el, cdr) {
        this.el = el;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.observer.observe(this.el.nativeElement, {
            subtree: true,
            childList: true,
            attributeFilter: ['style', 'class']
        });
    }
    ngAfterViewInit() {
        this.renderWatermark();
    }
    ngOnChanges(changes) {
        const { nzRotate, nzZIndex, nzWidth, nzHeight, nzImage, nzContent, nzFont, gapX, gapY, offsetLeft, offsetTop } = changes;
        if (nzRotate ||
            nzZIndex ||
            nzWidth ||
            nzHeight ||
            nzImage ||
            nzContent ||
            nzFont ||
            gapX ||
            gapY ||
            offsetLeft ||
            offsetTop) {
            this.renderWatermark();
        }
    }
    getFont() {
        const font = {
            color: 'rgba(0,0,0,.15)',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontStyle: 'normal'
        };
        this.nzFont = { ...font, ...this.nzFont };
        this.cdr.markForCheck();
    }
    getMarkStyle() {
        const markStyle = {
            zIndex: this.nzZIndex,
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            backgroundRepeat: 'repeat',
            visibility: 'visible'
        };
        /** Calculate the style of the nzOffset */
        let positionLeft = (this.nzOffset?.[0] ?? this.nzGap[0] / 2) - this.nzGap[0] / 2;
        let positionTop = (this.nzOffset?.[1] ?? this.nzGap[1] / 2) - this.nzGap[1] / 2;
        if (positionLeft > 0) {
            markStyle.left = `${positionLeft}px`;
            markStyle.width = `calc(100% - ${positionLeft}px)`;
            positionLeft = 0;
        }
        if (positionTop > 0) {
            markStyle.top = `${positionTop}px`;
            markStyle.height = `calc(100% - ${positionTop}px)`;
            positionTop = 0;
        }
        markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;
        return markStyle;
    }
    destroyWatermark() {
        if (this.waterMarkElement) {
            this.waterMarkElement.remove();
        }
    }
    appendWatermark(base64Url, markWidth) {
        this.stopObservation = true;
        this.waterMarkElement.setAttribute('style', getStyleStr({
            ...this.getMarkStyle(),
            backgroundImage: `url('${base64Url}')`,
            backgroundSize: `${(this.nzGap[0] + markWidth) * BaseSize}px`
        }));
        this.el.nativeElement.append(this.waterMarkElement);
        this.cdr.markForCheck();
        // Delayed execution
        setTimeout(() => {
            this.stopObservation = false;
            this.cdr.markForCheck();
        });
    }
    getMarkSize(ctx) {
        let defaultWidth = 120;
        let defaultHeight = 64;
        if (!this.nzImage && ctx.measureText) {
            ctx.font = `${Number(this.nzFont.fontSize)}px ${this.nzFont.fontFamily}`;
            const contents = Array.isArray(this.nzContent) ? this.nzContent : [this.nzContent];
            const widths = contents.map(item => ctx.measureText(item).width);
            defaultWidth = Math.ceil(Math.max(...widths));
            defaultHeight = Number(this.nzFont.fontSize) * contents.length + (contents.length - 1) * FontGap;
        }
        return [this.nzWidth ?? defaultWidth, this.nzHeight ?? defaultHeight];
    }
    fillTexts(ctx, drawX, drawY, drawWidth, drawHeight) {
        const ratio = getPixelRatio();
        const mergedFontSize = Number(this.nzFont.fontSize) * ratio;
        ctx.font = `${this.nzFont.fontStyle} normal ${this.nzFont.fontWeight} ${mergedFontSize}px/${drawHeight}px ${this.nzFont.fontFamily}`;
        if (this.nzFont.color)
            ctx.fillStyle = this.nzFont.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.translate(drawWidth / 2, 0);
        const contents = Array.isArray(this.nzContent) ? this.nzContent : [this.nzContent];
        contents?.forEach((item, index) => {
            ctx.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio));
        });
    }
    drawText(canvas, ctx, drawX, drawY, drawWidth, drawHeight, alternateRotateX, alternateRotateY, alternateDrawX, alternateDrawY, markWidth) {
        this.fillTexts(ctx, drawX, drawY, drawWidth, drawHeight);
        /** Fill the interleaved text after rotation */
        ctx.restore();
        rotateWatermark(ctx, alternateRotateX, alternateRotateY, this.nzRotate);
        this.fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
        this.appendWatermark(canvas.toDataURL(), markWidth);
    }
    renderWatermark() {
        if (!this.nzContent && !this.nzImage) {
            return;
        }
        const canvas = this.document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            if (!this.waterMarkElement) {
                this.waterMarkElement = this.document.createElement('div');
            }
            this.getFont();
            const ratio = getPixelRatio();
            const [markWidth, markHeight] = this.getMarkSize(ctx);
            const canvasWidth = (this.nzGap[0] + markWidth) * ratio;
            const canvasHeight = (this.nzGap[1] + markHeight) * ratio;
            canvas.setAttribute('width', `${canvasWidth * BaseSize}px`);
            canvas.setAttribute('height', `${canvasHeight * BaseSize}px`);
            const drawX = (this.nzGap[0] * ratio) / 2;
            const drawY = (this.nzGap[1] * ratio) / 2;
            const drawWidth = markWidth * ratio;
            const drawHeight = markHeight * ratio;
            const rotateX = (drawWidth + this.nzGap[0] * ratio) / 2;
            const rotateY = (drawHeight + this.nzGap[1] * ratio) / 2;
            /** Alternate drawing parameters */
            const alternateDrawX = drawX + canvasWidth;
            const alternateDrawY = drawY + canvasHeight;
            const alternateRotateX = rotateX + canvasWidth;
            const alternateRotateY = rotateY + canvasHeight;
            ctx.save();
            rotateWatermark(ctx, rotateX, rotateY, this.nzRotate);
            if (this.nzImage) {
                const img = new Image();
                const onLoad = () => {
                    cleanup();
                    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                    /** Draw interleaved pictures after rotation */
                    ctx.restore();
                    rotateWatermark(ctx, alternateRotateX, alternateRotateY, this.nzRotate);
                    ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
                    this.appendWatermark(canvas.toDataURL(), markWidth);
                };
                const onError = () => {
                    cleanup();
                    this.drawText(canvas, ctx, drawX, drawY, drawWidth, drawHeight, alternateRotateX, alternateRotateY, alternateDrawX, alternateDrawY, markWidth);
                };
                const cleanup = () => {
                    img.removeEventListener('load', onLoad);
                    img.removeEventListener('error', onError);
                };
                img.addEventListener('load', onLoad);
                img.addEventListener('error', onError);
                img.crossOrigin = 'anonymous';
                img.referrerPolicy = 'no-referrer';
                img.src = this.nzImage;
            }
            else {
                this.drawText(canvas, ctx, drawX, drawY, drawWidth, drawHeight, alternateRotateX, alternateRotateY, alternateDrawX, alternateDrawY, markWidth);
            }
        }
    }
    ngOnDestroy() {
        this.observer.disconnect();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaterMarkComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "19.2.2", type: NzWaterMarkComponent, isStandalone: true, selector: "nz-water-mark", inputs: { nzWidth: ["nzWidth", "nzWidth", numberAttribute], nzHeight: ["nzHeight", "nzHeight", numberAttribute], nzRotate: ["nzRotate", "nzRotate", numberAttribute], nzZIndex: ["nzZIndex", "nzZIndex", numberAttribute], nzImage: "nzImage", nzContent: "nzContent", nzFont: "nzFont", nzGap: "nzGap", nzOffset: "nzOffset" }, host: { classAttribute: "ant-water-mark" }, exportAs: ["NzWaterMark"], usesOnChanges: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaterMarkComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-water-mark',
                    exportAs: 'NzWaterMark',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-water-mark'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { nzWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzHeight: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzRotate: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzZIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzImage: [{
                type: Input
            }], nzContent: [{
                type: Input
            }], nzFont: [{
                type: Input
            }], nzGap: [{
                type: Input
            }], nzOffset: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzWaterMarkModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaterMarkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzWaterMarkModule, imports: [NzWaterMarkComponent], exports: [NzWaterMarkComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaterMarkModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaterMarkModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzWaterMarkComponent],
                    imports: [NzWaterMarkComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzWaterMarkComponent, NzWaterMarkModule };
//# sourceMappingURL=ng-zorro-antd-water-mark.mjs.map
