import * as i0 from '@angular/core';
import { numberAttribute, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { __esDecorate, __runInitializers } from 'tslib';
import { NgTemplateOutlet } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i4 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { isNotNil, numberAttributeWithZeroFallback } from 'ng-zorro-antd/core/util';
import * as i3 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i2 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function stripPercentToNumber(percent) {
    return +percent.replace('%', '');
}
const sortGradient = (gradients) => {
    let tempArr = [];
    Object.keys(gradients).forEach(key => {
        const value = gradients[key];
        const formatKey = stripPercentToNumber(key);
        if (!isNaN(formatKey)) {
            tempArr.push({
                key: formatKey,
                value
            });
        }
    });
    tempArr = tempArr.sort((a, b) => a.key - b.key);
    return tempArr;
};
const handleCircleGradient = (strokeColor) => sortGradient(strokeColor).map(({ key, value }) => ({ offset: `${key}%`, color: value }));
const handleLinearGradient = (strokeColor) => {
    const { from = '#1890ff', to = '#1890ff', direction = 'to right', ...rest } = strokeColor;
    if (Object.keys(rest).length !== 0) {
        const sortedGradients = sortGradient(rest)
            .map(({ key, value }) => `${value} ${key}%`)
            .join(', ');
        return `linear-gradient(${direction}, ${sortedGradients})`;
    }
    return `linear-gradient(${direction}, ${from}, ${to})`;
};

let gradientIdSeed = 0;
const NZ_CONFIG_MODULE_NAME = 'progress';
const statusIconNameMap = new Map([
    ['success', 'check'],
    ['exception', 'close']
]);
const statusColorMap = new Map([
    ['normal', '#108ee9'],
    ['exception', '#ff5500'],
    ['success', '#87d068']
]);
const defaultFormatter = (p) => `${p}%`;
let NzProgressComponent = (() => {
    let _nzShowInfo_decorators;
    let _nzShowInfo_initializers = [];
    let _nzShowInfo_extraInitializers = [];
    let _nzStrokeColor_decorators;
    let _nzStrokeColor_initializers = [];
    let _nzStrokeColor_extraInitializers = [];
    let _nzSize_decorators;
    let _nzSize_initializers = [];
    let _nzSize_extraInitializers = [];
    let _nzStrokeWidth_decorators;
    let _nzStrokeWidth_initializers = [];
    let _nzStrokeWidth_extraInitializers = [];
    let _nzGapDegree_decorators;
    let _nzGapDegree_initializers = [];
    let _nzGapDegree_extraInitializers = [];
    let _nzGapPosition_decorators;
    let _nzGapPosition_initializers = [];
    let _nzGapPosition_extraInitializers = [];
    let _nzStrokeLinecap_decorators;
    let _nzStrokeLinecap_initializers = [];
    let _nzStrokeLinecap_extraInitializers = [];
    return class NzProgressComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzShowInfo_decorators = [WithConfig()];
            _nzStrokeColor_decorators = [WithConfig()];
            _nzSize_decorators = [WithConfig()];
            _nzStrokeWidth_decorators = [WithConfig()];
            _nzGapDegree_decorators = [WithConfig()];
            _nzGapPosition_decorators = [WithConfig()];
            _nzStrokeLinecap_decorators = [WithConfig()];
            __esDecorate(null, null, _nzShowInfo_decorators, { kind: "field", name: "nzShowInfo", static: false, private: false, access: { has: obj => "nzShowInfo" in obj, get: obj => obj.nzShowInfo, set: (obj, value) => { obj.nzShowInfo = value; } }, metadata: _metadata }, _nzShowInfo_initializers, _nzShowInfo_extraInitializers);
            __esDecorate(null, null, _nzStrokeColor_decorators, { kind: "field", name: "nzStrokeColor", static: false, private: false, access: { has: obj => "nzStrokeColor" in obj, get: obj => obj.nzStrokeColor, set: (obj, value) => { obj.nzStrokeColor = value; } }, metadata: _metadata }, _nzStrokeColor_initializers, _nzStrokeColor_extraInitializers);
            __esDecorate(null, null, _nzSize_decorators, { kind: "field", name: "nzSize", static: false, private: false, access: { has: obj => "nzSize" in obj, get: obj => obj.nzSize, set: (obj, value) => { obj.nzSize = value; } }, metadata: _metadata }, _nzSize_initializers, _nzSize_extraInitializers);
            __esDecorate(null, null, _nzStrokeWidth_decorators, { kind: "field", name: "nzStrokeWidth", static: false, private: false, access: { has: obj => "nzStrokeWidth" in obj, get: obj => obj.nzStrokeWidth, set: (obj, value) => { obj.nzStrokeWidth = value; } }, metadata: _metadata }, _nzStrokeWidth_initializers, _nzStrokeWidth_extraInitializers);
            __esDecorate(null, null, _nzGapDegree_decorators, { kind: "field", name: "nzGapDegree", static: false, private: false, access: { has: obj => "nzGapDegree" in obj, get: obj => obj.nzGapDegree, set: (obj, value) => { obj.nzGapDegree = value; } }, metadata: _metadata }, _nzGapDegree_initializers, _nzGapDegree_extraInitializers);
            __esDecorate(null, null, _nzGapPosition_decorators, { kind: "field", name: "nzGapPosition", static: false, private: false, access: { has: obj => "nzGapPosition" in obj, get: obj => obj.nzGapPosition, set: (obj, value) => { obj.nzGapPosition = value; } }, metadata: _metadata }, _nzGapPosition_initializers, _nzGapPosition_extraInitializers);
            __esDecorate(null, null, _nzStrokeLinecap_decorators, { kind: "field", name: "nzStrokeLinecap", static: false, private: false, access: { has: obj => "nzStrokeLinecap" in obj, get: obj => obj.nzStrokeLinecap, set: (obj, value) => { obj.nzStrokeLinecap = value; } }, metadata: _metadata }, _nzStrokeLinecap_initializers, _nzStrokeLinecap_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        cdr;
        nzConfigService;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzShowInfo = __runInitializers(this, _nzShowInfo_initializers, true);
        nzWidth = (__runInitializers(this, _nzShowInfo_extraInitializers), 132);
        nzStrokeColor = __runInitializers(this, _nzStrokeColor_initializers, undefined);
        nzSize = (__runInitializers(this, _nzStrokeColor_extraInitializers), __runInitializers(this, _nzSize_initializers, 'default'));
        nzFormat = __runInitializers(this, _nzSize_extraInitializers);
        nzSuccessPercent;
        nzPercent = 0;
        nzStrokeWidth = __runInitializers(this, _nzStrokeWidth_initializers, void 0);
        nzGapDegree = (__runInitializers(this, _nzStrokeWidth_extraInitializers), __runInitializers(this, _nzGapDegree_initializers, void 0));
        nzStatus = __runInitializers(this, _nzGapDegree_extraInitializers);
        nzType = 'line';
        nzGapPosition = __runInitializers(this, _nzGapPosition_initializers, 'top');
        nzStrokeLinecap = (__runInitializers(this, _nzGapPosition_extraInitializers), __runInitializers(this, _nzStrokeLinecap_initializers, 'round'));
        nzSteps = (__runInitializers(this, _nzStrokeLinecap_extraInitializers), 0);
        steps = [];
        /** Gradient style when `nzType` is `line`. */
        lineGradient = null;
        /** If user uses gradient color. */
        isGradient = false;
        /** If the linear progress is a step progress. */
        isSteps = false;
        /**
         * Each progress whose `nzType` is circle or dashboard should have unique id to
         * define `<linearGradient>`.
         */
        gradientId = gradientIdSeed++;
        /** Paths to rendered in the template. */
        progressCirclePath = [];
        circleGradient;
        trailPathStyle = null;
        pathString;
        icon;
        dir = 'ltr';
        get formatter() {
            return this.nzFormat || defaultFormatter;
        }
        get status() {
            return this.nzStatus || this.inferredStatus;
        }
        get strokeWidth() {
            return this.nzStrokeWidth || (this.nzType === 'line' && this.nzSize !== 'small' ? 8 : 6);
        }
        get isCircleStyle() {
            return this.nzType === 'circle' || this.nzType === 'dashboard';
        }
        cachedStatus = 'normal';
        inferredStatus = 'normal';
        destroy$ = new Subject();
        constructor(cdr, nzConfigService, directionality) {
            this.cdr = cdr;
            this.nzConfigService = nzConfigService;
            this.directionality = directionality;
        }
        ngOnChanges(changes) {
            const { nzSteps, nzGapPosition, nzStrokeLinecap, nzStrokeColor, nzGapDegree, nzType, nzStatus, nzPercent, nzSuccessPercent, nzStrokeWidth } = changes;
            if (nzStatus) {
                this.cachedStatus = this.nzStatus || this.cachedStatus;
            }
            if (nzPercent || nzSuccessPercent) {
                const fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
                if (fillAll) {
                    if ((isNotNil(this.nzSuccessPercent) && this.nzSuccessPercent >= 100) || this.nzSuccessPercent === undefined) {
                        this.inferredStatus = 'success';
                    }
                }
                else {
                    this.inferredStatus = this.cachedStatus;
                }
            }
            if (nzStatus || nzPercent || nzSuccessPercent || nzStrokeColor) {
                this.updateIcon();
            }
            if (nzStrokeColor) {
                this.setStrokeColor();
            }
            if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor || nzStrokeColor) {
                this.getCirclePaths();
            }
            if (nzPercent || nzSteps || nzStrokeWidth) {
                this.isSteps = this.nzSteps > 0;
                if (this.isSteps) {
                    this.getSteps();
                }
            }
        }
        ngOnInit() {
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.updateIcon();
                this.setStrokeColor();
                this.getCirclePaths();
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
        updateIcon() {
            const ret = statusIconNameMap.get(this.status);
            this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
        }
        /**
         * Calculate step render configs.
         */
        getSteps() {
            const current = Math.floor(this.nzSteps * (this.nzPercent / 100));
            const stepWidth = this.nzSize === 'small' ? 2 : 14;
            const steps = [];
            for (let i = 0; i < this.nzSteps; i++) {
                let color;
                if (i <= current - 1) {
                    color = this.nzStrokeColor;
                }
                const stepStyle = {
                    backgroundColor: `${color}`,
                    width: `${stepWidth}px`,
                    height: `${this.strokeWidth}px`
                };
                steps.push(stepStyle);
            }
            this.steps = steps;
        }
        /**
         * Calculate paths when the type is circle or dashboard.
         */
        getCirclePaths() {
            if (!this.isCircleStyle) {
                return;
            }
            const values = isNotNil(this.nzSuccessPercent) ? [this.nzSuccessPercent, this.nzPercent] : [this.nzPercent];
            // Calculate shared styles.
            const radius = 50 - this.strokeWidth / 2;
            const gapPosition = this.nzGapPosition || (this.nzType === 'circle' ? 'top' : 'bottom');
            const len = Math.PI * 2 * radius;
            const gapDegree = this.nzGapDegree || (this.nzType === 'circle' ? 0 : 75);
            let beginPositionX = 0;
            let beginPositionY = -radius;
            let endPositionX = 0;
            let endPositionY = radius * -2;
            switch (gapPosition) {
                case 'left':
                    beginPositionX = -radius;
                    beginPositionY = 0;
                    endPositionX = radius * 2;
                    endPositionY = 0;
                    break;
                case 'right':
                    beginPositionX = radius;
                    beginPositionY = 0;
                    endPositionX = radius * -2;
                    endPositionY = 0;
                    break;
                case 'bottom':
                    beginPositionY = radius;
                    endPositionY = radius * 2;
                    break;
                default:
            }
            this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
            this.trailPathStyle = {
                strokeDasharray: `${len - gapDegree}px ${len}px`,
                strokeDashoffset: `-${gapDegree / 2}px`,
                transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
            };
            // Calculate styles for each path.
            this.progressCirclePath = values
                .map((value, index) => {
                const isSuccessPercent = values.length === 2 && index === 0;
                return {
                    stroke: this.isGradient && !isSuccessPercent ? `url(#gradient-${this.gradientId})` : null,
                    strokePathStyle: {
                        stroke: !this.isGradient
                            ? isSuccessPercent
                                ? statusColorMap.get('success')
                                : this.nzStrokeColor
                            : null,
                        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
                        strokeDasharray: `${((value || 0) / 100) * (len - gapDegree)}px ${len}px`,
                        strokeDashoffset: `-${gapDegree / 2}px`
                    }
                };
            })
                .reverse();
        }
        setStrokeColor() {
            const color = this.nzStrokeColor;
            const isGradient = (this.isGradient = !!color && typeof color !== 'string');
            if (isGradient && !this.isCircleStyle) {
                this.lineGradient = handleLinearGradient(color);
            }
            else if (isGradient && this.isCircleStyle) {
                this.circleGradient = handleCircleGradient(this.nzStrokeColor);
            }
            else {
                this.lineGradient = null;
                this.circleGradient = [];
            }
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzProgressComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: i2.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzProgressComponent, isStandalone: true, selector: "nz-progress", inputs: { nzShowInfo: "nzShowInfo", nzWidth: "nzWidth", nzStrokeColor: "nzStrokeColor", nzSize: "nzSize", nzFormat: "nzFormat", nzSuccessPercent: ["nzSuccessPercent", "nzSuccessPercent", numberAttributeWithZeroFallback], nzPercent: ["nzPercent", "nzPercent", numberAttribute], nzStrokeWidth: ["nzStrokeWidth", "nzStrokeWidth", numberAttributeWithZeroFallback], nzGapDegree: ["nzGapDegree", "nzGapDegree", numberAttributeWithZeroFallback], nzStatus: "nzStatus", nzType: "nzType", nzGapPosition: "nzGapPosition", nzStrokeLinecap: "nzStrokeLinecap", nzSteps: ["nzSteps", "nzSteps", numberAttribute] }, exportAs: ["nzProgress"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #progressInfoTemplate>
      @if (nzShowInfo) {
        <span class="ant-progress-text">
          @if ((status === 'exception' || status === 'success') && !nzFormat) {
            <nz-icon [nzType]="icon" />
          } @else {
            <ng-container *nzStringTemplateOutlet="formatter; context: { $implicit: nzPercent }; let formatter">
              {{ formatter(nzPercent) }}
            </ng-container>
          }
        </span>
      }
    </ng-template>

    <div
      [class]="'ant-progress ant-progress-status-' + status"
      [class.ant-progress-line]="nzType === 'line'"
      [class.ant-progress-small]="nzSize === 'small'"
      [class.ant-progress-default]="nzSize === 'default'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleStyle"
      [class.ant-progress-steps]="isSteps"
      [class.ant-progress-rtl]="dir === 'rtl'"
    >
      @if (nzType === 'line') {
        <div>
          <!-- normal line style -->
          @if (isSteps) {
            <div class="ant-progress-steps-outer">
              @for (step of steps; track $index) {
                <div class="ant-progress-steps-item" [style]="step"></div>
              }
              <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
            </div>
          } @else {
            <div class="ant-progress-outer">
              <div class="ant-progress-inner">
                <div
                  class="ant-progress-bg"
                  [style.width.%]="nzPercent"
                  [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                  [style.background]="!isGradient ? nzStrokeColor : null"
                  [style.background-image]="isGradient ? lineGradient : null"
                  [style.height.px]="strokeWidth"
                ></div>
                @if (nzSuccessPercent || nzSuccessPercent === 0) {
                  <div
                    class="ant-progress-success-bg"
                    [style.width.%]="nzSuccessPercent"
                    [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                    [style.height.px]="strokeWidth"
                  ></div>
                }
              </div>
            </div>
            <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
          }
        </div>
      }
      <!-- line progress -->

      <!-- circle / dashboard progress -->

      @if (isCircleStyle) {
        <div
          [style.width.px]="this.nzWidth"
          [style.height.px]="this.nzWidth"
          [style.fontSize.px]="this.nzWidth * 0.15 + 6"
          class="ant-progress-inner"
          [class.ant-progress-circle-gradient]="isGradient"
        >
          <svg class="ant-progress-circle " viewBox="0 0 100 100">
            @if (isGradient) {
              <defs>
                <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
                  @for (i of circleGradient; track $index) {
                    <stop [attr.offset]="i.offset" [attr.stop-color]="i.color"></stop>
                  }
                </linearGradient>
              </defs>
            }

            <path
              class="ant-progress-circle-trail"
              stroke="#f3f3f3"
              fill-opacity="0"
              [attr.stroke-width]="strokeWidth"
              [attr.d]="pathString"
              [style]="trailPathStyle"
            ></path>
            @for (p of progressCirclePath; track $index) {
              <path
                class="ant-progress-circle-path"
                fill-opacity="0"
                [attr.d]="pathString"
                [attr.stroke-linecap]="nzStrokeLinecap"
                [attr.stroke]="p.stroke"
                [attr.stroke-width]="nzPercent ? strokeWidth : 0"
                [style]="p.strokePathStyle"
              ></path>
            }
          </svg>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
        </div>
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i3.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i4.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzProgressComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-progress',
                    exportAs: 'nzProgress',
                    preserveWhitespaces: false,
                    imports: [NzIconModule, NzOutletModule, NgTemplateOutlet],
                    template: `
    <ng-template #progressInfoTemplate>
      @if (nzShowInfo) {
        <span class="ant-progress-text">
          @if ((status === 'exception' || status === 'success') && !nzFormat) {
            <nz-icon [nzType]="icon" />
          } @else {
            <ng-container *nzStringTemplateOutlet="formatter; context: { $implicit: nzPercent }; let formatter">
              {{ formatter(nzPercent) }}
            </ng-container>
          }
        </span>
      }
    </ng-template>

    <div
      [class]="'ant-progress ant-progress-status-' + status"
      [class.ant-progress-line]="nzType === 'line'"
      [class.ant-progress-small]="nzSize === 'small'"
      [class.ant-progress-default]="nzSize === 'default'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleStyle"
      [class.ant-progress-steps]="isSteps"
      [class.ant-progress-rtl]="dir === 'rtl'"
    >
      @if (nzType === 'line') {
        <div>
          <!-- normal line style -->
          @if (isSteps) {
            <div class="ant-progress-steps-outer">
              @for (step of steps; track $index) {
                <div class="ant-progress-steps-item" [style]="step"></div>
              }
              <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
            </div>
          } @else {
            <div class="ant-progress-outer">
              <div class="ant-progress-inner">
                <div
                  class="ant-progress-bg"
                  [style.width.%]="nzPercent"
                  [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                  [style.background]="!isGradient ? nzStrokeColor : null"
                  [style.background-image]="isGradient ? lineGradient : null"
                  [style.height.px]="strokeWidth"
                ></div>
                @if (nzSuccessPercent || nzSuccessPercent === 0) {
                  <div
                    class="ant-progress-success-bg"
                    [style.width.%]="nzSuccessPercent"
                    [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                    [style.height.px]="strokeWidth"
                  ></div>
                }
              </div>
            </div>
            <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
          }
        </div>
      }
      <!-- line progress -->

      <!-- circle / dashboard progress -->

      @if (isCircleStyle) {
        <div
          [style.width.px]="this.nzWidth"
          [style.height.px]="this.nzWidth"
          [style.fontSize.px]="this.nzWidth * 0.15 + 6"
          class="ant-progress-inner"
          [class.ant-progress-circle-gradient]="isGradient"
        >
          <svg class="ant-progress-circle " viewBox="0 0 100 100">
            @if (isGradient) {
              <defs>
                <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
                  @for (i of circleGradient; track $index) {
                    <stop [attr.offset]="i.offset" [attr.stop-color]="i.color"></stop>
                  }
                </linearGradient>
              </defs>
            }

            <path
              class="ant-progress-circle-trail"
              stroke="#f3f3f3"
              fill-opacity="0"
              [attr.stroke-width]="strokeWidth"
              [attr.d]="pathString"
              [style]="trailPathStyle"
            ></path>
            @for (p of progressCirclePath; track $index) {
              <path
                class="ant-progress-circle-path"
                fill-opacity="0"
                [attr.d]="pathString"
                [attr.stroke-linecap]="nzStrokeLinecap"
                [attr.stroke]="p.stroke"
                [attr.stroke-width]="nzPercent ? strokeWidth : 0"
                [style]="p.strokePathStyle"
              ></path>
            }
          </svg>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
        </div>
      }
    </div>
  `
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: i2.Directionality }], propDecorators: { nzShowInfo: [{
                type: Input
            }], nzWidth: [{
                type: Input
            }], nzStrokeColor: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzFormat: [{
                type: Input
            }], nzSuccessPercent: [{
                type: Input,
                args: [{ transform: numberAttributeWithZeroFallback }]
            }], nzPercent: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzStrokeWidth: [{
                type: Input,
                args: [{ transform: numberAttributeWithZeroFallback }]
            }], nzGapDegree: [{
                type: Input,
                args: [{ transform: numberAttributeWithZeroFallback }]
            }], nzStatus: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzGapPosition: [{
                type: Input
            }], nzStrokeLinecap: [{
                type: Input
            }], nzSteps: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzProgressModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzProgressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzProgressModule, imports: [NzProgressComponent], exports: [NzProgressComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzProgressModule, imports: [NzProgressComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzProgressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzProgressComponent],
                    exports: [NzProgressComponent]
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

export { NzProgressComponent, NzProgressModule };
//# sourceMappingURL=ng-zorro-antd-progress.mjs.map
