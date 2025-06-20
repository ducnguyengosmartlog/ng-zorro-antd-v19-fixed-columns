/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NzNodeBase } from './node-base';
import { NzTreeView } from './tree';
import * as i0 from "@angular/core";
export declare class NzTreeNodeIndentsComponent {
    indents: boolean[];
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeIndentsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTreeNodeIndentsComponent, "nz-tree-node-indents", never, { "indents": { "alias": "indents"; "required": false; }; }, {}, never, never, true, never>;
}
export declare class NzTreeNodeIndentLineDirective<T> implements OnDestroy {
    private treeNode;
    private tree;
    private cdr;
    isLast: boolean | 'unset';
    isLeaf: boolean;
    private preNodeRef;
    private nextNodeRef;
    private currentIndents;
    private changeSubscription;
    constructor(treeNode: NzNodeBase<T>, tree: NzTreeView<T>, cdr: ChangeDetectorRef);
    private getIndents;
    private buildIndents;
    /**
     * We need to add an class name for the last child node,
     * this result can also be affected when the adjacent nodes are changed.
     */
    private checkAdjacent;
    private checkLast;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeNodeIndentLineDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTreeNodeIndentLineDirective<any>, "nz-tree-node[nzTreeNodeIndentLine]", never, {}, {}, never, never, true, never>;
}
