import * as i0 from '@angular/core';
import { Input, ChangeDetectionStrategy, ViewEncapsulation, Component, EventEmitter, booleanAttribute, Output, inject, NgZone, PLATFORM_ID, ViewChild, TemplateRef, DestroyRef, ElementRef, numberAttribute, computed, signal, forwardRef, ContentChildren, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, of, combineLatest, merge } from 'rxjs';
import { OverlayModule, CdkOverlayOrigin, CdkConnectedOverlay } from '@angular/cdk/overlay';
import * as i2 from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import * as i7 from 'ng-zorro-antd/core/overlay';
import { NzOverlayModule, getPlacementName, POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import * as i1$3 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i1 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { takeUntil, startWith, distinctUntilChanged, withLatestFrom, map, switchMap } from 'rxjs/operators';
import * as i1$1 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular, numberAttributeWithInfinityFallback, isNotNil, getStatusClassNames } from 'ng-zorro-antd/core/util';
import * as i1$2 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { __esDecorate, __runInitializers } from 'tslib';
import { BACKSPACE, ESCAPE, TAB, SPACE, ENTER, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import * as i3 from '@angular/cdk/platform';
import { _getEventTarget } from '@angular/cdk/platform';
import * as i2$1 from '@angular/forms';
import { FormsModule, COMPOSITION_BUFFER_MODE, NG_VALUE_ACCESSOR } from '@angular/forms';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import * as i2$2 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormStatusService, NzFormNoStatusService, NzFormItemFeedbackIconComponent } from 'ng-zorro-antd/core/form';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { reqAnimFrame, cancelRequestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import * as i6 from 'ng-zorro-antd/space';
import { NZ_SPACE_COMPACT_SIZE, NZ_SPACE_COMPACT_ITEM_TYPE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i1$4 from '@angular/cdk/a11y';
import * as i5 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOptionGroupComponent {
    nzLabel = null;
    changes = new Subject();
    ngOnChanges() {
        this.changes.next();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzOptionGroupComponent, isStandalone: true, selector: "nz-option-group", inputs: { nzLabel: "nzLabel" }, exportAs: ["nzOptionGroup"], usesOnChanges: true, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-option-group',
                    exportAs: 'nzOptionGroup',
                    template: `<ng-content></ng-content>`,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { nzLabel: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOptionItemGroupComponent {
    nzLabel = null;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionItemGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzOptionItemGroupComponent, isStandalone: true, selector: "nz-option-item-group", inputs: { nzLabel: "nzLabel" }, host: { classAttribute: "ant-select-item ant-select-item-group" }, ngImport: i0, template: ` <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container> `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionItemGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-option-item-group',
                    template: ` <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-select-item ant-select-item-group'
                    },
                    imports: [NzOutletModule]
                }]
        }], propDecorators: { nzLabel: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOptionItemComponent {
    elementRef;
    ngZone;
    destroy$;
    selected = false;
    activated = false;
    grouped = false;
    customContent = false;
    template = null;
    disabled = false;
    showState = false;
    title;
    label = null;
    value = null;
    activatedValue = null;
    listOfSelectedValue = [];
    icon = null;
    compareWith;
    itemClick = new EventEmitter();
    itemHover = new EventEmitter();
    constructor(elementRef, ngZone, destroy$) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.destroy$ = destroy$;
    }
    ngOnChanges(changes) {
        const { value, activatedValue, listOfSelectedValue } = changes;
        if (value || listOfSelectedValue) {
            this.selected = this.listOfSelectedValue.some(v => this.compareWith(v, this.value));
        }
        if (value || activatedValue) {
            this.activated = this.compareWith(this.activatedValue, this.value);
        }
    }
    ngOnInit() {
        fromEventOutsideAngular(this.elementRef.nativeElement, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            if (!this.disabled) {
                this.ngZone.run(() => this.itemClick.emit(this.value));
            }
        });
        fromEventOutsideAngular(this.elementRef.nativeElement, 'mouseenter')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            if (!this.disabled) {
                this.ngZone.run(() => this.itemHover.emit(this.value));
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionItemComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i1$1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzOptionItemComponent, isStandalone: true, selector: "nz-option-item", inputs: { grouped: "grouped", customContent: ["customContent", "customContent", booleanAttribute], template: "template", disabled: "disabled", showState: "showState", title: "title", label: "label", value: "value", activatedValue: "activatedValue", listOfSelectedValue: "listOfSelectedValue", icon: "icon", compareWith: "compareWith" }, outputs: { itemClick: "itemClick", itemHover: "itemHover" }, host: { properties: { "attr.title": "title", "class.ant-select-item-option-grouped": "grouped", "class.ant-select-item-option-selected": "selected && !disabled", "class.ant-select-item-option-disabled": "disabled", "class.ant-select-item-option-active": "activated && !disabled" }, classAttribute: "ant-select-item ant-select-item-option" }, providers: [NzDestroyService], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-select-item-option-content">
      @if (customContent) {
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      } @else {
        {{ label }}
      }
    </div>
    @if (showState && selected) {
      <div class="ant-select-item-option-state" unselectable="on">
        @if (!icon) {
          <nz-icon nzType="check" class="ant-select-selected-icon" />
        } @else {
          <ng-template [ngTemplateOutlet]="icon"></ng-template>
        }
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1$2.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-option-item',
                    template: `
    <div class="ant-select-item-option-content">
      @if (customContent) {
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      } @else {
        {{ label }}
      }
    </div>
    @if (showState && selected) {
      <div class="ant-select-item-option-state" unselectable="on">
        @if (!icon) {
          <nz-icon nzType="check" class="ant-select-selected-icon" />
        } @else {
          <ng-template [ngTemplateOutlet]="icon"></ng-template>
        }
      </div>
    }
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-select-item ant-select-item-option',
                        '[attr.title]': 'title',
                        '[class.ant-select-item-option-grouped]': 'grouped',
                        '[class.ant-select-item-option-selected]': 'selected && !disabled',
                        '[class.ant-select-item-option-disabled]': 'disabled',
                        '[class.ant-select-item-option-active]': 'activated && !disabled'
                    },
                    providers: [NzDestroyService],
                    imports: [NgTemplateOutlet, NzIconModule]
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1$1.NzDestroyService }], propDecorators: { grouped: [{
                type: Input
            }], customContent: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], template: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showState: [{
                type: Input
            }], title: [{
                type: Input
            }], label: [{
                type: Input
            }], value: [{
                type: Input
            }], activatedValue: [{
                type: Input
            }], listOfSelectedValue: [{
                type: Input
            }], icon: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], itemClick: [{
                type: Output
            }], itemHover: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOptionContainerComponent {
    notFoundContent = undefined;
    menuItemSelectedIcon = null;
    dropdownRender = null;
    activatedValue = null;
    listOfSelectedValue = [];
    compareWith;
    mode = 'default';
    matchWidth = true;
    itemSize = 32;
    maxItemLength = 8;
    isMaxMultipleCountReached = false;
    listOfContainerItem = [];
    itemClick = new EventEmitter();
    scrollToBottom = new EventEmitter();
    cdkVirtualScrollViewport;
    scrolledIndex = 0;
    ngZone = inject(NgZone);
    platformId = inject(PLATFORM_ID);
    onItemClick(value) {
        this.itemClick.emit(value);
    }
    onItemHover(value) {
        // TODO: keydown.enter won't activate this value
        this.activatedValue = value;
    }
    trackValue(_index, option) {
        return option.key;
    }
    onScrolledIndexChange(index) {
        this.scrolledIndex = index;
        if (index === this.listOfContainerItem.length - this.maxItemLength - 1) {
            this.scrollToBottom.emit();
        }
    }
    scrollToActivatedValue() {
        const index = this.listOfContainerItem.findIndex(item => this.compareWith(item.key, this.activatedValue));
        if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
            this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
        }
    }
    ngOnChanges(changes) {
        const { listOfContainerItem, activatedValue } = changes;
        if (listOfContainerItem || activatedValue) {
            this.scrollToActivatedValue();
        }
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.ngZone.runOutsideAngular(() => setTimeout(() => this.scrollToActivatedValue()));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzOptionContainerComponent, isStandalone: true, selector: "nz-option-container", inputs: { notFoundContent: "notFoundContent", menuItemSelectedIcon: "menuItemSelectedIcon", dropdownRender: "dropdownRender", activatedValue: "activatedValue", listOfSelectedValue: "listOfSelectedValue", compareWith: "compareWith", mode: "mode", matchWidth: "matchWidth", itemSize: "itemSize", maxItemLength: "maxItemLength", isMaxMultipleCountReached: "isMaxMultipleCountReached", listOfContainerItem: "listOfContainerItem" }, outputs: { itemClick: "itemClick", scrollToBottom: "scrollToBottom" }, host: { classAttribute: "ant-select-dropdown" }, viewQueries: [{ propertyName: "cdkVirtualScrollViewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true, static: true }], exportAs: ["nzOptionContainer"], usesOnChanges: true, ngImport: i0, template: `
    <div>
      @if (listOfContainerItem.length === 0) {
        <div class="ant-select-item-empty">
          <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!"></nz-embed-empty>
        </div>
      }
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          @switch (item.type) {
            @case ('group') {
              <nz-option-item-group [nzLabel]="item.groupLabel ?? null"></nz-option-item-group>
            }
            @case ('item') {
              <nz-option-item
                [icon]="menuItemSelectedIcon"
                [customContent]="item.nzCustomContent"
                [template]="item.template ?? null"
                [grouped]="!!item.groupLabel"
                [disabled]="
                  item.nzDisabled || (isMaxMultipleCountReached && !listOfSelectedValue.includes(item['nzValue']))
                "
                [showState]="mode === 'tags' || mode === 'multiple'"
                [title]="item.nzTitle"
                [label]="item.nzLabel"
                [compareWith]="compareWith"
                [activatedValue]="activatedValue"
                [listOfSelectedValue]="listOfSelectedValue"
                [value]="item.nzValue"
                (itemHover)="onItemHover($event)"
                (itemClick)="onItemClick($event)"
              ></nz-option-item>
            }
          }
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i1$3.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }, { kind: "component", type: NzOptionItemGroupComponent, selector: "nz-option-item-group", inputs: ["nzLabel"] }, { kind: "component", type: NzOptionItemComponent, selector: "nz-option-item", inputs: ["grouped", "customContent", "template", "disabled", "showState", "title", "label", "value", "activatedValue", "listOfSelectedValue", "icon", "compareWith"], outputs: ["itemClick", "itemHover"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: OverlayModule }, { kind: "directive", type: i2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "ngmodule", type: NzOverlayModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-option-container',
                    exportAs: 'nzOptionContainer',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    template: `
    <div>
      @if (listOfContainerItem.length === 0) {
        <div class="ant-select-item-empty">
          <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!"></nz-embed-empty>
        </div>
      }
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          @switch (item.type) {
            @case ('group') {
              <nz-option-item-group [nzLabel]="item.groupLabel ?? null"></nz-option-item-group>
            }
            @case ('item') {
              <nz-option-item
                [icon]="menuItemSelectedIcon"
                [customContent]="item.nzCustomContent"
                [template]="item.template ?? null"
                [grouped]="!!item.groupLabel"
                [disabled]="
                  item.nzDisabled || (isMaxMultipleCountReached && !listOfSelectedValue.includes(item['nzValue']))
                "
                [showState]="mode === 'tags' || mode === 'multiple'"
                [title]="item.nzTitle"
                [label]="item.nzLabel"
                [compareWith]="compareWith"
                [activatedValue]="activatedValue"
                [listOfSelectedValue]="listOfSelectedValue"
                [value]="item.nzValue"
                (itemHover)="onItemHover($event)"
                (itemClick)="onItemClick($event)"
              ></nz-option-item>
            }
          }
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `,
                    host: { class: 'ant-select-dropdown' },
                    imports: [
                        NzEmptyModule,
                        NzOptionItemGroupComponent,
                        NzOptionItemComponent,
                        NgTemplateOutlet,
                        OverlayModule,
                        NzOverlayModule
                    ]
                }]
        }], propDecorators: { notFoundContent: [{
                type: Input
            }], menuItemSelectedIcon: [{
                type: Input
            }], dropdownRender: [{
                type: Input
            }], activatedValue: [{
                type: Input
            }], listOfSelectedValue: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], mode: [{
                type: Input
            }], matchWidth: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], maxItemLength: [{
                type: Input
            }], isMaxMultipleCountReached: [{
                type: Input
            }], listOfContainerItem: [{
                type: Input
            }], itemClick: [{
                type: Output
            }], scrollToBottom: [{
                type: Output
            }], cdkVirtualScrollViewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { static: true }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOptionComponent {
    destroy$;
    changes = new Subject();
    groupLabel = null;
    template;
    nzTitle;
    nzLabel = null;
    nzValue = null;
    nzKey;
    nzDisabled = false;
    nzHide = false;
    nzCustomContent = false;
    nzOptionGroupComponent = inject(NzOptionGroupComponent, { optional: true });
    constructor(destroy$) {
        this.destroy$ = destroy$;
    }
    ngOnInit() {
        if (this.nzOptionGroupComponent) {
            this.nzOptionGroupComponent.changes.pipe(startWith(true), takeUntil(this.destroy$)).subscribe(() => {
                this.groupLabel = this.nzOptionGroupComponent?.nzLabel;
            });
        }
    }
    ngOnChanges() {
        this.changes.next();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionComponent, deps: [{ token: i1$1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "19.2.2", type: NzOptionComponent, isStandalone: true, selector: "nz-option", inputs: { nzTitle: "nzTitle", nzLabel: "nzLabel", nzValue: "nzValue", nzKey: "nzKey", nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzHide: ["nzHide", "nzHide", booleanAttribute], nzCustomContent: ["nzCustomContent", "nzCustomContent", booleanAttribute] }, providers: [NzDestroyService], viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzOption"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-option',
                    exportAs: 'nzOption',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [NzDestroyService],
                    template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
                }]
        }], ctorParameters: () => [{ type: i1$1.NzDestroyService }], propDecorators: { template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], nzTitle: [{
                type: Input
            }], nzLabel: [{
                type: Input
            }], nzValue: [{
                type: Input
            }], nzKey: [{
                type: Input
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzHide: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzCustomContent: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSelectArrowComponent {
    listOfValue = [];
    loading = false;
    search = false;
    showArrow = false;
    isMaxMultipleCountSet = false;
    suffixIcon = null;
    feedbackIcon = null;
    nzMaxMultipleCount = Infinity;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectArrowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSelectArrowComponent, isStandalone: true, selector: "nz-select-arrow", inputs: { listOfValue: "listOfValue", loading: "loading", search: "search", showArrow: "showArrow", isMaxMultipleCountSet: "isMaxMultipleCountSet", suffixIcon: "suffixIcon", feedbackIcon: "feedbackIcon", nzMaxMultipleCount: ["nzMaxMultipleCount", "nzMaxMultipleCount", numberAttributeWithInfinityFallback] }, host: { properties: { "class.ant-select-arrow-loading": "loading" }, classAttribute: "ant-select-arrow" }, ngImport: i0, template: `
    @if (isMaxMultipleCountSet) {
      <span>{{ listOfValue.length }} / {{ nzMaxMultipleCount }}</span>
    }
    @if (loading) {
      <nz-icon nzType="loading" />
    } @else {
      @if (showArrow && !suffixIcon) {
        @if (search) {
          <nz-icon nzType="search" />
        } @else {
          <nz-icon nzType="down" />
        }
      } @else {
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          @if (suffixIcon) {
            <nz-icon [nzType]="suffixIcon" />
          }
        </ng-container>
      }
    }
    <ng-container *nzStringTemplateOutlet="feedbackIcon">{{ feedbackIcon }}</ng-container>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1$2.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectArrowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-arrow',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    @if (isMaxMultipleCountSet) {
      <span>{{ listOfValue.length }} / {{ nzMaxMultipleCount }}</span>
    }
    @if (loading) {
      <nz-icon nzType="loading" />
    } @else {
      @if (showArrow && !suffixIcon) {
        @if (search) {
          <nz-icon nzType="search" />
        } @else {
          <nz-icon nzType="down" />
        }
      } @else {
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          @if (suffixIcon) {
            <nz-icon [nzType]="suffixIcon" />
          }
        </ng-container>
      }
    }
    <ng-container *nzStringTemplateOutlet="feedbackIcon">{{ feedbackIcon }}</ng-container>
  `,
                    host: {
                        class: 'ant-select-arrow',
                        '[class.ant-select-arrow-loading]': 'loading'
                    },
                    imports: [NzIconModule, NzOutletModule]
                }]
        }], propDecorators: { listOfValue: [{
                type: Input
            }], loading: [{
                type: Input
            }], search: [{
                type: Input
            }], showArrow: [{
                type: Input
            }], isMaxMultipleCountSet: [{
                type: Input
            }], suffixIcon: [{
                type: Input
            }], feedbackIcon: [{
                type: Input
            }], nzMaxMultipleCount: [{
                type: Input,
                args: [{ transform: numberAttributeWithInfinityFallback }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSelectClearComponent {
    clearIcon = null;
    clear = new EventEmitter();
    onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.clear.emit(e);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectClearComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSelectClearComponent, isStandalone: true, selector: "nz-select-clear", inputs: { clearIcon: "clearIcon" }, outputs: { clear: "clear" }, host: { listeners: { "click": "onClick($event)" }, classAttribute: "ant-select-clear" }, ngImport: i0, template: `
    @if (clearIcon) {
      <ng-template [ngTemplateOutlet]="clearIcon"></ng-template>
    } @else {
      <nz-icon nzType="close-circle" nzTheme="fill" class="ant-select-close-icon" />
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1$2.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectClearComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-clear',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    @if (clearIcon) {
      <ng-template [ngTemplateOutlet]="clearIcon"></ng-template>
    } @else {
      <nz-icon nzType="close-circle" nzTheme="fill" class="ant-select-close-icon" />
    }
  `,
                    host: {
                        class: 'ant-select-clear',
                        '(click)': 'onClick($event)'
                    },
                    imports: [NgTemplateOutlet, NzIconModule]
                }]
        }], propDecorators: { clearIcon: [{
                type: Input
            }], clear: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSelectItemComponent {
    disabled = false;
    label = null;
    deletable = false;
    removeIcon = null;
    contentTemplateOutletContext = null;
    contentTemplateOutlet = null;
    delete = new EventEmitter();
    get templateOutletContext() {
        return {
            $implicit: this.contentTemplateOutletContext,
            ...this.contentTemplateOutletContext
        };
    }
    onDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.disabled) {
            this.delete.next(e);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSelectItemComponent, isStandalone: true, selector: "nz-select-item", inputs: { disabled: "disabled", label: "label", deletable: "deletable", removeIcon: "removeIcon", contentTemplateOutletContext: "contentTemplateOutletContext", contentTemplateOutlet: "contentTemplateOutlet" }, outputs: { delete: "delete" }, host: { properties: { "attr.title": "label", "class.ant-select-selection-item-disabled": "disabled" }, classAttribute: "ant-select-selection-item" }, ngImport: i0, template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: templateOutletContext">
      @if (deletable) {
        <div class="ant-select-selection-item-content">{{ label }}</div>
      } @else {
        {{ label }}
      }
    </ng-container>
    @if (deletable && !disabled) {
      <span class="ant-select-selection-item-remove" (click)="onDelete($event)">
        @if (!removeIcon) {
          <nz-icon nzType="close" />
        } @else {
          <ng-template [ngTemplateOutlet]="removeIcon"></ng-template>
        }
      </span>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i1$2.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-item',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: templateOutletContext">
      @if (deletable) {
        <div class="ant-select-selection-item-content">{{ label }}</div>
      } @else {
        {{ label }}
      }
    </ng-container>
    @if (deletable && !disabled) {
      <span class="ant-select-selection-item-remove" (click)="onDelete($event)">
        @if (!removeIcon) {
          <nz-icon nzType="close" />
        } @else {
          <ng-template [ngTemplateOutlet]="removeIcon"></ng-template>
        }
      </span>
    }
  `,
                    host: {
                        class: 'ant-select-selection-item',
                        '[attr.title]': 'label',
                        '[class.ant-select-selection-item-disabled]': 'disabled'
                    },
                    imports: [NgTemplateOutlet, NzOutletModule, NzIconModule]
                }]
        }], propDecorators: { disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], deletable: [{
                type: Input
            }], removeIcon: [{
                type: Input
            }], contentTemplateOutletContext: [{
                type: Input
            }], contentTemplateOutlet: [{
                type: Input
            }], delete: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSelectPlaceholderComponent {
    placeholder = null;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectPlaceholderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzSelectPlaceholderComponent, isStandalone: true, selector: "nz-select-placeholder", inputs: { placeholder: "placeholder" }, host: { classAttribute: "ant-select-selection-placeholder" }, ngImport: i0, template: `
    <ng-container *nzStringTemplateOutlet="placeholder">
      {{ placeholder }}
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectPlaceholderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-placeholder',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-container *nzStringTemplateOutlet="placeholder">
      {{ placeholder }}
    </ng-container>
  `,
                    host: { class: 'ant-select-selection-placeholder' },
                    imports: [NzOutletModule]
                }]
        }], propDecorators: { placeholder: [{
                type: Input
            }] } });

class NzSelectSearchComponent {
    elementRef;
    renderer;
    focusMonitor;
    nzId = null;
    disabled = false;
    mirrorSync = false;
    showInput = true;
    focusTrigger = false;
    value = '';
    autofocus = false;
    valueChange = new EventEmitter();
    isComposingChange = new EventEmitter();
    inputElement;
    mirrorElement;
    setCompositionState(isComposing) {
        this.isComposingChange.next(isComposing);
    }
    onValueChange(value) {
        this.value = value;
        this.valueChange.next(value);
        if (this.mirrorSync) {
            this.syncMirrorWidth();
        }
    }
    clearInputValue() {
        const inputDOM = this.inputElement.nativeElement;
        inputDOM.value = '';
        this.onValueChange('');
    }
    syncMirrorWidth() {
        reqAnimFrame(() => {
            const mirrorDOM = this.mirrorElement.nativeElement;
            const hostDOM = this.elementRef.nativeElement;
            const inputDOM = this.inputElement.nativeElement;
            this.renderer.removeStyle(hostDOM, 'width');
            this.renderer.setProperty(mirrorDOM, 'textContent', `${inputDOM.value}\u00a0`);
            this.renderer.setStyle(hostDOM, 'width', `${mirrorDOM.scrollWidth}px`);
        });
    }
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    blur() {
        this.inputElement.nativeElement.blur();
    }
    constructor(elementRef, renderer, focusMonitor) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.focusMonitor = focusMonitor;
    }
    ngOnChanges(changes) {
        const inputDOM = this.inputElement.nativeElement;
        const { focusTrigger, showInput } = changes;
        if (showInput) {
            if (this.showInput) {
                this.renderer.removeAttribute(inputDOM, 'readonly');
            }
            else {
                this.renderer.setAttribute(inputDOM, 'readonly', 'readonly');
            }
        }
        // IE11 cannot input value if focused before removing readonly
        if (focusTrigger && focusTrigger.currentValue === true && focusTrigger.previousValue === false) {
            inputDOM.focus();
        }
    }
    ngAfterViewInit() {
        if (this.mirrorSync) {
            this.syncMirrorWidth();
        }
        if (this.autofocus) {
            this.focus();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectSearchComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1$4.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSelectSearchComponent, isStandalone: true, selector: "nz-select-search", inputs: { nzId: "nzId", disabled: "disabled", mirrorSync: "mirrorSync", showInput: "showInput", focusTrigger: "focusTrigger", value: "value", autofocus: "autofocus" }, outputs: { valueChange: "valueChange", isComposingChange: "isComposingChange" }, host: { classAttribute: "ant-select-selection-search" }, providers: [{ provide: COMPOSITION_BUFFER_MODE, useValue: false }], viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true, static: true }, { propertyName: "mirrorElement", first: true, predicate: ["mirrorElement"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <input
      #inputElement
      [attr.id]="nzId"
      autocomplete="off"
      class="ant-select-selection-search-input"
      [ngModel]="value"
      [attr.autofocus]="autofocus ? 'autofocus' : null"
      [disabled]="disabled"
      [style.opacity]="showInput ? null : 0"
      (ngModelChange)="onValueChange($event)"
      (compositionstart)="setCompositionState(true)"
      (compositionend)="setCompositionState(false)"
    />
    @if (mirrorSync) {
      <span #mirrorElement class="ant-select-selection-search-mirror"></span>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectSearchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-search',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <input
      #inputElement
      [attr.id]="nzId"
      autocomplete="off"
      class="ant-select-selection-search-input"
      [ngModel]="value"
      [attr.autofocus]="autofocus ? 'autofocus' : null"
      [disabled]="disabled"
      [style.opacity]="showInput ? null : 0"
      (ngModelChange)="onValueChange($event)"
      (compositionstart)="setCompositionState(true)"
      (compositionend)="setCompositionState(false)"
    />
    @if (mirrorSync) {
      <span #mirrorElement class="ant-select-selection-search-mirror"></span>
    }
  `,
                    host: { class: 'ant-select-selection-search' },
                    providers: [{ provide: COMPOSITION_BUFFER_MODE, useValue: false }],
                    imports: [FormsModule]
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1$4.FocusMonitor }], propDecorators: { nzId: [{
                type: Input
            }], disabled: [{
                type: Input
            }], mirrorSync: [{
                type: Input
            }], showInput: [{
                type: Input
            }], focusTrigger: [{
                type: Input
            }], value: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], isComposingChange: [{
                type: Output
            }], inputElement: [{
                type: ViewChild,
                args: ['inputElement', { static: true }]
            }], mirrorElement: [{
                type: ViewChild,
                args: ['mirrorElement', { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSelectTopControlComponent {
    nzId = null;
    showSearch = false;
    placeHolder = null;
    open = false;
    maxTagCount = Infinity;
    autofocus = false;
    disabled = false;
    mode = 'default';
    customTemplate = null;
    maxTagPlaceholder = null;
    removeIcon = null;
    listOfTopItem = [];
    tokenSeparators = [];
    tokenize = new EventEmitter();
    inputValueChange = new EventEmitter();
    deleteItem = new EventEmitter();
    nzSelectSearchComponent;
    listOfSlicedItem = [];
    isShowPlaceholder = true;
    isShowSingleLabel = false;
    isComposing = false;
    inputValue = null;
    updateTemplateVariable() {
        const isSelectedValueEmpty = this.listOfTopItem.length === 0;
        this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
        this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    }
    isComposingChange(isComposing) {
        this.isComposing = isComposing;
        this.updateTemplateVariable();
    }
    onInputValueChange(value) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            this.updateTemplateVariable();
            this.inputValueChange.emit(value);
            this.tokenSeparate(value, this.tokenSeparators);
        }
    }
    tokenSeparate(inputValue, tokenSeparators) {
        const includesSeparators = (str, separators) => {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < separators.length; ++i) {
                if (str.lastIndexOf(separators[i]) > 0) {
                    return true;
                }
            }
            return false;
        };
        const splitBySeparators = (str, separators) => {
            const reg = new RegExp(`[${separators.join()}]`);
            const array = str.split(reg).filter(token => token);
            return [...new Set(array)];
        };
        if (inputValue &&
            inputValue.length &&
            tokenSeparators.length &&
            this.mode !== 'default' &&
            includesSeparators(inputValue, tokenSeparators)) {
            const listOfLabel = splitBySeparators(inputValue, tokenSeparators);
            this.tokenize.next(listOfLabel);
        }
    }
    clearInputValue() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.clearInputValue();
        }
    }
    focus() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.focus();
        }
    }
    blur() {
        if (this.nzSelectSearchComponent) {
            this.nzSelectSearchComponent.blur();
        }
    }
    onDeleteItem(item) {
        if (!this.disabled && !item.nzDisabled) {
            this.deleteItem.next(item);
        }
    }
    destroyRef = inject(DestroyRef);
    elementRef = inject((ElementRef));
    ngZone = inject(NgZone);
    noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
    ngOnChanges(changes) {
        const { listOfTopItem, maxTagCount, customTemplate, maxTagPlaceholder } = changes;
        if (listOfTopItem) {
            this.updateTemplateVariable();
        }
        if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
            const listOfSlicedItem = this.listOfTopItem.slice(0, this.maxTagCount).map(o => ({
                nzLabel: o.nzLabel,
                nzValue: o.nzValue,
                nzDisabled: o.nzDisabled,
                contentTemplateOutlet: this.customTemplate,
                contentTemplateOutletContext: o
            }));
            if (this.listOfTopItem.length > this.maxTagCount) {
                const exceededLabel = `+ ${this.listOfTopItem.length - this.maxTagCount} ...`;
                const listOfSelectedValue = this.listOfTopItem.map(item => item.nzValue);
                const exceededItem = {
                    nzLabel: exceededLabel,
                    nzValue: '$$__nz_exceeded_item',
                    nzDisabled: true,
                    contentTemplateOutlet: this.maxTagPlaceholder,
                    contentTemplateOutletContext: listOfSelectedValue.slice(this.maxTagCount)
                };
                listOfSlicedItem.push(exceededItem);
            }
            this.listOfSlicedItem = listOfSlicedItem;
        }
    }
    ngOnInit() {
        fromEventOutsideAngular(this.elementRef.nativeElement, 'click')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(event => {
            // `HTMLElement.focus()` is a native DOM API which doesn't require Angular to run change detection.
            if (event.target !== this.nzSelectSearchComponent.inputElement.nativeElement) {
                this.nzSelectSearchComponent.focus();
            }
        });
        fromEventOutsideAngular(this.elementRef.nativeElement, 'keydown')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(event => {
            if (event.target instanceof HTMLInputElement) {
                const inputValue = event.target.value;
                if (event.keyCode === BACKSPACE && this.mode !== 'default' && !inputValue && this.listOfTopItem.length > 0) {
                    event.preventDefault();
                    // Run change detection only if the user has pressed the `Backspace` key and the following condition is met.
                    this.ngZone.run(() => this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]));
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectTopControlComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSelectTopControlComponent, isStandalone: true, selector: "nz-select-top-control", inputs: { nzId: "nzId", showSearch: "showSearch", placeHolder: "placeHolder", open: "open", maxTagCount: ["maxTagCount", "maxTagCount", numberAttribute], autofocus: "autofocus", disabled: "disabled", mode: "mode", customTemplate: "customTemplate", maxTagPlaceholder: "maxTagPlaceholder", removeIcon: "removeIcon", listOfTopItem: "listOfTopItem", tokenSeparators: "tokenSeparators" }, outputs: { tokenize: "tokenize", inputValueChange: "inputValueChange", deleteItem: "deleteItem" }, host: { classAttribute: "ant-select-selector" }, viewQueries: [{ propertyName: "nzSelectSearchComponent", first: true, predicate: NzSelectSearchComponent, descendants: true }], exportAs: ["nzSelectTopControl"], usesOnChanges: true, ngImport: i0, template: `
    <!--single mode-->
    @switch (mode) {
      @case ('default') {
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
        @if (isShowSingleLabel) {
          <nz-select-item
            [deletable]="false"
            [disabled]="false"
            [removeIcon]="removeIcon"
            [label]="listOfTopItem[0].nzLabel"
            [contentTemplateOutlet]="customTemplate"
            [contentTemplateOutletContext]="listOfTopItem[0]"
          ></nz-select-item>
        }
      }
      @default {
        <!--multiple or tags mode-->
        @for (item of listOfSlicedItem; track item.nzValue) {
          <nz-select-item
            [removeIcon]="removeIcon"
            [label]="item.nzLabel"
            [disabled]="item.nzDisabled || disabled"
            [contentTemplateOutlet]="item.contentTemplateOutlet"
            [deletable]="true"
            [contentTemplateOutletContext]="item.contentTemplateOutletContext"
            (delete)="onDeleteItem(item.contentTemplateOutletContext)"
          ></nz-select-item>
        }
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="true"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
      }
    }
    @if (isShowPlaceholder) {
      <nz-select-placeholder [placeholder]="placeHolder"></nz-select-placeholder>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: NzSelectSearchComponent, selector: "nz-select-search", inputs: ["nzId", "disabled", "mirrorSync", "showInput", "focusTrigger", "value", "autofocus"], outputs: ["valueChange", "isComposingChange"] }, { kind: "component", type: NzSelectItemComponent, selector: "nz-select-item", inputs: ["disabled", "label", "deletable", "removeIcon", "contentTemplateOutletContext", "contentTemplateOutlet"], outputs: ["delete"] }, { kind: "component", type: NzSelectPlaceholderComponent, selector: "nz-select-placeholder", inputs: ["placeholder"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectTopControlComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select-top-control',
                    exportAs: 'nzSelectTopControl',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <!--single mode-->
    @switch (mode) {
      @case ('default') {
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
        @if (isShowSingleLabel) {
          <nz-select-item
            [deletable]="false"
            [disabled]="false"
            [removeIcon]="removeIcon"
            [label]="listOfTopItem[0].nzLabel"
            [contentTemplateOutlet]="customTemplate"
            [contentTemplateOutletContext]="listOfTopItem[0]"
          ></nz-select-item>
        }
      }
      @default {
        <!--multiple or tags mode-->
        @for (item of listOfSlicedItem; track item.nzValue) {
          <nz-select-item
            [removeIcon]="removeIcon"
            [label]="item.nzLabel"
            [disabled]="item.nzDisabled || disabled"
            [contentTemplateOutlet]="item.contentTemplateOutlet"
            [deletable]="true"
            [contentTemplateOutletContext]="item.contentTemplateOutletContext"
            (delete)="onDeleteItem(item.contentTemplateOutletContext)"
          ></nz-select-item>
        }
        <nz-select-search
          [nzId]="nzId"
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="true"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></nz-select-search>
      }
    }
    @if (isShowPlaceholder) {
      <nz-select-placeholder [placeholder]="placeHolder"></nz-select-placeholder>
    }
  `,
                    host: { class: 'ant-select-selector' },
                    imports: [NzSelectSearchComponent, NzSelectItemComponent, NzSelectPlaceholderComponent]
                }]
        }], propDecorators: { nzId: [{
                type: Input
            }], showSearch: [{
                type: Input
            }], placeHolder: [{
                type: Input
            }], open: [{
                type: Input
            }], maxTagCount: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], autofocus: [{
                type: Input
            }], disabled: [{
                type: Input
            }], mode: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], maxTagPlaceholder: [{
                type: Input
            }], removeIcon: [{
                type: Input
            }], listOfTopItem: [{
                type: Input
            }], tokenSeparators: [{
                type: Input
            }], tokenize: [{
                type: Output
            }], inputValueChange: [{
                type: Output
            }], deleteItem: [{
                type: Output
            }], nzSelectSearchComponent: [{
                type: ViewChild,
                args: [NzSelectSearchComponent]
            }] } });

