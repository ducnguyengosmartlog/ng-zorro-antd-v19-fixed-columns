/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, ExistingProvider, NgZone, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { Mention } from './mention.component';
import { NzMentionService } from './mention.service';
import * as i0 from "@angular/core";
export declare const NZ_MENTION_TRIGGER_ACCESSOR: ExistingProvider;
export declare class NzMentionTriggerDirective implements ControlValueAccessor, OnDestroy, AfterViewInit {
    el: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
    private ngZone;
    private ref;
    private destroy$;
    private nzMentionService;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    readonly onFocusin: EventEmitter<FocusEvent>;
    readonly onBlur: EventEmitter<FocusEvent>;
    readonly onInput: EventEmitter<KeyboardEvent>;
    readonly onKeydown: EventEmitter<KeyboardEvent>;
    readonly onClick: EventEmitter<MouseEvent>;
    value?: string;
    constructor(el: ElementRef<HTMLInputElement | HTMLTextAreaElement>, ngZone: NgZone, ref: ChangeDetectorRef, destroy$: NzDestroyService, nzMentionService: NzMentionService);
    completeEvents(): void;
    focus(caretPos?: number | null): void;
    insertMention(mention: Mention): void;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private setupEventListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzMentionTriggerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzMentionTriggerDirective, "input[nzMentionTrigger], textarea[nzMentionTrigger]", ["nzMentionTrigger"], {}, { "onFocusin": "onFocusin"; "onBlur": "onBlur"; "onInput": "onInput"; "onKeydown": "onKeydown"; "onClick": "onClick"; }, never, never, true, never>;
}
