import { __esDecorate, __runInitializers } from 'tslib';
import { NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, ViewChild, numberAttribute, booleanAttribute, NgModule } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i3 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i2$1 from 'ng-zorro-antd/core/services';
import { gridResponsiveMap, NzBreakpointEnum } from 'ng-zorro-antd/core/services';
import * as i1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { toNumber } from 'ng-zorro-antd/core/util';
import * as i1$1 from 'ng-zorro-antd/select';
import { NzSelectModule } from 'ng-zorro-antd/select';
import * as i1$2 from '@angular/cdk/bidi';
import * as i1$3 from 'ng-zorro-antd/i18n';

/* eslint-disable */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPaginationItemComponent {
    active = false;
    locale;
    index = null;
    disabled = false;
    direction = 'ltr';
    type = null;
    itemRender = null;
    diffIndex = new EventEmitter();
    gotoIndex = new EventEmitter();
    title = null;
    clickItem() {
        if (!this.disabled) {
            if (this.type === 'page') {
                this.gotoIndex.emit(this.index);
            }
            else {
                this.diffIndex.emit({
                    next: 1,
                    prev: -1,
                    prev_5: -5,
                    next_5: 5
                }[this.type]);
            }
        }
    }
    ngOnChanges(changes) {
        const { locale, index, type } = changes;
        if (locale || index || type) {
            this.title = {
                page: `${this.index}`,
                next: this.locale?.next_page,
                prev: this.locale?.prev_page,
                prev_5: this.locale?.prev_5,
                next_5: this.locale?.next_5
            }[this.type];
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzPaginationItemComponent, isStandalone: true, selector: "li[nz-pagination-item]", inputs: { active: "active", locale: "locale", index: "index", disabled: "disabled", direction: "direction", type: "type", itemRender: "itemRender" }, outputs: { diffIndex: "diffIndex", gotoIndex: "gotoIndex" }, host: { listeners: { "click": "clickItem()" }, properties: { "class.ant-pagination-prev": "type === 'prev'", "class.ant-pagination-next": "type === 'next'", "class.ant-pagination-item": "type === 'page'", "class.ant-pagination-jump-prev": "type === 'prev_5'", "class.ant-pagination-jump-prev-custom-icon": "type === 'prev_5'", "class.ant-pagination-jump-next": "type === 'next_5'", "class.ant-pagination-jump-next-custom-icon": "type === 'next_5'", "class.ant-pagination-disabled": "disabled", "class.ant-pagination-item-active": "active", "attr.title": "title" } }, usesOnChanges: true, ngImport: i0, template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      @switch (type) {
        @case ('page') {
          <a>{{ page }}</a>
        }
        @case ('prev') {
          <button type="button" [disabled]="disabled" [attr.title]="locale.prev_page" class="ant-pagination-item-link">
            @if (direction === 'rtl') {
              <nz-icon nzType="right" />
            } @else {
              <nz-icon nzType="left" />
            }
          </button>
        }
        @case ('next') {
          <button type="button" [disabled]="disabled" [attr.title]="locale.next_page" class="ant-pagination-item-link">
            @if (direction === 'rtl') {
              <nz-icon nzType="left" />
            } @else {
              <nz-icon nzType="right" />
            }
          </button>
        }
        @default {
          <a class="ant-pagination-item-link">
            <div class="ant-pagination-item-container">
              @switch (type) {
                @case ('prev_5') {
                  @if (direction === 'rtl') {
                    <nz-icon nzType="double-right" class="ant-pagination-item-link-icon" />
                  } @else {
                    <nz-icon nzType="double-left" class="ant-pagination-item-link-icon" />
                  }
                }
                @case ('next_5') {
                  @if (direction === 'rtl') {
                    <nz-icon nzType="double-left" class="ant-pagination-item-link-icon" />
                  } @else {
                    <nz-icon nzType="double-right" class="ant-pagination-item-link-icon" />
                  }
                }
              }
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        }
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    />
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'li[nz-pagination-item]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      @switch (type) {
        @case ('page') {
          <a>{{ page }}</a>
        }
        @case ('prev') {
          <button type="button" [disabled]="disabled" [attr.title]="locale.prev_page" class="ant-pagination-item-link">
            @if (direction === 'rtl') {
              <nz-icon nzType="right" />
            } @else {
              <nz-icon nzType="left" />
            }
          </button>
        }
        @case ('next') {
          <button type="button" [disabled]="disabled" [attr.title]="locale.next_page" class="ant-pagination-item-link">
            @if (direction === 'rtl') {
              <nz-icon nzType="left" />
            } @else {
              <nz-icon nzType="right" />
            }
          </button>
        }
        @default {
          <a class="ant-pagination-item-link">
            <div class="ant-pagination-item-container">
              @switch (type) {
                @case ('prev_5') {
                  @if (direction === 'rtl') {
                    <nz-icon nzType="double-right" class="ant-pagination-item-link-icon" />
                  } @else {
                    <nz-icon nzType="double-left" class="ant-pagination-item-link-icon" />
                  }
                }
                @case ('next_5') {
                  @if (direction === 'rtl') {
                    <nz-icon nzType="double-left" class="ant-pagination-item-link-icon" />
                  } @else {
                    <nz-icon nzType="double-right" class="ant-pagination-item-link-icon" />
                  }
                }
              }
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        }
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    />
  `,
                    host: {
                        '[class.ant-pagination-prev]': `type === 'prev'`,
                        '[class.ant-pagination-next]': `type === 'next'`,
                        '[class.ant-pagination-item]': `type === 'page'`,
                        '[class.ant-pagination-jump-prev]': `type === 'prev_5'`,
                        '[class.ant-pagination-jump-prev-custom-icon]': `type === 'prev_5'`,
                        '[class.ant-pagination-jump-next]': `type === 'next_5'`,
                        '[class.ant-pagination-jump-next-custom-icon]': `type === 'next_5'`,
                        '[class.ant-pagination-disabled]': 'disabled',
                        '[class.ant-pagination-item-active]': 'active',
                        '[attr.title]': 'title',
                        '(click)': 'clickItem()'
                    },
                    imports: [NzIconModule, NgTemplateOutlet]
                }]
        }], propDecorators: { active: [{
                type: Input
            }], locale: [{
                type: Input
            }], index: [{
                type: Input
            }], disabled: [{
                type: Input
            }], direction: [{
                type: Input
            }], type: [{
                type: Input
            }], itemRender: [{
                type: Input
            }], diffIndex: [{
                type: Output
            }], gotoIndex: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPaginationOptionsComponent {
    nzSize = 'default';
    disabled = false;
    showSizeChanger = false;
    showQuickJumper = false;
    locale;
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    pageSizeOptions = [];
    pageIndexChange = new EventEmitter();
    pageSizeChange = new EventEmitter();
    listOfPageSizeOption = [];
    onPageSizeChange(size) {
        if (this.pageSize !== size) {
            this.pageSizeChange.next(size);
        }
    }
    jumpToPageViaInput($event) {
        const target = $event.target;
        const index = Math.floor(toNumber(target.value, this.pageIndex));
        this.pageIndexChange.next(index);
        target.value = '';
    }
    ngOnChanges(changes) {
        const { pageSize, pageSizeOptions, locale } = changes;
        if (pageSize || pageSizeOptions || locale) {
            this.listOfPageSizeOption = [...new Set([...this.pageSizeOptions, this.pageSize])].map(item => ({
                value: item,
                label: `${item} ${this.locale.items_per_page}`
            }));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationOptionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzPaginationOptionsComponent, isStandalone: true, selector: "li[nz-pagination-options]", inputs: { nzSize: "nzSize", disabled: "disabled", showSizeChanger: "showSizeChanger", showQuickJumper: "showQuickJumper", locale: "locale", total: "total", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageIndexChange: "pageIndexChange", pageSizeChange: "pageSizeChange" }, host: { classAttribute: "ant-pagination-options" }, usesOnChanges: true, ngImport: i0, template: `
    @if (showSizeChanger) {
      <nz-select
        class="ant-pagination-options-size-changer"
        [nzDisabled]="disabled"
        [nzSize]="nzSize"
        [ngModel]="pageSize"
        (ngModelChange)="onPageSizeChange($event)"
      >
        @for (option of listOfPageSizeOption; track option.value) {
          <nz-option [nzLabel]="option.label" [nzValue]="option.value" />
        }
      </nz-select>
    }

    @if (showQuickJumper) {
      <div class="ant-pagination-options-quick-jumper">
        {{ locale.jump_to }}
        <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
        {{ locale.page }}
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSelectModule }, { kind: "component", type: i1$1.NzOptionComponent, selector: "nz-option", inputs: ["nzTitle", "nzLabel", "nzValue", "nzKey", "nzDisabled", "nzHide", "nzCustomContent"], exportAs: ["nzOption"] }, { kind: "component", type: i1$1.NzSelectComponent, selector: "nz-select", inputs: ["nzId", "nzSize", "nzStatus", "nzOptionHeightPx", "nzOptionOverflowSize", "nzDropdownClassName", "nzDropdownMatchSelectWidth", "nzDropdownStyle", "nzNotFoundContent", "nzPlaceHolder", "nzPlacement", "nzMaxTagCount", "nzDropdownRender", "nzCustomTemplate", "nzSuffixIcon", "nzClearIcon", "nzRemoveIcon", "nzMenuItemSelectedIcon", "nzTokenSeparators", "nzMaxTagPlaceholder", "nzMaxMultipleCount", "nzMode", "nzFilterOption", "compareWith", "nzAllowClear", "nzBorderless", "nzShowSearch", "nzLoading", "nzAutoFocus", "nzAutoClearSearchValue", "nzServerSearch", "nzDisabled", "nzOpen", "nzSelectOnTab", "nzBackdrop", "nzOptions", "nzShowArrow"], outputs: ["nzOnSearch", "nzScrollToBottom", "nzOpenChange", "nzBlur", "nzFocus"], exportAs: ["nzSelect"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'li[nz-pagination-options]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    @if (showSizeChanger) {
      <nz-select
        class="ant-pagination-options-size-changer"
        [nzDisabled]="disabled"
        [nzSize]="nzSize"
        [ngModel]="pageSize"
        (ngModelChange)="onPageSizeChange($event)"
      >
        @for (option of listOfPageSizeOption; track option.value) {
          <nz-option [nzLabel]="option.label" [nzValue]="option.value" />
        }
      </nz-select>
    }

    @if (showQuickJumper) {
      <div class="ant-pagination-options-quick-jumper">
        {{ locale.jump_to }}
        <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
        {{ locale.page }}
      </div>
    }
  `,
                    host: { class: 'ant-pagination-options' },
                    imports: [NzSelectModule, FormsModule]
                }]
        }], propDecorators: { nzSize: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showSizeChanger: [{
                type: Input
            }], showQuickJumper: [{
                type: Input
            }], locale: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }], pageSizeChange: [{
                type: Output
            }] } });

class NzPaginationDefaultComponent {
    cdr;
    renderer;
    elementRef;
    directionality;
    template;
    nzSize = 'default';
    itemRender = null;
    showTotal = null;
    disabled = false;
    locale;
    showSizeChanger = false;
    showQuickJumper = false;
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    pageSizeOptions = [10, 20, 30, 40];
    pageIndexChange = new EventEmitter();
    pageSizeChange = new EventEmitter();
    ranges = [0, 0];
    listOfPageItem = [];
    dir = 'ltr';
    destroy$ = new Subject();
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.updateRtlStyle();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.updateRtlStyle();
    }
    updateRtlStyle() {
        if (this.dir === 'rtl') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    jumpPage(index) {
        this.onPageIndexChange(index);
    }
    jumpDiff(diff) {
        this.jumpPage(this.pageIndex + diff);
    }
    trackByPageItem(_, value) {
        return `${value.type}-${value.index}`;
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    onPageSizeChange(size) {
        this.pageSizeChange.next(size);
    }
    getLastIndex(total, pageSize) {
        return Math.ceil(total / pageSize);
    }
    buildIndexes() {
        const lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    }
    getListOfPageItem(pageIndex, lastIndex) {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const concatWithPrevNext = (listOfPage) => {
            const prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            const nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return [prevItem, ...listOfPage, nextItem];
        };
        const generatePage = (start, end) => {
            const list = [];
            for (let i = start; i <= end; i++) {
                list.push({
                    index: i,
                    type: 'page'
                });
            }
            return list;
        };
        if (lastIndex <= 9) {
            return concatWithPrevNext(generatePage(1, lastIndex));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const generateRangeItem = (selected, last) => {
                let listOfRange = [];
                const prevFiveItem = {
                    type: 'prev_5'
                };
                const nextFiveItem = {
                    type: 'next_5'
                };
                const firstPageItem = generatePage(1, 1);
                const lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 5) {
                    // If the 4th is selected, one more page will be displayed.
                    const maxLeft = selected === 4 ? 6 : 5;
                    listOfRange = [...generatePage(2, maxLeft), nextFiveItem];
                }
                else if (selected < last - 3) {
                    listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
                }
                else {
                    // If the 4th from last is selected, one more page will be displayed.
                    const minRight = selected === last - 3 ? last - 5 : last - 4;
                    listOfRange = [prevFiveItem, ...generatePage(minRight, last - 1)];
                }
                return [...firstPageItem, ...listOfRange, ...lastPageItem];
            };
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    }
    ngOnChanges(changes) {
        const { pageIndex, pageSize, total } = changes;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationDefaultComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1$2.Directionality }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzPaginationDefaultComponent, isStandalone: true, selector: "nz-pagination-default", inputs: { nzSize: "nzSize", itemRender: "itemRender", showTotal: "showTotal", disabled: "disabled", locale: "locale", showSizeChanger: "showSizeChanger", showQuickJumper: "showQuickJumper", total: "total", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageIndexChange: "pageIndexChange", pageSizeChange: "pageSizeChange" }, viewQueries: [{ propertyName: "template", first: true, predicate: ["containerTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #containerTemplate>
      <ul>
        @if (showTotal) {
          <li class="ant-pagination-total-text">
            <ng-template
              [ngTemplateOutlet]="showTotal"
              [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
            />
          </li>
        }

        @for (page of listOfPageItem; track trackByPageItem($index, page)) {
          <li
            nz-pagination-item
            [locale]="locale"
            [type]="page.type"
            [index]="page.index"
            [disabled]="!!page.disabled"
            [itemRender]="itemRender"
            [active]="pageIndex === page.index"
            (gotoIndex)="jumpPage($event)"
            (diffIndex)="jumpDiff($event)"
            [direction]="dir"
          ></li>
        }

        @if (showQuickJumper || showSizeChanger) {
          <li
            nz-pagination-options
            [total]="total"
            [locale]="locale"
            [disabled]="disabled"
            [nzSize]="nzSize"
            [showSizeChanger]="showSizeChanger"
            [showQuickJumper]="showQuickJumper"
            [pageIndex]="pageIndex"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
            (pageIndexChange)="onPageIndexChange($event)"
            (pageSizeChange)="onPageSizeChange($event)"
          ></li>
        }
      </ul>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: ["active", "locale", "index", "disabled", "direction", "type", "itemRender"], outputs: ["diffIndex", "gotoIndex"] }, { kind: "component", type: NzPaginationOptionsComponent, selector: "li[nz-pagination-options]", inputs: ["nzSize", "disabled", "showSizeChanger", "showQuickJumper", "locale", "total", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["pageIndexChange", "pageSizeChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination-default',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #containerTemplate>
      <ul>
        @if (showTotal) {
          <li class="ant-pagination-total-text">
            <ng-template
              [ngTemplateOutlet]="showTotal"
              [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
            />
          </li>
        }

        @for (page of listOfPageItem; track trackByPageItem($index, page)) {
          <li
            nz-pagination-item
            [locale]="locale"
            [type]="page.type"
            [index]="page.index"
            [disabled]="!!page.disabled"
            [itemRender]="itemRender"
            [active]="pageIndex === page.index"
            (gotoIndex)="jumpPage($event)"
            (diffIndex)="jumpDiff($event)"
            [direction]="dir"
          ></li>
        }

        @if (showQuickJumper || showSizeChanger) {
          <li
            nz-pagination-options
            [total]="total"
            [locale]="locale"
            [disabled]="disabled"
            [nzSize]="nzSize"
            [showSizeChanger]="showSizeChanger"
            [showQuickJumper]="showQuickJumper"
            [pageIndex]="pageIndex"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
            (pageIndexChange)="onPageIndexChange($event)"
            (pageSizeChange)="onPageSizeChange($event)"
          ></li>
        }
      </ul>
    </ng-template>
  `,
                    imports: [NgTemplateOutlet, NzPaginationItemComponent, NzPaginationOptionsComponent]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1$2.Directionality }], propDecorators: { template: [{
                type: ViewChild,
                args: ['containerTemplate', { static: true }]
            }], nzSize: [{
                type: Input
            }], itemRender: [{
                type: Input
            }], showTotal: [{
                type: Input
            }], disabled: [{
                type: Input
            }], locale: [{
                type: Input
            }], showSizeChanger: [{
                type: Input
            }], showQuickJumper: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }], pageSizeChange: [{
                type: Output
            }] } });

