import { NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ContentChild, ViewEncapsulation, ViewChild, ContentChildren, Directive, booleanAttribute, HostBinding, NgModule } from '@angular/core';
import * as i2 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i1 from 'ng-zorro-antd/avatar';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Subject, defer, of, merge, BehaviorSubject } from 'rxjs';
import { mergeMap, startWith, takeUntil } from 'rxjs/operators';
import * as i1$1 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import * as i4 from 'ng-zorro-antd/grid';
import { NzGridModule } from 'ng-zorro-antd/grid';
import * as i3 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i1$2 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i1$3 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListItemMetaTitleComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListItemMetaTitleComponent, isStandalone: true, selector: "nz-list-item-meta-title", exportAs: ["nzListItemMetaTitle"], ngImport: i0, template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-title',
                    exportAs: 'nzListItemMetaTitle',
                    template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
class NzListItemMetaDescriptionComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaDescriptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListItemMetaDescriptionComponent, isStandalone: true, selector: "nz-list-item-meta-description", exportAs: ["nzListItemMetaDescription"], ngImport: i0, template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaDescriptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-description',
                    exportAs: 'nzListItemMetaDescription',
                    template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
class NzListItemMetaAvatarComponent {
    nzSrc;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzListItemMetaAvatarComponent, isStandalone: true, selector: "nz-list-item-meta-avatar", inputs: { nzSrc: "nzSrc" }, exportAs: ["nzListItemMetaAvatar"], ngImport: i0, template: `
    <div class="ant-list-item-meta-avatar">
      @if (nzSrc) {
        <nz-avatar [nzSrc]="nzSrc" />
      } @else {
        <ng-content />
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzAvatarModule }, { kind: "component", type: i1.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-avatar',
                    exportAs: 'nzListItemMetaAvatar',
                    template: `
    <div class="ant-list-item-meta-avatar">
      @if (nzSrc) {
        <nz-avatar [nzSrc]="nzSrc" />
      } @else {
        <ng-content />
      }
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NzAvatarModule]
                }]
        }], propDecorators: { nzSrc: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListItemMetaComponent {
    elementRef;
    avatarStr = '';
    avatarTpl;
    set nzAvatar(value) {
        if (value instanceof TemplateRef) {
            this.avatarStr = '';
            this.avatarTpl = value;
        }
        else {
            this.avatarStr = value;
        }
    }
    nzTitle;
    nzDescription;
    descriptionComponent;
    titleComponent;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzListItemMetaComponent, isStandalone: true, selector: "nz-list-item-meta, [nz-list-item-meta]", inputs: { nzAvatar: "nzAvatar", nzTitle: "nzTitle", nzDescription: "nzDescription" }, host: { classAttribute: "ant-list-item-meta" }, queries: [{ propertyName: "descriptionComponent", first: true, predicate: NzListItemMetaDescriptionComponent, descendants: true }, { propertyName: "titleComponent", first: true, predicate: NzListItemMetaTitleComponent, descendants: true }], exportAs: ["nzListItemMeta"], ngImport: i0, template: `
    <!--Old API Start-->
    @if (avatarStr) {
      <nz-list-item-meta-avatar [nzSrc]="avatarStr" />
    }

    @if (avatarTpl) {
      <nz-list-item-meta-avatar>
        <ng-container [ngTemplateOutlet]="avatarTpl" />
      </nz-list-item-meta-avatar>
    }

    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar" />

    @if (nzTitle || nzDescription || descriptionComponent || titleComponent) {
      <div class="ant-list-item-meta-content">
        <!--Old API Start-->

        @if (nzTitle && !titleComponent) {
          <nz-list-item-meta-title>
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </nz-list-item-meta-title>
        }

        @if (nzDescription && !descriptionComponent) {
          <nz-list-item-meta-description>
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </nz-list-item-meta-description>
        }
        <!--Old API End-->

        <ng-content select="nz-list-item-meta-title" />
        <ng-content select="nz-list-item-meta-description" />
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: NzListItemMetaAvatarComponent, selector: "nz-list-item-meta-avatar", inputs: ["nzSrc"], exportAs: ["nzListItemMetaAvatar"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzListItemMetaTitleComponent, selector: "nz-list-item-meta-title", exportAs: ["nzListItemMetaTitle"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "component", type: NzListItemMetaDescriptionComponent, selector: "nz-list-item-meta-description", exportAs: ["nzListItemMetaDescription"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemMetaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta, [nz-list-item-meta]',
                    exportAs: 'nzListItemMeta',
                    template: `
    <!--Old API Start-->
    @if (avatarStr) {
      <nz-list-item-meta-avatar [nzSrc]="avatarStr" />
    }

    @if (avatarTpl) {
      <nz-list-item-meta-avatar>
        <ng-container [ngTemplateOutlet]="avatarTpl" />
      </nz-list-item-meta-avatar>
    }

    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar" />

    @if (nzTitle || nzDescription || descriptionComponent || titleComponent) {
      <div class="ant-list-item-meta-content">
        <!--Old API Start-->

        @if (nzTitle && !titleComponent) {
          <nz-list-item-meta-title>
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </nz-list-item-meta-title>
        }

        @if (nzDescription && !descriptionComponent) {
          <nz-list-item-meta-description>
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </nz-list-item-meta-description>
        }
        <!--Old API End-->

        <ng-content select="nz-list-item-meta-title" />
        <ng-content select="nz-list-item-meta-description" />
      </div>
    }
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-list-item-meta'
                    },
                    imports: [
                        NzListItemMetaAvatarComponent,
                        NgTemplateOutlet,
                        NzListItemMetaTitleComponent,
                        NzOutletModule,
                        NzListItemMetaDescriptionComponent
                    ]
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { nzAvatar: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], descriptionComponent: [{
                type: ContentChild,
                args: [NzListItemMetaDescriptionComponent]
            }], titleComponent: [{
                type: ContentChild,
                args: [NzListItemMetaTitleComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListItemExtraComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemExtraComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListItemExtraComponent, isStandalone: true, selector: "nz-list-item-extra, [nz-list-item-extra]", host: { classAttribute: "ant-list-item-extra" }, exportAs: ["nzListItemExtra"], ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemExtraComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-extra, [nz-list-item-extra]',
                    exportAs: 'nzListItemExtra',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'ant-list-item-extra'
                    }
                }]
        }] });
