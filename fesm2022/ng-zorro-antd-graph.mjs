import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Subject, ReplaySubject, forkJoin } from 'rxjs';
import { map, filter, takeUntil, take, finalize } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { Component, inject, Injector, afterNextRender, Input, ChangeDetectionStrategy, Directive, booleanAttribute, EventEmitter, Output, ElementRef, TemplateRef, forwardRef, ContentChild, ViewChildren, ViewEncapsulation, NgModule } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { line, curveLinear, curveBasis } from 'd3-shape';
import { drag } from 'd3-drag';
import { select, pointer } from 'd3-selection';
import { zoomIdentity, zoom, zoomTransform } from 'd3-zoom';
import { reqAnimFrame, cancelRequestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import * as i1 from '@angular/animations';
import { style, query, group, animate } from '@angular/animations';
import { fromEventOutsideAngular, numberAttributeWithOneFallback } from 'ng-zorro-antd/core/util';
import { transition } from 'd3-transition';
import { buildGraph } from 'dagre-compound';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
var NzGraphEdgeType;
(function (NzGraphEdgeType) {
    NzGraphEdgeType["LINE"] = "line";
    NzGraphEdgeType["CURVE"] = "curve";
})(NzGraphEdgeType || (NzGraphEdgeType = {}));
function nzTypeDefinition() {
    return item => item;
}
const NZ_GRAPH_LAYOUT_SETTING = {
    graph: {
        meta: {
            nodeSep: 50,
            rankSep: 50,
            edgeSep: 5
        }
    },
    subScene: {
        meta: {
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            labelHeight: 20
        }
    },
    nodeSize: {
        meta: {
            width: 50,
            maxLabelWidth: 0,
            height: 50
        },
        node: {
            width: 50,
            height: 50,
            labelOffset: 10,
            maxLabelWidth: 40
        },
        bridge: {
            width: 5,
            height: 5,
            radius: 2,
            labelOffset: 0
        }
    }
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphData {
    _data = new BehaviorSubject({});
    dataSource;
    /** A selection model with multi-selection to track expansion status. */
    expansionModel = new SelectionModel(true);
    /** Toggles one single data node's expanded/collapsed state. */
    toggle(nodeName) {
        this.expansionModel.toggle(nodeName);
    }
    /** Expands one single data node. */
    expand(nodeName) {
        const compound = this.dataSource.compound || {};
        const toBeSelected = this.findParents(compound, nodeName, [nodeName]);
        this.expansionModel.select(...toBeSelected);
    }
    /** Collapses one single data node. */
    collapse(nodeName) {
        const compound = this.dataSource.compound || {};
        const toBeDeselected = this.findChildren(compound, nodeName, [nodeName]);
        this.expansionModel.deselect(...toBeDeselected);
    }
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    isExpanded(nodeName) {
        return this.expansionModel.isSelected(nodeName);
    }
    /** Collapse all dataNodes in the tree. */
    collapseAll() {
        this.expansionModel.clear();
    }
    expandAll() {
        this.expansionModel.select(...Object.keys(this._data.value.compound || {}));
    }
    setData(data) {
        this.expansionModel?.clear();
        this.dataSource = data;
        this._data.next(data);
    }
    constructor(source) {
        if (source) {
            this.expansionModel?.clear();
            this.dataSource = source;
            this._data.next(source);
        }
    }
    connect() {
        const changes = [this._data, this.expansionModel.changed];
        return merge(...changes).pipe(map(() => this._data.value));
    }
    disconnect() {
        // do nothing for now
    }
    findParents(data, key, parents = []) {
        const parent = Object.keys(data)
            .filter(d => d !== key)
            .find(d => data[d].includes(key));
        if (!parent) {
            return parents;
        }
        else {
            return this.findParents(data, parent, [parent, ...parents]);
        }
    }
    findChildren(data, key, children = []) {
        const groupIds = Object.keys(data);
        const child = (data[key] || []).filter((c) => groupIds.includes(c));
        if (child && child.length > 0) {
            return child.reduce((pre, cur) => Array.from(new Set([...pre, ...this.findChildren(data, cur, [...children, cur])])), children);
        }
        return children;
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphDefsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphDefsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzGraphDefsComponent, isStandalone: true, selector: "svg:defs[nz-graph-defs]", ngImport: i0, template: `
    <svg:marker
      class="nz-graph-edge-marker"
      id="edge-end-arrow"
      viewBox="1 0 20 20"
      refX="8"
      refY="3.5"
      markerWidth="10"
      markerHeight="10"
      orient="auto"
    >
      <svg:polygon points="0 0, 10 3.5, 0 7"></svg:polygon>
    </svg:marker>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphDefsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'svg:defs[nz-graph-defs]',
                    template: `
    <svg:marker
      class="nz-graph-edge-marker"
      id="edge-end-arrow"
      viewBox="1 0 20 20"
      refX="8"
      refY="3.5"
      markerWidth="10"
      markerHeight="10"
      orient="auto"
    >
      <svg:polygon points="0 0, 10 3.5, 0 7"></svg:polygon>
    </svg:marker>
  `
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphEdgeComponent {
    elementRef;
    cdr;
    edge;
    edgeType;
    customTemplate;
    get id() {
        return this.edge?.id || `${this.edge.v}--${this.edge.w}`;
    }
    el;
    path;
    line = line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(curveLinear);
    injector = inject(Injector);
    constructor(elementRef, cdr) {
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.el = this.elementRef.nativeElement;
    }
    ngOnInit() {
        this.initElementStyle();
    }
    ngOnChanges(changes) {
        const { edge, customTemplate, edgeType } = changes;
        if (edge) {
            afterNextRender(() => {
                // Update path element if customTemplate set
                if (customTemplate) {
                    this.initElementStyle();
                }
                this.setLine();
                this.cdr.markForCheck();
            }, { injector: this.injector });
        }
        if (edgeType) {
            const type = this.edgeType === NzGraphEdgeType.LINE ? curveLinear : curveBasis;
            this.line = line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(type);
        }
    }
    initElementStyle() {
        this.path = this.el.querySelector('path');
        this.setElementData();
    }
    setLine() {
        this.setPath(this.line(this.edge.points));
    }
    setPath(d) {
        this.path.setAttribute('d', d);
    }
    setElementData() {
        if (!this.path) {
            return;
        }
        this.path.setAttribute('id', this.id);
        this.path.setAttribute('data-edge', this.id);
        this.path.setAttribute('data-v', `${this.edge.v}`);
        this.path.setAttribute('data-w', `${this.edge.w}`);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphEdgeComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzGraphEdgeComponent, isStandalone: true, selector: "[nz-graph-edge]", inputs: { edge: "edge", edgeType: "edgeType", customTemplate: "customTemplate" }, usesOnChanges: true, ngImport: i0, template: `
    @if (customTemplate) {
      <ng-container [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: edge }" />
    } @else {
      <svg:g>
        <path class="nz-graph-edge-line" [attr.marker-end]="'url(#edge-end-arrow)'"></path>
        @if (edge.label) {
          <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="10">
            <textPath [attr.href]="'#' + id" startOffset="50%">{{ edge.label }}</textPath>
          </svg:text>
        }
      </svg:g>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphEdgeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-graph-edge]',
                    template: `
    @if (customTemplate) {
      <ng-container [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: edge }" />
    } @else {
      <svg:g>
        <path class="nz-graph-edge-line" [attr.marker-end]="'url(#edge-end-arrow)'"></path>
        @if (edge.label) {
          <svg:text class="nz-graph-edge-text" text-anchor="middle" dy="10">
            <textPath [attr.href]="'#' + id" startOffset="50%">{{ edge.label }}</textPath>
          </svg:text>
        }
      </svg:g>
    }
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NgTemplateOutlet]
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { edge: [{
                type: Input
            }], edgeType: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphEdgeDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphEdgeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzGraphEdgeDirective, isStandalone: true, selector: "[nzGraphEdge]", exportAs: ["nzGraphEdge"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphEdgeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzGraphEdge]',
                    exportAs: 'nzGraphEdge'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphGroupNodeDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphGroupNodeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzGraphGroupNodeDirective, isStandalone: true, selector: "[nzGraphGroupNode]", exportAs: ["nzGraphGroupNode"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphGroupNodeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzGraphGroupNode]',
                    exportAs: 'nzGraphGroupNode'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const FRAC_VIEWPOINT_AREA = 0.8;
class Minimap {
    ngZone;
    svg;
    zoomG;
    mainZoom;
    minimap;
    maxWidth;
    labelPadding;
    canvas;
    canvasRect;
    canvasBuffer;
    minimapSvg;
    viewpoint;
    scaleMinimap;
    scaleMain;
    translate;
    viewpointCoord;
    minimapSize;
    unlisteners = [];
    constructor(ngZone, svg, zoomG, mainZoom, minimap, maxWidth, labelPadding) {
        this.ngZone = ngZone;
        this.svg = svg;
        this.zoomG = zoomG;
        this.mainZoom = mainZoom;
        this.minimap = minimap;
        this.maxWidth = maxWidth;
        this.labelPadding = labelPadding;
        const minimapElement = select(minimap);
        const minimapSvgElement = minimapElement.select('svg');
        const viewpointElement = minimapSvgElement.select('rect');
        this.canvas = minimapElement.select('canvas.viewport').node();
        this.canvasRect = this.canvas.getBoundingClientRect();
        const handleEvent = (event) => {
            const minimapOffset = this.minimapOffset();
            const width = Number(viewpointElement.attr('width'));
            const height = Number(viewpointElement.attr('height'));
            const clickCoords = pointer(event, minimapSvgElement.node());
            this.viewpointCoord.x = clickCoords[0] - width / 2 - minimapOffset.x;
            this.viewpointCoord.y = clickCoords[1] - height / 2 - minimapOffset.y;
            this.updateViewpoint();
        };
        this.viewpointCoord = { x: 0, y: 0 };
        const subject = drag().subject(Object);
        const dragEvent = subject.on('drag', handleEvent);
        viewpointElement.datum(this.viewpointCoord).call(dragEvent);
        // Make the minimap clickable.
        minimapSvgElement.on('click', event => {
            if (event.defaultPrevented) {
                // This click was part of a drag event, so suppress it.
                return;
            }
            handleEvent(event);
        });
        this.unlisteners.push(() => {
            subject.on('drag', null);
            minimapSvgElement.on('click', null);
        });
        this.viewpoint = viewpointElement.node();
        this.minimapSvg = minimapSvgElement.node();
        this.canvasBuffer = minimapElement.select('canvas.buffer').node();
        this.update();
    }
    destroy() {
        while (this.unlisteners.length) {
            this.unlisteners.pop()();
        }
    }
    minimapOffset() {
        return {
            x: (this.canvasRect.width - this.minimapSize.width) / 2,
            y: (this.canvasRect.height - this.minimapSize.height) / 2
        };
    }
    updateViewpoint() {
        // Update the coordinates of the viewpoint rectangle.
        select(this.viewpoint).attr('x', this.viewpointCoord.x).attr('y', this.viewpointCoord.y);
        // Update the translation vector of the main svg to reflect the
        // new viewpoint.
        const mainX = (-this.viewpointCoord.x * this.scaleMain) / this.scaleMinimap;
        const mainY = (-this.viewpointCoord.y * this.scaleMain) / this.scaleMinimap;
        select(this.svg).call(this.mainZoom.transform, zoomIdentity.translate(mainX, mainY).scale(this.scaleMain));
    }
    update() {
        let sceneSize = null;
        try {
            // Get the size of the entire scene.
            sceneSize = this.zoomG.getBBox();
            if (sceneSize.width === 0) {
                // There is no scene anymore. We have been detached from the dom.
                return;
            }
        }
        catch {
            // Firefox produced NS_ERROR_FAILURE if we have been
            // detached from the dom.
            return;
        }
        const svgSelection = select(this.svg);
        // Read all the style rules in the document and embed them into the svg.
        // The svg needs to be self contained, i.e. all the style rules need to be
        // embedded so the canvas output matches the origin.
        let stylesText = '';
        for (const k of new Array(document.styleSheets.length).keys()) {
            try {
                const cssRules = document.styleSheets[k].cssRules || document.styleSheets[k].rules;
                if (cssRules == null) {
                    continue;
                }
                for (const i of new Array(cssRules.length).keys()) {
                    // Remove tf-* selectors from the styles.
                    stylesText += `${cssRules[i].cssText.replace(/ ?tf-[\w-]+ ?/g, '')}\n`;
                }
            }
            catch (e) {
                if (e.name !== 'SecurityError') {
                    throw e;
                }
            }
        }
        // Temporarily add the css rules to the main svg.
        const svgStyle = svgSelection.append('style');
        svgStyle.text(stylesText);
        // Temporarily remove the zoom/pan transform from the main svg since we
        // want the minimap to show a zoomed-out and centered view.
        const zoomGSelection = select(this.zoomG);
        const zoomTransform = zoomGSelection.attr('transform');
        zoomGSelection.attr('transform', null);
        // Since we add padding, account for that here.
        sceneSize.height += this.labelPadding * 2;
        sceneSize.width += this.labelPadding * 2;
        // Temporarily assign an explicit width/height to the main svg, since
        // it doesn't have one (uses flex-box), but we need it for the canvas
        // to work.
        svgSelection.attr('width', sceneSize.width).attr('height', sceneSize.height);
        // Since the content inside the svg changed (e.g. a node was expanded),
        // the aspect ratio have also changed. Thus, we need to update the scale
        // factor of the minimap. The scale factor is determined such that both
        // the width and height of the minimap are <= maximum specified w/h.
        this.scaleMinimap = this.maxWidth / Math.max(sceneSize.width, sceneSize.height);
        this.minimapSize = {
            width: sceneSize.width * this.scaleMinimap,
            height: sceneSize.height * this.scaleMinimap
        };
        const minimapOffset = this.minimapOffset();
        // Update the size of the minimap's svg, the buffer canvas and the
        // viewpoint rect.
        select(this.minimapSvg).attr(this.minimapSize);
        select(this.canvasBuffer).attr(this.minimapSize);
        if (this.translate != null && this.zoom != null) {
            // Update the viewpoint rectangle shape since the aspect ratio of the
            // map has changed.
            this.ngZone.runOutsideAngular(() => reqAnimFrame(() => this.zoom()));
        }
        // Serialize the main svg to a string which will be used as the rendering
        // content for the canvas.
        const svgXml = new XMLSerializer().serializeToString(this.svg);
        // Now that the svg is serialized for rendering, remove the temporarily
        // assigned styles, explicit width and height and bring back the pan/zoom
        // transform.
        svgStyle.remove();
        svgSelection.attr('width', '100%').attr('height', '100%');
        zoomGSelection.attr('transform', zoomTransform);
        const image = document.createElement('img');
        const onLoad = () => {
            // Draw the svg content onto the buffer canvas.
            const context = this.canvasBuffer.getContext('2d');
            context.clearRect(0, 0, this.canvasBuffer.width, this.canvasBuffer.height);
            context.drawImage(image, minimapOffset.x, minimapOffset.y, this.minimapSize.width, this.minimapSize.height);
            this.ngZone.runOutsideAngular(() => {
                reqAnimFrame(() => {
                    // Hide the old canvas and show the new buffer canvas.
                    select(this.canvasBuffer).style('display', 'block');
                    select(this.canvas).style('display', 'none');
                    // Swap the two canvases.
                    [this.canvas, this.canvasBuffer] = [this.canvasBuffer, this.canvas];
                });
            });
        };
        image.addEventListener('load', onLoad);
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;
        this.unlisteners.push(() => {
            image.removeEventListener('load', onLoad);
        });
    }
    /**
     * Handles changes in zooming/panning. Should be called from the main svg
     * to notify that a zoom/pan was performed and this minimap will update it's
     * viewpoint rectangle.
     *
     * @param transform
     */
    zoom(transform) {
        if (this.scaleMinimap == null) {
            // Scene is not ready yet.
            return;
        }
        // Update the new translate and scale params, only if specified.
        if (transform) {
            this.translate = [transform.x, transform.y];
            this.scaleMain = transform.k;
        }
        // Update the location of the viewpoint rectangle.
        const svgRect = this.svg.getBoundingClientRect();
        const minimapOffset = this.minimapOffset();
        const viewpointSelection = select(this.viewpoint);
        this.viewpointCoord.x = (-this.translate[0] * this.scaleMinimap) / this.scaleMain;
        this.viewpointCoord.y = (-this.translate[1] * this.scaleMinimap) / this.scaleMain;
        const viewpointWidth = (svgRect.width * this.scaleMinimap) / this.scaleMain;
        const viewpointHeight = (svgRect.height * this.scaleMinimap) / this.scaleMain;
        viewpointSelection
            .attr('x', this.viewpointCoord.x + minimapOffset.x)
            .attr('y', this.viewpointCoord.y + minimapOffset.y)
            .attr('width', viewpointWidth)
            .attr('height', viewpointHeight);
        // Show/hide the minimap depending on the viewpoint area as fraction of the
        // whole minimap.
        const mapWidth = this.minimapSize.width;
        const mapHeight = this.minimapSize.height;
        const x = this.viewpointCoord.x;
        const y = this.viewpointCoord.y;
        const w = Math.min(Math.max(0, x + viewpointWidth), mapWidth) - Math.min(Math.max(0, x), mapWidth);
        const h = Math.min(Math.max(0, y + viewpointHeight), mapHeight) - Math.min(Math.max(0, y), mapHeight);
        const fracIntersect = (w * h) / (mapWidth * mapHeight);
        if (fracIntersect < FRAC_VIEWPOINT_AREA) {
            this.minimap.classList.remove('hidden');
        }
        else {
            this.minimap.classList.add('hidden');
        }
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphMinimapComponent {
    elementRef;
    ngZone;
    minimap;
    constructor(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
    }
    ngOnDestroy() {
        this.minimap?.destroy();
    }
    init(containerEle, zoomBehavior) {
        const svgEle = containerEle.nativeElement.querySelector('svg');
        const zoomEle = containerEle.nativeElement.querySelector('svg > g');
        this.minimap = new Minimap(this.ngZone, svgEle, zoomEle, zoomBehavior, this.elementRef.nativeElement, 150, 0);
    }
    zoom(transform) {
        this.minimap?.zoom(transform);
    }
    update() {
        this.minimap?.update();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphMinimapComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzGraphMinimapComponent, isStandalone: true, selector: "nz-graph-minimap", host: { properties: { "class.nz-graph-minimap": "true" } }, ngImport: i0, template: `
    <svg>
      <defs>
        <filter id="minimapDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0"
          ></feColorMatrix>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <rect></rect>
    </svg>
    <canvas class="viewport"></canvas>
    <!-- Additional canvas to use as buffer to avoid flickering between updates -->
    <canvas class="buffer"></canvas>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphMinimapComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-graph-minimap',
                    template: `
    <svg>
      <defs>
        <filter id="minimapDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.5 0"
          ></feColorMatrix>
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <rect></rect>
    </svg>
    <canvas class="viewport"></canvas>
    <!-- Additional canvas to use as buffer to avoid flickering between updates -->
    <canvas class="buffer"></canvas>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.nz-graph-minimap]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * https://angular.io/errors/NG3003
 * An intermediate interface for {@link NzGraphComponent} & {@link NzGraphNodeComponent}
 */
class NzGraph {
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphNodeComponent {
    ngZone;
    el;
    builder;
    renderer2;
    graphComponent;
    node;
    noAnimation;
    customTemplate;
    animationInfo = null;
    initialState = true;
    destroy$ = new Subject();
    animationPlayer = null;
    constructor(ngZone, el, builder, renderer2, graphComponent) {
        this.ngZone = ngZone;
        this.el = el;
        this.builder = builder;
        this.renderer2 = renderer2;
        this.graphComponent = graphComponent;
    }
    ngOnInit() {
        fromEventOutsideAngular(this.el.nativeElement, 'click')
            .pipe(filter(event => {
            event.preventDefault();
            return this.graphComponent.nzNodeClick.observers.length > 0;
        }), takeUntil(this.destroy$))
            .subscribe(() => {
            // Re-enter the Angular zone and run the change detection only if there're any `nzNodeClick` listeners,
            // e.g.: `<nz-graph (nzNodeClick)="..."></nz-graph>`.
            this.ngZone.run(() => this.graphComponent.nzNodeClick.emit(this.node));
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    makeAnimation() {
        const cur = this.getAnimationInfo();
        if (this.animationPlayer) {
            this.animationPlayer.destroy();
        }
        let animationFactory;
        const pre = { ...this.animationInfo };
        if (this.initialState) {
            animationFactory = this.builder.build([
                style({ transform: `translate(${cur.x}px, ${cur.y}px)` }),
                query('g', [
                    style({
                        width: `${cur.width}px`,
                        height: `${cur.height}px`
                    })
                ])
            ]);
            this.initialState = false;
        }
        else {
            animationFactory = this.builder.build([
                style({ transform: `translate(${pre.x}px, ${pre.y}px)` }),
                query('g', [
                    style({
                        width: `${pre.width}px`,
                        height: `${pre.height}px`
                    })
                ]),
                group([
                    query('g', [
                        animate('150ms ease-out', style({
                            width: `${cur.width}px`,
                            height: `${cur.height}px`
                        }))
                    ]),
                    animate('150ms ease-out', style({ transform: `translate(${cur.x}px, ${cur.y}px)` }))
                ])
            ]);
        }
        this.animationInfo = cur;
        this.animationPlayer = animationFactory.create(this.el.nativeElement);
        this.animationPlayer.play();
        const done$ = new Subject();
        this.animationPlayer.onDone(() => {
            // Need this for canvas for now.
            this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
            done$.next();
            done$.complete();
        });
        return done$.asObservable();
    }
    makeNoAnimation() {
        const cur = this.getAnimationInfo();
        // Need this for canvas for now.
        this.renderer2.setAttribute(this.el.nativeElement, 'transform', `translate(${cur.x}, ${cur.y})`);
    }
    getAnimationInfo() {
        const { x, y } = this.nodeTransform();
        return {
            width: this.node.width,
            height: this.node.height,
            x,
            y
        };
    }
    nodeTransform() {
        const x = this.computeCXPositionOfNodeShape() - this.node.width / 2;
        const y = this.node.y - this.node.height / 2;
        return { x, y };
    }
    computeCXPositionOfNodeShape() {
        if (this.node.expanded) {
            return this.node.x;
        }
        return this.node.x - this.node.width / 2 + this.node.coreBox.width / 2;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphNodeComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1.AnimationBuilder }, { token: i0.Renderer2 }, { token: NzGraph }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzGraphNodeComponent, isStandalone: true, selector: "[nz-graph-node]", inputs: { node: "node", noAnimation: ["noAnimation", "noAnimation", booleanAttribute], customTemplate: "customTemplate" }, host: { properties: { "id": "node.id || node.name", "class.nz-graph-node-expanded": "node.expanded", "class.nz-graph-group-node": "node.type===0", "class.nz-graph-base-node": "node.type===1" } }, ngImport: i0, template: `
    <svg:g>
      @if (customTemplate) {
        <ng-container [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: node }" />
      } @else {
        <svg:rect class="nz-graph-node-rect" [attr.width]="node.width" [attr.height]="node.height"></svg:rect>
        <svg:text x="10" y="20">{{ node.id || node.name }}</svg:text>
      }
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphNodeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-graph-node]',
                    template: `
    <svg:g>
      @if (customTemplate) {
        <ng-container [ngTemplateOutlet]="customTemplate" [ngTemplateOutletContext]="{ $implicit: node }" />
      } @else {
        <svg:rect class="nz-graph-node-rect" [attr.width]="node.width" [attr.height]="node.height"></svg:rect>
        <svg:text x="10" y="20">{{ node.id || node.name }}</svg:text>
      }
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[id]': 'node.id || node.name',
                        '[class.nz-graph-node-expanded]': 'node.expanded',
                        '[class.nz-graph-group-node]': 'node.type===0',
                        '[class.nz-graph-base-node]': 'node.type===1'
                    },
                    imports: [NgTemplateOutlet]
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i1.AnimationBuilder }, { type: i0.Renderer2 }, { type: NzGraph }], propDecorators: { node: [{
                type: Input
            }], noAnimation: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], customTemplate: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphNodeDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphNodeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzGraphNodeDirective, isStandalone: true, selector: "[nzGraphNode]", exportAs: ["nzGraphNode"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphNodeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzGraphNode]',
                    exportAs: 'nzGraphNode'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Calculate position and scale
 *
 * @param containerEle
 * @param targetEle
 * @param scale: if scale is set, skip calculate scale value
 */
const calculateTransform = (containerEle, targetEle, scale) => {
    const containerEleSize = containerEle.getBoundingClientRect();
    const targetEleSize = targetEle.getBBox();
    if (!targetEleSize.width) {
        // There is no g element anymore.
        return null;
    }
    // TODO
    // leave some place when re-scale
    const scaleUnit = (containerEleSize.width - 48) / containerEleSize.width;
    const k = scale ||
        Math.min(containerEleSize.width / targetEleSize.width, containerEleSize.height / targetEleSize.height, 1) *
            scaleUnit;
    const x = (containerEleSize.width - targetEleSize.width * k) / 2;
    const y = (containerEleSize.height - targetEleSize.height * k) / 2;
    return {
        x,
        y,
        k
    };
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphZoomDirective {
    element;
    cdr;
    nzZoom;
    nzMinZoom = 0.1;
    nzMaxZoom = 10;
    nzTransformEvent = new EventEmitter();
    nzZoomChange = new EventEmitter();
    svgSelection;
    zoomBehavior;
    // TODO
    // Support svg element only now
    svgElement;
    gZoomElement;
    destroy$ = new Subject();
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
    }
    ngAfterViewInit() {
        this.bind();
    }
    ngOnDestroy() {
        this.unbind();
        this.destroy$.next();
        this.destroy$.complete();
    }
    bind() {
        this.svgElement = this.element.nativeElement.querySelector('svg');
        this.gZoomElement = this.element.nativeElement.querySelector('svg > g');
        const { width, height } = this.element.nativeElement.getBoundingClientRect();
        this.svgSelection = transition()
            .selection()
            .select(() => this.svgElement);
        this.zoomBehavior = zoom()
            .extent([
            [0, 0],
            [width, height]
        ])
            .scaleExtent([this.nzMinZoom, this.nzMaxZoom])
            .on('zoom', e => {
            this.zoomed(e);
        });
        this.svgSelection.call(this.zoomBehavior, zoomIdentity.translate(0, 0).scale(this.nzZoom || 1));
        // Init with nzZoom
        this.reScale(0, this.nzZoom);
    }
    unbind() {
        // Destroy listener
        this.svgSelection?.interrupt().selectAll('*').interrupt();
        if (this.zoomBehavior) {
            this.zoomBehavior.on('end', null).on('zoom', null);
        }
    }
    // Methods
    fitCenter(duration = 0) {
        this.reScale(duration);
    }
    focus(id, duration = 0) {
        // Make sure this node is under SVG container
        if (!this.svgElement.getElementById(`${id}`)) {
            return;
        }
        const node = this.svgElement.getElementById(`${id}`);
        const svgRect = this.svgElement.getBoundingClientRect();
        const position = this.getRelativePositionInfo(node);
        const svgTransform = zoomTransform(this.svgElement);
        const centerX = (position.topLeft.x + position.bottomRight.x) / 2;
        const centerY = (position.topLeft.y + position.bottomRight.y) / 2;
        const dx = svgRect.left + svgRect.width / 2 - centerX;
        const dy = svgRect.top + svgRect.height / 2 - centerY;
        this.svgSelection
            .transition()
            .duration(duration)
            .call(this.zoomBehavior.translateBy, dx / svgTransform.k, dy / svgTransform.k);
    }
    /**
     * Handle zoom event
     *
     * @param transform
     */
    zoomed({ transform }) {
        const { x, y, k } = transform;
        // Update g element transform
        this.gZoomElement.setAttribute('transform', `translate(${x}, ${y})scale(${k})`);
        this.nzZoom = k;
        this.nzZoomChange.emit(this.nzZoom);
        this.nzTransformEvent.emit(transform);
        this.cdr.markForCheck();
    }
    /**
     * Scale with zoom and duration
     *
     * @param duration
     * @param scale
     * @private
     */
    reScale(duration, scale) {
        const transform = calculateTransform(this.svgElement, this.gZoomElement, scale);
        if (!transform) {
            return;
        }
        const { x, y, k } = transform;
        const zTransform = zoomIdentity.translate(x, y).scale(Math.max(k, this.nzMinZoom));
        this.svgSelection
            .transition()
            .duration(duration)
            .call(this.zoomBehavior.transform, zTransform)
            .on('end.fitted', () => {
            this.zoomBehavior.on('end.fitted', null);
        });
    }
    getRelativePositionInfo(node) {
        const nodeBox = node.getBBox();
        const nodeCtm = node.getScreenCTM();
        let pointTL = this.svgElement.createSVGPoint();
        let pointBR = this.svgElement.createSVGPoint();
        pointTL.x = nodeBox.x;
        pointTL.y = nodeBox.y;
        pointBR.x = nodeBox.x + nodeBox.width;
        pointBR.y = nodeBox.y + nodeBox.height;
        pointTL = pointTL.matrixTransform(nodeCtm);
        pointBR = pointBR.matrixTransform(nodeCtm);
        return {
            topLeft: pointTL,
            bottomRight: pointBR
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphZoomDirective, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: NzGraphZoomDirective, isStandalone: true, selector: "[nz-graph-zoom]", inputs: { nzZoom: ["nzZoom", "nzZoom", numberAttributeWithOneFallback], nzMinZoom: "nzMinZoom", nzMaxZoom: "nzMaxZoom" }, outputs: { nzTransformEvent: "nzTransformEvent", nzZoomChange: "nzZoomChange" }, exportAs: ["nzGraphZoom"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphZoomDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-graph-zoom]',
                    exportAs: 'nzGraphZoom'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { nzZoom: [{
                type: Input,
                args: [{ transform: numberAttributeWithOneFallback }]
            }], nzMinZoom: [{
                type: Input
            }], nzMaxZoom: [{
                type: Input
            }], nzTransformEvent: [{
                type: Output
            }], nzZoomChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/** Checks whether an object is a data source. */
function isDataSource(value) {
    // Check if the value is a DataSource by observing if it has a connect function. Cannot
    // be checked as an `instanceof DataSource` since people could create their own sources
    // that match the interface, but don't extend DataSource.
    return value && typeof value.connect === 'function';
}
class NzGraphComponent {
    cdr;
    elementRef;
    listOfNodeElement;
    listOfNodeComponent;
    nodeTemplate;
    groupNodeTemplate;
    customGraphEdgeTemplate;
    /**
     * Provides a stream containing the latest data array to render.
     * Data source can be an observable of NzGraphData, or a NzGraphData to render.
     */
    nzGraphData;
    nzRankDirection = 'LR';
    nzGraphLayoutConfig;
    nzAutoSize = false;
    nzGraphInitialized = new EventEmitter();
    nzGraphRendered = new EventEmitter();
    nzNodeClick = new EventEmitter();
    requestId = -1;
    transformStyle = '';
    graphRenderedSubject$ = new ReplaySubject(1);
    renderInfo = { labelHeight: 0 };
    mapOfNodeAttr = {};
    mapOfEdgeAttr = {};
    zoom = 1;
    typedNodes = nzTypeDefinition();
    dataSource;
    layoutSetting = NZ_GRAPH_LAYOUT_SETTING;
    /** Data subscription */
    _dataSubscription;
    destroy$ = new Subject();
    edgeTrackByFun = (edge) => `${edge.v}-${edge.w}`;
    subGraphTransform = (node) => {
        const x = node.x - node.coreBox.width / 2.0;
        const y = node.y - node.height / 2.0 + node.paddingTop;
        return `translate(${x}, ${y})`;
    };
    $asNzGraphEdges = (data) => data;
    coreTransform = (node) => `translate(0, ${node.parentNodeName ? node.labelHeight : 0})`;
    noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
    nzGraphZoom = inject(NzGraphZoomDirective, { optional: true });
    constructor(cdr, elementRef) {
        this.cdr = cdr;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.graphRenderedSubject$.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            // Only zooming is not set, move graph to center
            if (!this.nzGraphZoom) {
                this.fitCenter();
            }
            this.nzGraphInitialized.emit(this);
        });
    }
    ngOnChanges(changes) {
        const { nzAutoFit, nzRankDirection, nzGraphData, nzGraphLayoutConfig } = changes;
        if (nzGraphLayoutConfig) {
            this.layoutSetting = this.mergeConfig(nzGraphLayoutConfig.currentValue);
        }
        if (nzGraphData) {
            if (this.dataSource !== this.nzGraphData) {
                this._switchDataSource(this.nzGraphData);
            }
        }
        if ((nzAutoFit && !nzAutoFit.firstChange) || (nzRankDirection && !nzRankDirection.firstChange)) {
            // Render graph
            if (this.dataSource.dataSource) {
                this.drawGraph(this.dataSource.dataSource, {
                    rankDirection: this.nzRankDirection,
                    expanded: this.dataSource.expansionModel.selected || []
                }).then(() => {
                    this.cdr.markForCheck();
                });
            }
        }
        this.cdr.markForCheck();
    }
    ngAfterContentChecked() {
        if (this.dataSource && !this._dataSubscription) {
            this.observeRenderChanges();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
            this.dataSource.disconnect();
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        cancelRequestAnimationFrame(this.requestId);
    }
    /**
     * Move graph to center and scale automatically
     */
    fitCenter() {
        const { x, y, k } = calculateTransform(this.elementRef.nativeElement.querySelector('svg'), this.elementRef.nativeElement.querySelector('svg > g'));
        if (k) {
            this.zoom = k;
            this.transformStyle = `translate(${x}, ${y})scale(${k})`;
        }
        this.cdr.markForCheck();
    }
    /**
     * re-Draw graph
     *
     * @param data
     * @param options
     * @param needResize
     */
    drawGraph(data, options, needResize = false) {
        return new Promise(resolve => {
            this.requestId = requestAnimationFrame(() => {
                const renderInfo = this.buildGraphInfo(data, options);
                // TODO
                // Need better performance
                this.renderInfo = renderInfo;
                this.cdr.markForCheck();
                this.requestId = requestAnimationFrame(() => {
                    this.drawNodes(!this.noAnimation?.nzNoAnimation).then(() => {
                        // Update element
                        this.cdr.markForCheck();
                        if (needResize) {
                            this.resizeNodeSize().then(() => {
                                const dataSource = this.dataSource.dataSource;
                                this.drawGraph(dataSource, options, false).then(() => resolve());
                            });
                        }
                        else {
                            this.graphRenderedSubject$.next();
                            this.nzGraphRendered.emit(this);
                            resolve();
                        }
                    });
                });
            });
            this.cdr.markForCheck();
        });
    }
    /**
     * Redraw all nodes
     *
     * @param animate
     */
    drawNodes(animate = true) {
        return new Promise(resolve => {
            if (animate) {
                this.makeNodesAnimation().subscribe(() => {
                    resolve();
                });
            }
            else {
                this.listOfNodeComponent.map(node => {
                    node.makeNoAnimation();
                });
                resolve();
            }
        });
    }
    resizeNodeSize() {
        return new Promise(resolve => {
            const dataSource = this.dataSource.dataSource;
            let scale = this.nzGraphZoom?.nzZoom || this.zoom || 1;
            this.listOfNodeElement.forEach(nodeEle => {
                const contentEle = nodeEle.nativeElement;
                if (contentEle) {
                    let width;
                    let height;
                    // Check if foreignObject is set
                    const clientRect = contentEle.querySelector('foreignObject > :first-child')?.getBoundingClientRect();
                    if (clientRect) {
                        width = clientRect.width;
                        height = clientRect.height;
                    }
                    else {
                        const bBoxRect = contentEle.getBBox();
                        width = bBoxRect.width;
                        height = bBoxRect.height;
                        // getBBox will return actual value
                        scale = 1;
                    }
                    // Element id type is string
                    const node = dataSource.nodes.find(n => `${n.id}` === nodeEle.nativeElement.id);
                    if (node && width && height) {
                        node.height = height / scale;
                        node.width = width / scale;
                    }
                }
            });
            resolve();
        });
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    _switchDataSource(dataSource) {
        if (this.dataSource && typeof this.dataSource.disconnect === 'function') {
            this.nzGraphData.disconnect();
        }
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
        this.dataSource = dataSource;
        this.observeRenderChanges();
    }
    /** Set up a subscription for the data provided by the data source. */
    observeRenderChanges() {
        let dataStream;
        let graphOptions = {
            rankDirection: this.nzRankDirection
        };
        if (isDataSource(this.dataSource)) {
            dataStream = this.dataSource.connect();
        }
        if (dataStream) {
            this._dataSubscription = dataStream.pipe(takeUntil(this.destroy$)).subscribe(data => {
                graphOptions = {
                    rankDirection: this.nzRankDirection,
                    expanded: this.nzGraphData.expansionModel.selected
                };
                this.drawGraph(data, graphOptions, this.nzAutoSize).then(() => {
                    this.cdr.detectChanges();
                });
            });
        }
        else {
            throw Error(`A valid data source must be provided.`);
        }
    }
    /**
     * Get renderInfo and prepare some data
     *
     * @param data
     * @param options
     * @private
     */
    buildGraphInfo(data, options) {
        this.parseInfo(data);
        const renderInfo = buildGraph(data, options, this.layoutSetting);
        const dig = (nodes) => {
            nodes.forEach(node => {
                const { x, y } = node;
                node.xOffset = x;
                node.yOffset = y;
                if (node.type === 1 && this.mapOfNodeAttr.hasOwnProperty(node.name)) {
                    Object.assign(node, this.mapOfNodeAttr[node.name]);
                }
                else if (node.type === 0) {
                    node.edges.forEach(edge => {
                        if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
                            Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
                        }
                    });
                    dig(node.nodes);
                }
            });
        };
        dig(renderInfo.nodes);
        // Assign data to edges of root graph
        renderInfo.edges.forEach(edge => {
            if (this.mapOfEdgeAttr.hasOwnProperty(`${edge.v}-${edge.w}`)) {
                Object.assign(edge, this.mapOfEdgeAttr[`${edge.v}-${edge.w}`]);
            }
        });
        return renderInfo;
    }
    /**
     * Play with animation
     *
     * @private
     */
    makeNodesAnimation() {
        return forkJoin(this.listOfNodeComponent.map(node => node.makeAnimation())).pipe(finalize(() => {
            this.cdr.detectChanges();
        }));
    }
    parseInfo(data) {
        data.nodes.forEach(n => {
            this.mapOfNodeAttr[n.id] = n;
        });
        data.edges.forEach(e => {
            this.mapOfEdgeAttr[`${e.v}-${e.w}`] = e;
        });
    }
    /**
     * Merge config with user inputs
     *
     * @param config
     * @private
     */
    mergeConfig(config) {
        const graphMeta = config?.layout || {};
        const subSceneMeta = config?.subScene || {};
        const defaultNodeMeta = config?.defaultNode || {};
        const defaultCompoundNodeMeta = config?.defaultCompoundNode || {};
        const bridge = NZ_GRAPH_LAYOUT_SETTING.nodeSize.bridge;
        const graph = { meta: { ...NZ_GRAPH_LAYOUT_SETTING.graph.meta, ...graphMeta } };
        const subScene = {
            meta: { ...NZ_GRAPH_LAYOUT_SETTING.subScene.meta, ...subSceneMeta }
        };
        const nodeSize = {
            meta: { ...NZ_GRAPH_LAYOUT_SETTING.nodeSize.meta, ...defaultCompoundNodeMeta },
            node: { ...NZ_GRAPH_LAYOUT_SETTING.nodeSize.node, ...defaultNodeMeta },
            bridge
        };
        return { graph, subScene, nodeSize };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzGraphComponent, isStandalone: true, selector: "nz-graph", inputs: { nzGraphData: "nzGraphData", nzRankDirection: "nzRankDirection", nzGraphLayoutConfig: "nzGraphLayoutConfig", nzAutoSize: ["nzAutoSize", "nzAutoSize", booleanAttribute] }, outputs: { nzGraphInitialized: "nzGraphInitialized", nzGraphRendered: "nzGraphRendered", nzNodeClick: "nzNodeClick" }, host: { properties: { "class.nz-graph": "true", "class.nz-graph-auto-size": "nzAutoSize" } }, providers: [{ provide: NzGraph, useExisting: forwardRef(() => NzGraphComponent) }], queries: [{ propertyName: "nodeTemplate", first: true, predicate: NzGraphNodeDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "groupNodeTemplate", first: true, predicate: NzGraphGroupNodeDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "customGraphEdgeTemplate", first: true, predicate: NzGraphEdgeDirective, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "listOfNodeElement", predicate: NzGraphNodeComponent, descendants: true, read: ElementRef }, { propertyName: "listOfNodeComponent", predicate: NzGraphNodeComponent, descendants: true }], exportAs: ["nzGraph"], usesOnChanges: true, ngImport: i0, template: `
    <ng-content></ng-content>
    <svg width="100%" height="100%">
      <svg:defs nz-graph-defs></svg:defs>
      <svg:g [attr.transform]="transformStyle">
        <ng-container
          [ngTemplateOutlet]="groupTemplate"
          [ngTemplateOutletContext]="{ renderNode: renderInfo, type: 'root' }"
        ></ng-container>
      </svg:g>
    </svg>

    <ng-template #groupTemplate let-renderNode="renderNode" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderNode) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderNode)">
          <svg:g class="nz-graph-edges">
            @for (edge of $asNzGraphEdges(renderNode.edges); track edgeTrackByFun(edge)) {
              <g
                class="nz-graph-edge"
                nz-graph-edge
                [edge]="edge"
                [edgeType]="nzGraphLayoutConfig?.defaultEdge?.type"
                [customTemplate]="customGraphEdgeTemplate"
              ></g>
            }
          </svg:g>

          <svg:g class="nz-graph-nodes">
            @for (node of typedNodes(renderNode.nodes); track node.name) {
              @if (node.type === 1) {
                <g class="nz-graph-node" nz-graph-node [node]="node" [customTemplate]="nodeTemplate"></g>
              }

              @if (node.type === 0) {
                <g class="nz-graph-node" nz-graph-node [node]="node" [customTemplate]="groupNodeTemplate"></g>
              }

              @if (node.expanded) {
                <ng-container
                  [ngTemplateOutlet]="groupTemplate"
                  [ngTemplateOutletContext]="{ renderNode: node, type: 'sub' }"
                />
              }
            }
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzGraphEdgeComponent, selector: "[nz-graph-edge]", inputs: ["edge", "edgeType", "customTemplate"] }, { kind: "component", type: NzGraphNodeComponent, selector: "[nz-graph-node]", inputs: ["node", "noAnimation", "customTemplate"] }, { kind: "component", type: NzGraphDefsComponent, selector: "svg:defs[nz-graph-defs]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-graph',
                    exportAs: 'nzGraph',
                    providers: [{ provide: NzGraph, useExisting: forwardRef(() => NzGraphComponent) }],
                    template: `
    <ng-content></ng-content>
    <svg width="100%" height="100%">
      <svg:defs nz-graph-defs></svg:defs>
      <svg:g [attr.transform]="transformStyle">
        <ng-container
          [ngTemplateOutlet]="groupTemplate"
          [ngTemplateOutletContext]="{ renderNode: renderInfo, type: 'root' }"
        ></ng-container>
      </svg:g>
    </svg>

    <ng-template #groupTemplate let-renderNode="renderNode" let-type="type">
      <svg:g [attr.transform]="type === 'sub' ? subGraphTransform(renderNode) : null">
        <svg:g class="core" [attr.transform]="coreTransform(renderNode)">
          <svg:g class="nz-graph-edges">
            @for (edge of $asNzGraphEdges(renderNode.edges); track edgeTrackByFun(edge)) {
              <g
                class="nz-graph-edge"
                nz-graph-edge
                [edge]="edge"
                [edgeType]="nzGraphLayoutConfig?.defaultEdge?.type"
                [customTemplate]="customGraphEdgeTemplate"
              ></g>
            }
          </svg:g>

          <svg:g class="nz-graph-nodes">
            @for (node of typedNodes(renderNode.nodes); track node.name) {
              @if (node.type === 1) {
                <g class="nz-graph-node" nz-graph-node [node]="node" [customTemplate]="nodeTemplate"></g>
              }

              @if (node.type === 0) {
                <g class="nz-graph-node" nz-graph-node [node]="node" [customTemplate]="groupNodeTemplate"></g>
              }

              @if (node.expanded) {
                <ng-container
                  [ngTemplateOutlet]="groupTemplate"
                  [ngTemplateOutletContext]="{ renderNode: node, type: 'sub' }"
                />
              }
            }
          </svg:g>
        </svg:g>
      </svg:g>
    </ng-template>
  `,
                    host: {
                        '[class.nz-graph]': 'true',
                        '[class.nz-graph-auto-size]': 'nzAutoSize'
                    },
                    imports: [NgTemplateOutlet, NzGraphEdgeComponent, NzGraphNodeComponent, NzGraphDefsComponent]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { listOfNodeElement: [{
                type: ViewChildren,
                args: [NzGraphNodeComponent, { read: ElementRef }]
            }], listOfNodeComponent: [{
                type: ViewChildren,
                args: [NzGraphNodeComponent]
            }], nodeTemplate: [{
                type: ContentChild,
                args: [NzGraphNodeDirective, { static: true, read: TemplateRef }]
            }], groupNodeTemplate: [{
                type: ContentChild,
                args: [NzGraphGroupNodeDirective, { static: true, read: TemplateRef }]
            }], customGraphEdgeTemplate: [{
                type: ContentChild,
                args: [NzGraphEdgeDirective, { static: true, read: TemplateRef }]
            }], nzGraphData: [{
                type: Input
            }], nzRankDirection: [{
                type: Input
            }], nzGraphLayoutConfig: [{
                type: Input
            }], nzAutoSize: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzGraphInitialized: [{
                type: Output
            }], nzGraphRendered: [{
                type: Output
            }], nzNodeClick: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGraphModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzGraphModule, imports: [NzGraphComponent,
            NzGraphMinimapComponent,
            NzGraphDefsComponent,
            NzGraphNodeDirective,
            NzGraphGroupNodeDirective,
            NzGraphZoomDirective,
            NzGraphNodeComponent,
            NzGraphEdgeComponent,
            NzGraphEdgeDirective], exports: [NzGraphComponent,
            NzGraphMinimapComponent,
            NzGraphDefsComponent,
            NzGraphNodeDirective,
            NzGraphGroupNodeDirective,
            NzGraphZoomDirective,
            NzGraphNodeComponent,
            NzGraphEdgeComponent,
            NzGraphEdgeDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGraphModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NzGraphComponent,
                        NzGraphMinimapComponent,
                        NzGraphDefsComponent,
                        NzGraphNodeDirective,
                        NzGraphGroupNodeDirective,
                        NzGraphZoomDirective,
                        NzGraphNodeComponent,
                        NzGraphEdgeComponent,
                        NzGraphEdgeDirective
                    ],
                    exports: [
                        NzGraphComponent,
                        NzGraphMinimapComponent,
                        NzGraphDefsComponent,
                        NzGraphNodeDirective,
                        NzGraphGroupNodeDirective,
                        NzGraphZoomDirective,
                        NzGraphNodeComponent,
                        NzGraphEdgeComponent,
                        NzGraphEdgeDirective
                    ]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_GRAPH_LAYOUT_SETTING, NzGraphComponent, NzGraphData, NzGraphDefsComponent, NzGraphEdgeComponent, NzGraphEdgeDirective, NzGraphEdgeType, NzGraphGroupNodeDirective, NzGraphMinimapComponent, NzGraphModule, NzGraphNodeComponent, NzGraphNodeDirective, NzGraphZoomDirective, isDataSource, nzTypeDefinition };
//# sourceMappingURL=ng-zorro-antd-graph.mjs.map
