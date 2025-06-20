import { __esDecorate, __runInitializers } from 'tslib';
import { TAB, ESCAPE, BACKSPACE } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { _getEventTarget } from '@angular/cdk/platform';
import { SlicePipe } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, computed, signal, inject, forwardRef, numberAttribute, booleanAttribute, ContentChild, Input, ViewChild, Output, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, of, combineLatest, merge } from 'rxjs';
import { takeUntil, distinctUntilChanged, withLatestFrom, map, startWith, tap, filter } from 'rxjs/operators';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import * as i2 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { NzFormStatusService, NzFormNoStatusService, NzFormItemFeedbackIconComponent } from 'ng-zorro-antd/core/form';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import * as i6 from 'ng-zorro-antd/core/overlay';
import { POSITION_MAP, NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzTreeBaseService, NzTreeBase, NzTreeHigherOrderServiceToken } from 'ng-zorro-antd/core/tree';
import { getStatusClassNames, isNotNil } from 'ng-zorro-antd/core/util';
import * as i8 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i9 from 'ng-zorro-antd/select';
import { NzSelectModule, NzSelectSearchComponent } from 'ng-zorro-antd/select';
import * as i5 from 'ng-zorro-antd/space';
import { NZ_SPACE_COMPACT_SIZE, NZ_SPACE_COMPACT_ITEM_TYPE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';
import * as i7 from 'ng-zorro-antd/tree';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import * as i3 from '@angular/cdk/bidi';
import * as i4 from '@angular/cdk/a11y';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeSelectService extends NzTreeBaseService {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectService, decorators: [{
            type: Injectable
        }] });

