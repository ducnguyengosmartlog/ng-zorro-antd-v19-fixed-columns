/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NgClassInterface, NzSizeLDSType, NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { NzInputDirective } from './input.directive';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/space";
export declare class NzInputGroupWhitSuffixOrPrefixDirective {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzInputGroupWhitSuffixOrPrefixDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzInputGroupWhitSuffixOrPrefixDirective, "nz-input-group[nzSuffix], nz-input-group[nzPrefix]", never, {}, {}, never, never, true, never>;
}
export declare class NzInputGroupComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
    private focusMonitor;
    private elementRef;
    private renderer;
    private cdr;
    private directionality;
    listOfNzInputDirective: QueryList<NzInputDirective>;
    nzAddOnBeforeIcon?: string | null;
    nzAddOnAfterIcon?: string | null;
    nzPrefixIcon?: string | null;
    nzSuffixIcon?: string | null;
    nzAddOnBefore?: string | TemplateRef<void>;
    nzAddOnAfter?: string | TemplateRef<void>;
    nzPrefix?: string | TemplateRef<void>;
    nzStatus: NzStatus;
    nzSuffix?: string | TemplateRef<void>;
    nzSize: NzSizeLDSType;
    nzSearch: boolean;
    /**
     * @deprecated Will be removed in v20. Use `NzSpaceCompactComponent` instead.
     */
    nzCompact: boolean;
    isLarge: boolean;
    isSmall: boolean;
    isAffix: boolean;
    isAddOn: boolean;
    isFeedback: boolean;
    focused: boolean;
    disabled: boolean;
    dir: Direction;
    prefixCls: string;
    affixStatusCls: NgClassInterface;
    groupStatusCls: NgClassInterface;
    affixInGroupStatusCls: NgClassInterface;
    status: NzValidateStatus;
    hasFeedback: boolean;
    private destroy$;
    private nzFormStatusService;
    private nzFormNoStatusService;
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef, renderer: Renderer2, cdr: ChangeDetectorRef, directionality: Directionality);
    updateChildrenInputSize(): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private setStatusStyles;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzInputGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzInputGroupComponent, "nz-input-group", ["nzInputGroup"], { "nzAddOnBeforeIcon": { "alias": "nzAddOnBeforeIcon"; "required": false; }; "nzAddOnAfterIcon": { "alias": "nzAddOnAfterIcon"; "required": false; }; "nzPrefixIcon": { "alias": "nzPrefixIcon"; "required": false; }; "nzSuffixIcon": { "alias": "nzSuffixIcon"; "required": false; }; "nzAddOnBefore": { "alias": "nzAddOnBefore"; "required": false; }; "nzAddOnAfter": { "alias": "nzAddOnAfter"; "required": false; }; "nzPrefix": { "alias": "nzPrefix"; "required": false; }; "nzStatus": { "alias": "nzStatus"; "required": false; }; "nzSuffix": { "alias": "nzSuffix"; "required": false; }; "nzSize": { "alias": "nzSize"; "required": false; }; "nzSearch": { "alias": "nzSearch"; "required": false; }; "nzCompact": { "alias": "nzCompact"; "required": false; }; }, {}, ["listOfNzInputDirective"], ["*"], true, [{ directive: typeof i1.NzSpaceCompactItemDirective; inputs: {}; outputs: {}; }]>;
    static ngAcceptInputType_nzSearch: unknown;
    static ngAcceptInputType_nzCompact: unknown;
}
