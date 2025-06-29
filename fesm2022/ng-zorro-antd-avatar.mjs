import { __esDecorate, __runInitializers } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, inject, ElementRef, ChangeDetectorRef, afterRender, numberAttribute, ViewChild, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import * as i1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NZ_CONFIG_MODULE_NAME = 'avatar';
let NzAvatarComponent = (() => {
    let _nzShape_decorators;
    let _nzShape_initializers = [];
    let _nzShape_extraInitializers = [];
    let _nzSize_decorators;
    let _nzSize_initializers = [];
    let _nzSize_extraInitializers = [];
    let _nzGap_decorators;
    let _nzGap_initializers = [];
    let _nzGap_extraInitializers = [];
    return class NzAvatarComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzShape_decorators = [WithConfig()];
            _nzSize_decorators = [WithConfig()];
            _nzGap_decorators = [WithConfig()];
            __esDecorate(null, null, _nzShape_decorators, { kind: "field", name: "nzShape", static: false, private: false, access: { has: obj => "nzShape" in obj, get: obj => obj.nzShape, set: (obj, value) => { obj.nzShape = value; } }, metadata: _metadata }, _nzShape_initializers, _nzShape_extraInitializers);
            __esDecorate(null, null, _nzSize_decorators, { kind: "field", name: "nzSize", static: false, private: false, access: { has: obj => "nzSize" in obj, get: obj => obj.nzSize, set: (obj, value) => { obj.nzSize = value; } }, metadata: _metadata }, _nzSize_initializers, _nzSize_extraInitializers);
            __esDecorate(null, null, _nzGap_decorators, { kind: "field", name: "nzGap", static: false, private: false, access: { has: obj => "nzGap" in obj, get: obj => obj.nzGap, set: (obj, value) => { obj.nzGap = value; } }, metadata: _metadata }, _nzGap_initializers, _nzGap_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzShape = __runInitializers(this, _nzShape_initializers, 'circle');
        nzSize = (__runInitializers(this, _nzShape_extraInitializers), __runInitializers(this, _nzSize_initializers, 'default'));
        nzGap = (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzGap_initializers, 4));
        nzText = __runInitializers(this, _nzGap_extraInitializers);
        nzSrc;
        nzSrcSet;
        nzAlt;
        nzIcon;
        nzError = new EventEmitter();
        hasText = false;
        hasSrc = true;
        hasIcon = false;
        customSize = null;
        textEl;
        el = inject(ElementRef).nativeElement;
        cdr = inject(ChangeDetectorRef);
        constructor() {
            afterRender(() => this.calcStringSize());
        }
        imgError(event) {
            this.nzError.emit(event);
            if (!event.defaultPrevented) {
                this.hasSrc = false;
                this.hasIcon = false;
                this.hasText = false;
                if (this.nzIcon) {
                    this.hasIcon = true;
                }
                else if (this.nzText) {
                    this.hasText = true;
                }
                this.cdr.detectChanges();
                this.setSizeStyle();
                this.calcStringSize();
            }
        }
        ngOnChanges() {
            this.hasText = !this.nzSrc && !!this.nzText;
            this.hasIcon = !this.nzSrc && !!this.nzIcon;
            this.hasSrc = !!this.nzSrc;
            this.setSizeStyle();
            this.calcStringSize();
        }
        calcStringSize() {
            if (!this.hasText || !this.textEl) {
                return;
            }
            const textEl = this.textEl.nativeElement;
            const childrenWidth = textEl.offsetWidth;
            const avatarWidth = this.el.getBoundingClientRect?.().width ?? 0;
            const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
            const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;
            textEl.style.transform = `scale(${scale}) translateX(-50%)`;
            textEl.style.lineHeight = this.customSize || '';
        }
        setSizeStyle() {
            if (typeof this.nzSize === 'number') {
                this.customSize = toCssPixel(this.nzSize);
            }
            else {
                this.customSize = null;
            }
            this.cdr.markForCheck();
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzAvatarComponent, isStandalone: true, selector: "nz-avatar", inputs: { nzShape: "nzShape", nzSize: "nzSize", nzGap: ["nzGap", "nzGap", numberAttribute], nzText: "nzText", nzSrc: "nzSrc", nzSrcSet: "nzSrcSet", nzAlt: "nzAlt", nzIcon: "nzIcon" }, outputs: { nzError: "nzError" }, host: { properties: { "class.ant-avatar-lg": "nzSize === 'large'", "class.ant-avatar-sm": "nzSize === 'small'", "class.ant-avatar-square": "nzShape === 'square'", "class.ant-avatar-circle": "nzShape === 'circle'", "class.ant-avatar-icon": "nzIcon", "class.ant-avatar-image": "hasSrc ", "style.width": "customSize", "style.height": "customSize", "style.line-height": "customSize", "style.font-size.px": "(hasIcon && customSize) ? $any(nzSize) / 2 : null" }, classAttribute: "ant-avatar" }, viewQueries: [{ propertyName: "textEl", first: true, predicate: ["textEl"], descendants: true }], exportAs: ["nzAvatar"], usesOnChanges: true, ngImport: i0, template: `
    @if (nzIcon && hasIcon) {
      <nz-icon [nzType]="nzIcon" />
    } @else if (nzSrc && hasSrc) {
      <img [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    } @else if (nzText && hasText) {
      <span class="ant-avatar-string" #textEl>{{ nzText }}</span>
    }
    <ng-content></ng-content>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-avatar',
                    exportAs: 'nzAvatar',
                    imports: [NzIconModule],
                    template: `
    @if (nzIcon && hasIcon) {
      <nz-icon [nzType]="nzIcon" />
    } @else if (nzSrc && hasSrc) {
      <img [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    } @else if (nzText && hasText) {
      <span class="ant-avatar-string" #textEl>{{ nzText }}</span>
    }
    <ng-content></ng-content>
  `,
                    host: {
                        class: 'ant-avatar',
                        '[class.ant-avatar-lg]': `nzSize === 'large'`,
                        '[class.ant-avatar-sm]': `nzSize === 'small'`,
                        '[class.ant-avatar-square]': `nzShape === 'square'`,
                        '[class.ant-avatar-circle]': `nzShape === 'circle'`,
                        '[class.ant-avatar-icon]': `nzIcon`,
                        '[class.ant-avatar-image]': `hasSrc `,
                        '[style.width]': 'customSize',
                        '[style.height]': 'customSize',
                        '[style.line-height]': 'customSize',
                        // nzSize type is number when customSize is true
                        '[style.font-size.px]': '(hasIcon && customSize) ? $any(nzSize) / 2 : null'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: () => [], propDecorators: { nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzGap: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzText: [{
                type: Input
            }], nzSrc: [{
                type: Input
            }], nzSrcSet: [{
                type: Input
            }], nzAlt: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }], nzError: [{
                type: Output
            }], textEl: [{
                type: ViewChild,
                args: ['textEl', { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAvatarGroupComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzAvatarGroupComponent, isStandalone: true, selector: "nz-avatar-group", host: { classAttribute: "ant-avatar-group" }, exportAs: ["nzAvatarGroup"], ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-avatar-group',
                    exportAs: 'nzAvatarGroup',
                    template: `<ng-content></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-avatar-group'
                    }
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAvatarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarModule, imports: [NzAvatarComponent, NzAvatarGroupComponent], exports: [NzAvatarComponent, NzAvatarGroupComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarModule, imports: [NzAvatarComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAvatarModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [NzAvatarComponent, NzAvatarGroupComponent],
                    imports: [NzAvatarComponent, NzAvatarGroupComponent]
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

export { NzAvatarComponent, NzAvatarGroupComponent, NzAvatarModule };
//# sourceMappingURL=ng-zorro-antd-avatar.mjs.map