const NZ_CONFIG_MODULE_NAME = 'treeSelect';
const TREE_SELECT_DEFAULT_CLASS = 'ant-select-dropdown ant-select-tree-dropdown';
const listOfPositions = [
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.topRight,
    POSITION_MAP.topLeft
];
let NzTreeSelectComponent = (() => {
    let _classSuper = NzTreeBase;
    let _nzDropdownMatchSelectWidth_decorators;
    let _nzDropdownMatchSelectWidth_initializers = [];
    let _nzDropdownMatchSelectWidth_extraInitializers = [];
    let _nzHideUnMatched_decorators;
    let _nzHideUnMatched_initializers = [];
    let _nzHideUnMatched_extraInitializers = [];
    let _nzShowIcon_decorators;
    let _nzShowIcon_initializers = [];
    let _nzShowIcon_extraInitializers = [];
    let _nzSize_decorators;
    let _nzSize_initializers = [];
    let _nzSize_extraInitializers = [];
    let _nzBackdrop_decorators;
    let _nzBackdrop_initializers = [];
    let _nzBackdrop_extraInitializers = [];
    return class NzTreeSelectComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _nzDropdownMatchSelectWidth_decorators = [WithConfig()];
            _nzHideUnMatched_decorators = [WithConfig()];
            _nzShowIcon_decorators = [WithConfig()];
            _nzSize_decorators = [WithConfig()];
            _nzBackdrop_decorators = [WithConfig()];
            __esDecorate(null, null, _nzDropdownMatchSelectWidth_decorators, { kind: "field", name: "nzDropdownMatchSelectWidth", static: false, private: false, access: { has: obj => "nzDropdownMatchSelectWidth" in obj, get: obj => obj.nzDropdownMatchSelectWidth, set: (obj, value) => { obj.nzDropdownMatchSelectWidth = value; } }, metadata: _metadata }, _nzDropdownMatchSelectWidth_initializers, _nzDropdownMatchSelectWidth_extraInitializers);
            __esDecorate(null, null, _nzHideUnMatched_decorators, { kind: "field", name: "nzHideUnMatched", static: false, private: false, access: { has: obj => "nzHideUnMatched" in obj, get: obj => obj.nzHideUnMatched, set: (obj, value) => { obj.nzHideUnMatched = value; } }, metadata: _metadata }, _nzHideUnMatched_initializers, _nzHideUnMatched_extraInitializers);
            __esDecorate(null, null, _nzShowIcon_decorators, { kind: "field", name: "nzShowIcon", static: false, private: false, access: { has: obj => "nzShowIcon" in obj, get: obj => obj.nzShowIcon, set: (obj, value) => { obj.nzShowIcon = value; } }, metadata: _metadata }, _nzShowIcon_initializers, _nzShowIcon_extraInitializers);
            __esDecorate(null, null, _nzSize_decorators, { kind: "field", name: "nzSize", static: false, private: false, access: { has: obj => "nzSize" in obj, get: obj => obj.nzSize, set: (obj, value) => { obj.nzSize = value; } }, metadata: _metadata }, _nzSize_initializers, _nzSize_extraInitializers);
            __esDecorate(null, null, _nzBackdrop_decorators, { kind: "field", name: "nzBackdrop", static: false, private: false, access: { has: obj => "nzBackdrop" in obj, get: obj => obj.nzBackdrop, set: (obj, value) => { obj.nzBackdrop = value; } }, metadata: _metadata }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        renderer;
        cdr;
        elementRef;
        directionality;
        focusMonitor;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzId = null;
        nzAllowClear = true;
        nzShowExpand = true;
        nzShowLine = false;
        nzDropdownMatchSelectWidth = __runInitializers(this, _nzDropdownMatchSelectWidth_initializers, true);
        nzCheckable = (__runInitializers(this, _nzDropdownMatchSelectWidth_extraInitializers), false);
        nzHideUnMatched = __runInitializers(this, _nzHideUnMatched_initializers, false);
        nzShowIcon = (__runInitializers(this, _nzHideUnMatched_extraInitializers), __runInitializers(this, _nzShowIcon_initializers, false));
        nzShowSearch = (__runInitializers(this, _nzShowIcon_extraInitializers), false);
        nzDisabled = false;
        nzAsyncData = false;
        nzMultiple = false;
        nzDefaultExpandAll = false;
        nzCheckStrictly = false;
        nzVirtualItemSize = 28;
        nzVirtualMaxBufferPx = 500;
        nzVirtualMinBufferPx = 28;
        nzVirtualHeight = null;
        nzExpandedIcon;
        nzNotFoundContent;
        nzNodes = [];
        nzOpen = false;
        nzSize = __runInitializers(this, _nzSize_initializers, 'default');
        nzPlaceHolder = (__runInitializers(this, _nzSize_extraInitializers), '');
        nzDropdownStyle = null;
        nzDropdownClassName;
        nzBackdrop = __runInitializers(this, _nzBackdrop_initializers, false);
        nzStatus = (__runInitializers(this, _nzBackdrop_extraInitializers), '');
        nzPlacement = '';
        set nzExpandedKeys(value) {
            this.expandedKeys = value;
        }
        get nzExpandedKeys() {
            return this.expandedKeys;
        }
        nzDisplayWith = (node) => node.title;
        nzMaxTagCount;
        nzMaxTagPlaceholder = null;
        nzOpenChange = new EventEmitter();
        nzCleared = new EventEmitter();
        nzRemoved = new EventEmitter();
        nzExpandChange = new EventEmitter();
        nzTreeClick = new EventEmitter();
        nzTreeCheckboxChange = new EventEmitter();
        nzSelectSearchComponent;
        treeRef;
        cdkOverlayOrigin;
        cdkConnectedOverlay;
        nzTreeTemplate;
        nzTreeTemplateChild;
        get treeTemplate() {
            return this.nzTreeTemplate || this.nzTreeTemplateChild;
        }
        prefixCls = 'ant-select';
        statusCls = {};
        status = '';
        hasFeedback = false;
        dropdownClassName = TREE_SELECT_DEFAULT_CLASS;
        triggerWidth;
        isComposing = false;
        isDestroy = true;
        isNotFound = false;
        focused = false;
        inputValue = '';
        dropdownPosition = 'bottom';
        selectedNodes = [];
        expandedKeys = [];
        value = [];
        dir = 'ltr';
        positions = [];
        finalSize = computed(() => {
            if (this.compactSize) {
                return this.compactSize();
            }
            return this.size();
        });
        size = signal(this.nzSize);
        compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
        destroy$ = inject(NzDestroyService);
        isNzDisableFirstChange = true;
        isComposingChange$ = new Subject();
        searchValueChange$ = new Subject();
        onChange = _value => { };
        onTouched = () => { };
        get placeHolderDisplay() {
            return this.inputValue || this.isComposing || this.selectedNodes.length ? 'none' : 'block';
        }
        get isMultiple() {
            return this.nzMultiple || this.nzCheckable;
        }
        noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
        nzFormStatusService = inject(NzFormStatusService, { optional: true });
        nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
        constructor(nzTreeService, nzConfigService, renderer, cdr, elementRef, directionality, focusMonitor) {
            super(nzTreeService);
            this.nzConfigService = nzConfigService;
            this.renderer = renderer;
            this.cdr = cdr;
            this.elementRef = elementRef;
            this.directionality = directionality;
            this.focusMonitor = focusMonitor;
        }
        ngOnInit() {
            this.size.set(this.nzSize);
            this.nzConfigService
                .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.size.set(this.nzSize);
                this.cdr.markForCheck();
            });
            this.nzFormStatusService?.formStatusChanges
                .pipe(distinctUntilChanged((pre, cur) => {
                return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
            }), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })), takeUntil(this.destroy$))
                .subscribe(({ status, hasFeedback }) => {
                this.setStatusStyles(status, hasFeedback);
            });
            this.isDestroy = false;
            this.subscribeSelectionChange();
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
            this.focusMonitor
                .monitor(this.elementRef, true)
                .pipe(takeUntil(this.destroy$))
                .subscribe(focusOrigin => {
                if (!focusOrigin) {
                    this.focused = false;
                    this.cdr.markForCheck();
                    Promise.resolve().then(() => {
                        this.onTouched();
                    });
                }
                else {
                    this.focused = true;
                    this.cdr.markForCheck();
                }
            });
            // setInputValue method executed earlier than isComposingChange
            combineLatest([this.searchValueChange$, this.isComposingChange$.pipe(startWith(false))])
                .pipe(takeUntil(this.destroy$))
                .subscribe(([searchValue, isComposing]) => {
                this.isComposing = isComposing;
                if (!isComposing) {
                    this.inputValue = searchValue;
                    this.updatePosition();
                }
            });
        }
        ngOnDestroy() {
            this.isDestroy = true;
            this.closeDropDown();
            this.destroy$.next();
            this.destroy$.complete();
        }
        isComposingChange(isComposing) {
            this.isComposingChange$.next(isComposing);
        }
        setDisabledState(isDisabled) {
            this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
            this.closeDropDown();
            this.isNzDisableFirstChange = false;
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
                    this.renderer.addClass(this.elementRef.nativeElement, status);
                }
                else {
                    this.renderer.removeClass(this.elementRef.nativeElement, status);
                }
            });
        }
        ngOnChanges({ nzNodes, nzDropdownClassName, nzStatus, nzPlacement, nzSize }) {
            if (nzNodes) {
                this.updateSelectedNodes(true);
            }
            if (nzDropdownClassName) {
                const className = this.nzDropdownClassName && this.nzDropdownClassName.trim();
                this.dropdownClassName = className ? `${TREE_SELECT_DEFAULT_CLASS} ${className}` : TREE_SELECT_DEFAULT_CLASS;
            }
            if (nzStatus) {
                this.setStatusStyles(this.nzStatus, this.hasFeedback);
            }
            if (nzPlacement && this.nzPlacement) {
                if (POSITION_MAP[this.nzPlacement]) {
                    this.positions = [POSITION_MAP[this.nzPlacement]];
                }
            }
            if (nzSize) {
                this.size.set(nzSize.currentValue);
            }
        }
        writeValue(value) {
            if (isNotNil(value)) {
                if (this.isMultiple && Array.isArray(value)) {
                    this.value = value;
                }
                else {
                    this.value = [value];
                }
                // need clear selected nodes when user set value before updating
                this.clearSelectedNodes();
                this.updateSelectedNodes(true);
            }
            else {
                this.value = [];
                this.clearSelectedNodes();
                this.selectedNodes = [];
            }
            this.cdr.markForCheck();
        }
        registerOnChange(fn) {
            this.onChange = fn;
        }
        registerOnTouched(fn) {
            this.onTouched = fn;
        }
        onKeydown(event) {
            if (this.nzDisabled) {
                return;
            }
            switch (event.keyCode) {
                case ESCAPE:
                    /**
                     * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
                     */
                    break;
                case TAB:
                    this.closeDropDown();
                    break;
                default:
                    if (!this.nzOpen) {
                        this.openDropdown();
                    }
            }
        }
        trigger() {
            if (this.nzDisabled || (!this.nzDisabled && this.nzOpen)) {
                this.closeDropDown();
            }
            else {
                this.openDropdown();
            }
        }
        openDropdown() {
            if (!this.nzDisabled) {
                this.nzOpen = true;
                this.nzOpenChange.emit(this.nzOpen);
                this.updateCdkConnectedOverlayStatus();
                if (this.nzShowSearch || this.isMultiple) {
                    this.focusOnInput();
                }
            }
        }
        closeDropDown() {
            Promise.resolve().then(() => {
                this.onTouched();
            });
            this.nzOpen = false;
            this.inputValue = '';
            this.isNotFound = false;
            this.nzOpenChange.emit(this.nzOpen);
            this.cdr.markForCheck();
        }
        onKeyDownInput(e) {
            const keyCode = e.keyCode;
            const eventTarget = e.target;
            if (this.isMultiple && !eventTarget.value && keyCode === BACKSPACE) {
                e.preventDefault();
                if (this.selectedNodes.length) {
                    const removeNode = this.selectedNodes[this.selectedNodes.length - 1];
                    if (removeNode && !removeNode.isDisabled) {
                        this.removeSelected(removeNode);
                    }
                }
            }
        }
        onExpandedKeysChange(value) {
            this.nzExpandChange.emit(value);
            this.expandedKeys = [...value.keys];
        }
        setInputValue(value) {
            this.searchValueChange$.next(value);
        }
        removeSelected(node, emit = true) {
            node.isSelected = false;
            node.isChecked = false;
            if (this.nzCheckable) {
                this.nzTreeService.conduct(node, this.nzCheckStrictly);
            }
            else {
                this.nzTreeService.setSelectedNodeList(node, this.nzMultiple);
            }
            if (emit) {
                this.nzRemoved.emit(node);
            }
        }
        focusOnInput() {
            if (this.nzSelectSearchComponent) {
                this.nzSelectSearchComponent.focus();
            }
        }
        subscribeSelectionChange() {
            merge(this.nzTreeClick.pipe(tap((event) => {
                const node = event.node;
                if (this.nzCheckable && !node.isDisabled && !node.isDisableCheckbox) {
                    node.isChecked = !node.isChecked;
                    node.isHalfChecked = false;
                    if (!this.nzCheckStrictly) {
                        this.nzTreeService.conduct(node);
                    }
                }
                if (this.nzCheckable) {
                    node.isSelected = false;
                }
            }), filter((event) => {
                const node = event.node;
                return this.nzCheckable ? !node.isDisabled && !node.isDisableCheckbox : !node.isDisabled && node.isSelectable;
            })), this.nzCheckable ? this.nzTreeCheckboxChange.asObservable() : of(), this.nzCleared, this.nzRemoved)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.updateSelectedNodes();
                const value = this.selectedNodes.map(node => node.key);
                this.value = [...value];
                if (this.nzShowSearch || this.isMultiple) {
                    this.inputValue = '';
                    this.isNotFound = false;
                }
                if (this.isMultiple) {
                    this.onChange(value);
                    this.focusOnInput();
                    this.updatePosition();
                }
                else {
                    this.closeDropDown();
                    this.onChange(value.length ? value[0] : null);
                }
            });
        }
        updateSelectedNodes(init = false) {
            if (init) {
                const nodes = this.coerceTreeNodes(this.nzNodes);
                this.nzTreeService.isMultiple = this.isMultiple;
                this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
                this.nzTreeService.initTree(nodes);
                if (this.nzCheckable) {
                    this.nzTreeService.conductCheck(this.value, this.nzCheckStrictly);
                }
                else {
                    this.nzTreeService.conductSelectedKeys(this.value, this.isMultiple);
                }
            }
            this.selectedNodes = [...(this.nzCheckable ? this.getCheckedNodeList() : this.getSelectedNodeList())].sort((a, b) => {
                const indexA = this.value.indexOf(a.key);
                const indexB = this.value.indexOf(b.key);
                if (indexA !== -1 && indexB !== -1) {
                    return indexA - indexB;
                }
                if (indexA !== -1) {
                    return -1;
                }
                if (indexB !== -1) {
                    return 1;
                }
                return 0;
            });
        }
        updatePosition() {
            reqAnimFrame(() => {
                this.cdkConnectedOverlay?.overlayRef?.updatePosition();
            });
        }
        onPositionChange(position) {
            this.dropdownPosition = position.connectionPair.originY;
        }
        onClearSelection() {
            this.selectedNodes.forEach(node => {
                this.removeSelected(node, false);
            });
            this.nzCleared.emit();
        }
        onClickOutside(event) {
            const target = _getEventTarget(event);
            if (!this.elementRef.nativeElement.contains(target)) {
                this.closeDropDown();
            }
        }
        setSearchValues($event) {
            Promise.resolve().then(() => {
                this.isNotFound = (this.nzShowSearch || this.isMultiple) && !!this.inputValue && $event.matchedKeys.length === 0;
            });
        }
        updateCdkConnectedOverlayStatus() {
            if (!this.nzPlacement || !listOfPositions.includes(POSITION_MAP[this.nzPlacement])) {
                this.triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
            }
        }
        clearSelectedNodes() {
            this.selectedNodes.forEach(node => {
                this.removeSelected(node, false);
            });
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectComponent, deps: [{ token: NzTreeSelectService }, { token: i2.NzConfigService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Directionality }, { token: i4.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTreeSelectComponent, isStandalone: true, selector: "nz-tree-select", inputs: { nzId: "nzId", nzAllowClear: ["nzAllowClear", "nzAllowClear", booleanAttribute], nzShowExpand: ["nzShowExpand", "nzShowExpand", booleanAttribute], nzShowLine: ["nzShowLine", "nzShowLine", booleanAttribute], nzDropdownMatchSelectWidth: ["nzDropdownMatchSelectWidth", "nzDropdownMatchSelectWidth", booleanAttribute], nzCheckable: ["nzCheckable", "nzCheckable", booleanAttribute], nzHideUnMatched: ["nzHideUnMatched", "nzHideUnMatched", booleanAttribute], nzShowIcon: ["nzShowIcon", "nzShowIcon", booleanAttribute], nzShowSearch: ["nzShowSearch", "nzShowSearch", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzAsyncData: ["nzAsyncData", "nzAsyncData", booleanAttribute], nzMultiple: ["nzMultiple", "nzMultiple", booleanAttribute], nzDefaultExpandAll: ["nzDefaultExpandAll", "nzDefaultExpandAll", booleanAttribute], nzCheckStrictly: ["nzCheckStrictly", "nzCheckStrictly", booleanAttribute], nzVirtualItemSize: "nzVirtualItemSize", nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx", nzVirtualMinBufferPx: "nzVirtualMinBufferPx", nzVirtualHeight: "nzVirtualHeight", nzExpandedIcon: "nzExpandedIcon", nzNotFoundContent: "nzNotFoundContent", nzNodes: "nzNodes", nzOpen: "nzOpen", nzSize: "nzSize", nzPlaceHolder: "nzPlaceHolder", nzDropdownStyle: "nzDropdownStyle", nzDropdownClassName: "nzDropdownClassName", nzBackdrop: "nzBackdrop", nzStatus: "nzStatus", nzPlacement: "nzPlacement", nzExpandedKeys: "nzExpandedKeys", nzDisplayWith: "nzDisplayWith", nzMaxTagCount: ["nzMaxTagCount", "nzMaxTagCount", numberAttribute], nzMaxTagPlaceholder: "nzMaxTagPlaceholder", nzTreeTemplate: "nzTreeTemplate" }, outputs: { nzOpenChange: "nzOpenChange", nzCleared: "nzCleared", nzRemoved: "nzRemoved", nzExpandChange: "nzExpandChange", nzTreeClick: "nzTreeClick", nzTreeCheckboxChange: "nzTreeCheckboxChange" }, host: { listeners: { "click": "trigger()", "keydown": "onKeydown($event)" }, properties: { "class.ant-select-in-form-item": "!!nzFormStatusService", "class.ant-select-rtl": "dir===\"rtl\"", "class.ant-select-lg": "finalSize() === \"large\"", "class.ant-select-sm": "finalSize() === \"small\"", "class.ant-select-disabled": "nzDisabled", "class.ant-select-single": "!isMultiple", "class.ant-select-show-arrow": "!isMultiple", "class.ant-select-show-search": "!isMultiple", "class.ant-select-multiple": "isMultiple", "class.ant-select-allow-clear": "nzAllowClear", "class.ant-select-open": "nzOpen", "class.ant-select-focused": "nzOpen || focused" }, classAttribute: "ant-select ant-tree-select" }, providers: [
                NzDestroyService,
                NzTreeSelectService,
                { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'select' },
                {
                    provide: NzTreeHigherOrderServiceToken,
                    useExisting: NzTreeSelectService
                },
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => NzTreeSelectComponent),
                    multi: true
                }
            ], queries: [{ propertyName: "nzTreeTemplateChild", first: true, predicate: ["nzTreeTemplate"], descendants: true, static: true }], viewQueries: [{ propertyName: "nzSelectSearchComponent", first: true, predicate: NzSelectSearchComponent, descendants: true }, { propertyName: "treeRef", first: true, predicate: ["treeRef"], descendants: true }, { propertyName: "cdkOverlayOrigin", first: true, predicate: CdkOverlayOrigin, descendants: true, static: true }, { propertyName: "cdkConnectedOverlay", first: true, predicate: CdkConnectedOverlay, descendants: true }], exportAs: ["nzTreeSelect"], usesInheritance: true, usesOnChanges: true, hostDirectives: [{ directive: i5.NzSpaceCompactItemDirective }], ngImport: i0, template: `
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      [cdkConnectedOverlayPositions]="nzPlacement ? positions : []"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-tree-dropdown'"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeDropDown()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [@slideMotion]="'enter'"
        [class]="dropdownClassName"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [class.ant-select-dropdown-placement-bottomLeft]="dropdownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropdownPosition === 'top'"
        [class.ant-tree-select-dropdown-rtl]="dir === 'rtl'"
        [dir]="dir"
        [style]="nzDropdownStyle"
      >
        <nz-tree
          #treeRef
          [hidden]="isNotFound"
          nzNoAnimation
          nzSelectMode
          nzBlockNode
          [nzData]="nzNodes"
          [nzMultiple]="nzMultiple"
          [nzSearchValue]="inputValue"
          [nzHideUnMatched]="nzHideUnMatched"
          [nzShowIcon]="nzShowIcon"
          [nzCheckable]="nzCheckable"
          [nzAsyncData]="nzAsyncData"
          [nzShowExpand]="nzShowExpand"
          [nzShowLine]="nzShowLine"
          [nzExpandedIcon]="nzExpandedIcon"
          [nzExpandAll]="nzDefaultExpandAll"
          [nzExpandedKeys]="expandedKeys"
          [nzCheckedKeys]="nzCheckable ? value : []"
          [nzSelectedKeys]="!nzCheckable ? value : []"
          [nzTreeTemplate]="treeTemplate"
          [nzCheckStrictly]="nzCheckStrictly"
          [nzVirtualItemSize]="nzVirtualItemSize"
          [nzVirtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [nzVirtualMinBufferPx]="nzVirtualMinBufferPx"
          [nzVirtualHeight]="nzVirtualHeight"
          (nzExpandChange)="onExpandedKeysChange($event)"
          (nzClick)="nzTreeClick.emit($event)"
          (nzCheckedKeysChange)="updateSelectedNodes()"
          (nzSelectedKeysChange)="updateSelectedNodes()"
          (nzCheckboxChange)="nzTreeCheckboxChange.emit($event)"
          (nzSearchValueChange)="setSearchValues($event)"
        ></nz-tree>
        @if (nzNodes.length === 0 || isNotFound) {
          <span class="ant-select-not-found">
            <nz-embed-empty [nzComponentName]="'tree-select'" [specificContent]="nzNotFoundContent"></nz-embed-empty>
          </span>
        }
      </div>
    </ng-template>

    <div cdkOverlayOrigin class="ant-select-selector">
      @if (isMultiple) {
        @for (node of selectedNodes | slice: 0 : nzMaxTagCount; track node.key) {
          <nz-select-item
            [deletable]="true"
            [disabled]="node.isDisabled || nzDisabled"
            [label]="nzDisplayWith(node)"
            (delete)="removeSelected(node, true)"
          ></nz-select-item>
        }
        @if (selectedNodes.length > nzMaxTagCount) {
          <nz-select-item
            [contentTemplateOutlet]="nzMaxTagPlaceholder"
            [contentTemplateOutletContext]="selectedNodes | slice: nzMaxTagCount"
            [deletable]="false"
            [disabled]="false"
            [label]="'+ ' + (selectedNodes.length - nzMaxTagCount) + ' ...'"
          ></nz-select-item>
        }
      }

      <nz-select-search
        [nzId]="nzId"
        [showInput]="nzShowSearch"
        (keydown)="onKeyDownInput($event)"
        (isComposingChange)="isComposingChange($event)"
        (valueChange)="setInputValue($event)"
        [value]="inputValue"
        [mirrorSync]="isMultiple"
        [disabled]="nzDisabled"
        [focusTrigger]="nzOpen"
      ></nz-select-search>

      @if (nzPlaceHolder && selectedNodes.length === 0) {
        <nz-select-placeholder
          [placeholder]="nzPlaceHolder"
          [style.display]="placeHolderDisplay"
        ></nz-select-placeholder>
      }

      @if (!isMultiple && selectedNodes.length === 1 && !isComposing && inputValue === '') {
        <nz-select-item
          [deletable]="false"
          [disabled]="false"
          [label]="nzDisplayWith(selectedNodes[0])"
        ></nz-select-item>
      }

      @if (!isMultiple) {
        <nz-select-arrow></nz-select-arrow>
      }
      @if (!isMultiple || (hasFeedback && !!status)) {
        <nz-select-arrow [showArrow]="!isMultiple" [feedbackIcon]="feedbackIconTpl">
          <ng-template #feedbackIconTpl>
            @if (hasFeedback && !!status) {
              <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon>
            }
          </ng-template>
        </nz-select-arrow>
      }
      @if (nzAllowClear && !nzDisabled && selectedNodes.length) {
        <nz-select-clear (clear)="onClearSelection()"></nz-select-clear>
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzOverlayModule }, { kind: "directive", type: i6.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { kind: "directive", type: CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush", "cdkConnectedOverlayDisposeOnNavigation"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { kind: "ngmodule", type: NzTreeModule }, { kind: "component", type: i7.NzTreeComponent, selector: "nz-tree", inputs: ["nzShowIcon", "nzHideUnMatched", "nzBlockNode", "nzExpandAll", "nzSelectMode", "nzCheckStrictly", "nzShowExpand", "nzShowLine", "nzCheckable", "nzAsyncData", "nzDraggable", "nzMultiple", "nzExpandedIcon", "nzVirtualItemSize", "nzVirtualMaxBufferPx", "nzVirtualMinBufferPx", "nzVirtualHeight", "nzTreeTemplate", "nzBeforeDrop", "nzData", "nzExpandedKeys", "nzSelectedKeys", "nzCheckedKeys", "nzSearchValue", "nzSearchFunc"], outputs: ["nzExpandedKeysChange", "nzSelectedKeysChange", "nzCheckedKeysChange", "nzSearchValueChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckboxChange", "nzExpandChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDrop", "nzOnDragEnd"], exportAs: ["nzTree"] }, { kind: "ngmodule", type: NzEmptyModule }, { kind: "component", type: i8.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }, { kind: "directive", type: CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "pipe", type: SlicePipe, name: "slice" }, { kind: "ngmodule", type: NzSelectModule }, { kind: "component", type: i9.NzSelectArrowComponent, selector: "nz-select-arrow", inputs: ["listOfValue", "loading", "search", "showArrow", "isMaxMultipleCountSet", "suffixIcon", "feedbackIcon", "nzMaxMultipleCount"] }, { kind: "component", type: i9.NzSelectClearComponent, selector: "nz-select-clear", inputs: ["clearIcon"], outputs: ["clear"] }, { kind: "component", type: i9.NzSelectItemComponent, selector: "nz-select-item", inputs: ["disabled", "label", "deletable", "removeIcon", "contentTemplateOutletContext", "contentTemplateOutlet"], outputs: ["delete"] }, { kind: "component", type: i9.NzSelectPlaceholderComponent, selector: "nz-select-placeholder", inputs: ["placeholder"] }, { kind: "component", type: i9.NzSelectSearchComponent, selector: "nz-select-search", inputs: ["nzId", "disabled", "mirrorSync", "showInput", "focusTrigger", "value", "autofocus"], outputs: ["valueChange", "isComposingChange"] }, { kind: "component", type: NzFormItemFeedbackIconComponent, selector: "nz-form-item-feedback-icon", inputs: ["status"], exportAs: ["nzFormFeedbackIcon"] }], animations: [slideMotion] });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-select',
                    exportAs: 'nzTreeSelect',
                    imports: [
                        NzOverlayModule,
                        CdkConnectedOverlay,
                        NzNoAnimationDirective,
                        NzTreeModule,
                        NzEmptyModule,
                        CdkOverlayOrigin,
                        SlicePipe,
                        NzSelectModule,
                        NzFormItemFeedbackIconComponent
                    ],
                    animations: [slideMotion],
                    template: `
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      [cdkConnectedOverlayPositions]="nzPlacement ? positions : []"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-tree-dropdown'"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeDropDown()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [@slideMotion]="'enter'"
        [class]="dropdownClassName"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [class.ant-select-dropdown-placement-bottomLeft]="dropdownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropdownPosition === 'top'"
        [class.ant-tree-select-dropdown-rtl]="dir === 'rtl'"
        [dir]="dir"
        [style]="nzDropdownStyle"
      >
        <nz-tree
          #treeRef
          [hidden]="isNotFound"
          nzNoAnimation
          nzSelectMode
          nzBlockNode
          [nzData]="nzNodes"
          [nzMultiple]="nzMultiple"
          [nzSearchValue]="inputValue"
          [nzHideUnMatched]="nzHideUnMatched"
          [nzShowIcon]="nzShowIcon"
          [nzCheckable]="nzCheckable"
          [nzAsyncData]="nzAsyncData"
          [nzShowExpand]="nzShowExpand"
          [nzShowLine]="nzShowLine"
          [nzExpandedIcon]="nzExpandedIcon"
          [nzExpandAll]="nzDefaultExpandAll"
          [nzExpandedKeys]="expandedKeys"
          [nzCheckedKeys]="nzCheckable ? value : []"
          [nzSelectedKeys]="!nzCheckable ? value : []"
          [nzTreeTemplate]="treeTemplate"
          [nzCheckStrictly]="nzCheckStrictly"
          [nzVirtualItemSize]="nzVirtualItemSize"
          [nzVirtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [nzVirtualMinBufferPx]="nzVirtualMinBufferPx"
          [nzVirtualHeight]="nzVirtualHeight"
          (nzExpandChange)="onExpandedKeysChange($event)"
          (nzClick)="nzTreeClick.emit($event)"
          (nzCheckedKeysChange)="updateSelectedNodes()"
          (nzSelectedKeysChange)="updateSelectedNodes()"
          (nzCheckboxChange)="nzTreeCheckboxChange.emit($event)"
          (nzSearchValueChange)="setSearchValues($event)"
        ></nz-tree>
        @if (nzNodes.length === 0 || isNotFound) {
          <span class="ant-select-not-found">
            <nz-embed-empty [nzComponentName]="'tree-select'" [specificContent]="nzNotFoundContent"></nz-embed-empty>
          </span>
        }
      </div>
    </ng-template>

    <div cdkOverlayOrigin class="ant-select-selector">
      @if (isMultiple) {
        @for (node of selectedNodes | slice: 0 : nzMaxTagCount; track node.key) {
          <nz-select-item
            [deletable]="true"
            [disabled]="node.isDisabled || nzDisabled"
            [label]="nzDisplayWith(node)"
            (delete)="removeSelected(node, true)"
          ></nz-select-item>
        }
        @if (selectedNodes.length > nzMaxTagCount) {
          <nz-select-item
            [contentTemplateOutlet]="nzMaxTagPlaceholder"
            [contentTemplateOutletContext]="selectedNodes | slice: nzMaxTagCount"
            [deletable]="false"
            [disabled]="false"
            [label]="'+ ' + (selectedNodes.length - nzMaxTagCount) + ' ...'"
          ></nz-select-item>
        }
      }

      <nz-select-search
        [nzId]="nzId"
        [showInput]="nzShowSearch"
        (keydown)="onKeyDownInput($event)"
        (isComposingChange)="isComposingChange($event)"
        (valueChange)="setInputValue($event)"
        [value]="inputValue"
        [mirrorSync]="isMultiple"
        [disabled]="nzDisabled"
        [focusTrigger]="nzOpen"
      ></nz-select-search>

      @if (nzPlaceHolder && selectedNodes.length === 0) {
        <nz-select-placeholder
          [placeholder]="nzPlaceHolder"
          [style.display]="placeHolderDisplay"
        ></nz-select-placeholder>
      }

      @if (!isMultiple && selectedNodes.length === 1 && !isComposing && inputValue === '') {
        <nz-select-item
          [deletable]="false"
          [disabled]="false"
          [label]="nzDisplayWith(selectedNodes[0])"
        ></nz-select-item>
      }

      @if (!isMultiple) {
        <nz-select-arrow></nz-select-arrow>
      }
      @if (!isMultiple || (hasFeedback && !!status)) {
        <nz-select-arrow [showArrow]="!isMultiple" [feedbackIcon]="feedbackIconTpl">
          <ng-template #feedbackIconTpl>
            @if (hasFeedback && !!status) {
              <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon>
            }
          </ng-template>
        </nz-select-arrow>
      }
      @if (nzAllowClear && !nzDisabled && selectedNodes.length) {
        <nz-select-clear (clear)="onClearSelection()"></nz-select-clear>
      }
    </div>
  `,
                    providers: [
                        NzDestroyService,
                        NzTreeSelectService,
                        { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'select' },
                        {
                            provide: NzTreeHigherOrderServiceToken,
                            useExisting: NzTreeSelectService
                        },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzTreeSelectComponent),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'ant-select ant-tree-select',
                        '[class.ant-select-in-form-item]': '!!nzFormStatusService',
                        '[class.ant-select-rtl]': 'dir==="rtl"',
                        '[class.ant-select-lg]': 'finalSize() === "large"',
                        '[class.ant-select-sm]': 'finalSize() === "small"',
                        '[class.ant-select-disabled]': 'nzDisabled',
                        '[class.ant-select-single]': '!isMultiple',
                        '[class.ant-select-show-arrow]': '!isMultiple',
                        '[class.ant-select-show-search]': '!isMultiple',
                        '[class.ant-select-multiple]': 'isMultiple',
                        '[class.ant-select-allow-clear]': 'nzAllowClear',
                        '[class.ant-select-open]': 'nzOpen',
                        '[class.ant-select-focused]': 'nzOpen || focused',
                        '(click)': 'trigger()',
                        '(keydown)': 'onKeydown($event)'
                    },
                    hostDirectives: [NzSpaceCompactItemDirective]
                }]
        }], ctorParameters: () => [{ type: NzTreeSelectService }, { type: i2.NzConfigService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.Directionality }, { type: i4.FocusMonitor }], propDecorators: { nzId: [{
                type: Input
            }], nzAllowClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzShowExpand: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzShowLine: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDropdownMatchSelectWidth: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzCheckable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzHideUnMatched: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzShowIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzShowSearch: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzAsyncData: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzMultiple: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDefaultExpandAll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzCheckStrictly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzVirtualItemSize: [{
                type: Input
            }], nzVirtualMaxBufferPx: [{
                type: Input
            }], nzVirtualMinBufferPx: [{
                type: Input
            }], nzVirtualHeight: [{
                type: Input
            }], nzExpandedIcon: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzNodes: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzDropdownStyle: [{
                type: Input
            }], nzDropdownClassName: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzPlacement: [{
                type: Input
            }], nzExpandedKeys: [{
                type: Input
            }], nzDisplayWith: [{
                type: Input
            }], nzMaxTagCount: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzMaxTagPlaceholder: [{
                type: Input
            }], nzOpenChange: [{
                type: Output
            }], nzCleared: [{
                type: Output
            }], nzRemoved: [{
                type: Output
            }], nzExpandChange: [{
                type: Output
            }], nzTreeClick: [{
                type: Output
            }], nzTreeCheckboxChange: [{
                type: Output
            }], nzSelectSearchComponent: [{
                type: ViewChild,
                args: [NzSelectSearchComponent, { static: false }]
            }], treeRef: [{
                type: ViewChild,
                args: ['treeRef', { static: false }]
            }], cdkOverlayOrigin: [{
                type: ViewChild,
                args: [CdkOverlayOrigin, { static: true }]
            }], cdkConnectedOverlay: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: false }]
            }], nzTreeTemplate: [{
                type: Input
            }], nzTreeTemplateChild: [{
                type: ContentChild,
                args: ['nzTreeTemplate', { static: true }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTreeSelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectModule, imports: [NzTreeSelectComponent], exports: [NzTreeSelectComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectModule, imports: [NzTreeSelectComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTreeSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzTreeSelectComponent],
                    exports: [NzTreeSelectComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTreeSelectComponent, NzTreeSelectModule, NzTreeSelectService };
//# sourceMappingURL=ng-zorro-antd-tree-select.mjs.map
