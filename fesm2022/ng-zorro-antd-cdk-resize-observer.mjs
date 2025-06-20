import * as i0 from '@angular/core';
import { Injectable, EventEmitter, booleanAttribute, Input, Output, Directive, NgModule } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';
import { Observable, Subject } from 'rxjs';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
class NzResizeObserverFactory {
    create(callback) {
        return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverFactory, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverFactory, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverFactory, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/** An injectable service that allows watching elements for changes to their content. */
class NzResizeObserver {
    nzResizeObserverFactory;
    /** Keeps track of the existing ResizeObservers so they can be reused. */
    observedElements = new Map();
    constructor(nzResizeObserverFactory) {
        this.nzResizeObserverFactory = nzResizeObserverFactory;
    }
    ngOnDestroy() {
        this.observedElements.forEach((_, element) => this.cleanupObserver(element));
    }
    observe(elementOrRef) {
        const element = coerceElement(elementOrRef);
        return new Observable((observer) => {
            const stream = this.observeElement(element);
            const subscription = stream.subscribe(observer);
            return () => {
                subscription.unsubscribe();
                this.unobserveElement(element);
            };
        });
    }
    /**
     * Observes the given element by using the existing ResizeObserver if available, or creating a
     * new one if not.
     */
    observeElement(element) {
        if (!this.observedElements.has(element)) {
            const stream = new Subject();
            const observer = this.nzResizeObserverFactory.create((mutations) => stream.next(mutations));
            if (observer) {
                observer.observe(element);
            }
            this.observedElements.set(element, { observer, stream, count: 1 });
        }
        else {
            this.observedElements.get(element).count++;
        }
        return this.observedElements.get(element).stream;
    }
    /**
     * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
     * observing this element.
     */
    unobserveElement(element) {
        if (this.observedElements.has(element)) {
            this.observedElements.get(element).count--;
            if (!this.observedElements.get(element).count) {
                this.cleanupObserver(element);
            }
        }
    }
    /** Clean up the underlying ResizeObserver for the specified element. */
    cleanupObserver(element) {
        if (this.observedElements.has(element)) {
            const { observer, stream } = this.observedElements.get(element);
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this.observedElements.delete(element);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserver, deps: [{ token: NzResizeObserverFactory }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserver, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: NzResizeObserverFactory }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizeObserverDirective {
    nzResizeObserver;
    elementRef;
    nzResizeObserve = new EventEmitter();
    nzResizeObserverDisabled = false;
    currentSubscription = null;
    subscribe() {
        this.unsubscribe();
        this.currentSubscription = this.nzResizeObserver.observe(this.elementRef).subscribe(this.nzResizeObserve);
    }
    unsubscribe() {
        this.currentSubscription?.unsubscribe();
    }
    constructor(nzResizeObserver, elementRef) {
        this.nzResizeObserver = nzResizeObserver;
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        if (!this.currentSubscription && !this.nzResizeObserverDisabled) {
            this.subscribe();
        }
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    ngOnChanges(changes) {
        const { nzResizeObserve } = changes;
        if (nzResizeObserve) {
            if (this.nzResizeObserverDisabled) {
                this.unsubscribe();
            }
            else {
                this.subscribe();
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverDirective, deps: [{ token: NzResizeObserver }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "19.2.2", type: NzResizeObserverDirective, isStandalone: true, selector: "[nzResizeObserver]", inputs: { nzResizeObserverDisabled: ["nzResizeObserverDisabled", "nzResizeObserverDisabled", booleanAttribute] }, outputs: { nzResizeObserve: "nzResizeObserve" }, providers: [NzResizeObserverFactory], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzResizeObserver]',
                    providers: [NzResizeObserverFactory]
                }]
        }], ctorParameters: () => [{ type: NzResizeObserver }, { type: i0.ElementRef }], propDecorators: { nzResizeObserve: [{
                type: Output
            }], nzResizeObserverDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzResizeObserverModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverModule, imports: [NzResizeObserverDirective], exports: [NzResizeObserverDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzResizeObserverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzResizeObserverDirective],
                    exports: [NzResizeObserverDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzResizeObserver, NzResizeObserverDirective, NzResizeObserverFactory, NzResizeObserverModule };
//# sourceMappingURL=ng-zorro-antd-cdk-resize-observer.mjs.map
