import * as i0 from '@angular/core';
import { Directive, Input, TemplateRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Component, ContentChildren, NgModule } from '@angular/core';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i2 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i1 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCommentAvatarDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentAvatarDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzCommentAvatarDirective, isStandalone: true, selector: "nz-avatar[nz-comment-avatar]", exportAs: ["nzCommentAvatar"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentAvatarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-avatar[nz-comment-avatar]',
                    exportAs: 'nzCommentAvatar'
                }]
        }] });
class NzCommentContentDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzCommentContentDirective, isStandalone: true, selector: "nz-comment-content, [nz-comment-content]", host: { classAttribute: "ant-comment-content-detail" }, exportAs: ["nzCommentContent"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-comment-content, [nz-comment-content]',
                    exportAs: 'nzCommentContent',
                    host: { class: 'ant-comment-content-detail' }
                }]
        }] });
class NzCommentActionHostDirective extends CdkPortalOutlet {
    nzCommentActionHost;
    constructor(componentFactoryResolver, viewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    ngAfterViewInit() {
        this.attach(this.nzCommentActionHost);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentActionHostDirective, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzCommentActionHostDirective, isStandalone: true, selector: "[nzCommentActionHost]", inputs: { nzCommentActionHost: "nzCommentActionHost" }, exportAs: ["nzCommentActionHost"], usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentActionHostDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzCommentActionHost]',
                    exportAs: 'nzCommentActionHost'
                }]
        }], ctorParameters: () => [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }], propDecorators: { nzCommentActionHost: [{
                type: Input
            }] } });
class NzCommentActionComponent {
    viewContainerRef;
    implicitContent;
    contentPortal = null;
    get content() {
        return this.contentPortal;
    }
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.implicitContent, this.viewContainerRef);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentActionComponent, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzCommentActionComponent, isStandalone: true, selector: "nz-comment-action", viewQueries: [{ propertyName: "implicitContent", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzCommentAction"], ngImport: i0, template: '<ng-template><ng-content /></ng-template>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-comment-action',
                    exportAs: 'nzCommentAction',
                    template: '<ng-template><ng-content /></ng-template>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }], propDecorators: { implicitContent: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

class NzCommentComponent {
    cdr;
    directionality;
    nzAuthor;
    nzDatetime;
    dir = 'ltr';
    destroy$ = new Subject();
    actions;
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.Directionality }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzCommentComponent, isStandalone: true, selector: "nz-comment", inputs: { nzAuthor: "nzAuthor", nzDatetime: "nzDatetime" }, host: { properties: { "class.ant-comment": "true", "class.ant-comment-rtl": "dir === \"rtl\"" } }, queries: [{ propertyName: "actions", predicate: NzCommentActionComponent }], exportAs: ["nzComment"], ngImport: i0, template: `
    <div class="ant-comment-inner">
      <div class="ant-comment-avatar">
        <ng-content select="nz-avatar[nz-comment-avatar]"></ng-content>
      </div>
      <div class="ant-comment-content">
        <div class="ant-comment-content-author">
          @if (nzAuthor) {
            <span class="ant-comment-content-author-name">
              <ng-container *nzStringTemplateOutlet="nzAuthor">{{ nzAuthor }}</ng-container>
            </span>
          }
          @if (nzDatetime) {
            <span class="ant-comment-content-author-time">
              <ng-container *nzStringTemplateOutlet="nzDatetime">{{ nzDatetime }}</ng-container>
            </span>
          }
        </div>
        <ng-content select="nz-comment-content" />
        @if (actions?.length) {
          <ul class="ant-comment-actions">
            @for (action of actions; track action) {
              <li>
                <span><ng-template [nzCommentActionHost]="action.content" /></span>
              </li>
            }
          </ul>
        }
      </div>
    </div>
    <div class="ant-comment-nested">
      <ng-content />
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: NzCommentActionHostDirective, selector: "[nzCommentActionHost]", inputs: ["nzCommentActionHost"], exportAs: ["nzCommentActionHost"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-comment',
                    exportAs: 'nzComment',
                    template: `
    <div class="ant-comment-inner">
      <div class="ant-comment-avatar">
        <ng-content select="nz-avatar[nz-comment-avatar]"></ng-content>
      </div>
      <div class="ant-comment-content">
        <div class="ant-comment-content-author">
          @if (nzAuthor) {
            <span class="ant-comment-content-author-name">
              <ng-container *nzStringTemplateOutlet="nzAuthor">{{ nzAuthor }}</ng-container>
            </span>
          }
          @if (nzDatetime) {
            <span class="ant-comment-content-author-time">
              <ng-container *nzStringTemplateOutlet="nzDatetime">{{ nzDatetime }}</ng-container>
            </span>
          }
        </div>
        <ng-content select="nz-comment-content" />
        @if (actions?.length) {
          <ul class="ant-comment-actions">
            @for (action of actions; track action) {
              <li>
                <span><ng-template [nzCommentActionHost]="action.content" /></span>
              </li>
            }
          </ul>
        }
      </div>
    </div>
    <div class="ant-comment-nested">
      <ng-content />
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.ant-comment]': `true`,
                        '[class.ant-comment-rtl]': `dir === "rtl"`
                    },
                    imports: [NzOutletModule, NzCommentActionHostDirective]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.Directionality }], propDecorators: { nzAuthor: [{
                type: Input
            }], nzDatetime: [{
                type: Input
            }], actions: [{
                type: ContentChildren,
                args: [NzCommentActionComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_COMMENT_CELLS = [
    NzCommentAvatarDirective,
    NzCommentContentDirective,
    NzCommentActionComponent,
    NzCommentActionHostDirective
];
class NzCommentModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzCommentModule, imports: [NzCommentComponent, NzCommentAvatarDirective,
            NzCommentContentDirective,
            NzCommentActionComponent,
            NzCommentActionHostDirective], exports: [NzCommentComponent, NzCommentAvatarDirective,
            NzCommentContentDirective,
            NzCommentActionComponent,
            NzCommentActionHostDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentModule, imports: [NzCommentComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCommentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzCommentComponent, ...NZ_COMMENT_CELLS],
                    exports: [NzCommentComponent, ...NZ_COMMENT_CELLS]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCommentActionComponent, NzCommentActionHostDirective, NzCommentAvatarDirective, NzCommentComponent, NzCommentContentDirective, NzCommentModule };
//# sourceMappingURL=ng-zorro-antd-comment.mjs.map
