/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DataSource } from '@angular/cdk/collections';
import { CdkTree, TreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, IterableDiffer, IterableDiffers, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzTreeView<T> extends CdkTree<T> implements OnInit, OnDestroy {
    protected differs: IterableDiffers;
    protected changeDetectorRef: ChangeDetectorRef;
    private directionality;
    private destroy$;
    dir: Direction;
    _dataSourceChanged: Subject<void>;
    treeControl?: TreeControl<T, NzSafeAny>;
    get dataSource(): DataSource<T> | Observable<T[]> | T[];
    set dataSource(dataSource: DataSource<T> | Observable<T[]> | T[]);
    nzDirectoryTree: boolean;
    nzBlockNode: boolean;
    noAnimation: NzNoAnimationDirective | null;
    constructor(differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef, directionality: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
    renderNodeChanges(data: T[] | readonly T[], dataDiffer?: IterableDiffer<T>, viewContainer?: ViewContainerRef, parentData?: T): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeView<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeView<any>, "ng-component", never, { "treeControl": { "alias": "nzTreeControl"; "required": false; }; "dataSource": { "alias": "nzDataSource"; "required": false; }; "nzDirectoryTree": { "alias": "nzDirectoryTree"; "required": false; }; "nzBlockNode": { "alias": "nzBlockNode"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_nzDirectoryTree: unknown;
    static ngAcceptInputType_nzBlockNode: unknown;
}
