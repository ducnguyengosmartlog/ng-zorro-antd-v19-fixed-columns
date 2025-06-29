import { __esDecorate, __runInitializers } from 'tslib';
import * as i0 from '@angular/core';
import { booleanAttribute, ViewChild, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { NzImageDirective } from 'ng-zorro-antd/image';
import { isNil } from 'ng-zorro-antd/core/util';
import * as i2 from 'ng-zorro-antd/core/services';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isFixedSize(size) {
    return typeof size === 'number' || /^(\d)+(px)?$/.test(size);
}
function normalizeSrc(src) {
    return src[0] === '/' ? src.slice(1) : src;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const defaultImageSrcLoader = ({ src }) => {
    return src;
};
/**
 * AliObjectsLoader return format
 * {domain}/{src}?x-oss-process=image/resize,w_{width}
 */
function createAliObjectsLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `?x-oss-process=image/resize,w_${width}`;
        return `${domain}/${normalizeSrc(src)}${params}`;
    };
}
/**
 * ImgixLoader return format
 * {domain}/{src}?format=auto&fit=max&w={width}
 */
function createImgixLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `&fit=max&w=${width}`;
        return `${domain}/${normalizeSrc(src)}?format=auto${params}`;
    };
}
/**
 * CloudinaryLoader return format
 * {domain}/c_limit,q_auto,w_{width}/{src}
 */
function createCloudinaryLoader(domain) {
    return ({ src, width }) => {
        const params = isNil(width) ? '' : `,w_${width}`;
        return `${domain}/c_limit,q_auto${params}/${normalizeSrc(src)}`;
    };
}

