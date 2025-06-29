/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NgClassInterface, NzSafeAny, NzSizeLDSType, NzStatus, NzValidateStatus, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionComponent } from './option.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzFilterOptionType, NzSelectItemInterface, NzSelectModeType, NzSelectOptionInterface, NzSelectPlacementType } from './select.types';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/space";
export type NzSelectSizeType = NzSizeLDSType;
export declare class NzSelectComponent implements ControlValueAccessor, OnInit, AfterContentInit, OnChanges, OnDestroy {
    private ngZone;
    private destroy$;
    nzConfigService: NzConfigService;
    private cdr;
    private host;
    private renderer;
    private platform;
    private focusMonitor;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    nzId: string | null;
    nzSize: NzSelectSizeType;
    nzStatus: NzStatus;
    nzOptionHeightPx: number;
    nzOptionOverflowSize: number;
    nzDropdownClassName: string[] | string | null;
    nzDropdownMatchSelectWidth: boolean;
    nzDropdownStyle: Record<string, string> | null;
    nzNotFoundContent: string | TemplateRef<NzSafeAny> | undefined;
    nzPlaceHolder: string | TemplateRef<NzSafeAny> | null;
    nzPlacement: NzSelectPlacementType | null;
    nzMaxTagCount: number;
    nzDropdownRender: TemplateRef<NzSafeAny> | null;
    nzCustomTemplate: TemplateRef<{
        $implicit: NzSelectItemInterface;
    }> | null;
    nzSuffixIcon: TemplateRef<NzSafeAny> | string | null;
    nzClearIcon: TemplateRef<NzSafeAny> | null;
    nzRemoveIcon: TemplateRef<NzSafeAny> | null;
    nzMenuItemSelectedIcon: TemplateRef<NzSafeAny> | null;
    nzTokenSeparators: string[];
    nzMaxTagPlaceholder: TemplateRef<{
        $implicit: NzSafeAny[];
    }> | null;
    nzMaxMultipleCount: number;
    nzMode: NzSelectModeType;
    nzFilterOption: NzFilterOptionType;
    compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean;
    nzAllowClear: boolean;
    nzBorderless: boolean;
    nzShowSearch: boolean;
    nzLoading: boolean;
    nzAutoFocus: boolean;
    nzAutoClearSearchValue: boolean;
    nzServerSearch: boolean;
    nzDisabled: boolean;
    nzOpen: boolean;
    nzSelectOnTab: boolean;
    nzBackdrop: boolean;
    nzOptions: NzSelectOptionInterface[];
    set nzShowArrow(value: boolean);
    get nzShowArrow(): boolean;
    get isMultiple(): boolean;
    get isMaxMultipleCountSet(): boolean;
    get isMaxMultipleCountReached(): boolean;
    readonly nzOnSearch: EventEmitter<string>;
    readonly nzScrollToBottom: EventEmitter<void>;
    readonly nzOpenChange: EventEmitter<boolean>;
    readonly nzBlur: EventEmitter<void>;
    readonly nzFocus: EventEmitter<void>;
    originElement: ElementRef;
    cdkConnectedOverlay: CdkConnectedOverlay;
    nzSelectTopControlComponent: NzSelectTopControlComponent;
    listOfNzOptionComponent: QueryList<NzOptionComponent>;
    listOfNzOptionGroupComponent: QueryList<NzOptionGroupComponent>;
    nzOptionGroupComponentElement: ElementRef;
    nzSelectTopControlComponentElement: ElementRef;
    protected finalSize: import("@angular/core").Signal<NzSizeLDSType>;
    private size;
    private compactSize;
    private listOfValue$;
    private listOfTemplateItem$;
    private listOfTagAndTemplateItem;
    private searchValue;
    private isReactiveDriven;
    private value;
    private _nzShowArrow;
    private requestId;
    private isNzDisableFirstChange;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    dropdownPosition: NzSelectPlacementType;
    triggerWidth: number | null;
    listOfContainerItem: NzSelectItemInterface[];
    listOfTopItem: NzSelectItemInterface[];
    activatedValue: NzSafeAny | null;
    listOfValue: NzSafeAny[];
    focused: boolean;
    dir: Direction;
    positions: ConnectionPositionPair[];
    prefixCls: string;
    statusCls: NgClassInterface;
    status: NzValidateStatus;
    hasFeedback: boolean;
    generateTagItem(value: string): NzSelectItemInterface;
    onItemClick(value: NzSafeAny): void;
    onItemDelete(item: NzSelectItemInterface): void;
    updateListOfContainerItem(): void;
    clearInput(): void;
    updateListOfValue(listOfValue: NzSafeAny[]): void;
    onTokenSeparate(listOfLabel: string[]): void;
    onKeyDown(e: KeyboardEvent): void;
    setOpenState(value: boolean): void;
    onOpenChange(): void;
    onInputValueChange(value: string): void;
    onClearSelection(): void;
    onClickOutside(event: MouseEvent): void;
    focus(): void;
    blur(): void;
    onPositionChange(position: ConnectedOverlayPositionChange): void;
    updateCdkConnectedOverlayStatus(): void;
    updateCdkConnectedOverlayPositions(): void;
    noAnimation: NzNoAnimationDirective | null;
    protected nzFormStatusService: NzFormStatusService | null;
    private nzFormNoStatusService;
    constructor(ngZone: NgZone, destroy$: NzDestroyService, nzConfigService: NzConfigService, cdr: ChangeDetectorRef, host: ElementRef<HTMLElement>, renderer: Renderer2, platform: Platform, focusMonitor: FocusMonitor, directionality: Directionality);
    writeValue(modelValue: NzSafeAny | NzSafeAny[]): void;
    registerOnChange(fn: OnChangeType): void;
    registerOnTouched(fn: OnTouchedType): void;
    setDisabledState(disabled: boolean): void;
    ngOnChanges({ nzOpen, nzDisabled, nzOptions, nzStatus, nzPlacement, nzSize }: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private setStatusStyles;
    private getTitle;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSelectComponent, "nz-select", ["nzSelect"], { "nzId": { "alias": "nzId"; "required": false; }; "nzSize": { "alias": "nzSize"; "required": false; }; "nzStatus": { "alias": "nzStatus"; "required": false; }; "nzOptionHeightPx": { "alias": "nzOptionHeightPx"; "required": false; }; "nzOptionOverflowSize": { "alias": "nzOptionOverflowSize"; "required": false; }; "nzDropdownClassName": { "alias": "nzDropdownClassName"; "required": false; }; "nzDropdownMatchSelectWidth": { "alias": "nzDropdownMatchSelectWidth"; "required": false; }; "nzDropdownStyle": { "alias": "nzDropdownStyle"; "required": false; }; "nzNotFoundContent": { "alias": "nzNotFoundContent"; "required": false; }; "nzPlaceHolder": { "alias": "nzPlaceHolder"; "required": false; }; "nzPlacement": { "alias": "nzPlacement"; "required": false; }; "nzMaxTagCount": { "alias": "nzMaxTagCount"; "required": false; }; "nzDropdownRender": { "alias": "nzDropdownRender"; "required": false; }; "nzCustomTemplate": { "alias": "nzCustomTemplate"; "required": false; }; "nzSuffixIcon": { "alias": "nzSuffixIcon"; "required": false; }; "nzClearIcon": { "alias": "nzClearIcon"; "required": false; }; "nzRemoveIcon": { "alias": "nzRemoveIcon"; "required": false; }; "nzMenuItemSelectedIcon": { "alias": "nzMenuItemSelectedIcon"; "required": false; }; "nzTokenSeparators": { "alias": "nzTokenSeparators"; "required": false; }; "nzMaxTagPlaceholder": { "alias": "nzMaxTagPlaceholder"; "required": false; }; "nzMaxMultipleCount": { "alias": "nzMaxMultipleCount"; "required": false; }; "nzMode": { "alias": "nzMode"; "required": false; }; "nzFilterOption": { "alias": "nzFilterOption"; "required": false; }; "compareWith": { "alias": "compareWith"; "required": false; }; "nzAllowClear": { "alias": "nzAllowClear"; "required": false; }; "nzBorderless": { "alias": "nzBorderless"; "required": false; }; "nzShowSearch": { "alias": "nzShowSearch"; "required": false; }; "nzLoading": { "alias": "nzLoading"; "required": false; }; "nzAutoFocus": { "alias": "nzAutoFocus"; "required": false; }; "nzAutoClearSearchValue": { "alias": "nzAutoClearSearchValue"; "required": false; }; "nzServerSearch": { "alias": "nzServerSearch"; "required": false; }; "nzDisabled": { "alias": "nzDisabled"; "required": false; }; "nzOpen": { "alias": "nzOpen"; "required": false; }; "nzSelectOnTab": { "alias": "nzSelectOnTab"; "required": false; }; "nzBackdrop": { "alias": "nzBackdrop"; "required": false; }; "nzOptions": { "alias": "nzOptions"; "required": false; }; "nzShowArrow": { "alias": "nzShowArrow"; "required": false; }; }, { "nzOnSearch": "nzOnSearch"; "nzScrollToBottom": "nzScrollToBottom"; "nzOpenChange": "nzOpenChange"; "nzBlur": "nzBlur"; "nzFocus": "nzFocus"; }, ["listOfNzOptionComponent", "listOfNzOptionGroupComponent"], never, true, [{ directive: typeof i1.NzSpaceCompactItemDirective; inputs: {}; outputs: {}; }]>;
    static ngAcceptInputType_nzMaxMultipleCount: unknown;
    static ngAcceptInputType_nzAllowClear: unknown;
    static ngAcceptInputType_nzBorderless: unknown;
    static ngAcceptInputType_nzShowSearch: unknown;
    static ngAcceptInputType_nzLoading: unknown;
    static ngAcceptInputType_nzAutoFocus: unknown;
    static ngAcceptInputType_nzAutoClearSearchValue: unknown;
    static ngAcceptInputType_nzServerSearch: unknown;
    static ngAcceptInputType_nzDisabled: unknown;
    static ngAcceptInputType_nzOpen: unknown;
    static ngAcceptInputType_nzSelectOnTab: unknown;
    static ngAcceptInputType_nzBackdrop: unknown;
    static ngAcceptInputType_nzShowArrow: unknown;
}