const defaultFilterOption = (searchValue, item) => {
    if (item && item.nzLabel) {
        return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    }
    else {
        return false;
    }
};
const NZ_CONFIG_MODULE_NAME = 'select';
let NzSelectComponent = (() => {
    let _nzOptionHeightPx_decorators;
    let _nzOptionHeightPx_initializers = [];
    let _nzOptionHeightPx_extraInitializers = [];
    let _nzSuffixIcon_decorators;
    let _nzSuffixIcon_initializers = [];
    let _nzSuffixIcon_extraInitializers = [];
    let _nzBorderless_decorators;
    let _nzBorderless_initializers = [];
    let _nzBorderless_extraInitializers = [];
    let _nzBackdrop_decorators;
    let _nzBackdrop_initializers = [];
    let _nzBackdrop_extraInitializers = [];
    return class NzSelectComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzOptionHeightPx_decorators = [WithConfig()];
            _nzSuffixIcon_decorators = [WithConfig()];
            _nzBorderless_decorators = [WithConfig()];
            _nzBackdrop_decorators = [WithConfig()];
            __esDecorate(null, null, _nzOptionHeightPx_decorators, { kind: "field", name: "nzOptionHeightPx", static: false, private: false, access: { has: obj => "nzOptionHeightPx" in obj, get: obj => obj.nzOptionHeightPx, set: (obj, value) => { obj.nzOptionHeightPx = value; } }, metadata: _metadata }, _nzOptionHeightPx_initializers, _nzOptionHeightPx_extraInitializers);
            __esDecorate(null, null, _nzSuffixIcon_decorators, { kind: "field", name: "nzSuffixIcon", static: false, private: false, access: { has: obj => "nzSuffixIcon" in obj, get: obj => obj.nzSuffixIcon, set: (obj, value) => { obj.nzSuffixIcon = value; } }, metadata: _metadata }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
            __esDecorate(null, null, _nzBorderless_decorators, { kind: "field", name: "nzBorderless", static: false, private: false, access: { has: obj => "nzBorderless" in obj, get: obj => obj.nzBorderless, set: (obj, value) => { obj.nzBorderless = value; } }, metadata: _metadata }, _nzBorderless_initializers, _nzBorderless_extraInitializers);
            __esDecorate(null, null, _nzBackdrop_decorators, { kind: "field", name: "nzBackdrop", static: false, private: false, access: { has: obj => "nzBackdrop" in obj, get: obj => obj.nzBackdrop, set: (obj, value) => { obj.nzBackdrop = value; } }, metadata: _metadata }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        ngZone;
        destroy$;
        nzConfigService;
        cdr;
        host;
        renderer;
        platform;
        focusMonitor;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzId = null;
        nzSize = 'default';
        nzStatus = '';
        nzOptionHeightPx = __runInitializers(this, _nzOptionHeightPx_initializers, 32);
        nzOptionOverflowSize = (__runInitializers(this, _nzOptionHeightPx_extraInitializers), 8);
        nzDropdownClassName = null;
        nzDropdownMatchSelectWidth = true;
        nzDropdownStyle = null;
        nzNotFoundContent = undefined;
        nzPlaceHolder = null;
        nzPlacement = null;
        nzMaxTagCount = Infinity;
        nzDropdownRender = null;
        nzCustomTemplate = null;
        nzSuffixIcon = __runInitializers(this, _nzSuffixIcon_initializers, null);
        nzClearIcon = (__runInitializers(this, _nzSuffixIcon_extraInitializers), null);
        nzRemoveIcon = null;
        nzMenuItemSelectedIcon = null;
        nzTokenSeparators = [];
        nzMaxTagPlaceholder = null;
        nzMaxMultipleCount = Infinity;
        nzMode = 'default';
        nzFilterOption = defaultFilterOption;
        compareWith = (o1, o2) => o1 === o2;
        nzAllowClear = false;
        nzBorderless = __runInitializers(this, _nzBorderless_initializers, false);
        nzShowSearch = (__runInitializers(this, _nzBorderless_extraInitializers), false);
        nzLoading = false;
        nzAutoFocus = false;
        nzAutoClearSearchValue = true;
        nzServerSearch = false;
        nzDisabled = false;
        nzOpen = false;
        nzSelectOnTab = false;
        nzBackdrop = __runInitializers(this, _nzBackdrop_initializers, false);
        nzOptions = (__runInitializers(this, _nzBackdrop_extraInitializers), []);
        set nzShowArrow(value) {
            this._nzShowArrow = value;
        }
        get nzShowArrow() {
            return this._nzShowArrow === undefined ? this.nzMode === 'default' : this._nzShowArrow;
        }
        get isMultiple() {
            return this.nzMode === 'multiple' || this.nzMode === 'tags';
        }
        get isMaxMultipleCountSet() {
            return this.isMultiple && this.nzMaxMultipleCount !== Infinity;
        }
        get isMaxMultipleCountReached() {
            return this.nzMaxMultipleCount !== Infinity && this.listOfValue.length === this.nzMaxMultipleCount;
        }
        nzOnSearch = new EventEmitter();
        nzScrollToBottom = new EventEmitter();
        nzOpenChange = new EventEmitter();
        nzBlur = new EventEmitter();
        nzFocus = new EventEmitter();
        originElement;
        cdkConnectedOverlay;
        nzSelectTopControlComponent;
        listOfNzOptionComponent;
        listOfNzOptionGroupComponent;
        nzOptionGroupComponentElement;
        nzSelectTopControlComponentElement;
        finalSize = computed(() => {
            if (this.compactSize) {
                return this.compactSize();
            }
            return this.size();
        });
        size = signal(this.nzSize);
        compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
        listOfValue$ = new BehaviorSubject([]);
        listOfTemplateItem$ = new BehaviorSubject([]);
        listOfTagAndTemplateItem = [];
        searchValue = '';
        isReactiveDriven = false;
        value;
        _nzShowArrow;
        requestId = -1;
        isNzDisableFirstChange = true;
        onChange = () => { };
        onTouched = () => { };
        dropdownPosition = 'bottomLeft';
        triggerWidth = null;
        listOfContainerItem = [];
        listOfTopItem = [];
        activatedValue = null;
        listOfValue = [];
        focused = false;
        dir = 'ltr';
        positions = [];
        // status
        prefixCls = 'ant-select';
        statusCls = {};
        status = '';
        hasFeedback = false;
        generateTagItem(value) {
            return {
                nzValue: value,
                nzLabel: value,
                type: 'item'
            };
        }
        onItemClick(value) {
            this.activatedValue = value;
            if (this.nzMode === 'default') {
                if (this.listOfValue.length === 0 || !this.compareWith(this.listOfValue[0], value)) {
                    this.updateListOfValue([value]);
                }
                this.setOpenState(false);
            }
            else {
                const targetIndex = this.listOfValue.findIndex(o => this.compareWith(o, value));
                if (targetIndex !== -1) {
                    const listOfValueAfterRemoved = this.listOfValue.filter((_, i) => i !== targetIndex);
                    this.updateListOfValue(listOfValueAfterRemoved);
                }
                else if (this.listOfValue.length < this.nzMaxMultipleCount) {
                    const listOfValueAfterAdded = [...this.listOfValue, value];
                    this.updateListOfValue(listOfValueAfterAdded);
                }
                this.focus();
                if (this.nzAutoClearSearchValue) {
                    this.clearInput();
                }
            }
        }
        onItemDelete(item) {
            const listOfSelectedValue = this.listOfValue.filter(v => !this.compareWith(v, item.nzValue));
            this.updateListOfValue(listOfSelectedValue);
            this.clearInput();
        }
        updateListOfContainerItem() {
            let listOfContainerItem = this.listOfTagAndTemplateItem
                .filter(item => !item.nzHide)
                .filter(item => {
                if (!this.nzServerSearch && this.searchValue) {
                    return this.nzFilterOption(this.searchValue, item);
                }
                else {
                    return true;
                }
            });
            if (this.nzMode === 'tags' && this.searchValue) {
                const matchedItem = this.listOfTagAndTemplateItem.find(item => item.nzLabel === this.searchValue);
                if (!matchedItem) {
                    const tagItem = this.generateTagItem(this.searchValue);
                    listOfContainerItem = [tagItem, ...listOfContainerItem];
                    this.activatedValue = tagItem.nzValue;
                }
                else {
                    this.activatedValue = matchedItem.nzValue;
                }
            }
            const activatedItem = listOfContainerItem.find(item => item.nzLabel === this.searchValue) ||
                listOfContainerItem.find(item => this.compareWith(item.nzValue, this.activatedValue)) ||
                listOfContainerItem.find(item => this.compareWith(item.nzValue, this.listOfValue[0])) ||
                listOfContainerItem[0];
            this.activatedValue = (activatedItem && activatedItem.nzValue) || null;
            let listOfGroupLabel = [];
            if (this.isReactiveDriven) {
                listOfGroupLabel = [...new Set(this.nzOptions.filter(o => o.groupLabel).map(o => o.groupLabel))];
            }
            else {
                if (this.listOfNzOptionGroupComponent) {
                    listOfGroupLabel = this.listOfNzOptionGroupComponent.map(o => o.nzLabel);
                }
            }
            /** insert group item **/
            listOfGroupLabel.forEach(label => {
                const index = listOfContainerItem.findIndex(item => label === item.groupLabel);
                if (index > -1) {
                    const groupItem = { groupLabel: label, type: 'group', key: label };
                    listOfContainerItem.splice(index, 0, groupItem);
                }
            });
            this.listOfContainerItem = [...listOfContainerItem];
            this.updateCdkConnectedOverlayPositions();
        }
        clearInput() {
            this.nzSelectTopControlComponent.clearInputValue();
        }
        updateListOfValue(listOfValue) {
            const covertListToModel = (list, mode) => {
                if (mode === 'default') {
                    if (list.length > 0) {
                        return list[0];
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return list;
                }
            };
            const model = covertListToModel(listOfValue, this.nzMode);
            if (this.value !== model) {
                this.listOfValue = listOfValue;
                this.listOfValue$.next(listOfValue);
                this.value = model;
                this.onChange(this.value);
            }
        }
        onTokenSeparate(listOfLabel) {
            const listOfMatchedValue = this.listOfTagAndTemplateItem
                .filter(item => listOfLabel.findIndex(label => label === item.nzLabel) !== -1)
                .map(item => item.nzValue)
                .filter(item => this.listOfValue.findIndex(v => this.compareWith(v, item)) === -1);
            /**
             * Limit the number of selected item to nzMaxMultipleCount
             */
            const limitWithinMaxCount = (value) => this.isMaxMultipleCountSet ? value.slice(0, this.nzMaxMultipleCount) : value;
            if (this.nzMode === 'multiple') {
                const updateValue = limitWithinMaxCount([...this.listOfValue, ...listOfMatchedValue]);
                this.updateListOfValue(updateValue);
            }
            else if (this.nzMode === 'tags') {
                const listOfUnMatchedLabel = listOfLabel.filter(label => this.listOfTagAndTemplateItem.findIndex(item => item.nzLabel === label) === -1);
                const updateValue = limitWithinMaxCount([...this.listOfValue, ...listOfMatchedValue, ...listOfUnMatchedLabel]);
                this.updateListOfValue(updateValue);
            }
            this.clearInput();
        }
        onKeyDown(e) {
            if (this.nzDisabled) {
                return;
            }
            const listOfFilteredOptionNotDisabled = this.listOfContainerItem
                .filter(item => item.type === 'item')
                .filter(item => !item.nzDisabled);
            const activatedIndex = listOfFilteredOptionNotDisabled.findIndex(item => this.compareWith(item.nzValue, this.activatedValue));
            switch (e.keyCode) {
                case UP_ARROW:
                    e.preventDefault();
                    if (this.nzOpen && listOfFilteredOptionNotDisabled.length > 0) {
                        const preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
                        this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].nzValue;
                    }
                    break;
                case DOWN_ARROW:
                    e.preventDefault();
                    if (this.nzOpen && listOfFilteredOptionNotDisabled.length > 0) {
                        const nextIndex = activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
                        this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].nzValue;
                    }
                    else {
                        this.setOpenState(true);
                    }
                    break;
                case ENTER:
                    e.preventDefault();
                    if (this.nzOpen) {
                        if (isNotNil(this.activatedValue) && activatedIndex !== -1) {
                            this.onItemClick(this.activatedValue);
                        }
                    }
                    else {
                        this.setOpenState(true);
                    }
                    break;
                case SPACE:
                    if (!this.nzOpen) {
                        this.setOpenState(true);
                        e.preventDefault();
                    }
                    break;
                case TAB:
                    if (this.nzSelectOnTab) {
                        if (this.nzOpen) {
                            e.preventDefault();
                            if (isNotNil(this.activatedValue)) {
                                this.onItemClick(this.activatedValue);
                            }
                        }
                    }
                    else {
                        this.setOpenState(false);
                    }
                    break;
                case ESCAPE:
                    /**
                     * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
                     */
                    break;
                default:
                    if (!this.nzOpen) {
                        this.setOpenState(true);
                    }
            }
        }
        setOpenState(value) {
            if (this.nzOpen !== value) {
                this.nzOpen = value;
                this.nzOpenChange.emit(value);
                this.onOpenChange();
                this.cdr.markForCheck();
            }
        }
        onOpenChange() {
            this.updateCdkConnectedOverlayStatus();
            if (this.nzAutoClearSearchValue) {
                this.clearInput();
            }
        }
        onInputValueChange(value) {
            this.searchValue = value;
            this.updateListOfContainerItem();
            this.nzOnSearch.emit(value);
            this.updateCdkConnectedOverlayPositions();
        }
        onClearSelection() {
            this.updateListOfValue([]);
        }
        onClickOutside(event) {
            const target = _getEventTarget(event);
            if (!this.host.nativeElement.contains(target)) {
                this.setOpenState(false);
            }
        }
        focus() {
            this.nzSelectTopControlComponent.focus();
        }
        blur() {
            this.nzSelectTopControlComponent.blur();
        }
        onPositionChange(position) {
            const placement = getPlacementName(position);
            this.dropdownPosition = placement;
        }
        updateCdkConnectedOverlayStatus() {
            if (this.platform.isBrowser && this.originElement.nativeElement) {
                const triggerWidth = this.triggerWidth;
                cancelRequestAnimationFrame(this.requestId);
                this.requestId = reqAnimFrame(() => {
                    // Blink triggers style and layout pipelines anytime the `getBoundingClientRect()` is called, which may cause a
                    // frame drop. That's why it's scheduled through the `requestAnimationFrame` to unload the composite thread.
                    this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
                    if (triggerWidth !== this.triggerWidth) {
                        // The `requestAnimationFrame` will trigger change detection, but we're inside an `OnPush` component which won't have
                        // the `ChecksEnabled` state. Calling `markForCheck()` will allow Angular to run the change detection from the root component
                        // down to the `nz-select`. But we'll trigger only local change detection if the `triggerWidth` has been changed.
                        this.cdr.detectChanges();
                    }
                });
            }
        }
        updateCdkConnectedOverlayPositions() {
            reqAnimFrame(() => {
                this.cdkConnectedOverlay?.overlayRef?.updatePosition();
            });
        }
        noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
        nzFormStatusService = inject(NzFormStatusService, { optional: true });
        nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
        constructor(ngZone, destroy$, nzConfigService, cdr, host, renderer, platform, focusMonitor, directionality) {
            this.ngZone = ngZone;
            this.destroy$ = destroy$;
            this.nzConfigService = nzConfigService;
            this.cdr = cdr;
            this.host = host;
            this.renderer = renderer;
            this.platform = platform;
            this.focusMonitor = focusMonitor;
            this.directionality = directionality;
        }
        writeValue(modelValue) {
            /** https://github.com/angular/angular/issues/14988 **/
            if (this.value !== modelValue) {
                this.value = modelValue;
                const covertModelToList = (model, mode) => {
                    if (model === null || model === undefined) {
                        return [];
                    }
                    else if (mode === 'default') {
                        return [model];
                    }
                    else {
                        return model;
                    }
                };
                const listOfValue = covertModelToList(modelValue, this.nzMode);
                this.listOfValue = listOfValue;
                this.listOfValue$.next(listOfValue);
                this.cdr.markForCheck();
            }
        }
        registerOnChange(fn) {
            this.onChange = fn;
        }
        registerOnTouched(fn) {
            this.onTouched = fn;
        }
        setDisabledState(disabled) {
            this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || disabled;
            this.isNzDisableFirstChange = false;
            if (this.nzDisabled) {
                this.setOpenState(false);
            }
            this.cdr.markForCheck();
        }
        ngOnChanges({ nzOpen, nzDisabled, nzOptions, nzStatus, nzPlacement, nzSize }) {
            if (nzOpen) {
                this.onOpenChange();
            }
            if (nzDisabled && this.nzDisabled) {
                this.setOpenState(false);
            }
            if (nzOptions) {
                this.isReactiveDriven = true;
                const listOfOptions = this.nzOptions || [];
                const listOfTransformedItem = listOfOptions.map(item => {
                    return {
                        template: item.label instanceof TemplateRef ? item.label : null,
                        nzTitle: this.getTitle(item.title, item.label),
                        nzLabel: typeof item.label === 'string' || typeof item.label === 'number' ? item.label : null,
                        nzValue: item.value,
                        nzDisabled: item.disabled || false,
                        nzHide: item.hide || false,
                        nzCustomContent: item.label instanceof TemplateRef,
                        groupLabel: item.groupLabel || null,
                        type: 'item',
                        key: item.key === undefined ? item.value : item.key
                    };
                });
                this.listOfTemplateItem$.next(listOfTransformedItem);
            }
            if (nzStatus) {
                this.setStatusStyles(this.nzStatus, this.hasFeedback);
            }
            if (nzPlacement) {
                const { currentValue } = nzPlacement;
                this.dropdownPosition = currentValue;
                const listOfPlacement = ['bottomLeft', 'topLeft', 'bottomRight', 'topRight'];
                if (currentValue && listOfPlacement.includes(currentValue)) {
                    this.positions = [POSITION_MAP[currentValue]];
                }
                else {
                    this.positions = listOfPlacement.map(e => POSITION_MAP[e]);
                }
            }
            if (nzSize) {
                this.size.set(nzSize.currentValue);
            }
        }
        ngOnInit() {
            this.nzFormStatusService?.formStatusChanges
                .pipe(distinctUntilChanged((pre, cur) => {
                return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
            }), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })), takeUntil(this.destroy$))
                .subscribe(({ status, hasFeedback }) => {
                this.setStatusStyles(status, hasFeedback);
            });
            this.focusMonitor
                .monitor(this.host, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe(focusOrigin => {
                if (!focusOrigin) {
                    this.focused = false;
                    this.cdr.markForCheck();
                    this.nzBlur.emit();
                    Promise.resolve().then(() => {
                        this.onTouched();
                    });
                }
                else {
                    this.focused = true;
                    this.cdr.markForCheck();
                    this.nzFocus.emit();
                }
            });
            combineLatest([this.listOfValue$, this.listOfTemplateItem$])
                .pipe(takeUntil(this.destroy$))
                .subscribe(([listOfSelectedValue, listOfTemplateItem]) => {
                const listOfTagItem = listOfSelectedValue
                    .filter(() => this.nzMode === 'tags')
                    .filter(value => listOfTemplateItem.findIndex(o => this.compareWith(o.nzValue, value)) === -1)
                    .map(value => this.listOfTopItem.find(o => this.compareWith(o.nzValue, value)) || this.generateTagItem(value));
                this.listOfTagAndTemplateItem = [...listOfTemplateItem, ...listOfTagItem];
                this.listOfTopItem = this.listOfValue
                    .map(v => [...this.listOfTagAndTemplateItem, ...this.listOfTopItem].find(item => this.compareWith(v, item.nzValue)))
                    .filter(item => !!item);
                this.updateListOfContainerItem();
            });
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.nzConfigService
                .getConfigChangeEventForComponent('select')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.size.set(this.nzSize);
                this.cdr.markForCheck();
            });
            this.dir = this.directionality.value;
            fromEventOutsideAngular(this.host.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                if ((this.nzOpen && this.nzShowSearch) || this.nzDisabled) {
                    return;
                }
                this.ngZone.run(() => this.setOpenState(!this.nzOpen));
            });
            // Caretaker note: we could've added this listener within the template `(overlayKeydown)="..."`,
            // but with this approach, it'll run change detection on each keyboard click, and also it'll run
            // `markForCheck()` internally, which means the whole component tree (starting from the root and
            // going down to the select component) will be re-checked and updated (if needed).
            // This is safe to do that manually since `setOpenState()` calls `markForCheck()` if needed.
            this.cdkConnectedOverlay.overlayKeydown.pipe(takeUntil(this.destroy$)).subscribe(event => {
                if (event.keyCode === ESCAPE) {
                    this.setOpenState(false);
                }
            });
        }
        ngAfterContentInit() {
            if (!this.isReactiveDriven) {
                merge(this.listOfNzOptionGroupComponent.changes, this.listOfNzOptionComponent.changes)
                    .pipe(startWith(true), switchMap(() => merge(...[
                    this.listOfNzOptionComponent.changes,
                    this.listOfNzOptionGroupComponent.changes,
                    ...this.listOfNzOptionComponent.map(option => option.changes),
                    ...this.listOfNzOptionGroupComponent.map(option => option.changes)
                ]).pipe(startWith(true))), takeUntil(this.destroy$))
                    .subscribe(() => {
                    const listOfOptionInterface = this.listOfNzOptionComponent.toArray().map(item => {
                        const { template, nzLabel, nzValue, nzKey, nzDisabled, nzHide, nzCustomContent, groupLabel } = item;
                        return {
                            template,
                            nzLabel,
                            nzValue,
                            nzDisabled,
                            nzHide,
                            nzCustomContent,
                            groupLabel,
                            nzTitle: this.getTitle(item.nzTitle, item.nzLabel),
                            type: 'item',
                            key: nzKey === undefined ? nzValue : nzKey
                        };
                    });
                    this.listOfTemplateItem$.next(listOfOptionInterface);
                    this.cdr.markForCheck();
                });
            }
        }
        ngOnDestroy() {
            cancelRequestAnimationFrame(this.requestId);
            this.focusMonitor.stopMonitoring(this.host);
        }
        setStatusStyles(status, hasFeedback) {
            this.status = status;
            this.hasFeedback = hasFeedback;
            this.cdr.markForCheck();
            // render status if nzStatus is set
            this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
            Object.keys(this.statusCls).forEach(status => {
                if (this.statusCls[status]) {
                    this.renderer.addClass(this.host.nativeElement, status);
                }
                else {
                    this.renderer.removeClass(this.host.nativeElement, status);
                }
            });
        }
        getTitle(title, label) {
            let rawTitle = undefined;
            if (title === undefined) {
                if (typeof label === 'string' || typeof label === 'number') {
                    rawTitle = label.toString();
                }
            }
            else if (typeof title === 'string' || typeof title === 'number') {
                rawTitle = title.toString();
            }
            return rawTitle;
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectComponent, deps: [{ token: i0.NgZone }, { token: i1$1.NzDestroyService }, { token: i2$2.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i3.Platform }, { token: i1$4.FocusMonitor }, { token: i5.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzSelectComponent, isStandalone: true, selector: "nz-select", inputs: { nzId: "nzId", nzSize: "nzSize", nzStatus: "nzStatus", nzOptionHeightPx: "nzOptionHeightPx", nzOptionOverflowSize: "nzOptionOverflowSize", nzDropdownClassName: "nzDropdownClassName", nzDropdownMatchSelectWidth: "nzDropdownMatchSelectWidth", nzDropdownStyle: "nzDropdownStyle", nzNotFoundContent: "nzNotFoundContent", nzPlaceHolder: "nzPlaceHolder", nzPlacement: "nzPlacement", nzMaxTagCount: "nzMaxTagCount", nzDropdownRender: "nzDropdownRender", nzCustomTemplate: "nzCustomTemplate", nzSuffixIcon: "nzSuffixIcon", nzClearIcon: "nzClearIcon", nzRemoveIcon: "nzRemoveIcon", nzMenuItemSelectedIcon: "nzMenuItemSelectedIcon", nzTokenSeparators: "nzTokenSeparators", nzMaxTagPlaceholder: "nzMaxTagPlaceholder", nzMaxMultipleCount: ["nzMaxMultipleCount", "nzMaxMultipleCount", numberAttributeWithInfinityFallback], nzMode: "nzMode", nzFilterOption: "nzFilterOption", compareWith: "compareWith", nzAllowClear: ["nzAllowClear", "nzAllowClear", booleanAttribute], nzBorderless: ["nzBorderless", "nzBorderless", booleanAttribute], nzShowSearch: ["nzShowSearch", "nzShowSearch", booleanAttribute], nzLoading: ["nzLoading", "nzLoading", booleanAttribute], nzAutoFocus: ["nzAutoFocus", "nzAutoFocus", booleanAttribute], nzAutoClearSearchValue: ["nzAutoClearSearchValue", "nzAutoClearSearchValue", booleanAttribute], nzServerSearch: ["nzServerSearch", "nzServerSearch", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzOpen: ["nzOpen", "nzOpen", booleanAttribute], nzSelectOnTab: ["nzSelectOnTab", "nzSelectOnTab", booleanAttribute], nzBackdrop: ["nzBackdrop", "nzBackdrop", booleanAttribute], nzOptions: "nzOptions", nzShowArrow: ["nzShowArrow", "nzShowArrow", booleanAttribute] }, outputs: { nzOnSearch: "nzOnSearch", nzScrollToBottom: "nzScrollToBottom", nzOpenChange: "nzOpenChange", nzBlur: "nzBlur", nzFocus: "nzFocus" }, host: { properties: { "class.ant-select-in-form-item": "!!nzFormStatusService", "class.ant-select-lg": "finalSize() === \"large\"", "class.ant-select-sm": "finalSize() === \"small\"", "class.ant-select-show-arrow": "nzShowArrow", "class.ant-select-disabled": "nzDisabled", "class.ant-select-show-search": "(nzShowSearch || nzMode !== 'default') && !nzDisabled", "class.ant-select-allow-clear": "nzAllowClear", "class.ant-select-borderless": "nzBorderless", "class.ant-select-open": "nzOpen", "class.ant-select-focused": "nzOpen || focused", "class.ant-select-single": "nzMode === 'default'", "class.ant-select-multiple": "nzMode !== 'default'", "class.ant-select-rtl": "dir === 'rtl'" }, classAttribute: "ant-select" }, providers: [
                NzDestroyService,
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => NzSelectComponent),
                    multi: true
                },
                { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'select' }
            ], queries: [{ propertyName: "listOfNzOptionComponent", predicate: NzOptionComponent, descendants: true }, { propertyName: "listOfNzOptionGroupComponent", predicate: NzOptionGroupComponent, descendants: true }], viewQueries: [{ propertyName: "originElement", first: true, predicate: CdkOverlayOrigin, descendants: true, read: ElementRef, static: true }, { propertyName: "cdkConnectedOverlay", first: true, predicate: CdkConnectedOverlay, descendants: true, static: true }, { propertyName: "nzSelectTopControlComponent", first: true, predicate: NzSelectTopControlComponent, descendants: true, static: true }, { propertyName: "nzOptionGroupComponentElement", first: true, predicate: NzOptionGroupComponent, descendants: true, read: ElementRef, static: true }, { propertyName: "nzSelectTopControlComponentElement", first: true, predicate: NzSelectTopControlComponent, descendants: true, read: ElementRef, static: true }], exportAs: ["nzSelect"], usesOnChanges: true, hostDirectives: [{ directive: i6.NzSpaceCompactItemDirective }], ngImport: i0, template: `
    <nz-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzId]="nzId"
      [open]="nzOpen"
      [disabled]="nzDisabled"
      [mode]="nzMode"
      [@.disabled]="!!noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [maxTagPlaceholder]="nzMaxTagPlaceholder"
      [removeIcon]="nzRemoveIcon"
      [placeHolder]="nzPlaceHolder"
      [maxTagCount]="nzMaxTagCount"
      [customTemplate]="nzCustomTemplate"
      [tokenSeparators]="nzTokenSeparators"
      [showSearch]="nzShowSearch"
      [autofocus]="nzAutoFocus"
      [listOfTopItem]="listOfTopItem"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
    ></nz-select-top-control>
    @if (nzShowArrow || (hasFeedback && !!status) || isMaxMultipleCountSet) {
      <nz-select-arrow
        [showArrow]="nzShowArrow"
        [loading]="nzLoading"
        [search]="nzOpen && nzShowSearch"
        [suffixIcon]="nzSuffixIcon"
        [feedbackIcon]="feedbackIconTpl"
        [nzMaxMultipleCount]="nzMaxMultipleCount"
        [listOfValue]="listOfValue"
        [isMaxMultipleCountSet]="isMaxMultipleCountSet"
      >
        <ng-template #feedbackIconTpl>
          @if (hasFeedback && !!status) {
            <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon>
          }
        </ng-template>
      </nz-select-arrow>
    }

    @if (nzAllowClear && !nzDisabled && listOfValue.length) {
      <nz-select-clear [clearIcon]="nzClearIcon" (clear)="onClearSelection()"></nz-select-clear>
    }
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="nzDropdownClassName!"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayPositions]="positions"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
    >
      <nz-option-container
        [style]="nzDropdownStyle"
        [itemSize]="nzOptionHeightPx"
        [maxItemLength]="nzOptionOverflowSize"
        [matchWidth]="nzDropdownMatchSelectWidth"
        [class.ant-select-dropdown-placement-bottomLeft]="dropdownPosition === 'bottomLeft'"
        [class.ant-select-dropdown-placement-topLeft]="dropdownPosition === 'topLeft'"
        [class.ant-select-dropdown-placement-bottomRight]="dropdownPosition === 'bottomRight'"
        [class.ant-select-dropdown-placement-topRight]="dropdownPosition === 'topRight'"
        [@slideMotion]="'enter'"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="nzMenuItemSelectedIcon"
        [notFoundContent]="nzNotFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="nzDropdownRender"
        [compareWith]="compareWith"
        [mode]="nzMode"
        [isMaxMultipleCountReached]="isMaxMultipleCountReached"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="nzScrollToBottom.emit()"
      ></nz-option-container>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "component", type: NzSelectTopControlComponent, selector: "nz-select-top-control", inputs: ["nzId", "showSearch", "placeHolder", "open", "maxTagCount", "autofocus", "disabled", "mode", "customTemplate", "maxTagPlaceholder", "removeIcon", "listOfTopItem", "tokenSeparators"], outputs: ["tokenize", "inputValueChange", "deleteItem"], exportAs: ["nzSelectTopControl"] }, { kind: "directive", type: CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "directive", type: NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { kind: "component", type: NzSelectArrowComponent, selector: "nz-select-arrow", inputs: ["listOfValue", "loading", "search", "showArrow", "isMaxMultipleCountSet", "suffixIcon", "feedbackIcon", "nzMaxMultipleCount"] }, { kind: "component", type: NzFormItemFeedbackIconComponent, selector: "nz-form-item-feedback-icon", inputs: ["status"], exportAs: ["nzFormFeedbackIcon"] }, { kind: "component", type: NzSelectClearComponent, selector: "nz-select-clear", inputs: ["clearIcon"], outputs: ["clear"] }, { kind: "directive", type: CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "ngmodule", type: NzOverlayModule }, { kind: "directive", type: i7.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { kind: "component", type: NzOptionContainerComponent, selector: "nz-option-container", inputs: ["notFoundContent", "menuItemSelectedIcon", "dropdownRender", "activatedValue", "listOfSelectedValue", "compareWith", "mode", "matchWidth", "itemSize", "maxItemLength", "isMaxMultipleCountReached", "listOfContainerItem"], outputs: ["itemClick", "scrollToBottom"], exportAs: ["nzOptionContainer"] }], animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select',
                    exportAs: 'nzSelect',
                    preserveWhitespaces: false,
                    providers: [
                        NzDestroyService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzSelectComponent),
                            multi: true
                        },
                        { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'select' }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [slideMotion],
                    template: `
    <nz-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzId]="nzId"
      [open]="nzOpen"
      [disabled]="nzDisabled"
      [mode]="nzMode"
      [@.disabled]="!!noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [maxTagPlaceholder]="nzMaxTagPlaceholder"
      [removeIcon]="nzRemoveIcon"
      [placeHolder]="nzPlaceHolder"
      [maxTagCount]="nzMaxTagCount"
      [customTemplate]="nzCustomTemplate"
      [tokenSeparators]="nzTokenSeparators"
      [showSearch]="nzShowSearch"
      [autofocus]="nzAutoFocus"
      [listOfTopItem]="listOfTopItem"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
    ></nz-select-top-control>
    @if (nzShowArrow || (hasFeedback && !!status) || isMaxMultipleCountSet) {
      <nz-select-arrow
        [showArrow]="nzShowArrow"
        [loading]="nzLoading"
        [search]="nzOpen && nzShowSearch"
        [suffixIcon]="nzSuffixIcon"
        [feedbackIcon]="feedbackIconTpl"
        [nzMaxMultipleCount]="nzMaxMultipleCount"
        [listOfValue]="listOfValue"
        [isMaxMultipleCountSet]="isMaxMultipleCountSet"
      >
        <ng-template #feedbackIconTpl>
          @if (hasFeedback && !!status) {
            <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon>
          }
        </ng-template>
      </nz-select-arrow>
    }

    @if (nzAllowClear && !nzDisabled && listOfValue.length) {
      <nz-select-clear [clearIcon]="nzClearIcon" (clear)="onClearSelection()"></nz-select-clear>
    }
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="nzDropdownClassName!"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayPositions]="positions"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
    >
      <nz-option-container
        [style]="nzDropdownStyle"
        [itemSize]="nzOptionHeightPx"
        [maxItemLength]="nzOptionOverflowSize"
        [matchWidth]="nzDropdownMatchSelectWidth"
        [class.ant-select-dropdown-placement-bottomLeft]="dropdownPosition === 'bottomLeft'"
        [class.ant-select-dropdown-placement-topLeft]="dropdownPosition === 'topLeft'"
        [class.ant-select-dropdown-placement-bottomRight]="dropdownPosition === 'bottomRight'"
        [class.ant-select-dropdown-placement-topRight]="dropdownPosition === 'topRight'"
        [@slideMotion]="'enter'"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="nzMenuItemSelectedIcon"
        [notFoundContent]="nzNotFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="nzDropdownRender"
        [compareWith]="compareWith"
        [mode]="nzMode"
        [isMaxMultipleCountReached]="isMaxMultipleCountReached"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="nzScrollToBottom.emit()"
      ></nz-option-container>
    </ng-template>
  `,
                    host: {
                        class: 'ant-select',
                        '[class.ant-select-in-form-item]': '!!nzFormStatusService',
                        '[class.ant-select-lg]': 'finalSize() === "large"',
                        '[class.ant-select-sm]': 'finalSize() === "small"',
                        '[class.ant-select-show-arrow]': `nzShowArrow`,
                        '[class.ant-select-disabled]': 'nzDisabled',
                        '[class.ant-select-show-search]': `(nzShowSearch || nzMode !== 'default') && !nzDisabled`,
                        '[class.ant-select-allow-clear]': 'nzAllowClear',
                        '[class.ant-select-borderless]': 'nzBorderless',
                        '[class.ant-select-open]': 'nzOpen',
                        '[class.ant-select-focused]': 'nzOpen || focused',
                        '[class.ant-select-single]': `nzMode === 'default'`,
                        '[class.ant-select-multiple]': `nzMode !== 'default'`,
                        '[class.ant-select-rtl]': `dir === 'rtl'`
                    },
                    hostDirectives: [NzSpaceCompactItemDirective],
                    imports: [
                        NzSelectTopControlComponent,
                        CdkOverlayOrigin,
                        NzNoAnimationDirective,
                        NzSelectArrowComponent,
                        NzFormItemFeedbackIconComponent,
                        NzSelectClearComponent,
                        CdkConnectedOverlay,
                        NzOverlayModule,
                        NzOptionContainerComponent
                    ]
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i1$1.NzDestroyService }, { type: i2$2.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i3.Platform }, { type: i1$4.FocusMonitor }, { type: i5.Directionality }], propDecorators: { nzId: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzOptionHeightPx: [{
                type: Input
            }], nzOptionOverflowSize: [{
                type: Input
            }], nzDropdownClassName: [{
                type: Input
            }], nzDropdownMatchSelectWidth: [{
                type: Input
            }], nzDropdownStyle: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzMaxTagCount: [{
                type: Input
            }], nzDropdownRender: [{
                type: Input
            }], nzCustomTemplate: [{
                type: Input
            }], nzSuffixIcon: [{
                type: Input
            }], nzClearIcon: [{
                type: Input
            }], nzRemoveIcon: [{
                type: Input
            }], nzMenuItemSelectedIcon: [{
                type: Input
            }], nzTokenSeparators: [{
                type: Input
            }], nzMaxTagPlaceholder: [{
                type: Input
            }], nzMaxMultipleCount: [{
                type: Input,
                args: [{ transform: numberAttributeWithInfinityFallback }]
            }], nzMode: [{
                type: Input
            }], nzFilterOption: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], nzAllowClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzBorderless: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzShowSearch: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzLoading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAutoFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAutoClearSearchValue: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzServerSearch: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzOpen: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzSelectOnTab: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzBackdrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzOptions: [{
                type: Input
            }], nzShowArrow: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzOnSearch: [{
                type: Output
            }], nzScrollToBottom: [{
                type: Output
            }], nzOpenChange: [{
                type: Output
            }], nzBlur: [{
                type: Output
            }], nzFocus: [{
                type: Output
            }], originElement: [{
                type: ViewChild,
                args: [CdkOverlayOrigin, { static: true, read: ElementRef }]
            }], cdkConnectedOverlay: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: true }]
            }], nzSelectTopControlComponent: [{
                type: ViewChild,
                args: [NzSelectTopControlComponent, { static: true }]
            }], listOfNzOptionComponent: [{
                type: ContentChildren,
                args: [NzOptionComponent, { descendants: true }]
            }], listOfNzOptionGroupComponent: [{
                type: ContentChildren,
                args: [NzOptionGroupComponent, { descendants: true }]
            }], nzOptionGroupComponentElement: [{
                type: ViewChild,
                args: [NzOptionGroupComponent, { static: true, read: ElementRef }]
            }], nzSelectTopControlComponentElement: [{
                type: ViewChild,
                args: [NzSelectTopControlComponent, { static: true, read: ElementRef }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzSelectModule, imports: [NzOptionComponent,
            NzSelectComponent,
            NzOptionContainerComponent,
            NzOptionGroupComponent,
            NzOptionItemComponent,
            NzSelectTopControlComponent,
            NzSelectSearchComponent,
            NzSelectItemComponent,
            NzSelectClearComponent,
            NzSelectArrowComponent,
            NzSelectPlaceholderComponent,
            NzOptionItemGroupComponent], exports: [NzOptionComponent,
            NzSelectComponent,
            NzOptionGroupComponent,
            NzSelectArrowComponent,
            NzSelectClearComponent,
            NzSelectItemComponent,
            NzSelectPlaceholderComponent,
            NzSelectSearchComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectModule, imports: [NzSelectComponent,
            NzOptionContainerComponent,
            NzOptionItemComponent,
            NzSelectTopControlComponent,
            NzSelectSearchComponent,
            NzSelectItemComponent,
            NzSelectClearComponent,
            NzSelectArrowComponent,
            NzSelectPlaceholderComponent,
            NzOptionItemGroupComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzOptionComponent,
                        NzSelectComponent,
                        NzOptionContainerComponent,
                        NzOptionGroupComponent,
                        NzOptionItemComponent,
                        NzSelectTopControlComponent,
                        NzSelectSearchComponent,
                        NzSelectItemComponent,
                        NzSelectClearComponent,
                        NzSelectArrowComponent,
                        NzSelectPlaceholderComponent,
                        NzOptionItemGroupComponent
                    ],
                    exports: [
                        NzOptionComponent,
                        NzSelectComponent,
                        NzOptionGroupComponent,
                        NzSelectArrowComponent,
                        NzSelectClearComponent,
                        NzSelectItemComponent,
                        NzSelectPlaceholderComponent,
                        NzSelectSearchComponent
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
 * Generated bundle index. Do not edit.
 */

export { NzOptionComponent, NzOptionContainerComponent, NzOptionGroupComponent, NzOptionItemComponent, NzOptionItemGroupComponent, NzSelectArrowComponent, NzSelectClearComponent, NzSelectComponent, NzSelectItemComponent, NzSelectModule, NzSelectPlaceholderComponent, NzSelectSearchComponent, NzSelectTopControlComponent };
//# sourceMappingURL=ng-zorro-antd-select.mjs.map
