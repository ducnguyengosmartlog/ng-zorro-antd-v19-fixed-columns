/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { DateHelperService, NzI18nService as I18n } from 'ng-zorro-antd/i18n';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import * as i0 from "@angular/core";
export declare class NzCalendarHeaderComponent implements OnInit, OnChanges {
    private i18n;
    private dateHelper;
    mode: 'month' | 'year';
    fullscreen: boolean;
    activeDate: CandyDate;
    nzCustomHeader?: string | TemplateRef<void>;
    readonly modeChange: EventEmitter<"month" | "year">;
    readonly yearChange: EventEmitter<number>;
    readonly monthChange: EventEmitter<number>;
    yearOffset: number;
    yearTotal: number;
    years: Array<{
        label: string;
        value: number;
    }>;
    months: Array<{
        label: string;
        value: number;
    }>;
    get activeYear(): number;
    get activeMonth(): number;
    get size(): NzSelectSizeType;
    get yearTypeText(): string;
    get monthTypeText(): string;
    constructor(i18n: I18n, dateHelper: DateHelperService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateYear(year: number): void;
    private setUpYears;
    private setUpMonths;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCalendarHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCalendarHeaderComponent, "nz-calendar-header", ["nzCalendarHeader"], { "mode": { "alias": "mode"; "required": false; }; "fullscreen": { "alias": "fullscreen"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; "nzCustomHeader": { "alias": "nzCustomHeader"; "required": false; }; }, { "modeChange": "modeChange"; "yearChange": "yearChange"; "monthChange": "monthChange"; }, never, never, true, never>;
    static ngAcceptInputType_fullscreen: unknown;
}
