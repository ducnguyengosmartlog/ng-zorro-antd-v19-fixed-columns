/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzSkeletonAvatar, NzSkeletonParagraph, NzSkeletonTitle } from './skeleton.type';
import * as i0 from "@angular/core";
export declare class NzSkeletonComponent implements OnInit, OnChanges {
    private cdr;
    nzActive: boolean;
    nzLoading: boolean;
    nzRound: boolean;
    nzTitle: NzSkeletonTitle | boolean;
    nzAvatar: NzSkeletonAvatar | boolean;
    nzParagraph: NzSkeletonParagraph | boolean;
    title: NzSkeletonTitle;
    avatar: NzSkeletonAvatar;
    paragraph: NzSkeletonParagraph;
    rowsList: number[];
    widthList: Array<number | string>;
    constructor(cdr: ChangeDetectorRef);
    toCSSUnit(value?: number | string): string;
    private getTitleProps;
    private getAvatarProps;
    private getParagraphProps;
    private getProps;
    private getWidthList;
    private updateProps;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzSkeletonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzSkeletonComponent, "nz-skeleton", ["nzSkeleton"], { "nzActive": { "alias": "nzActive"; "required": false; }; "nzLoading": { "alias": "nzLoading"; "required": false; }; "nzRound": { "alias": "nzRound"; "required": false; }; "nzTitle": { "alias": "nzTitle"; "required": false; }; "nzAvatar": { "alias": "nzAvatar"; "required": false; }; "nzParagraph": { "alias": "nzParagraph"; "required": false; }; }, {}, never, ["*"], true, never>;
}
