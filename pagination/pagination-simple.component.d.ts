/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';
import { PaginationItemRenderContext } from './pagination.types';
import * as i0 from "@angular/core";
export declare class NzPaginationSimpleComponent implements OnChanges, OnDestroy, OnInit {
    private cdr;
    private renderer;
    private elementRef;
    private directionality;
    template: TemplateRef<NzSafeAny>;
    itemRender: TemplateRef<PaginationItemRenderContext> | null;
    disabled: boolean;
    locale: NzPaginationI18nInterface;
    total: number;
    pageIndex: number;
    pageSize: number;
    readonly pageIndexChange: EventEmitter<number>;
    lastIndex: number;
    isFirstIndex: boolean;
    isLastIndex: boolean;
    dir: Direction;
    private destroy$;
    constructor(cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef, directionality: Directionality);
    ngOnInit(): void;
    private updateRtlStyle;
    ngOnDestroy(): void;
    jumpToPageViaInput($event: Event): void;
    prePage(): void;
    nextPage(): void;
    onPageIndexChange(index: number): void;
    updateBindingValue(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzPaginationSimpleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzPaginationSimpleComponent, "nz-pagination-simple", never, { "itemRender": { "alias": "itemRender"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "total": { "alias": "total"; "required": false; }; "pageIndex": { "alias": "pageIndex"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; }, { "pageIndexChange": "pageIndexChange"; }, never, never, true, never>;
}
