import * as i0 from '@angular/core';
import { inject, Injectable, EventEmitter, booleanAttribute, numberAttribute, Output, Input, Directive, HostListener, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import * as i3 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { isTouchEvent, ensureInBounds, fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { DOCUMENT } from '@angular/common';
import { Subject, merge } from 'rxjs';
import * as i2 from '@angular/cdk/platform';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getEventWithPoint(event) {
    return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizableService {
    ngZone;
    document = inject(DOCUMENT);
    listeners = new Map();
    /**
     * The `OutsideAngular` prefix means that the subject will emit events outside of the Angular zone,
     * so that becomes a bit more descriptive for those who'll maintain the code in the future:
     * ```ts
     * nzResizableService.handleMouseDownOutsideAngular$.subscribe(event => {
     *   console.log(Zone.current); // <root>
     *   console.log(NgZone.isInAngularZone()); // false
     * });
     * ```
     */
    handleMouseDownOutsideAngular$ = new Subject();
    documentMouseUpOutsideAngular$ = new Subject();
    documentMouseMoveOutsideAngular$ = new Subject();
    mouseEnteredOutsideAngular$ = new Subject();
    constructor(ngZone) {
        this.ngZone = ngZone;
    }
    startResizing(event) {
        const _isTouchEvent = isTouchEvent(event);
        this.clearListeners();
        const moveEvent = _isTouchEvent ? 'touchmove' : 'mousemove';
        const upEvent = _isTouchEvent ? 'touchend' : 'mouseup';
        const moveEventHandler = (e) => {
            this.documentMouseMoveOutsideAngular$.next(e);
        };
        const upEventHandler = (e) => {
            this.documentMouseUpOutsideAngular$.next(e);
            this.clearListeners();
        };
        this.listeners.set(moveEvent, moveEventHandler);
        this.listeners.set(upEvent, upEventHandler);
        this.ngZone.runOutsideAngular(() => {
            this.listeners.forEach((handler, name) => {
                this.document.addEventListener(name, handler);
            });
        });
    }
    clearListeners() {
        this.listeners.forEach((handler, name) => {
            this.document.removeEventListener(name, handler);
        });
        this.listeners.clear();
    }
    ngOnDestroy() {
        this.handleMouseDownOutsideAngular$.complete();
        this.documentMouseUpOutsideAngular$.complete();
        this.documentMouseMoveOutsideAngular$.complete();
        this.mouseEnteredOutsideAngular$.complete();
        this.clearListeners();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.NgZone }] });

class NzResizableDirective {
    elementRef;
    renderer;
    nzResizableService;
    platform;
    ngZone;
    destroy$;
    nzBounds = 'parent';
    nzMaxHeight;
    nzMaxWidth;
    nzMinHeight = 40;
    nzMinWidth = 40;
    nzGridColumnCount = -1;
    nzMaxColumn = -1;
    nzMinColumn = -1;
    nzLockAspectRatio = false;
    nzPreview = false;
    nzDisabled = false;
    nzResize = new EventEmitter();
    nzResizeEnd = new EventEmitter();
    nzResizeStart = new EventEmitter();
    resizing = false;
    elRect;
    currentHandleEvent = null;
    ghostElement = null;
    el;
    sizeCache = null;
    constructor(elementRef, renderer, nzResizableService, platform, ngZone, destroy$) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.nzResizableService = nzResizableService;
        this.platform = platform;
        this.ngZone = ngZone;
        this.destroy$ = destroy$;
        this.nzResizableService.handleMouseDownOutsideAngular$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.nzDisabled) {
                return;
            }
            this.resizing = true;
            this.nzResizableService.startResizing(event.mouseEvent);
            this.currentHandleEvent = event;
            if (this.nzResizeStart.observers.length) {
                this.ngZone.run(() => this.nzResizeStart.emit({ mouseEvent: event.mouseEvent, direction: event.direction }));
            }
            this.elRect = this.el.getBoundingClientRect();
        });
        this.nzResizableService.documentMouseUpOutsideAngular$
            .pipe(takeUntil(this.destroy$), filter(Boolean))
            .subscribe(event => {
            if (this.resizing) {
                this.resizing = false;
                this.nzResizableService.documentMouseUpOutsideAngular$.next(null);
                this.endResize(event);
            }
        });
        this.nzResizableService.documentMouseMoveOutsideAngular$.pipe(takeUntil(this.destroy$)).subscribe(event => {
            if (this.resizing) {
                this.resize(event);
            }
        });
    }
    setPosition() {
        const position = getComputedStyle(this.el).position;
        if (position === 'static' || !position) {
            this.renderer.setStyle(this.el, 'position', 'relative');
        }
    }
    calcSize(width, height, ratio) {
        let newWidth;
        let newHeight;
        let maxWidth;
        let maxHeight;
        let col = 0;
        let spanWidth = 0;
        let minWidth = this.nzMinWidth;
        let boundWidth = Infinity;
        let boundHeight = Infinity;
        if (this.nzBounds === 'parent') {
            const parent = this.renderer.parentNode(this.el);
            if (parent instanceof HTMLElement) {
                const parentRect = parent.getBoundingClientRect();
                boundWidth = parentRect.width;
                boundHeight = parentRect.height;
            }
        }
        else if (this.nzBounds === 'window') {
            if (typeof window !== 'undefined') {
                boundWidth = window.innerWidth;
                boundHeight = window.innerHeight;
            }
        }
        else if (this.nzBounds && this.nzBounds.nativeElement && this.nzBounds.nativeElement instanceof HTMLElement) {
            const boundsRect = this.nzBounds.nativeElement.getBoundingClientRect();
            boundWidth = boundsRect.width;
            boundHeight = boundsRect.height;
        }
        maxWidth = ensureInBounds(this.nzMaxWidth, boundWidth);
        // eslint-disable-next-line prefer-const
        maxHeight = ensureInBounds(this.nzMaxHeight, boundHeight);
        if (this.nzGridColumnCount !== -1) {
            spanWidth = maxWidth / this.nzGridColumnCount;
            minWidth = this.nzMinColumn !== -1 ? spanWidth * this.nzMinColumn : minWidth;
            maxWidth = this.nzMaxColumn !== -1 ? spanWidth * this.nzMaxColumn : maxWidth;
        }
        if (ratio !== -1) {
            if (/(left|right)/i.test(this.currentHandleEvent.direction)) {
                newWidth = Math.min(Math.max(width, minWidth), maxWidth);
                newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                if (newHeight >= maxHeight || newHeight <= this.nzMinHeight) {
                    newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                }
            }
            else {
                newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
                newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
                if (newWidth >= maxWidth || newWidth <= minWidth) {
                    newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
                }
            }
        }
        else {
            newWidth = Math.min(Math.max(width, minWidth), maxWidth);
            newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
        }
        if (this.nzGridColumnCount !== -1) {
            col = Math.round(newWidth / spanWidth);
            newWidth = col * spanWidth;
        }
        return {
            col,
            width: newWidth,
            height: newHeight
        };
    }
    resize(event) {
        const elRect = this.elRect;
        const resizeEvent = getEventWithPoint(event);
        const handleEvent = getEventWithPoint(this.currentHandleEvent.mouseEvent);
        let width = elRect.width;
        let height = elRect.height;
        const ratio = this.nzLockAspectRatio ? width / height : -1;
        switch (this.currentHandleEvent.direction) {
            case 'bottomRight':
                width = resizeEvent.clientX - elRect.left;
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'bottomLeft':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'topRight':
                width = resizeEvent.clientX - elRect.left;
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'topLeft':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'top':
                height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
                break;
            case 'right':
                width = resizeEvent.clientX - elRect.left;
                break;
            case 'bottom':
                height = resizeEvent.clientY - elRect.top;
                break;
            case 'left':
                width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        }
        const size = this.calcSize(width, height, ratio);
        this.sizeCache = { ...size };
        // Re-enter the Angular zone and run the change detection only if there're any `nzResize` listeners,
        // e.g.: `<div nz-resizable (nzResize)="..."></div>`.
        if (this.nzResize.observers.length) {
            this.ngZone.run(() => {
                this.nzResize.emit({
                    ...size,
                    mouseEvent: event,
                    direction: this.currentHandleEvent.direction
                });
            });
        }
        if (this.nzPreview) {
            this.previewResize(size);
        }
    }
    endResize(event) {
        this.removeGhostElement();
        const size = this.sizeCache
            ? { ...this.sizeCache }
            : {
                width: this.elRect.width,
                height: this.elRect.height
            };
        // Re-enter the Angular zone and run the change detection only if there're any `nzResizeEnd` listeners,
        // e.g.: `<div nz-resizable (nzResizeEnd)="..."></div>`.
        if (this.nzResizeEnd.observers.length) {
            this.ngZone.run(() => {
                this.nzResizeEnd.emit({
                    ...size,
                    mouseEvent: event,
                    direction: this.currentHandleEvent.direction
                });
            });
        }
        this.sizeCache = null;
        this.currentHandleEvent = null;
    }
    previewResize({ width, height }) {
        this.createGhostElement();
        this.renderer.setStyle(this.ghostElement, 'width', `${width}px`);
        this.renderer.setStyle(this.ghostElement, 'height', `${height}px`);
    }
    createGhostElement() {
        if (!this.ghostElement) {
            this.ghostElement = this.renderer.createElement('div');
            this.renderer.setAttribute(this.ghostElement, 'class', 'nz-resizable-preview');
        }
        this.renderer.appendChild(this.el, this.ghostElement);
    }
    removeGhostElement() {
        if (this.ghostElement) {
            this.renderer.removeChild(this.el, this.ghostElement);
        }
    }
    ngAfterViewInit() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.el = this.elementRef.nativeElement;
        this.setPosition();
        fromEventOutsideAngular(this.el, 'mouseenter')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.nzResizableService.mouseEnteredOutsideAngular$.next(true);
        });
        fromEventOutsideAngular(this.el, 'mouseleave')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.nzResizableService.mouseEnteredOutsideAngular$.next(false);
        });
    }
    ngOnDestroy() {
        this.ghostElement = null;
        this.sizeCache = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NzResizableService }, { token: i2.Platform }, { token: i0.NgZone }, { token: i3.NzDestroyService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: NzResizableDirective, isStandalone: true, selector: "[nz-resizable]", inputs: { nzBounds: "nzBounds", nzMaxHeight: "nzMaxHeight", nzMaxWidth: "nzMaxWidth", nzMinHeight: ["nzMinHeight", "nzMinHeight", numberAttribute], nzMinWidth: ["nzMinWidth", "nzMinWidth", numberAttribute], nzGridColumnCount: ["nzGridColumnCount", "nzGridColumnCount", numberAttribute], nzMaxColumn: ["nzMaxColumn", "nzMaxColumn", numberAttribute], nzMinColumn: ["nzMinColumn", "nzMinColumn", numberAttribute], nzLockAspectRatio: ["nzLockAspectRatio", "nzLockAspectRatio", booleanAttribute], nzPreview: ["nzPreview", "nzPreview", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute] }, outputs: { nzResize: "nzResize", nzResizeEnd: "nzResizeEnd", nzResizeStart: "nzResizeStart" }, host: { properties: { "class.nz-resizable-resizing": "resizing", "class.nz-resizable-disabled": "nzDisabled" }, classAttribute: "nz-resizable" }, providers: [NzResizableService, NzDestroyService], exportAs: ["nzResizable"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-resizable]',
                    exportAs: 'nzResizable',
                    providers: [NzResizableService, NzDestroyService],
                    host: {
                        class: 'nz-resizable',
                        '[class.nz-resizable-resizing]': 'resizing',
                        '[class.nz-resizable-disabled]': 'nzDisabled'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NzResizableService }, { type: i2.Platform }, { type: i0.NgZone }, { type: i3.NzDestroyService }], propDecorators: { nzBounds: [{
                type: Input
            }], nzMaxHeight: [{
                type: Input
            }], nzMaxWidth: [{
                type: Input
            }], nzMinHeight: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzMinWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzGridColumnCount: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzMaxColumn: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzMinColumn: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzLockAspectRatio: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzPreview: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzResize: [{
                type: Output
            }], nzResizeEnd: [{
                type: Output
            }], nzResizeStart: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizeHandleMouseDownEvent {
    direction;
    mouseEvent;
    constructor(direction, mouseEvent) {
        this.direction = direction;
        this.mouseEvent = mouseEvent;
    }
}
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
class NzResizeHandleComponent {
    nzResizableService;
    renderer;
    host;
    destroy$;
    nzDirection = 'bottomRight';
    nzCursorType = 'window';
    nzMouseDown = new EventEmitter();
    constructor(nzResizableService, renderer, host, destroy$) {
        this.nzResizableService = nzResizableService;
        this.renderer = renderer;
        this.host = host;
        this.destroy$ = destroy$;
    }
    ngOnInit() {
        this.nzResizableService.mouseEnteredOutsideAngular$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
            if (entered) {
                this.renderer.addClass(this.host.nativeElement, 'nz-resizable-handle-box-hover');
            }
            else {
                this.renderer.removeClass(this.host.nativeElement, 'nz-resizable-handle-box-hover');
            }
        });
        // Note: since Chrome 56 defaults document level `touchstart` listener to passive.
        // The element `touchstart` listener is not passive by default
        // We never call `preventDefault()` on it, so we're safe making it passive too.
        merge(fromEventOutsideAngular(this.host.nativeElement, 'mousedown', passiveEventListenerOptions), fromEventOutsideAngular(this.host.nativeElement, 'touchstart', passiveEventListenerOptions))
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            this.nzResizableService.handleMouseDownOutsideAngular$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, event));
        });
    }
    onPointerDown(event) {
        event.target.setPointerCapture(event.pointerId);
    }
    onPointerUp(event) {
        event.target.releasePointerCapture(event.pointerId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeHandleComponent, deps: [{ token: NzResizableService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i3.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzResizeHandleComponent, isStandalone: true, selector: "nz-resize-handle, [nz-resize-handle]", inputs: { nzDirection: "nzDirection", nzCursorType: "nzCursorType" }, outputs: { nzMouseDown: "nzMouseDown" }, host: { listeners: { "pointerdown": "onPointerDown($event)", "pointerup": "onPointerUp($event)" }, properties: { "class.nz-resizable-handle-top": "nzDirection === 'top'", "class.nz-resizable-handle-right": "nzDirection === 'right'", "class.nz-resizable-handle-bottom": "nzDirection === 'bottom'", "class.nz-resizable-handle-left": "nzDirection === 'left'", "class.nz-resizable-handle-topRight": "nzDirection === 'topRight'", "class.nz-resizable-handle-bottomRight": "nzDirection === 'bottomRight'", "class.nz-resizable-handle-bottomLeft": "nzDirection === 'bottomLeft'", "class.nz-resizable-handle-topLeft": "nzDirection === 'topLeft'", "class.nz-resizable-handle-cursor-type-grid": "nzCursorType === 'grid'", "class.nz-resizable-handle-cursor-type-window": "nzCursorType === 'window'" }, classAttribute: "nz-resizable-handle" }, providers: [NzDestroyService], exportAs: ["nzResizeHandle"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeHandleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-resize-handle, [nz-resize-handle]',
                    exportAs: 'nzResizeHandle',
                    template: ` <ng-content></ng-content> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'nz-resizable-handle',
                        '[class.nz-resizable-handle-top]': `nzDirection === 'top'`,
                        '[class.nz-resizable-handle-right]': `nzDirection === 'right'`,
                        '[class.nz-resizable-handle-bottom]': `nzDirection === 'bottom'`,
                        '[class.nz-resizable-handle-left]': `nzDirection === 'left'`,
                        '[class.nz-resizable-handle-topRight]': `nzDirection === 'topRight'`,
                        '[class.nz-resizable-handle-bottomRight]': `nzDirection === 'bottomRight'`,
                        '[class.nz-resizable-handle-bottomLeft]': `nzDirection === 'bottomLeft'`,
                        '[class.nz-resizable-handle-topLeft]': `nzDirection === 'topLeft'`,
                        '[class.nz-resizable-handle-cursor-type-grid]': `nzCursorType === 'grid'`,
                        '[class.nz-resizable-handle-cursor-type-window]': `nzCursorType === 'window'`
                    },
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: () => [{ type: NzResizableService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i3.NzDestroyService }], propDecorators: { nzDirection: [{
                type: Input
            }], nzCursorType: [{
                type: Input
            }], nzMouseDown: [{
                type: Output
            }], onPointerDown: [{
                type: HostListener,
                args: ['pointerdown', ['$event']]
            }], onPointerUp: [{
                type: HostListener,
                args: ['pointerup', ['$event']]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const DEFAULT_RESIZE_DIRECTION = [
    'bottomRight',
    'topRight',
    'bottomLeft',
    'topLeft',
    'bottom',
    'right',
    'top',
    'left'
];
function normalizeResizeHandleOptions(value) {
    return value.map(val => {
        if (typeof val === 'string') {
            return {
                direction: val,
                cursorType: 'window'
            };
        }
        return val;
    });
}
class NzResizeHandlesComponent {
    nzDirections = DEFAULT_RESIZE_DIRECTION;
    resizeHandleOptions = normalizeResizeHandleOptions(this.nzDirections);
    ngOnChanges(changes) {
        if (changes.nzDirections) {
            this.resizeHandleOptions = normalizeResizeHandleOptions(changes.nzDirections.currentValue);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeHandlesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzResizeHandlesComponent, isStandalone: true, selector: "nz-resize-handles", inputs: { nzDirections: "nzDirections" }, exportAs: ["nzResizeHandles"], usesOnChanges: true, ngImport: i0, template: `
    @for (option of resizeHandleOptions; track option) {
      <nz-resize-handle [nzDirection]="option.direction" [nzCursorType]="option.cursorType" />
    }
  `, isInline: true, dependencies: [{ kind: "component", type: NzResizeHandleComponent, selector: "nz-resize-handle, [nz-resize-handle]", inputs: ["nzDirection", "nzCursorType"], outputs: ["nzMouseDown"], exportAs: ["nzResizeHandle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeHandlesComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-resize-handles',
                    exportAs: 'nzResizeHandles',
                    template: `
    @for (option of resizeHandleOptions; track option) {
      <nz-resize-handle [nzDirection]="option.direction" [nzCursorType]="option.cursorType" />
    }
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NzResizeHandleComponent]
                }]
        }], propDecorators: { nzDirections: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzResizableModule, imports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent], exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
                    exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_RESIZE_DIRECTION, NzResizableDirective, NzResizableModule, NzResizableService, NzResizeHandleComponent, NzResizeHandleMouseDownEvent, NzResizeHandlesComponent, getEventWithPoint };
//# sourceMappingURL=ng-zorro-antd-resizable.mjs.map
