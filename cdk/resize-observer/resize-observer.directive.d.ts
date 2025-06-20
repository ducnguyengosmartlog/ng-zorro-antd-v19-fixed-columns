/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NzResizeObserver } from './resize-observer.service';
import * as i0 from "@angular/core";
export declare class NzResizeObserverDirective implements AfterContentInit, OnDestroy, OnChanges {
    private nzResizeObserver;
    private elementRef;
    readonly nzResizeObserve: EventEmitter<ResizeObserverEntry[]>;
    nzResizeObserverDisabled: boolean;
    private currentSubscription;
    private subscribe;
    private unsubscribe;
    constructor(nzResizeObserver: NzResizeObserver, elementRef: ElementRef<HTMLElement>);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzResizeObserverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzResizeObserverDirective, "[nzResizeObserver]", never, { "nzResizeObserverDisabled": { "alias": "nzResizeObserverDisabled"; "required": false; }; }, { "nzResizeObserve": "nzResizeObserve"; }, never, never, true, never>;
    static ngAcceptInputType_nzResizeObserverDisabled: unknown;
}
