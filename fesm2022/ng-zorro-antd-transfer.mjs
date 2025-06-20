import { NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, booleanAttribute, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, ElementRef, ViewChildren, ViewChild, inject, HostListener, NgModule } from '@angular/core';
import { merge, Subject, of } from 'rxjs';
import { startWith, switchMap, distinctUntilChanged, withLatestFrom, map, takeUntil } from 'rxjs/operators';
import * as i4$1 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i1$1 from 'ng-zorro-antd/checkbox';
import { NzCheckboxModule, NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { fromEventOutsideAngular, toArray, getStatusClassNames } from 'ng-zorro-antd/core/util';
import * as i2 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i3 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i4 from 'ng-zorro-antd/core/transition-patch';
import { NzFormStatusService, NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import * as i1$2 from 'ng-zorro-antd/i18n';
import * as i2$1 from '@angular/cdk/bidi';
import * as i6 from 'ng-zorro-antd/core/wave';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTransferSearchComponent {
    cdr;
    // region: fields
    placeholder;
    value;
    disabled = false;
    valueChanged = new EventEmitter();
    valueClear = new EventEmitter();
    // endregion
    constructor(cdr) {
        this.cdr = cdr;
    }
    _handle() {
        this.valueChanged.emit(this.value);
    }
    _clear() {
        if (this.disabled) {
            return;
        }
        this.value = '';
        this.valueClear.emit();
    }
    ngOnChanges() {
        this.cdr.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferSearchComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTransferSearchComponent, isStandalone: true, selector: "[nz-transfer-search]", inputs: { placeholder: "placeholder", value: "value", disabled: ["disabled", "disabled", booleanAttribute] }, outputs: { valueChanged: "valueChanged", valueClear: "valueClear" }, exportAs: ["nzTransferSearch"], usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-input-prefix">
      <nz-icon nzType="search" />
    </span>
    <input
      [(ngModel)]="value"
      (ngModelChange)="_handle()"
      [disabled]="disabled"
      [placeholder]="placeholder"
      class="ant-input"
      [class]="{ 'ant-input-disabled': disabled }"
    />
    @if (value && value.length > 0) {
      <span class="ant-input-suffix" (click)="_clear()">
        <nz-icon nzType="close-circle" nzTheme="fill" class="ant-input-clear-icon" />
      </span>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferSearchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-transfer-search]',
                    exportAs: 'nzTransferSearch',
                    preserveWhitespaces: false,
                    template: `
    <span class="ant-input-prefix">
      <nz-icon nzType="search" />
    </span>
    <input
      [(ngModel)]="value"
      (ngModelChange)="_handle()"
      [disabled]="disabled"
      [placeholder]="placeholder"
      class="ant-input"
      [class]="{ 'ant-input-disabled': disabled }"
    />
    @if (value && value.length > 0) {
      <span class="ant-input-suffix" (click)="_clear()">
        <nz-icon nzType="close-circle" nzTheme="fill" class="ant-input-clear-icon" />
      </span>
    }
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [FormsModule, NzIconModule]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { placeholder: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], valueChanged: [{
                type: Output
            }], valueClear: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTransferListComponent {
    cdr;
    // #region fields
    direction = 'left';
    titleText = '';
    showSelectAll = true;
    dataSource = [];
    itemUnit = '';
    itemsUnit = '';
    filter = '';
    oneWay = false;
    disabled = false;
    showSearch;
    searchPlaceholder;
    notFoundContent;
    filterOption;
    renderList = null;
    render = null;
    footer = null;
    // events
    handleSelectAll = new EventEmitter();
    handleSelect = new EventEmitter();
    filterChange = new EventEmitter();
    moveToLeft = new EventEmitter();
    headerCheckbox;
    checkboxes;
    stat = {
        checkAll: false,
        checkHalf: false,
        checkCount: 0,
        shownCount: 0,
        availableCount: 0
    };
    get validData() {
        return this.dataSource.filter(w => !w.hide);
    }
    get availableData() {
        // filter disabled data
        return this.validData.filter(w => !w.disabled);
    }
    onItemSelect = (item) => {
        if (this.disabled || item.disabled) {
            return;
        }
        item.checked = !item.checked;
        this.updateCheckStatus();
        this.handleSelect.emit(item);
    };
    onItemSelectAll = (status) => {
        this.dataSource.forEach(item => {
            if (!item.disabled && !item.hide) {
                item.checked = status;
            }
        });
        this.updateCheckStatus();
        this.handleSelectAll.emit(status);
    };
    updateCheckStatus() {
        const validCount = this.dataSource.filter(w => !w.disabled).length;
        this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
        this.stat.shownCount = this.validData.length;
        this.stat.availableCount = this.availableData.length;
        this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
        this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
        // Note: this is done explicitly since the internal `nzChecked` value may not be updated in edge cases.
        // Consider the following flow:
        // 1) the initial value of `stat.checkAll` is `false`
        // 2) the user filters items
        // 3) the user clicks "Select All" checkbox
        // 4) the `NzCheckboxComponent` sets `nzChecked` to `true` internally
        // 5) the user clicks "Move to right"
        // 6) items are moved and the `updateCheckStatus` is invoked
        // 7) the `stat.checkAll` value has never been updated in this flow, it's always been `false`
        // 8) the `nzChecked` is still `true` and the checkbox is not unchecked
        // This is because Angular checks bindings and it checked that `[nzChecked]="stat.checkAll"` has
        // never been updated, so Angular did not set new `nzChecked` value on the checkbox.
        this.headerCheckbox && (this.headerCheckbox.nzChecked = this.stat.checkAll);
    }
    // #endregion
    // #region search
    handleFilter(value) {
        this.filter = value;
        this.dataSource.forEach(item => {
            item.hide = value.length > 0 && !this.matchFilter(value, item);
        });
        this.stat.shownCount = this.validData.length;
        this.stat.availableCount = this.availableData.length;
        this.filterChange.emit({ direction: this.direction, value });
    }
    handleClear() {
        this.handleFilter('');
    }
    deleteItem(item) {
        item.checked = true;
        this.handleSelect.emit(item);
        this.moveToLeft.emit();
    }
    matchFilter(text, item) {
        if (this.filterOption) {
            return this.filterOption(text, item);
        }
        return item.title.includes(text);
    }
    // #endregion
    constructor(cdr) {
        this.cdr = cdr;
    }
    markForCheck() {
        this.updateCheckStatus();
        this.cdr.markForCheck();
    }
    ngAfterViewInit() {
        this.checkboxes.changes
            .pipe(startWith(this.checkboxes), switchMap(() => {
            const checkboxes = this.checkboxes.toArray();
            return merge(...checkboxes.map(checkbox => fromEventOutsideAngular(checkbox.nativeElement, 'click')));
        }))
            .subscribe(event => {
            event.stopPropagation();
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferListComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTransferListComponent, isStandalone: true, selector: "nz-transfer-list", inputs: { direction: "direction", titleText: "titleText", showSelectAll: "showSelectAll", dataSource: "dataSource", itemUnit: "itemUnit", itemsUnit: "itemsUnit", filter: "filter", oneWay: "oneWay", disabled: ["disabled", "disabled", booleanAttribute], showSearch: ["showSearch", "showSearch", booleanAttribute], searchPlaceholder: "searchPlaceholder", notFoundContent: "notFoundContent", filterOption: "filterOption", renderList: "renderList", render: "render", footer: "footer" }, outputs: { handleSelectAll: "handleSelectAll", handleSelect: "handleSelect", filterChange: "filterChange", moveToLeft: "moveToLeft" }, host: { properties: { "class.ant-transfer-list-with-footer": "!!footer" }, classAttribute: "ant-transfer-list" }, viewQueries: [{ propertyName: "headerCheckbox", first: true, predicate: ["headerCheckbox"], descendants: true, read: NzCheckboxComponent }, { propertyName: "checkboxes", predicate: ["checkboxes"], descendants: true, read: ElementRef }], exportAs: ["nzTransferList"], ngImport: i0, template: `
    <div class="ant-transfer-list-header">
      @if (showSelectAll && !oneWay) {
        <label
          class="ant-transfer-list-checkbox"
          nz-checkbox
          #headerCheckbox
          [nzChecked]="stat.checkAll"
          (nzCheckedChange)="onItemSelectAll($event)"
          [nzIndeterminate]="stat.checkHalf"
          [nzDisabled]="stat.availableCount === 0 || disabled"
        ></label>
      }
      <span class="ant-transfer-list-header-selected">
        <span>
          @if (!oneWay) {
            {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          } @else {
            {{ stat.shownCount }}
          }
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
      </span>
      @if (titleText) {
        <span class="ant-transfer-list-header-title">{{ titleText }}</span>
      }
    </div>
    <div class="ant-transfer-list-body" [class.ant-transfer-list-body-with-search]="showSearch">
      @if (showSearch) {
        <div class="ant-transfer-list-body-search-wrapper">
          <span
            nz-transfer-search
            class="ant-input-affix-wrapper ant-transfer-list-search"
            (valueChanged)="handleFilter($event)"
            (valueClear)="handleClear()"
            [placeholder]="searchPlaceholder"
            [disabled]="disabled"
            [value]="filter"
          ></span>
        </div>
      }
      @if (renderList) {
        <div class="ant-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: validData,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      } @else {
        @if (stat.shownCount > 0) {
          <ul class="ant-transfer-list-content">
            @for (item of validData; track item.key) {
              <li
                (click)="!oneWay ? onItemSelect(item) : null"
                class="ant-transfer-list-content-item"
                [class]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
              >
                @if (!oneWay) {
                  <label
                    #checkboxes
                    nz-checkbox
                    [nzChecked]="item.checked"
                    (nzCheckedChange)="onItemSelect(item)"
                    [nzDisabled]="disabled || item.disabled"
                  >
                    @if (!render) {
                      {{ item.title }}
                    } @else {
                      <ng-template
                        [ngTemplateOutlet]="render"
                        [ngTemplateOutletContext]="{ $implicit: item }"
                      ></ng-template>
                    }
                  </label>
                } @else {
                  @if (!render) {
                    <span class="ant-transfer-list-content-item-text">
                      {{ item.title }}
                    </span>
                    <div
                      class="ant-transfer-list-content-item-remove"
                      [class]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
                      (click)="!(disabled || item.disabled) ? deleteItem(item) : null"
                    >
                      <nz-icon nzType="delete" nzTheme="outline" />
                    </div>
                  } @else {
                    <ng-template
                      [ngTemplateOutlet]="render"
                      [ngTemplateOutletContext]="{ $implicit: item }"
                    ></ng-template>
                  }
                }
              </li>
            }
          </ul>
        } @else {
          <div class="ant-transfer-list-body-not-found">
            <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
          </div>
        }
      }
    </div>
    @if (footer) {
      <div class="ant-transfer-list-footer">
        <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzCheckboxModule }, { kind: "component", type: i1$1.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId", "nzName"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i2.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }, { kind: "component", type: NzTransferSearchComponent, selector: "[nz-transfer-search]", inputs: ["placeholder", "value", "disabled"], outputs: ["valueChanged", "valueClear"], exportAs: ["nzTransferSearch"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzButtonModule }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-transfer-list',
                    exportAs: 'nzTransferList',
                    preserveWhitespaces: false,
                    template: `
    <div class="ant-transfer-list-header">
      @if (showSelectAll && !oneWay) {
        <label
          class="ant-transfer-list-checkbox"
          nz-checkbox
          #headerCheckbox
          [nzChecked]="stat.checkAll"
          (nzCheckedChange)="onItemSelectAll($event)"
          [nzIndeterminate]="stat.checkHalf"
          [nzDisabled]="stat.availableCount === 0 || disabled"
        ></label>
      }
      <span class="ant-transfer-list-header-selected">
        <span>
          @if (!oneWay) {
            {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          } @else {
            {{ stat.shownCount }}
          }
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
      </span>
      @if (titleText) {
        <span class="ant-transfer-list-header-title">{{ titleText }}</span>
      }
    </div>
    <div class="ant-transfer-list-body" [class.ant-transfer-list-body-with-search]="showSearch">
      @if (showSearch) {
        <div class="ant-transfer-list-body-search-wrapper">
          <span
            nz-transfer-search
            class="ant-input-affix-wrapper ant-transfer-list-search"
            (valueChanged)="handleFilter($event)"
            (valueClear)="handleClear()"
            [placeholder]="searchPlaceholder"
            [disabled]="disabled"
            [value]="filter"
          ></span>
        </div>
      }
      @if (renderList) {
        <div class="ant-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: validData,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      } @else {
        @if (stat.shownCount > 0) {
          <ul class="ant-transfer-list-content">
            @for (item of validData; track item.key) {
              <li
                (click)="!oneWay ? onItemSelect(item) : null"
                class="ant-transfer-list-content-item"
                [class]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
              >
                @if (!oneWay) {
                  <label
                    #checkboxes
                    nz-checkbox
                    [nzChecked]="item.checked"
                    (nzCheckedChange)="onItemSelect(item)"
                    [nzDisabled]="disabled || item.disabled"
                  >
                    @if (!render) {
                      {{ item.title }}
                    } @else {
                      <ng-template
                        [ngTemplateOutlet]="render"
                        [ngTemplateOutletContext]="{ $implicit: item }"
                      ></ng-template>
                    }
                  </label>
                } @else {
                  @if (!render) {
                    <span class="ant-transfer-list-content-item-text">
                      {{ item.title }}
                    </span>
                    <div
                      class="ant-transfer-list-content-item-remove"
                      [class]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
                      (click)="!(disabled || item.disabled) ? deleteItem(item) : null"
                    >
                      <nz-icon nzType="delete" nzTheme="outline" />
                    </div>
                  } @else {
                    <ng-template
                      [ngTemplateOutlet]="render"
                      [ngTemplateOutletContext]="{ $implicit: item }"
                    ></ng-template>
                  }
                }
              </li>
            }
          </ul>
        } @else {
          <div class="ant-transfer-list-body-not-found">
            <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
          </div>
        }
      }
    </div>
    @if (footer) {
      <div class="ant-transfer-list-footer">
        <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
      </div>
    }
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-transfer-list',
                        '[class.ant-transfer-list-with-footer]': '!!footer'
                    },
                    imports: [NzCheckboxModule, NgTemplateOutlet, NzEmptyModule, NzTransferSearchComponent, NzIconModule, NzButtonModule]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { direction: [{
                type: Input
            }], titleText: [{
                type: Input
            }], showSelectAll: [{
                type: Input
            }], dataSource: [{
                type: Input
            }], itemUnit: [{
                type: Input
            }], itemsUnit: [{
                type: Input
            }], filter: [{
                type: Input
            }], oneWay: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showSearch: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], searchPlaceholder: [{
                type: Input
            }], notFoundContent: [{
                type: Input
            }], filterOption: [{
                type: Input
            }], renderList: [{
                type: Input
            }], render: [{
                type: Input
            }], footer: [{
                type: Input
            }], handleSelectAll: [{
                type: Output
            }], handleSelect: [{
                type: Output
            }], filterChange: [{
                type: Output
            }], moveToLeft: [{
                type: Output
            }], headerCheckbox: [{
                type: ViewChild,
                args: ['headerCheckbox', { read: NzCheckboxComponent }]
            }], checkboxes: [{
                type: ViewChildren,
                args: ['checkboxes', { read: ElementRef }]
            }] } });

class NzTransferComponent {
    cdr;
    i18n;
    elementRef;
    renderer;
    directionality;
    unsubscribe$ = new Subject();
    lists;
    locale;
    leftFilter = '';
    rightFilter = '';
    dir = 'ltr';
    // status
    prefixCls = 'ant-transfer';
    statusCls = {};
    hasFeedback = false;
    // #region fields
    nzDisabled = false;
    nzDataSource = [];
    nzTitles = ['', ''];
    nzOperations = [];
    nzListStyle = {};
    nzShowSelectAll = true;
    nzItemUnit;
    nzItemsUnit;
    nzCanMove = (arg) => of(arg.list);
    nzRenderList = null;
    nzRender = null;
    nzFooter = null;
    nzShowSearch = false;
    nzFilterOption;
    nzSearchPlaceholder;
    nzNotFoundContent;
    nzTargetKeys = [];
    nzSelectedKeys = [];
    nzStatus = '';
    nzOneWay = false;
    // events
    nzChange = new EventEmitter();
    nzSearchChange = new EventEmitter();
    nzSelectChange = new EventEmitter();
    // #endregion
    // #region process data
    // left
    leftDataSource = [];
    lastLeftCheckedIndex;
    // right
    rightDataSource = [];
    lastRightCheckedIndex;
    isShiftPressed = false;
    onTriggerShiftDown() {
        this.isShiftPressed = true;
    }
    onTriggerShiftUp() {
        this.isShiftPressed = false;
    }
    onTriggerMouseDown(event) {
        const isInsideTransfer = event.target.closest('.ant-transfer-list');
        if (event.shiftKey && isInsideTransfer) {
            event.preventDefault();
        }
    }
    splitDataSource() {
        this.leftDataSource = [];
        this.rightDataSource = [];
        this.nzDataSource.forEach(record => {
            if (record.direction === 'right') {
                record.direction = 'right';
                this.rightDataSource.push(record);
            }
            else {
                record.direction = 'left';
                this.leftDataSource.push(record);
            }
        });
    }
    getCheckedData(direction) {
        return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
    }
    handleLeftSelectAll = (checked) => this.handleSelect('left', checked);
    handleRightSelectAll = (checked) => this.handleSelect('right', checked);
    handleLeftSelect = (item) => this.handleSelect('left', !!item.checked, item);
    handleRightSelect = (item) => this.handleSelect('right', !!item.checked, item);
    handleSelect(direction, checked, item) {
        if (item) {
            const datasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
            const currentIndex = datasource.findIndex(i => i.key === item.key);
            const lastCheckedIndex = this[direction === 'left' ? 'lastLeftCheckedIndex' : 'lastRightCheckedIndex'] ?? -1;
            if (this.isShiftPressed && lastCheckedIndex > -1) {
                const start = Math.min(lastCheckedIndex, currentIndex);
                const end = Math.max(lastCheckedIndex, currentIndex);
                for (let i = start; i <= end; i++) {
                    const item = datasource[i];
                    if (!item.disabled) {
                        item.checked = checked;
                    }
                }
                this.markForCheckAllList();
            }
            this[direction === 'left' ? 'lastLeftCheckedIndex' : 'lastRightCheckedIndex'] = currentIndex;
        }
        const list = this.getCheckedData(direction);
        const count = list.filter(i => !i.disabled).length;
        this.updateOperationStatus(direction, count);
        this.nzSelectChange.emit({ direction, checked, list, item });
    }
    handleFilterChange(ret) {
        this.nzSearchChange.emit(ret);
    }
    // #endregion
    // #region operation
    leftActive = false;
    rightActive = false;
    updateOperationStatus(direction, count) {
        this[direction === 'right' ? 'leftActive' : 'rightActive'] =
            (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
    }
    moveToLeft = () => this.moveTo('left');
    moveToRight = () => this.moveTo('right');
    moveTo(direction) {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        this.updateOperationStatus(oppositeDirection, 0);
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const moveList = datasource.filter(item => item.checked === true && !item.disabled);
        this.nzCanMove({ direction, list: moveList }).subscribe(newMoveList => this.truthMoveTo(direction, newMoveList.filter(i => !!i)), () => moveList.forEach(i => (i.checked = false)));
    }
    truthMoveTo(direction, list) {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
        for (const item of list) {
            item.checked = false;
            item.hide = false;
            item.direction = direction;
            datasource.splice(datasource.indexOf(item), 1);
        }
        targetDatasource.splice(0, 0, ...list);
        this.updateOperationStatus(oppositeDirection);
        this.nzChange.emit({ from: oppositeDirection, to: direction, list });
        this.markForCheckAllList();
    }
    nzFormStatusService = inject(NzFormStatusService, { optional: true });
    nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
    // #endregion
    constructor(cdr, i18n, elementRef, renderer, directionality) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.directionality = directionality;
    }
    markForCheckAllList() {
        if (!this.lists) {
            return;
        }
        this.lists.forEach(i => i.markForCheck());
    }
    handleNzTargetKeys() {
        const keys = toArray(this.nzTargetKeys);
        const hasOwnKey = (e) => e.hasOwnProperty('key');
        this.leftDataSource.forEach(e => {
            if (hasOwnKey(e) && keys.indexOf(e.key) !== -1 && !e.disabled) {
                e.checked = true;
            }
        });
        this.moveToRight();
    }
    handleNzSelectedKeys() {
        const keys = toArray(this.nzSelectedKeys);
        this.nzDataSource.forEach(e => {
            if (keys.indexOf(e.key) !== -1) {
                e.checked = true;
            }
        });
        const term = (ld) => ld.disabled === false && ld.checked === true;
        this.rightActive = this.leftDataSource.some(term);
        this.leftActive = this.rightDataSource.some(term);
    }
    ngOnInit() {
        this.nzFormStatusService?.formStatusChanges
            .pipe(distinctUntilChanged((pre, cur) => {
            return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
        }), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })), takeUntil(this.unsubscribe$))
            .subscribe(({ status, hasFeedback }) => {
            this.setStatusStyles(status, hasFeedback);
        });
        this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Transfer');
            this.markForCheckAllList();
        });
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.unsubscribe$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
    }
    ngOnChanges(changes) {
        const { nzStatus, nzDataSource, nzTargetKeys, nzSelectedKeys } = changes;
        if (nzDataSource) {
            this.splitDataSource();
            this.updateOperationStatus('left');
            this.updateOperationStatus('right');
            this.cdr.detectChanges();
            this.markForCheckAllList();
        }
        if (nzTargetKeys) {
            this.handleNzTargetKeys();
        }
        if (nzSelectedKeys) {
            this.handleNzSelectedKeys();
        }
        if (nzStatus) {
            this.setStatusStyles(this.nzStatus, this.hasFeedback);
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    setStatusStyles(status, hasFeedback) {
        // set inner status
        this.hasFeedback = hasFeedback;
        this.cdr.markForCheck();
        // render status if nzStatus is set
        this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
        Object.keys(this.statusCls).forEach(status => {
            if (this.statusCls[status]) {
                this.renderer.addClass(this.elementRef.nativeElement, status);
            }
            else {
                this.renderer.removeClass(this.elementRef.nativeElement, status);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$2.NzI18nService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i2$1.Directionality }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTransferComponent, isStandalone: true, selector: "nz-transfer", inputs: { nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzDataSource: "nzDataSource", nzTitles: "nzTitles", nzOperations: "nzOperations", nzListStyle: "nzListStyle", nzShowSelectAll: ["nzShowSelectAll", "nzShowSelectAll", booleanAttribute], nzItemUnit: "nzItemUnit", nzItemsUnit: "nzItemsUnit", nzCanMove: "nzCanMove", nzRenderList: "nzRenderList", nzRender: "nzRender", nzFooter: "nzFooter", nzShowSearch: ["nzShowSearch", "nzShowSearch", booleanAttribute], nzFilterOption: "nzFilterOption", nzSearchPlaceholder: "nzSearchPlaceholder", nzNotFoundContent: "nzNotFoundContent", nzTargetKeys: "nzTargetKeys", nzSelectedKeys: "nzSelectedKeys", nzStatus: "nzStatus", nzOneWay: ["nzOneWay", "nzOneWay", booleanAttribute] }, outputs: { nzChange: "nzChange", nzSearchChange: "nzSearchChange", nzSelectChange: "nzSelectChange" }, host: { listeners: { "window:keydown.shift": "onTriggerShiftDown()", "window:keyup.shift": "onTriggerShiftUp()", "mousedown": "onTriggerMouseDown($event)" }, properties: { "class.ant-transfer-rtl": "dir === 'rtl'", "class.ant-transfer-disabled": "nzDisabled", "class.ant-transfer-customize-list": "nzRenderList" }, classAttribute: "ant-transfer" }, viewQueries: [{ propertyName: "lists", predicate: NzTransferListComponent, descendants: true }], exportAs: ["nzTransfer"], usesOnChanges: true, ngImport: i0, template: `
    <nz-transfer-list
      class="ant-transfer-list"
      [style]="nzListStyle"
      data-direction="left"
      direction="left"
      [titleText]="nzTitles[0]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[0]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"
    ></nz-transfer-list>
    @if (dir !== 'rtl') {
      <div class="ant-transfer-operation">
        @if (!nzOneWay) {
          <button
            nz-button
            type="button"
            (click)="moveToLeft()"
            [disabled]="nzDisabled || !leftActive"
            [nzType]="'primary'"
            [nzSize]="'small'"
          >
            <nz-icon nzType="left" />
            @if (nzOperations[1]) {
              <span>{{ nzOperations[1] }}</span>
            }
          </button>
        }
        <button
          nz-button
          type="button"
          (click)="moveToRight()"
          [disabled]="nzDisabled || !rightActive"
          [nzType]="'primary'"
          [nzSize]="'small'"
        >
          <nz-icon nzType="right" />
          @if (nzOperations[0]) {
            <span>{{ nzOperations[0] }}</span>
          }
        </button>
      </div>
    } @else {
      <div class="ant-transfer-operation">
        <button
          nz-button
          type="button"
          (click)="moveToRight()"
          [disabled]="nzDisabled || !rightActive"
          [nzType]="'primary'"
          [nzSize]="'small'"
        >
          <nz-icon nzType="left" />
          @if (nzOperations[0]) {
            <span>{{ nzOperations[0] }}</span>
          }
        </button>
        @if (!nzOneWay) {
          <button
            nz-button
            type="button"
            (click)="moveToLeft()"
            [disabled]="nzDisabled || !leftActive"
            [nzType]="'primary'"
            [nzSize]="'small'"
          >
            <nz-icon nzType="right" />
            @if (nzOperations[1]) {
              <span>{{ nzOperations[1] }}</span>
            }
          </button>
        }
      </div>
    }
    <nz-transfer-list
      class="ant-transfer-list"
      [style]="nzListStyle"
      data-direction="right"
      direction="right"
      [titleText]="nzTitles[1]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[1]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      [oneWay]="nzOneWay"
      (moveToLeft)="moveToLeft()"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"
    ></nz-transfer-list>
  `, isInline: true, dependencies: [{ kind: "component", type: NzTransferListComponent, selector: "nz-transfer-list", inputs: ["direction", "titleText", "showSelectAll", "dataSource", "itemUnit", "itemsUnit", "filter", "oneWay", "disabled", "showSearch", "searchPlaceholder", "notFoundContent", "filterOption", "renderList", "render", "footer"], outputs: ["handleSelectAll", "handleSelect", "filterChange", "moveToLeft"], exportAs: ["nzTransferList"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzButtonModule }, { kind: "component", type: i4$1.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i4.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i6.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-transfer',
                    exportAs: 'nzTransfer',
                    preserveWhitespaces: false,
                    template: `
    <nz-transfer-list
      class="ant-transfer-list"
      [style]="nzListStyle"
      data-direction="left"
      direction="left"
      [titleText]="nzTitles[0]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[0]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"
    ></nz-transfer-list>
    @if (dir !== 'rtl') {
      <div class="ant-transfer-operation">
        @if (!nzOneWay) {
          <button
            nz-button
            type="button"
            (click)="moveToLeft()"
            [disabled]="nzDisabled || !leftActive"
            [nzType]="'primary'"
            [nzSize]="'small'"
          >
            <nz-icon nzType="left" />
            @if (nzOperations[1]) {
              <span>{{ nzOperations[1] }}</span>
            }
          </button>
        }
        <button
          nz-button
          type="button"
          (click)="moveToRight()"
          [disabled]="nzDisabled || !rightActive"
          [nzType]="'primary'"
          [nzSize]="'small'"
        >
          <nz-icon nzType="right" />
          @if (nzOperations[0]) {
            <span>{{ nzOperations[0] }}</span>
          }
        </button>
      </div>
    } @else {
      <div class="ant-transfer-operation">
        <button
          nz-button
          type="button"
          (click)="moveToRight()"
          [disabled]="nzDisabled || !rightActive"
          [nzType]="'primary'"
          [nzSize]="'small'"
        >
          <nz-icon nzType="left" />
          @if (nzOperations[0]) {
            <span>{{ nzOperations[0] }}</span>
          }
        </button>
        @if (!nzOneWay) {
          <button
            nz-button
            type="button"
            (click)="moveToLeft()"
            [disabled]="nzDisabled || !leftActive"
            [nzType]="'primary'"
            [nzSize]="'small'"
          >
            <nz-icon nzType="right" />
            @if (nzOperations[1]) {
              <span>{{ nzOperations[1] }}</span>
            }
          </button>
        }
      </div>
    }
    <nz-transfer-list
      class="ant-transfer-list"
      [style]="nzListStyle"
      data-direction="right"
      direction="right"
      [titleText]="nzTitles[1]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[1]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      [oneWay]="nzOneWay"
      (moveToLeft)="moveToLeft()"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"
    ></nz-transfer-list>
  `,
                    host: {
                        class: 'ant-transfer',
                        '[class.ant-transfer-rtl]': `dir === 'rtl'`,
                        '[class.ant-transfer-disabled]': `nzDisabled`,
                        '[class.ant-transfer-customize-list]': `nzRenderList`
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NzTransferListComponent, NzIconModule, NzButtonModule]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1$2.NzI18nService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2$1.Directionality }], propDecorators: { lists: [{
                type: ViewChildren,
                args: [NzTransferListComponent]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDataSource: [{
                type: Input
            }], nzTitles: [{
                type: Input
            }], nzOperations: [{
                type: Input
            }], nzListStyle: [{
                type: Input
            }], nzShowSelectAll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzItemUnit: [{
                type: Input
            }], nzItemsUnit: [{
                type: Input
            }], nzCanMove: [{
                type: Input
            }], nzRenderList: [{
                type: Input
            }], nzRender: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzShowSearch: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzFilterOption: [{
                type: Input
            }], nzSearchPlaceholder: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzTargetKeys: [{
                type: Input
            }], nzSelectedKeys: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzOneWay: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzChange: [{
                type: Output
            }], nzSearchChange: [{
                type: Output
            }], nzSelectChange: [{
                type: Output
            }], onTriggerShiftDown: [{
                type: HostListener,
                args: ['window:keydown.shift']
            }], onTriggerShiftUp: [{
                type: HostListener,
                args: ['window:keyup.shift']
            }], onTriggerMouseDown: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTransferModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzTransferModule, imports: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent], exports: [NzTransferComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferModule, imports: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTransferModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent],
                    exports: [NzTransferComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTransferComponent, NzTransferListComponent, NzTransferModule, NzTransferSearchComponent };
//# sourceMappingURL=ng-zorro-antd-transfer.mjs.map
