import { Directionality } from '@angular/cdk/bidi';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { input, output, computed, ChangeDetectionStrategy, ViewEncapsulation, Component, booleanAttribute, viewChild, inject, ElementRef, contentChildren, linkedSignal, signal, NgModule } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Subject, merge, takeUntil } from 'rxjs';
import { startWith, pairwise } from 'rxjs/operators';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { getEventWithPoint } from 'ng-zorro-antd/resizable';
import * as i1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSplitterBarComponent {
    ariaNow = input.required();
    ariaMin = input.required();
    ariaMax = input.required();
    active = input(false);
    resizable = input(true);
    vertical = input();
    lazy = input(false);
    collapsible = input();
    constrainedOffset = input();
    offsetStart = output();
    collapse = output();
    previewTransform = computed(() => {
        const offset = coerceCssPixelValue(this.constrainedOffset());
        return this.vertical() ? `translateY(${offset})` : `translateX(${offset})`;
    });
    resizeStartEvent(event) {
        if (this.resizable()) {
            const { pageX, pageY } = getEventWithPoint(event);
            this.offsetStart.emit([pageX, pageY]);
        }
    }
    collapseEvent(type) {
        this.collapse.emit(type);
    }
    getValidNumber(num) {
        return typeof num === 'number' && !isNaN(num) ? Math.round(num) : 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSplitterBarComponent, isStandalone: true, selector: "[nz-splitter-bar]", inputs: { ariaNow: { classPropertyName: "ariaNow", publicName: "ariaNow", isSignal: true, isRequired: true, transformFunction: null }, ariaMin: { classPropertyName: "ariaMin", publicName: "ariaMin", isSignal: true, isRequired: true, transformFunction: null }, ariaMax: { classPropertyName: "ariaMax", publicName: "ariaMax", isSignal: true, isRequired: true, transformFunction: null }, active: { classPropertyName: "active", publicName: "active", isSignal: true, isRequired: false, transformFunction: null }, resizable: { classPropertyName: "resizable", publicName: "resizable", isSignal: true, isRequired: false, transformFunction: null }, vertical: { classPropertyName: "vertical", publicName: "vertical", isSignal: true, isRequired: false, transformFunction: null }, lazy: { classPropertyName: "lazy", publicName: "lazy", isSignal: true, isRequired: false, transformFunction: null }, collapsible: { classPropertyName: "collapsible", publicName: "collapsible", isSignal: true, isRequired: false, transformFunction: null }, constrainedOffset: { classPropertyName: "constrainedOffset", publicName: "constrainedOffset", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { offsetStart: "offsetStart", collapse: "collapse" }, host: { attributes: { "role": "separator" }, properties: { "attr.aria-valuenow": "getValidNumber(ariaNow())", "attr.aria-valuemin": "getValidNumber(ariaMin())", "attr.aria-valuemax": "getValidNumber(ariaMax())" }, classAttribute: "ant-splitter-bar" }, ngImport: i0, template: `
    @if (lazy()) {
      @let preview = active() && !!this.constrainedOffset();
      <div
        class="ant-splitter-bar-preview"
        [class.ant-splitter-bar-preview-active]="preview"
        [style.transform]="preview ? previewTransform() : null"
      ></div>
    }

    <div
      class="ant-splitter-bar-dragger"
      [class.ant-splitter-bar-dragger-disabled]="!resizable()"
      [class.ant-splitter-bar-dragger-active]="active()"
      (mousedown)="resizeStartEvent($event)"
      (touchstart)="resizeStartEvent($event)"
    ></div>

    @if (collapsible()?.start) {
      <div class="ant-splitter-bar-collapse-bar ant-splitter-bar-collapse-bar-start" (click)="collapseEvent('start')">
        <nz-icon
          [nzType]="vertical() ? 'up' : 'left'"
          class="ant-splitter-bar-collapse-icon ant-splitter-bar-collapse-start"
        />
      </div>
    }

    @if (collapsible()?.end) {
      <div class="ant-splitter-bar-collapse-bar ant-splitter-bar-collapse-bar-end" (click)="collapseEvent('end')">
        <nz-icon
          [nzType]="vertical() ? 'down' : 'right'"
          class="ant-splitter-bar-collapse-icon ant-splitter-bar-collapse-end"
        />
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-splitter-bar]',
                    imports: [NzIconModule],
                    template: `
    @if (lazy()) {
      @let preview = active() && !!this.constrainedOffset();
      <div
        class="ant-splitter-bar-preview"
        [class.ant-splitter-bar-preview-active]="preview"
        [style.transform]="preview ? previewTransform() : null"
      ></div>
    }

    <div
      class="ant-splitter-bar-dragger"
      [class.ant-splitter-bar-dragger-disabled]="!resizable()"
      [class.ant-splitter-bar-dragger-active]="active()"
      (mousedown)="resizeStartEvent($event)"
      (touchstart)="resizeStartEvent($event)"
    ></div>

    @if (collapsible()?.start) {
      <div class="ant-splitter-bar-collapse-bar ant-splitter-bar-collapse-bar-start" (click)="collapseEvent('start')">
        <nz-icon
          [nzType]="vertical() ? 'up' : 'left'"
          class="ant-splitter-bar-collapse-icon ant-splitter-bar-collapse-start"
        />
      </div>
    }

    @if (collapsible()?.end) {
      <div class="ant-splitter-bar-collapse-bar ant-splitter-bar-collapse-bar-end" (click)="collapseEvent('end')">
        <nz-icon
          [nzType]="vertical() ? 'down' : 'right'"
          class="ant-splitter-bar-collapse-icon ant-splitter-bar-collapse-end"
        />
      </div>
    }
  `,
                    host: {
                        role: 'separator',
                        class: 'ant-splitter-bar',
                        '[attr.aria-valuenow]': 'getValidNumber(ariaNow())',
                        '[attr.aria-valuemin]': 'getValidNumber(ariaMin())',
                        '[attr.aria-valuemax]': 'getValidNumber(ariaMax())'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSplitterPanelComponent {
    nzDefaultSize = input();
    nzMin = input();
    nzMax = input();
    nzSize = input();
    nzCollapsible = input(false);
    nzResizable = input(true, { transform: booleanAttribute });
    contentTemplate = viewChild.required('contentTemplate');
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.2", type: NzSplitterPanelComponent, isStandalone: true, selector: "nz-splitter-panel", inputs: { nzDefaultSize: { classPropertyName: "nzDefaultSize", publicName: "nzDefaultSize", isSignal: true, isRequired: false, transformFunction: null }, nzMin: { classPropertyName: "nzMin", publicName: "nzMin", isSignal: true, isRequired: false, transformFunction: null }, nzMax: { classPropertyName: "nzMax", publicName: "nzMax", isSignal: true, isRequired: false, transformFunction: null }, nzSize: { classPropertyName: "nzSize", publicName: "nzSize", isSignal: true, isRequired: false, transformFunction: null }, nzCollapsible: { classPropertyName: "nzCollapsible", publicName: "nzCollapsible", isSignal: true, isRequired: false, transformFunction: null }, nzResizable: { classPropertyName: "nzResizable", publicName: "nzResizable", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["contentTemplate"], descendants: true, isSignal: true }], exportAs: ["nzSplitterPanel"], ngImport: i0, template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterPanelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-splitter-panel',
                    exportAs: 'nzSplitterPanel',
                    template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Get the percentage value of the string. (e.g. '50%' => 0.5)
 * @param str
 */
function getPercentValue(str) {
    return Number(str.slice(0, -1)) / 100;
}
/**
 * Check if the size is percentage.
 * @param size
 */
function isPercent(size) {
    return typeof size === 'string' && size.endsWith('%');
}
/**
 * Coerce the panel collapsible option to the NzSplitterCollapseOption type.
 */
function coerceCollapsible(collapsible) {
    if (collapsible && typeof collapsible === 'object') {
        return collapsible;
    }
    const mergedCollapsible = !!collapsible;
    return {
        start: mergedCollapsible,
        end: mergedCollapsible
    };
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
class NzSplitterComponent {
    /** ------------------- Props ------------------- */
    nzLayout = input('horizontal');
    nzLazy = input(false, { transform: booleanAttribute });
    nzResizeStart = output();
    nzResize = output();
    nzResizeEnd = output();
    destroy$ = inject(NzDestroyService);
    elementRef = inject(ElementRef);
    directionality = inject(Directionality);
    resizeObserver = inject(NzResizeObserver);
    document = inject(DOCUMENT);
    dir = toSignal(this.directionality.change, { initialValue: this.directionality.value });
    /** ------------------- Panels ------------------- */
    // Get all panels from content children
    panels = contentChildren(NzSplitterPanelComponent);
    // Subscribe to the change of properties
    panelProps = computed(() => this.panels().map(panel => ({
        defaultSize: panel.nzDefaultSize(),
        size: panel.nzSize(),
        min: panel.nzMin(),
        max: panel.nzMax(),
        resizable: panel.nzResizable(),
        collapsible: coerceCollapsible(panel.nzCollapsible()),
        contentTemplate: panel.contentTemplate()
    })));
    /** ------------------- Sizes ------------------- */
    /**
     * Observe the size of the container.
     */
    containerBox = toSignal(this.resizeObserver.observe(this.elementRef).pipe(map(([item]) => item.target), map(el => ({ width: el.clientWidth, height: el.clientHeight }))), {
        initialValue: {
            width: this.elementRef.nativeElement.clientWidth || 0,
            height: this.elementRef.nativeElement.clientHeight || 0
        }
    });
    /**
     * The size of the container, used to calculate the percentage size and flex basis of each panel.
     */
    containerSize = computed(() => this.nzLayout() === 'horizontal' ? this.containerBox().width : this.containerBox().height);
    /**
     * Derived from defaultSize of each panel.
     * After that it will be updated by the resize event with **real** size in pixels.
     */
    innerSizes = linkedSignal({
        source: this.panelProps,
        computation: source => source.map(panel => panel.defaultSize)
    });
    /**
     * Calculate the size of each panel based on the container size and the percentage size.
     */
    sizes = computed(() => {
        let emptyCount = 0;
        const containerSize = this.containerSize();
        const innerSizes = this.innerSizes();
        /**
         * Get the calculated size, min and max percentage of each panel
         */
        const sizes = this.panelProps().map((panel, index) => {
            const size = panel.size ?? innerSizes[index];
            // Calculate the percentage size of each panel.
            let percentage;
            if (isPercent(size)) {
                percentage = getPercentValue(size);
            }
            else if (size || size === 0) {
                const num = Number(size);
                if (!isNaN(num)) {
                    percentage = num / containerSize;
                }
            }
            else {
                percentage = undefined;
                emptyCount++;
            }
            // Calculate the min and max percentage size of each panel.
            const minSize = panel.min;
            const maxSize = panel.max;
            const postPercentMinSize = isPercent(minSize) ? getPercentValue(minSize) : (minSize || 0) / containerSize;
            const postPercentMaxSize = isPercent(maxSize)
                ? getPercentValue(maxSize)
                : (maxSize || containerSize) / containerSize;
            return {
                size,
                percentage,
                min: minSize,
                max: maxSize,
                postPercentMinSize,
                postPercentMaxSize
            };
        });
        /**
         * Normalize the percentage size of each panel if the total percentage is larger than 1 or smaller than 1.
         */
        const totalPercentage = sizes.reduce((acc, { percentage }) => acc + (percentage ?? 0), 0);
        for (const size of sizes) {
            if (totalPercentage > 1 && !emptyCount) {
                // If total percentage is larger than 1, we will scale it down.
                const scale = 1 / totalPercentage;
                size.percentage = size.percentage === undefined ? 0 : size.percentage * scale;
            }
            else {
                // If total percentage is smaller than 1, we will fill the rest.
                const averagePercentage = (1 - totalPercentage) / emptyCount;
                size.percentage = size.percentage === undefined ? averagePercentage : size.percentage;
            }
            size.postPxSize = size.percentage * containerSize;
            size.size = containerSize ? coerceCssPixelValue(size.postPxSize) : size.size;
        }
        return sizes;
    });
    ariaInfos = computed(() => {
        const stackSizes = [];
        const ariaInfos = [];
        const sizes = this.sizes();
        let stack = 0;
        for (const size of sizes) {
            stack += size.percentage;
            stackSizes.push(stack);
        }
        for (let i = 0; i < sizes.length - 1; i += 1) {
            const ariaMinStart = (stackSizes[i - 1] || 0) + sizes[i].postPercentMinSize;
            const ariaMinEnd = (stackSizes[i + 1] || 100) - sizes[i + 1].postPercentMaxSize;
            const ariaMaxStart = (stackSizes[i - 1] || 0) + sizes[i].postPercentMaxSize;
            const ariaMaxEnd = (stackSizes[i + 1] || 100) - sizes[i + 1].postPercentMinSize;
            ariaInfos.push({
                ariaNow: stackSizes[i] * 100,
                ariaMin: Math.max(ariaMinStart, ariaMinEnd) * 100,
                ariaMax: Math.min(ariaMaxStart, ariaMaxEnd) * 100
            });
        }
        return ariaInfos;
    });
    getPxSizes() {
        return this.sizes().map(s => s.postPxSize);
    }
    /** ------------------ Resize ------------------ */
    /**
     * The index of the panel that is being resized.
     * @note Mark the moving splitter bar as activated to show the dragging effect even if the mouse is outside the
     * splitter container.
     */
    movingIndex = signal(null);
    /**
     * The offset of preview position (lazy mode) when dragging the splitter bar.
     * Constrained by the min and max size of the target panel.
     */
    constrainedOffset = signal(0);
    /**
     * The resizable information of each splitter bar.
     */
    resizableInfos = computed(() => {
        const items = this.panelProps();
        const pxSizes = this.getPxSizes();
        const resizeInfos = [];
        for (let i = 0; i < items.length - 1; i += 1) {
            const prevItem = items[i];
            const nextItem = items[i + 1];
            const prevSize = pxSizes[i];
            const nextSize = pxSizes[i + 1];
            const { resizable: prevResizable = true, min: prevMin, collapsible: prevCollapsible } = prevItem;
            const { resizable: nextResizable = true, min: nextMin, collapsible: nextCollapsible } = nextItem;
            const mergedResizable = 
            // Both need to be resizable
            prevResizable &&
                nextResizable &&
                // Prev is not collapsed and limit min size
                (prevSize !== 0 || !prevMin) &&
                // Next is not collapsed and limit min size
                (nextSize !== 0 || !nextMin);
            const startCollapsible = 
            // Self is collapsible
            (prevCollapsible.end && prevSize > 0) ||
                // Collapsed and can be collapsed
                (nextCollapsible.start && nextSize === 0 && prevSize > 0);
            const endCollapsible = 
            // Self is collapsible
            (nextCollapsible.start && nextSize > 0) ||
                // Collapsed and can be collapsed
                (prevCollapsible.end && prevSize === 0 && nextSize > 0);
            resizeInfos[i] = {
                resizable: mergedResizable,
                collapsible: {
                    start: !!(this.dir() === 'rtl' ? endCollapsible : startCollapsible),
                    end: !!(this.dir() === 'rtl' ? startCollapsible : endCollapsible)
                }
            };
        }
        return resizeInfos;
    });
    /**
     * Handle the resize start event for the specified panel.
     * @param index The index of the panel.
     * @param startPos The start position of the resize event.
     */
    startResize(index, startPos) {
        this.movingIndex.set({ index, confirmed: false });
        this.nzResizeStart.emit(this.getPxSizes());
        const end$ = new Subject();
        // Updated constraint calculation
        const getConstrainedOffset = (rawOffset) => {
            const { percentage, postPercentMinSize, postPercentMaxSize } = this.sizes()[index];
            const [ariaNow, ariaMin, ariaMax] = [percentage, postPercentMinSize, postPercentMaxSize].map(p => p * 100);
            const containerSize = this.containerSize();
            const currentPos = (containerSize * ariaNow) / 100;
            const newPos = currentPos + rawOffset;
            // Calculate available space
            const minAllowed = Math.max(0, (containerSize * ariaMin) / 100);
            const maxAllowed = Math.min(containerSize, (containerSize * ariaMax) / 100);
            // Constrain new position within bounds
            const clampedPos = Math.max(minAllowed, Math.min(maxAllowed, newPos));
            return clampedPos - currentPos;
        };
        const handleLazyMove = (offset) => {
            this.constrainedOffset.set(getConstrainedOffset(offset));
        };
        const handleLazyEnd = () => {
            this.updateOffset(index, this.constrainedOffset());
            this.constrainedOffset.set(0);
        };
        // resizing
        merge(fromEventOutsideAngular(this.document, 'mousemove', passiveEventListenerOptions), fromEventOutsideAngular(this.document, 'touchmove', passiveEventListenerOptions))
            .pipe(map(event => getEventWithPoint(event)), map(({ pageX, pageY }) => (this.nzLayout() === 'horizontal' ? pageX - startPos[0] : pageY - startPos[1])), 
        // flip the offset if the direction is rtl
        map(offset => (this.nzLayout() === 'horizontal' && this.dir() === 'rtl' ? -offset : offset)), startWith(0), pairwise(), takeUntil(merge(end$, this.destroy$)))
            .subscribe(([prev, next]) => {
            if (this.nzLazy() && next !== 0) {
                handleLazyMove(next);
            }
            else {
                const deltaOffset = next - prev;
                // filter out the 0 delta offset
                if (deltaOffset !== 0) {
                    this.updateOffset(index, deltaOffset);
                }
            }
        });
        // resize end
        merge(fromEventOutsideAngular(this.document, 'mouseup'), fromEventOutsideAngular(this.document, 'touchend'))
            .pipe(takeUntil(merge(end$, this.destroy$)))
            .subscribe(() => {
            if (this.nzLazy()) {
                handleLazyEnd();
            }
            this.movingIndex.set(null);
            this.nzResizeEnd.emit(this.getPxSizes());
            end$.next();
        });
    }
    /**
     * Update the sizes of specified panels based on the move offset.
     * @param index The index of the panel.
     * @param offset The move offset in pixels.
     */
    updateOffset(index, offset) {
        const containerSize = this.containerSize();
        const limitSizes = this.sizes().map(p => [p.min, p.max]);
        const pxSizes = this.sizes().map(p => p.percentage * containerSize);
        const getLimitSize = (size, defaultLimit) => {
            if (typeof size === 'string') {
                return getPercentValue(size) * containerSize;
            }
            return size ?? defaultLimit;
        };
        // First time trigger move index update is not sync in the state
        let confirmedIndex = null;
        const movingIndex = this.movingIndex();
        // we need to know what the real index is
        if ((!movingIndex || !movingIndex.confirmed) && offset !== 0) {
            // search for the real index
            if (offset > 0) {
                confirmedIndex = index;
                this.movingIndex.set({ index, confirmed: true });
            }
            else {
                for (let i = index; i >= 0; i -= 1) {
                    if (pxSizes[i] > 0 && this.resizableInfos()[i].resizable) {
                        confirmedIndex = i;
                        this.movingIndex.set({ index: i, confirmed: true });
                        break;
                    }
                }
            }
        }
        const mergedIndex = confirmedIndex ?? index;
        const nextIndex = mergedIndex + 1;
        // Get boundary
        const startMinSize = getLimitSize(limitSizes[mergedIndex][0], 0);
        const endMinSize = getLimitSize(limitSizes[nextIndex][0], 0);
        const startMaxSize = getLimitSize(limitSizes[mergedIndex][1], containerSize);
        const endMaxSize = getLimitSize(limitSizes[nextIndex][1], containerSize);
        let mergedOffset = offset;
        // Align with the boundary
        if (pxSizes[mergedIndex] + mergedOffset < startMinSize) {
            mergedOffset = startMinSize - pxSizes[mergedIndex];
        }
        if (pxSizes[nextIndex] - mergedOffset < endMinSize) {
            mergedOffset = pxSizes[nextIndex] - endMinSize;
        }
        if (pxSizes[mergedIndex] + mergedOffset > startMaxSize) {
            mergedOffset = startMaxSize - pxSizes[mergedIndex];
        }
        if (pxSizes[nextIndex] - mergedOffset > endMaxSize) {
            mergedOffset = pxSizes[nextIndex] - endMaxSize;
        }
        // Do offset
        pxSizes[mergedIndex] += mergedOffset;
        pxSizes[nextIndex] -= mergedOffset;
        this.innerSizes.set(pxSizes);
        this.nzResize.emit(pxSizes);
    }
    /** ------------------ Resize ------------------ */
    /**
     * Record the original size of the collapsed panel.
     * Used to restore the size when the panel is expanded back.
     */
    cacheCollapsedSize = [];
    /**
     * Collapse the specified panel.
     * @param index The index of the panel to collapse.
     * @param type The type of collapse, either `start` or `end`.
     */
    collapse(index, type) {
        const containerSize = this.containerSize();
        const limitSizes = this.sizes().map(p => [p.min, p.max]);
        const currentSizes = this.sizes().map(p => p.percentage * containerSize);
        const adjustedType = this.dir() === 'rtl' ? (type === 'start' ? 'end' : 'start') : type;
        const currentIndex = adjustedType === 'start' ? index : index + 1;
        const targetIndex = adjustedType == 'start' ? index + 1 : index;
        const currentSize = currentSizes[currentIndex];
        const targetSize = currentSizes[targetIndex];
        const getLimitSize = (size, defaultLimit) => {
            if (typeof size === 'string') {
                return getPercentValue(size) * containerSize;
            }
            return size ?? defaultLimit;
        };
        if (currentSize !== 0 && targetSize !== 0) {
            // Collapse directly
            currentSizes[currentIndex] = 0;
            currentSizes[targetIndex] += currentSize;
            this.cacheCollapsedSize[index] = currentSize;
        }
        else {
            const totalSize = currentSize + targetSize;
            const currentSizeMin = getLimitSize(limitSizes[currentIndex][0], 0);
            const currentSizeMax = getLimitSize(limitSizes[currentIndex][1], containerSize);
            const targetSizeMin = getLimitSize(limitSizes[targetIndex][0], 0);
            const targetSizeMax = getLimitSize(limitSizes[targetIndex][1], containerSize);
            const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
            const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
            const halfOffset = (limitEnd - limitStart) / 2;
            const targetCacheCollapsedSize = this.cacheCollapsedSize[index];
            const currentCacheCollapsedSize = totalSize - targetCacheCollapsedSize;
            const shouldUseCache = targetCacheCollapsedSize &&
                targetCacheCollapsedSize <= targetSizeMax &&
                targetCacheCollapsedSize >= targetSizeMin &&
                currentCacheCollapsedSize <= currentSizeMax &&
                currentCacheCollapsedSize >= currentSizeMin;
            if (shouldUseCache) {
                currentSizes[targetIndex] = targetCacheCollapsedSize;
                currentSizes[currentIndex] = currentCacheCollapsedSize;
            }
            else {
                currentSizes[currentIndex] -= halfOffset;
                currentSizes[targetIndex] += halfOffset;
            }
        }
        this.innerSizes.set(currentSizes);
        this.nzResize.emit(currentSizes);
        this.nzResizeEnd.emit(currentSizes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSplitterComponent, isStandalone: true, selector: "nz-splitter", inputs: { nzLayout: { classPropertyName: "nzLayout", publicName: "nzLayout", isSignal: true, isRequired: false, transformFunction: null }, nzLazy: { classPropertyName: "nzLazy", publicName: "nzLazy", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { nzResizeStart: "nzResizeStart", nzResize: "nzResize", nzResizeEnd: "nzResizeEnd" }, host: { properties: { "class.ant-splitter-horizontal": "nzLayout() === \"horizontal\"", "class.ant-splitter-vertical": "nzLayout() === \"vertical\"", "class.ant-splitter-rtl": "dir() === \"rtl\"" }, classAttribute: "ant-splitter" }, providers: [NzDestroyService], queries: [{ propertyName: "panels", predicate: NzSplitterPanelComponent, isSignal: true }], exportAs: ["nzSplitter"], ngImport: i0, template: `
    @for (panel of panelProps(); let i = $index; track i; let last = $last) {
      @let size = sizes()[i];
      @let flexBasis = !!size.size ? size.size : 'auto';
      @let flexGrow = !!size.size ? 0 : 1;
      <div
        class="ant-splitter-panel"
        [class.ant-splitter-panel-hidden]="size.postPxSize === 0"
        [style.flex-basis]="flexBasis"
        [style.flex-grow]="flexGrow"
      >
        <ng-container *ngTemplateOutlet="panel.contentTemplate"></ng-container>
      </div>

      @if (!last) {
        @let resizableInfo = resizableInfos()[i];
        @let ariaInfo = ariaInfos()[i];
        <div
          nz-splitter-bar
          [ariaNow]="ariaInfo.ariaNow"
          [ariaMin]="ariaInfo.ariaMin"
          [ariaMax]="ariaInfo.ariaMax"
          [resizable]="resizableInfo.resizable"
          [collapsible]="resizableInfo.collapsible"
          [active]="movingIndex()?.index === i"
          [vertical]="nzLayout() === 'vertical'"
          [lazy]="nzLazy()"
          [constrainedOffset]="constrainedOffset()"
          (offsetStart)="startResize(i, $event)"
          (collapse)="collapse(i, $event)"
        ></div>
      }
    }

    <!-- Fake mask for cursor -->
    @if (movingIndex() !== null) {
      <div
        aria-hidden
        class="ant-splitter-mask"
        [class.ant-splitter-mask-horizontal]="nzLayout() === 'horizontal'"
        [class.ant-splitter-mask-vertical]="nzLayout() === 'vertical'"
      ></div>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzSplitterBarComponent, selector: "[nz-splitter-bar]", inputs: ["ariaNow", "ariaMin", "ariaMax", "active", "resizable", "vertical", "lazy", "collapsible", "constrainedOffset"], outputs: ["offsetStart", "collapse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-splitter',
                    exportAs: 'nzSplitter',
                    template: `
    @for (panel of panelProps(); let i = $index; track i; let last = $last) {
      @let size = sizes()[i];
      @let flexBasis = !!size.size ? size.size : 'auto';
      @let flexGrow = !!size.size ? 0 : 1;
      <div
        class="ant-splitter-panel"
        [class.ant-splitter-panel-hidden]="size.postPxSize === 0"
        [style.flex-basis]="flexBasis"
        [style.flex-grow]="flexGrow"
      >
        <ng-container *ngTemplateOutlet="panel.contentTemplate"></ng-container>
      </div>

      @if (!last) {
        @let resizableInfo = resizableInfos()[i];
        @let ariaInfo = ariaInfos()[i];
        <div
          nz-splitter-bar
          [ariaNow]="ariaInfo.ariaNow"
          [ariaMin]="ariaInfo.ariaMin"
          [ariaMax]="ariaInfo.ariaMax"
          [resizable]="resizableInfo.resizable"
          [collapsible]="resizableInfo.collapsible"
          [active]="movingIndex()?.index === i"
          [vertical]="nzLayout() === 'vertical'"
          [lazy]="nzLazy()"
          [constrainedOffset]="constrainedOffset()"
          (offsetStart)="startResize(i, $event)"
          (collapse)="collapse(i, $event)"
        ></div>
      }
    }

    <!-- Fake mask for cursor -->
    @if (movingIndex() !== null) {
      <div
        aria-hidden
        class="ant-splitter-mask"
        [class.ant-splitter-mask-horizontal]="nzLayout() === 'horizontal'"
        [class.ant-splitter-mask-vertical]="nzLayout() === 'vertical'"
      ></div>
    }
  `,
                    imports: [NgTemplateOutlet, NzSplitterBarComponent],
                    providers: [NzDestroyService],
                    host: {
                        class: 'ant-splitter',
                        '[class.ant-splitter-horizontal]': 'nzLayout() === "horizontal"',
                        '[class.ant-splitter-vertical]': 'nzLayout() === "vertical"',
                        '[class.ant-splitter-rtl]': 'dir() === "rtl"'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSplitterModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterModule, imports: [NzSplitterComponent, NzSplitterPanelComponent], exports: [NzSplitterComponent, NzSplitterPanelComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterModule, imports: [NzSplitterComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSplitterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzSplitterComponent, NzSplitterPanelComponent],
                    exports: [NzSplitterComponent, NzSplitterPanelComponent]
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

export { NzSplitterComponent, NzSplitterModule, NzSplitterPanelComponent };
//# sourceMappingURL=ng-zorro-antd-splitter.mjs.map
