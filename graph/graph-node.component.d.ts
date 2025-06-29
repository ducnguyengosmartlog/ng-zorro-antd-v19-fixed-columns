/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AnimationBuilder } from '@angular/animations';
import { ElementRef, NgZone, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzGraph } from './graph';
import { NzGraphGroupNode, NzGraphNode } from './interface';
import * as i0 from "@angular/core";
interface Info {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class NzGraphNodeComponent implements OnInit, OnDestroy {
    private ngZone;
    private el;
    private builder;
    private renderer2;
    private graphComponent;
    node: NzGraphNode | NzGraphGroupNode;
    noAnimation?: boolean;
    customTemplate?: TemplateRef<{
        $implicit: NzGraphNode | NzGraphGroupNode;
    }>;
    animationInfo: Info | null;
    initialState: boolean;
    private destroy$;
    private animationPlayer;
    constructor(ngZone: NgZone, el: ElementRef<HTMLElement>, builder: AnimationBuilder, renderer2: Renderer2, graphComponent: NzGraph);
    ngOnInit(): void;
    ngOnDestroy(): void;
    makeAnimation(): Observable<void>;
    makeNoAnimation(): void;
    getAnimationInfo(): Info;
    nodeTransform(): {
        x: number;
        y: number;
    };
    computeCXPositionOfNodeShape(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzGraphNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzGraphNodeComponent, "[nz-graph-node]", never, { "node": { "alias": "node"; "required": false; }; "noAnimation": { "alias": "noAnimation"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_noAnimation: unknown;
}
export {};