const NZ_CONFIG_MODULE_NAME = 'imageExperimental';
const sizeBreakpoints = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
let NzImageViewComponent = (() => {
    let _nzSrcLoader_decorators;
    let _nzSrcLoader_initializers = [];
    let _nzSrcLoader_extraInitializers = [];
    let _nzAutoSrcset_decorators;
    let _nzAutoSrcset_initializers = [];
    let _nzAutoSrcset_extraInitializers = [];
    let _nzFallback_decorators;
    let _nzFallback_initializers = [];
    let _nzFallback_extraInitializers = [];
    let _nzPlaceholder_decorators;
    let _nzPlaceholder_initializers = [];
    let _nzPlaceholder_extraInitializers = [];
    let _nzDisablePreview_decorators;
    let _nzDisablePreview_initializers = [];
    let _nzDisablePreview_extraInitializers = [];
    return class NzImageViewComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzSrcLoader_decorators = [WithConfig()];
            _nzAutoSrcset_decorators = [WithConfig()];
            _nzFallback_decorators = [WithConfig()];
            _nzPlaceholder_decorators = [WithConfig()];
            _nzDisablePreview_decorators = [WithConfig()];
            __esDecorate(null, null, _nzSrcLoader_decorators, { kind: "field", name: "nzSrcLoader", static: false, private: false, access: { has: obj => "nzSrcLoader" in obj, get: obj => obj.nzSrcLoader, set: (obj, value) => { obj.nzSrcLoader = value; } }, metadata: _metadata }, _nzSrcLoader_initializers, _nzSrcLoader_extraInitializers);
            __esDecorate(null, null, _nzAutoSrcset_decorators, { kind: "field", name: "nzAutoSrcset", static: false, private: false, access: { has: obj => "nzAutoSrcset" in obj, get: obj => obj.nzAutoSrcset, set: (obj, value) => { obj.nzAutoSrcset = value; } }, metadata: _metadata }, _nzAutoSrcset_initializers, _nzAutoSrcset_extraInitializers);
            __esDecorate(null, null, _nzFallback_decorators, { kind: "field", name: "nzFallback", static: false, private: false, access: { has: obj => "nzFallback" in obj, get: obj => obj.nzFallback, set: (obj, value) => { obj.nzFallback = value; } }, metadata: _metadata }, _nzFallback_initializers, _nzFallback_extraInitializers);
            __esDecorate(null, null, _nzPlaceholder_decorators, { kind: "field", name: "nzPlaceholder", static: false, private: false, access: { has: obj => "nzPlaceholder" in obj, get: obj => obj.nzPlaceholder, set: (obj, value) => { obj.nzPlaceholder = value; } }, metadata: _metadata }, _nzPlaceholder_initializers, _nzPlaceholder_extraInitializers);
            __esDecorate(null, null, _nzDisablePreview_decorators, { kind: "field", name: "nzDisablePreview", static: false, private: false, access: { has: obj => "nzDisablePreview" in obj, get: obj => obj.nzDisablePreview, set: (obj, value) => { obj.nzDisablePreview = value; } }, metadata: _metadata }, _nzDisablePreview_initializers, _nzDisablePreview_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        cdr;
        nzConfigService;
        imagePreloadService;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzSrc = '';
        nzAlt = '';
        nzWidth = 'auto';
        nzHeight = 'auto';
        nzSrcLoader = __runInitializers(this, _nzSrcLoader_initializers, defaultImageSrcLoader);
        nzAutoSrcset = (__runInitializers(this, _nzSrcLoader_extraInitializers), __runInitializers(this, _nzAutoSrcset_initializers, false));
        nzPriority = (__runInitializers(this, _nzAutoSrcset_extraInitializers), false);
        nzFallback = __runInitializers(this, _nzFallback_initializers, null);
        nzPlaceholder = (__runInitializers(this, _nzFallback_extraInitializers), __runInitializers(this, _nzPlaceholder_initializers, null));
        nzDisablePreview = (__runInitializers(this, _nzPlaceholder_extraInitializers), __runInitializers(this, _nzDisablePreview_initializers, false));
        imageRef = __runInitializers(this, _nzDisablePreview_extraInitializers);
        src = '';
        width = 'auto';
        height = 'auto';
        srcset = '';
        internalImage;
        destroy$ = new Subject();
        reloadDisposeHandler = () => void 0;
        constructor(cdr, nzConfigService, imagePreloadService) {
            this.cdr = cdr;
            this.nzConfigService = nzConfigService;
            this.imagePreloadService = imagePreloadService;
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.composeImageAttrs();
                this.cdr.markForCheck();
            });
        }
        ngOnInit() {
            if (this.nzPriority) {
                this.preload();
            }
        }
        ngOnChanges(changes) {
            const { nzLoader, nzSrc, nzOptimize } = changes;
            if (nzSrc || nzLoader || nzOptimize) {
                this.composeImageAttrs();
            }
        }
        ngOnDestroy() {
            this.reloadDisposeHandler();
            this.destroy$.next();
            this.destroy$.complete();
        }
        preload() {
            this.reloadDisposeHandler = this.imagePreloadService.addPreload({
                src: this.src,
                srcset: this.srcset
            });
        }
        optimizable() {
            if (this.nzAutoSrcset) {
                if (!isFixedSize(this.nzWidth) || !isFixedSize(this.nzHeight)) {
                    warn(`When using "nzAutoSrcset" you should use a fixed size width and height, for more information please refer to CLS (https://web.dev/cls/) performance metrics`);
                    return false;
                }
                if (this.nzSrc.endsWith('.svg')) {
                    warn(`SVG does not need to be optimized`);
                    return false;
                }
                if (this.nzSrc.startsWith('data:')) {
                    warn(`Data URLs cannot be optimized`);
                    return false;
                }
                return true;
            }
            return false;
        }
        composeImageAttrs() {
            const loader = this.getLoader();
            if (!this.optimizable()) {
                this.src = loader({ src: this.nzSrc });
                this.width = this.nzWidth;
                this.height = this.nzHeight;
                return;
            }
            this.width = typeof this.nzWidth === 'number' ? this.nzWidth : parseInt(this.nzWidth, 10);
            this.height = typeof this.nzHeight === 'number' ? this.nzHeight : parseInt(this.nzHeight, 10);
            const widths = this.convertWidths(this.width, sizeBreakpoints);
            this.src = loader({ src: this.nzSrc, width: widths[0] });
            this.srcset = widths
                .map((w, i) => `${loader({
                src: this.nzSrc,
                width: w
            })} ${i + 1}x`)
                .join(', ');
        }
        getLoader() {
            return this.nzSrcLoader || defaultImageSrcLoader;
        }
        convertWidths(width, optimizeSizes) {
            const allSizes = [...optimizeSizes].sort((a, b) => a - b);
            return [
                ...new Set(
                // 2x scale is sufficient
                // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
                [width, width * 2].map(w => allSizes.find(p => p >= w) || w))
            ];
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: i2.ImagePreloadService }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "19.2.2", type: NzImageViewComponent, isStandalone: true, selector: "nz-image", inputs: { nzSrc: "nzSrc", nzAlt: "nzAlt", nzWidth: "nzWidth", nzHeight: "nzHeight", nzSrcLoader: "nzSrcLoader", nzAutoSrcset: ["nzAutoSrcset", "nzAutoSrcset", booleanAttribute], nzPriority: ["nzPriority", "nzPriority", booleanAttribute], nzFallback: "nzFallback", nzPlaceholder: "nzPlaceholder", nzDisablePreview: ["nzDisablePreview", "nzDisablePreview", booleanAttribute] }, viewQueries: [{ propertyName: "imageRef", first: true, predicate: ["imageRef"], descendants: true }], exportAs: ["nzImage"], usesOnChanges: true, ngImport: i0, template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `, isInline: true, dependencies: [{ kind: "directive", type: NzImageDirective, selector: "img[nz-image]", inputs: ["nzSrc", "nzSrcset", "nzDisablePreview", "nzFallback", "nzPlaceholder", "nzScaleStep"], exportAs: ["nzImage"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-image',
                    exportAs: 'nzImage',
                    template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    imports: [NzImageDirective]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: i2.ImagePreloadService }], propDecorators: { nzSrc: [{
                type: Input
            }], nzAlt: [{
                type: Input
            }], nzWidth: [{
                type: Input
            }], nzHeight: [{
                type: Input
            }], nzSrcLoader: [{
                type: Input
            }], nzAutoSrcset: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzPriority: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzFallback: [{
                type: Input
            }], nzPlaceholder: [{
                type: Input
            }], nzDisablePreview: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], imageRef: [{
                type: ViewChild,
                args: ['imageRef']
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzImageModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule, imports: [NzImageViewComponent], exports: [NzImageViewComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzImageViewComponent],
                    exports: [NzImageViewComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_CONFIG_MODULE_NAME, NzImageModule, NzImageViewComponent, createAliObjectsLoader, createCloudinaryLoader, createImgixLoader, defaultImageSrcLoader, isFixedSize, normalizeSrc };
//# sourceMappingURL=ng-zorro-antd-experimental-image.mjs.map
