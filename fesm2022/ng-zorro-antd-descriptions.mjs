import * as i0 from '@angular/core';
import { TemplateRef, numberAttribute, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, Component, booleanAttribute, ContentChildren, NgModule } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { __esDecorate, __runInitializers } from 'tslib';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntil, startWith, switchMap, auditTime, tap } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import * as i4 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i2 from 'ng-zorro-antd/core/services';
import { NzBreakpointEnum, gridResponsiveMap } from 'ng-zorro-antd/core/services';
import * as i3 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDescriptionsItemComponent {
    content;
    nzSpan = 1;
    nzTitle = '';
    inputChange$ = new Subject();
    ngOnChanges() {
        this.inputChange$.next();
    }
    ngOnDestroy() {
        this.inputChange$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "19.2.2", type: NzDescriptionsItemComponent, isStandalone: true, selector: "nz-descriptions-item", inputs: { nzSpan: ["nzSpan", "nzSpan", numberAttribute], nzTitle: "nzTitle" }, viewQueries: [{ propertyName: "content", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzDescriptionsItem"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsItemComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-descriptions-item',
                    template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
                    exportAs: 'nzDescriptionsItem',
                    preserveWhitespaces: false
                }]
        }], propDecorators: { content: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], nzSpan: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzTitle: [{
                type: Input
            }] } });

