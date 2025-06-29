/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { NzI18nService, NzTextI18nInterface } from 'ng-zorro-antd/i18n';
import * as i0 from "@angular/core";
export declare class NzTextCopyComponent implements OnInit, OnDestroy, OnChanges {
    private cdr;
    private clipboard;
    private i18n;
    copied: boolean;
    copyId?: ReturnType<typeof setTimeout>;
    locale: NzTextI18nInterface;
    nativeElement: any;
    copyTooltip: NzTSType | null;
    copedTooltip: NzTSType | null;
    copyIcon: NzTSType;
    copedIcon: NzTSType;
    private destroy$;
    text: string;
    tooltips?: [NzTSType, NzTSType] | null;
    icons: [NzTSType, NzTSType];
    readonly textCopy: EventEmitter<string>;
    constructor(cdr: ChangeDetectorRef, clipboard: Clipboard, i18n: NzI18nService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onClick(): void;
    onCopied(): void;
    private updateTooltips;
    private updateIcons;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTextCopyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTextCopyComponent, "nz-text-copy", ["nzTextCopy"], { "text": { "alias": "text"; "required": false; }; "tooltips": { "alias": "tooltips"; "required": false; }; "icons": { "alias": "icons"; "required": false; }; }, { "textCopy": "textCopy"; }, never, never, true, never>;
}
