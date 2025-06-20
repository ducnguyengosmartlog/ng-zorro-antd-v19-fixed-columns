import { NgTemplateOutlet, DatePipe } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, booleanAttribute, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, inject, forwardRef, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { FormsModule, Validators, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { parseExpression } from 'cron-parser';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import * as i1 from 'ng-zorro-antd/input';
import { NzInputModule } from 'ng-zorro-antd/input';
import * as i1$1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i2$1 from 'ng-zorro-antd/i18n';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCronExpressionInputComponent {
    value = '0';
    label = 'second';
    disabled = false;
    focusEffect = new EventEmitter();
    blurEffect = new EventEmitter();
    getValue = new EventEmitter();
    focusInputEffect(event) {
        this.focusEffect.emit(this.label);
        event.target.select();
    }
    blurInputEffect() {
        this.blurEffect.emit();
    }
    setValue() {
        this.getValue.emit({ label: this.label, value: this.value });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "19.2.2", type: NzCronExpressionInputComponent, isStandalone: true, selector: "nz-cron-expression-input", inputs: { value: "value", label: "label", disabled: ["disabled", "disabled", booleanAttribute] }, outputs: { focusEffect: "focusEffect", blurEffect: "blurEffect", getValue: "getValue" }, exportAs: ["nzCronExpressionInput"], ngImport: i0, template: `
    <div class="ant-cron-expression-input">
      <input
        nz-input
        [(ngModel)]="value"
        [name]="label"
        [disabled]="disabled"
        (focus)="focusInputEffect($event)"
        (blur)="blurInputEffect()"
        (ngModelChange)="setValue()"
      />
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzInputModule }, { kind: "directive", type: i1.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionInputComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-cron-expression-input',
                    exportAs: 'nzCronExpressionInput',
                    template: `
    <div class="ant-cron-expression-input">
      <input
        nz-input
        [(ngModel)]="value"
        [name]="label"
        [disabled]="disabled"
        (focus)="focusInputEffect($event)"
        (blur)="blurInputEffect()"
        (ngModelChange)="setValue()"
      />
    </div>
  `,
                    imports: [NzInputModule, FormsModule]
                }]
        }], propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], focusEffect: [{
                type: Output
            }], blurEffect: [{
                type: Output
            }], getValue: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCronExpressionLabelComponent {
    type = 'second';
    locale;
    labelFocus = null;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzCronExpressionLabelComponent, isStandalone: true, selector: "nz-cron-expression-label", inputs: { type: "type", locale: "locale", labelFocus: "labelFocus" }, exportAs: ["nzCronExpressionLabel"], ngImport: i0, template: `
    <div class="ant-cron-expression-label" [class.ant-cron-expression-label-foucs]="labelFocus === type">
      <label>
        {{ locale[type] }}
      </label>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionLabelComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-cron-expression-label',
                    exportAs: 'nzCronExpressionLabel',
                    template: `
    <div class="ant-cron-expression-label" [class.ant-cron-expression-label-foucs]="labelFocus === type">
      <label>
        {{ locale[type] }}
      </label>
    </div>
  `
                }]
        }], propDecorators: { type: [{
                type: Input
            }], locale: [{
                type: Input
            }], labelFocus: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCronExpressionPreviewComponent {
    cdr;
    TimeList = [];
    visible = true;
    locale;
    nzSemantic = null;
    loadMorePreview = new EventEmitter();
    isExpand = true;
    constructor(cdr) {
        this.cdr = cdr;
    }
    setExpand() {
        this.isExpand = !this.isExpand;
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionPreviewComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzCronExpressionPreviewComponent, isStandalone: true, selector: "nz-cron-expression-preview", inputs: { TimeList: "TimeList", visible: ["visible", "visible", booleanAttribute], locale: "locale", nzSemantic: "nzSemantic" }, outputs: { loadMorePreview: "loadMorePreview" }, exportAs: ["nzCronExpressionPreview"], ngImport: i0, template: ` <div class="ant-collapse ant-collapse-borderless ant-cron-expression-preview">
    <div class="ant-cron-expression-preview-dateTime" [class.ant-cron-expression-preview-dateTime-center]="!isExpand">
      @if (visible) {
        @if (!nzSemantic) {
          {{ TimeList[0] | date: 'YYYY-MM-dd HH:mm:ss' }}
        } @else {
          <ng-template [ngTemplateOutlet]="nzSemantic" />
        }
      } @else {
        {{ locale.cronError }}
      }
    </div>
    @if (visible && !isExpand) {
      <div class="ant-cron-expression-preview-content">
        <ul class="ant-cron-expression-preview-list">
          @for (item of TimeList; track item) {
            <li>
              {{ item | date: 'YYYY-MM-dd HH:mm:ss' }}
            </li>
          }
          <li><a (click)="loadMorePreview.emit()">···</a></li>
        </ul>
      </div>
    }

    <ul class="ant-cron-expression-preview-icon">
      @if (isExpand) {
        <li><nz-icon nzType="down" nzTheme="outline" (click)="setExpand()" /></li>
      } @else {
        <li><nz-icon nzType="up" nzTheme="outline" (click)="setExpand()" /></li>
      }
    </ul>
  </div>`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: DatePipe, name: "date" }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1$1.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionPreviewComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-cron-expression-preview',
                    exportAs: 'nzCronExpressionPreview',
                    template: ` <div class="ant-collapse ant-collapse-borderless ant-cron-expression-preview">
    <div class="ant-cron-expression-preview-dateTime" [class.ant-cron-expression-preview-dateTime-center]="!isExpand">
      @if (visible) {
        @if (!nzSemantic) {
          {{ TimeList[0] | date: 'YYYY-MM-dd HH:mm:ss' }}
        } @else {
          <ng-template [ngTemplateOutlet]="nzSemantic" />
        }
      } @else {
        {{ locale.cronError }}
      }
    </div>
    @if (visible && !isExpand) {
      <div class="ant-cron-expression-preview-content">
        <ul class="ant-cron-expression-preview-list">
          @for (item of TimeList; track item) {
            <li>
              {{ item | date: 'YYYY-MM-dd HH:mm:ss' }}
            </li>
          }
          <li><a (click)="loadMorePreview.emit()">···</a></li>
        </ul>
      </div>
    }

    <ul class="ant-cron-expression-preview-icon">
      @if (isExpand) {
        <li><nz-icon nzType="down" nzTheme="outline" (click)="setExpand()" /></li>
      } @else {
        <li><nz-icon nzType="up" nzTheme="outline" (click)="setExpand()" /></li>
      }
    </ul>
  </div>`,
                    imports: [NgTemplateOutlet, DatePipe, NzIconModule]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { TimeList: [{
                type: Input
            }], visible: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], locale: [{
                type: Input
            }], nzSemantic: [{
                type: Input
            }], loadMorePreview: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function labelsOfType(type) {
    if (type === 'spring') {
        return ['second', 'minute', 'hour', 'day', 'month', 'week'];
    }
    return ['minute', 'hour', 'day', 'month', 'week'];
}
class NzCronExpressionComponent {
    formBuilder;
    cdr;
    i18n;
    nzSize = 'default';
    nzType = 'linux';
    nzCollapseDisable = false;
    nzExtra = null;
    nzSemantic = null;
    nzBorderless = false;
    nzDisabled = false;
    locale;
    focus = false;
    labelFocus = null;
    labels = labelsOfType(this.nzType);
    interval;
    nextTimeList = [];
    isNzDisableFirstChange = true;
    destroy$ = inject(NzDestroyService);
    validateForm;
    onChange = () => { };
    onTouch = () => null;
    convertFormat(value) {
        const values = value.split(' ');
        const valueObject = this.labels.reduce((obj, label, idx) => {
            obj[label] = values[idx];
            return obj;
        }, {});
        this.validateForm.patchValue(valueObject);
    }
    writeValue(value) {
        if (value) {
            this.convertFormat(value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    validate() {
        if (this.validateForm.valid) {
            return of(null);
        }
        else {
            return of({ error: true });
        }
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
        this.isNzDisableFirstChange = false;
        this.cdr.markForCheck();
    }
    constructor(formBuilder, cdr, i18n) {
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.i18n = i18n;
        this.validateForm = this.formBuilder.nonNullable.group({
            second: ['0', Validators.required],
            minute: ['*', Validators.required],
            hour: ['*', Validators.required],
            day: ['*', Validators.required],
            month: ['*', Validators.required],
            week: ['*', Validators.required]
        }, { validators: this.checkValid });
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('CronExpression');
            this.cdr.markForCheck();
        });
        this.cronFormType();
        this.previewDate(this.validateForm.value);
        this.validateForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
            this.onChange(Object.values(value).join(' '));
            this.previewDate(value);
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzType } = changes;
        if (nzType) {
            this.labels = labelsOfType(this.nzType);
            this.cronFormType();
        }
    }
    cronFormType() {
        if (this.nzType === 'spring') {
            this.validateForm.controls.second.enable();
        }
        else {
            this.validateForm.controls.second.disable();
        }
    }
    previewDate(value) {
        try {
            this.interval = parseExpression(Object.values(value).join(' '));
            this.nextTimeList = [
                this.interval.next().toDate(),
                this.interval.next().toDate(),
                this.interval.next().toDate(),
                this.interval.next().toDate(),
                this.interval.next().toDate()
            ];
        }
        catch {
            return;
        }
    }
    loadMorePreview() {
        this.nextTimeList = [
            ...this.nextTimeList,
            this.interval.next().toDate(),
            this.interval.next().toDate(),
            this.interval.next().toDate(),
            this.interval.next().toDate(),
            this.interval.next().toDate()
        ];
        this.cdr.markForCheck();
    }
    focusEffect(value) {
        this.focus = true;
        this.labelFocus = value;
        this.cdr.markForCheck();
    }
    blurEffect() {
        this.focus = false;
        this.labelFocus = null;
        this.cdr.markForCheck();
    }
    getValue(item) {
        this.validateForm.controls[item.label].patchValue(item.value);
        this.cdr.markForCheck();
    }
    checkValid = (control) => {
        if (control.value) {
            try {
                const cron = [];
                this.labels.forEach(label => {
                    cron.push(control.value[label]);
                });
                parseExpression(cron.join(' '));
            }
            catch {
                return { error: true };
            }
        }
        return null;
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionComponent, deps: [{ token: i2.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2$1.NzI18nService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzCronExpressionComponent, isStandalone: true, selector: "nz-cron-expression", inputs: { nzSize: "nzSize", nzType: "nzType", nzCollapseDisable: ["nzCollapseDisable", "nzCollapseDisable", booleanAttribute], nzExtra: "nzExtra", nzSemantic: "nzSemantic", nzBorderless: ["nzBorderless", "nzBorderless", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute] }, providers: [
            {
                provide: NG_ASYNC_VALIDATORS,
                useExisting: forwardRef(() => NzCronExpressionComponent),
                multi: true
            },
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NzCronExpressionComponent),
                multi: true
            },
            NzDestroyService
        ], exportAs: ["nzCronExpression"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-cron-expression">
      <div class="ant-cron-expression-content">
        <div
          class="ant-input ant-cron-expression-input-group"
          [class.ant-input-lg]="nzSize === 'large'"
          [class.ant-input-sm]="nzSize === 'small'"
          [class.ant-input-borderless]="nzBorderless"
          [class.ant-cron-expression-input-group-focus]="focus && !nzBorderless"
          [class.ant-input-status-error]="!validateForm.valid && !nzBorderless"
          [class.ant-cron-expression-input-group-error-focus]="!validateForm.valid && focus && !nzBorderless"
          [class.ant-input-disabled]="nzDisabled"
        >
          @for (label of labels; track label) {
            <nz-cron-expression-input
              [value]="this.validateForm.controls[label].value"
              [label]="label"
              [disabled]="nzDisabled"
              (focusEffect)="focusEffect($event)"
              (blurEffect)="blurEffect()"
              (getValue)="getValue($event)"
            />
          }
        </div>
        <div
          class="ant-cron-expression-label-group"
          [class.ant-input-lg]="nzSize === 'large'"
          [class.ant-cron-expression-label-group-default]="nzSize === 'default'"
          [class.ant-input-sm]="nzSize === 'small'"
        >
          @for (label of labels; track label) {
            <nz-cron-expression-label [type]="label" [labelFocus]="labelFocus" [locale]="locale" />
          }
        </div>
        @if (!nzCollapseDisable) {
          <nz-cron-expression-preview
            [TimeList]="nextTimeList"
            [visible]="validateForm.valid"
            [locale]="locale"
            [nzSemantic]="nzSemantic"
            (loadMorePreview)="loadMorePreview()"
          />
        }
      </div>
      @if (nzExtra) {
        <div class="ant-cron-expression-map">
          <ng-template [ngTemplateOutlet]="nzExtra" />
        </div>
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "component", type: NzCronExpressionInputComponent, selector: "nz-cron-expression-input", inputs: ["value", "label", "disabled"], outputs: ["focusEffect", "blurEffect", "getValue"], exportAs: ["nzCronExpressionInput"] }, { kind: "component", type: NzCronExpressionLabelComponent, selector: "nz-cron-expression-label", inputs: ["type", "locale", "labelFocus"], exportAs: ["nzCronExpressionLabel"] }, { kind: "component", type: NzCronExpressionPreviewComponent, selector: "nz-cron-expression-preview", inputs: ["TimeList", "visible", "locale", "nzSemantic"], outputs: ["loadMorePreview"], exportAs: ["nzCronExpressionPreview"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-cron-expression',
                    exportAs: 'nzCronExpression',
                    template: `
    <div class="ant-cron-expression">
      <div class="ant-cron-expression-content">
        <div
          class="ant-input ant-cron-expression-input-group"
          [class.ant-input-lg]="nzSize === 'large'"
          [class.ant-input-sm]="nzSize === 'small'"
          [class.ant-input-borderless]="nzBorderless"
          [class.ant-cron-expression-input-group-focus]="focus && !nzBorderless"
          [class.ant-input-status-error]="!validateForm.valid && !nzBorderless"
          [class.ant-cron-expression-input-group-error-focus]="!validateForm.valid && focus && !nzBorderless"
          [class.ant-input-disabled]="nzDisabled"
        >
          @for (label of labels; track label) {
            <nz-cron-expression-input
              [value]="this.validateForm.controls[label].value"
              [label]="label"
              [disabled]="nzDisabled"
              (focusEffect)="focusEffect($event)"
              (blurEffect)="blurEffect()"
              (getValue)="getValue($event)"
            />
          }
        </div>
        <div
          class="ant-cron-expression-label-group"
          [class.ant-input-lg]="nzSize === 'large'"
          [class.ant-cron-expression-label-group-default]="nzSize === 'default'"
          [class.ant-input-sm]="nzSize === 'small'"
        >
          @for (label of labels; track label) {
            <nz-cron-expression-label [type]="label" [labelFocus]="labelFocus" [locale]="locale" />
          }
        </div>
        @if (!nzCollapseDisable) {
          <nz-cron-expression-preview
            [TimeList]="nextTimeList"
            [visible]="validateForm.valid"
            [locale]="locale"
            [nzSemantic]="nzSemantic"
            (loadMorePreview)="loadMorePreview()"
          />
        }
      </div>
      @if (nzExtra) {
        <div class="ant-cron-expression-map">
          <ng-template [ngTemplateOutlet]="nzExtra" />
        </div>
      }
    </div>
  `,
                    providers: [
                        {
                            provide: NG_ASYNC_VALIDATORS,
                            useExisting: forwardRef(() => NzCronExpressionComponent),
                            multi: true
                        },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzCronExpressionComponent),
                            multi: true
                        },
                        NzDestroyService
                    ],
                    imports: [
                        NzCronExpressionInputComponent,
                        NzCronExpressionLabelComponent,
                        NzCronExpressionPreviewComponent,
                        NgTemplateOutlet
                    ]
                }]
        }], ctorParameters: () => [{ type: i2.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2$1.NzI18nService }], propDecorators: { nzSize: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzCollapseDisable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzExtra: [{
                type: Input
            }], nzSemantic: [{
                type: Input
            }], nzBorderless: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCronExpressionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionModule, imports: [NzCronExpressionComponent,
            NzCronExpressionLabelComponent,
            NzCronExpressionInputComponent,
            NzCronExpressionPreviewComponent], exports: [NzCronExpressionComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionModule, imports: [NzCronExpressionComponent,
            NzCronExpressionInputComponent,
            NzCronExpressionPreviewComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzCronExpressionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzCronExpressionComponent,
                        NzCronExpressionLabelComponent,
                        NzCronExpressionInputComponent,
                        NzCronExpressionPreviewComponent
                    ],
                    exports: [NzCronExpressionComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCronExpressionComponent, NzCronExpressionModule };
//# sourceMappingURL=ng-zorro-antd-cron-expression.mjs.map
