import * as i0 from '@angular/core';
import { Directive, inject, EventEmitter, ContentChild, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { __esDecorate, __runInitializers } from 'tslib';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i4 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i5 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i2 from 'ng-zorro-antd/cdk/resize-observer';
import * as i3 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPageHeaderTitleDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderTitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderTitleDirective, isStandalone: true, selector: "nz-page-header-title, [nz-page-header-title]", host: { classAttribute: "ant-page-header-heading-title" }, exportAs: ["nzPageHeaderTitle"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-title, [nz-page-header-title]',
                    exportAs: 'nzPageHeaderTitle',
                    host: {
                        class: 'ant-page-header-heading-title'
                    }
                }]
        }] });
class NzPageHeaderSubtitleDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderSubtitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderSubtitleDirective, isStandalone: true, selector: "nz-page-header-subtitle, [nz-page-header-subtitle]", host: { classAttribute: "ant-page-header-heading-sub-title" }, exportAs: ["nzPageHeaderSubtitle"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderSubtitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-subtitle, [nz-page-header-subtitle]',
                    exportAs: 'nzPageHeaderSubtitle',
                    host: {
                        class: 'ant-page-header-heading-sub-title'
                    }
                }]
        }] });
class NzPageHeaderContentDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderContentDirective, isStandalone: true, selector: "nz-page-header-content, [nz-page-header-content]", host: { classAttribute: "ant-page-header-content" }, exportAs: ["nzPageHeaderContent"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-content, [nz-page-header-content]',
                    exportAs: 'nzPageHeaderContent',
                    host: {
                        class: 'ant-page-header-content'
                    }
                }]
        }] });
class NzPageHeaderTagDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderTagDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderTagDirective, isStandalone: true, selector: "nz-page-header-tags, [nz-page-header-tags]", host: { classAttribute: "ant-page-header-heading-tags" }, exportAs: ["nzPageHeaderTags"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderTagDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-tags, [nz-page-header-tags]',
                    exportAs: 'nzPageHeaderTags',
                    host: {
                        class: 'ant-page-header-heading-tags'
                    }
                }]
        }] });
class NzPageHeaderExtraDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderExtraDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderExtraDirective, isStandalone: true, selector: "nz-page-header-extra, [nz-page-header-extra]", host: { classAttribute: "ant-page-header-heading-extra" }, exportAs: ["nzPageHeaderExtra"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderExtraDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-extra, [nz-page-header-extra]',
                    exportAs: 'nzPageHeaderExtra',
                    host: {
                        class: 'ant-page-header-heading-extra'
                    }
                }]
        }] });
class NzPageHeaderFooterDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderFooterDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderFooterDirective, isStandalone: true, selector: "nz-page-header-footer, [nz-page-header-footer]", host: { classAttribute: "ant-page-header-footer" }, exportAs: ["nzPageHeaderFooter"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderFooterDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-page-header-footer, [nz-page-header-footer]',
                    exportAs: 'nzPageHeaderFooter',
                    host: {
                        class: 'ant-page-header-footer'
                    }
                }]
        }] });
class NzPageHeaderBreadcrumbDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderBreadcrumbDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderBreadcrumbDirective, isStandalone: true, selector: "nz-breadcrumb[nz-page-header-breadcrumb]", exportAs: ["nzPageHeaderBreadcrumb"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderBreadcrumbDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-breadcrumb[nz-page-header-breadcrumb]',
                    exportAs: 'nzPageHeaderBreadcrumb'
                }]
        }] });
class NzPageHeaderAvatarDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderAvatarDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzPageHeaderAvatarDirective, isStandalone: true, selector: "nz-avatar[nz-page-header-avatar]", exportAs: ["nzPageHeaderAvatar"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderAvatarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-avatar[nz-page-header-avatar]',
                    exportAs: 'nzPageHeaderAvatar'
                }]
        }] });