const NZ_CONFIG_MODULE_NAME = 'descriptions';
const defaultColumnMap = {
    xxl: 3,
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
};
let NzDescriptionsComponent = (() => {
    let _nzBordered_decorators;
    let _nzBordered_initializers = [];
    let _nzBordered_extraInitializers = [];
    let _nzColumn_decorators;
    let _nzColumn_initializers = [];
    let _nzColumn_extraInitializers = [];
    let _nzSize_decorators;
    let _nzSize_initializers = [];
    let _nzSize_extraInitializers = [];
    let _nzColon_decorators;
    let _nzColon_initializers = [];
    let _nzColon_extraInitializers = [];
    return class NzDescriptionsComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzBordered_decorators = [WithConfig()];
            _nzColumn_decorators = [WithConfig()];
            _nzSize_decorators = [WithConfig()];
            _nzColon_decorators = [WithConfig()];
            __esDecorate(null, null, _nzBordered_decorators, { kind: "field", name: "nzBordered", static: false, private: false, access: { has: obj => "nzBordered" in obj, get: obj => obj.nzBordered, set: (obj, value) => { obj.nzBordered = value; } }, metadata: _metadata }, _nzBordered_initializers, _nzBordered_extraInitializers);
            __esDecorate(null, null, _nzColumn_decorators, { kind: "field", name: "nzColumn", static: false, private: false, access: { has: obj => "nzColumn" in obj, get: obj => obj.nzColumn, set: (obj, value) => { obj.nzColumn = value; } }, metadata: _metadata }, _nzColumn_initializers, _nzColumn_extraInitializers);
            __esDecorate(null, null, _nzSize_decorators, { kind: "field", name: "nzSize", static: false, private: false, access: { has: obj => "nzSize" in obj, get: obj => obj.nzSize, set: (obj, value) => { obj.nzSize = value; } }, metadata: _metadata }, _nzSize_initializers, _nzSize_extraInitializers);
            __esDecorate(null, null, _nzColon_decorators, { kind: "field", name: "nzColon", static: false, private: false, access: { has: obj => "nzColon" in obj, get: obj => obj.nzColon, set: (obj, value) => { obj.nzColon = value; } }, metadata: _metadata }, _nzColon_initializers, _nzColon_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        cdr;
        breakpointService;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        items;
        nzBordered = __runInitializers(this, _nzBordered_initializers, false);
        nzLayout = (__runInitializers(this, _nzBordered_extraInitializers), 'horizontal');
        nzColumn = __runInitializers(this, _nzColumn_initializers, defaultColumnMap);
        nzSize = (__runInitializers(this, _nzColumn_extraInitializers), __runInitializers(this, _nzSize_initializers, 'default'));
        nzTitle = (__runInitializers(this, _nzSize_extraInitializers), '');
        nzExtra;
        nzColon = __runInitializers(this, _nzColon_initializers, true);
        itemMatrix = (__runInitializers(this, _nzColon_extraInitializers), []);
        realColumn = 3;
        dir = 'ltr';
        breakpoint = NzBreakpointEnum.md;
        destroy$ = new Subject();
        constructor(nzConfigService, cdr, breakpointService, directionality) {
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.breakpointService = breakpointService;
            this.directionality = directionality;
        }
        ngOnInit() {
            this.dir = this.directionality.value;
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
            });
        }
        ngOnChanges(changes) {
            if (changes.nzColumn) {
                this.prepareMatrix();
            }
        }
        ngAfterContentInit() {
            const contentChange$ = this.items.changes.pipe(startWith(this.items), takeUntil(this.destroy$));
            merge(contentChange$, contentChange$.pipe(switchMap(() => merge(...this.items.map(i => i.inputChange$)).pipe(auditTime(16)))), this.breakpointService.subscribe(gridResponsiveMap).pipe(tap(bp => (this.breakpoint = bp))))
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.prepareMatrix();
                this.cdr.markForCheck();
            });
        }
        ngOnDestroy() {
            this.destroy$.next();
            this.destroy$.complete();
        }
        /**
         * Prepare the render matrix according to description items' spans.
         */
        prepareMatrix() {
            if (!this.items) {
                return;
            }
            let currentRow = [];
            let width = 0;
            const column = (this.realColumn = this.getColumn());
            const items = this.items.toArray();
            const length = items.length;
            const matrix = [];
            const flushRow = () => {
                matrix.push(currentRow);
                currentRow = [];
                width = 0;
            };
            for (let i = 0; i < length; i++) {
                const item = items[i];
                const { nzTitle: title, content, nzSpan: span } = item;
                width += span;
                // If the last item make the row's length exceeds `nzColumn`, the last
                // item should take all the space left. This logic is implemented in the template.
                // Warn user about that.
                if (width >= column) {
                    if (width > column) {
                        warn(`"nzColumn" is ${column} but we have row length ${width}`);
                    }
                    currentRow.push({ title, content, span: column - (width - span) });
                    flushRow();
                }
                else if (i === length - 1) {
                    currentRow.push({ title, content, span: column - (width - span) });
                    flushRow();
                }
                else {
                    currentRow.push({ title, content, span });
                }
            }
            this.itemMatrix = matrix;
        }
        getColumn() {
            if (typeof this.nzColumn !== 'number') {
                return this.nzColumn[this.breakpoint];
            }
            return this.nzColumn;
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.NzBreakpointService }, { token: i3.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzDescriptionsComponent, isStandalone: true, selector: "nz-descriptions", inputs: { nzBordered: ["nzBordered", "nzBordered", booleanAttribute], nzLayout: "nzLayout", nzColumn: "nzColumn", nzSize: "nzSize", nzTitle: "nzTitle", nzExtra: "nzExtra", nzColon: ["nzColon", "nzColon", booleanAttribute] }, host: { properties: { "class.ant-descriptions-bordered": "nzBordered", "class.ant-descriptions-middle": "nzSize === \"middle\"", "class.ant-descriptions-small": "nzSize === \"small\"", "class.ant-descriptions-rtl": "dir === \"rtl\"" }, classAttribute: "ant-descriptions" }, queries: [{ propertyName: "items", predicate: NzDescriptionsItemComponent }], exportAs: ["nzDescriptions"], usesOnChanges: true, ngImport: i0, template: `
    @if (nzTitle || nzExtra) {
      <div class="ant-descriptions-header">
        @if (nzTitle) {
          <div class="ant-descriptions-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzExtra) {
          <div class="ant-descriptions-extra">
            <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
          </div>
        }
      </div>
    }

    <div class="ant-descriptions-view">
      <table>
        <tbody>
          @if (nzLayout === 'horizontal') {
            @for (row of itemMatrix; track row; let i = $index) {
              <tr class="ant-descriptions-row">
                @for (item of row; track item; let isLast = $last) {
                  @if (!nzBordered) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                        </span>
                      </div>
                    </td>
                  } @else {
                    <td class="ant-descriptions-item-label">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                    <td class="ant-descriptions-item-content" [colSpan]="item.span * 2 - 1">
                      <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                    </td>
                  }
                }
              </tr>
            }
          }

          @if (nzLayout === 'vertical') {
            @if (!nzBordered) {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                      </div>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  }
                </tr>
              }
            } @else {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-label" [colSpan]="item.span">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-content" [colSpan]="item.span">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                </tr>
              }
            }
          }
        </tbody>
      </table>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-descriptions',
                    exportAs: 'nzDescriptions',
                    preserveWhitespaces: false,
                    template: `
    @if (nzTitle || nzExtra) {
      <div class="ant-descriptions-header">
        @if (nzTitle) {
          <div class="ant-descriptions-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzExtra) {
          <div class="ant-descriptions-extra">
            <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
          </div>
        }
      </div>
    }

    <div class="ant-descriptions-view">
      <table>
        <tbody>
          @if (nzLayout === 'horizontal') {
            @for (row of itemMatrix; track row; let i = $index) {
              <tr class="ant-descriptions-row">
                @for (item of row; track item; let isLast = $last) {
                  @if (!nzBordered) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                        </span>
                      </div>
                    </td>
                  } @else {
                    <td class="ant-descriptions-item-label">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                    <td class="ant-descriptions-item-content" [colSpan]="item.span * 2 - 1">
                      <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                    </td>
                  }
                }
              </tr>
            }
          }

          @if (nzLayout === 'vertical') {
            @if (!nzBordered) {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                      </div>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  }
                </tr>
              }
            } @else {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-label" [colSpan]="item.span">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-content" [colSpan]="item.span">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                </tr>
              }
            }
          }
        </tbody>
      </table>
    </div>
  `,
                    host: {
                        class: 'ant-descriptions',
                        '[class.ant-descriptions-bordered]': 'nzBordered',
                        '[class.ant-descriptions-middle]': 'nzSize === "middle"',
                        '[class.ant-descriptions-small]': 'nzSize === "small"',
                        '[class.ant-descriptions-rtl]': 'dir === "rtl"'
                    },
                    imports: [NzOutletModule, NgTemplateOutlet]
                }]
        }], ctorParameters: () => [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.NzBreakpointService }, { type: i3.Directionality }], propDecorators: { items: [{
                type: ContentChildren,
                args: [NzDescriptionsItemComponent]
            }], nzBordered: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzLayout: [{
                type: Input
            }], nzColumn: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], nzColon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDescriptionsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsModule, imports: [NzDescriptionsComponent, NzDescriptionsItemComponent], exports: [NzDescriptionsComponent, NzDescriptionsItemComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsModule, imports: [NzDescriptionsComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDescriptionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzDescriptionsComponent, NzDescriptionsItemComponent],
                    exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
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

export { NzDescriptionsComponent, NzDescriptionsItemComponent, NzDescriptionsModule };
//# sourceMappingURL=ng-zorro-antd-descriptions.mjs.map
