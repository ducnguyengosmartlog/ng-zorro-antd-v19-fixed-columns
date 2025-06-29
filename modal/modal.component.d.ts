/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalLegacyAPI } from './modal-legacy-api';
import { NzModalRef } from './modal-ref';
import { ModalButtonOptions, ModalOptions, ModalTypes, OnClickCallback, StyleObjectLike } from './modal-types';
import { NzModalService } from './modal.service';
import * as i0 from "@angular/core";
export declare class NzModalComponent<T extends ModalOptions = NzSafeAny, R = NzSafeAny> implements OnChanges, NzModalLegacyAPI<T, R>, OnDestroy {
    private cdr;
    private modal;
    private viewContainerRef;
    nzMask?: boolean;
    nzMaskClosable?: boolean;
    nzCloseOnNavigation?: boolean;
    nzVisible: boolean;
    nzClosable: boolean;
    nzOkLoading: boolean;
    nzOkDisabled: boolean;
    nzCancelDisabled: boolean;
    nzCancelLoading: boolean;
    nzKeyboard: boolean;
    nzNoAnimation: boolean;
    nzCentered: boolean;
    nzDraggable: boolean;
    nzContent?: string | TemplateRef<{}> | Type<T>;
    nzFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null;
    nzZIndex: number;
    nzWidth: number | string;
    nzWrapClassName?: string;
    nzClassName?: string;
    nzStyle?: object;
    nzTitle?: string | TemplateRef<{}>;
    nzCloseIcon: string | TemplateRef<void>;
    nzMaskStyle?: StyleObjectLike;
    nzBodyStyle?: StyleObjectLike;
    nzOkText?: string | null;
    nzCancelText?: string | null;
    nzOkType: NzButtonType;
    nzOkDanger: boolean;
    nzIconType: string;
    nzModalType: ModalTypes;
    nzAutofocus: 'ok' | 'cancel' | 'auto' | null;
    readonly nzOnOk: EventEmitter<T> | OnClickCallback<T> | NzSafeAny;
    readonly nzOnCancel: EventEmitter<T> | OnClickCallback<T> | NzSafeAny;
    readonly nzAfterOpen: EventEmitter<void>;
    readonly nzAfterClose: EventEmitter<R>;
    readonly nzVisibleChange: EventEmitter<boolean>;
    set modalTitle(value: TemplateRef<NzSafeAny>);
    contentFromContentChild: TemplateRef<NzSafeAny>;
    set modalFooter(value: TemplateRef<NzSafeAny>);
    private modalRef;
    private destroy$;
    get afterOpen(): Observable<void>;
    get afterClose(): Observable<R>;
    constructor(cdr: ChangeDetectorRef, modal: NzModalService, viewContainerRef: ViewContainerRef);
    open(): void;
    close(result?: R): void;
    destroy(result?: R): void;
    triggerOk(): void;
    triggerCancel(): void;
    getContentComponent(): T | void;
    getElement(): HTMLElement | void;
    getModalRef(): NzModalRef | null;
    private setTitleWithTemplate;
    private setFooterWithTemplate;
    private getConfig;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzModalComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzModalComponent<any, any>, "nz-modal", ["nzModal"], { "nzMask": { "alias": "nzMask"; "required": false; }; "nzMaskClosable": { "alias": "nzMaskClosable"; "required": false; }; "nzCloseOnNavigation": { "alias": "nzCloseOnNavigation"; "required": false; }; "nzVisible": { "alias": "nzVisible"; "required": false; }; "nzClosable": { "alias": "nzClosable"; "required": false; }; "nzOkLoading": { "alias": "nzOkLoading"; "required": false; }; "nzOkDisabled": { "alias": "nzOkDisabled"; "required": false; }; "nzCancelDisabled": { "alias": "nzCancelDisabled"; "required": false; }; "nzCancelLoading": { "alias": "nzCancelLoading"; "required": false; }; "nzKeyboard": { "alias": "nzKeyboard"; "required": false; }; "nzNoAnimation": { "alias": "nzNoAnimation"; "required": false; }; "nzCentered": { "alias": "nzCentered"; "required": false; }; "nzDraggable": { "alias": "nzDraggable"; "required": false; }; "nzContent": { "alias": "nzContent"; "required": false; }; "nzFooter": { "alias": "nzFooter"; "required": false; }; "nzZIndex": { "alias": "nzZIndex"; "required": false; }; "nzWidth": { "alias": "nzWidth"; "required": false; }; "nzWrapClassName": { "alias": "nzWrapClassName"; "required": false; }; "nzClassName": { "alias": "nzClassName"; "required": false; }; "nzStyle": { "alias": "nzStyle"; "required": false; }; "nzTitle": { "alias": "nzTitle"; "required": false; }; "nzCloseIcon": { "alias": "nzCloseIcon"; "required": false; }; "nzMaskStyle": { "alias": "nzMaskStyle"; "required": false; }; "nzBodyStyle": { "alias": "nzBodyStyle"; "required": false; }; "nzOkText": { "alias": "nzOkText"; "required": false; }; "nzCancelText": { "alias": "nzCancelText"; "required": false; }; "nzOkType": { "alias": "nzOkType"; "required": false; }; "nzOkDanger": { "alias": "nzOkDanger"; "required": false; }; "nzIconType": { "alias": "nzIconType"; "required": false; }; "nzModalType": { "alias": "nzModalType"; "required": false; }; "nzAutofocus": { "alias": "nzAutofocus"; "required": false; }; "nzOnOk": { "alias": "nzOnOk"; "required": false; }; "nzOnCancel": { "alias": "nzOnCancel"; "required": false; }; }, { "nzOnOk": "nzOnOk"; "nzOnCancel": "nzOnCancel"; "nzAfterOpen": "nzAfterOpen"; "nzAfterClose": "nzAfterClose"; "nzVisibleChange": "nzVisibleChange"; }, ["modalTitle", "contentFromContentChild", "modalFooter"], never, true, never>;
    static ngAcceptInputType_nzMask: unknown;
    static ngAcceptInputType_nzMaskClosable: unknown;
    static ngAcceptInputType_nzCloseOnNavigation: unknown;
    static ngAcceptInputType_nzVisible: unknown;
    static ngAcceptInputType_nzClosable: unknown;
    static ngAcceptInputType_nzOkLoading: unknown;
    static ngAcceptInputType_nzOkDisabled: unknown;
    static ngAcceptInputType_nzCancelDisabled: unknown;
    static ngAcceptInputType_nzCancelLoading: unknown;
    static ngAcceptInputType_nzKeyboard: unknown;
    static ngAcceptInputType_nzNoAnimation: unknown;
    static ngAcceptInputType_nzCentered: unknown;
    static ngAcceptInputType_nzDraggable: unknown;
    static ngAcceptInputType_nzZIndex: unknown;
    static ngAcceptInputType_nzOkDanger: unknown;
}
