import * as i0 from '@angular/core';
import { Directive, EventEmitter, booleanAttribute, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, TemplateRef, forwardRef, ContentChild, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';
import * as i4 from 'ng-zorro-antd/radio';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import * as i2 from 'ng-zorro-antd/select';
import { NzSelectModule } from 'ng-zorro-antd/select';
import * as i1 from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i2$1 from 'ng-zorro-antd/date-picker';
import { LibPackerModule } from 'ng-zorro-antd/date-picker';
import * as i1$1 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDateCellDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDateCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzDateCellDirective, isStandalone: true, selector: "[nzDateCell]", exportAs: ["nzDateCell"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDateCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzDateCell]',
                    exportAs: 'nzDateCell'
                }]
        }] });
class NzMonthCellDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzMonthCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzMonthCellDirective, isStandalone: true, selector: "[nzMonthCell]", exportAs: ["nzMonthCell"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzMonthCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzMonthCell]',
                    exportAs: 'nzMonthCell'
                }]
        }] });
class NzDateFullCellDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDateFullCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzDateFullCellDirective, isStandalone: true, selector: "[nzDateFullCell]", exportAs: ["nzDateFullCell"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDateFullCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzDateFullCell]',
                    exportAs: 'nzDateFullCell'
                }]
        }] });
class NzMonthFullCellDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzMonthFullCellDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzMonthFullCellDirective, isStandalone: true, selector: "[nzMonthFullCell]", exportAs: ["nzMonthFullCell"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzMonthFullCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzMonthFullCell]',
                    exportAs: 'nzMonthFullCell'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCalendarHeaderComponent {
    i18n;
    dateHelper;
    mode = 'month';
    fullscreen = true;
    activeDate = new CandyDate();
    nzCustomHeader;
    modeChange = new EventEmitter();
    yearChange = new EventEmitter();
    monthChange = new EventEmitter();
    // @Output() readonly valueChange: EventEmitter<CandyDate> = new EventEmitter();
    yearOffset = 10;
    yearTotal = 20;
    years = [];
    months = [];
    get activeYear() {
        return this.activeDate.getYear();
    }
    get activeMonth() {
        return this.activeDate.getMonth();
    }
    get size() {
        return this.fullscreen ? 'default' : 'small';
    }
    get yearTypeText() {
        return this.i18n.getLocale().Calendar.lang.year;
    }
    get monthTypeText() {
        return this.i18n.getLocale().Calendar.lang.month;
    }
    constructor(i18n, dateHelper) {
        this.i18n = i18n;
        this.dateHelper = dateHelper;
    }
    ngOnInit() {
        this.setUpYears();
        this.setUpMonths();
    }
    ngOnChanges(changes) {
        if (changes['activeDate']) {
            const previousActiveDate = changes['activeDate'].previousValue;
            const currentActiveDate = changes['activeDate'].currentValue;
            if (previousActiveDate?.getYear() !== currentActiveDate?.getYear()) {
                this.setUpYears();
            }
        }
    }
    updateYear(year) {
        this.yearChange.emit(year);
        this.setUpYears(year);
    }
    setUpYears(year) {
        const start = (year || this.activeYear) - this.yearOffset;
        const end = start + this.yearTotal;
        this.years = [];
        for (let i = start; i < end; i++) {
            this.years.push({ label: `${i}`, value: i });
        }
    }
    setUpMonths() {
        this.months = [];
        for (let i = 0; i < 12; i++) {
            const dateInMonth = this.activeDate.setMonth(i);
            const monthText = this.dateHelper.format(dateInMonth.nativeDate, 'MMM');
            this.months.push({ label: monthText, value: i });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarHeaderComponent, deps: [{ token: i1.NzI18nService }, { token: i1.DateHelperService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzCalendarHeaderComponent, isStandalone: true, selector: "nz-calendar-header", inputs: { mode: "mode", fullscreen: ["fullscreen", "fullscreen", booleanAttribute], activeDate: "activeDate", nzCustomHeader: "nzCustomHeader" }, outputs: { modeChange: "modeChange", yearChange: "yearChange", monthChange: "monthChange" }, host: { properties: { "style.display": "'block'" }, classAttribute: "ant-fullcalendar-header" }, exportAs: ["nzCalendarHeader"], usesOnChanges: true, ngImport: i0, template: `
    @if (nzCustomHeader) {
      <ng-container *nzStringTemplateOutlet="nzCustomHeader">{{ nzCustomHeader }}</ng-container>
    } @else {
      <div class="ant-picker-calendar-header">
        <nz-select
          class="ant-picker-calendar-year-select"
          [nzSize]="size"
          [nzDropdownMatchSelectWidth]="false"
          [ngModel]="activeYear"
          (ngModelChange)="updateYear($event)"
        >
          @for (year of years; track year.value) {
            <nz-option [nzLabel]="year.label" [nzValue]="year.value" />
          }
        </nz-select>

        @if (mode === 'month') {
          <nz-select
            class="ant-picker-calendar-month-select"
            [nzSize]="size"
            [nzDropdownMatchSelectWidth]="false"
            [ngModel]="activeMonth"
            (ngModelChange)="monthChange.emit($event)"
          >
            @for (month of months; track month.value) {
              <nz-option [nzLabel]="month.label" [nzValue]="month.value" />
            }
          </nz-select>
        }

        <nz-radio-group
          class="ant-picker-calendar-mode-switch"
          [(ngModel)]="mode"
          (ngModelChange)="modeChange.emit($event)"
          [nzSize]="size"
        >
          <label nz-radio-button nzValue="month">{{ monthTypeText }}</label>
          <label nz-radio-button nzValue="year">{{ yearTypeText }}</label>
        </nz-radio-group>
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzSelectModule }, { kind: "component", type: i2.NzOptionComponent, selector: "nz-option", inputs: ["nzTitle", "nzLabel", "nzValue", "nzKey", "nzDisabled", "nzHide", "nzCustomContent"], exportAs: ["nzOption"] }, { kind: "component", type: i2.NzSelectComponent, selector: "nz-select", inputs: ["nzId", "nzSize", "nzStatus", "nzOptionHeightPx", "nzOptionOverflowSize", "nzDropdownClassName", "nzDropdownMatchSelectWidth", "nzDropdownStyle", "nzNotFoundContent", "nzPlaceHolder", "nzPlacement", "nzMaxTagCount", "nzDropdownRender", "nzCustomTemplate", "nzSuffixIcon", "nzClearIcon", "nzRemoveIcon", "nzMenuItemSelectedIcon", "nzTokenSeparators", "nzMaxTagPlaceholder", "nzMaxMultipleCount", "nzMode", "nzFilterOption", "compareWith", "nzAllowClear", "nzBorderless", "nzShowSearch", "nzLoading", "nzAutoFocus", "nzAutoClearSearchValue", "nzServerSearch", "nzDisabled", "nzOpen", "nzSelectOnTab", "nzBackdrop", "nzOptions", "nzShowArrow"], outputs: ["nzOnSearch", "nzScrollToBottom", "nzOpenChange", "nzBlur", "nzFocus"], exportAs: ["nzSelect"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: NzRadioModule }, { kind: "component", type: i4.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus", "nz-radio-button"], exportAs: ["nzRadio"] }, { kind: "component", type: i4.NzRadioGroupComponent, selector: "nz-radio-group", inputs: ["nzDisabled", "nzButtonStyle", "nzSize", "nzName"], exportAs: ["nzRadioGroup"] }, { kind: "directive", type: NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-calendar-header',
                    exportAs: 'nzCalendarHeader',
                    template: `
    @if (nzCustomHeader) {
      <ng-container *nzStringTemplateOutlet="nzCustomHeader">{{ nzCustomHeader }}</ng-container>
    } @else {
      <div class="ant-picker-calendar-header">
        <nz-select
          class="ant-picker-calendar-year-select"
          [nzSize]="size"
          [nzDropdownMatchSelectWidth]="false"
          [ngModel]="activeYear"
          (ngModelChange)="updateYear($event)"
        >
          @for (year of years; track year.value) {
            <nz-option [nzLabel]="year.label" [nzValue]="year.value" />
          }
        </nz-select>

        @if (mode === 'month') {
          <nz-select
            class="ant-picker-calendar-month-select"
            [nzSize]="size"
            [nzDropdownMatchSelectWidth]="false"
            [ngModel]="activeMonth"
            (ngModelChange)="monthChange.emit($event)"
          >
            @for (month of months; track month.value) {
              <nz-option [nzLabel]="month.label" [nzValue]="month.value" />
            }
          </nz-select>
        }

        <nz-radio-group
          class="ant-picker-calendar-mode-switch"
          [(ngModel)]="mode"
          (ngModelChange)="modeChange.emit($event)"
          [nzSize]="size"
        >
          <label nz-radio-button nzValue="month">{{ monthTypeText }}</label>
          <label nz-radio-button nzValue="year">{{ yearTypeText }}</label>
        </nz-radio-group>
      </div>
    }
  `,
                    host: {
                        class: 'ant-fullcalendar-header',
                        '[style.display]': `'block'`
                    },
                    imports: [NzSelectModule, FormsModule, NzRadioModule, NzStringTemplateOutletDirective]
                }]
        }], ctorParameters: () => [{ type: i1.NzI18nService }, { type: i1.DateHelperService }], propDecorators: { mode: [{
                type: Input
            }], fullscreen: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], activeDate: [{
                type: Input
            }], nzCustomHeader: [{
                type: Input
            }], modeChange: [{
                type: Output
            }], yearChange: [{
                type: Output
            }], monthChange: [{
                type: Output
            }] } });

class NzCalendarComponent {
    cdr;
    directionality;
    activeDate = new CandyDate();
    prefixCls = 'ant-picker-calendar';
    destroy$ = new Subject();
    dir = 'ltr';
    onChangeFn = () => { };
    onTouchFn = () => { };
    nzMode = 'month';
    nzValue;
    nzDisabledDate;
    nzModeChange = new EventEmitter();
    nzPanelChange = new EventEmitter();
    nzSelectChange = new EventEmitter();
    nzValueChange = new EventEmitter();
    /**
     * Cannot use @Input and @ContentChild on one variable
     * because { static: false } will make @Input property get delayed
     **/
    nzDateCell;
    nzDateCellChild;
    get dateCell() {
        return (this.nzDateCell || this.nzDateCellChild);
    }
    nzDateFullCell;
    nzDateFullCellChild;
    get dateFullCell() {
        return (this.nzDateFullCell || this.nzDateFullCellChild);
    }
    nzMonthCell;
    nzMonthCellChild;
    get monthCell() {
        return (this.nzMonthCell || this.nzMonthCellChild);
    }
    nzMonthFullCell;
    nzMonthFullCellChild;
    get monthFullCell() {
        return (this.nzMonthFullCell || this.nzMonthFullCellChild);
    }
    nzCustomHeader;
    nzFullscreen = true;
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.dir = this.directionality.value;
        });
    }
    onModeChange(mode) {
        this.nzModeChange.emit(mode);
        this.nzPanelChange.emit({ date: this.activeDate.nativeDate, mode });
    }
    onYearSelect(year) {
        const date = this.activeDate.setYear(year);
        this.updateDate(date);
    }
    onMonthSelect(month) {
        const date = this.activeDate.setMonth(month);
        this.updateDate(date);
    }
    onDateSelect(date) {
        // Only activeDate is enough in calendar
        // this.value = date;
        this.updateDate(date);
    }
    writeValue(value) {
        this.updateDate(new CandyDate(value), false);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    updateDate(date, touched = true) {
        this.activeDate = date;
        if (touched) {
            this.onChangeFn(date.nativeDate);
            this.onTouchFn();
            this.nzSelectChange.emit(date.nativeDate);
            this.nzValueChange.emit(date.nativeDate);
        }
    }
    ngOnChanges(changes) {
        if (changes.nzValue) {
            this.updateDate(new CandyDate(this.nzValue), false);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.Directionality }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzCalendarComponent, isStandalone: true, selector: "nz-calendar", inputs: { nzMode: "nzMode", nzValue: "nzValue", nzDisabledDate: "nzDisabledDate", nzDateCell: "nzDateCell", nzDateFullCell: "nzDateFullCell", nzMonthCell: "nzMonthCell", nzMonthFullCell: "nzMonthFullCell", nzCustomHeader: "nzCustomHeader", nzFullscreen: ["nzFullscreen", "nzFullscreen", booleanAttribute] }, outputs: { nzModeChange: "nzModeChange", nzPanelChange: "nzPanelChange", nzSelectChange: "nzSelectChange", nzValueChange: "nzValueChange" }, host: { properties: { "class.ant-picker-calendar-full": "nzFullscreen", "class.ant-picker-calendar-mini": "!nzFullscreen", "class.ant-picker-calendar-rtl": "dir === 'rtl'" }, classAttribute: "ant-picker-calendar" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }], queries: [{ propertyName: "nzDateCellChild", first: true, predicate: NzDateCellDirective, descendants: true, read: TemplateRef }, { propertyName: "nzDateFullCellChild", first: true, predicate: NzDateFullCellDirective, descendants: true, read: TemplateRef }, { propertyName: "nzMonthCellChild", first: true, predicate: NzMonthCellDirective, descendants: true, read: TemplateRef }, { propertyName: "nzMonthFullCellChild", first: true, predicate: NzMonthFullCellDirective, descendants: true, read: TemplateRef }], exportAs: ["nzCalendar"], usesOnChanges: true, ngImport: i0, template: `
    <nz-calendar-header
      [fullscreen]="nzFullscreen"
      [activeDate]="activeDate"
      [nzCustomHeader]="nzCustomHeader"
      [(mode)]="nzMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    ></nz-calendar-header>

    <div class="ant-picker-panel">
      <div class="ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="ant-picker-body">
          @if (nzMode === 'month') {
            <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
            <date-table
              [prefixCls]="prefixCls"
              [value]="activeDate"
              [activeDate]="activeDate"
              [cellRender]="$any(dateCell)"
              [fullCellRender]="$any(dateFullCell)"
              [disabledDate]="nzDisabledDate"
              (valueChange)="onDateSelect($event)"
            ></date-table>
          } @else {
            <month-table
              [prefixCls]="prefixCls"
              [value]="activeDate"
              [activeDate]="activeDate"
              [cellRender]="$any(monthCell)"
              [fullCellRender]="$any(monthFullCell)"
              (valueChange)="onDateSelect($event)"
            ></month-table>
          }
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "component", type: NzCalendarHeaderComponent, selector: "nz-calendar-header", inputs: ["mode", "fullscreen", "activeDate", "nzCustomHeader"], outputs: ["modeChange", "yearChange", "monthChange"], exportAs: ["nzCalendarHeader"] }, { kind: "ngmodule", type: LibPackerModule }, { kind: "component", type: i2$1.ɵDateTableComponent, selector: "date-table", inputs: ["format"], exportAs: ["dateTable"] }, { kind: "component", type: i2$1.ɵMonthTableComponent, selector: "month-table", exportAs: ["monthTable"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-calendar',
                    exportAs: 'nzCalendar',
                    template: `
    <nz-calendar-header
      [fullscreen]="nzFullscreen"
      [activeDate]="activeDate"
      [nzCustomHeader]="nzCustomHeader"
      [(mode)]="nzMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    ></nz-calendar-header>

    <div class="ant-picker-panel">
      <div class="ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="ant-picker-body">
          @if (nzMode === 'month') {
            <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
            <date-table
              [prefixCls]="prefixCls"
              [value]="activeDate"
              [activeDate]="activeDate"
              [cellRender]="$any(dateCell)"
              [fullCellRender]="$any(dateFullCell)"
              [disabledDate]="nzDisabledDate"
              (valueChange)="onDateSelect($event)"
            ></date-table>
          } @else {
            <month-table
              [prefixCls]="prefixCls"
              [value]="activeDate"
              [activeDate]="activeDate"
              [cellRender]="$any(monthCell)"
              [fullCellRender]="$any(monthFullCell)"
              (valueChange)="onDateSelect($event)"
            ></month-table>
          }
        </div>
      </div>
    </div>
  `,
                    host: {
                        class: 'ant-picker-calendar',
                        '[class.ant-picker-calendar-full]': 'nzFullscreen',
                        '[class.ant-picker-calendar-mini]': '!nzFullscreen',
                        '[class.ant-picker-calendar-rtl]': `dir === 'rtl'`
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }],
                    imports: [NzCalendarHeaderComponent, LibPackerModule]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1$1.Directionality }], propDecorators: { nzMode: [{
                type: Input
            }], nzValue: [{
                type: Input
            }], nzDisabledDate: [{
                type: Input
            }], nzModeChange: [{
                type: Output
            }], nzPanelChange: [{
                type: Output
            }], nzSelectChange: [{
                type: Output
            }], nzValueChange: [{
                type: Output
            }], nzDateCell: [{
                type: Input
            }], nzDateCellChild: [{
                type: ContentChild,
                args: [NzDateCellDirective, { static: false, read: TemplateRef }]
            }], nzDateFullCell: [{
                type: Input
            }], nzDateFullCellChild: [{
                type: ContentChild,
                args: [NzDateFullCellDirective, { static: false, read: TemplateRef }]
            }], nzMonthCell: [{
                type: Input
            }], nzMonthCellChild: [{
                type: ContentChild,
                args: [NzMonthCellDirective, { static: false, read: TemplateRef }]
            }], nzMonthFullCell: [{
                type: Input
            }], nzMonthFullCellChild: [{
                type: ContentChild,
                args: [NzMonthFullCellDirective, { static: false, read: TemplateRef }]
            }], nzCustomHeader: [{
                type: Input
            }], nzFullscreen: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCalendarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarModule, imports: [NzCalendarHeaderComponent,
            NzCalendarComponent,
            NzDateCellDirective,
            NzDateFullCellDirective,
            NzMonthCellDirective,
            NzMonthFullCellDirective], exports: [NzCalendarComponent,
            NzDateCellDirective,
            NzDateFullCellDirective,
            NzMonthCellDirective,
            NzMonthFullCellDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarModule, imports: [NzCalendarHeaderComponent,
            NzCalendarComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzCalendarHeaderComponent,
                        NzCalendarComponent,
                        NzDateCellDirective,
                        NzDateFullCellDirective,
                        NzMonthCellDirective,
                        NzMonthFullCellDirective
                    ],
                    exports: [
                        NzCalendarComponent,
                        NzDateCellDirective,
                        NzDateFullCellDirective,
                        NzMonthCellDirective,
                        NzMonthFullCellDirective
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

export { NzCalendarComponent, NzCalendarHeaderComponent, NzCalendarModule, NzDateCellDirective, NzDateFullCellDirective, NzMonthCellDirective, NzMonthFullCellDirective };
//# sourceMappingURL=ng-zorro-antd-calendar.mjs.map
