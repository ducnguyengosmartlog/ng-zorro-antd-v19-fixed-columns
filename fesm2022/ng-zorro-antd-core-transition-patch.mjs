import * as i0 from '@angular/core';
import { Input, Directive, NgModule } from '@angular/core';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * hack the bug
 * angular router change with unexpected transition trigger after calling applicationRef.attachView
 * https://github.com/angular/angular/issues/34718
 */
class NzTransitionPatchDirective {
    elementRef;
    renderer;
    hidden = null;
    setHiddenAttribute() {
        if (this.hidden) {
            if (typeof this.hidden === 'string') {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', this.hidden);
            }
            else {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
            }
        }
        else {
            this.renderer.removeAttribute(this.elementRef.nativeElement, 'hidden');
        }
    }
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', '');
    }
    ngOnChanges() {
        this.setHiddenAttribute();
    }
    ngAfterViewInit() {
        this.setHiddenAttribute();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransitionPatchDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzTransitionPatchDirective, isStandalone: true, selector: "[nz-button], nz-button-group, [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: { hidden: "hidden" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransitionPatchDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-button], nz-button-group, [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { hidden: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTransitionPatchModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransitionPatchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzTransitionPatchModule, imports: [NzTransitionPatchDirective], exports: [NzTransitionPatchDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransitionPatchModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransitionPatchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzTransitionPatchDirective],
                    exports: [NzTransitionPatchDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTransitionPatchDirective as ɵNzTransitionPatchDirective, NzTransitionPatchModule as ɵNzTransitionPatchModule };
//# sourceMappingURL=ng-zorro-antd-core-transition-patch.mjs.map
