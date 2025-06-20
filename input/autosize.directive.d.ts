/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, DoCheck, NgZone, OnDestroy } from '@angular/core';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import * as i0 from "@angular/core";
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
export declare class NzAutosizeDirective implements AfterViewInit, OnDestroy, DoCheck {
    private ngZone;
    private platform;
    private resizeService;
    private autosize;
    private el;
    private cachedLineHeight;
    private previousValue;
    private previousMinRows;
    private minRows;
    private maxRows;
    private maxHeight;
    private minHeight;
    private destroy$;
    private inputGap;
    set nzAutosize(value: string | boolean | AutoSizeType);
    resizeToFitContent(force?: boolean): void;
    private cacheTextareaLineHeight;
    setMinHeight(): number | null;
    setMaxHeight(): number | null;
    noopInputHandler(): void;
    constructor(ngZone: NgZone, platform: Platform, resizeService: NzResizeService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzAutosizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzAutosizeDirective, "textarea[nzAutosize]", ["nzAutosize"], { "nzAutosize": { "alias": "nzAutosize"; "required": false; }; }, {}, never, never, true, never>;
}
