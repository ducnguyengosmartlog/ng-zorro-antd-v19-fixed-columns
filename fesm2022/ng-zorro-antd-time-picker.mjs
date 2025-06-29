import { __esDecorate, __runInitializers } from 'tslib';
import * as i10 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i3$1 from '@angular/cdk/platform';
import { _getEventTarget } from '@angular/cdk/platform';
import { DecimalPipe, NgTemplateOutlet, AsyncPipe } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, numberAttribute, booleanAttribute, Input, Output, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, Component, inject, computed, signal, NgModule } from '@angular/core';
import * as i6 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { takeUntil, distinctUntilChanged, withLatestFrom, map } from 'rxjs/operators';
import { isValid } from 'date-fns';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormStatusService, NzFormNoStatusService, NzFormItemFeedbackIconComponent } from 'ng-zorro-antd/core/form';
import { warn } from 'ng-zorro-antd/core/logger';
import * as i7 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i9 from 'ng-zorro-antd/core/overlay';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { isNotNil, isNil, fromEventOutsideAngular, getStatusClassNames } from 'ng-zorro-antd/core/util';
import * as i8 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i5 from 'ng-zorro-antd/space';
import { NZ_SPACE_COMPACT_SIZE, NZ_SPACE_COMPACT_ITEM_TYPE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';
import * as i2$1 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import * as i2 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i3 from 'ng-zorro-antd/core/transition-patch';
import * as i4 from 'ng-zorro-antd/core/wave';
import * as i4$1 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class TimeHolder {
    selected12Hours = undefined;
    _value;
    _use12Hours = false;
    _defaultOpenValue;
    _changes = new Subject();
    setMinutes(value, disabled) {
        if (!disabled) {
            this.initValue();
            this.value.setMinutes(value);
            this.update();
        }
        return this;
    }
    setHours(value, disabled) {
        if (!disabled) {
            this.initValue();
            if (this._use12Hours) {
                if (this.selected12Hours === 'PM' && value !== 12) {
                    this.value.setHours(value + 12);
                }
                else if (this.selected12Hours === 'AM' && value === 12) {
                    this.value.setHours(0);
                }
                else {
                    this.value.setHours(value);
                }
            }
            else {
                this.value.setHours(value);
            }
            this.update();
        }
        return this;
    }
    setSeconds(value, disabled) {
        if (!disabled) {
            this.initValue();
            this.value.setSeconds(value);
            this.update();
        }
        return this;
    }
    setUse12Hours(value) {
        this._use12Hours = value;
        return this;
    }
    get changes() {
        return this._changes.asObservable();
    }
    setValue(value, use12Hours) {
        if (isNotNil(use12Hours)) {
            this._use12Hours = use12Hours;
        }
        if (value !== this.value) {
            this._value = value;
            if (isNotNil(this.value)) {
                if (this._use12Hours && isNotNil(this.hours)) {
                    this.selected12Hours = this.hours >= 12 ? 'PM' : 'AM';
                }
            }
            else {
                this._clear();
            }
        }
        return this;
    }
    initValue() {
        if (isNil(this.value)) {
            this.setValue(new Date(), this._use12Hours);
        }
    }
    clear() {
        this._clear();
        this.update();
    }
    get isEmpty() {
        return !(isNotNil(this.hours) || isNotNil(this.minutes) || isNotNil(this.seconds));
    }
    _clear() {
        this._value = undefined;
        this.selected12Hours = undefined;
    }
    update() {
        if (this.isEmpty) {
            this._value = undefined;
        }
        else {
            if (isNotNil(this.hours)) {
                this.value.setHours(this.hours);
            }
            if (isNotNil(this.minutes)) {
                this.value.setMinutes(this.minutes);
            }
            if (isNotNil(this.seconds)) {
                this.value.setSeconds(this.seconds);
            }
            if (this._use12Hours) {
                if (this.selected12Hours === 'PM' && this.hours < 12) {
                    this.value.setHours(this.hours + 12);
                }
                if (this.selected12Hours === 'AM' && this.hours >= 12) {
                    this.value.setHours(this.hours - 12);
                }
            }
        }
        this.changed();
    }
    changed() {
        this._changes.next(this.value);
    }
    /**
     * @description
     * UI view hours
     * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
     */
    get viewHours() {
        return this._use12Hours && isNotNil(this.hours) ? this.calculateViewHour(this.hours) : this.hours;
    }
    setSelected12Hours(value) {
        if (value.toUpperCase() !== this.selected12Hours) {
            this.selected12Hours = value.toUpperCase();
            this.update();
        }
    }
    get value() {
        return this._value || this._defaultOpenValue;
    }
    get hours() {
        return this.value?.getHours();
    }
    get minutes() {
        return this.value?.getMinutes();
    }
    get seconds() {
        return this.value?.getSeconds();
    }
    setDefaultOpenValue(value) {
        this._defaultOpenValue = value;
        return this;
    }
    calculateViewHour(value) {
        const selected12Hours = this.selected12Hours;
        if (selected12Hours === 'PM' && value > 12) {
            return value - 12;
        }
        if (selected12Hours === 'AM' && value === 0) {
            return 12;
        }
        return value;
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function makeRange(length, step = 1, start = 0) {
    return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}
class NzTimePickerPanelComponent {
    ngZone;
    cdr;
    dateHelper;
    elementRef;
    _nzHourStep = 1;
    _nzMinuteStep = 1;
    _nzSecondStep = 1;
    unsubscribe$ = new Subject();
    onChange;
    onTouch;
    _format = 'HH:mm:ss';
    _disabledHours = () => [];
    _disabledMinutes = () => [];
    _disabledSeconds = () => [];
    _allowEmpty = true;
    time = new TimeHolder();
    hourEnabled = true;
    minuteEnabled = true;
    secondEnabled = true;
    firstScrolled = false;
    enabledColumns = 3;
    hourRange;
    minuteRange;
    secondRange;
    use12HoursRange;
    hourListElement;
    minuteListElement;
    secondListElement;
    use12HoursListElement;
    nzInDatePicker = false; // If inside a date-picker, more diff works need to be done
    nzAddOn;
    nzHideDisabledOptions = false;
    nzClearText;
    nzNowText;
    nzOkText;
    nzPlaceHolder;
    nzUse12Hours = false;
    nzDefaultOpenValue;
    closePanel = new EventEmitter();
    set nzAllowEmpty(value) {
        this._allowEmpty = value;
    }
    get nzAllowEmpty() {
        return this._allowEmpty;
    }
    set nzDisabledHours(value) {
        this._disabledHours = value;
        if (this._disabledHours) {
            this.buildHours();
        }
    }
    get nzDisabledHours() {
        return this._disabledHours;
    }
    set nzDisabledMinutes(value) {
        if (isNotNil(value)) {
            this._disabledMinutes = value;
            this.buildMinutes();
        }
    }
    get nzDisabledMinutes() {
        return this._disabledMinutes;
    }
    set nzDisabledSeconds(value) {
        if (isNotNil(value)) {
            this._disabledSeconds = value;
            this.buildSeconds();
        }
    }
    get nzDisabledSeconds() {
        return this._disabledSeconds;
    }
    set format(value) {
        if (isNotNil(value)) {
            this._format = value;
            this.enabledColumns = 0;
            const charSet = new Set(value);
            this.hourEnabled = charSet.has('H') || charSet.has('h');
            this.minuteEnabled = charSet.has('m');
            this.secondEnabled = charSet.has('s');
            if (this.hourEnabled) {
                this.enabledColumns++;
            }
            if (this.minuteEnabled) {
                this.enabledColumns++;
            }
            if (this.secondEnabled) {
                this.enabledColumns++;
            }
            if (this.nzUse12Hours) {
                this.build12Hours();
            }
        }
    }
    get format() {
        return this._format;
    }
    set nzHourStep(value) {
        this._nzHourStep = value || 1;
        this.buildHours();
    }
    get nzHourStep() {
        return this._nzHourStep;
    }
    set nzMinuteStep(value) {
        this._nzMinuteStep = value || 1;
        this.buildMinutes();
    }
    get nzMinuteStep() {
        return this._nzMinuteStep;
    }
    set nzSecondStep(value) {
        this._nzSecondStep = value || 1;
        this.buildSeconds();
    }
    get nzSecondStep() {
        return this._nzSecondStep;
    }
    buildHours() {
        let hourRanges = 24;
        let disabledHours = this.nzDisabledHours?.();
        let startIndex = 0;
        if (this.nzUse12Hours) {
            hourRanges = 12;
            if (disabledHours) {
                if (this.time.selected12Hours === 'PM') {
                    /**
                     * Filter and transform hours which greater or equal to 12
                     * [0, 1, 2, ..., 12, 13, 14, 15, ..., 23] => [12, 1, 2, 3, ..., 11]
                     */
                    disabledHours = disabledHours.filter(i => i >= 12).map(i => (i > 12 ? i - 12 : i));
                }
                else {
                    /**
                     * Filter and transform hours which less than 12
                     * [0, 1, 2,..., 12, 13, 14, 15, ...23] => [12, 1, 2, 3, ..., 11]
                     */
                    disabledHours = disabledHours.filter(i => i < 12 || i === 24).map(i => (i === 24 || i === 0 ? 12 : i));
                }
            }
            startIndex = 1;
        }
        this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map(r => ({
            index: r,
            disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
        }));
        if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
            const temp = [...this.hourRange];
            temp.unshift(temp[temp.length - 1]);
            temp.splice(temp.length - 1, 1);
            this.hourRange = temp;
        }
    }
    buildMinutes() {
        this.minuteRange = makeRange(60, this.nzMinuteStep).map(r => ({
            index: r,
            disabled: !!this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours).indexOf(r) !== -1
        }));
    }
    buildSeconds() {
        this.secondRange = makeRange(60, this.nzSecondStep).map(r => ({
            index: r,
            disabled: !!this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours, this.time.minutes).indexOf(r) !== -1
        }));
    }
    build12Hours() {
        const isUpperFormat = this._format.includes('A');
        this.use12HoursRange = [
            {
                index: 0,
                value: isUpperFormat ? 'AM' : 'am'
            },
            {
                index: 1,
                value: isUpperFormat ? 'PM' : 'pm'
            }
        ];
    }
    buildTimes() {
        this.buildHours();
        this.buildMinutes();
        this.buildSeconds();
        this.build12Hours();
    }
    scrollToTime(delay = 0) {
        if (this.hourEnabled && this.hourListElement) {
            this.scrollToSelected(this.hourListElement.nativeElement, this.time.viewHours, delay, 'hour');
        }
        if (this.minuteEnabled && this.minuteListElement) {
            this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes, delay, 'minute');
        }
        if (this.secondEnabled && this.secondListElement) {
            this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds, delay, 'second');
        }
        if (this.nzUse12Hours && this.use12HoursListElement) {
            const selectedHours = this.time.selected12Hours;
            const index = selectedHours === 'AM' ? 0 : 1;
            this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay, '12-hour');
        }
    }
    selectHour(hour) {
        this.time.setHours(hour.index, hour.disabled);
        if (this._disabledMinutes) {
            this.buildMinutes();
        }
        if (this._disabledSeconds || this._disabledMinutes) {
            this.buildSeconds();
        }
    }
    selectMinute(minute) {
        this.time.setMinutes(minute.index, minute.disabled);
        if (this._disabledSeconds) {
            this.buildSeconds();
        }
    }
    selectSecond(second) {
        this.time.setSeconds(second.index, second.disabled);
    }
    select12Hours(value) {
        this.time.setSelected12Hours(value.value);
        if (this._disabledHours) {
            this.buildHours();
        }
        if (this._disabledMinutes) {
            this.buildMinutes();
        }
        if (this._disabledSeconds) {
            this.buildSeconds();
        }
    }
    scrollToSelected(instance, index, duration = 0, unit) {
        if (!instance) {
            return;
        }
        const transIndex = this.translateIndex(index, unit);
        const currentOption = (instance.children[transIndex] || instance.children[0]);
        this.scrollTo(instance, currentOption.offsetTop, duration);
    }
    translateIndex(index, unit) {
        if (unit === 'hour') {
            return this.calcIndex(this.nzDisabledHours?.(), this.hourRange.map(item => item.index).indexOf(index));
        }
        else if (unit === 'minute') {
            return this.calcIndex(this.nzDisabledMinutes?.(this.time.hours), this.minuteRange.map(item => item.index).indexOf(index));
        }
        else if (unit === 'second') {
            // second
            return this.calcIndex(this.nzDisabledSeconds?.(this.time.hours, this.time.minutes), this.secondRange.map(item => item.index).indexOf(index));
        }
        else {
            // 12-hour
            return this.calcIndex([], this.use12HoursRange.map(item => item.index).indexOf(index));
        }
    }
    scrollTo(element, to, duration) {
        if (duration <= 0) {
            element.scrollTop = to;
            return;
        }
        const difference = to - element.scrollTop;
        const perTick = (difference / duration) * 10;
        this.ngZone.runOutsideAngular(() => {
            reqAnimFrame(() => {
                element.scrollTop = element.scrollTop + perTick;
                if (element.scrollTop === to) {
                    return;
                }
                this.scrollTo(element, to, duration - 10);
            });
        });
    }
    calcIndex(array, index) {
        if (array?.length && this.nzHideDisabledOptions) {
            return index - array.reduce((pre, value) => pre + (value < index ? 1 : 0), 0);
        }
        else {
            return index;
        }
    }
    changed() {
        if (this.onChange) {
            this.onChange(this.time.value);
        }
    }
    touched() {
        if (this.onTouch) {
            this.onTouch();
        }
    }
    timeDisabled(value) {
        const hour = value.getHours();
        const minute = value.getMinutes();
        const second = value.getSeconds();
        return ((this.nzDisabledHours?.().indexOf(hour) ?? -1) > -1 ||
            (this.nzDisabledMinutes?.(hour).indexOf(minute) ?? -1) > -1 ||
            (this.nzDisabledSeconds?.(hour, minute).indexOf(second) ?? -1) > -1);
    }
    onClickNow() {
        const now = new Date();
        if (this.timeDisabled(now)) {
            return;
        }
        this.time.setValue(now);
        this.changed();
        this.closePanel.emit();
    }
    onClickOk() {
        this.time.setValue(this.time.value, this.nzUse12Hours);
        this.changed();
        this.closePanel.emit();
    }
    isSelectedHour(hour) {
        return hour.index === this.time.viewHours;
    }
    isSelectedMinute(minute) {
        return minute.index === this.time.minutes;
    }
    isSelectedSecond(second) {
        return second.index === this.time.seconds;
    }
    isSelected12Hours(value) {
        return value.value.toUpperCase() === this.time.selected12Hours;
    }
    constructor(ngZone, cdr, dateHelper, elementRef) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.dateHelper = dateHelper;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.time.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.changed();
            this.touched();
            this.scrollToTime(120);
        });
        this.buildTimes();
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.scrollToTime();
                this.firstScrolled = true;
            });
        });
        fromEventOutsideAngular(this.elementRef.nativeElement, 'mousedown')
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(event => {
            event.preventDefault();
        });
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnChanges(changes) {
        const { nzUse12Hours, nzDefaultOpenValue } = changes;
        if (!nzUse12Hours?.previousValue && nzUse12Hours?.currentValue) {
            this.build12Hours();
            this.enabledColumns++;
        }
        if (nzDefaultOpenValue?.currentValue) {
            this.time.setDefaultOpenValue(this.nzDefaultOpenValue || new Date());
        }
    }
    writeValue(value) {
        this.time.setValue(value, this.nzUse12Hours);
        this.buildTimes();
        if (value && this.firstScrolled) {
            this.scrollToTime(120);
        }
        // Mark this component to be checked manually with internal properties changing (see: https://github.com/angular/angular/issues/10816)
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerPanelComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.DateHelperService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTimePickerPanelComponent, isStandalone: true, selector: "nz-time-picker-panel", inputs: { nzInDatePicker: ["nzInDatePicker", "nzInDatePicker", booleanAttribute], nzAddOn: "nzAddOn", nzHideDisabledOptions: "nzHideDisabledOptions", nzClearText: "nzClearText", nzNowText: "nzNowText", nzOkText: "nzOkText", nzPlaceHolder: "nzPlaceHolder", nzUse12Hours: ["nzUse12Hours", "nzUse12Hours", booleanAttribute], nzDefaultOpenValue: "nzDefaultOpenValue", nzAllowEmpty: ["nzAllowEmpty", "nzAllowEmpty", booleanAttribute], nzDisabledHours: "nzDisabledHours", nzDisabledMinutes: "nzDisabledMinutes", nzDisabledSeconds: "nzDisabledSeconds", format: "format", nzHourStep: ["nzHourStep", "nzHourStep", numberAttribute], nzMinuteStep: ["nzMinuteStep", "nzMinuteStep", numberAttribute], nzSecondStep: ["nzSecondStep", "nzSecondStep", numberAttribute] }, outputs: { closePanel: "closePanel" }, host: { properties: { "class.ant-picker-time-panel-column-0": "enabledColumns === 0 && !nzInDatePicker", "class.ant-picker-time-panel-column-1": "enabledColumns === 1 && !nzInDatePicker", "class.ant-picker-time-panel-column-2": "enabledColumns === 2 && !nzInDatePicker", "class.ant-picker-time-panel-column-3": "enabledColumns === 3 && !nzInDatePicker", "class.ant-picker-time-panel-narrow": "enabledColumns < 3", "class.ant-picker-time-panel-placement-bottomLeft": "!nzInDatePicker" }, classAttribute: "ant-picker-time-panel" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzTimePickerPanelComponent), multi: true }], viewQueries: [{ propertyName: "hourListElement", first: true, predicate: ["hourListElement"], descendants: true }, { propertyName: "minuteListElement", first: true, predicate: ["minuteListElement"], descendants: true }, { propertyName: "secondListElement", first: true, predicate: ["secondListElement"], descendants: true }, { propertyName: "use12HoursListElement", first: true, predicate: ["use12HoursListElement"], descendants: true }], exportAs: ["nzTimePickerPanel"], usesOnChanges: true, ngImport: i0, template: `
    @if (nzInDatePicker) {
      <div class="ant-picker-header">
        <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
      </div>
    }
    <div class="ant-picker-content">
      @if (hourEnabled) {
        <ul #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (hour of hourRange; track $index) {
            @if (!(nzHideDisabledOptions && hour.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectHour(hour)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
                [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (minuteEnabled) {
        <ul #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (minute of minuteRange; track $index) {
            @if (!(nzHideDisabledOptions && minute.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectMinute(minute)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
                [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (secondEnabled) {
        <ul #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (second of secondRange; track $index) {
            @if (!(nzHideDisabledOptions && second.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectSecond(second)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
                [class.ant-picker-time-panel-cell-disabled]="second.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (nzUse12Hours) {
        <ul #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (range of use12HoursRange; track range) {
            <li
              (click)="select12Hours(range)"
              class="ant-picker-time-panel-cell"
              [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
            >
              <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
            </li>
          }
        </ul>
      }
    </div>
    @if (!nzInDatePicker) {
      <div class="ant-picker-footer">
        @if (nzAddOn) {
          <div class="ant-picker-footer-extra">
            <ng-template [ngTemplateOutlet]="nzAddOn"></ng-template>
          </div>
        }
        <ul class="ant-picker-ranges">
          <li class="ant-picker-now">
            <a (click)="onClickNow()">
              {{ nzNowText || ('Calendar.lang.now' | nzI18n) }}
            </a>
          </li>
          <li class="ant-picker-ok">
            <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
              {{ nzOkText || ('Calendar.lang.ok' | nzI18n) }}
            </button>
          </li>
        </ul>
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "pipe", type: DecimalPipe, name: "number" }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzI18nModule }, { kind: "pipe", type: i2.NzI18nPipe, name: "nzI18n" }, { kind: "ngmodule", type: NzButtonModule }, { kind: "component", type: i2$1.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }, { kind: "directive", type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], nz-icon, [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { kind: "directive", type: i4.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerPanelComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-time-picker-panel',
                    exportAs: 'nzTimePickerPanel',
                    template: `
    @if (nzInDatePicker) {
      <div class="ant-picker-header">
        <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
      </div>
    }
    <div class="ant-picker-content">
      @if (hourEnabled) {
        <ul #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (hour of hourRange; track $index) {
            @if (!(nzHideDisabledOptions && hour.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectHour(hour)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
                [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (minuteEnabled) {
        <ul #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (minute of minuteRange; track $index) {
            @if (!(nzHideDisabledOptions && minute.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectMinute(minute)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
                [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (secondEnabled) {
        <ul #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (second of secondRange; track $index) {
            @if (!(nzHideDisabledOptions && second.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectSecond(second)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
                [class.ant-picker-time-panel-cell-disabled]="second.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (nzUse12Hours) {
        <ul #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (range of use12HoursRange; track range) {
            <li
              (click)="select12Hours(range)"
              class="ant-picker-time-panel-cell"
              [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
            >
              <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
            </li>
          }
        </ul>
      }
    </div>
    @if (!nzInDatePicker) {
      <div class="ant-picker-footer">
        @if (nzAddOn) {
          <div class="ant-picker-footer-extra">
            <ng-template [ngTemplateOutlet]="nzAddOn"></ng-template>
          </div>
        }
        <ul class="ant-picker-ranges">
          <li class="ant-picker-now">
            <a (click)="onClickNow()">
              {{ nzNowText || ('Calendar.lang.now' | nzI18n) }}
            </a>
          </li>
          <li class="ant-picker-ok">
            <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
              {{ nzOkText || ('Calendar.lang.ok' | nzI18n) }}
            </button>
          </li>
        </ul>
      </div>
    }
  `,
                    host: {
                        class: 'ant-picker-time-panel',
                        '[class.ant-picker-time-panel-column-0]': `enabledColumns === 0 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-column-1]': `enabledColumns === 1 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-column-2]': `enabledColumns === 2 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-column-3]': `enabledColumns === 3 && !nzInDatePicker`,
                        '[class.ant-picker-time-panel-narrow]': `enabledColumns < 3`,
                        '[class.ant-picker-time-panel-placement-bottomLeft]': `!nzInDatePicker`
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzTimePickerPanelComponent), multi: true }],
                    imports: [DecimalPipe, NgTemplateOutlet, NzI18nModule, NzButtonModule]
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.DateHelperService }, { type: i0.ElementRef }], propDecorators: { hourListElement: [{
                type: ViewChild,
                args: ['hourListElement', { static: false }]
            }], minuteListElement: [{
                type: ViewChild,
                args: ['minuteListElement', { static: false }]
            }], secondListElement: [{
                type: ViewChild,
                args: ['secondListElement', { static: false }]
            }], use12HoursListElement: [{
                type: ViewChild,
                args: ['use12HoursListElement', { static: false }]
            }], nzInDatePicker: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAddOn: [{
                type: Input
            }], nzHideDisabledOptions: [{
                type: Input
            }], nzClearText: [{
                type: Input
            }], nzNowText: [{
                type: Input
            }], nzOkText: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzUse12Hours: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDefaultOpenValue: [{
                type: Input
            }], closePanel: [{
                type: Output
            }], nzAllowEmpty: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabledHours: [{
                type: Input
            }], nzDisabledMinutes: [{
                type: Input
            }], nzDisabledSeconds: [{
                type: Input
            }], format: [{
                type: Input
            }], nzHourStep: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzMinuteStep: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzSecondStep: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });

const NZ_CONFIG_MODULE_NAME = 'timePicker';
let NzTimePickerComponent = (() => {
    let _nzHourStep_decorators;
    let _nzHourStep_initializers = [];
    let _nzHourStep_extraInitializers = [];
    let _nzMinuteStep_decorators;
    let _nzMinuteStep_initializers = [];
    let _nzMinuteStep_extraInitializers = [];
    let _nzSecondStep_decorators;
    let _nzSecondStep_initializers = [];
    let _nzSecondStep_extraInitializers = [];
    let _nzClearText_decorators;
    let _nzClearText_initializers = [];
    let _nzClearText_extraInitializers = [];
    let _nzNowText_decorators;
    let _nzNowText_initializers = [];
    let _nzNowText_extraInitializers = [];
    let _nzOkText_decorators;
    let _nzOkText_initializers = [];
    let _nzOkText_extraInitializers = [];
    let _nzPopupClassName_decorators;
    let _nzPopupClassName_initializers = [];
    let _nzPopupClassName_extraInitializers = [];
    let _nzFormat_decorators;
    let _nzFormat_initializers = [];
    let _nzFormat_extraInitializers = [];
    let _nzUse12Hours_decorators;
    let _nzUse12Hours_initializers = [];
    let _nzUse12Hours_extraInitializers = [];
    let _nzSuffixIcon_decorators;
    let _nzSuffixIcon_initializers = [];
    let _nzSuffixIcon_extraInitializers = [];
    let _nzAllowEmpty_decorators;
    let _nzAllowEmpty_initializers = [];
    let _nzAllowEmpty_extraInitializers = [];
    let _nzBackdrop_decorators;
    let _nzBackdrop_initializers = [];
    let _nzBackdrop_extraInitializers = [];
    return class NzTimePickerComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzHourStep_decorators = [WithConfig()];
            _nzMinuteStep_decorators = [WithConfig()];
            _nzSecondStep_decorators = [WithConfig()];
            _nzClearText_decorators = [WithConfig()];
            _nzNowText_decorators = [WithConfig()];
            _nzOkText_decorators = [WithConfig()];
            _nzPopupClassName_decorators = [WithConfig()];
            _nzFormat_decorators = [WithConfig()];
            _nzUse12Hours_decorators = [WithConfig()];
            _nzSuffixIcon_decorators = [WithConfig()];
            _nzAllowEmpty_decorators = [WithConfig()];
            _nzBackdrop_decorators = [WithConfig()];
            __esDecorate(null, null, _nzHourStep_decorators, { kind: "field", name: "nzHourStep", static: false, private: false, access: { has: obj => "nzHourStep" in obj, get: obj => obj.nzHourStep, set: (obj, value) => { obj.nzHourStep = value; } }, metadata: _metadata }, _nzHourStep_initializers, _nzHourStep_extraInitializers);
            __esDecorate(null, null, _nzMinuteStep_decorators, { kind: "field", name: "nzMinuteStep", static: false, private: false, access: { has: obj => "nzMinuteStep" in obj, get: obj => obj.nzMinuteStep, set: (obj, value) => { obj.nzMinuteStep = value; } }, metadata: _metadata }, _nzMinuteStep_initializers, _nzMinuteStep_extraInitializers);
            __esDecorate(null, null, _nzSecondStep_decorators, { kind: "field", name: "nzSecondStep", static: false, private: false, access: { has: obj => "nzSecondStep" in obj, get: obj => obj.nzSecondStep, set: (obj, value) => { obj.nzSecondStep = value; } }, metadata: _metadata }, _nzSecondStep_initializers, _nzSecondStep_extraInitializers);
            __esDecorate(null, null, _nzClearText_decorators, { kind: "field", name: "nzClearText", static: false, private: false, access: { has: obj => "nzClearText" in obj, get: obj => obj.nzClearText, set: (obj, value) => { obj.nzClearText = value; } }, metadata: _metadata }, _nzClearText_initializers, _nzClearText_extraInitializers);
            __esDecorate(null, null, _nzNowText_decorators, { kind: "field", name: "nzNowText", static: false, private: false, access: { has: obj => "nzNowText" in obj, get: obj => obj.nzNowText, set: (obj, value) => { obj.nzNowText = value; } }, metadata: _metadata }, _nzNowText_initializers, _nzNowText_extraInitializers);
            __esDecorate(null, null, _nzOkText_decorators, { kind: "field", name: "nzOkText", static: false, private: false, access: { has: obj => "nzOkText" in obj, get: obj => obj.nzOkText, set: (obj, value) => { obj.nzOkText = value; } }, metadata: _metadata }, _nzOkText_initializers, _nzOkText_extraInitializers);
            __esDecorate(null, null, _nzPopupClassName_decorators, { kind: "field", name: "nzPopupClassName", static: false, private: false, access: { has: obj => "nzPopupClassName" in obj, get: obj => obj.nzPopupClassName, set: (obj, value) => { obj.nzPopupClassName = value; } }, metadata: _metadata }, _nzPopupClassName_initializers, _nzPopupClassName_extraInitializers);
            __esDecorate(null, null, _nzFormat_decorators, { kind: "field", name: "nzFormat", static: false, private: false, access: { has: obj => "nzFormat" in obj, get: obj => obj.nzFormat, set: (obj, value) => { obj.nzFormat = value; } }, metadata: _metadata }, _nzFormat_initializers, _nzFormat_extraInitializers);
            __esDecorate(null, null, _nzUse12Hours_decorators, { kind: "field", name: "nzUse12Hours", static: false, private: false, access: { has: obj => "nzUse12Hours" in obj, get: obj => obj.nzUse12Hours, set: (obj, value) => { obj.nzUse12Hours = value; } }, metadata: _metadata }, _nzUse12Hours_initializers, _nzUse12Hours_extraInitializers);
            __esDecorate(null, null, _nzSuffixIcon_decorators, { kind: "field", name: "nzSuffixIcon", static: false, private: false, access: { has: obj => "nzSuffixIcon" in obj, get: obj => obj.nzSuffixIcon, set: (obj, value) => { obj.nzSuffixIcon = value; } }, metadata: _metadata }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
            __esDecorate(null, null, _nzAllowEmpty_decorators, { kind: "field", name: "nzAllowEmpty", static: false, private: false, access: { has: obj => "nzAllowEmpty" in obj, get: obj => obj.nzAllowEmpty, set: (obj, value) => { obj.nzAllowEmpty = value; } }, metadata: _metadata }, _nzAllowEmpty_initializers, _nzAllowEmpty_extraInitializers);
            __esDecorate(null, null, _nzBackdrop_decorators, { kind: "field", name: "nzBackdrop", static: false, private: false, access: { has: obj => "nzBackdrop" in obj, get: obj => obj.nzBackdrop, set: (obj, value) => { obj.nzBackdrop = value; } }, metadata: _metadata }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        i18n;
        element;
        renderer;
        cdr;
        dateHelper;
        platform;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        _onChange;
        _onTouched;
        destroy$ = inject(NzDestroyService);
        isNzDisableFirstChange = true;
        isInit = false;
        focused = false;
        inputValue = '';
        value = null;
        preValue = null;
        inputSize;
        i18nPlaceHolder$ = of(undefined);
        overlayPositions = [
            {
                offsetY: 3,
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                offsetY: -3,
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                offsetY: 3,
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                offsetY: -3,
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ];
        dir = 'ltr';
        // status
        prefixCls = 'ant-picker';
        statusCls = {};
        status = '';
        hasFeedback = false;
        get origin() {
            return this.element;
        }
        inputRef;
        nzId = null;
        nzSize = 'default';
        nzStatus = '';
        nzHourStep = __runInitializers(this, _nzHourStep_initializers, 1);
        nzMinuteStep = (__runInitializers(this, _nzHourStep_extraInitializers), __runInitializers(this, _nzMinuteStep_initializers, 1));
        nzSecondStep = (__runInitializers(this, _nzMinuteStep_extraInitializers), __runInitializers(this, _nzSecondStep_initializers, 1));
        nzClearText = (__runInitializers(this, _nzSecondStep_extraInitializers), __runInitializers(this, _nzClearText_initializers, 'clear'));
        nzNowText = (__runInitializers(this, _nzClearText_extraInitializers), __runInitializers(this, _nzNowText_initializers, ''));
        nzOkText = (__runInitializers(this, _nzNowText_extraInitializers), __runInitializers(this, _nzOkText_initializers, ''));
        nzPopupClassName = (__runInitializers(this, _nzOkText_extraInitializers), __runInitializers(this, _nzPopupClassName_initializers, ''));
        nzPlaceHolder = (__runInitializers(this, _nzPopupClassName_extraInitializers), '');
        nzAddOn;
        nzDefaultOpenValue;
        nzDisabledHours;
        nzDisabledMinutes;
        nzDisabledSeconds;
        nzFormat = __runInitializers(this, _nzFormat_initializers, 'HH:mm:ss');
        nzOpen = (__runInitializers(this, _nzFormat_extraInitializers), false);
        nzUse12Hours = __runInitializers(this, _nzUse12Hours_initializers, false);
        nzSuffixIcon = (__runInitializers(this, _nzUse12Hours_extraInitializers), __runInitializers(this, _nzSuffixIcon_initializers, 'clock-circle'));
        nzOpenChange = (__runInitializers(this, _nzSuffixIcon_extraInitializers), new EventEmitter());
        nzHideDisabledOptions = false;
        nzAllowEmpty = __runInitializers(this, _nzAllowEmpty_initializers, true);
        nzDisabled = (__runInitializers(this, _nzAllowEmpty_extraInitializers), false);
        nzAutoFocus = false;
        nzBackdrop = __runInitializers(this, _nzBackdrop_initializers, false);
        nzBorderless = (__runInitializers(this, _nzBackdrop_extraInitializers), false);
        nzInputReadOnly = false;
        emitValue(value) {
            this.setValue(value, true);
            if (this._onChange) {
                this._onChange(this.value);
            }
            if (this._onTouched) {
                this._onTouched();
            }
        }
        setValue(value, syncPreValue = false) {
            if (syncPreValue) {
                this.preValue = isValid(value) ? new Date(value) : null;
            }
            this.value = isValid(value) ? new Date(value) : null;
            this.inputValue = this.dateHelper.format(value, this.nzFormat);
            this.cdr.markForCheck();
        }
        open() {
            if (this.nzDisabled || this.nzOpen) {
                return;
            }
            this.focus();
            this.nzOpen = true;
            this.nzOpenChange.emit(this.nzOpen);
        }
        close() {
            this.nzOpen = false;
            this.cdr.markForCheck();
            this.nzOpenChange.emit(this.nzOpen);
        }
        updateAutoFocus() {
            if (this.isInit && !this.nzDisabled) {
                if (this.nzAutoFocus) {
                    this.renderer.setAttribute(this.inputRef.nativeElement, 'autofocus', 'autofocus');
                }
                else {
                    this.renderer.removeAttribute(this.inputRef.nativeElement, 'autofocus');
                }
            }
        }
        onClickClearBtn(event) {
            event.stopPropagation();
            this.emitValue(null);
        }
        onClickOutside(event) {
            const target = _getEventTarget(event);
            if (!this.element.nativeElement.contains(target)) {
                this.setCurrentValueAndClose();
            }
        }
        onFocus(value) {
            this.focused = value;
            if (!value) {
                if (this.checkTimeValid(this.value)) {
                    this.setCurrentValueAndClose();
                }
                else {
                    this.setValue(this.preValue);
                    this.close();
                }
            }
        }
        focus() {
            if (this.inputRef.nativeElement) {
                this.inputRef.nativeElement.focus();
            }
        }
        blur() {
            if (this.inputRef.nativeElement) {
                this.inputRef.nativeElement.blur();
            }
        }
        onKeyupEsc() {
            this.setValue(this.preValue);
        }
        onKeyupEnter() {
            if (this.nzOpen && isValid(this.value)) {
                this.setCurrentValueAndClose();
            }
            else if (!this.nzOpen) {
                this.open();
            }
        }
        onInputChange(str) {
            if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
                this.open();
                this.parseTimeString(str);
            }
        }
        onPanelValueChange(value) {
            this.setValue(value);
            this.focus();
        }
        closePanel() {
            this.inputRef.nativeElement.blur();
        }
        setCurrentValueAndClose() {
            this.emitValue(this.value);
            this.close();
        }
        finalSize = computed(() => {
            if (this.compactSize) {
                return this.compactSize();
            }
            return this.size();
        });
        size = signal(this.nzSize);
        compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
        nzFormStatusService = inject(NzFormStatusService, { optional: true });
        nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
        constructor(nzConfigService, i18n, element, renderer, cdr, dateHelper, platform, directionality) {
            this.nzConfigService = nzConfigService;
            this.i18n = i18n;
            this.element = element;
            this.renderer = renderer;
            this.cdr = cdr;
            this.dateHelper = dateHelper;
            this.platform = platform;
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
            this.inputSize = Math.max(8, this.nzFormat.length) + 2;
            this.i18nPlaceHolder$ = this.i18n.localeChange.pipe(map((nzLocale) => nzLocale.TimePicker.placeholder));
            this.dir = this.directionality.value;
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
            });
        }
        ngOnChanges({ nzUse12Hours, nzFormat, nzDisabled, nzAutoFocus, nzStatus, nzSize }) {
            if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
                this.nzFormat = 'h:mm:ss a';
            }
            if (nzDisabled) {
                const value = nzDisabled.currentValue;
                const input = this.inputRef.nativeElement;
                if (value) {
                    this.renderer.setAttribute(input, 'disabled', '');
                }
                else {
                    this.renderer.removeAttribute(input, 'disabled');
                }
            }
            if (nzAutoFocus) {
                this.updateAutoFocus();
            }
            if (nzStatus) {
                this.setStatusStyles(this.nzStatus, this.hasFeedback);
            }
            if (nzSize) {
                this.size.set(nzSize.currentValue);
            }
        }
        parseTimeString(str) {
            const value = this.dateHelper.parseTime(str, this.nzFormat) || null;
            if (isValid(value)) {
                this.value = value;
                this.cdr.markForCheck();
            }
        }
        ngAfterViewInit() {
            this.isInit = true;
            this.updateAutoFocus();
        }
        writeValue(time) {
            let result;
            if (time instanceof Date) {
                result = time;
            }
            else if (isNil(time)) {
                result = null;
            }
            else {
                warn('Non-Date type is not recommended for time-picker, use "Date" type.');
                result = new Date(time);
            }
            this.setValue(result, true);
        }
        registerOnChange(fn) {
            this._onChange = fn;
        }
        registerOnTouched(fn) {
            this._onTouched = fn;
        }
        setDisabledState(isDisabled) {
            this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
            this.isNzDisableFirstChange = false;
            this.cdr.markForCheck();
        }
        checkTimeValid(value) {
            if (!value) {
                return true;
            }
            const disabledHours = this.nzDisabledHours?.();
            const disabledMinutes = this.nzDisabledMinutes?.(value.getHours());
            const disabledSeconds = this.nzDisabledSeconds?.(value.getHours(), value.getMinutes());
            return !(disabledHours?.includes(value.getHours()) ||
                disabledMinutes?.includes(value.getMinutes()) ||
                disabledSeconds?.includes(value.getSeconds()));
        }
        setStatusStyles(status, hasFeedback) {
            // set inner status
            this.status = status;
            this.hasFeedback = hasFeedback;
            this.cdr.markForCheck();
            // render status if nzStatus is set
            this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
            Object.keys(this.statusCls).forEach(status => {
                if (this.statusCls[status]) {
                    this.renderer.addClass(this.element.nativeElement, status);
                }
                else {
                    this.renderer.removeClass(this.element.nativeElement, status);
                }
            });
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerComponent, deps: [{ token: i1.NzConfigService }, { token: i2.NzI18nService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i2.DateHelperService }, { token: i3$1.Platform }, { token: i4$1.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTimePickerComponent, isStandalone: true, selector: "nz-time-picker", inputs: { nzId: "nzId", nzSize: "nzSize", nzStatus: "nzStatus", nzHourStep: "nzHourStep", nzMinuteStep: "nzMinuteStep", nzSecondStep: "nzSecondStep", nzClearText: "nzClearText", nzNowText: "nzNowText", nzOkText: "nzOkText", nzPopupClassName: "nzPopupClassName", nzPlaceHolder: "nzPlaceHolder", nzAddOn: "nzAddOn", nzDefaultOpenValue: "nzDefaultOpenValue", nzDisabledHours: "nzDisabledHours", nzDisabledMinutes: "nzDisabledMinutes", nzDisabledSeconds: "nzDisabledSeconds", nzFormat: "nzFormat", nzOpen: "nzOpen", nzUse12Hours: ["nzUse12Hours", "nzUse12Hours", booleanAttribute], nzSuffixIcon: "nzSuffixIcon", nzHideDisabledOptions: ["nzHideDisabledOptions", "nzHideDisabledOptions", booleanAttribute], nzAllowEmpty: ["nzAllowEmpty", "nzAllowEmpty", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzAutoFocus: ["nzAutoFocus", "nzAutoFocus", booleanAttribute], nzBackdrop: "nzBackdrop", nzBorderless: ["nzBorderless", "nzBorderless", booleanAttribute], nzInputReadOnly: ["nzInputReadOnly", "nzInputReadOnly", booleanAttribute] }, outputs: { nzOpenChange: "nzOpenChange" }, host: { listeners: { "click": "open()" }, properties: { "class.ant-picker-large": "finalSize() === 'large'", "class.ant-picker-small": "finalSize() === 'small'", "class.ant-picker-disabled": "nzDisabled", "class.ant-picker-focused": "focused", "class.ant-picker-rtl": "dir === 'rtl'", "class.ant-picker-borderless": "nzBorderless" }, classAttribute: "ant-picker" }, providers: [
                NzDestroyService,
                { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzTimePickerComponent), multi: true },
                { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'picker' }
            ], viewQueries: [{ propertyName: "inputRef", first: true, predicate: ["inputElement"], descendants: true, static: true }], exportAs: ["nzTimePicker"], usesOnChanges: true, hostDirectives: [{ directive: i5.NzSpaceCompactItemDirective }], ngImport: i0, template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon>
        }
      </span>
      @if (nzAllowEmpty && !nzDisabled && value) {
        <span class="ant-picker-clear" (click)="onClickClearBtn($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText" />
        </span>
      }
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown" style="position: relative">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [class]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="closePanel()"
            ></nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "pipe", type: AsyncPipe, name: "async" }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i7.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i8.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "component", type: NzFormItemFeedbackIconComponent, selector: "nz-form-item-feedback-icon", inputs: ["status"], exportAs: ["nzFormFeedbackIcon"] }, { kind: "component", type: NzTimePickerPanelComponent, selector: "nz-time-picker-panel", inputs: ["nzInDatePicker", "nzAddOn", "nzHideDisabledOptions", "nzClearText", "nzNowText", "nzOkText", "nzPlaceHolder", "nzUse12Hours", "nzDefaultOpenValue", "nzAllowEmpty", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep"], outputs: ["closePanel"], exportAs: ["nzTimePickerPanel"] }, { kind: "ngmodule", type: NzOverlayModule }, { kind: "directive", type: i9.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i10.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }], animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-time-picker',
                    exportAs: 'nzTimePicker',
                    template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon>
        }
      </span>
      @if (nzAllowEmpty && !nzDisabled && value) {
        <span class="ant-picker-clear" (click)="onClickClearBtn($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText" />
        </span>
      }
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown" style="position: relative">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [class]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="closePanel()"
            ></nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                    host: {
                        class: 'ant-picker',
                        '[class.ant-picker-large]': `finalSize() === 'large'`,
                        '[class.ant-picker-small]': `finalSize() === 'small'`,
                        '[class.ant-picker-disabled]': `nzDisabled`,
                        '[class.ant-picker-focused]': `focused`,
                        '[class.ant-picker-rtl]': `dir === 'rtl'`,
                        '[class.ant-picker-borderless]': `nzBorderless`,
                        '(click)': 'open()'
                    },
                    hostDirectives: [NzSpaceCompactItemDirective],
                    animations: [slideMotion],
                    providers: [
                        NzDestroyService,
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzTimePickerComponent), multi: true },
                        { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'picker' }
                    ],
                    imports: [
                        AsyncPipe,
                        FormsModule,
                        NzOutletModule,
                        NzIconModule,
                        NzFormItemFeedbackIconComponent,
                        NzTimePickerPanelComponent,
                        NzOverlayModule,
                        OverlayModule
                    ]
                }]
        }], ctorParameters: () => [{ type: i1.NzConfigService }, { type: i2.NzI18nService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2.DateHelperService }, { type: i3$1.Platform }, { type: i4$1.Directionality }], propDecorators: { inputRef: [{
                type: ViewChild,
                args: ['inputElement', { static: true }]
            }], nzId: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzHourStep: [{
                type: Input
            }], nzMinuteStep: [{
                type: Input
            }], nzSecondStep: [{
                type: Input
            }], nzClearText: [{
                type: Input
            }], nzNowText: [{
                type: Input
            }], nzOkText: [{
                type: Input
            }], nzPopupClassName: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzAddOn: [{
                type: Input
            }], nzDefaultOpenValue: [{
                type: Input
            }], nzDisabledHours: [{
                type: Input
            }], nzDisabledMinutes: [{
                type: Input
            }], nzDisabledSeconds: [{
                type: Input
            }], nzFormat: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }], nzUse12Hours: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzSuffixIcon: [{
                type: Input
            }], nzOpenChange: [{
                type: Output
            }], nzHideDisabledOptions: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAllowEmpty: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAutoFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzBackdrop: [{
                type: Input
            }], nzBorderless: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzInputReadOnly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTimePickerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerModule, imports: [NzTimePickerComponent, NzTimePickerPanelComponent], exports: [NzTimePickerPanelComponent, NzTimePickerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerModule, imports: [NzTimePickerComponent, NzTimePickerPanelComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzTimePickerComponent, NzTimePickerPanelComponent],
                    exports: [NzTimePickerPanelComponent, NzTimePickerComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTimePickerComponent, NzTimePickerModule, NzTimePickerPanelComponent };
//# sourceMappingURL=ng-zorro-antd-time-picker.mjs.map