class NzListItemActionComponent {
    templateRef;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemActionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListItemActionComponent, isStandalone: true, selector: "nz-list-item-action", viewQueries: [{ propertyName: "templateRef", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzListItemAction"], ngImport: i0, template: `<ng-template><ng-content></ng-content></ng-template>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-action',
                    exportAs: 'nzListItemAction',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<ng-template><ng-content></ng-content></ng-template>`
                }]
        }], propDecorators: { templateRef: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
class NzListItemActionsComponent {
    nzActions = [];
    nzListItemActions;
    actions = [];
    inputActionChanges$ = new Subject();
    contentChildrenChanges$ = defer(() => {
        if (this.nzListItemActions) {
            return of(null);
        }
        return this.initialized.pipe(mergeMap(() => this.nzListItemActions.changes.pipe(startWith(this.nzListItemActions))));
    });
    initialized = new Subject();
    constructor(cdr, destroy$) {
        merge(this.contentChildrenChanges$, this.inputActionChanges$)
            .pipe(takeUntil(destroy$))
            .subscribe(() => {
            if (this.nzActions.length) {
                this.actions = this.nzActions;
            }
            else {
                this.actions = this.nzListItemActions.map(action => action.templateRef);
            }
            cdr.detectChanges();
        });
    }
    ngOnChanges() {
        this.inputActionChanges$.next(null);
    }
    ngAfterContentInit() {
        this.initialized.next();
        this.initialized.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemActionsComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzListItemActionsComponent, isStandalone: true, selector: "ul[nz-list-item-actions]", inputs: { nzActions: "nzActions" }, host: { classAttribute: "ant-list-item-action" }, providers: [NzDestroyService], queries: [{ propertyName: "nzListItemActions", predicate: NzListItemActionComponent }], exportAs: ["nzListItemActions"], usesOnChanges: true, ngImport: i0, template: `
    @for (i of actions; track i) {
      <li>
        <ng-template [ngTemplateOutlet]="i" />
        @if (!$last) {
          <em class="ant-list-item-action-split"></em>
        }
      </li>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemActionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ul[nz-list-item-actions]',
                    exportAs: 'nzListItemActions',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    @for (i of actions; track i) {
      <li>
        <ng-template [ngTemplateOutlet]="i" />
        @if (!$last) {
          <em class="ant-list-item-action-split"></em>
        }
      </li>
    }
  `,
                    host: {
                        class: 'ant-list-item-action'
                    },
                    providers: [NzDestroyService],
                    imports: [NgTemplateOutlet]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.NzDestroyService }], propDecorators: { nzActions: [{
                type: Input
            }], nzListItemActions: [{
                type: ContentChildren,
                args: [NzListItemActionComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListEmptyComponent {
    nzNoResult;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListEmptyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListEmptyComponent, isStandalone: true, selector: "nz-list-empty", inputs: { nzNoResult: "nzNoResult" }, host: { classAttribute: "ant-list-empty-text" }, exportAs: ["nzListHeader"], ngImport: i0, template: `<nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty>`, isInline: true, dependencies: [{ kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i1$2.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListEmptyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-empty',
                    exportAs: 'nzListHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty>`,
                    host: {
                        class: 'ant-list-empty-text'
                    },
                    imports: [NzEmptyModule]
                }]
        }], propDecorators: { nzNoResult: [{
                type: Input
            }] } });
class NzListHeaderComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListHeaderComponent, isStandalone: true, selector: "nz-list-header", host: { classAttribute: "ant-list-header" }, exportAs: ["nzListHeader"], ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-header',
                    exportAs: 'nzListHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'ant-list-header'
                    }
                }]
        }] });
class NzListFooterComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListFooterComponent, isStandalone: true, selector: "nz-list-footer", host: { classAttribute: "ant-list-footer" }, exportAs: ["nzListFooter"], ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-footer',
                    exportAs: 'nzListFooter',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'ant-list-footer'
                    }
                }]
        }] });
class NzListPaginationComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzListPaginationComponent, isStandalone: true, selector: "nz-list-pagination", host: { classAttribute: "ant-list-pagination" }, exportAs: ["nzListPagination"], ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListPaginationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-pagination',
                    exportAs: 'nzListPagination',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'ant-list-pagination'
                    }
                }]
        }] });
class NzListLoadMoreDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListLoadMoreDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzListLoadMoreDirective, isStandalone: true, selector: "nz-list-load-more", exportAs: ["nzListLoadMoreDirective"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListLoadMoreDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-list-load-more',
                    exportAs: 'nzListLoadMoreDirective'
                }]
        }] });
class NzListGridDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListGridDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzListGridDirective, isStandalone: true, selector: "nz-list[nzGrid]", host: { classAttribute: "ant-list-grid" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-list[nzGrid]',
                    host: {
                        class: 'ant-list-grid'
                    }
                }]
        }] });

