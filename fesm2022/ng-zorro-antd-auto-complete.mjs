import * as i0 from '@angular/core';
import { Input, ViewEncapsulation, ChangeDetectionStrategy, Component, EventEmitter, inject, booleanAttribute, Output, forwardRef, Directive, TemplateRef, ViewChild, ViewChildren, ContentChildren, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { Subject, Subscription, defer, merge } from 'rxjs';
import { filter, takeUntil, tap, delay, switchMap } from 'rxjs/operators';
import { fromEventOutsideAngular, scrollIntoView, numberAttributeWithZeroFallback } from 'ng-zorro-antd/core/util';
import { UP_ARROW, DOWN_ARROW, ESCAPE, TAB, ENTER } from '@angular/cdk/keycodes';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, ConnectionPositionPair } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputGroupWhitSuffixOrPrefixDirective } from 'ng-zorro-antd/input';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NZ_AFTER_NEXT_RENDER$ } from 'ng-zorro-antd/core/render';
import * as i1$2 from '@angular/cdk/bidi';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAutocompleteOptgroupComponent {
    nzLabel;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteOptgroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzAutocompleteOptgroupComponent, isStandalone: true, selector: "nz-auto-optgroup", inputs: { nzLabel: "nzLabel" }, exportAs: ["nzAutoOptgroup"], ngImport: i0, template: `
    <div class="ant-select-item ant-select-item-group">
      <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container>
    </div>
    <ng-content select="nz-auto-option"></ng-content>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i1.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteOptgroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-auto-optgroup',
                    exportAs: 'nzAutoOptgroup',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    imports: [NzOutletModule],
                    template: `
    <div class="ant-select-item ant-select-item-group">
      <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container>
    </div>
    <ng-content select="nz-auto-option"></ng-content>
  `
                }]
        }], propDecorators: { nzLabel: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOptionSelectionChange {
    source;
    isUserInput;
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
class NzAutocompleteOptionComponent {
    ngZone;
    changeDetectorRef;
    element;
    nzValue;
    nzLabel;
    nzDisabled = false;
    selectionChange = new EventEmitter();
    mouseEntered = new EventEmitter();
    active = false;
    selected = false;
    nzAutocompleteOptgroupComponent = inject(NzAutocompleteOptgroupComponent, { optional: true });
    destroy$ = new Subject();
    constructor(ngZone, changeDetectorRef, element) {
        this.ngZone = ngZone;
        this.changeDetectorRef = changeDetectorRef;
        this.element = element;
    }
    ngOnInit() {
        fromEventOutsideAngular(this.element.nativeElement, 'mouseenter')
            .pipe(filter(() => this.mouseEntered.observers.length > 0), takeUntil(this.destroy$))
            .subscribe(() => {
            this.ngZone.run(() => this.mouseEntered.emit(this));
        });
        fromEventOutsideAngular(this.element.nativeElement, 'mousedown')
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => event.preventDefault());
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    select(emit = true) {
        this.selected = true;
        this.changeDetectorRef.markForCheck();
        if (emit) {
            this.emitSelectionChangeEvent();
        }
    }
    deselect() {
        this.selected = false;
        this.changeDetectorRef.markForCheck();
        this.emitSelectionChangeEvent();
    }
    /** Git display label */
    getLabel() {
        return this.nzLabel || this.nzValue.toString();
    }
    /** Set active (only styles) */
    setActiveStyles() {
        if (!this.active) {
            this.active = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Unset active (only styles) */
    setInactiveStyles() {
        if (this.active) {
            this.active = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    scrollIntoViewIfNeeded() {
        scrollIntoView(this.element.nativeElement);
    }
    selectViaInteraction() {
        if (!this.nzDisabled) {
            this.selected = !this.selected;
            if (this.selected) {
                this.setActiveStyles();
            }
            else {
                this.setInactiveStyles();
            }
            this.emitSelectionChangeEvent(true);
            this.changeDetectorRef.markForCheck();
        }
    }
    emitSelectionChangeEvent(isUserInput = false) {
        this.selectionChange.emit(new NzOptionSelectionChange(this, isUserInput));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteOptionComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "19.2.2", type: NzAutocompleteOptionComponent, isStandalone: true, selector: "nz-auto-option", inputs: { nzValue: "nzValue", nzLabel: "nzLabel", nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute] }, outputs: { selectionChange: "selectionChange", mouseEntered: "mouseEntered" }, host: { attributes: { "role": "menuitem" }, listeners: { "click": "selectViaInteraction()" }, properties: { "class.ant-select-item-option-grouped": "nzAutocompleteOptgroupComponent", "class.ant-select-item-option-selected": "selected", "class.ant-select-item-option-active": "active", "class.ant-select-item-option-disabled": "nzDisabled", "attr.aria-selected": "selected.toString()", "attr.aria-disabled": "nzDisabled.toString()" }, classAttribute: "ant-select-item ant-select-item-option" }, exportAs: ["nzAutoOption"], ngImport: i0, template: `
    <div class="ant-select-item-option-content">
      <ng-content></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteOptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-auto-option',
                    exportAs: 'nzAutoOption',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-select-item-option-content">
      <ng-content></ng-content>
    </div>
  `,
                    host: {
                        role: 'menuitem',
                        class: 'ant-select-item ant-select-item-option',
                        '[class.ant-select-item-option-grouped]': 'nzAutocompleteOptgroupComponent',
                        '[class.ant-select-item-option-selected]': 'selected',
                        '[class.ant-select-item-option-active]': 'active',
                        '[class.ant-select-item-option-disabled]': 'nzDisabled',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'nzDisabled.toString()',
                        '(click)': 'selectViaInteraction()'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { nzValue: [{
                type: Input
            }], nzLabel: [{
                type: Input
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectionChange: [{
                type: Output
            }], mouseEntered: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NzAutocompleteTriggerDirective),
    multi: true
};
function getNzAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `nz-autocomplete`. ' +
        'Make sure that the id passed to the `nzAutocomplete` is correct and that ' +
        "you're attempting to open it after the ngAfterContentInit hook.");
}
class NzAutocompleteTriggerDirective {
    ngZone;
    elementRef;
    overlay;
    viewContainerRef;
    /** Bind nzAutocomplete component */
    nzAutocomplete;
    onChange = () => { };
    onTouched = () => { };
    panelOpen = false;
    /** Current active option */
    get activeOption() {
        if (this.nzAutocomplete && this.nzAutocomplete.options.length) {
            return this.nzAutocomplete.activeItem;
        }
        else {
            return null;
        }
    }
    destroy$ = new Subject();
    overlayRef = null;
    portal = null;
    positionStrategy;
    previousValue = null;
    selectionChangeSubscription;
    optionsChangeSubscription;
    overlayOutsideClickSubscription;
    document = inject(DOCUMENT);
    nzInputGroupWhitSuffixOrPrefixDirective = inject(NzInputGroupWhitSuffixOrPrefixDirective, { optional: true });
    constructor(ngZone, elementRef, overlay, viewContainerRef) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
    }
    ngAfterViewInit() {
        if (this.nzAutocomplete) {
            this.nzAutocomplete.animationStateChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
                if (event.toState === 'void') {
                    if (this.overlayRef) {
                        this.overlayRef.dispose();
                        this.overlayRef = null;
                    }
                }
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroyPanel();
    }
    writeValue(value) {
        this.ngZone.runOutsideAngular(() => Promise.resolve(null).then(() => this.setTriggerValue(value)));
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        const element = this.elementRef.nativeElement;
        element.disabled = isDisabled;
        this.closePanel();
    }
    openPanel() {
        this.previousValue = this.elementRef.nativeElement.value;
        this.attachOverlay();
        this.updateStatus();
    }
    closePanel() {
        if (this.panelOpen) {
            this.nzAutocomplete.isOpen = this.panelOpen = false;
            if (this.overlayRef && this.overlayRef.hasAttached()) {
                this.overlayRef.detach();
                this.selectionChangeSubscription.unsubscribe();
                this.overlayOutsideClickSubscription.unsubscribe();
                this.optionsChangeSubscription.unsubscribe();
                this.portal = null;
            }
        }
    }
    handleKeydown(event) {
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
        if (keyCode === ESCAPE) {
            event.preventDefault();
        }
        if (this.panelOpen && (keyCode === ESCAPE || keyCode === TAB)) {
            // Reset value when tab / ESC close
            if (this.activeOption && this.activeOption.getLabel() !== this.previousValue) {
                this.setTriggerValue(this.previousValue);
            }
            this.closePanel();
        }
        else if (this.panelOpen && keyCode === ENTER) {
            if (this.nzAutocomplete.showPanel) {
                event.preventDefault();
                if (this.activeOption) {
                    this.activeOption.selectViaInteraction();
                }
                else {
                    this.closePanel();
                }
            }
        }
        else if (this.panelOpen && isArrowKey && this.nzAutocomplete.showPanel) {
            event.stopPropagation();
            event.preventDefault();
            if (keyCode === UP_ARROW) {
                this.nzAutocomplete.setPreviousItemActive();
            }
            else {
                this.nzAutocomplete.setNextItemActive();
            }
            if (this.activeOption) {
                this.activeOption.scrollIntoViewIfNeeded();
            }
            this.doBackfill();
        }
    }
    handleInput(event) {
        const target = event.target;
        const document = this.document;
        let value = target.value;
        if (target.type === 'number') {
            value = value === '' ? null : parseFloat(value);
        }
        if (this.previousValue !== value) {
            this.previousValue = value;
            this.onChange(value);
            if (this.canOpen() && document.activeElement === event.target) {
                this.openPanel();
            }
        }
    }
    handleFocus() {
        if (this.canOpen()) {
            this.openPanel();
        }
    }
    handleClick() {
        if (this.canOpen() && !this.panelOpen) {
            this.openPanel();
        }
    }
    handleBlur() {
        this.onTouched();
    }
    /**
     * Subscription data source changes event
     */
    subscribeOptionsChange() {
        const optionChanges = this.nzAutocomplete.options.changes.pipe(tap(() => this.positionStrategy.reapplyLastPosition()), delay(0));
        return optionChanges.subscribe(() => {
            this.resetActiveItem();
            if (this.panelOpen) {
                this.overlayRef.updatePosition();
            }
        });
    }
    /**
     * Subscription option changes event and set the value
     */
    subscribeSelectionChange() {
        return this.nzAutocomplete.selectionChange.subscribe((option) => {
            this.setValueAndClose(option);
        });
    }
    subscribeOverlayOutsideClick() {
        return this.overlayRef.outsidePointerEvents()
            .pipe(filter((e) => !this.elementRef.nativeElement.contains(e.target)))
            .subscribe(() => {
            this.closePanel();
        });
    }
    attachOverlay() {
        if (!this.nzAutocomplete) {
            throw getNzAutocompleteMissingPanelError();
        }
        if (!this.portal && this.nzAutocomplete.template) {
            this.portal = new TemplatePortal(this.nzAutocomplete.template, this.viewContainerRef);
        }
        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.selectionChangeSubscription = this.subscribeSelectionChange();
            this.optionsChangeSubscription = this.subscribeOptionsChange();
            this.overlayOutsideClickSubscription = this.subscribeOverlayOutsideClick();
            this.overlayRef
                .detachments()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.closePanel();
            });
        }
        this.nzAutocomplete.isOpen = this.panelOpen = true;
    }
    updateStatus() {
        if (this.overlayRef) {
            this.overlayRef.updateSize({ width: this.nzAutocomplete.nzWidth || this.getHostWidth() });
        }
        this.nzAutocomplete.setVisibility();
        this.resetActiveItem();
        if (this.activeOption) {
            this.activeOption.scrollIntoViewIfNeeded();
        }
    }
    destroyPanel() {
        if (this.overlayRef) {
            this.closePanel();
        }
    }
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            disposeOnNavigation: true,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            // default host element width
            width: this.nzAutocomplete.nzWidth || this.getHostWidth()
        });
    }
    getConnectedElement() {
        return this.nzInputGroupWhitSuffixOrPrefixDirective
            ? this.nzInputGroupWhitSuffixOrPrefixDirective.elementRef
            : this.elementRef;
    }
    getHostWidth() {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
    getOverlayPosition() {
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        this.positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions(positions)
            .withTransformOriginOn('.ant-select-dropdown');
        return this.positionStrategy;
    }
    resetActiveItem() {
        const index = this.nzAutocomplete.getOptionIndex(this.previousValue);
        this.nzAutocomplete.clearSelectedOptions(null, true);
        if (index !== -1) {
            this.nzAutocomplete.setActiveItem(index);
            this.nzAutocomplete.activeItem.select(false);
        }
        else {
            this.nzAutocomplete.setActiveItem(this.nzAutocomplete.nzDefaultActiveFirstOption ? 0 : -1);
        }
    }
    setValueAndClose(option) {
        const value = option.nzValue;
        this.setTriggerValue(option.getLabel());
        this.onChange(value);
        this.elementRef.nativeElement.focus();
        this.closePanel();
    }
    setTriggerValue(value) {
        const option = this.nzAutocomplete.getOption(value);
        const displayValue = option ? option.getLabel() : value;
        this.elementRef.nativeElement.value = displayValue != null ? displayValue : '';
        if (!this.nzAutocomplete.nzBackfill) {
            this.previousValue = displayValue;
        }
    }
    doBackfill() {
        if (this.nzAutocomplete.nzBackfill && this.nzAutocomplete.activeItem) {
            this.setTriggerValue(this.nzAutocomplete.activeItem.getLabel());
        }
    }
    canOpen() {
        const element = this.elementRef.nativeElement;
        return !element.readOnly && !element.disabled;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteTriggerDirective, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1$1.Overlay }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzAutocompleteTriggerDirective, isStandalone: true, selector: "input[nzAutocomplete], textarea[nzAutocomplete]", inputs: { nzAutocomplete: "nzAutocomplete" }, host: { attributes: { "autocomplete": "off", "aria-autocomplete": "list" }, listeners: { "focusin": "handleFocus()", "blur": "handleBlur()", "input": "handleInput($event)", "keydown": "handleKeydown($event)", "click": "handleClick($event)" } }, providers: [NZ_AUTOCOMPLETE_VALUE_ACCESSOR], exportAs: ["nzAutocompleteTrigger"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[nzAutocomplete], textarea[nzAutocomplete]`,
                    exportAs: 'nzAutocompleteTrigger',
                    providers: [NZ_AUTOCOMPLETE_VALUE_ACCESSOR],
                    host: {
                        autocomplete: 'off',
                        'aria-autocomplete': 'list',
                        '(focusin)': 'handleFocus()',
                        '(blur)': 'handleBlur()',
                        '(input)': 'handleInput($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(click)': 'handleClick($event)'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i1$1.Overlay }, { type: i0.ViewContainerRef }], propDecorators: { nzAutocomplete: [{
                type: Input
            }] } });

