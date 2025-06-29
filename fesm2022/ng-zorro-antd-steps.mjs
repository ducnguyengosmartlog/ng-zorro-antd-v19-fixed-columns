import * as i0 from '@angular/core';
import { TemplateRef, booleanAttribute, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, Component, EventEmitter, Output, ContentChildren, NgModule } from '@angular/core';
import { Subject, Subscription, merge } from 'rxjs';
import { filter, takeUntil, startWith } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular, toBoolean } from 'ng-zorro-antd/core/util';
import { NgTemplateOutlet } from '@angular/common';
import * as i4 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i3 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i2 from 'ng-zorro-antd/progress';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import * as i1$1 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzStepComponent {
    cdr;
    destroy$;
    processDotTemplate;
    itemContainer;
    nzTitle;
    nzSubtitle;
    nzDescription;
    nzDisabled = false;
    nzPercentage = null;
    nzSize = 'default';
    get nzStatus() {
        return this._status;
    }
    set nzStatus(status) {
        this._status = status;
        this.isCustomStatus = true;
    }
    isCustomStatus = false;
    _status = 'wait';
    get nzIcon() {
        return this._icon;
    }
    set nzIcon(value) {
        if (!(value instanceof TemplateRef)) {
            this.oldAPIIcon = typeof value === 'string' && value.indexOf('anticon') > -1;
        }
        this._icon = value;
    }
    oldAPIIcon = true;
    _icon;
    customProcessTemplate; // Set by parent.
    direction = 'horizontal';
    index = 0;
    last = false;
    outStatus = 'process';
    showProcessDot = false;
    clickable = false;
    clickOutsideAngular$ = new Subject();
    nullProcessFormat = () => null;
    get showProgress() {
        return (this.nzPercentage !== null &&
            !this.nzIcon &&
            this.nzStatus === 'process' &&
            this.nzPercentage >= 0 &&
            this.nzPercentage <= 100);
    }
    get currentIndex() {
        return this._currentIndex;
    }
    set currentIndex(current) {
        this._currentIndex = current;
        if (!this.isCustomStatus) {
            this._status = current > this.index ? 'finish' : current === this.index ? this.outStatus || '' : 'wait';
        }
    }
    _currentIndex = 0;
    constructor(cdr, destroy$) {
        this.cdr = cdr;
        this.destroy$ = destroy$;
    }
    ngOnInit() {
        fromEventOutsideAngular(this.itemContainer.nativeElement, 'click')
            .pipe(filter(() => this.clickable && this.currentIndex !== this.index && !this.nzDisabled), takeUntil(this.destroy$))
            .subscribe(() => {
            this.clickOutsideAngular$.next(this.index);
        });
    }
    enable() {
        this.nzDisabled = false;
        this.cdr.markForCheck();
    }
    disable() {
        this.nzDisabled = true;
        this.cdr.markForCheck();
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStepComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzStepComponent, isStandalone: true, selector: "nz-step", inputs: { nzTitle: "nzTitle", nzSubtitle: "nzSubtitle", nzDescription: "nzDescription", nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzPercentage: "nzPercentage", nzSize: "nzSize", nzStatus: "nzStatus", nzIcon: "nzIcon" }, host: { properties: { "class.ant-steps-item-wait": "nzStatus === \"wait\"", "class.ant-steps-item-process": "nzStatus === \"process\"", "class.ant-steps-item-finish": "nzStatus === \"finish\"", "class.ant-steps-item-error": "nzStatus === \"error\"", "class.ant-steps-item-active": "currentIndex === index", "class.ant-steps-item-disabled": "nzDisabled", "class.ant-steps-item-custom": "!!nzIcon", "class.ant-steps-next-error": "(outStatus === \"error\") && (currentIndex === index + 1)" }, classAttribute: "ant-steps-item" }, providers: [NzDestroyService], viewQueries: [{ propertyName: "processDotTemplate", first: true, predicate: ["processDotTemplate"], descendants: true }, { propertyName: "itemContainer", first: true, predicate: ["itemContainer"], descendants: true, static: true }], exportAs: ["nzStep"], ngImport: i0, template: `
    <div
      #itemContainer
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
    >
      @if (!last) {
        <div class="ant-steps-item-tail"></div>
      }
      <div class="ant-steps-item-icon">
        @if (!showProcessDot) {
          @if (showProgress) {
            <div class="ant-steps-progress-icon">
              <nz-progress
                [nzPercent]="nzPercentage"
                nzType="circle"
                [nzWidth]="nzSize === 'small' ? 32 : 40"
                [nzFormat]="nullProcessFormat"
                [nzStrokeWidth]="4"
              ></nz-progress>
            </div>
          }
          @if (nzStatus === 'finish' && !nzIcon) {
            <span class="ant-steps-icon"><nz-icon nzType="check" /></span>
          }
          @if (nzStatus === 'error') {
            <span class="ant-steps-icon"><nz-icon nzType="close" /></span>
          }
          @if ((nzStatus === 'process' || nzStatus === 'wait') && !nzIcon) {
            <span class="ant-steps-icon">
              {{ index + 1 }}
            </span>
          }
          @if (nzIcon) {
            <span class="ant-steps-icon">
              <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                <nz-icon [nzType]="icon" />
              </ng-container>
            </span>
          }
        }
        @if (showProcessDot) {
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            ></ng-template>
          </span>
        }
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          @if (nzSubtitle) {
            <div class="ant-steps-item-subtitle">
              <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
            </div>
          }
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzProgressModule }, { kind: "component", type: i2.NzProgressComponent, selector: "nz-progress", inputs: ["nzShowInfo", "nzWidth", "nzStrokeColor", "nzSize", "nzFormat", "nzSuccessPercent", "nzPercent", "nzStrokeWidth", "nzGapDegree", "nzStatus", "nzType", "nzGapPosition", "nzStrokeLinecap", "nzSteps"], exportAs: ["nzProgress"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStepComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-step',
                    exportAs: 'nzStep',
                    preserveWhitespaces: false,
                    template: `
    <div
      #itemContainer
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
    >
      @if (!last) {
        <div class="ant-steps-item-tail"></div>
      }
      <div class="ant-steps-item-icon">
        @if (!showProcessDot) {
          @if (showProgress) {
            <div class="ant-steps-progress-icon">
              <nz-progress
                [nzPercent]="nzPercentage"
                nzType="circle"
                [nzWidth]="nzSize === 'small' ? 32 : 40"
                [nzFormat]="nullProcessFormat"
                [nzStrokeWidth]="4"
              ></nz-progress>
            </div>
          }
          @if (nzStatus === 'finish' && !nzIcon) {
            <span class="ant-steps-icon"><nz-icon nzType="check" /></span>
          }
          @if (nzStatus === 'error') {
            <span class="ant-steps-icon"><nz-icon nzType="close" /></span>
          }
          @if ((nzStatus === 'process' || nzStatus === 'wait') && !nzIcon) {
            <span class="ant-steps-icon">
              {{ index + 1 }}
            </span>
          }
          @if (nzIcon) {
            <span class="ant-steps-icon">
              <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                <nz-icon [nzType]="icon" />
              </ng-container>
            </span>
          }
        }
        @if (showProcessDot) {
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            ></ng-template>
          </span>
        }
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          @if (nzSubtitle) {
            <div class="ant-steps-item-subtitle">
              <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
            </div>
          }
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `,
                    host: {
                        class: 'ant-steps-item',
                        '[class.ant-steps-item-wait]': 'nzStatus === "wait"',
                        '[class.ant-steps-item-process]': 'nzStatus === "process"',
                        '[class.ant-steps-item-finish]': 'nzStatus === "finish"',
                        '[class.ant-steps-item-error]': 'nzStatus === "error"',
                        '[class.ant-steps-item-active]': 'currentIndex === index',
                        '[class.ant-steps-item-disabled]': 'nzDisabled',
                        '[class.ant-steps-item-custom]': '!!nzIcon',
                        '[class.ant-steps-next-error]': '(outStatus === "error") && (currentIndex === index + 1)'
                    },
                    providers: [NzDestroyService],
                    imports: [NzProgressModule, NzIconModule, NzOutletModule, NgTemplateOutlet]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.NzDestroyService }], propDecorators: { processDotTemplate: [{
                type: ViewChild,
                args: ['processDotTemplate', { static: false }]
            }], itemContainer: [{
                type: ViewChild,
                args: ['itemContainer', { static: true }]
            }], nzTitle: [{
                type: Input
            }], nzSubtitle: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzPercentage: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }] } });

class NzStepsComponent {
    ngZone;
    cdr;
    directionality;
    destroy$;
    static ngAcceptInputType_nzProgressDot;
    steps;
    nzCurrent = 0;
    nzDirection = 'horizontal';
    nzLabelPlacement = 'horizontal';
    nzType = 'default';
    nzSize = 'default';
    nzStartIndex = 0;
    nzStatus = 'process';
    set nzProgressDot(value) {
        if (value instanceof TemplateRef) {
            this.showProcessDot = true;
            this.customProcessDotTemplate = value;
        }
        else {
            this.showProcessDot = toBoolean(value);
        }
        this.updateChildrenSteps();
    }
    nzIndexChange = new EventEmitter();
    indexChangeSubscription = Subscription.EMPTY;
    showProcessDot = false;
    showProgress = false;
    customProcessDotTemplate;
    dir = 'ltr';
    constructor(ngZone, cdr, directionality, destroy$) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.directionality = directionality;
        this.destroy$ = destroy$;
    }
    ngOnChanges(changes) {
        if (changes.nzStartIndex || changes.nzDirection || changes.nzStatus || changes.nzCurrent || changes.nzSize) {
            this.updateChildrenSteps();
        }
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.updateChildrenSteps();
    }
    ngAfterContentInit() {
        if (this.steps) {
            this.steps.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
                this.updateHostProgressClass();
                this.updateChildrenSteps();
            });
        }
    }
    updateHostProgressClass() {
        if (this.steps && !this.showProcessDot) {
            this.showProgress = !!this.steps.toArray().find(step => step.nzPercentage !== null);
        }
    }
    updateChildrenSteps() {
        if (this.steps) {
            const length = this.steps.length;
            this.steps.toArray().forEach((step, index) => {
                Promise.resolve().then(() => {
                    step.nzSize = this.nzSize;
                    step.outStatus = this.nzStatus;
                    step.showProcessDot = this.showProcessDot;
                    if (this.customProcessDotTemplate) {
                        step.customProcessTemplate = this.customProcessDotTemplate;
                    }
                    step.clickable = this.nzIndexChange.observers.length > 0;
                    step.direction = this.nzDirection;
                    step.index = index + this.nzStartIndex;
                    step.currentIndex = this.nzCurrent;
                    step.last = length === index + 1;
                    step.markForCheck();
                });
            });
            this.indexChangeSubscription.unsubscribe();
            this.indexChangeSubscription = merge(...this.steps.map(step => step.clickOutsideAngular$))
                .pipe(takeUntil(this.destroy$))
                .subscribe(index => {
                if (this.nzIndexChange.observers.length) {
                    this.ngZone.run(() => this.nzIndexChange.emit(index));
                }
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStepsComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i1$1.Directionality }, { token: i1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzStepsComponent, isStandalone: true, selector: "nz-steps", inputs: { nzCurrent: "nzCurrent", nzDirection: "nzDirection", nzLabelPlacement: "nzLabelPlacement", nzType: "nzType", nzSize: "nzSize", nzStartIndex: "nzStartIndex", nzStatus: "nzStatus", nzProgressDot: "nzProgressDot" }, outputs: { nzIndexChange: "nzIndexChange" }, host: { properties: { "class.ant-steps-horizontal": "nzDirection === 'horizontal'", "class.ant-steps-vertical": "nzDirection === 'vertical'", "class.ant-steps-label-horizontal": "nzDirection === 'horizontal'", "class.ant-steps-label-vertical": "(showProcessDot || nzLabelPlacement === 'vertical') && nzDirection === 'horizontal'", "class.ant-steps-dot": "showProcessDot", "class.ant-steps-small": "nzSize === 'small'", "class.ant-steps-navigation": "nzType === 'navigation'", "class.ant-steps-rtl": "dir === 'rtl'", "class.ant-steps-with-progress": "showProgress" }, classAttribute: "ant-steps" }, providers: [NzDestroyService], queries: [{ propertyName: "steps", predicate: NzStepComponent }], exportAs: ["nzSteps"], usesOnChanges: true, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStepsComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    selector: 'nz-steps',
                    exportAs: 'nzSteps',
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'ant-steps',
                        '[class.ant-steps-horizontal]': `nzDirection === 'horizontal'`,
                        '[class.ant-steps-vertical]': `nzDirection === 'vertical'`,
                        '[class.ant-steps-label-horizontal]': `nzDirection === 'horizontal'`,
                        '[class.ant-steps-label-vertical]': `(showProcessDot || nzLabelPlacement === 'vertical') && nzDirection === 'horizontal'`,
                        '[class.ant-steps-dot]': 'showProcessDot',
                        '[class.ant-steps-small]': `nzSize === 'small'`,
                        '[class.ant-steps-navigation]': `nzType === 'navigation'`,
                        '[class.ant-steps-rtl]': `dir === 'rtl'`,
                        '[class.ant-steps-with-progress]': 'showProgress'
                    },
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1$1.Directionality }, { type: i1.NzDestroyService }], propDecorators: { steps: [{
                type: ContentChildren,
                args: [NzStepComponent]
            }], nzCurrent: [{
                type: Input
            }], nzDirection: [{
                type: Input
            }], nzLabelPlacement: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzStartIndex: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzProgressDot: [{
                type: Input
            }], nzIndexChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzStepsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStepsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzStepsModule, imports: [NzStepsComponent, NzStepComponent], exports: [NzStepsComponent, NzStepComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStepsModule, imports: [NzStepComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzStepsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzStepsComponent, NzStepComponent],
                    exports: [NzStepsComponent, NzStepComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzStepComponent, NzStepsComponent, NzStepsModule };
//# sourceMappingURL=ng-zorro-antd-steps.mjs.map
