import * as i0 from '@angular/core';
import { booleanAttribute, Input, Directive, ViewEncapsulation, ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ContentChildren, ContentChild, NgModule } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import * as i1 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { __esDecorate, __runInitializers } from 'tslib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i4 from 'ng-zorro-antd/skeleton';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import * as i2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardGridDirective {
    nzHoverable = true;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardGridDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: NzCardGridDirective, isStandalone: true, selector: "[nz-card-grid]", inputs: { nzHoverable: ["nzHoverable", "nzHoverable", booleanAttribute] }, host: { properties: { "class.ant-card-hoverable": "nzHoverable" }, classAttribute: "ant-card-grid" }, exportAs: ["nzCardGrid"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-card-grid]',
                    exportAs: 'nzCardGrid',
                    host: {
                        class: 'ant-card-grid',
                        '[class.ant-card-hoverable]': 'nzHoverable'
                    }
                }]
        }], propDecorators: { nzHoverable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardMetaComponent {
    nzTitle = null;
    nzDescription = null;
    nzAvatar = null;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardMetaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzCardMetaComponent, isStandalone: true, selector: "nz-card-meta", inputs: { nzTitle: "nzTitle", nzDescription: "nzDescription", nzAvatar: "nzAvatar" }, host: { classAttribute: "ant-card-meta" }, exportAs: ["nzCardMeta"], ngImport: i0, template: `
    @if (nzAvatar) {
      <div class="ant-card-meta-avatar">
        <ng-template [ngTemplateOutlet]="nzAvatar" />
      </div>
    }

    @if (nzTitle || nzDescription) {
      <div class="ant-card-meta-detail">
        @if (nzTitle) {
          <div class="ant-card-meta-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzDescription) {
          <div class="ant-card-meta-description">
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </div>
        }
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardMetaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card-meta',
                    exportAs: 'nzCardMeta',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    @if (nzAvatar) {
      <div class="ant-card-meta-avatar">
        <ng-template [ngTemplateOutlet]="nzAvatar" />
      </div>
    }

    @if (nzTitle || nzDescription) {
      <div class="ant-card-meta-detail">
        @if (nzTitle) {
          <div class="ant-card-meta-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzDescription) {
          <div class="ant-card-meta-description">
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </div>
        }
      </div>
    }
  `,
                    host: { class: 'ant-card-meta' },
                    imports: [NgTemplateOutlet, NzOutletModule]
                }]
        }], propDecorators: { nzTitle: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], nzAvatar: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardTabComponent {
    template;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardTabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzCardTabComponent, isStandalone: true, selector: "nz-card-tab", viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzCardTab"], ngImport: i0, template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card-tab',
                    exportAs: 'nzCardTab',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
                }]
        }], propDecorators: { template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

const NZ_CONFIG_MODULE_NAME = 'card';
let NzCardComponent = (() => {
    let _nzBordered_decorators;
    let _nzBordered_initializers = [];
    let _nzBordered_extraInitializers = [];
    let _nzHoverable_decorators;
    let _nzHoverable_initializers = [];
    let _nzHoverable_extraInitializers = [];
    let _nzSize_decorators;
    let _nzSize_initializers = [];
    let _nzSize_extraInitializers = [];
    return class NzCardComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzBordered_decorators = [WithConfig()];
            _nzHoverable_decorators = [WithConfig()];
            _nzSize_decorators = [WithConfig()];
            __esDecorate(null, null, _nzBordered_decorators, { kind: "field", name: "nzBordered", static: false, private: false, access: { has: obj => "nzBordered" in obj, get: obj => obj.nzBordered, set: (obj, value) => { obj.nzBordered = value; } }, metadata: _metadata }, _nzBordered_initializers, _nzBordered_extraInitializers);
            __esDecorate(null, null, _nzHoverable_decorators, { kind: "field", name: "nzHoverable", static: false, private: false, access: { has: obj => "nzHoverable" in obj, get: obj => obj.nzHoverable, set: (obj, value) => { obj.nzHoverable = value; } }, metadata: _metadata }, _nzHoverable_initializers, _nzHoverable_extraInitializers);
            __esDecorate(null, null, _nzSize_decorators, { kind: "field", name: "nzSize", static: false, private: false, access: { has: obj => "nzSize" in obj, get: obj => obj.nzSize, set: (obj, value) => { obj.nzSize = value; } }, metadata: _metadata }, _nzSize_initializers, _nzSize_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        cdr;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzBordered = __runInitializers(this, _nzBordered_initializers, true);
        nzLoading = (__runInitializers(this, _nzBordered_extraInitializers), false);
        nzHoverable = __runInitializers(this, _nzHoverable_initializers, false);
        nzBodyStyle = (__runInitializers(this, _nzHoverable_extraInitializers), null);
        nzCover;
        nzActions = [];
        nzType = null;
        nzSize = __runInitializers(this, _nzSize_initializers, 'default');
        nzTitle = __runInitializers(this, _nzSize_extraInitializers);
        nzExtra;
        listOfNzCardTabComponent;
        listOfNzCardGridDirective;
        dir = 'ltr';
        destroy$ = new Subject();
        constructor(nzConfigService, cdr, directionality) {
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.directionality = directionality;
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.cdr.markForCheck();
            });
        }
        ngOnInit() {
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        }
        ngOnDestroy() {
            this.destroy$.next(true);
            this.destroy$.complete();
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardComponent, deps: [{ token: i1$1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzCardComponent, isStandalone: true, selector: "nz-card", inputs: { nzBordered: ["nzBordered", "nzBordered", booleanAttribute], nzLoading: ["nzLoading", "nzLoading", booleanAttribute], nzHoverable: ["nzHoverable", "nzHoverable", booleanAttribute], nzBodyStyle: "nzBodyStyle", nzCover: "nzCover", nzActions: "nzActions", nzType: "nzType", nzSize: "nzSize", nzTitle: "nzTitle", nzExtra: "nzExtra" }, host: { properties: { "class.ant-card-loading": "nzLoading", "class.ant-card-bordered": "nzBordered", "class.ant-card-hoverable": "nzHoverable", "class.ant-card-small": "nzSize === \"small\"", "class.ant-card-contain-grid": "listOfNzCardGridDirective && listOfNzCardGridDirective.length", "class.ant-card-type-inner": "nzType === \"inner\"", "class.ant-card-contain-tabs": "!!listOfNzCardTabComponent", "class.ant-card-rtl": "dir === 'rtl'" }, classAttribute: "ant-card" }, queries: [{ propertyName: "listOfNzCardTabComponent", first: true, predicate: NzCardTabComponent, descendants: true }, { propertyName: "listOfNzCardGridDirective", predicate: NzCardGridDirective }], exportAs: ["nzCard"], ngImport: i0, template: `
    @if (nzTitle || nzExtra || listOfNzCardTabComponent) {
      <div class="ant-card-head">
        <div class="ant-card-head-wrapper">
          @if (nzTitle) {
            <div class="ant-card-head-title">
              <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
            </div>
          }
          @if (nzExtra) {
            <div class="ant-card-extra">
              <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
            </div>
          }
        </div>
        @if (listOfNzCardTabComponent) {
          <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template" />
        }
      </div>
    }

    @if (nzCover) {
      <div class="ant-card-cover">
        <ng-template [ngTemplateOutlet]="nzCover" />
      </div>
    }

    <div class="ant-card-body" [style]="nzBodyStyle">
      @if (nzLoading) {
        <nz-skeleton [nzActive]="true" [nzTitle]="false" [nzParagraph]="{ rows: 4 }"></nz-skeleton>
      } @else {
        <ng-content />
      }
    </div>
    @if (nzActions.length) {
      <ul class="ant-card-actions">
        @for (action of nzActions; track $index) {
          <li [style.width.%]="100 / nzActions.length">
            <span><ng-template [ngTemplateOutlet]="action" /></span>
          </li>
        }
      </ul>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzSkeletonModule }, { kind: "component", type: i4.NzSkeletonComponent, selector: "nz-skeleton", inputs: ["nzActive", "nzLoading", "nzRound", "nzTitle", "nzAvatar", "nzParagraph"], exportAs: ["nzSkeleton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card',
                    exportAs: 'nzCard',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    @if (nzTitle || nzExtra || listOfNzCardTabComponent) {
      <div class="ant-card-head">
        <div class="ant-card-head-wrapper">
          @if (nzTitle) {
            <div class="ant-card-head-title">
              <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
            </div>
          }
          @if (nzExtra) {
            <div class="ant-card-extra">
              <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
            </div>
          }
        </div>
        @if (listOfNzCardTabComponent) {
          <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template" />
        }
      </div>
    }

    @if (nzCover) {
      <div class="ant-card-cover">
        <ng-template [ngTemplateOutlet]="nzCover" />
      </div>
    }

    <div class="ant-card-body" [style]="nzBodyStyle">
      @if (nzLoading) {
        <nz-skeleton [nzActive]="true" [nzTitle]="false" [nzParagraph]="{ rows: 4 }"></nz-skeleton>
      } @else {
        <ng-content />
      }
    </div>
    @if (nzActions.length) {
      <ul class="ant-card-actions">
        @for (action of nzActions; track $index) {
          <li [style.width.%]="100 / nzActions.length">
            <span><ng-template [ngTemplateOutlet]="action" /></span>
          </li>
        }
      </ul>
    }
  `,
                    host: {
                        class: 'ant-card',
                        '[class.ant-card-loading]': 'nzLoading',
                        '[class.ant-card-bordered]': 'nzBordered',
                        '[class.ant-card-hoverable]': 'nzHoverable',
                        '[class.ant-card-small]': 'nzSize === "small"',
                        '[class.ant-card-contain-grid]': 'listOfNzCardGridDirective && listOfNzCardGridDirective.length',
                        '[class.ant-card-type-inner]': 'nzType === "inner"',
                        '[class.ant-card-contain-tabs]': '!!listOfNzCardTabComponent',
                        '[class.ant-card-rtl]': `dir === 'rtl'`
                    },
                    imports: [NzOutletModule, NgTemplateOutlet, NzSkeletonModule]
                }]
        }], ctorParameters: () => [{ type: i1$1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality }], propDecorators: { nzBordered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzLoading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzHoverable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzBodyStyle: [{
                type: Input
            }], nzCover: [{
                type: Input
            }], nzActions: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], listOfNzCardTabComponent: [{
                type: ContentChild,
                args: [NzCardTabComponent, { static: false }]
            }], listOfNzCardGridDirective: [{
                type: ContentChildren,
                args: [NzCardGridDirective]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzCardModule, imports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent], exports: [BidiModule, NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardModule, imports: [NzCardComponent, NzCardMetaComponent, BidiModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent],
                    exports: [BidiModule, NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardModule, NzCardTabComponent };
//# sourceMappingURL=ng-zorro-antd-card.mjs.map