class NzListComponent {
    directionality;
    nzDataSource;
    nzBordered = false;
    nzGrid = '';
    nzHeader;
    nzFooter;
    nzItemLayout = 'horizontal';
    nzRenderItem = null;
    nzLoading = false;
    nzLoadMore = null;
    nzPagination;
    nzSize = 'default';
    nzSplit = true;
    nzNoResult;
    nzListFooterComponent;
    nzListPaginationComponent;
    nzListLoadMoreDirective;
    hasSomethingAfterLastItem = false;
    dir = 'ltr';
    itemLayoutNotifySource = new BehaviorSubject(this.nzItemLayout);
    destroy$ = new Subject();
    get itemLayoutNotify$() {
        return this.itemLayoutNotifySource.asObservable();
    }
    constructor(directionality) {
        this.directionality = directionality;
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    getSomethingAfterLastItem() {
        return !!(this.nzLoadMore ||
            this.nzPagination ||
            this.nzFooter ||
            this.nzListFooterComponent ||
            this.nzListPaginationComponent ||
            this.nzListLoadMoreDirective);
    }
    ngOnChanges(changes) {
        if (changes.nzItemLayout) {
            this.itemLayoutNotifySource.next(this.nzItemLayout);
        }
    }
    ngOnDestroy() {
        this.itemLayoutNotifySource.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngAfterContentInit() {
        this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListComponent, deps: [{ token: i1$3.Directionality }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzListComponent, isStandalone: true, selector: "nz-list, [nz-list]", inputs: { nzDataSource: "nzDataSource", nzBordered: ["nzBordered", "nzBordered", booleanAttribute], nzGrid: "nzGrid", nzHeader: "nzHeader", nzFooter: "nzFooter", nzItemLayout: "nzItemLayout", nzRenderItem: "nzRenderItem", nzLoading: ["nzLoading", "nzLoading", booleanAttribute], nzLoadMore: "nzLoadMore", nzPagination: "nzPagination", nzSize: "nzSize", nzSplit: ["nzSplit", "nzSplit", booleanAttribute], nzNoResult: "nzNoResult" }, host: { properties: { "class.ant-list-rtl": "dir === 'rtl'", "class.ant-list-vertical": "nzItemLayout === \"vertical\"", "class.ant-list-lg": "nzSize === \"large\"", "class.ant-list-sm": "nzSize === \"small\"", "class.ant-list-split": "nzSplit", "class.ant-list-bordered": "nzBordered", "class.ant-list-loading": "nzLoading", "class.ant-list-something-after-last-item": "hasSomethingAfterLastItem" }, classAttribute: "ant-list" }, queries: [{ propertyName: "nzListFooterComponent", first: true, predicate: NzListFooterComponent, descendants: true }, { propertyName: "nzListPaginationComponent", first: true, predicate: NzListPaginationComponent, descendants: true }, { propertyName: "nzListLoadMoreDirective", first: true, predicate: NzListLoadMoreDirective, descendants: true }], exportAs: ["nzList"], usesOnChanges: true, ngImport: i0, template: `
    @if (nzHeader) {
      <nz-list-header>
        <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      </nz-list-header>
    }

    <ng-content select="nz-list-header" />

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        @if (nzLoading && nzDataSource && nzDataSource.length === 0) {
          <div [style.min-height.px]="53"></div>
        }
        @if (nzGrid && nzDataSource) {
          <div nz-row [nzGutter]="nzGrid.gutter || null">
            @for (item of nzDataSource; track item; let index = $index) {
              <div
                nz-col
                [nzSpan]="nzGrid.span || null"
                [nzXs]="nzGrid.xs || null"
                [nzSm]="nzGrid.sm || null"
                [nzMd]="nzGrid.md || null"
                [nzLg]="nzGrid.lg || null"
                [nzXl]="nzGrid.xl || null"
                [nzXXl]="nzGrid.xxl || null"
              >
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: index }"
                />
              </div>
            }
          </div>
        } @else {
          <div class="ant-list-items">
            @for (item of nzDataSource; track item; let index = $index) {
              <ng-container>
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: index }"
                />
              </ng-container>
            }
            <ng-content />
          </div>
        }

        @if (!nzLoading && nzDataSource && nzDataSource.length === 0) {
          <nz-list-empty [nzNoResult]="nzNoResult" />
        }
      </ng-container>
    </nz-spin>

    @if (nzFooter) {
      <nz-list-footer>
        <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
      </nz-list-footer>
    }

    <ng-content select="nz-list-footer, [nz-list-footer]" />

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]" />

    @if (nzPagination) {
      <nz-list-pagination>
        <ng-template [ngTemplateOutlet]="nzPagination" />
      </nz-list-pagination>
    }

    <ng-content select="nz-list-pagination, [nz-list-pagination]" />
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzListHeaderComponent, selector: "nz-list-header", exportAs: ["nzListHeader"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "ngmodule", type: NzSpinModule }, { kind: "component", type: i3.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "ngmodule", type: NzGridModule }, { kind: "directive", type: i4.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }, { kind: "directive", type: i4.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { kind: "component", type: NzListEmptyComponent, selector: "nz-list-empty", inputs: ["nzNoResult"], exportAs: ["nzListHeader"] }, { kind: "component", type: NzListFooterComponent, selector: "nz-list-footer", exportAs: ["nzListFooter"] }, { kind: "component", type: NzListPaginationComponent, selector: "nz-list-pagination", exportAs: ["nzListPagination"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list, [nz-list]',
                    exportAs: 'nzList',
                    template: `
    @if (nzHeader) {
      <nz-list-header>
        <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      </nz-list-header>
    }

    <ng-content select="nz-list-header" />

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        @if (nzLoading && nzDataSource && nzDataSource.length === 0) {
          <div [style.min-height.px]="53"></div>
        }
        @if (nzGrid && nzDataSource) {
          <div nz-row [nzGutter]="nzGrid.gutter || null">
            @for (item of nzDataSource; track item; let index = $index) {
              <div
                nz-col
                [nzSpan]="nzGrid.span || null"
                [nzXs]="nzGrid.xs || null"
                [nzSm]="nzGrid.sm || null"
                [nzMd]="nzGrid.md || null"
                [nzLg]="nzGrid.lg || null"
                [nzXl]="nzGrid.xl || null"
                [nzXXl]="nzGrid.xxl || null"
              >
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: index }"
                />
              </div>
            }
          </div>
        } @else {
          <div class="ant-list-items">
            @for (item of nzDataSource; track item; let index = $index) {
              <ng-container>
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: index }"
                />
              </ng-container>
            }
            <ng-content />
          </div>
        }

        @if (!nzLoading && nzDataSource && nzDataSource.length === 0) {
          <nz-list-empty [nzNoResult]="nzNoResult" />
        }
      </ng-container>
    </nz-spin>

    @if (nzFooter) {
      <nz-list-footer>
        <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
      </nz-list-footer>
    }

    <ng-content select="nz-list-footer, [nz-list-footer]" />

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]" />

    @if (nzPagination) {
      <nz-list-pagination>
        <ng-template [ngTemplateOutlet]="nzPagination" />
      </nz-list-pagination>
    }

    <ng-content select="nz-list-pagination, [nz-list-pagination]" />
  `,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-list',
                        '[class.ant-list-rtl]': `dir === 'rtl'`,
                        '[class.ant-list-vertical]': 'nzItemLayout === "vertical"',
                        '[class.ant-list-lg]': 'nzSize === "large"',
                        '[class.ant-list-sm]': 'nzSize === "small"',
                        '[class.ant-list-split]': 'nzSplit',
                        '[class.ant-list-bordered]': 'nzBordered',
                        '[class.ant-list-loading]': 'nzLoading',
                        '[class.ant-list-something-after-last-item]': 'hasSomethingAfterLastItem'
                    },
                    imports: [
                        NgTemplateOutlet,
                        NzListHeaderComponent,
                        NzOutletModule,
                        NzSpinModule,
                        NzGridModule,
                        NzListEmptyComponent,
                        NzListFooterComponent,
                        NzListPaginationComponent
                    ]
                }]
        }], ctorParameters: () => [{ type: i1$3.Directionality }], propDecorators: { nzDataSource: [{
                type: Input
            }], nzBordered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzGrid: [{
                type: Input
            }], nzHeader: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzItemLayout: [{
                type: Input
            }], nzRenderItem: [{
                type: Input
            }], nzLoading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzLoadMore: [{
                type: Input
            }], nzPagination: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzSplit: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzNoResult: [{
                type: Input
            }], nzListFooterComponent: [{
                type: ContentChild,
                args: [NzListFooterComponent]
            }], nzListPaginationComponent: [{
                type: ContentChild,
                args: [NzListPaginationComponent]
            }], nzListLoadMoreDirective: [{
                type: ContentChild,
                args: [NzListLoadMoreDirective]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListItemComponent {
    parentComp;
    cdr;
    nzActions = [];
    nzContent;
    nzExtra = null;
    nzNoFlex = false;
    listItemExtraDirective;
    itemLayout;
    itemLayout$;
    get isVerticalAndExtra() {
        return this.itemLayout === 'vertical' && (!!this.listItemExtraDirective || !!this.nzExtra);
    }
    constructor(parentComp, cdr) {
        this.parentComp = parentComp;
        this.cdr = cdr;
    }
    ngAfterViewInit() {
        this.itemLayout$ = this.parentComp.itemLayoutNotify$.subscribe(val => {
            this.itemLayout = val;
            this.cdr.detectChanges();
        });
    }
    ngOnDestroy() {
        if (this.itemLayout$) {
            this.itemLayout$.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemComponent, deps: [{ token: NzListComponent }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzListItemComponent, isStandalone: true, selector: "nz-list-item, [nz-list-item]", inputs: { nzActions: "nzActions", nzContent: "nzContent", nzExtra: "nzExtra", nzNoFlex: ["nzNoFlex", "nzNoFlex", booleanAttribute] }, host: { properties: { "class.ant-list-item-no-flex": "this.nzNoFlex" }, classAttribute: "ant-list-item" }, queries: [{ propertyName: "listItemExtraDirective", first: true, predicate: NzListItemExtraComponent, descendants: true }], exportAs: ["nzListItem"], ngImport: i0, template: `
    <ng-template #actionsTpl>
      @if (nzActions && nzActions.length > 0) {
        <ul nz-list-item-actions [nzActions]="nzActions"></ul>
      }
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]" />
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]" />
      <ng-content />
      @if (nzContent) {
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      }
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]" />
    </ng-template>

    @if (isVerticalAndExtra) {
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl" />
        <ng-template [ngTemplateOutlet]="actionsTpl" />
      </div>
      @if (nzExtra) {
        <nz-list-item-extra>
          <ng-template [ngTemplateOutlet]="nzExtra" />
        </nz-list-item-extra>
      }
      <ng-template [ngTemplateOutlet]="extraTpl" />
    } @else {
      <ng-template [ngTemplateOutlet]="contentTpl" />
      <ng-template [ngTemplateOutlet]="nzExtra" />
      <ng-template [ngTemplateOutlet]="extraTpl" />
      <ng-template [ngTemplateOutlet]="actionsTpl" />
    }
  `, isInline: true, dependencies: [{ kind: "component", type: NzListItemActionsComponent, selector: "ul[nz-list-item-actions]", inputs: ["nzActions"], exportAs: ["nzListItemActions"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i2.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzListItemExtraComponent, selector: "nz-list-item-extra, [nz-list-item-extra]", exportAs: ["nzListItemExtra"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item, [nz-list-item]',
                    exportAs: 'nzListItem',
                    template: `
    <ng-template #actionsTpl>
      @if (nzActions && nzActions.length > 0) {
        <ul nz-list-item-actions [nzActions]="nzActions"></ul>
      }
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]" />
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]" />
      <ng-content />
      @if (nzContent) {
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      }
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]" />
    </ng-template>

    @if (isVerticalAndExtra) {
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl" />
        <ng-template [ngTemplateOutlet]="actionsTpl" />
      </div>
      @if (nzExtra) {
        <nz-list-item-extra>
          <ng-template [ngTemplateOutlet]="nzExtra" />
        </nz-list-item-extra>
      }
      <ng-template [ngTemplateOutlet]="extraTpl" />
    } @else {
      <ng-template [ngTemplateOutlet]="contentTpl" />
      <ng-template [ngTemplateOutlet]="nzExtra" />
      <ng-template [ngTemplateOutlet]="extraTpl" />
      <ng-template [ngTemplateOutlet]="actionsTpl" />
    }
  `,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-list-item'
                    },
                    imports: [NzListItemActionsComponent, NzOutletModule, NgTemplateOutlet, NzListItemExtraComponent]
                }]
        }], ctorParameters: () => [{ type: NzListComponent }, { type: i0.ChangeDetectorRef }], propDecorators: { nzActions: [{
                type: Input
            }], nzContent: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], nzNoFlex: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }, {
                type: HostBinding,
                args: ['class.ant-list-item-no-flex']
            }], listItemExtraDirective: [{
                type: ContentChild,
                args: [NzListItemExtraComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const DIRECTIVES = [
    NzListComponent,
    NzListHeaderComponent,
    NzListFooterComponent,
    NzListPaginationComponent,
    NzListEmptyComponent,
    NzListItemComponent,
    NzListItemMetaComponent,
    NzListItemMetaTitleComponent,
    NzListItemMetaDescriptionComponent,
    NzListItemMetaAvatarComponent,
    NzListItemActionsComponent,
    NzListItemActionComponent,
    NzListItemExtraComponent,
    NzListLoadMoreDirective,
    NzListGridDirective
];
class NzListModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzListModule, imports: [NzListComponent,
            NzListHeaderComponent,
            NzListFooterComponent,
            NzListPaginationComponent,
            NzListEmptyComponent,
            NzListItemComponent,
            NzListItemMetaComponent,
            NzListItemMetaTitleComponent,
            NzListItemMetaDescriptionComponent,
            NzListItemMetaAvatarComponent,
            NzListItemActionsComponent,
            NzListItemActionComponent,
            NzListItemExtraComponent,
            NzListLoadMoreDirective,
            NzListGridDirective], exports: [NzListComponent,
            NzListHeaderComponent,
            NzListFooterComponent,
            NzListPaginationComponent,
            NzListEmptyComponent,
            NzListItemComponent,
            NzListItemMetaComponent,
            NzListItemMetaTitleComponent,
            NzListItemMetaDescriptionComponent,
            NzListItemMetaAvatarComponent,
            NzListItemActionsComponent,
            NzListItemActionComponent,
            NzListItemExtraComponent,
            NzListLoadMoreDirective,
            NzListGridDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListModule, imports: [NzListComponent,
            NzListEmptyComponent,
            NzListItemComponent,
            NzListItemMetaComponent,
            NzListItemMetaAvatarComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DIRECTIVES],
                    exports: [DIRECTIVES]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzListComponent, NzListEmptyComponent, NzListFooterComponent, NzListGridDirective, NzListHeaderComponent, NzListItemActionComponent, NzListItemActionsComponent, NzListItemComponent, NzListItemExtraComponent, NzListItemMetaAvatarComponent, NzListItemMetaComponent, NzListItemMetaDescriptionComponent, NzListItemMetaTitleComponent, NzListLoadMoreDirective, NzListModule, NzListPaginationComponent };
//# sourceMappingURL=ng-zorro-antd-list.mjs.map