function normalizeDataSource(value) {
    return value?.map(item => {
        if (typeof item === 'number' || typeof item === 'string') {
            return {
                label: item.toString(),
                value: item.toString()
            };
        }
        return item;
    });
}
class NzAutocompleteComponent {
    changeDetectorRef;
    directionality;
    nzWidth;
    nzOverlayClassName = '';
    nzOverlayStyle = {};
    nzDefaultActiveFirstOption = true;
    nzBackfill = false;
    compareWith = (o1, o2) => o1 === o2;
    nzDataSource;
    selectionChange = new EventEmitter();
    showPanel = true;
    isOpen = false;
    activeItem = null;
    dir = 'ltr';
    normalizedDataSource = [];
    destroy$ = new Subject();
    animationStateChange = new EventEmitter();
    /**
     * Options accessor, its source may be content or dataSource
     */
    get options() {
        // first dataSource
        if (this.nzDataSource) {
            return this.fromDataSourceOptions;
        }
        else {
            return this.fromContentOptions;
        }
    }
    /** Provided by content */
    fromContentOptions;
    /** Provided by dataSource */
    fromDataSourceOptions;
    /** cdk-overlay */
    template;
    panel;
    content;
    activeItemIndex = -1;
    selectionChangeSubscription = Subscription.EMPTY;
    optionMouseEnterSubscription = Subscription.EMPTY;
    dataSourceChangeSubscription = Subscription.EMPTY;
    /** Options changes listener */
    optionSelectionChanges = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.selectionChange));
        }
        return this.afterNextRender$.pipe(switchMap(() => this.optionSelectionChanges));
    });
    optionMouseEnter = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => option.mouseEntered));
        }
        return this.afterNextRender$.pipe(switchMap(() => this.optionMouseEnter));
    });
    afterNextRender$ = inject(NZ_AFTER_NEXT_RENDER$);
    noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
    constructor(changeDetectorRef, directionality) {
        this.changeDetectorRef = changeDetectorRef;
        this.directionality = directionality;
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.changeDetectorRef.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnChanges(changes) {
        const { nzDataSource } = changes;
        if (nzDataSource) {
            this.normalizedDataSource = normalizeDataSource(nzDataSource.currentValue);
        }
    }
    onAnimationEvent(event) {
        this.animationStateChange.emit(event);
    }
    ngAfterContentInit() {
        if (!this.nzDataSource) {
            this.optionsInit();
        }
    }
    ngAfterViewInit() {
        if (this.nzDataSource) {
            this.optionsInit();
        }
    }
    ngOnDestroy() {
        this.dataSourceChangeSubscription.unsubscribe();
        this.selectionChangeSubscription.unsubscribe();
        this.optionMouseEnterSubscription.unsubscribe();
        // Caretaker note: we have to set these subscriptions to `null` since these will be closed subscriptions, but they
        // still keep references to destinations (which are `SafeSubscriber`s). Destinations keep referencing `next` functions,
        // which we pass, for instance, to `this.optionSelectionChanges.subscribe(...)`.
        this.dataSourceChangeSubscription = this.selectionChangeSubscription = this.optionMouseEnterSubscription = null;
        this.destroy$.next();
        this.destroy$.complete();
    }
    setVisibility() {
        this.showPanel = !!this.options.length;
        this.changeDetectorRef.markForCheck();
    }
    setActiveItem(index) {
        const activeItem = this.options.get(index);
        if (activeItem && !activeItem.active) {
            this.activeItem = activeItem;
            this.activeItemIndex = index;
            this.clearSelectedOptions(this.activeItem);
            this.activeItem.setActiveStyles();
        }
        else {
            this.activeItem = null;
            this.activeItemIndex = -1;
            this.clearSelectedOptions();
        }
        this.changeDetectorRef.markForCheck();
    }
    setNextItemActive() {
        const nextIndex = this.activeItemIndex + 1 <= this.options.length - 1 ? this.activeItemIndex + 1 : 0;
        this.setActiveItem(nextIndex);
    }
    setPreviousItemActive() {
        const previousIndex = this.activeItemIndex - 1 < 0 ? this.options.length - 1 : this.activeItemIndex - 1;
        this.setActiveItem(previousIndex);
    }
    getOptionIndex(value) {
        return this.options.reduce((result, current, index) => result === -1 ? (this.compareWith(value, current.nzValue) ? index : -1) : result, -1);
    }
    getOption(value) {
        return this.options.find(item => this.compareWith(value, item.nzValue)) || null;
    }
    optionsInit() {
        this.setVisibility();
        this.subscribeOptionChanges();
        const changes = this.nzDataSource ? this.fromDataSourceOptions.changes : this.fromContentOptions.changes;
        // async
        this.dataSourceChangeSubscription = changes.subscribe(e => {
            if (!e.dirty && this.isOpen) {
                setTimeout(() => this.setVisibility());
            }
            this.subscribeOptionChanges();
        });
    }
    /**
     * Clear the status of options
     */
    clearSelectedOptions(skip, deselect = false) {
        this.options.forEach(option => {
            if (option !== skip) {
                if (deselect) {
                    option.deselect();
                }
                option.setInactiveStyles();
            }
        });
    }
    subscribeOptionChanges() {
        this.selectionChangeSubscription.unsubscribe();
        this.selectionChangeSubscription = this.optionSelectionChanges
            .pipe(filter((event) => event.isUserInput))
            .subscribe((event) => {
            event.source.select();
            event.source.setActiveStyles();
            this.activeItem = event.source;
            this.activeItemIndex = this.getOptionIndex(this.activeItem.nzValue);
            this.clearSelectedOptions(event.source, true);
            this.selectionChange.emit(event.source);
        });
        this.optionMouseEnterSubscription.unsubscribe();
        this.optionMouseEnterSubscription = this.optionMouseEnter.subscribe((event) => {
            event.setActiveStyles();
            this.activeItem = event;
            this.activeItemIndex = this.getOptionIndex(this.activeItem.nzValue);
            this.clearSelectedOptions(event);
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$2.Directionality }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzAutocompleteComponent, isStandalone: true, selector: "nz-autocomplete", inputs: { nzWidth: ["nzWidth", "nzWidth", numberAttributeWithZeroFallback], nzOverlayClassName: "nzOverlayClassName", nzOverlayStyle: "nzOverlayStyle", nzDefaultActiveFirstOption: ["nzDefaultActiveFirstOption", "nzDefaultActiveFirstOption", booleanAttribute], nzBackfill: ["nzBackfill", "nzBackfill", booleanAttribute], compareWith: "compareWith", nzDataSource: "nzDataSource" }, outputs: { selectionChange: "selectionChange" }, queries: [{ propertyName: "fromContentOptions", predicate: NzAutocompleteOptionComponent, descendants: true }], viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "fromDataSourceOptions", predicate: NzAutocompleteOptionComponent, descendants: true }], exportAs: ["nzAutocomplete"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template>
      <div
        #panel
        class="ant-select-dropdown ant-select-dropdown-placement-bottomLeft"
        [class.ant-select-dropdown-hidden]="!showPanel"
        [class.ant-select-dropdown-rtl]="dir === 'rtl'"
        [class]="nzOverlayClassName"
        [style]="nzOverlayStyle"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
      >
        <div class="ant-select-dropdown-content-wrapper">
          <div class="ant-select-dropdown-content">
            <ng-template *ngTemplateOutlet="nzDataSource ? optionsTemplate : contentTemplate"></ng-template>
          </div>
        </div>
      </div>
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>
      <ng-template #optionsTemplate>
        @for (option of normalizedDataSource; track option.value) {
          <nz-auto-option [nzValue]="option.value" [nzLabel]="option.label">
            {{ option.label }}
          </nz-auto-option>
        }
      </ng-template>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzAutocompleteOptionComponent, selector: "nz-auto-option", inputs: ["nzValue", "nzLabel", "nzDisabled"], outputs: ["selectionChange", "mouseEntered"], exportAs: ["nzAutoOption"] }, { kind: "directive", type: NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }], animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-autocomplete',
                    exportAs: 'nzAutocomplete',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    imports: [NgTemplateOutlet, NzAutocompleteOptionComponent, NzNoAnimationDirective],
                    template: `
    <ng-template>
      <div
        #panel
        class="ant-select-dropdown ant-select-dropdown-placement-bottomLeft"
        [class.ant-select-dropdown-hidden]="!showPanel"
        [class.ant-select-dropdown-rtl]="dir === 'rtl'"
        [class]="nzOverlayClassName"
        [style]="nzOverlayStyle"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
      >
        <div class="ant-select-dropdown-content-wrapper">
          <div class="ant-select-dropdown-content">
            <ng-template *ngTemplateOutlet="nzDataSource ? optionsTemplate : contentTemplate"></ng-template>
          </div>
        </div>
      </div>
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>
      <ng-template #optionsTemplate>
        @for (option of normalizedDataSource; track option.value) {
          <nz-auto-option [nzValue]="option.value" [nzLabel]="option.label">
            {{ option.label }}
          </nz-auto-option>
        }
      </ng-template>
    </ng-template>
  `,
                    animations: [slideMotion]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1$2.Directionality }], propDecorators: { nzWidth: [{
                type: Input,
                args: [{ transform: numberAttributeWithZeroFallback }]
            }], nzOverlayClassName: [{
                type: Input
            }], nzOverlayStyle: [{
                type: Input
            }], nzDefaultActiveFirstOption: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzBackfill: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], compareWith: [{
                type: Input
            }], nzDataSource: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], fromContentOptions: [{
                type: ContentChildren,
                args: [NzAutocompleteOptionComponent, { descendants: true }]
            }], fromDataSourceOptions: [{
                type: ViewChildren,
                args: [NzAutocompleteOptionComponent]
            }], template: [{
                type: ViewChild,
                args: [TemplateRef, { static: false }]
            }], panel: [{
                type: ViewChild,
                args: ['panel', { static: false }]
            }], content: [{
                type: ViewChild,
                args: ['content', { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzAutocompleteModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteModule, imports: [NzAutocompleteComponent,
            NzAutocompleteOptionComponent,
            NzAutocompleteTriggerDirective,
            NzAutocompleteOptgroupComponent], exports: [NzAutocompleteComponent,
            NzAutocompleteOptionComponent,
            NzAutocompleteTriggerDirective,
            NzAutocompleteOptgroupComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteModule, imports: [NzAutocompleteOptgroupComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [
                        NzAutocompleteComponent,
                        NzAutocompleteOptionComponent,
                        NzAutocompleteTriggerDirective,
                        NzAutocompleteOptgroupComponent
                    ],
                    imports: [
                        NzAutocompleteComponent,
                        NzAutocompleteOptionComponent,
                        NzAutocompleteTriggerDirective,
                        NzAutocompleteOptgroupComponent
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

export { NZ_AUTOCOMPLETE_VALUE_ACCESSOR, NzAutocompleteComponent, NzAutocompleteModule, NzAutocompleteOptgroupComponent, NzAutocompleteOptionComponent, NzAutocompleteTriggerDirective, NzOptionSelectionChange, getNzAutocompleteMissingPanelError };
//# sourceMappingURL=ng-zorro-antd-auto-complete.mjs.map
