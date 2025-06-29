import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NzI18nService, NzQRCodeI18nInterface } from 'ng-zorro-antd/i18n';
import { ERROR_LEVEL_MAP } from './qrcode';
import * as i0 from "@angular/core";
export declare class NzQRCodeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    private i18n;
    private el;
    private cdr;
    canvas: ElementRef<HTMLCanvasElement>;
    nzValue: string;
    nzPadding: number | number[];
    nzColor: string;
    nzBgColor: string;
    nzSize: number;
    nzIcon: string;
    nzIconSize: number;
    nzBordered: boolean;
    nzStatus: 'active' | 'expired' | 'loading' | 'scanned';
    nzLevel: keyof typeof ERROR_LEVEL_MAP;
    nzStatusRender?: TemplateRef<void> | string | null;
    readonly nzRefresh: EventEmitter<string>;
    locale: NzQRCodeI18nInterface;
    isBrowser: boolean;
    private destroy$;
    private platformId;
    constructor(i18n: NzI18nService, el: ElementRef, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    reloadQRCode(): void;
    drawCanvasQRCode(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzQRCodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzQRCodeComponent, "nz-qrcode", ["nzQRCode"], { "nzValue": { "alias": "nzValue"; "required": false; }; "nzPadding": { "alias": "nzPadding"; "required": false; }; "nzColor": { "alias": "nzColor"; "required": false; }; "nzBgColor": { "alias": "nzBgColor"; "required": false; }; "nzSize": { "alias": "nzSize"; "required": false; }; "nzIcon": { "alias": "nzIcon"; "required": false; }; "nzIconSize": { "alias": "nzIconSize"; "required": false; }; "nzBordered": { "alias": "nzBordered"; "required": false; }; "nzStatus": { "alias": "nzStatus"; "required": false; }; "nzLevel": { "alias": "nzLevel"; "required": false; }; "nzStatusRender": { "alias": "nzStatusRender"; "required": false; }; }, { "nzRefresh": "nzRefresh"; }, never, never, true, never>;
    static ngAcceptInputType_nzSize: unknown;
    static ngAcceptInputType_nzIconSize: unknown;
    static ngAcceptInputType_nzBordered: unknown;
}
