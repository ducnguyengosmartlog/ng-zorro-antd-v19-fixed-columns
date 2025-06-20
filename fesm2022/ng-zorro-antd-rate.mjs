import { __esDecorate, __runInitializers } from 'tslib';
import { RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import * as i0 from '@angular/core';
import { EventEmitter, booleanAttribute, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, forwardRef, numberAttribute, ViewChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import * as i1$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i3 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import * as i4 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgTemplateOutlet } from '@angular/common';
import * as i1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i2 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRateItemComponent {
    character;
    index = 0;
    allowHalf = false;
    itemHover = new EventEmitter();
    itemClick = new EventEmitter();
    hoverRate(isHalf) {
        this.itemHover.next(isHalf && this.allowHalf);
    }
    clickRate(isHalf) {
        this.itemClick.next(isHalf && this.allowHalf);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRateItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "19.2.2", type: NzRateItemComponent, isStandalone: true, selector: "[nz-rate-item]", inputs: { character: "character", index: "index", allowHalf: ["allowHalf", "allowHalf", booleanAttribute] }, outputs: { itemHover: "itemHover", itemClick: "itemClick" }, exportAs: ["nzRateItem"], ngImport: i0, template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <nz-icon nzType="star" nzTheme="fill" />
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRateItemComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: '[nz-rate-item]',
                    exportAs: 'nzRateItem',
                    template: `
    <div
      class="ant-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>
    <div class="ant-rate-star-first" (mouseover)="hoverRate(true); $event.stopPropagation()" (click)="clickRate(true)">
      <ng-template
        [ngTemplateOutlet]="character || defaultCharacter"
        [ngTemplateOutletContext]="{ $implicit: index }"
      ></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <nz-icon nzType="star" nzTheme="fill" />
    </ng-template>
  `,
                    imports: [NgTemplateOutlet, NzIconModule]
                }]
        }], propDecorators: { character: [{
                type: Input
            }], index: [{
                type: Input
            }], allowHalf: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], itemHover: [{
                type: Output
            }], itemClick: [{
                type: Output
            }] } });

