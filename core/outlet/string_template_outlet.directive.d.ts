/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzStringTemplateOutletDirective<_T = unknown> implements OnChanges {
    private viewContainer;
    private templateRef;
    private embeddedViewRef;
    private context;
    nzStringTemplateOutletContext: NzSafeAny | null;
    nzStringTemplateOutlet: NzSafeAny | TemplateRef<NzSafeAny>;
    static ngTemplateContextGuard<T>(_dir: NzStringTemplateOutletDirective<T>, _ctx: NzSafeAny): _ctx is NzStringTemplateOutletContext;
    private recreateView;
    private updateContext;
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<NzSafeAny>);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzStringTemplateOutletDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzStringTemplateOutletDirective<any>, "[nzStringTemplateOutlet]", ["nzStringTemplateOutlet"], { "nzStringTemplateOutletContext": { "alias": "nzStringTemplateOutletContext"; "required": false; }; "nzStringTemplateOutlet": { "alias": "nzStringTemplateOutlet"; "required": false; }; }, {}, never, never, true, never>;
}
export declare class NzStringTemplateOutletContext {
    $implicit: NzSafeAny;
}
