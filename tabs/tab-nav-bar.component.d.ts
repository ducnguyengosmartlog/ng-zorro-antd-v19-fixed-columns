import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/overlay';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTabPositionMode, NzTabScrollEvent, NzTabScrollListOffsetEvent } from './interfaces';
import { NzTabAddButtonComponent } from './tab-add-button.component';
import { NzTabBarExtraContentDirective } from './tab-bar-extra-content.directive';
import { NzTabNavItemDirective } from './tab-nav-item.directive';
import { NzTabNavOperationComponent } from './tab-nav-operation.component';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
import * as i0 from "@angular/core";
export declare class NzTabNavBarComponent implements AfterViewInit, AfterContentChecked, OnDestroy, OnChanges {
    private cdr;
    private ngZone;
    private viewportRuler;
    private nzResizeObserver;
    private dir;
    readonly indexFocused: EventEmitter<number>;
    readonly selectFocusedIndex: EventEmitter<number>;
    readonly addClicked: EventEmitter<void>;
    readonly tabScroll: EventEmitter<NzTabScrollEvent>;
    position: NzTabPositionMode;
    addable: boolean;
    hideBar: boolean;
    addIcon: string | TemplateRef<NzSafeAny>;
    inkBarAnimated: boolean;
    extraTemplate?: TemplateRef<void>;
    readonly extraContents: import("@angular/core").InputSignal<readonly NzTabBarExtraContentDirective[]>;
    readonly startExtraContent: import("@angular/core").Signal<NzTabBarExtraContentDirective | undefined>;
    readonly endExtraContent: import("@angular/core").Signal<NzTabBarExtraContentDirective | undefined>;
    get selectedIndex(): number;
    set selectedIndex(value: number);
    navWarpRef: ElementRef<HTMLElement>;
    navListRef: ElementRef<HTMLElement>;
    operationRef: NzTabNavOperationComponent;
    addBtnRef: NzTabAddButtonComponent;
    inkBar: NzTabsInkBarDirective;
    items: QueryList<NzTabNavItemDirective>;
    /** Tracks which element has focus; used for keyboard navigation */
    get focusIndex(): number;
    /** When the focus index is set, we must manually send focus to the correct label */
    set focusIndex(value: number);
    get showAddButton(): boolean;
    translate: null | string;
    transformX: number;
    transformY: number;
    pingLeft: boolean;
    pingRight: boolean;
    pingTop: boolean;
    pingBottom: boolean;
    hiddenItems: NzTabNavItemDirective[];
    private keyManager;
    private destroy$;
    private _selectedIndex;
    private wrapperWidth;
    private wrapperHeight;
    private scrollListWidth;
    private scrollListHeight;
    private operationWidth;
    private operationHeight;
    private addButtonWidth;
    private addButtonHeight;
    private selectedIndexChanged;
    private lockAnimationTimeoutId?;
    private cssTransformTimeWaitingId?;
    constructor(cdr: ChangeDetectorRef, ngZone: NgZone, viewportRuler: ViewportRuler, nzResizeObserver: NzResizeObserver, dir: Directionality);
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    onSelectedFromMenu(tab: NzTabNavItemDirective): void;
    onOffsetChange(e: NzTabScrollListOffsetEvent): void;
    handleKeydown(event: KeyboardEvent): void;
    private isValidIndex;
    private scrollToTab;
    private lockAnimation;
    private setTransform;
    private clampTransformX;
    private clampTransformY;
    private updateScrollListPosition;
    private resetSizes;
    private alignInkBarToSelectedTab;
    private setPingStatus;
    private setVisibleRange;
    private getLayoutDirection;
    private setTabFocus;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTabNavBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTabNavBarComponent, "nz-tabs-nav", ["nzTabsNav"], { "position": { "alias": "position"; "required": false; }; "addable": { "alias": "addable"; "required": false; }; "hideBar": { "alias": "hideBar"; "required": false; }; "addIcon": { "alias": "addIcon"; "required": false; }; "inkBarAnimated": { "alias": "inkBarAnimated"; "required": false; }; "extraTemplate": { "alias": "extraTemplate"; "required": false; }; "extraContents": { "alias": "extraContents"; "required": true; "isSignal": true; }; "selectedIndex": { "alias": "selectedIndex"; "required": false; }; }, { "indexFocused": "indexFocused"; "selectFocusedIndex": "selectFocusedIndex"; "addClicked": "addClicked"; "tabScroll": "tabScroll"; }, ["items"], ["*"], true, never>;
    static ngAcceptInputType_addable: unknown;
    static ngAcceptInputType_hideBar: unknown;
}