class NzPaginationSimpleComponent {
    cdr;
    renderer;
    elementRef;
    directionality;
    template;
    itemRender = null;
    disabled = false;
    locale;
    total = 0;
    pageIndex = 1;
    pageSize = 10;
    pageIndexChange = new EventEmitter();
    lastIndex = 0;
    isFirstIndex = false;
    isLastIndex = false;
    dir = 'ltr';
    destroy$ = new Subject();
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.updateRtlStyle();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.updateRtlStyle();
    }
    updateRtlStyle() {
        if (this.dir === 'rtl') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    jumpToPageViaInput($event) {
        const target = $event.target;
        const index = toNumber(target.value, this.pageIndex);
        this.onPageIndexChange(index);
        target.value = `${this.pageIndex}`;
    }
    prePage() {
        this.onPageIndexChange(this.pageIndex - 1);
    }
    nextPage() {
        this.onPageIndexChange(this.pageIndex + 1);
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    updateBindingValue() {
        this.lastIndex = Math.ceil(this.total / this.pageSize);
        this.isFirstIndex = this.pageIndex === 1;
        this.isLastIndex = this.pageIndex === this.lastIndex;
    }
    ngOnChanges(changes) {
        const { pageIndex, total, pageSize } = changes;
        if (pageIndex || total || pageSize) {
            this.updateBindingValue();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationSimpleComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1$2.Directionality }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzPaginationSimpleComponent, isStandalone: true, selector: "nz-pagination-simple", inputs: { itemRender: "itemRender", disabled: "disabled", locale: "locale", total: "total", pageIndex: "pageIndex", pageSize: "pageSize" }, outputs: { pageIndexChange: "pageIndexChange" }, viewQueries: [{ propertyName: "template", first: true, predicate: ["containerTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #containerTemplate>
      <ul>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale.prev_page"
          [disabled]="isFirstIndex"
          [direction]="dir"
          (click)="prePage()"
          type="prev"
          [itemRender]="itemRender"
        ></li>
        <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
          <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
          <span class="ant-pagination-slash">/</span>
          {{ lastIndex }}
        </li>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale?.next_page"
          [disabled]="isLastIndex"
          [direction]="dir"
          (click)="nextPage()"
          type="next"
          [itemRender]="itemRender"
        ></li>
      </ul>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "component", type: NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: ["active", "locale", "index", "disabled", "direction", "type", "itemRender"], outputs: ["diffIndex", "gotoIndex"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationSimpleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination-simple',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #containerTemplate>
      <ul>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale.prev_page"
          [disabled]="isFirstIndex"
          [direction]="dir"
          (click)="prePage()"
          type="prev"
          [itemRender]="itemRender"
        ></li>
        <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
          <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
          <span class="ant-pagination-slash">/</span>
          {{ lastIndex }}
        </li>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale?.next_page"
          [disabled]="isLastIndex"
          [direction]="dir"
          (click)="nextPage()"
          type="next"
          [itemRender]="itemRender"
        ></li>
      </ul>
    </ng-template>
  `,
                    imports: [NzPaginationItemComponent]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1$2.Directionality }], propDecorators: { template: [{
                type: ViewChild,
                args: ['containerTemplate', { static: true }]
            }], itemRender: [{
                type: Input
            }], disabled: [{
                type: Input
            }], locale: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }] } });

const NZ_CONFIG_MODULE_NAME = 'pagination';
let NzPaginationComponent = (() => {
    let _nzSize_decorators;
    let _nzSize_initializers = [];
    let _nzSize_extraInitializers = [];
    let _nzPageSizeOptions_decorators;
    let _nzPageSizeOptions_initializers = [];
    let _nzPageSizeOptions_extraInitializers = [];
    let _nzShowSizeChanger_decorators;
    let _nzShowSizeChanger_initializers = [];
    let _nzShowSizeChanger_extraInitializers = [];
    let _nzShowQuickJumper_decorators;
    let _nzShowQuickJumper_initializers = [];
    let _nzShowQuickJumper_extraInitializers = [];
    let _nzSimple_decorators;
    let _nzSimple_initializers = [];
    let _nzSimple_extraInitializers = [];
    return class NzPaginationComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzSize_decorators = [WithConfig()];
            _nzPageSizeOptions_decorators = [WithConfig()];
            _nzShowSizeChanger_decorators = [WithConfig()];
            _nzShowQuickJumper_decorators = [WithConfig()];
            _nzSimple_decorators = [WithConfig()];
            __esDecorate(null, null, _nzSize_decorators, { kind: "field", name: "nzSize", static: false, private: false, access: { has: obj => "nzSize" in obj, get: obj => obj.nzSize, set: (obj, value) => { obj.nzSize = value; } }, metadata: _metadata }, _nzSize_initializers, _nzSize_extraInitializers);
            __esDecorate(null, null, _nzPageSizeOptions_decorators, { kind: "field", name: "nzPageSizeOptions", static: false, private: false, access: { has: obj => "nzPageSizeOptions" in obj, get: obj => obj.nzPageSizeOptions, set: (obj, value) => { obj.nzPageSizeOptions = value; } }, metadata: _metadata }, _nzPageSizeOptions_initializers, _nzPageSizeOptions_extraInitializers);
            __esDecorate(null, null, _nzShowSizeChanger_decorators, { kind: "field", name: "nzShowSizeChanger", static: false, private: false, access: { has: obj => "nzShowSizeChanger" in obj, get: obj => obj.nzShowSizeChanger, set: (obj, value) => { obj.nzShowSizeChanger = value; } }, metadata: _metadata }, _nzShowSizeChanger_initializers, _nzShowSizeChanger_extraInitializers);
            __esDecorate(null, null, _nzShowQuickJumper_decorators, { kind: "field", name: "nzShowQuickJumper", static: false, private: false, access: { has: obj => "nzShowQuickJumper" in obj, get: obj => obj.nzShowQuickJumper, set: (obj, value) => { obj.nzShowQuickJumper = value; } }, metadata: _metadata }, _nzShowQuickJumper_initializers, _nzShowQuickJumper_extraInitializers);
            __esDecorate(null, null, _nzSimple_decorators, { kind: "field", name: "nzSimple", static: false, private: false, access: { has: obj => "nzSimple" in obj, get: obj => obj.nzSimple, set: (obj, value) => { obj.nzSimple = value; } }, metadata: _metadata }, _nzSimple_initializers, _nzSimple_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        i18n;
        cdr;
        breakpointService;
        nzConfigService;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzPageSizeChange = new EventEmitter();
        nzPageIndexChange = new EventEmitter();
        nzShowTotal = null;
        nzItemRender = null;
        nzSize = __runInitializers(this, _nzSize_initializers, 'default');
        nzPageSizeOptions = (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzPageSizeOptions_initializers, [10, 20, 30, 40]));
        nzShowSizeChanger = (__runInitializers(this, _nzPageSizeOptions_extraInitializers), __runInitializers(this, _nzShowSizeChanger_initializers, false));
        nzShowQuickJumper = (__runInitializers(this, _nzShowSizeChanger_extraInitializers), __runInitializers(this, _nzShowQuickJumper_initializers, false));
        nzSimple = (__runInitializers(this, _nzShowQuickJumper_extraInitializers), __runInitializers(this, _nzSimple_initializers, false));
        nzDisabled = (__runInitializers(this, _nzSimple_extraInitializers), false);
        nzResponsive = false;
        nzHideOnSinglePage = false;
        nzTotal = 0;
        nzPageIndex = 1;
        nzPageSize = 10;
        showPagination = true;
        locale;
        size = 'default';
        dir = 'ltr';
        destroy$ = new Subject();
        total$ = new ReplaySubject(1);
        validatePageIndex(value, lastIndex) {
            if (value > lastIndex) {
                return lastIndex;
            }
            else if (value < 1) {
                return 1;
            }
            else {
                return value;
            }
        }
        onPageIndexChange(index) {
            const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
            const validIndex = this.validatePageIndex(index, lastIndex);
            if (validIndex !== this.nzPageIndex && !this.nzDisabled) {
                this.nzPageIndex = validIndex;
                this.nzPageIndexChange.emit(this.nzPageIndex);
            }
        }
        onPageSizeChange(size) {
            this.nzPageSize = size;
            this.nzPageSizeChange.emit(size);
            const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
            if (this.nzPageIndex > lastIndex) {
                this.onPageIndexChange(lastIndex);
            }
        }
        onTotalChange(total) {
            const lastIndex = this.getLastIndex(total, this.nzPageSize);
            if (this.nzPageIndex > lastIndex) {
                Promise.resolve().then(() => {
                    this.onPageIndexChange(lastIndex);
                    this.cdr.markForCheck();
                });
            }
        }
        getLastIndex(total, pageSize) {
            return Math.ceil(total / pageSize);
        }
        constructor(i18n, cdr, breakpointService, nzConfigService, directionality) {
            this.i18n = i18n;
            this.cdr = cdr;
            this.breakpointService = breakpointService;
            this.nzConfigService = nzConfigService;
            this.directionality = directionality;
        }
        ngOnInit() {
            this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.locale = this.i18n.getLocaleData('Pagination');
                this.cdr.markForCheck();
            });
            this.total$.pipe(takeUntil(this.destroy$)).subscribe(total => {
                this.onTotalChange(total);
            });
            this.breakpointService
                .subscribe(gridResponsiveMap)
                .pipe(takeUntil(this.destroy$))
                .subscribe(bp => {
                if (this.nzResponsive) {
                    this.size = bp === NzBreakpointEnum.xs ? 'small' : 'default';
                    this.cdr.markForCheck();
                }
            });
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
        ngOnChanges(changes) {
            const { nzHideOnSinglePage, nzTotal, nzPageSize, nzSize } = changes;
            if (nzTotal) {
                this.total$.next(this.nzTotal);
            }
            if (nzHideOnSinglePage || nzTotal || nzPageSize) {
                this.showPagination =
                    (this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize) || (this.nzTotal > 0 && !this.nzHideOnSinglePage);
            }
            if (nzSize) {
                this.size = nzSize.currentValue;
            }
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationComponent, deps: [{ token: i1$3.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i2$1.NzBreakpointService }, { token: i3.NzConfigService }, { token: i1$2.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzPaginationComponent, isStandalone: true, selector: "nz-pagination", inputs: { nzShowTotal: "nzShowTotal", nzItemRender: "nzItemRender", nzSize: "nzSize", nzPageSizeOptions: "nzPageSizeOptions", nzShowSizeChanger: ["nzShowSizeChanger", "nzShowSizeChanger", booleanAttribute], nzShowQuickJumper: ["nzShowQuickJumper", "nzShowQuickJumper", booleanAttribute], nzSimple: ["nzSimple", "nzSimple", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzResponsive: ["nzResponsive", "nzResponsive", booleanAttribute], nzHideOnSinglePage: ["nzHideOnSinglePage", "nzHideOnSinglePage", booleanAttribute], nzTotal: ["nzTotal", "nzTotal", numberAttribute], nzPageIndex: ["nzPageIndex", "nzPageIndex", numberAttribute], nzPageSize: ["nzPageSize", "nzPageSize", numberAttribute] }, outputs: { nzPageSizeChange: "nzPageSizeChange", nzPageIndexChange: "nzPageIndexChange" }, host: { properties: { "class.ant-pagination-simple": "nzSimple", "class.ant-pagination-disabled": "nzDisabled", "class.ant-pagination-mini": "!nzSimple && size === 'small'", "class.ant-pagination-rtl": "dir === 'rtl'" }, classAttribute: "ant-pagination" }, exportAs: ["nzPagination"], usesOnChanges: true, ngImport: i0, template: `
    @if (showPagination) {
      @if (nzSimple) {
        <ng-template [ngTemplateOutlet]="simplePagination.template" />
      } @else {
        <ng-template [ngTemplateOutlet]="defaultPagination.template" />
      }
    }

    <nz-pagination-simple
      #simplePagination
      [disabled]="nzDisabled"
      [itemRender]="nzItemRender"
      [locale]="locale"
      [pageSize]="nzPageSize"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    ></nz-pagination-simple>
    <nz-pagination-default
      #defaultPagination
      [nzSize]="size"
      [itemRender]="nzItemRender"
      [showTotal]="nzShowTotal"
      [disabled]="nzDisabled"
      [locale]="locale"
      [showSizeChanger]="nzShowSizeChanger"
      [showQuickJumper]="nzShowQuickJumper"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      [pageSize]="nzPageSize"
      [pageSizeOptions]="nzPageSizeOptions"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    ></nz-pagination-default>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzPaginationSimpleComponent, selector: "nz-pagination-simple", inputs: ["itemRender", "disabled", "locale", "total", "pageIndex", "pageSize"], outputs: ["pageIndexChange"] }, { kind: "component", type: NzPaginationDefaultComponent, selector: "nz-pagination-default", inputs: ["nzSize", "itemRender", "showTotal", "disabled", "locale", "showSizeChanger", "showQuickJumper", "total", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["pageIndexChange", "pageSizeChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination',
                    exportAs: 'nzPagination',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    @if (showPagination) {
      @if (nzSimple) {
        <ng-template [ngTemplateOutlet]="simplePagination.template" />
      } @else {
        <ng-template [ngTemplateOutlet]="defaultPagination.template" />
      }
    }

    <nz-pagination-simple
      #simplePagination
      [disabled]="nzDisabled"
      [itemRender]="nzItemRender"
      [locale]="locale"
      [pageSize]="nzPageSize"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    ></nz-pagination-simple>
    <nz-pagination-default
      #defaultPagination
      [nzSize]="size"
      [itemRender]="nzItemRender"
      [showTotal]="nzShowTotal"
      [disabled]="nzDisabled"
      [locale]="locale"
      [showSizeChanger]="nzShowSizeChanger"
      [showQuickJumper]="nzShowQuickJumper"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      [pageSize]="nzPageSize"
      [pageSizeOptions]="nzPageSizeOptions"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    ></nz-pagination-default>
  `,
                    host: {
                        class: 'ant-pagination',
                        '[class.ant-pagination-simple]': 'nzSimple',
                        '[class.ant-pagination-disabled]': 'nzDisabled',
                        '[class.ant-pagination-mini]': `!nzSimple && size === 'small'`,
                        '[class.ant-pagination-rtl]': `dir === 'rtl'`
                    },
                    imports: [NgTemplateOutlet, NzPaginationSimpleComponent, NzPaginationDefaultComponent]
                }]
        }], ctorParameters: () => [{ type: i1$3.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i2$1.NzBreakpointService }, { type: i3.NzConfigService }, { type: i1$2.Directionality }], propDecorators: { nzPageSizeChange: [{
                type: Output
            }], nzPageIndexChange: [{
                type: Output
            }], nzShowTotal: [{
                type: Input
            }], nzItemRender: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzPageSizeOptions: [{
                type: Input
            }], nzShowSizeChanger: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzShowQuickJumper: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzSimple: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzResponsive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzHideOnSinglePage: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzTotal: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzPageIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzPageSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPaginationModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationModule, imports: [NzPaginationComponent,
            NzPaginationSimpleComponent,
            NzPaginationOptionsComponent,
            NzPaginationItemComponent,
            NzPaginationDefaultComponent], exports: [NzPaginationComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationModule, imports: [NzPaginationComponent,
            NzPaginationSimpleComponent,
            NzPaginationOptionsComponent,
            NzPaginationItemComponent,
            NzPaginationDefaultComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzPaginationComponent,
                        NzPaginationSimpleComponent,
                        NzPaginationOptionsComponent,
                        NzPaginationItemComponent,
                        NzPaginationDefaultComponent
                    ],
                    exports: [NzPaginationComponent]
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

export { NzPaginationComponent, NzPaginationDefaultComponent, NzPaginationItemComponent, NzPaginationModule, NzPaginationOptionsComponent, NzPaginationSimpleComponent };
//# sourceMappingURL=ng-zorro-antd-pagination.mjs.map
