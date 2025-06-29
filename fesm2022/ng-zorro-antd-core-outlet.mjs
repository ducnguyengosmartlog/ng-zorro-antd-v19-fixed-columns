import * as i0 from '@angular/core';
import { Input, Directive, NgModule } from '@angular/core';
import { isTemplateRef } from 'ng-zorro-antd/core/util';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzStringTemplateOutletDirective {
    viewContainer;
    templateRef;
    embeddedViewRef = null;
    context = new NzStringTemplateOutletContext();
    nzStringTemplateOutletContext = null;
    nzStringTemplateOutlet = null;
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    recreateView() {
        this.viewContainer.clear();
        if (isTemplateRef(this.nzStringTemplateOutlet)) {
            this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.nzStringTemplateOutlet, this.nzStringTemplateOutletContext);
        }
        else {
            this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.context);
        }
    }
    updateContext() {
        const newCtx = isTemplateRef(this.nzStringTemplateOutlet) ? this.nzStringTemplateOutletContext : this.context;
        const oldCtx = this.embeddedViewRef.context;
        if (newCtx) {
            for (const propName of Object.keys(newCtx)) {
                oldCtx[propName] = newCtx[propName];
            }
        }
    }
    constructor(viewContainer, templateRef) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
    }
    ngOnChanges(changes) {
        const { nzStringTemplateOutletContext, nzStringTemplateOutlet } = changes;
        const shouldRecreateView = () => {
            let shouldOutletRecreate = false;
            if (nzStringTemplateOutlet) {
                shouldOutletRecreate =
                    nzStringTemplateOutlet.firstChange ||
                        isTemplateRef(nzStringTemplateOutlet.previousValue) ||
                        isTemplateRef(nzStringTemplateOutlet.currentValue);
            }
            const hasContextShapeChanged = (ctxChange) => {
                const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
                const currCtxKeys = Object.keys(ctxChange.currentValue || {});
                if (prevCtxKeys.length === currCtxKeys.length) {
                    for (const propName of currCtxKeys) {
                        if (prevCtxKeys.indexOf(propName) === -1) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            };
            const shouldContextRecreate = nzStringTemplateOutletContext && hasContextShapeChanged(nzStringTemplateOutletContext);
            return shouldContextRecreate || shouldOutletRecreate;
        };
        if (nzStringTemplateOutlet) {
            this.context.$implicit = nzStringTemplateOutlet.currentValue;
        }
        const recreateView = shouldRecreateView();
        if (recreateView) {
            /** recreate view when context shape or outlet change **/
            this.recreateView();
        }
        else {
            /** update context **/
            this.updateContext();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStringTemplateOutletDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzStringTemplateOutletDirective, isStandalone: true, selector: "[nzStringTemplateOutlet]", inputs: { nzStringTemplateOutletContext: "nzStringTemplateOutletContext", nzStringTemplateOutlet: "nzStringTemplateOutlet" }, exportAs: ["nzStringTemplateOutlet"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStringTemplateOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzStringTemplateOutlet]',
                    exportAs: 'nzStringTemplateOutlet'
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }], propDecorators: { nzStringTemplateOutletContext: [{
                type: Input
            }], nzStringTemplateOutlet: [{
                type: Input
            }] } });
class NzStringTemplateOutletContext {
    $implicit;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOutletModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOutletModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzOutletModule, imports: [NzStringTemplateOutletDirective], exports: [NzStringTemplateOutletDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOutletModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOutletModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzStringTemplateOutletDirective],
                    exports: [NzStringTemplateOutletDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzOutletModule, NzStringTemplateOutletDirective };
//# sourceMappingURL=ng-zorro-antd-core-outlet.mjs.map
