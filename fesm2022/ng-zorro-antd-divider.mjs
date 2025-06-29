import * as i0 from '@angular/core';
import { booleanAttribute, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDividerComponent {
    nzText;
    nzType = 'horizontal';
    nzOrientation = 'center';
    nzVariant = 'solid';
    nzDashed = false;
    nzPlain = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzDividerComponent, isStandalone: true, selector: "nz-divider", inputs: { nzText: "nzText", nzType: "nzType", nzOrientation: "nzOrientation", nzVariant: "nzVariant", nzDashed: ["nzDashed", "nzDashed", booleanAttribute], nzPlain: ["nzPlain", "nzPlain", booleanAttribute] }, host: { properties: { "class.ant-divider-horizontal": "nzType === 'horizontal'", "class.ant-divider-vertical": "nzType === 'vertical'", "class.ant-divider-with-text": "nzText", "class.ant-divider-plain": "nzPlain", "class.ant-divider-with-text-left": "nzText && nzOrientation === 'left'", "class.ant-divider-with-text-right": "nzText && nzOrientation === 'right'", "class.ant-divider-with-text-center": "nzText && nzOrientation === 'center'", "class.ant-divider-dashed": "nzDashed || nzVariant === 'dashed'", "class.ant-divider-dotted": "nzVariant === 'dotted'" }, classAttribute: "ant-divider" }, exportAs: ["nzDivider"], ngImport: i0, template: `
    @if (nzText) {
      <span class="ant-divider-inner-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDividerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-divider',
                    exportAs: 'nzDivider',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    @if (nzText) {
      <span class="ant-divider-inner-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
  `,
                    host: {
                        class: 'ant-divider',
                        '[class.ant-divider-horizontal]': `nzType === 'horizontal'`,
                        '[class.ant-divider-vertical]': `nzType === 'vertical'`,
                        '[class.ant-divider-with-text]': `nzText`,
                        '[class.ant-divider-plain]': `nzPlain`,
                        '[class.ant-divider-with-text-left]': `nzText && nzOrientation === 'left'`,
                        '[class.ant-divider-with-text-right]': `nzText && nzOrientation === 'right'`,
                        '[class.ant-divider-with-text-center]': `nzText && nzOrientation === 'center'`,
                        '[class.ant-divider-dashed]': `nzDashed || nzVariant === 'dashed'`,
                        '[class.ant-divider-dotted]': `nzVariant === 'dotted'`
                    },
                    imports: [NzOutletModule]
                }]
        }], propDecorators: { nzText: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzOrientation: [{
                type: Input
            }], nzVariant: [{
                type: Input
            }], nzDashed: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzPlain: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDividerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDividerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzDividerModule, imports: [NzDividerComponent], exports: [NzDividerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDividerModule, imports: [NzDividerComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDividerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzDividerComponent],
                    exports: [NzDividerComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzDividerComponent, NzDividerModule };
//# sourceMappingURL=ng-zorro-antd-divider.mjs.map
