import * as i0 from '@angular/core';
import { booleanAttribute, Input, Directive, NgModule } from '@angular/core';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzFlexDirective {
    nzVertical = false;
    nzJustify = 'normal';
    nzAlign = 'normal';
    nzGap = 0;
    nzWrap = 'nowrap';
    nzFlex = 'unset';
    get gap() {
        switch (this.nzGap) {
            case 'small':
                return '8px';
            case 'middle':
                return '16px';
            case 'large':
                return '24px';
            default:
                if (typeof this.nzGap === 'number') {
                    return `${this.nzGap}px`;
                }
                return this.nzGap;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzFlexDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: NzFlexDirective, isStandalone: true, selector: "[nz-flex],nz-flex", inputs: { nzVertical: ["nzVertical", "nzVertical", booleanAttribute], nzJustify: "nzJustify", nzAlign: "nzAlign", nzGap: "nzGap", nzWrap: "nzWrap", nzFlex: "nzFlex" }, host: { properties: { "class.ant-flex-vertical": "nzVertical", "class.ant-flex-justify-flex-start": "nzJustify === 'flex-start'", "class.ant-flex-justify-center": "nzJustify === 'center'", "class.ant-flex-justify-flex-end": "nzJustify === 'flex-end'", "class.ant-flex-justify-space-between": "nzJustify === 'space-between'", "class.ant-flex-justify-space-around": "nzJustify === 'space-around'", "class.ant-flex-justify-space-evenly": "nzJustify === 'space-evenly'", "class.ant-flex-justify-start": "nzJustify === 'start'", "class.ant-flex-justify-end": "nzJustify === 'end'", "class.ant-flex-justify-right": "nzJustify === 'right'", "class.ant-flex-justify-left": "nzJustify === 'left'", "class.ant-flex-justify-stretch": "nzJustify === 'stretch'", "class.ant-flex-justify-normal": "nzJustify === 'normal'", "class.ant-flex-align-flex-start": "nzAlign === 'flex-start'", "class.ant-flex-align-center": "nzAlign === 'center'", "class.ant-flex-align-flex-end": "nzAlign === 'flex-end'", "class.ant-flex-align-space-between": "nzAlign === 'space-between'", "class.ant-flex-align-space-around": "nzAlign === 'space-around'", "class.ant-flex-align-space-evenly": "nzAlign === 'space-evenly'", "class.ant-flex-align-start": "nzAlign === 'start'", "class.ant-flex-align-end": "nzAlign === 'end'", "class.ant-flex-align-right": "nzAlign === 'right'", "class.ant-flex-align-left": "nzAlign === 'left'", "class.ant-flex-align-stretch": "nzAlign === 'stretch'", "class.ant-flex-align-normal": "nzAlign === 'normal'", "class.ant-flex-wrap-wrap": "nzWrap === 'wrap'", "class.ant-flex-wrap-wrap-reverse": "nzWrap === 'wrap-reverse'", "class.ant-flex-wrap-nowrap": "nzWrap === 'nowrap'", "style.gap": "gap", "style.flex": "nzFlex" }, classAttribute: "ant-flex" }, exportAs: ["nzFlex"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzFlexDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-flex],nz-flex',
                    exportAs: 'nzFlex',
                    host: {
                        class: 'ant-flex',
                        '[class.ant-flex-vertical]': `nzVertical`,
                        '[class.ant-flex-justify-flex-start]': `nzJustify === 'flex-start'`,
                        '[class.ant-flex-justify-center]': `nzJustify === 'center'`,
                        '[class.ant-flex-justify-flex-end]': `nzJustify === 'flex-end'`,
                        '[class.ant-flex-justify-space-between]': `nzJustify === 'space-between'`,
                        '[class.ant-flex-justify-space-around]': `nzJustify === 'space-around'`,
                        '[class.ant-flex-justify-space-evenly]': `nzJustify === 'space-evenly'`,
                        '[class.ant-flex-justify-start]': `nzJustify === 'start'`,
                        '[class.ant-flex-justify-end]': `nzJustify === 'end'`,
                        '[class.ant-flex-justify-right]': `nzJustify === 'right'`,
                        '[class.ant-flex-justify-left]': `nzJustify === 'left'`,
                        '[class.ant-flex-justify-stretch]': `nzJustify === 'stretch'`,
                        '[class.ant-flex-justify-normal]': `nzJustify === 'normal'`,
                        '[class.ant-flex-align-flex-start]': `nzAlign === 'flex-start'`,
                        '[class.ant-flex-align-center]': `nzAlign === 'center'`,
                        '[class.ant-flex-align-flex-end]': `nzAlign === 'flex-end'`,
                        '[class.ant-flex-align-space-between]': `nzAlign === 'space-between'`,
                        '[class.ant-flex-align-space-around]': `nzAlign === 'space-around'`,
                        '[class.ant-flex-align-space-evenly]': `nzAlign === 'space-evenly'`,
                        '[class.ant-flex-align-start]': `nzAlign === 'start'`,
                        '[class.ant-flex-align-end]': `nzAlign === 'end'`,
                        '[class.ant-flex-align-right]': `nzAlign === 'right'`,
                        '[class.ant-flex-align-left]': `nzAlign === 'left'`,
                        '[class.ant-flex-align-stretch]': `nzAlign === 'stretch'`,
                        '[class.ant-flex-align-normal]': `nzAlign === 'normal'`,
                        '[class.ant-flex-wrap-wrap]': `nzWrap === 'wrap'`,
                        '[class.ant-flex-wrap-wrap-reverse]': `nzWrap === 'wrap-reverse'`,
                        '[class.ant-flex-wrap-nowrap]': `nzWrap === 'nowrap'`,
                        '[style.gap]': `gap`,
                        '[style.flex]': `nzFlex`
                    }
                }]
        }], propDecorators: { nzVertical: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzJustify: [{
                type: Input
            }], nzAlign: [{
                type: Input
            }], nzGap: [{
                type: Input
            }], nzWrap: [{
                type: Input
            }], nzFlex: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzFlexModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzFlexModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzFlexModule, imports: [NzFlexDirective], exports: [NzFlexDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzFlexModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzFlexModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzFlexDirective],
                    exports: [NzFlexDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzFlexDirective, NzFlexModule };
//# sourceMappingURL=ng-zorro-antd-flex.mjs.map