const NZ_CONFIG_MODULE_NAME = 'rate';
let NzRateComponent = (() => {
    let _nzAllowClear_decorators;
    let _nzAllowClear_initializers = [];
    let _nzAllowClear_extraInitializers = [];
    let _nzAllowHalf_decorators;
    let _nzAllowHalf_initializers = [];
    let _nzAllowHalf_extraInitializers = [];
    return class NzRateComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzAllowClear_decorators = [WithConfig()];
            _nzAllowHalf_decorators = [WithConfig()];
            __esDecorate(null, null, _nzAllowClear_decorators, { kind: "field", name: "nzAllowClear", static: false, private: false, access: { has: obj => "nzAllowClear" in obj, get: obj => obj.nzAllowClear, set: (obj, value) => { obj.nzAllowClear = value; } }, metadata: _metadata }, _nzAllowClear_initializers, _nzAllowClear_extraInitializers);
            __esDecorate(null, null, _nzAllowHalf_decorators, { kind: "field", name: "nzAllowHalf", static: false, private: false, access: { has: obj => "nzAllowHalf" in obj, get: obj => obj.nzAllowHalf, set: (obj, value) => { obj.nzAllowHalf = value; } }, metadata: _metadata }, _nzAllowHalf_initializers, _nzAllowHalf_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        ngZone;
        renderer;
        cdr;
        directionality;
        destroy$;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        ulElement;
        nzAllowClear = __runInitializers(this, _nzAllowClear_initializers, true);
        nzAllowHalf = (__runInitializers(this, _nzAllowClear_extraInitializers), __runInitializers(this, _nzAllowHalf_initializers, false));
        nzDisabled = (__runInitializers(this, _nzAllowHalf_extraInitializers), false);
        nzAutoFocus = false;
        nzCharacter;
        nzCount = 5;
        nzTooltips = [];
        nzOnBlur = new EventEmitter();
        nzOnFocus = new EventEmitter();
        nzOnHoverChange = new EventEmitter();
        nzOnKeyDown = new EventEmitter();
        classMap = {};
        starArray = [];
        starStyleArray = [];
        dir = 'ltr';
        hasHalf = false;
        hoverValue = 0;
        isFocused = false;
        _value = 0;
        isNzDisableFirstChange = true;
        get nzValue() {
            return this._value;
        }
        set nzValue(input) {
            if (this._value === input) {
                return;
            }
            this._value = input;
            this.hasHalf = !Number.isInteger(input) && this.nzAllowHalf;
            this.hoverValue = Math.ceil(input);
        }
        constructor(nzConfigService, ngZone, renderer, cdr, directionality, destroy$) {
            this.nzConfigService = nzConfigService;
            this.ngZone = ngZone;
            this.renderer = renderer;
            this.cdr = cdr;
            this.directionality = directionality;
            this.destroy$ = destroy$;
        }
        ngOnChanges(changes) {
            const { nzAutoFocus, nzCount, nzValue } = changes;
            if (nzAutoFocus && !nzAutoFocus.isFirstChange()) {
                const el = this.ulElement.nativeElement;
                if (this.nzAutoFocus && !this.nzDisabled) {
                    this.renderer.setAttribute(el, 'autofocus', 'autofocus');
                }
                else {
                    this.renderer.removeAttribute(el, 'autofocus');
                }
            }
            if (nzCount) {
                this.updateStarArray();
            }
            if (nzValue) {
                this.updateStarStyle();
            }
        }
        ngOnInit() {
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.cdr.markForCheck());
            this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
            fromEventOutsideAngular(this.ulElement.nativeElement, 'focus')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                this.isFocused = true;
                if (this.nzOnFocus.observers.length) {
                    this.ngZone.run(() => this.nzOnFocus.emit(event));
                }
            });
            fromEventOutsideAngular(this.ulElement.nativeElement, 'blur')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                this.isFocused = false;
                if (this.nzOnBlur.observers.length) {
                    this.ngZone.run(() => this.nzOnBlur.emit(event));
                }
            });
        }
        onItemClick(index, isHalf) {
            if (this.nzDisabled) {
                return;
            }
            this.hoverValue = index + 1;
            const actualValue = isHalf ? index + 0.5 : index + 1;
            if (this.nzValue === actualValue) {
                if (this.nzAllowClear) {
                    this.nzValue = 0;
                    this.onChange(this.nzValue);
                }
            }
            else {
                this.nzValue = actualValue;
                this.onChange(this.nzValue);
            }
            this.updateStarStyle();
        }
        onItemHover(index, isHalf) {
            if (this.nzDisabled) {
                return;
            }
            if (this.hoverValue !== index + 1 || isHalf !== this.hasHalf) {
                this.hoverValue = index + 1;
                this.hasHalf = isHalf;
                this.updateStarStyle();
            }
            this.nzOnHoverChange.emit(this.hoverValue);
        }
        onRateLeave() {
            this.hasHalf = !Number.isInteger(this.nzValue);
            this.hoverValue = Math.ceil(this.nzValue);
            this.nzOnHoverChange.emit(this.hoverValue);
            this.updateStarStyle();
        }
        focus() {
            this.ulElement.nativeElement.focus();
        }
        blur() {
            this.ulElement.nativeElement.blur();
        }
        onKeyDown(e) {
            const oldVal = this.nzValue;
            if (e.keyCode === RIGHT_ARROW && this.nzValue < this.nzCount) {
                this.nzValue += this.nzAllowHalf ? 0.5 : 1;
            }
            else if (e.keyCode === LEFT_ARROW && this.nzValue > 0) {
                this.nzValue -= this.nzAllowHalf ? 0.5 : 1;
            }
            if (oldVal !== this.nzValue) {
                this.onChange(this.nzValue);
                this.nzOnKeyDown.emit(e);
                this.updateStarStyle();
                this.cdr.markForCheck();
            }
        }
        updateStarArray() {
            this.starArray = Array(this.nzCount)
                .fill(0)
                .map((_, i) => i);
            this.updateStarStyle();
        }
        updateStarStyle() {
            this.starStyleArray = this.starArray.map(i => {
                const prefix = 'ant-rate-star';
                const value = i + 1;
                return {
                    [`${prefix}-full`]: value < this.hoverValue || (!this.hasHalf && value === this.hoverValue),
                    [`${prefix}-half`]: this.hasHalf && value === this.hoverValue,
                    [`${prefix}-active`]: this.hasHalf && value === this.hoverValue,
                    [`${prefix}-zero`]: value > this.hoverValue,
                    [`${prefix}-focused`]: this.hasHalf && value === this.hoverValue && this.isFocused
                };
            });
        }
        writeValue(value) {
            this.nzValue = value || 0;
            this.updateStarArray();
            this.cdr.markForCheck();
        }
        setDisabledState(isDisabled) {
            this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
            this.isNzDisableFirstChange = false;
            this.cdr.markForCheck();
        }
        registerOnChange(fn) {
            this.onChange = fn;
        }
        registerOnTouched(fn) {
            this.onTouched = fn;
        }
        onChange = () => null;
        onTouched = () => null;
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRateComponent, deps: [{ token: i1$1.NzConfigService }, { token: i0.NgZone }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality }, { token: i3.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzRateComponent, isStandalone: true, selector: "nz-rate", inputs: { nzAllowClear: ["nzAllowClear", "nzAllowClear", booleanAttribute], nzAllowHalf: ["nzAllowHalf", "nzAllowHalf", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzAutoFocus: ["nzAutoFocus", "nzAutoFocus", booleanAttribute], nzCharacter: "nzCharacter", nzCount: ["nzCount", "nzCount", numberAttribute], nzTooltips: "nzTooltips" }, outputs: { nzOnBlur: "nzOnBlur", nzOnFocus: "nzOnFocus", nzOnHoverChange: "nzOnHoverChange", nzOnKeyDown: "nzOnKeyDown" }, providers: [
                NzDestroyService,
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => NzRateComponent),
                    multi: true
                }
            ], viewQueries: [{ propertyName: "ulElement", first: true, predicate: ["ulElement"], descendants: true, static: true }], exportAs: ["nzRate"], usesOnChanges: true, ngImport: i0, template: `
    <ul
      #ulElement
      class="ant-rate"
      [class.ant-rate-disabled]="nzDisabled"
      [class.ant-rate-rtl]="dir === 'rtl'"
      [class]="classMap"
      (keydown)="onKeyDown($event); $event.preventDefault()"
      (mouseleave)="onRateLeave(); $event.stopPropagation()"
      [tabindex]="nzDisabled ? -1 : 1"
    >
      @for (star of starArray; track star) {
        <li
          class="ant-rate-star"
          [class]="starStyleArray[$index] || ''"
          nz-tooltip
          [nzTooltipTitle]="nzTooltips[$index]"
        >
          <div
            nz-rate-item
            [allowHalf]="nzAllowHalf"
            [character]="nzCharacter"
            [index]="$index"
            (itemHover)="onItemHover($index, $event)"
            (itemClick)="onItemClick($index, $event)"
          ></div>
        </li>
      }
    </ul>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzToolTipModule }, { kind: "directive", type: i4.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "component", type: NzRateItemComponent, selector: "[nz-rate-item]", inputs: ["character", "index", "allowHalf"], outputs: ["itemHover", "itemClick"], exportAs: ["nzRateItem"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRateComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-rate',
                    exportAs: 'nzRate',
                    preserveWhitespaces: false,
                    template: `
    <ul
      #ulElement
      class="ant-rate"
      [class.ant-rate-disabled]="nzDisabled"
      [class.ant-rate-rtl]="dir === 'rtl'"
      [class]="classMap"
      (keydown)="onKeyDown($event); $event.preventDefault()"
      (mouseleave)="onRateLeave(); $event.stopPropagation()"
      [tabindex]="nzDisabled ? -1 : 1"
    >
      @for (star of starArray; track star) {
        <li
          class="ant-rate-star"
          [class]="starStyleArray[$index] || ''"
          nz-tooltip
          [nzTooltipTitle]="nzTooltips[$index]"
        >
          <div
            nz-rate-item
            [allowHalf]="nzAllowHalf"
            [character]="nzCharacter"
            [index]="$index"
            (itemHover)="onItemHover($index, $event)"
            (itemClick)="onItemClick($index, $event)"
          ></div>
        </li>
      }
    </ul>
  `,
                    providers: [
                        NzDestroyService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzRateComponent),
                            multi: true
                        }
                    ],
                    imports: [NzToolTipModule, NzRateItemComponent, NzToolTipModule]
                }]
        }], ctorParameters: () => [{ type: i1$1.NzConfigService }, { type: i0.NgZone }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality }, { type: i3.NzDestroyService }], propDecorators: { ulElement: [{
                type: ViewChild,
                args: ['ulElement', { static: true }]
            }], nzAllowClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAllowHalf: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAutoFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzCharacter: [{
                type: Input
            }], nzCount: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzTooltips: [{
                type: Input
            }], nzOnBlur: [{
                type: Output
            }], nzOnFocus: [{
                type: Output
            }], nzOnHoverChange: [{
                type: Output
            }], nzOnKeyDown: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRateModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzRateModule, imports: [NzRateComponent, NzRateItemComponent], exports: [NzRateComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRateModule, imports: [NzRateComponent, NzRateItemComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzRateComponent, NzRateItemComponent],
                    exports: [NzRateComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzRateComponent, NzRateItemComponent, NzRateModule };
//# sourceMappingURL=ng-zorro-antd-rate.mjs.map
