import * as i0 from '@angular/core';
import { EventEmitter, booleanAttribute, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, Injectable, Directive, inject, NgModule, computed, signal, forwardRef, ViewChildren, ViewChild } from '@angular/core';
import { NgTemplateOutlet, DOCUMENT } from '@angular/common';
import * as i2 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i10 from 'ng-zorro-antd/core/outlet';
import { NzStringTemplateOutletDirective, NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { CandyDate, normalizeRangeValue, cloneDate, wrongSortOrder } from 'ng-zorro-antd/core/time';
import * as i1 from 'ng-zorro-antd/i18n';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';
import * as i3 from 'ng-zorro-antd/core/transition-patch';
import * as i4 from 'ng-zorro-antd/core/wave';
import { __esDecorate, __runInitializers } from 'tslib';
import { ESCAPE } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import * as i9 from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject, merge, of } from 'rxjs';
import { takeUntil, distinctUntilChanged, withLatestFrom, map } from 'rxjs/operators';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import * as i1$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormStatusService, NzFormNoStatusService, NzFormItemFeedbackIconComponent } from 'ng-zorro-antd/core/form';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import * as i12 from 'ng-zorro-antd/core/overlay';
import { DEFAULT_DATE_PICKER_POSITIONS, DATE_PICKER_POSITION_MAP, NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import * as i6 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { valueFunctionProp, fromEventOutsideAngular, toBoolean, getStatusClassNames } from 'ng-zorro-antd/core/util';
import * as i11$1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i8 from 'ng-zorro-antd/space';
import { NZ_SPACE_COMPACT_SIZE, NZ_SPACE_COMPACT_ITEM_TYPE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';
import * as i11 from 'ng-zorro-antd/time-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { startOfQuarter } from 'date-fns';
import * as i4$1 from 'ng-zorro-antd/cdk/resize-observer';
import * as i5 from '@angular/cdk/platform';
import * as i7 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const PREFIX_CLASS = 'ant-picker';
const defaultDisabledTime = {
    nzDisabledHours() {
        return [];
    },
    nzDisabledMinutes() {
        return [];
    },
    nzDisabledSeconds() {
        return [];
    }
};
function getTimeConfig(value, disabledTime) {
    let disabledTimeConfig = disabledTime ? disabledTime(value && value.nativeDate) : {};
    disabledTimeConfig = {
        ...defaultDisabledTime,
        ...disabledTimeConfig
    };
    return disabledTimeConfig;
}
function isTimeValidByConfig(value, disabledTimeConfig) {
    let invalidTime = false;
    if (value) {
        const hour = value.getHours();
        const minutes = value.getMinutes();
        const seconds = value.getSeconds();
        const disabledHours = disabledTimeConfig.nzDisabledHours();
        if (disabledHours.indexOf(hour) === -1) {
            const disabledMinutes = disabledTimeConfig.nzDisabledMinutes(hour);
            if (disabledMinutes.indexOf(minutes) === -1) {
                const disabledSeconds = disabledTimeConfig.nzDisabledSeconds(hour, minutes);
                invalidTime = disabledSeconds.indexOf(seconds) !== -1;
            }
            else {
                invalidTime = true;
            }
        }
        else {
            invalidTime = true;
        }
    }
    return !invalidTime;
}
function isTimeValid(value, disabledTime) {
    const disabledTimeConfig = getTimeConfig(value, disabledTime);
    return isTimeValidByConfig(value, disabledTimeConfig);
}
function isAllowedDate(value, disabledDate, disabledTime) {
    if (!value) {
        return false;
    }
    if (disabledDate) {
        if (disabledDate(value.nativeDate)) {
            return false;
        }
    }
    if (disabledTime) {
        if (!isTimeValid(value, disabledTime)) {
            return false;
        }
    }
    return true;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Compatible translate the moment-like format pattern to angular's pattern
 * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
 *
 * TODO: compare and complete all format patterns
 * Each format docs as below:
 *
 * @link https://momentjs.com/docs/#/displaying/format/
 * @link https://angular.io/api/common/DatePipe#description
 * @param format input format pattern
 */
function transCompatFormat(format) {
    return (format &&
        format
            .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
            .replace(/D/g, 'd')); // d, dd represent of D, DD for momentjs, others are not support
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class CalendarFooterComponent {
    dateHelper;
    locale;
    showToday = false;
    showNow = false;
    hasTimePicker = false;
    isRange = false;
    okDisabled = false;
    disabledDate;
    extraFooter;
    rangeQuickSelector = null;
    clickOk = new EventEmitter();
    clickToday = new EventEmitter();
    prefixCls = PREFIX_CLASS;
    isTodayDisabled = false;
    todayTitle = '';
    constructor(dateHelper) {
        this.dateHelper = dateHelper;
    }
    ngOnChanges(changes) {
        const now = new Date();
        if (changes.disabledDate) {
            this.isTodayDisabled = !!(this.disabledDate && this.disabledDate(now));
        }
        if (changes.locale) {
            // NOTE: Compat for DatePipe formatting rules
            const dateFormat = transCompatFormat(this.locale.dateFormat);
            this.todayTitle = this.dateHelper.format(now, dateFormat);
        }
    }
    onClickToday() {
        const now = new CandyDate();
        this.clickToday.emit(now.clone()); // To prevent the "now" being modified from outside, we use clone
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: CalendarFooterComponent, deps: [{ token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: CalendarFooterComponent, isStandalone: true, selector: "calendar-footer", inputs: { locale: "locale", showToday: ["showToday", "showToday", booleanAttribute], showNow: ["showNow", "showNow", booleanAttribute], hasTimePicker: ["hasTimePicker", "hasTimePicker", booleanAttribute], isRange: ["isRange", "isRange", booleanAttribute], okDisabled: ["okDisabled", "okDisabled", booleanAttribute], disabledDate: "disabledDate", extraFooter: "extraFooter", rangeQuickSelector: "rangeQuickSelector" }, outputs: { clickOk: "clickOk", clickToday: "clickToday" }, exportAs: ["calendarFooter"], usesOnChanges: true, ngImport: i0, template: `
    <div class="{{ prefixCls }}-footer">
      @if (extraFooter) {
        <div class="{{ prefixCls }}-footer-extra">
          <ng-template [nzStringTemplateOutlet]="extraFooter">{{ extraFooter }}</ng-template>
        </div>
      }

      @if (showToday) {
        <a
          class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
          role="button"
          (click)="isTodayDisabled ? null : onClickToday()"
          title="{{ todayTitle }}"
        >
          {{ locale.today }}
        </a>
      }

      @if (hasTimePicker || rangeQuickSelector) {
        <ul class="{{ prefixCls }}-ranges">
          <ng-container *ngTemplateOutlet="rangeQuickSelector" />
          @if (showNow) {
            <li class="{{ prefixCls }}-now">
              <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
                {{ locale.now }}
              </a>
            </li>
          }

          @if (hasTimePicker) {
            <li class="{{ prefixCls }}-ok">
              <button
                nz-button
                type="button"
                nzType="primary"
                nzSize="small"
                [disabled]="okDisabled"
                (click)="okDisabled ? null : clickOk.emit()"
              >
                {{ locale.ok }}
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzButtonModule }, { kind: "component", type: i2.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: CalendarFooterComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'calendar-footer',
                    exportAs: 'calendarFooter',
                    imports: [NgTemplateOutlet, NzButtonModule, NzStringTemplateOutletDirective],
                    template: `
    <div class="{{ prefixCls }}-footer">
      @if (extraFooter) {
        <div class="{{ prefixCls }}-footer-extra">
          <ng-template [nzStringTemplateOutlet]="extraFooter">{{ extraFooter }}</ng-template>
        </div>
      }

      @if (showToday) {
        <a
          class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
          role="button"
          (click)="isTodayDisabled ? null : onClickToday()"
          title="{{ todayTitle }}"
        >
          {{ locale.today }}
        </a>
      }

      @if (hasTimePicker || rangeQuickSelector) {
        <ul class="{{ prefixCls }}-ranges">
          <ng-container *ngTemplateOutlet="rangeQuickSelector" />
          @if (showNow) {
            <li class="{{ prefixCls }}-now">
              <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
                {{ locale.now }}
              </a>
            </li>
          }

          @if (hasTimePicker) {
            <li class="{{ prefixCls }}-ok">
              <button
                nz-button
                type="button"
                nzType="primary"
                nzSize="small"
                [disabled]="okDisabled"
                (click)="okDisabled ? null : clickOk.emit()"
              >
                {{ locale.ok }}
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: i1.DateHelperService }], propDecorators: { locale: [{
                type: Input
            }], showToday: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showNow: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hasTimePicker: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], isRange: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], okDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabledDate: [{
                type: Input
            }], extraFooter: [{
                type: Input
            }], rangeQuickSelector: [{
                type: Input
            }], clickOk: [{
                type: Output
            }], clickToday: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class DatePickerService {
    initialValue;
    value;
    activeDate;
    activeInput = 'left';
    arrowLeft = 0;
    isRange = false;
    valueChange$ = new ReplaySubject(1);
    emitValue$ = new Subject();
    inputPartChange$ = new Subject();
    initValue(reset = false) {
        if (reset) {
            this.initialValue = this.isRange ? [] : null;
        }
        this.setValue(this.initialValue);
    }
    hasValue(value = this.value) {
        if (Array.isArray(value)) {
            return !!value[0] || !!value[1];
        }
        else {
            return !!value;
        }
    }
    makeValue(value) {
        if (this.isRange) {
            return value ? value.map(val => new CandyDate(val)) : [];
        }
        else {
            return value ? new CandyDate(value) : null;
        }
    }
    setActiveDate(value, hasTimePicker = false, mode = 'month') {
        const parentPanels = {
            date: 'month',
            month: 'year',
            quarter: 'year',
            year: 'decade'
        };
        if (this.isRange) {
            this.activeDate = normalizeRangeValue(value, hasTimePicker, parentPanels[mode], this.activeInput);
        }
        else {
            this.activeDate = cloneDate(value);
        }
    }
    setValue(value) {
        this.value = value;
        this.valueChange$.next(this.value);
    }
    getActiveIndex(part = this.activeInput) {
        return { left: 0, right: 1 }[part];
    }
    ngOnDestroy() {
        this.valueChange$.complete();
        this.emitValue$.complete();
        this.inputPartChange$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DatePickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DatePickerService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DatePickerService, decorators: [{
            type: Injectable
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class AbstractPanelHeader {
    prefixCls = `ant-picker-header`;
    selectors = [];
    mode;
    value;
    locale;
    showSuperPreBtn = true;
    showSuperNextBtn = true;
    showPreBtn = true;
    showNextBtn = true;
    panelChange = new EventEmitter();
    valueChange = new EventEmitter();
    superPreviousTitle() {
        return this.locale.previousYear;
    }
    previousTitle() {
        return this.locale.previousMonth;
    }
    superNextTitle() {
        return this.locale.nextYear;
    }
    nextTitle() {
        return this.locale.nextMonth;
    }
    superPrevious() {
        this.changeValue(this.value.addYears(-1));
    }
    superNext() {
        this.changeValue(this.value.addYears(1));
    }
    previous() {
        this.changeValue(this.value.addMonths(-1));
    }
    next() {
        this.changeValue(this.value.addMonths(1));
    }
    changeValue(value) {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.changeMode(this.mode);
            this.render();
        }
    }
    changeMode(mode) {
        this.panelChange.emit({ mode, date: this.value.nativeDate });
    }
    render() {
        if (this.value) {
            this.selectors = this.getSelectors();
        }
    }
    ngOnInit() {
        if (!this.value) {
            this.value = new CandyDate(); // Show today by default
        }
        this.selectors = this.getSelectors();
    }
    ngOnChanges(changes) {
        if (changes.value || changes.locale) {
            this.render();
        }
    }
    trackBySelector(selector) {
        return `${selector.title}-${selector.label}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AbstractPanelHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: AbstractPanelHeader, isStandalone: true, inputs: { value: "value", locale: "locale", showSuperPreBtn: ["showSuperPreBtn", "showSuperPreBtn", booleanAttribute], showSuperNextBtn: ["showSuperNextBtn", "showSuperNextBtn", booleanAttribute], showPreBtn: ["showPreBtn", "showPreBtn", booleanAttribute], showNextBtn: ["showNextBtn", "showNextBtn", booleanAttribute] }, outputs: { panelChange: "panelChange", valueChange: "valueChange" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AbstractPanelHeader, decorators: [{
            type: Directive
        }], propDecorators: { value: [{
                type: Input
            }], locale: [{
                type: Input
            }], showSuperPreBtn: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showSuperNextBtn: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showPreBtn: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showNextBtn: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], panelChange: [{
                type: Output
            }], valueChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class DecadeHeaderComponent extends AbstractPanelHeader {
    previous() { }
    next() { }
    mode = 'decade';
    get startYear() {
        return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
    }
    get endYear() {
        return this.startYear + 99;
    }
    superPrevious() {
        this.changeValue(this.value.addYears(-100));
    }
    superNext() {
        this.changeValue(this.value.addYears(100));
    }
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-decade-btn`,
                title: '',
                onClick: () => { },
                label: `${this.startYear}-${this.endYear}`
            }
        ];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DecadeHeaderComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: DecadeHeaderComponent, isStandalone: true, selector: "decade-header", exportAs: ["decadeHeader"], usesInheritance: true, ngImport: i0, template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DecadeHeaderComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'decade-header', exportAs: 'decadeHeader', template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n" }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class AbstractTable {
    headRow = [];
    bodyRows = [];
    MAX_ROW = 6;
    MAX_COL = 7;
    prefixCls = 'ant-picker';
    value;
    locale;
    activeDate = new CandyDate();
    showWeek = false;
    selectedValue = []; // Range ONLY
    hoverValue = []; // Range ONLY
    disabledDate;
    cellRender;
    fullCellRender;
    canSelectWeek = false;
    valueChange = new EventEmitter();
    cellHover = new EventEmitter(); // Emitted when hover on a day by mouse enter
    render() {
        if (this.activeDate) {
            this.headRow = this.makeHeadRow();
            this.bodyRows = this.makeBodyRows();
        }
    }
    hasRangeValue() {
        return this.selectedValue?.length > 0 || this.hoverValue?.length > 0;
    }
    getClassMap(cell) {
        return {
            [`ant-picker-cell`]: true,
            [`ant-picker-cell-in-view`]: true,
            [`ant-picker-cell-selected`]: cell.isSelected,
            [`ant-picker-cell-disabled`]: cell.isDisabled,
            [`ant-picker-cell-in-range`]: !!cell.isInSelectedRange,
            [`ant-picker-cell-range-start`]: !!cell.isSelectedStart,
            [`ant-picker-cell-range-end`]: !!cell.isSelectedEnd,
            [`ant-picker-cell-range-start-single`]: !!cell.isStartSingle,
            [`ant-picker-cell-range-end-single`]: !!cell.isEndSingle,
            [`ant-picker-cell-range-hover`]: !!cell.isInHoverRange,
            [`ant-picker-cell-range-hover-start`]: !!cell.isHoverStart,
            [`ant-picker-cell-range-hover-end`]: !!cell.isHoverEnd,
            [`ant-picker-cell-range-hover-edge-start`]: !!cell.isFirstCellInPanel,
            [`ant-picker-cell-range-hover-edge-end`]: !!cell.isLastCellInPanel,
            [`ant-picker-cell-range-start-near-hover`]: !!cell.isRangeStartNearHover,
            [`ant-picker-cell-range-end-near-hover`]: !!cell.isRangeEndNearHover
        };
    }
    ngOnInit() {
        this.render();
    }
    ngOnChanges(changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
        if (changes.disabledDate ||
            changes.locale ||
            changes.showWeek ||
            changes.selectWeek ||
            this.isDateRealChange(changes.activeDate) ||
            this.isDateRealChange(changes.value) ||
            this.isDateRealChange(changes.selectedValue) ||
            this.isDateRealChange(changes.hoverValue)) {
            this.render();
        }
    }
    isDateRealChange(change) {
        if (change) {
            const previousValue = change.previousValue;
            const currentValue = change.currentValue;
            if (Array.isArray(currentValue)) {
                return (!Array.isArray(previousValue) ||
                    currentValue.length !== previousValue.length ||
                    currentValue.some((value, index) => {
                        const previousCandyDate = previousValue[index];
                        return previousCandyDate instanceof CandyDate
                            ? previousCandyDate.isSameDay(value)
                            : previousCandyDate !== value;
                    }));
            }
            else {
                return !this.isSameDate(previousValue, currentValue);
            }
        }
        return false;
    }
    isSameDate(left, right) {
        return (!left && !right) || (left && right && right.isSameDay(left));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AbstractTable, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: AbstractTable, isStandalone: true, inputs: { prefixCls: "prefixCls", value: "value", locale: "locale", activeDate: "activeDate", showWeek: ["showWeek", "showWeek", booleanAttribute], selectedValue: "selectedValue", hoverValue: "hoverValue", disabledDate: "disabledDate", cellRender: "cellRender", fullCellRender: "fullCellRender", canSelectWeek: ["canSelectWeek", "canSelectWeek", booleanAttribute] }, outputs: { valueChange: "valueChange", cellHover: "cellHover" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AbstractTable, decorators: [{
            type: Directive
        }], propDecorators: { prefixCls: [{
                type: Input
            }], value: [{
                type: Input
            }], locale: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], showWeek: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectedValue: [{
                type: Input
            }], hoverValue: [{
                type: Input
            }], disabledDate: [{
                type: Input
            }], cellRender: [{
                type: Input
            }], fullCellRender: [{
                type: Input
            }], canSelectWeek: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], valueChange: [{
                type: Output
            }], cellHover: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const MAX_ROW = 4;
const MAX_COL = 3;
class DecadeTableComponent extends AbstractTable {
    get startYear() {
        return parseInt(`${this.activeDate.getYear() / 100}`, 10) * 100;
    }
    get endYear() {
        return this.startYear + 99;
    }
    makeHeadRow() {
        return [];
    }
    makeBodyRows() {
        const decades = [];
        const currentYear = this.value && this.value.getYear();
        const startYear = this.startYear;
        const endYear = this.endYear;
        const previousYear = startYear - 10;
        let index = 0;
        for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
            const row = {
                dateCells: [],
                trackByIndex: rowIndex
            };
            for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
                const start = previousYear + index * 10;
                const end = previousYear + index * 10 + 9;
                const content = `${start}-${end}`;
                const cell = {
                    trackByIndex: colIndex,
                    value: this.activeDate.setYear(start).nativeDate,
                    content,
                    title: content,
                    isDisabled: false,
                    isSelected: currentYear >= start && currentYear <= end,
                    isLowerThanStart: end < startYear,
                    isBiggerThanEnd: start > endYear,
                    classMap: {},
                    onClick() { },
                    onMouseEnter() { }
                };
                cell.classMap = this.getClassMap(cell);
                cell.onClick = () => this.chooseDecade(start);
                index++;
                row.dateCells.push(cell);
            }
            decades.push(row);
        }
        return decades;
    }
    getClassMap(cell) {
        return {
            [`${this.prefixCls}-cell`]: true,
            [`${this.prefixCls}-cell-in-view`]: !cell.isBiggerThanEnd && !cell.isLowerThanStart,
            [`${this.prefixCls}-cell-selected`]: cell.isSelected,
            [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
        };
    }
    chooseDecade(year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DecadeTableComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: DecadeTableComponent, isStandalone: true, selector: "decade-table", exportAs: ["decadeTable"], usesInheritance: true, ngImport: i0, template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DecadeTableComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'decade-table', exportAs: 'decadeTable', imports: [NzStringTemplateOutletDirective], template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class YearHeaderComponent extends AbstractPanelHeader {
    mode = 'year';
    get startYear() {
        return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
    }
    get endYear() {
        return this.startYear + 9;
    }
    superPrevious() {
        this.changeValue(this.value.addYears(-10));
    }
    superNext() {
        this.changeValue(this.value.addYears(10));
    }
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: '',
                onClick: () => {
                    this.mode = 'decade';
                    this.changeMode('decade');
                },
                label: `${this.startYear}-${this.endYear}`
            }
        ];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: YearHeaderComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: YearHeaderComponent, isStandalone: true, selector: "year-header", exportAs: ["yearHeader"], usesInheritance: true, ngImport: i0, template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: YearHeaderComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'year-header', exportAs: 'yearHeader', template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n" }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class YearTableComponent extends AbstractTable {
    dateHelper;
    MAX_ROW = 4;
    MAX_COL = 3;
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    makeHeadRow() {
        return [];
    }
    makeBodyRows() {
        const currentYear = this.activeDate && this.activeDate.getYear();
        const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
        const endYear = startYear + 9;
        const previousYear = startYear - 1;
        const years = [];
        let yearValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row = {
                dateCells: [],
                trackByIndex: rowIndex
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const yearNum = previousYear + yearValue;
                const year = this.activeDate.setYear(yearNum);
                const content = this.dateHelper.format(year.nativeDate, 'yyyy');
                const isDisabled = this.isDisabledYear(year);
                const cell = {
                    trackByIndex: colIndex,
                    value: year.nativeDate,
                    isDisabled,
                    isSameDecade: yearNum >= startYear && yearNum <= endYear,
                    isSelected: yearNum === (this.value && this.value.getYear()),
                    content,
                    title: content,
                    classMap: {},
                    isLastCellInPanel: year.getYear() === endYear,
                    isFirstCellInPanel: year.getYear() === startYear,
                    cellRender: valueFunctionProp(this.cellRender, year), // Customized content
                    fullCellRender: valueFunctionProp(this.fullCellRender, year),
                    onClick: () => this.chooseYear(cell.value.getFullYear()), // don't use yearValue here,
                    onMouseEnter: () => this.cellHover.emit(year)
                };
                this.addCellProperty(cell, year);
                row.dateCells.push(cell);
                yearValue++;
            }
            years.push(row);
        }
        return years;
    }
    getClassMap(cell) {
        return {
            ...super.getClassMap(cell),
            [`ant-picker-cell-in-view`]: !!cell.isSameDecade
        };
    }
    isDisabledYear(year) {
        if (!this.disabledDate) {
            return false;
        }
        const firstOfMonth = year.setMonth(0).setDate(1);
        for (let date = firstOfMonth; date.getYear() === year.getYear(); date = date.addDays(1)) {
            if (!this.disabledDate(date.nativeDate)) {
                return false;
            }
        }
        return true;
    }
    addCellProperty(cell, year) {
        if (this.hasRangeValue()) {
            const [startHover, endHover] = this.hoverValue;
            const [startSelected, endSelected] = this.selectedValue;
            // Selected
            if (startSelected?.isSameYear(year)) {
                cell.isSelectedStart = true;
                cell.isSelected = true;
            }
            if (endSelected?.isSameYear(year)) {
                cell.isSelectedEnd = true;
                cell.isSelected = true;
            }
            if (startHover && endHover) {
                cell.isHoverStart = startHover.isSameYear(year);
                cell.isHoverEnd = endHover.isSameYear(year);
                cell.isInHoverRange = startHover.isBeforeYear(year) && year.isBeforeYear(endHover);
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && endSelected;
            cell.isInSelectedRange = startSelected?.isBeforeYear(year) && year?.isBeforeYear(endSelected);
            cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
            cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
        }
        else if (year.isSameYear(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell);
    }
    chooseYear(year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
        this.render();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: YearTableComponent, deps: [{ token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: YearTableComponent, isStandalone: true, selector: "year-table", exportAs: ["yearTable"], usesInheritance: true, ngImport: i0, template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: YearTableComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'year-table', exportAs: 'yearTable', imports: [NzStringTemplateOutletDirective], template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
        }], ctorParameters: () => [{ type: i1.DateHelperService }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class QuarterHeaderComponent extends AbstractPanelHeader {
    dateHelper;
    mode = 'quarter';
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-quarter-btn`,
                title: this.locale.yearSelect,
                onClick: () => {
                    this.mode = 'year';
                    this.changeMode('year');
                },
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            }
        ];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: QuarterHeaderComponent, deps: [{ token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: QuarterHeaderComponent, isStandalone: true, selector: "quarter-header", exportAs: ["quarterHeader"], usesInheritance: true, ngImport: i0, template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: QuarterHeaderComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'quarter-header', exportAs: 'quarterHeader', template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n" }]
        }], ctorParameters: () => [{ type: i1.DateHelperService }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class QuarterTableComponent extends AbstractTable {
    dateHelper;
    MAX_ROW = 1;
    MAX_COL = 4;
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    changeValueFromInside(value) {
        this.activeDate = value.clone();
        this.valueChange.emit(this.activeDate);
        if (!this.activeDate.isSameQuarter(this.value)) {
            this.render();
        }
    }
    makeHeadRow() {
        return [];
    }
    makeBodyRows() {
        const dateCells = [];
        const months = [{ dateCells, trackByIndex: 0 }];
        let quarterValue = 1;
        for (let colIndex = 1; colIndex <= this.MAX_COL; colIndex++, quarterValue++) {
            const date = this.activeDate.setQuarter(quarterValue);
            const isDisabled = this.isDisabledQuarter(date);
            const content = this.dateHelper.format(date.nativeDate, '[Q]Q');
            const cell = {
                trackByIndex: colIndex,
                value: date.nativeDate,
                isDisabled,
                isSelected: date.isSameQuarter(this.value),
                content,
                title: content,
                classMap: {},
                cellRender: valueFunctionProp(this.cellRender, date),
                fullCellRender: valueFunctionProp(this.fullCellRender, date),
                onClick: () => this.changeValueFromInside(date),
                onMouseEnter: () => this.cellHover.emit(date)
            };
            this.addCellProperty(cell, date);
            dateCells.push(cell);
        }
        return months;
    }
    isDisabledQuarter(quarter) {
        if (!this.disabledDate) {
            return false;
        }
        const firstDayOfQuarter = new CandyDate(startOfQuarter(quarter.nativeDate));
        for (let date = firstDayOfQuarter; date.getQuarter() === quarter.getQuarter(); date = date.addMonths(1)) {
            if (!this.disabledDate(date.nativeDate)) {
                return false;
            }
        }
        return true;
    }
    addCellProperty(cell, month) {
        if (this.hasRangeValue()) {
            const [startHover, endHover] = this.hoverValue;
            const [startSelected, endSelected] = this.selectedValue;
            if (startSelected?.isSameQuarter(month)) {
                cell.isSelectedStart = true;
                cell.isSelected = true;
            }
            if (endSelected?.isSameQuarter(month)) {
                cell.isSelectedEnd = true;
                cell.isSelected = true;
            }
            if (startHover && endHover) {
                cell.isHoverStart = startHover.isSameQuarter(month);
                cell.isHoverEnd = endHover.isSameQuarter(month);
                cell.isLastCellInPanel = month.getQuarter() === 4;
                cell.isFirstCellInPanel = month.getQuarter() === 1;
                cell.isInHoverRange = startHover.isBeforeQuarter(month) && month.isBeforeQuarter(endHover);
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && endSelected;
            cell.isInSelectedRange = startSelected?.isBeforeQuarter(month) && month?.isBeforeQuarter(endSelected);
            cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
            cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
        }
        else if (month.isSameQuarter(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: QuarterTableComponent, deps: [{ token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: QuarterTableComponent, isStandalone: true, selector: "quarter-table", exportAs: ["quarterTable"], usesInheritance: true, ngImport: i0, template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: QuarterTableComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'quarter-table', exportAs: 'quarterTable', imports: [NzStringTemplateOutletDirective], template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
        }], ctorParameters: () => [{ type: i1.DateHelperService }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class MonthHeaderComponent extends AbstractPanelHeader {
    dateHelper;
    mode = 'month';
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-month-btn`,
                title: this.locale.yearSelect,
                onClick: () => {
                    this.mode = 'year';
                    this.changeMode('year');
                },
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            }
        ];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: MonthHeaderComponent, deps: [{ token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: MonthHeaderComponent, isStandalone: true, selector: "month-header", exportAs: ["monthHeader"], usesInheritance: true, ngImport: i0, template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: MonthHeaderComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'month-header', exportAs: 'monthHeader', template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n" }]
        }], ctorParameters: () => [{ type: i1.DateHelperService }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class MonthTableComponent extends AbstractTable {
    MAX_ROW = 4;
    MAX_COL = 3;
    dateHelper = inject(DateHelperService);
    makeHeadRow() {
        return [];
    }
    makeBodyRows() {
        const months = [];
        let monthValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row = {
                dateCells: [],
                trackByIndex: rowIndex
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const month = this.activeDate.setMonth(monthValue);
                const isDisabled = this.isDisabledMonth(month);
                const content = this.dateHelper.format(month.nativeDate, 'MMM');
                const cell = {
                    trackByIndex: colIndex,
                    value: month.nativeDate,
                    isDisabled,
                    isSelected: month.isSameMonth(this.value),
                    content,
                    title: content,
                    classMap: {},
                    cellRender: valueFunctionProp(this.cellRender, month), // Customized content
                    fullCellRender: valueFunctionProp(this.fullCellRender, month),
                    onClick: () => this.chooseMonth(cell.value.getMonth()), // don't use monthValue here,
                    onMouseEnter: () => this.cellHover.emit(month)
                };
                this.addCellProperty(cell, month);
                row.dateCells.push(cell);
                monthValue++;
            }
            months.push(row);
        }
        return months;
    }
    isDisabledMonth(month) {
        if (!this.disabledDate) {
            return false;
        }
        const firstOfMonth = month.setDate(1);
        for (let date = firstOfMonth; date.getMonth() === month.getMonth(); date = date.addDays(1)) {
            if (!this.disabledDate(date.nativeDate)) {
                return false;
            }
        }
        return true;
    }
    addCellProperty(cell, month) {
        if (this.hasRangeValue()) {
            const [startHover, endHover] = this.hoverValue;
            const [startSelected, endSelected] = this.selectedValue;
            // Selected
            if (startSelected?.isSameMonth(month)) {
                cell.isSelectedStart = true;
                cell.isSelected = true;
            }
            if (endSelected?.isSameMonth(month)) {
                cell.isSelectedEnd = true;
                cell.isSelected = true;
            }
            if (startHover && endHover) {
                cell.isHoverStart = startHover.isSameMonth(month);
                cell.isHoverEnd = endHover.isSameMonth(month);
                cell.isLastCellInPanel = month.getMonth() === 11;
                cell.isFirstCellInPanel = month.getMonth() === 0;
                cell.isInHoverRange = startHover.isBeforeMonth(month) && month.isBeforeMonth(endHover);
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && endSelected;
            cell.isInSelectedRange = startSelected?.isBeforeMonth(month) && month?.isBeforeMonth(endSelected);
            cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
            cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
        }
        else if (month.isSameMonth(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell);
    }
    chooseMonth(month) {
        this.value = this.activeDate.setMonth(month);
        this.valueChange.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: MonthTableComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: MonthTableComponent, isStandalone: true, selector: "month-table", exportAs: ["monthTable"], usesInheritance: true, ngImport: i0, template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: MonthTableComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'month-table', exportAs: 'monthTable', imports: [NzStringTemplateOutletDirective], template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class DateHeaderComponent extends AbstractPanelHeader {
    dateHelper;
    mode = 'date';
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: this.locale.yearSelect,
                onClick: () => {
                    this.mode = 'year';
                    this.changeMode('year');
                },
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            },
            {
                className: `${this.prefixCls}-month-btn`,
                title: this.locale.monthSelect,
                onClick: () => {
                    this.mode = 'month';
                    this.changeMode('month');
                },
                label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || 'MMM')
            }
        ];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DateHeaderComponent, deps: [{ token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: DateHeaderComponent, isStandalone: true, selector: "date-header", exportAs: ["dateHeader"], usesInheritance: true, ngImport: i0, template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DateHeaderComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'date-header', exportAs: 'dateHeader', template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    type=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    @for (selector of selectors; track trackBySelector(selector)) {\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    }\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    type=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n" }]
        }], ctorParameters: () => [{ type: i1.DateHelperService }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class DateTableComponent extends AbstractTable {
    format;
    i18n = inject(NzI18nService);
    dateHelper = inject(DateHelperService);
    changeValueFromInside(value) {
        // Only change date not change time
        this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
        this.valueChange.emit(this.activeDate);
        if (!this.activeDate.isSameMonth(this.value)) {
            this.render();
        }
    }
    makeHeadRow() {
        const weekDays = [];
        const start = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
            const day = start.addDays(colIndex);
            weekDays.push({
                trackByIndex: null,
                value: day.nativeDate,
                title: this.dateHelper.format(day.nativeDate, 'E'), // eg. Tue
                content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()), // eg. Tu,
                isSelected: false,
                isDisabled: false,
                onClick() { },
                onMouseEnter() { }
            });
        }
        return weekDays;
    }
    getVeryShortWeekFormat() {
        return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
    }
    makeBodyRows() {
        const weekRows = [];
        const firstDayOfMonth = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (let week = 0; week < this.MAX_ROW; week++) {
            const weekStart = firstDayOfMonth.addDays(week * 7);
            const row = {
                isActive: false,
                dateCells: [],
                trackByIndex: week
            };
            for (let day = 0; day < 7; day++) {
                const date = weekStart.addDays(day);
                const dateFormat = transCompatFormat(this.format ?? this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD'));
                const title = this.dateHelper.format(date.nativeDate, dateFormat);
                const label = this.dateHelper.format(date.nativeDate, 'dd');
                const cell = {
                    trackByIndex: day,
                    value: date.nativeDate,
                    label,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title,
                    cellRender: valueFunctionProp(this.cellRender, date), // Customized content
                    fullCellRender: valueFunctionProp(this.fullCellRender, date),
                    content: `${date.getDate()}`,
                    onClick: () => this.changeValueFromInside(date),
                    onMouseEnter: () => this.cellHover.emit(date)
                };
                this.addCellProperty(cell, date);
                if (this.showWeek && !row.weekNum) {
                    row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
                }
                if (date.isSameDay(this.value)) {
                    row.isActive = date.isSameDay(this.value);
                }
                row.dateCells.push(cell);
            }
            row.classMap = {
                [`ant-picker-week-panel-row`]: this.canSelectWeek,
                [`ant-picker-week-panel-row-selected`]: this.canSelectWeek && row.isActive
            };
            weekRows.push(row);
        }
        return weekRows;
    }
    addCellProperty(cell, date) {
        if (this.hasRangeValue() && !this.canSelectWeek) {
            const [startHover, endHover] = this.hoverValue;
            const [startSelected, endSelected] = this.selectedValue;
            // Selected
            if (startSelected?.isSameDay(date)) {
                cell.isSelectedStart = true;
                cell.isSelected = true;
            }
            if (endSelected?.isSameDay(date)) {
                cell.isSelectedEnd = true;
                cell.isSelected = true;
            }
            if (startHover && endHover) {
                cell.isHoverStart = startHover.isSameDay(date);
                cell.isHoverEnd = endHover.isSameDay(date);
                cell.isLastCellInPanel = date.isLastDayOfMonth();
                cell.isFirstCellInPanel = date.isFirstDayOfMonth();
                cell.isInHoverRange = startHover.isBeforeDay(date) && date.isBeforeDay(endHover);
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && endSelected;
            cell.isInSelectedRange = startSelected?.isBeforeDay(date) && date.isBeforeDay(endSelected);
            cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
            cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
        }
        cell.isToday = date.isToday();
        cell.isSelected = date.isSameDay(this.value);
        cell.isDisabled = !!this.disabledDate?.(date.nativeDate);
        cell.classMap = this.getClassMap(cell);
    }
    getClassMap(cell) {
        const date = new CandyDate(cell.value);
        return {
            ...super.getClassMap(cell),
            [`ant-picker-cell-today`]: !!cell.isToday,
            [`ant-picker-cell-in-view`]: date.isSameMonth(this.activeDate)
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DateTableComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: DateTableComponent, isStandalone: true, selector: "date-table", inputs: { format: "format" }, exportAs: ["dateTable"], usesInheritance: true, ngImport: i0, template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DateTableComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'date-table', exportAs: 'dateTable', imports: [NzStringTemplateOutletDirective], template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  @if (headRow && headRow.length > 0) {\n    <thead>\n      <tr role=\"row\">\n        @if (showWeek) {\n          <th role=\"columnheader\"></th>\n        }\n        @for (cell of headRow; track $index) {\n          <th role=\"columnheader\" [title]=\"cell.title\"> {{ cell.content }}</th>\n        }\n      </tr>\n    </thead>\n  }\n\n  <tbody>\n    @for (row of bodyRows; track row.trackByIndex) {\n      <tr [class]=\"row.classMap!\" role=\"row\">\n        @if (row.weekNum) {\n          <td role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\"> {{ row.weekNum }}</td>\n        }\n        @for (cell of row.dateCells; track cell.trackByIndex) {\n          <td\n            [title]=\"cell.title\"\n            role=\"gridcell\"\n            [class]=\"cell.classMap!\"\n            (click)=\"cell.isDisabled ? null : cell.onClick()\"\n            (mouseenter)=\"cell.onMouseEnter()\"\n          >\n            @switch (prefixCls) {\n              @case ('ant-picker') {\n                @if (cell.cellRender) {\n                  <ng-template\n                    [nzStringTemplateOutlet]=\"cell.cellRender\"\n                    [nzStringTemplateOutletContext]=\"{ $implicit: cell.value }\"\n                  >\n                    {{ cell.cellRender }}\n                  </ng-template>\n                } @else {\n                  <div\n                    class=\"{{ prefixCls }}-cell-inner\"\n                    [attr.aria-selected]=\"cell.isSelected\"\n                    [attr.aria-disabled]=\"cell.isDisabled\"\n                  >\n                    {{ cell.content }}\n                  </div>\n                }\n              }\n              @case ('ant-picker-calendar') {\n                <div\n                  class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n                  [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n                >\n                  @if (cell.fullCellRender) {\n                    <ng-container *nzStringTemplateOutlet=\"cell.fullCellRender; context: { $implicit: cell.value }\">\n                      {{ cell.fullCellRender }}\n                    </ng-container>\n                  } @else {\n                    <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                    <div class=\"{{ prefixCls }}-date-content\">\n                      <ng-container *nzStringTemplateOutlet=\"cell.cellRender; context: { $implicit: cell.value }\">\n                        {{ cell.cellRender }}\n                      </ng-container>\n                    </div>\n                  }\n                </div>\n              }\n            }\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
        }], propDecorators: { format: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * A collection module of standard output for all lib components
 */
class LibPackerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: LibPackerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: LibPackerModule, imports: [DateHeaderComponent,
            DateTableComponent,
            DecadeHeaderComponent,
            DecadeTableComponent,
            MonthHeaderComponent,
            MonthTableComponent,
            YearHeaderComponent,
            YearTableComponent,
            QuarterHeaderComponent,
            QuarterTableComponent], exports: [DateHeaderComponent,
            DateTableComponent,
            DecadeHeaderComponent,
            DecadeTableComponent,
            MonthHeaderComponent,
            MonthTableComponent,
            YearHeaderComponent,
            YearTableComponent,
            QuarterHeaderComponent,
            QuarterTableComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: LibPackerModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: LibPackerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        DateHeaderComponent,
                        DateTableComponent,
                        DecadeHeaderComponent,
                        DecadeTableComponent,
                        MonthHeaderComponent,
                        MonthTableComponent,
                        YearHeaderComponent,
                        YearTableComponent,
                        QuarterHeaderComponent,
                        QuarterTableComponent
                    ],
                    exports: [
                        DateHeaderComponent,
                        DateTableComponent,
                        DecadeHeaderComponent,
                        DecadeTableComponent,
                        MonthHeaderComponent,
                        MonthTableComponent,
                        YearHeaderComponent,
                        YearTableComponent,
                        QuarterHeaderComponent,
                        QuarterTableComponent
                    ]
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
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class InnerPopupComponent {
    activeDate;
    endPanelMode;
    panelMode;
    showWeek;
    locale;
    showTimePicker;
    timeOptions;
    disabledDate;
    dateRender;
    selectedValue; // Range ONLY
    hoverValue; // Range ONLY
    value;
    partType;
    format;
    panelChange = new EventEmitter();
    // TODO: name is not proper
    headerChange = new EventEmitter(); // Emitted when user changed the header's value
    selectDate = new EventEmitter(); // Emitted when the date is selected by click the date panel
    selectTime = new EventEmitter();
    cellHover = new EventEmitter(); // Emitted when hover on a day by mouse enter
    prefixCls = PREFIX_CLASS;
    /**
     * Hide "next" arrow in left panel,
     * hide "prev" arrow in right panel
     *
     * @param direction
     * @param panelMode
     */
    enablePrevNext(direction, panelMode) {
        return !(!this.showTimePicker &&
            panelMode === this.endPanelMode &&
            ((this.partType === 'left' && direction === 'next') || (this.partType === 'right' && direction === 'prev')));
    }
    onSelectTime(date) {
        this.selectTime.emit(new CandyDate(date));
    }
    // The value real changed to outside
    onSelectDate(date) {
        const value = date instanceof CandyDate ? date : new CandyDate(date);
        const timeValue = this.timeOptions && this.timeOptions.nzDefaultOpenValue;
        // Display timeValue when value is null
        if (!this.value && timeValue) {
            value.setHms(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
        }
        this.selectDate.emit(value);
    }
    onChooseMonth(value) {
        this.activeDate = this.activeDate.setMonth(value.getMonth());
        if (this.endPanelMode === 'month') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelChange.emit({ mode: this.endPanelMode, date: value.nativeDate });
        }
    }
    onChooseQuarter(value) {
        this.activeDate = this.activeDate.setQuarter(value.getQuarter());
        this.value = value;
        this.selectDate.emit(value);
    }
    onChooseYear(value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'year') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelChange.emit({ mode: this.endPanelMode, date: value.nativeDate });
        }
    }
    onChooseDecade(value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'decade') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelChange.emit({ mode: 'year', date: value.nativeDate });
        }
    }
    ngOnChanges(changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
        // New Antd vesion has merged 'date' ant 'time' to one panel,
        // So there is not 'time' panel
        if (changes.panelMode && changes.panelMode.currentValue === 'time') {
            this.panelMode = 'date';
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: InnerPopupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: InnerPopupComponent, isStandalone: true, selector: "inner-popup", inputs: { activeDate: "activeDate", endPanelMode: "endPanelMode", panelMode: "panelMode", showWeek: ["showWeek", "showWeek", booleanAttribute], locale: "locale", showTimePicker: ["showTimePicker", "showTimePicker", booleanAttribute], timeOptions: "timeOptions", disabledDate: "disabledDate", dateRender: "dateRender", selectedValue: "selectedValue", hoverValue: "hoverValue", value: "value", partType: "partType", format: "format" }, outputs: { panelChange: "panelChange", headerChange: "headerChange", selectDate: "selectDate", selectTime: "selectTime", cellHover: "cellHover" }, exportAs: ["innerPopup"], usesOnChanges: true, ngImport: i0, template: `
    <div [class.ant-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        @switch (panelMode) {
          @case ('decade') {
            <decade-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <decade-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              />
            </div>
          }
          @case ('year') {
            <year-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <year-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseYear($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('month') {
            <month-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <month-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseMonth($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('quarter') {
            <quarter-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <quarter-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseQuarter($event)"
                (cellHover)="cellHover.emit($event)"
                [cellRender]="dateRender"
              />
            </div>
          }
          @default {
            <date-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showSuperNextBtn]="
                panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')
              "
              [showPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showNextBtn]="panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                [canSelectWeek]="panelMode === 'week'"
                [format]="format"
                (valueChange)="onSelectDate($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
        }
      </div>
      @if (showTimePicker && timeOptions) {
        <nz-time-picker-panel
          [nzInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.nzFormat)"
          [nzHourStep]="$any(timeOptions.nzHourStep)"
          [nzMinuteStep]="$any(timeOptions.nzMinuteStep)"
          [nzSecondStep]="$any(timeOptions.nzSecondStep)"
          [nzDisabledHours]="$any(timeOptions.nzDisabledHours)"
          [nzDisabledMinutes]="$any(timeOptions.nzDisabledMinutes)"
          [nzDisabledSeconds]="$any(timeOptions.nzDisabledSeconds)"
          [nzHideDisabledOptions]="!!timeOptions.nzHideDisabledOptions"
          [nzDefaultOpenValue]="$any(timeOptions.nzDefaultOpenValue)"
          [nzUse12Hours]="!!timeOptions.nzUse12Hours"
          [nzAddOn]="$any(timeOptions.nzAddOn)"
        />
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: LibPackerModule }, { kind: "component", type: DateHeaderComponent, selector: "date-header", exportAs: ["dateHeader"] }, { kind: "component", type: DateTableComponent, selector: "date-table", inputs: ["format"], exportAs: ["dateTable"] }, { kind: "component", type: DecadeHeaderComponent, selector: "decade-header", exportAs: ["decadeHeader"] }, { kind: "component", type: DecadeTableComponent, selector: "decade-table", exportAs: ["decadeTable"] }, { kind: "component", type: MonthHeaderComponent, selector: "month-header", exportAs: ["monthHeader"] }, { kind: "component", type: MonthTableComponent, selector: "month-table", exportAs: ["monthTable"] }, { kind: "component", type: YearHeaderComponent, selector: "year-header", exportAs: ["yearHeader"] }, { kind: "component", type: YearTableComponent, selector: "year-table", exportAs: ["yearTable"] }, { kind: "component", type: QuarterHeaderComponent, selector: "quarter-header", exportAs: ["quarterHeader"] }, { kind: "component", type: QuarterTableComponent, selector: "quarter-table", exportAs: ["quarterTable"] }, { kind: "ngmodule", type: NzTimePickerModule }, { kind: "component", type: i11.NzTimePickerPanelComponent, selector: "nz-time-picker-panel", inputs: ["nzInDatePicker", "nzAddOn", "nzHideDisabledOptions", "nzClearText", "nzNowText", "nzOkText", "nzPlaceHolder", "nzUse12Hours", "nzDefaultOpenValue", "nzAllowEmpty", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep"], outputs: ["closePanel"], exportAs: ["nzTimePickerPanel"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: InnerPopupComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'inner-popup',
                    exportAs: 'innerPopup',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div [class.ant-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        @switch (panelMode) {
          @case ('decade') {
            <decade-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <decade-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              />
            </div>
          }
          @case ('year') {
            <year-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <year-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseYear($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('month') {
            <month-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <month-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseMonth($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('quarter') {
            <quarter-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <quarter-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseQuarter($event)"
                (cellHover)="cellHover.emit($event)"
                [cellRender]="dateRender"
              />
            </div>
          }
          @default {
            <date-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showSuperNextBtn]="
                panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')
              "
              [showPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showNextBtn]="panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                [canSelectWeek]="panelMode === 'week'"
                [format]="format"
                (valueChange)="onSelectDate($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
        }
      </div>
      @if (showTimePicker && timeOptions) {
        <nz-time-picker-panel
          [nzInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.nzFormat)"
          [nzHourStep]="$any(timeOptions.nzHourStep)"
          [nzMinuteStep]="$any(timeOptions.nzMinuteStep)"
          [nzSecondStep]="$any(timeOptions.nzSecondStep)"
          [nzDisabledHours]="$any(timeOptions.nzDisabledHours)"
          [nzDisabledMinutes]="$any(timeOptions.nzDisabledMinutes)"
          [nzDisabledSeconds]="$any(timeOptions.nzDisabledSeconds)"
          [nzHideDisabledOptions]="!!timeOptions.nzHideDisabledOptions"
          [nzDefaultOpenValue]="$any(timeOptions.nzDefaultOpenValue)"
          [nzUse12Hours]="!!timeOptions.nzUse12Hours"
          [nzAddOn]="$any(timeOptions.nzAddOn)"
        />
      }
    </div>
  `,
                    imports: [LibPackerModule, NzTimePickerModule, FormsModule]
                }]
        }], propDecorators: { activeDate: [{
                type: Input
            }], endPanelMode: [{
                type: Input
            }], panelMode: [{
                type: Input
            }], showWeek: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], locale: [{
                type: Input
            }], showTimePicker: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], timeOptions: [{
                type: Input
            }], disabledDate: [{
                type: Input
            }], dateRender: [{
                type: Input
            }], selectedValue: [{
                type: Input
            }], hoverValue: [{
                type: Input
            }], value: [{
                type: Input
            }], partType: [{
                type: Input
            }], format: [{
                type: Input
            }], panelChange: [{
                type: Output
            }], headerChange: [{
                type: Output
            }], selectDate: [{
                type: Output
            }], selectTime: [{
                type: Output
            }], cellHover: [{
                type: Output
            }] } });

class DateRangePopupComponent {
    datePickerService;
    cdr;
    host;
    isRange;
    inline = false;
    showWeek;
    locale;
    disabledDate;
    disabledTime; // This will lead to rebuild time options
    showToday;
    showNow;
    showTime;
    extraFooter;
    ranges;
    dateRender;
    panelMode;
    defaultPickerValue;
    dir = 'ltr';
    format;
    panelModeChange = new EventEmitter();
    calendarChange = new EventEmitter();
    resultOk = new EventEmitter(); // Emitted when done with date selecting
    prefixCls = PREFIX_CLASS;
    endPanelMode = 'date';
    timeOptions = null;
    hoverValue = []; // Range ONLY
    checkedPartArr = [false, false];
    destroy$ = new Subject();
    get hasTimePicker() {
        return !!this.showTime;
    }
    get hasFooter() {
        return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
    }
    get arrowPosition() {
        return this.dir === 'rtl'
            ? { right: `${this.datePickerService?.arrowLeft}px` }
            : { left: `${this.datePickerService?.arrowLeft}px` };
    }
    constructor(datePickerService, cdr, host) {
        this.datePickerService = datePickerService;
        this.cdr = cdr;
        this.host = host;
    }
    ngOnInit() {
        merge(this.datePickerService.valueChange$, this.datePickerService.inputPartChange$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateActiveDate();
            this.cdr.markForCheck();
        });
        fromEventOutsideAngular(this.host.nativeElement, 'mousedown')
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => event.preventDefault());
    }
    ngOnChanges(changes) {
        // Parse showTime options
        if (changes.showTime || changes.disabledTime) {
            if (this.showTime) {
                this.buildTimeOptions();
            }
        }
        if (changes.panelMode) {
            this.endPanelMode = this.panelMode;
        }
        if (changes.defaultPickerValue) {
            this.updateActiveDate();
        }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
    updateActiveDate() {
        const activeDate = this.datePickerService.hasValue()
            ? this.datePickerService.value
            : this.datePickerService.makeValue(this.defaultPickerValue);
        this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode));
    }
    onClickOk() {
        const inputIndex = { left: 0, right: 1 }[this.datePickerService.activeInput];
        const value = this.isRange
            ? this.datePickerService.value[inputIndex]
            : this.datePickerService.value;
        this.changeValueFromSelect(value);
        this.resultOk.emit();
    }
    onClickToday(value) {
        this.changeValueFromSelect(value, !this.showTime);
    }
    onCellHover(value) {
        if (!this.isRange) {
            return;
        }
        const otherInputIndex = { left: 1, right: 0 }[this.datePickerService.activeInput];
        const base = this.datePickerService.value[otherInputIndex];
        if (base) {
            if (base.isBeforeDay(value)) {
                this.hoverValue = [base, value];
            }
            else {
                this.hoverValue = [value, base];
            }
        }
    }
    onPanelModeChange(panelChangeEvent, partType) {
        if (this.isRange) {
            const index = this.datePickerService.getActiveIndex(partType);
            if (index === 0) {
                this.panelMode = [panelChangeEvent.mode, this.panelMode[1]];
            }
            else {
                this.panelMode = [this.panelMode[0], panelChangeEvent.mode];
            }
            this.panelModeChange.emit({
                mode: this.panelMode,
                date: this.datePickerService.activeDate.map(d => d.nativeDate)
            });
        }
        else {
            this.panelMode = panelChangeEvent.mode;
            this.panelModeChange.emit({ mode: this.panelMode, date: panelChangeEvent.date });
        }
    }
    onActiveDateChange(value, partType) {
        if (this.isRange) {
            const activeDate = [];
            activeDate[this.datePickerService.getActiveIndex(partType)] = value;
            this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode, partType));
        }
        else {
            this.datePickerService.setActiveDate(value);
        }
    }
    onSelectTime(value, partType) {
        if (this.isRange) {
            const newValue = cloneDate(this.datePickerService.value);
            const index = this.datePickerService.getActiveIndex(partType);
            newValue[index] = this.overrideHms(value, newValue[index]);
            this.datePickerService.setValue(newValue);
        }
        else {
            const newValue = this.overrideHms(value, this.datePickerService.value);
            this.datePickerService.setValue(newValue); // If not select a date currently, use today
        }
        this.datePickerService.inputPartChange$.next(null);
        this.buildTimeOptions();
    }
    changeValueFromSelect(value, emitValue = true) {
        if (this.isRange) {
            const selectedValue = cloneDate(this.datePickerService.value);
            const checkedPart = this.datePickerService.activeInput;
            let nextPart = checkedPart;
            selectedValue[this.datePickerService.getActiveIndex(checkedPart)] = value;
            this.checkedPartArr[this.datePickerService.getActiveIndex(checkedPart)] = true;
            this.hoverValue = selectedValue;
            if (emitValue) {
                if (this.inline) {
                    // For UE, Should always be reversed, and clear vaue when next part is right
                    nextPart = this.reversedPart(checkedPart);
                    if (nextPart === 'right') {
                        selectedValue[this.datePickerService.getActiveIndex(nextPart)] = null;
                        this.checkedPartArr[this.datePickerService.getActiveIndex(nextPart)] = false;
                    }
                    this.datePickerService.setValue(selectedValue);
                    this.calendarChange.emit(selectedValue);
                    if (this.isBothAllowed(selectedValue) && this.checkedPartArr[0] && this.checkedPartArr[1]) {
                        this.clearHoverValue();
                        this.datePickerService.emitValue$.next();
                    }
                }
                else {
                    /**
                     * if sort order is wrong, clear the other part's value
                     */
                    if (wrongSortOrder(selectedValue)) {
                        nextPart = this.reversedPart(checkedPart);
                        selectedValue[this.datePickerService.getActiveIndex(nextPart)] = null;
                        this.checkedPartArr[this.datePickerService.getActiveIndex(nextPart)] = false;
                    }
                    this.datePickerService.setValue(selectedValue);
                    /**
                     * range date usually selected paired,
                     * so we emit the date value only both date is allowed and both part are checked
                     */
                    if (this.isBothAllowed(selectedValue) && this.checkedPartArr[0] && this.checkedPartArr[1]) {
                        this.calendarChange.emit(selectedValue);
                        this.clearHoverValue();
                        this.datePickerService.emitValue$.next();
                    }
                    else if (this.isAllowed(selectedValue)) {
                        nextPart = this.reversedPart(checkedPart);
                        this.calendarChange.emit([value.clone()]);
                    }
                }
            }
            else {
                this.datePickerService.setValue(selectedValue);
            }
            this.datePickerService.inputPartChange$.next(nextPart);
        }
        else {
            this.datePickerService.setValue(value);
            this.datePickerService.inputPartChange$.next(null);
            if (emitValue && this.isAllowed(value)) {
                this.datePickerService.emitValue$.next();
            }
        }
        this.buildTimeOptions();
    }
    reversedPart(part) {
        return part === 'left' ? 'right' : 'left';
    }
    getPanelMode(panelMode, partType) {
        if (this.isRange) {
            return panelMode[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return panelMode;
        }
    }
    // Get single value or part value of a range
    getValue(partType) {
        if (this.isRange) {
            return (this.datePickerService.value || [])[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return this.datePickerService.value;
        }
    }
    getActiveDate(partType) {
        if (this.isRange) {
            return this.datePickerService.activeDate[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return this.datePickerService.activeDate;
        }
    }
    disabledStartTime = (value) => this.disabledTime && this.disabledTime(value, 'start');
    disabledEndTime = (value) => this.disabledTime && this.disabledTime(value, 'end');
    isOneAllowed(selectedValue) {
        const index = this.datePickerService.getActiveIndex();
        const disabledTimeArr = [this.disabledStartTime, this.disabledEndTime];
        return isAllowedDate(selectedValue[index], this.disabledDate, disabledTimeArr[index]);
    }
    isBothAllowed(selectedValue) {
        return (isAllowedDate(selectedValue[0], this.disabledDate, this.disabledStartTime) &&
            isAllowedDate(selectedValue[1], this.disabledDate, this.disabledEndTime));
    }
    isAllowed(value, isBoth = false) {
        if (this.isRange) {
            return isBoth ? this.isBothAllowed(value) : this.isOneAllowed(value);
        }
        else {
            return isAllowedDate(value, this.disabledDate, this.disabledTime);
        }
    }
    getTimeOptions(partType) {
        if (this.showTime && this.timeOptions) {
            return this.timeOptions instanceof Array
                ? this.timeOptions[this.datePickerService.getActiveIndex(partType)]
                : this.timeOptions;
        }
        return null;
    }
    onClickPresetRange(val) {
        const value = typeof val === 'function' ? val() : val;
        if (value) {
            this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
            this.datePickerService.emitValue$.next();
        }
    }
    onPresetRangeMouseLeave() {
        this.clearHoverValue();
    }
    onHoverPresetRange(val) {
        if (typeof val !== 'function') {
            this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
        }
    }
    getObjectKeys(obj) {
        return obj ? Object.keys(obj) : [];
    }
    show(partType) {
        const hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
        return !hide;
    }
    clearHoverValue() {
        this.hoverValue = [];
    }
    buildTimeOptions() {
        if (this.showTime) {
            const showTime = typeof this.showTime === 'object' ? this.showTime : {};
            if (this.isRange) {
                const value = this.datePickerService.value;
                this.timeOptions = [
                    this.overrideTimeOptions(showTime, value[0], 'start'),
                    this.overrideTimeOptions(showTime, value[1], 'end')
                ];
            }
            else {
                this.timeOptions = this.overrideTimeOptions(showTime, this.datePickerService.value);
            }
        }
        else {
            this.timeOptions = null;
        }
    }
    overrideTimeOptions(origin, value, partial) {
        let disabledTimeFn;
        if (partial) {
            disabledTimeFn = partial === 'start' ? this.disabledStartTime : this.disabledEndTime;
        }
        else {
            disabledTimeFn = this.disabledTime;
        }
        return { ...origin, ...getTimeConfig(value, disabledTimeFn) };
    }
    overrideHms(newValue, oldValue) {
        newValue = newValue || new CandyDate();
        oldValue = oldValue || new CandyDate();
        return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DateRangePopupComponent, deps: [{ token: DatePickerService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: DateRangePopupComponent, isStandalone: true, selector: "date-range-popup", inputs: { isRange: ["isRange", "isRange", booleanAttribute], inline: ["inline", "inline", booleanAttribute], showWeek: ["showWeek", "showWeek", booleanAttribute], locale: "locale", disabledDate: "disabledDate", disabledTime: "disabledTime", showToday: ["showToday", "showToday", booleanAttribute], showNow: ["showNow", "showNow", booleanAttribute], showTime: "showTime", extraFooter: "extraFooter", ranges: "ranges", dateRender: "dateRender", panelMode: "panelMode", defaultPickerValue: "defaultPickerValue", dir: "dir", format: "format" }, outputs: { panelModeChange: "panelModeChange", calendarChange: "calendarChange", resultOk: "resultOk" }, exportAs: ["dateRangePopup"], usesOnChanges: true, ngImport: i0, template: `
    @if (isRange) {
      <div class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
        <div class="{{ prefixCls }}-range-arrow" [style]="arrowPosition"></div>
        <div class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }}">
          <div class="{{ prefixCls }}-panels">
            @if (hasTimePicker) {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: datePickerService.activeInput }" />
            } @else {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'left' }" />
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'right' }" />
            }
          </div>
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    } @else {
      <div
        class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
          hasTimePicker ? prefixCls + '-time' : ''
        }} {{ isRange ? prefixCls + '-range' : '' }}"
      >
        <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'" tabindex="-1">
          <!-- Single ONLY -->
          <ng-container *ngTemplateOutlet="tplInnerPopup" />
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    }

    <ng-template #tplInnerPopup let-partType="partType">
      <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'">
        <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->
        <inner-popup
          [showWeek]="showWeek"
          [endPanelMode]="getPanelMode(endPanelMode, partType)"
          [partType]="partType"
          [locale]="locale!"
          [showTimePicker]="hasTimePicker"
          [timeOptions]="getTimeOptions(partType)"
          [panelMode]="getPanelMode(panelMode, partType)"
          (panelChange)="onPanelModeChange($event, partType)"
          [activeDate]="getActiveDate(partType)"
          [value]="getValue(partType)"
          [disabledDate]="disabledDate"
          [dateRender]="dateRender"
          [selectedValue]="$any(datePickerService?.value)"
          [hoverValue]="$any(hoverValue)"
          [format]="format"
          (cellHover)="onCellHover($event)"
          (selectDate)="changeValueFromSelect($event, !showTime)"
          (selectTime)="onSelectTime($event, partType)"
          (headerChange)="onActiveDateChange($event, partType)"
        />
      </div>
    </ng-template>

    <ng-template #tplFooter>
      @if (hasFooter) {
        <calendar-footer
          [locale]="locale!"
          [isRange]="isRange"
          [showToday]="showToday"
          [showNow]="showNow"
          [hasTimePicker]="hasTimePicker"
          [okDisabled]="!isAllowed($any(datePickerService?.value))"
          [extraFooter]="extraFooter"
          [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
          (clickOk)="onClickOk()"
          (clickToday)="onClickToday($event)"
        />
      }
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      @for (name of getObjectKeys(ranges); track name) {
        <li
          class="{{ prefixCls }}-preset"
          (click)="onClickPresetRange(ranges![name])"
          (mouseenter)="onHoverPresetRange(ranges![name])"
          (mouseleave)="onPresetRangeMouseLeave()"
        >
          <span class="ant-tag ant-tag-blue">{{ name }}</span>
        </li>
      }
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "component", type: InnerPopupComponent, selector: "inner-popup", inputs: ["activeDate", "endPanelMode", "panelMode", "showWeek", "locale", "showTimePicker", "timeOptions", "disabledDate", "dateRender", "selectedValue", "hoverValue", "value", "partType", "format"], outputs: ["panelChange", "headerChange", "selectDate", "selectTime", "cellHover"], exportAs: ["innerPopup"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CalendarFooterComponent, selector: "calendar-footer", inputs: ["locale", "showToday", "showNow", "hasTimePicker", "isRange", "okDisabled", "disabledDate", "extraFooter", "rangeQuickSelector"], outputs: ["clickOk", "clickToday"], exportAs: ["calendarFooter"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DateRangePopupComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'date-range-popup',
                    exportAs: 'dateRangePopup',
                    template: `
    @if (isRange) {
      <div class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
        <div class="{{ prefixCls }}-range-arrow" [style]="arrowPosition"></div>
        <div class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }}">
          <div class="{{ prefixCls }}-panels">
            @if (hasTimePicker) {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: datePickerService.activeInput }" />
            } @else {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'left' }" />
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'right' }" />
            }
          </div>
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    } @else {
      <div
        class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
          hasTimePicker ? prefixCls + '-time' : ''
        }} {{ isRange ? prefixCls + '-range' : '' }}"
      >
        <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'" tabindex="-1">
          <!-- Single ONLY -->
          <ng-container *ngTemplateOutlet="tplInnerPopup" />
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    }

    <ng-template #tplInnerPopup let-partType="partType">
      <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'">
        <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->
        <inner-popup
          [showWeek]="showWeek"
          [endPanelMode]="getPanelMode(endPanelMode, partType)"
          [partType]="partType"
          [locale]="locale!"
          [showTimePicker]="hasTimePicker"
          [timeOptions]="getTimeOptions(partType)"
          [panelMode]="getPanelMode(panelMode, partType)"
          (panelChange)="onPanelModeChange($event, partType)"
          [activeDate]="getActiveDate(partType)"
          [value]="getValue(partType)"
          [disabledDate]="disabledDate"
          [dateRender]="dateRender"
          [selectedValue]="$any(datePickerService?.value)"
          [hoverValue]="$any(hoverValue)"
          [format]="format"
          (cellHover)="onCellHover($event)"
          (selectDate)="changeValueFromSelect($event, !showTime)"
          (selectTime)="onSelectTime($event, partType)"
          (headerChange)="onActiveDateChange($event, partType)"
        />
      </div>
    </ng-template>

    <ng-template #tplFooter>
      @if (hasFooter) {
        <calendar-footer
          [locale]="locale!"
          [isRange]="isRange"
          [showToday]="showToday"
          [showNow]="showNow"
          [hasTimePicker]="hasTimePicker"
          [okDisabled]="!isAllowed($any(datePickerService?.value))"
          [extraFooter]="extraFooter"
          [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
          (clickOk)="onClickOk()"
          (clickToday)="onClickToday($event)"
        />
      }
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      @for (name of getObjectKeys(ranges); track name) {
        <li
          class="{{ prefixCls }}-preset"
          (click)="onClickPresetRange(ranges![name])"
          (mouseenter)="onHoverPresetRange(ranges![name])"
          (mouseleave)="onPresetRangeMouseLeave()"
        >
          <span class="ant-tag ant-tag-blue">{{ name }}</span>
        </li>
      }
    </ng-template>
  `,
                    imports: [InnerPopupComponent, NgTemplateOutlet, CalendarFooterComponent]
                }]
        }], ctorParameters: () => [{ type: DatePickerService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { isRange: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], inline: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showWeek: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], locale: [{
                type: Input
            }], disabledDate: [{
                type: Input
            }], disabledTime: [{
                type: Input
            }], showToday: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showNow: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showTime: [{
                type: Input
            }], extraFooter: [{
                type: Input
            }], ranges: [{
                type: Input
            }], dateRender: [{
                type: Input
            }], panelMode: [{
                type: Input
            }], defaultPickerValue: [{
                type: Input
            }], dir: [{
                type: Input
            }], format: [{
                type: Input
            }], panelModeChange: [{
                type: Output
            }], calendarChange: [{
                type: Output
            }], resultOk: [{
                type: Output
            }] } });

const POPUP_STYLE_PATCH = { position: 'relative' }; // Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working because the overlay can't get the height/width of it's content)
const NZ_CONFIG_MODULE_NAME = 'datePicker';
/**
 * The base picker for all common APIs
 */
let NzDatePickerComponent = (() => {
    let _nzSeparator_decorators;
    let _nzSeparator_initializers = [];
    let _nzSeparator_extraInitializers = [];
    let _nzSuffixIcon_decorators;
    let _nzSuffixIcon_initializers = [];
    let _nzSuffixIcon_extraInitializers = [];
    let _nzBackdrop_decorators;
    let _nzBackdrop_initializers = [];
    let _nzBackdrop_extraInitializers = [];
    return class NzDatePickerComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzSeparator_decorators = [WithConfig()];
            _nzSuffixIcon_decorators = [WithConfig()];
            _nzBackdrop_decorators = [WithConfig()];
            __esDecorate(null, null, _nzSeparator_decorators, { kind: "field", name: "nzSeparator", static: false, private: false, access: { has: obj => "nzSeparator" in obj, get: obj => obj.nzSeparator, set: (obj, value) => { obj.nzSeparator = value; } }, metadata: _metadata }, _nzSeparator_initializers, _nzSeparator_extraInitializers);
            __esDecorate(null, null, _nzSuffixIcon_decorators, { kind: "field", name: "nzSuffixIcon", static: false, private: false, access: { has: obj => "nzSuffixIcon" in obj, get: obj => obj.nzSuffixIcon, set: (obj, value) => { obj.nzSuffixIcon = value; } }, metadata: _metadata }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
            __esDecorate(null, null, _nzBackdrop_decorators, { kind: "field", name: "nzBackdrop", static: false, private: false, access: { has: obj => "nzBackdrop" in obj, get: obj => obj.nzBackdrop, set: (obj, value) => { obj.nzBackdrop = value; } }, metadata: _metadata }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        datePickerService;
        i18n;
        cdr;
        renderer;
        elementRef;
        dateHelper;
        nzResizeObserver;
        platform;
        destroy$;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        static ngAcceptInputType_nzShowTime;
        static ngAcceptInputType_nzMode;
        isRange = false; // Indicate whether the value is a range value
        extraFooter;
        dir = 'ltr';
        // status
        statusCls = {};
        status = '';
        hasFeedback = false;
        panelMode = 'date';
        isCustomPlaceHolder = false;
        isCustomFormat = false;
        showTime = false;
        isNzDisableFirstChange = true;
        // --- Common API
        nzAllowClear = true;
        nzAutoFocus = false;
        nzDisabled = false;
        nzBorderless = false;
        nzInputReadOnly = false;
        nzInline = false;
        nzOpen;
        nzDisabledDate;
        nzLocale;
        nzPlaceHolder = '';
        nzPopupStyle = POPUP_STYLE_PATCH;
        nzDropdownClassName;
        nzSize = 'default';
        nzStatus = '';
        nzFormat;
        nzDateRender;
        nzDisabledTime;
        nzRenderExtraFooter;
        nzShowToday = true;
        nzMode = 'date';
        nzShowNow = true;
        nzRanges;
        nzDefaultPickerValue = null;
        nzSeparator = __runInitializers(this, _nzSeparator_initializers, undefined);
        nzSuffixIcon = (__runInitializers(this, _nzSeparator_extraInitializers), __runInitializers(this, _nzSuffixIcon_initializers, 'calendar'));
        nzBackdrop = (__runInitializers(this, _nzSuffixIcon_extraInitializers), __runInitializers(this, _nzBackdrop_initializers, false));
        nzId = (__runInitializers(this, _nzBackdrop_extraInitializers), null);
        nzPlacement = 'bottomLeft';
        nzShowWeekNumber = false;
        nzOnPanelChange = new EventEmitter();
        nzOnCalendarChange = new EventEmitter();
        nzOnOk = new EventEmitter();
        nzOnOpenChange = new EventEmitter();
        get nzShowTime() {
            return this.showTime;
        }
        set nzShowTime(value) {
            this.showTime = typeof value === 'object' ? value : toBoolean(value);
        }
        // ------------------------------------------------------------------------
        // Input API Start
        // ------------------------------------------------------------------------
        cdkConnectedOverlay;
        panel;
        separatorElement;
        pickerInput;
        rangePickerInputs;
        get origin() {
            return this.elementRef;
        }
        inputSize = 12;
        inputWidth;
        prefixCls = PREFIX_CLASS;
        inputValue;
        activeBarStyle = {};
        overlayOpen = false; // Available when "nzOpen" = undefined
        overlayPositions = [...DEFAULT_DATE_PICKER_POSITIONS];
        currentPositionX = 'start';
        currentPositionY = 'bottom';
        get realOpenState() {
            // The value that really decide the open state of overlay
            return this.isOpenHandledByUser() ? !!this.nzOpen : this.overlayOpen;
        }
        finalSize = computed(() => {
            if (this.compactSize) {
                return this.compactSize();
            }
            return this.size();
        });
        size = signal(this.nzSize);
        compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
        document = inject(DOCUMENT);
        ngAfterViewInit() {
            if (this.nzAutoFocus) {
                this.focus();
            }
            if (this.isRange && this.platform.isBrowser) {
                this.nzResizeObserver
                    .observe(this.elementRef)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                    this.updateInputWidthAndArrowLeft();
                });
            }
            this.datePickerService.inputPartChange$.pipe(takeUntil(this.destroy$)).subscribe(partType => {
                if (partType) {
                    this.datePickerService.activeInput = partType;
                }
                this.focus();
                this.updateInputWidthAndArrowLeft();
            });
            if (this.platform.isBrowser) {
                // prevent mousedown event to trigger focusout event when click in date picker
                // see: https://github.com/NG-ZORRO/ng-zorro-antd/issues/7450
                fromEventOutsideAngular(this.elementRef.nativeElement, 'mousedown')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(event => {
                    if (event.target.tagName.toLowerCase() !== 'input') {
                        event.preventDefault();
                    }
                });
            }
        }
        updateInputWidthAndArrowLeft() {
            this.inputWidth = this.rangePickerInputs?.first?.nativeElement.offsetWidth || 0;
            const baseStyle = { position: 'absolute', width: `${this.inputWidth}px` };
            this.datePickerService.arrowLeft =
                this.datePickerService.activeInput === 'left'
                    ? 0
                    : this.inputWidth + this.separatorElement?.nativeElement.offsetWidth || 0;
            if (this.dir === 'rtl') {
                this.activeBarStyle = { ...baseStyle, right: `${this.datePickerService.arrowLeft}px` };
            }
            else {
                this.activeBarStyle = { ...baseStyle, left: `${this.datePickerService.arrowLeft}px` };
            }
            this.cdr.markForCheck();
        }
        getInput(partType) {
            if (this.nzInline) {
                return undefined;
            }
            return this.isRange
                ? partType === 'left'
                    ? this.rangePickerInputs?.first.nativeElement
                    : this.rangePickerInputs?.last.nativeElement
                : this.pickerInput.nativeElement;
        }
        focus() {
            const activeInputElement = this.getInput(this.datePickerService.activeInput);
            if (this.document.activeElement !== activeInputElement) {
                activeInputElement?.focus();
            }
        }
        onFocus(event, partType) {
            event.preventDefault();
            if (partType) {
                this.datePickerService.inputPartChange$.next(partType);
            }
            this.renderClass(true);
        }
        // blur event has not the relatedTarget in IE11, use focusout instead.
        onFocusout(event) {
            event.preventDefault();
            this.onTouchedFn();
            if (!this.elementRef.nativeElement.contains(event.relatedTarget)) {
                this.checkAndClose();
            }
            this.renderClass(false);
        }
        // Show overlay content
        open() {
            if (this.nzInline) {
                return;
            }
            if (!this.realOpenState && !this.nzDisabled) {
                this.updateInputWidthAndArrowLeft();
                this.overlayOpen = true;
                this.nzOnOpenChange.emit(true);
                this.focus();
                this.cdr.markForCheck();
            }
        }
        close() {
            if (this.nzInline) {
                return;
            }
            if (this.realOpenState) {
                this.overlayOpen = false;
                this.nzOnOpenChange.emit(false);
            }
        }
        get showClear() {
            return !this.nzDisabled && !this.isEmptyValue(this.datePickerService.value) && this.nzAllowClear;
        }
        checkAndClose() {
            if (!this.realOpenState) {
                return;
            }
            if (this.panel.isAllowed(this.datePickerService.value, true)) {
                if (Array.isArray(this.datePickerService.value) && wrongSortOrder(this.datePickerService.value)) {
                    const index = this.datePickerService.getActiveIndex();
                    const value = this.datePickerService.value[index];
                    this.panel.changeValueFromSelect(value, true);
                    return;
                }
                this.updateInputValue();
                this.datePickerService.emitValue$.next();
            }
            else {
                this.datePickerService.setValue(this.datePickerService.initialValue);
                this.close();
            }
        }
        onClickInputBox(event) {
            event.stopPropagation();
            this.focus();
            if (!this.isOpenHandledByUser()) {
                this.open();
            }
        }
        onOverlayKeydown(event) {
            if (event.keyCode === ESCAPE) {
                this.datePickerService.initValue();
            }
        }
        // NOTE: A issue here, the first time position change, the animation will not be triggered.
        // Because the overlay's "positionChange" event is emitted after the content's full shown up.
        // All other components like "nz-dropdown" which depends on overlay also has the same issue.
        // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
        onPositionChange(position) {
            this.currentPositionX = position.connectionPair.originX;
            this.currentPositionY = position.connectionPair.originY;
            this.cdr.detectChanges(); // Take side effects to position styles
        }
        onClickClear(event) {
            event.preventDefault();
            event.stopPropagation();
            this.datePickerService.initValue(true);
            this.datePickerService.emitValue$.next();
        }
        updateInputValue() {
            const newValue = this.datePickerService.value;
            if (this.isRange) {
                this.inputValue = newValue ? newValue.map(v => this.formatValue(v)) : ['', ''];
            }
            else {
                this.inputValue = this.formatValue(newValue);
            }
            this.cdr.markForCheck();
        }
        formatValue(value) {
            return this.dateHelper.format(value && value.nativeDate, this.nzFormat);
        }
        onInputChange(value, isEnter = false) {
            /**
             * in IE11 focus/blur will trigger ngModelChange if placeholder changes,
             * so we forbid IE11 to open panel through input change
             */
            if (!this.platform.TRIDENT &&
                this.document.activeElement === this.getInput(this.datePickerService.activeInput) &&
                !this.realOpenState) {
                this.open();
                return;
            }
            const date = this.checkValidDate(value);
            // Can only change date when it's open
            if (date && this.realOpenState) {
                this.panel.changeValueFromSelect(date, isEnter);
            }
        }
        onKeyupEnter(event) {
            this.onInputChange(event.target.value, true);
        }
        checkValidDate(value) {
            const date = new CandyDate(this.dateHelper.parseDate(value, this.nzFormat));
            if (!date.isValid() || value !== this.dateHelper.format(date.nativeDate, this.nzFormat)) {
                return null;
            }
            return date;
        }
        getPlaceholder(partType) {
            return this.isRange
                ? this.nzPlaceHolder[this.datePickerService.getActiveIndex(partType)]
                : this.nzPlaceHolder;
        }
        isEmptyValue(value) {
            if (value === null) {
                return true;
            }
            else if (this.isRange) {
                return !value || !Array.isArray(value) || value.every(val => !val);
            }
            else {
                return !value;
            }
        }
        // Whether open state is permanently controlled by user himself
        isOpenHandledByUser() {
            return this.nzOpen !== undefined;
        }
        noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
        nzFormStatusService = inject(NzFormStatusService, { optional: true });
        nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
        // ------------------------------------------------------------------------
        // Input API End
        // ------------------------------------------------------------------------
        constructor(nzConfigService, datePickerService, i18n, cdr, renderer, elementRef, dateHelper, nzResizeObserver, platform, destroy$, directionality) {
            this.nzConfigService = nzConfigService;
            this.datePickerService = datePickerService;
            this.i18n = i18n;
            this.cdr = cdr;
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.dateHelper = dateHelper;
            this.nzResizeObserver = nzResizeObserver;
            this.platform = platform;
            this.destroy$ = destroy$;
            this.directionality = directionality;
        }
        ngOnInit() {
            this.nzFormStatusService?.formStatusChanges
                .pipe(distinctUntilChanged((pre, cur) => {
                return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
            }), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })), takeUntil(this.destroy$))
                .subscribe(({ status, hasFeedback }) => {
                this.setStatusStyles(status, hasFeedback);
            });
            // Subscribe the every locale change if the nzLocale is not handled by user
            if (!this.nzLocale) {
                this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.setLocale());
            }
            // Default value
            this.datePickerService.isRange = this.isRange;
            this.datePickerService.initValue(true);
            this.datePickerService.emitValue$.pipe(takeUntil(this.destroy$)).subscribe(() => {
                const granularityComparison = this.showTime ? 'second' : 'day';
                const value = this.datePickerService.value;
                const datePickerPreviousValue = this.datePickerService.initialValue;
                // Check if the value has change for a simple datepicker, let us avoid notify the control for nothing
                if (!this.isRange &&
                    value?.isSame(datePickerPreviousValue?.nativeDate, granularityComparison)) {
                    this.onTouchedFn();
                    return this.close();
                }
                // check if the value has change for a range picker, let us avoid notify the control for nothing
                if (this.isRange) {
                    const [previousStartDate, previousEndDate] = datePickerPreviousValue;
                    const [currentStartDate, currentEndDate] = value;
                    if (previousStartDate?.isSame(currentStartDate?.nativeDate, granularityComparison) &&
                        previousEndDate?.isSame(currentEndDate?.nativeDate, granularityComparison)) {
                        this.onTouchedFn();
                        return this.close();
                    }
                }
                this.datePickerService.initialValue = cloneDate(value);
                if (this.isRange) {
                    const vAsRange = value;
                    if (vAsRange.length) {
                        this.onChangeFn([vAsRange[0]?.nativeDate ?? null, vAsRange[1]?.nativeDate ?? null]);
                    }
                    else {
                        this.onChangeFn([]);
                    }
                }
                else {
                    if (value) {
                        this.onChangeFn(value.nativeDate);
                    }
                    else {
                        this.onChangeFn(null);
                    }
                }
                this.onTouchedFn();
                // When value emitted, overlay will be closed
                this.close();
            });
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
            this.inputValue = this.isRange ? ['', ''] : '';
            this.setModeAndFormat();
            this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.updateInputValue();
            });
        }
        ngOnChanges({ nzStatus, nzPlacement, nzPopupStyle, nzPlaceHolder, nzLocale, nzFormat, nzRenderExtraFooter, nzMode, nzSize }) {
            if (nzPopupStyle) {
                // Always assign the popup style patch
                this.nzPopupStyle = this.nzPopupStyle ? { ...this.nzPopupStyle, ...POPUP_STYLE_PATCH } : POPUP_STYLE_PATCH;
            }
            // Mark as customized placeholder by user once nzPlaceHolder assigned at the first time
            if (nzPlaceHolder?.currentValue) {
                this.isCustomPlaceHolder = true;
            }
            if (nzFormat?.currentValue) {
                this.isCustomFormat = true;
                this.updateInputValue();
            }
            if (nzLocale) {
                // The nzLocale is currently handled by user
                this.setDefaultPlaceHolder();
            }
            if (nzRenderExtraFooter) {
                this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter);
            }
            if (nzMode) {
                this.setDefaultPlaceHolder();
                this.setModeAndFormat();
            }
            if (nzStatus) {
                this.setStatusStyles(this.nzStatus, this.hasFeedback);
            }
            if (nzPlacement) {
                this.setPlacement(this.nzPlacement);
            }
            if (nzSize) {
                this.size.set(nzSize.currentValue);
            }
        }
        setModeAndFormat() {
            const inputFormats = {
                year: 'yyyy',
                quarter: 'yyyy-[Q]Q',
                month: 'yyyy-MM',
                week: 'YYYY-ww',
                date: this.nzShowTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
            };
            if (!this.nzMode) {
                this.nzMode = 'date';
            }
            this.panelMode = this.isRange ? [this.nzMode, this.nzMode] : this.nzMode;
            // Default format when it's empty
            if (!this.isCustomFormat) {
                this.nzFormat = inputFormats[this.nzMode];
            }
            this.inputSize = Math.max(10, this.nzFormat.length) + 2;
            this.updateInputValue();
        }
        /**
         * Triggered when overlayOpen changes (different with realOpenState)
         *
         * @param open The overlayOpen in picker component
         */
        onOpenChange(open) {
            this.nzOnOpenChange.emit(open);
        }
        // ------------------------------------------------------------------------
        // | Control value accessor implements
        // ------------------------------------------------------------------------
        // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
        onChangeFn = () => void 0;
        onTouchedFn = () => void 0;
        writeValue(value) {
            this.setValue(value);
            this.cdr.markForCheck();
        }
        registerOnChange(fn) {
            this.onChangeFn = fn;
        }
        registerOnTouched(fn) {
            this.onTouchedFn = fn;
        }
        setDisabledState(isDisabled) {
            this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
            this.cdr.markForCheck();
            this.isNzDisableFirstChange = false;
        }
        // ------------------------------------------------------------------------
        // | Internal methods
        // ------------------------------------------------------------------------
        // Reload locale from i18n with side effects
        setLocale() {
            this.nzLocale = this.i18n.getLocaleData('DatePicker', {});
            this.setDefaultPlaceHolder();
            this.cdr.markForCheck();
        }
        setDefaultPlaceHolder() {
            if (!this.isCustomPlaceHolder && this.nzLocale) {
                const defaultPlaceholder = {
                    year: this.getPropertyOfLocale('yearPlaceholder'),
                    quarter: this.getPropertyOfLocale('quarterPlaceholder'),
                    month: this.getPropertyOfLocale('monthPlaceholder'),
                    week: this.getPropertyOfLocale('weekPlaceholder'),
                    date: this.getPropertyOfLocale('placeholder')
                };
                const defaultRangePlaceholder = {
                    year: this.getPropertyOfLocale('rangeYearPlaceholder'),
                    quarter: this.getPropertyOfLocale('rangeQuarterPlaceholder'),
                    month: this.getPropertyOfLocale('rangeMonthPlaceholder'),
                    week: this.getPropertyOfLocale('rangeWeekPlaceholder'),
                    date: this.getPropertyOfLocale('rangePlaceholder')
                };
                this.nzPlaceHolder = this.isRange
                    ? defaultRangePlaceholder[this.nzMode]
                    : defaultPlaceholder[this.nzMode];
            }
        }
        getPropertyOfLocale(type) {
            return this.nzLocale.lang[type] || this.i18n.getLocaleData(`DatePicker.lang.${type}`);
        }
        // Safe way of setting value with default
        setValue(value) {
            const newValue = this.datePickerService.makeValue(value);
            this.datePickerService.setValue(newValue);
            this.datePickerService.initialValue = cloneDate(newValue);
            this.cdr.detectChanges();
        }
        renderClass(value) {
            // TODO: avoid autoFocus cause change after checked error
            if (value) {
                this.renderer.addClass(this.elementRef.nativeElement, 'ant-picker-focused');
            }
            else {
                this.renderer.removeClass(this.elementRef.nativeElement, 'ant-picker-focused');
            }
        }
        onPanelModeChange(panelChange) {
            this.nzOnPanelChange.emit(panelChange);
        }
        // Emit nzOnCalendarChange when select date by nz-range-picker
        onCalendarChange(value) {
            if (this.isRange && Array.isArray(value)) {
                const rangeValue = value.filter(x => x instanceof CandyDate).map(x => x.nativeDate);
                this.nzOnCalendarChange.emit(rangeValue);
            }
        }
        onResultOk() {
            if (this.isRange) {
                const value = this.datePickerService.value;
                if (value.length) {
                    this.nzOnOk.emit([value[0]?.nativeDate || null, value[1]?.nativeDate || null]);
                }
                else {
                    this.nzOnOk.emit([]);
                }
            }
            else {
                if (this.datePickerService.value) {
                    this.nzOnOk.emit(this.datePickerService.value.nativeDate);
                }
                else {
                    this.nzOnOk.emit(null);
                }
            }
        }
        // status
        setStatusStyles(status, hasFeedback) {
            // set inner status
            this.status = status;
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
        setPlacement(placement) {
            const position = DATE_PICKER_POSITION_MAP[placement];
            this.overlayPositions = [position, ...DEFAULT_DATE_PICKER_POSITIONS];
            this.currentPositionX = position.originX;
            this.currentPositionY = position.originY;
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDatePickerComponent, deps: [{ token: i1$1.NzConfigService }, { token: DatePickerService }, { token: i1.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.DateHelperService }, { token: i4$1.NzResizeObserver }, { token: i5.Platform }, { token: i6.NzDestroyService }, { token: i7.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzDatePickerComponent, isStandalone: true, selector: "nz-date-picker,nz-week-picker,nz-month-picker,nz-quarter-picker,nz-year-picker,nz-range-picker", inputs: { nzAllowClear: ["nzAllowClear", "nzAllowClear", booleanAttribute], nzAutoFocus: ["nzAutoFocus", "nzAutoFocus", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzBorderless: ["nzBorderless", "nzBorderless", booleanAttribute], nzInputReadOnly: ["nzInputReadOnly", "nzInputReadOnly", booleanAttribute], nzInline: ["nzInline", "nzInline", booleanAttribute], nzOpen: ["nzOpen", "nzOpen", booleanAttribute], nzDisabledDate: "nzDisabledDate", nzLocale: "nzLocale", nzPlaceHolder: "nzPlaceHolder", nzPopupStyle: "nzPopupStyle", nzDropdownClassName: "nzDropdownClassName", nzSize: "nzSize", nzStatus: "nzStatus", nzFormat: "nzFormat", nzDateRender: "nzDateRender", nzDisabledTime: "nzDisabledTime", nzRenderExtraFooter: "nzRenderExtraFooter", nzShowToday: ["nzShowToday", "nzShowToday", booleanAttribute], nzMode: "nzMode", nzShowNow: ["nzShowNow", "nzShowNow", booleanAttribute], nzRanges: "nzRanges", nzDefaultPickerValue: "nzDefaultPickerValue", nzSeparator: "nzSeparator", nzSuffixIcon: "nzSuffixIcon", nzBackdrop: "nzBackdrop", nzId: "nzId", nzPlacement: "nzPlacement", nzShowWeekNumber: ["nzShowWeekNumber", "nzShowWeekNumber", booleanAttribute], nzShowTime: "nzShowTime" }, outputs: { nzOnPanelChange: "nzOnPanelChange", nzOnCalendarChange: "nzOnCalendarChange", nzOnOk: "nzOnOk", nzOnOpenChange: "nzOnOpenChange" }, host: { listeners: { "click": "onClickInputBox($event)" }, properties: { "class.ant-picker": "true", "class.ant-picker-range": "isRange", "class.ant-picker-large": "finalSize() === 'large'", "class.ant-picker-small": "finalSize() === 'small'", "class.ant-picker-disabled": "nzDisabled", "class.ant-picker-rtl": "dir === 'rtl'", "class.ant-picker-borderless": "nzBorderless", "class.ant-picker-inline": "nzInline" } }, providers: [
                NzDestroyService,
                DatePickerService,
                { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'picker' },
                {
                    provide: NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: forwardRef(() => NzDatePickerComponent)
                }
            ], viewQueries: [{ propertyName: "cdkConnectedOverlay", first: true, predicate: CdkConnectedOverlay, descendants: true }, { propertyName: "panel", first: true, predicate: DateRangePopupComponent, descendants: true }, { propertyName: "separatorElement", first: true, predicate: ["separatorElement"], descendants: true }, { propertyName: "pickerInput", first: true, predicate: ["pickerInput"], descendants: true }, { propertyName: "rangePickerInputs", predicate: ["rangePickerInput"], descendants: true }], exportAs: ["nzDatePicker"], usesOnChanges: true, hostDirectives: [{ directive: i8.NzSpaceCompactItemDirective }], ngImport: i0, template: `
    @if (!nzInline) {
      @if (!isRange) {
        <div class="{{ prefixCls }}-input">
          <input
            #pickerInput
            [attr.id]="nzId"
            [class.ant-input-disabled]="nzDisabled"
            [disabled]="nzDisabled"
            [readOnly]="nzInputReadOnly"
            [(ngModel)]="inputValue"
            placeholder="{{ getPlaceholder() }}"
            [size]="inputSize"
            autocomplete="off"
            (focus)="onFocus($event)"
            (focusout)="onFocusout($event)"
            (ngModelChange)="onInputChange($event)"
            (keyup.enter)="onKeyupEnter($event)"
          />
          <ng-container *ngTemplateOutlet="tplRightRest" />
        </div>
      } @else {
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }" />
        </div>
        <div #separatorElement class="{{ prefixCls }}-range-separator">
          <span class="{{ prefixCls }}-separator">
            <ng-container *nzStringTemplateOutlet="nzSeparator; let separator">
              @if (nzSeparator) {
                {{ nzSeparator }}
              } @else {
                <nz-icon nzType="swap-right" nzTheme="outline" />
              }
            </ng-container>
          </span>
        </div>
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }" />
        </div>
        <ng-container *ngTemplateOutlet="tplRightRest" />
      }
    } @else {
      <ng-template [ngTemplateOutlet]="inlineMode" />
    }
    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        #rangePickerInput
        [attr.id]="nzId"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        [size]="inputSize"
        autocomplete="off"
        (click)="onClickInputBox($event)"
        (focusout)="onFocusout($event)"
        (focus)="onFocus($event, partType)"
        (keyup.enter)="onKeyupEnter($event)"
        [(ngModel)]="inputValue[datePickerService.getActiveIndex(partType)]"
        (ngModelChange)="onInputChange($event)"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [style]="activeBarStyle"></div>
      @if (showClear) {
        <span class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" />
        </span>
      }

      <span class="{{ prefixCls }}-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status" />
        }
      </span>
    </ng-template>

    <ng-template #inlineMode>
      <div
        class="{{ prefixCls }}-dropdown {{ nzDropdownClassName }}"
        [class.ant-picker-dropdown-rtl]="dir === 'rtl'"
        [class.ant-picker-dropdown-placement-bottomLeft]="currentPositionY === 'bottom' && currentPositionX === 'start'"
        [class.ant-picker-dropdown-placement-topLeft]="currentPositionY === 'top' && currentPositionX === 'start'"
        [class.ant-picker-dropdown-placement-bottomRight]="currentPositionY === 'bottom' && currentPositionX === 'end'"
        [class.ant-picker-dropdown-placement-topRight]="currentPositionY === 'top' && currentPositionX === 'end'"
        [class.ant-picker-dropdown-range]="isRange"
        [class.ant-picker-active-left]="datePickerService.activeInput === 'left'"
        [class.ant-picker-active-right]="datePickerService.activeInput === 'right'"
        [style]="nzPopupStyle"
      >
        <date-range-popup
          [isRange]="isRange"
          [inline]="nzInline"
          [defaultPickerValue]="nzDefaultPickerValue"
          [showWeek]="nzShowWeekNumber || nzMode === 'week'"
          [panelMode]="panelMode"
          (panelModeChange)="onPanelModeChange($event)"
          (calendarChange)="onCalendarChange($event)"
          [locale]="nzLocale?.lang!"
          [showToday]="nzMode === 'date' && nzShowToday && !isRange && !nzShowTime"
          [showNow]="nzMode === 'date' && nzShowNow && !isRange && !!nzShowTime"
          [showTime]="nzShowTime"
          [dateRender]="nzDateRender"
          [disabledDate]="nzDisabledDate"
          [disabledTime]="nzDisabledTime"
          [extraFooter]="extraFooter"
          [ranges]="nzRanges"
          [dir]="dir"
          [format]="nzFormat"
          (resultOk)="onResultOk()"
        />
      </div>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-wrapper'"
      (positionChange)="onPositionChange($event)"
      (detach)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
    >
      <div
        class="ant-picker-wrapper"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation"
        [@slideMotion]="'enter'"
        [style.position]="'relative'"
      >
        <ng-container *ngTemplateOutlet="inlineMode"></ng-container>
      </div>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i9.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i9.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i10.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i11$1.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: NzFormItemFeedbackIconComponent, selector: "nz-form-item-feedback-icon", inputs: ["status"], exportAs: ["nzFormFeedbackIcon"] }, { kind: "component", type: DateRangePopupComponent, selector: "date-range-popup", inputs: ["isRange", "inline", "showWeek", "locale", "disabledDate", "disabledTime", "showToday", "showNow", "showTime", "extraFooter", "ranges", "dateRender", "panelMode", "defaultPickerValue", "dir", "format"], outputs: ["panelModeChange", "calendarChange", "resultOk"], exportAs: ["dateRangePopup"] }, { kind: "directive", type: CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "ngmodule", type: NzOverlayModule }, { kind: "directive", type: i12.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { kind: "directive", type: NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }], animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDatePickerComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-date-picker,nz-week-picker,nz-month-picker,nz-quarter-picker,nz-year-picker,nz-range-picker',
                    exportAs: 'nzDatePicker',
                    template: `
    @if (!nzInline) {
      @if (!isRange) {
        <div class="{{ prefixCls }}-input">
          <input
            #pickerInput
            [attr.id]="nzId"
            [class.ant-input-disabled]="nzDisabled"
            [disabled]="nzDisabled"
            [readOnly]="nzInputReadOnly"
            [(ngModel)]="inputValue"
            placeholder="{{ getPlaceholder() }}"
            [size]="inputSize"
            autocomplete="off"
            (focus)="onFocus($event)"
            (focusout)="onFocusout($event)"
            (ngModelChange)="onInputChange($event)"
            (keyup.enter)="onKeyupEnter($event)"
          />
          <ng-container *ngTemplateOutlet="tplRightRest" />
        </div>
      } @else {
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }" />
        </div>
        <div #separatorElement class="{{ prefixCls }}-range-separator">
          <span class="{{ prefixCls }}-separator">
            <ng-container *nzStringTemplateOutlet="nzSeparator; let separator">
              @if (nzSeparator) {
                {{ nzSeparator }}
              } @else {
                <nz-icon nzType="swap-right" nzTheme="outline" />
              }
            </ng-container>
          </span>
        </div>
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }" />
        </div>
        <ng-container *ngTemplateOutlet="tplRightRest" />
      }
    } @else {
      <ng-template [ngTemplateOutlet]="inlineMode" />
    }
    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        #rangePickerInput
        [attr.id]="nzId"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        [size]="inputSize"
        autocomplete="off"
        (click)="onClickInputBox($event)"
        (focusout)="onFocusout($event)"
        (focus)="onFocus($event, partType)"
        (keyup.enter)="onKeyupEnter($event)"
        [(ngModel)]="inputValue[datePickerService.getActiveIndex(partType)]"
        (ngModelChange)="onInputChange($event)"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [style]="activeBarStyle"></div>
      @if (showClear) {
        <span class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" />
        </span>
      }

      <span class="{{ prefixCls }}-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status" />
        }
      </span>
    </ng-template>

    <ng-template #inlineMode>
      <div
        class="{{ prefixCls }}-dropdown {{ nzDropdownClassName }}"
        [class.ant-picker-dropdown-rtl]="dir === 'rtl'"
        [class.ant-picker-dropdown-placement-bottomLeft]="currentPositionY === 'bottom' && currentPositionX === 'start'"
        [class.ant-picker-dropdown-placement-topLeft]="currentPositionY === 'top' && currentPositionX === 'start'"
        [class.ant-picker-dropdown-placement-bottomRight]="currentPositionY === 'bottom' && currentPositionX === 'end'"
        [class.ant-picker-dropdown-placement-topRight]="currentPositionY === 'top' && currentPositionX === 'end'"
        [class.ant-picker-dropdown-range]="isRange"
        [class.ant-picker-active-left]="datePickerService.activeInput === 'left'"
        [class.ant-picker-active-right]="datePickerService.activeInput === 'right'"
        [style]="nzPopupStyle"
      >
        <date-range-popup
          [isRange]="isRange"
          [inline]="nzInline"
          [defaultPickerValue]="nzDefaultPickerValue"
          [showWeek]="nzShowWeekNumber || nzMode === 'week'"
          [panelMode]="panelMode"
          (panelModeChange)="onPanelModeChange($event)"
          (calendarChange)="onCalendarChange($event)"
          [locale]="nzLocale?.lang!"
          [showToday]="nzMode === 'date' && nzShowToday && !isRange && !nzShowTime"
          [showNow]="nzMode === 'date' && nzShowNow && !isRange && !!nzShowTime"
          [showTime]="nzShowTime"
          [dateRender]="nzDateRender"
          [disabledDate]="nzDisabledDate"
          [disabledTime]="nzDisabledTime"
          [extraFooter]="extraFooter"
          [ranges]="nzRanges"
          [dir]="dir"
          [format]="nzFormat"
          (resultOk)="onResultOk()"
        />
      </div>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-wrapper'"
      (positionChange)="onPositionChange($event)"
      (detach)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
    >
      <div
        class="ant-picker-wrapper"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation"
        [@slideMotion]="'enter'"
        [style.position]="'relative'"
      >
        <ng-container *ngTemplateOutlet="inlineMode"></ng-container>
      </div>
    </ng-template>
  `,
                    host: {
                        '[class.ant-picker]': `true`,
                        '[class.ant-picker-range]': `isRange`,
                        '[class.ant-picker-large]': `finalSize() === 'large'`,
                        '[class.ant-picker-small]': `finalSize() === 'small'`,
                        '[class.ant-picker-disabled]': `nzDisabled`,
                        '[class.ant-picker-rtl]': `dir === 'rtl'`,
                        '[class.ant-picker-borderless]': `nzBorderless`,
                        '[class.ant-picker-inline]': `nzInline`,
                        '(click)': 'onClickInputBox($event)'
                    },
                    hostDirectives: [NzSpaceCompactItemDirective],
                    providers: [
                        NzDestroyService,
                        DatePickerService,
                        { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'picker' },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(() => NzDatePickerComponent)
                        }
                    ],
                    animations: [slideMotion],
                    imports: [
                        FormsModule,
                        NgTemplateOutlet,
                        NzOutletModule,
                        NzIconModule,
                        NzFormItemFeedbackIconComponent,
                        DateRangePopupComponent,
                        CdkConnectedOverlay,
                        NzOverlayModule,
                        NzNoAnimationDirective
                    ]
                }]
        }], ctorParameters: () => [{ type: i1$1.NzConfigService }, { type: DatePickerService }, { type: i1.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.DateHelperService }, { type: i4$1.NzResizeObserver }, { type: i5.Platform }, { type: i6.NzDestroyService }, { type: i7.Directionality }], propDecorators: { nzAllowClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAutoFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzBorderless: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzInputReadOnly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzInline: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzOpen: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabledDate: [{
                type: Input
            }], nzLocale: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzPopupStyle: [{
                type: Input
            }], nzDropdownClassName: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzFormat: [{
                type: Input
            }], nzDateRender: [{
                type: Input
            }], nzDisabledTime: [{
                type: Input
            }], nzRenderExtraFooter: [{
                type: Input
            }], nzShowToday: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzMode: [{
                type: Input
            }], nzShowNow: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzRanges: [{
                type: Input
            }], nzDefaultPickerValue: [{
                type: Input
            }], nzSeparator: [{
                type: Input
            }], nzSuffixIcon: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzId: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzShowWeekNumber: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzOnPanelChange: [{
                type: Output
            }], nzOnCalendarChange: [{
                type: Output
            }], nzOnOk: [{
                type: Output
            }], nzOnOpenChange: [{
                type: Output
            }], nzShowTime: [{
                type: Input
            }], cdkConnectedOverlay: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: false }]
            }], panel: [{
                type: ViewChild,
                args: [DateRangePopupComponent, { static: false }]
            }], separatorElement: [{
                type: ViewChild,
                args: ['separatorElement', { static: false }]
            }], pickerInput: [{
                type: ViewChild,
                args: ['pickerInput', { static: false }]
            }], rangePickerInputs: [{
                type: ViewChildren,
                args: ['rangePickerInput']
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzMonthPickerComponent {
    datePicker = inject(NzDatePickerComponent, { host: true });
    constructor() {
        this.datePicker.nzMode = 'month';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzMonthPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzMonthPickerComponent, isStandalone: true, selector: "nz-month-picker", exportAs: ["nzMonthPicker"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzMonthPickerComponent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-month-picker',
                    exportAs: 'nzMonthPicker'
                }]
        }], ctorParameters: () => [] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzQuarterPickerComponent {
    datePicker = inject(NzDatePickerComponent, { host: true });
    constructor() {
        this.datePicker.nzMode = 'quarter';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzQuarterPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzQuarterPickerComponent, isStandalone: true, selector: "nz-quarter-picker", exportAs: ["nzQuarterPicker"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzQuarterPickerComponent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-quarter-picker',
                    exportAs: 'nzQuarterPicker'
                }]
        }], ctorParameters: () => [] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRangePickerComponent {
    datePicker = inject(NzDatePickerComponent, { host: true });
    constructor() {
        this.datePicker.isRange = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRangePickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzRangePickerComponent, isStandalone: true, selector: "nz-range-picker", exportAs: ["nzRangePicker"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRangePickerComponent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-range-picker',
                    exportAs: 'nzRangePicker'
                }]
        }], ctorParameters: () => [] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzWeekPickerComponent {
    datePicker = inject(NzDatePickerComponent, { host: true });
    constructor() {
        this.datePicker.nzMode = 'week';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWeekPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzWeekPickerComponent, isStandalone: true, selector: "nz-week-picker", exportAs: ["nzWeekPicker"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWeekPickerComponent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-week-picker',
                    exportAs: 'nzWeekPicker'
                }]
        }], ctorParameters: () => [] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzYearPickerComponent {
    datePicker = inject(NzDatePickerComponent, { host: true });
    constructor() {
        this.datePicker.nzMode = 'year';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzYearPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzYearPickerComponent, isStandalone: true, selector: "nz-year-picker", exportAs: ["nzYearPicker"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzYearPickerComponent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-year-picker',
                    exportAs: 'nzYearPicker'
                }]
        }], ctorParameters: () => [] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDatePickerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDatePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzDatePickerModule, imports: [NzDatePickerComponent,
            NzMonthPickerComponent,
            NzYearPickerComponent,
            NzWeekPickerComponent,
            NzRangePickerComponent,
            CalendarFooterComponent,
            InnerPopupComponent,
            DateRangePopupComponent,
            NzQuarterPickerComponent], exports: [NzDatePickerComponent,
            NzRangePickerComponent,
            NzMonthPickerComponent,
            NzYearPickerComponent,
            NzWeekPickerComponent,
            NzQuarterPickerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDatePickerModule, imports: [NzDatePickerComponent,
            CalendarFooterComponent,
            InnerPopupComponent,
            DateRangePopupComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDatePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzDatePickerComponent,
                        NzMonthPickerComponent,
                        NzYearPickerComponent,
                        NzWeekPickerComponent,
                        NzRangePickerComponent,
                        CalendarFooterComponent,
                        InnerPopupComponent,
                        DateRangePopupComponent,
                        NzQuarterPickerComponent
                    ],
                    exports: [
                        NzDatePickerComponent,
                        NzRangePickerComponent,
                        NzMonthPickerComponent,
                        NzYearPickerComponent,
                        NzWeekPickerComponent,
                        NzQuarterPickerComponent
                    ]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LibPackerModule, NzDatePickerComponent, NzDatePickerModule, NzMonthPickerComponent, NzQuarterPickerComponent, NzRangePickerComponent, NzWeekPickerComponent, NzYearPickerComponent, PREFIX_CLASS, getTimeConfig, isAllowedDate, isTimeValid, isTimeValidByConfig, transCompatFormat, AbstractPanelHeader as ɵAbstractPanelHeader, AbstractTable as ɵAbstractTable, CalendarFooterComponent as ɵCalendarFooterComponent, DateHeaderComponent as ɵDateHeaderComponent, DatePickerService as ɵDatePickerService, DateRangePopupComponent as ɵDateRangePopupComponent, DateTableComponent as ɵDateTableComponent, DecadeHeaderComponent as ɵDecadeHeaderComponent, DecadeTableComponent as ɵDecadeTableComponent, InnerPopupComponent as ɵInnerPopupComponent, MonthHeaderComponent as ɵMonthHeaderComponent, MonthTableComponent as ɵMonthTableComponent, QuarterHeaderComponent as ɵQuarterHeaderComponent, QuarterTableComponent as ɵQuarterTableComponent, YearHeaderComponent as ɵYearHeaderComponent, YearTableComponent as ɵYearTableComponent };
//# sourceMappingURL=ng-zorro-antd-date-picker.mjs.map