const NZ_CONFIG_MODULE_NAME = 'pageHeader';
let NzPageHeaderComponent = (() => {
    let _nzGhost_decorators;
    let _nzGhost_initializers = [];
    let _nzGhost_extraInitializers = [];
    return class NzPageHeaderComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzGhost_decorators = [WithConfig()];
            __esDecorate(null, null, _nzGhost_decorators, { kind: "field", name: "nzGhost", static: false, private: false, access: { has: obj => "nzGhost" in obj, get: obj => obj.nzGhost, set: (obj, value) => { obj.nzGhost = value; } }, metadata: _metadata }, _nzGhost_initializers, _nzGhost_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        elementRef;
        nzResizeObserver;
        cdr;
        directionality;
        location = inject(Location);
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzBackIcon = null;
        nzTitle;
        nzSubtitle;
        nzGhost = __runInitializers(this, _nzGhost_initializers, true);
        nzBack = (__runInitializers(this, _nzGhost_extraInitializers), new EventEmitter());
        nzPageHeaderFooter;
        nzPageHeaderBreadcrumb;
        compact = false;
        destroy$ = new Subject();
        dir = 'ltr';
        enableBackButton = true;
        constructor(nzConfigService, elementRef, nzResizeObserver, cdr, directionality) {
            this.nzConfigService = nzConfigService;
            this.elementRef = elementRef;
            this.nzResizeObserver = nzResizeObserver;
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
        ngAfterViewInit() {
            if (!this.nzBack.observers.length) {
                this.enableBackButton = this.location.getState()?.navigationId > 1;
                this.location.subscribe(() => {
                    this.enableBackButton = true;
                    this.cdr.detectChanges();
                });
            }
            this.nzResizeObserver
                .observe(this.elementRef)
                .pipe(map(([entry]) => entry.contentRect.width), takeUntil(this.destroy$))
                .subscribe((width) => {
                this.compact = width < 768;
                this.cdr.markForCheck();
            });
        }
        onBack() {
            if (this.nzBack.observers.length) {
                this.nzBack.emit();
            }
            else {
                this.location.back();
            }
        }
        ngOnDestroy() {
            this.destroy$.next();
            this.destroy$.complete();
        }
        getBackIcon() {
            if (this.dir === 'rtl') {
                return 'arrow-right';
            }
            return 'arrow-left';
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i2.NzResizeObserver }, { token: i0.ChangeDetectorRef }, { token: i3.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzPageHeaderComponent, isStandalone: true, selector: "nz-page-header", inputs: { nzBackIcon: "nzBackIcon", nzTitle: "nzTitle", nzSubtitle: "nzSubtitle", nzGhost: "nzGhost" }, outputs: { nzBack: "nzBack" }, host: { properties: { "class.has-footer": "nzPageHeaderFooter", "class.ant-page-header-ghost": "nzGhost", "class.has-breadcrumb": "nzPageHeaderBreadcrumb", "class.ant-page-header-compact": "compact", "class.ant-page-header-rtl": "dir === 'rtl'" }, classAttribute: "ant-page-header" }, queries: [{ propertyName: "nzPageHeaderFooter", first: true, predicate: NzPageHeaderFooterDirective, descendants: true }, { propertyName: "nzPageHeaderBreadcrumb", first: true, predicate: NzPageHeaderBreadcrumbDirective, descendants: true }], exportAs: ["nzPageHeader"], ngImport: i0, template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]" />

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        @if (nzBackIcon !== null && enableBackButton) {
          <div (click)="onBack()" class="ant-page-header-back">
            <div role="button" tabindex="0" class="ant-page-header-back-button">
              <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
                <nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline" />
              </ng-container>
            </div>
          </div>
        }

        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]" />
        <!--title-->
        @if (nzTitle) {
          <span class="ant-page-header-heading-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-title, [nz-page-header-title]" />
        }

        <!--subtitle-->
        @if (nzSubtitle) {
          <span class="ant-page-header-heading-sub-title">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-subtitle, [nz-page-header-subtitle]" />
        }
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]" />
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]" />
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]" />
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]" />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i5.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-page-header',
                    exportAs: 'nzPageHeader',
                    template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]" />

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        @if (nzBackIcon !== null && enableBackButton) {
          <div (click)="onBack()" class="ant-page-header-back">
            <div role="button" tabindex="0" class="ant-page-header-back-button">
              <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
                <nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline" />
              </ng-container>
            </div>
          </div>
        }

        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]" />
        <!--title-->
        @if (nzTitle) {
          <span class="ant-page-header-heading-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-title, [nz-page-header-title]" />
        }

        <!--subtitle-->
        @if (nzSubtitle) {
          <span class="ant-page-header-heading-sub-title">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-subtitle, [nz-page-header-subtitle]" />
        }
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]" />
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]" />
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]" />
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]" />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-page-header',
                        '[class.has-footer]': 'nzPageHeaderFooter',
                        '[class.ant-page-header-ghost]': 'nzGhost',
                        '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb',
                        '[class.ant-page-header-compact]': 'compact',
                        '[class.ant-page-header-rtl]': `dir === 'rtl'`
                    },
                    imports: [NzOutletModule, NzIconModule]
                }]
        }], ctorParameters: () => [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i2.NzResizeObserver }, { type: i0.ChangeDetectorRef }, { type: i3.Directionality }], propDecorators: { nzBackIcon: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzSubtitle: [{
                type: Input
            }], nzGhost: [{
                type: Input
            }], nzBack: [{
                type: Output
            }], nzPageHeaderFooter: [{
                type: ContentChild,
                args: [NzPageHeaderFooterDirective, { static: false }]
            }], nzPageHeaderBreadcrumb: [{
                type: ContentChild,
                args: [NzPageHeaderBreadcrumbDirective, { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NzPageHeaderCells = [
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderContentDirective,
    NzPageHeaderTagDirective,
    NzPageHeaderExtraDirective,
    NzPageHeaderFooterDirective,
    NzPageHeaderBreadcrumbDirective,
    NzPageHeaderAvatarDirective
];
class NzPageHeaderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderModule, imports: [NzPageHeaderComponent, NzPageHeaderTitleDirective,
            NzPageHeaderSubtitleDirective,
            NzPageHeaderContentDirective,
            NzPageHeaderTagDirective,
            NzPageHeaderExtraDirective,
            NzPageHeaderFooterDirective,
            NzPageHeaderBreadcrumbDirective,
            NzPageHeaderAvatarDirective], exports: [NzPageHeaderComponent, NzPageHeaderTitleDirective,
            NzPageHeaderSubtitleDirective,
            NzPageHeaderContentDirective,
            NzPageHeaderTagDirective,
            NzPageHeaderExtraDirective,
            NzPageHeaderFooterDirective,
            NzPageHeaderBreadcrumbDirective,
            NzPageHeaderAvatarDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderModule, imports: [NzPageHeaderComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPageHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzPageHeaderComponent, NzPageHeaderCells],
                    exports: [NzPageHeaderComponent, NzPageHeaderCells]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzPageHeaderAvatarDirective, NzPageHeaderBreadcrumbDirective, NzPageHeaderComponent, NzPageHeaderContentDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderModule, NzPageHeaderSubtitleDirective, NzPageHeaderTagDirective, NzPageHeaderTitleDirective };
//# sourceMappingURL=ng-zorro-antd-page-header.mjs.map
