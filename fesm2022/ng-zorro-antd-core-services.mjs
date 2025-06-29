import * as i0 from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { auditTime, finalize, map, filter, takeUntil, startWith, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'ng-zorro-antd/core/environments';
import { getEventPosition, isTouchEvent } from 'ng-zorro-antd/core/util';
import { DOCUMENT } from '@angular/common';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import * as i2 from '@angular/cdk/layout';
import * as i1 from '@angular/cdk/platform';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NOOP = () => { };
class NzResizeService {
    ngZone;
    rendererFactory2;
    resizeSource$ = new Subject();
    listeners = 0;
    renderer;
    disposeHandle = NOOP;
    handler = () => {
        this.ngZone.run(() => {
            this.resizeSource$.next();
        });
    };
    constructor(ngZone, rendererFactory2) {
        this.ngZone = ngZone;
        this.rendererFactory2 = rendererFactory2;
        this.renderer = this.rendererFactory2.createRenderer(null, null);
    }
    ngOnDestroy() {
        // Caretaker note: the `handler` is an instance property (it's not defined on the class prototype).
        // The `handler` captures `this` and prevents the `NzResizeService` from being GC'd.
        this.handler = NOOP;
    }
    subscribe() {
        this.registerListener();
        return this.resizeSource$.pipe(auditTime(16), finalize(() => this.unregisterListener()));
    }
    unsubscribe() {
        this.unregisterListener();
    }
    registerListener() {
        if (this.listeners === 0) {
            this.ngZone.runOutsideAngular(() => {
                this.disposeHandle = this.renderer.listen('window', 'resize', this.handler);
            });
        }
        this.listeners += 1;
    }
    unregisterListener() {
        this.listeners -= 1;
        if (this.listeners === 0) {
            this.disposeHandle();
            this.disposeHandle = NOOP;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeService, deps: [{ token: i0.NgZone }, { token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.RendererFactory2 }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * When running in test, singletons should not be destroyed. So we keep references of singletons
 * in this global variable.
 */
const testSingleRegistry = new Map();
/**
 * Some singletons should have life cycle that is same to Angular's. This service make sure that
 * those singletons get destroyed in HMR.
 */
class NzSingletonService {
    get singletonRegistry() {
        return environment.isTestMode ? testSingleRegistry : this._singletonRegistry;
    }
    /**
     * This registry is used to register singleton in dev mode.
     * So that singletons get destroyed when hot module reload happens.
     *
     * This works in prod mode too but with no specific effect.
     */
    _singletonRegistry = new Map();
    registerSingletonWithKey(key, target) {
        const alreadyHave = this.singletonRegistry.has(key);
        const item = alreadyHave ? this.singletonRegistry.get(key) : this.withNewTarget(target);
        if (!alreadyHave) {
            this.singletonRegistry.set(key, item);
        }
    }
    unregisterSingletonWithKey(key) {
        if (this.singletonRegistry.has(key)) {
            this.singletonRegistry.delete(key);
        }
    }
    getSingletonWithKey(key) {
        return this.singletonRegistry.has(key) ? this.singletonRegistry.get(key).target : null;
    }
    withNewTarget(target) {
        return {
            target
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSingletonService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSingletonService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzSingletonService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getPagePosition(event) {
    const e = getEventPosition(event);
    return {
        x: e.pageX,
        y: e.pageY
    };
}
/**
 * This module provide a global dragging service to other components.
 */
class NzDragService {
    draggingThreshold = 5;
    currentDraggingSequence = null;
    currentStartingPoint = null;
    handleRegistry = new Set();
    renderer;
    constructor(rendererFactory2) {
        this.renderer = rendererFactory2.createRenderer(null, null);
    }
    requestDraggingSequence(event) {
        if (!this.handleRegistry.size) {
            this.registerDraggingHandler(isTouchEvent(event));
        }
        // Complete last dragging sequence if a new target is dragged.
        if (this.currentDraggingSequence) {
            this.currentDraggingSequence.complete();
        }
        this.currentStartingPoint = getPagePosition(event);
        this.currentDraggingSequence = new Subject();
        return this.currentDraggingSequence.pipe(map((e) => ({
            x: e.pageX - this.currentStartingPoint.x,
            y: e.pageY - this.currentStartingPoint.y
        })), filter((e) => Math.abs(e.x) > this.draggingThreshold || Math.abs(e.y) > this.draggingThreshold), finalize(() => this.teardownDraggingSequence()));
    }
    registerDraggingHandler(isTouch) {
        if (isTouch) {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchmove', (e) => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e.touches[0] || e.changedTouches[0]);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchend', () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                })
            });
        }
        else {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mousemove', e => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.next(e);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mouseup', () => {
                    if (this.currentDraggingSequence) {
                        this.currentDraggingSequence.complete();
                    }
                })
            });
        }
    }
    teardownDraggingSequence() {
        this.currentDraggingSequence = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDragService, deps: [{ token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDragService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDragService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i0.RendererFactory2 }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    let tt = t / (d / 2);
    if (tt < 1) {
        return (cc / 2) * tt * tt * tt + b;
    }
    else {
        return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
    }
}
class NzScrollService {
    ngZone;
    doc = inject(DOCUMENT);
    constructor(ngZone) {
        this.ngZone = ngZone;
    }
    /** Set the position of the scroll bar of `el`. */
    setScrollTop(el, topValue = 0) {
        if (el === window) {
            this.doc.body.scrollTop = topValue;
            this.doc.documentElement.scrollTop = topValue;
        }
        else {
            el.scrollTop = topValue;
        }
    }
    /** Get position of `el` against window. */
    getOffset(el) {
        const ret = {
            top: 0,
            left: 0
        };
        if (!el || !el.getClientRects().length) {
            return ret;
        }
        const rect = el.getBoundingClientRect();
        if (rect.width || rect.height) {
            const doc = el.ownerDocument.documentElement;
            ret.top = rect.top - doc.clientTop;
            ret.left = rect.left - doc.clientLeft;
        }
        else {
            ret.top = rect.top;
            ret.left = rect.left;
        }
        return ret;
    }
    /** Get the position of the scoll bar of `el`. */
    // TODO: remove '| Window' as the fallback already happens here
    getScroll(target, top = true) {
        if (typeof window === 'undefined') {
            return 0;
        }
        const method = top ? 'scrollTop' : 'scrollLeft';
        let result = 0;
        if (this.isWindow(target)) {
            result = target[top ? 'pageYOffset' : 'pageXOffset'];
        }
        else if (target instanceof Document) {
            result = target.documentElement[method];
        }
        else if (target) {
            result = target[method];
        }
        if (target && !this.isWindow(target) && typeof result !== 'number') {
            result = (target.ownerDocument || target).documentElement[method];
        }
        return result;
    }
    isWindow(obj) {
        return obj !== null && obj !== undefined && obj === obj.window;
    }
    /**
     * Scroll `el` to some position with animation.
     *
     * @param containerEl container, `window` by default
     * @param y Scroll to `top`, 0 by default
     */
    scrollTo(containerEl, y = 0, options = {}) {
        const target = containerEl ? containerEl : window;
        const scrollTop = this.getScroll(target);
        const startTime = Date.now();
        const { easing, callback, duration = 450 } = options;
        const frameFunc = () => {
            const timestamp = Date.now();
            const time = timestamp - startTime;
            const nextScrollTop = (easing || easeInOutCubic)(time > duration ? duration : time, scrollTop, y, duration);
            if (this.isWindow(target)) {
                target.scrollTo(window.pageXOffset, nextScrollTop);
            }
            else if (target instanceof HTMLDocument || target.constructor.name === 'HTMLDocument') {
                target.documentElement.scrollTop = nextScrollTop;
            }
            else {
                target.scrollTop = nextScrollTop;
            }
            if (time < duration) {
                reqAnimFrame(frameFunc);
            }
            else if (typeof callback === 'function') {
                // Caretaker note: the `frameFunc` is called within the `<root>` zone, but we have to re-enter
                // the Angular zone when calling custom callback to be backwards-compatible.
                this.ngZone.run(callback);
            }
        };
        // Caretaker note: the `requestAnimationFrame` triggers change detection, but updating a `scrollTop` property or
        // calling `window.scrollTo` doesn't require Angular to run `ApplicationRef.tick()`.
        this.ngZone.runOutsideAngular(() => reqAnimFrame(frameFunc));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzScrollService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzScrollService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzScrollService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }] });

var NzBreakpointEnum;
(function (NzBreakpointEnum) {
    NzBreakpointEnum["xxl"] = "xxl";
    NzBreakpointEnum["xl"] = "xl";
    NzBreakpointEnum["lg"] = "lg";
    NzBreakpointEnum["md"] = "md";
    NzBreakpointEnum["sm"] = "sm";
    NzBreakpointEnum["xs"] = "xs";
})(NzBreakpointEnum || (NzBreakpointEnum = {}));
const gridResponsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
const siderResponsiveMap = {
    xs: '(max-width: 479.98px)',
    sm: '(max-width: 575.98px)',
    md: '(max-width: 767.98px)',
    lg: '(max-width: 991.98px)',
    xl: '(max-width: 1199.98px)',
    xxl: '(max-width: 1599.98px)'
};
class NzBreakpointService {
    resizeService;
    mediaMatcher;
    destroy$ = new Subject();
    constructor(resizeService, mediaMatcher) {
        this.resizeService = resizeService;
        this.mediaMatcher = mediaMatcher;
        this.resizeService
            .subscribe()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => { });
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    subscribe(breakpointMap, fullMap) {
        if (fullMap) {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const get = () => this.matchMedia(breakpointMap, true);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged((x, y) => x[0] === y[0]), map(x => x[1]));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const get = () => this.matchMedia(breakpointMap);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
        }
    }
    matchMedia(breakpointMap, fullMap) {
        let bp = NzBreakpointEnum.md;
        const breakpointBooleanMap = {};
        Object.keys(breakpointMap).map(breakpoint => {
            const castBP = breakpoint;
            const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
            breakpointBooleanMap[breakpoint] = matched;
            if (matched) {
                bp = castBP;
            }
        });
        if (fullMap) {
            return [bp, breakpointBooleanMap];
        }
        else {
            return bp;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzBreakpointService, deps: [{ token: NzResizeService }, { token: i2.MediaMatcher }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzBreakpointService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzBreakpointService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: NzResizeService }, { type: i2.MediaMatcher }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzDestroyService extends Subject {
    ngOnDestroy() {
        this.next();
        this.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDestroyService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDestroyService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzDestroyService, decorators: [{
            type: Injectable
        }] });

class ImagePreloadService {
    platform;
    counter = new Map();
    linkRefs = new Map();
    document = inject(DOCUMENT);
    constructor(platform) {
        this.platform = platform;
    }
    addPreload(option) {
        if (this.platform.isBrowser) {
            return () => void 0;
        }
        const uniqueKey = `${option.src}${option.srcset}`;
        let currentCount = this.counter.get(uniqueKey) || 0;
        currentCount++;
        this.counter.set(uniqueKey, currentCount);
        if (!this.linkRefs.has(uniqueKey)) {
            const linkNode = this.appendPreloadLink(option);
            this.linkRefs.set(uniqueKey, linkNode);
        }
        return () => {
            if (this.counter.has(uniqueKey)) {
                let count = this.counter.get(uniqueKey);
                count--;
                if (count === 0) {
                    const linkNode = this.linkRefs.get(uniqueKey);
                    this.removePreloadLink(linkNode);
                    this.counter.delete(uniqueKey);
                    this.linkRefs.delete(uniqueKey);
                }
                else {
                    this.counter.set(uniqueKey, count);
                }
            }
        };
    }
    appendPreloadLink(option) {
        const linkNode = this.document.createElement('link');
        linkNode.setAttribute('rel', 'preload');
        linkNode.setAttribute('as', 'image');
        linkNode.setAttribute('href', option.src);
        if (option.srcset) {
            linkNode.setAttribute('imagesrcset', option.srcset);
        }
        this.document.head.appendChild(linkNode);
        return linkNode;
    }
    removePreloadLink(linkNode) {
        if (this.document.head.contains(linkNode)) {
            this.document.head.removeChild(linkNode);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ImagePreloadService, deps: [{ token: i1.Platform }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ImagePreloadService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ImagePreloadService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.Platform }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ImagePreloadService, NzBreakpointEnum, NzBreakpointService, NzDestroyService, NzDragService, NzResizeService, NzScrollService, NzSingletonService, gridResponsiveMap, siderResponsiveMap };
//# sourceMappingURL=ng-zorro-antd-core-services.mjs.map
