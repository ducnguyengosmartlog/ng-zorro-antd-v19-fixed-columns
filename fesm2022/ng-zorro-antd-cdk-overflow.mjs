import * as i0 from '@angular/core';
import { inject, ElementRef, Directive, ContentChild, ContentChildren, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, startWith, tap, pairwise, withLatestFrom, switchMap, takeUntil, filter } from 'rxjs/operators';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowItemDirective {
    cdr;
    nzResizeObserver = inject(NzResizeObserver);
    elementRef = inject(ElementRef);
    overflowStyle = undefined;
    itemWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), distinctUntilChanged(), startWith(undefined), tap(width => {
        this.itemWidth = width;
    }));
    itemWidth = undefined;
    constructor(cdr) {
        this.cdr = cdr;
    }
    setItemStyle(display, order) {
        const mergedHidden = !display;
        this.overflowStyle = {
            opacity: mergedHidden ? 0 : 1,
            height: mergedHidden ? 0 : undefined,
            overflowY: mergedHidden ? 'hidden' : undefined,
            order: order,
            pointerEvents: mergedHidden ? 'none' : undefined,
            position: mergedHidden ? 'absolute' : undefined
        };
        this.cdr.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowItemDirective, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzOverflowItemDirective, isStandalone: true, selector: "[nzOverflowItem]", host: { properties: { "style": "overflowStyle" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowItem]',
                    host: {
                        '[style]': 'overflowStyle'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowRestDirective {
    cdr;
    nzResizeObserver = inject(NzResizeObserver);
    elementRef = inject(ElementRef);
    restStyle = undefined;
    restWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), startWith(0), tap(width => (this.restWidth = width)));
    restWidth = 0;
    constructor(cdr) {
        this.cdr = cdr;
    }
    setRestStyle(display, order) {
        const mergedHidden = !display;
        this.restStyle = {
            opacity: mergedHidden ? 0 : 1,
            height: mergedHidden ? 0 : undefined,
            overflowY: mergedHidden ? 'hidden' : undefined,
            order: order,
            pointerEvents: mergedHidden ? 'none' : undefined,
            position: mergedHidden ? 'absolute' : undefined
        };
        this.cdr.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowRestDirective, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzOverflowRestDirective, isStandalone: true, selector: "[nzOverflowRest]", host: { properties: { "style": "restStyle" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowRestDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowRest]',
                    host: {
                        '[style]': 'restStyle'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowSuffixDirective {
    cdr;
    nzResizeObserver = inject(NzResizeObserver);
    elementRef = inject(ElementRef);
    suffixStyle = {};
    suffixWidth$ = this.nzResizeObserver.observe(this.elementRef.nativeElement).pipe(map(([item]) => item.target.offsetWidth), tap(width => (this.suffixWidth = width)));
    suffixWidth = 0;
    constructor(cdr) {
        this.cdr = cdr;
    }
    setSuffixStyle(start, order) {
        if (start !== null) {
            this.suffixStyle = {
                position: 'absolute',
                left: `${start}px`,
                top: 0,
                opacity: 1,
                order: order
            };
        }
        else {
            this.suffixStyle = {
                opacity: 1,
                order: order
            };
        }
        this.cdr.detectChanges();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowSuffixDirective, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzOverflowSuffixDirective, isStandalone: true, selector: "[nzOverflowSuffix]", host: { properties: { "style": "suffixStyle" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowSuffixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzOverflowSuffix]',
                    host: {
                        '[style]': 'suffixStyle'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowContainerComponent {
    cdr;
    contentInit$ = new Subject();
    overflowItems = undefined;
    overflowSuffix = undefined;
    overflowRest = undefined;
    overflowItems$ = new ReplaySubject(1);
    destroy$ = new Subject();
    nzResizeObserver = inject(NzResizeObserver);
    elementRef = inject(ElementRef);
    containerWidth$ = this.nzResizeObserver
        .observe(this.elementRef.nativeElement)
        .pipe(map(([item]) => item.target.clientWidth || 0));
    restWidth$ = new BehaviorSubject(0);
    suffixWidth$ = new BehaviorSubject(0);
    suffixFixedStart$ = new BehaviorSubject(null);
    displayCount$ = new BehaviorSubject(Number.MAX_SAFE_INTEGER);
    restReady$ = new BehaviorSubject(false);
    maxRestWith$ = this.restWidth$.pipe(pairwise(), map(([prevRestWidth, restWidth]) => Math.max(prevRestWidth, restWidth)));
    omittedItems$ = combineLatest([this.overflowItems$, this.displayCount$]).pipe(withLatestFrom(this.contentInit$), map(([[overflowItems, displayCount]]) => overflowItems.toArray().slice(displayCount + 1)));
    displayRest$ = combineLatest([this.restReady$, this.omittedItems$]).pipe(map(([restReady, omittedItems]) => restReady && !!omittedItems.length));
    updateDisplayCount(count, notReady) {
        this.displayCount$.next(count);
        if (this.overflowItems && !notReady) {
            this.restReady$.next(count < this.overflowItems.length - 1);
        }
    }
    constructor(cdr) {
        this.cdr = cdr;
    }
    ngOnInit() {
        const overflowItemsWidth$ = this.overflowItems$.pipe(switchMap(items => combineLatest(items.map(item => item.itemWidth$))));
        this.overflowItems$.pipe(takeUntil(this.destroy$)).subscribe(overflowItems => {
            if (!overflowItems.length) {
                this.displayCount$.next(0);
                this.suffixFixedStart$.next(null);
            }
        });
        combineLatest([overflowItemsWidth$, this.containerWidth$, this.maxRestWith$, this.restWidth$, this.suffixWidth$])
            .pipe(filter(([, containerWidth, maxRestWith]) => !!(containerWidth && maxRestWith)), takeUntil(this.destroy$))
            .subscribe(([overflowItemsWidth, containerWidth, maxRestWith, restWidth, suffixWidth]) => {
            let totalWidth = suffixWidth;
            const len = overflowItemsWidth.length;
            const lastIndex = len - 1;
            for (let i = 0; i < len; i += 1) {
                const currentItemWidth = overflowItemsWidth[i];
                // Break since data not ready
                if (currentItemWidth === undefined) {
                    this.updateDisplayCount(i - 1, true);
                    break;
                }
                else {
                    // Find best match
                    totalWidth += currentItemWidth;
                    if (
                    // Only one means `totalWidth` is the final width
                    (lastIndex === 0 && totalWidth <= containerWidth) ||
                        // Last two width will be the final width
                        (i === lastIndex - 1 &&
                            overflowItemsWidth[lastIndex] !== undefined &&
                            totalWidth + overflowItemsWidth[lastIndex] <= containerWidth)) {
                        // Additional check if match the end
                        this.updateDisplayCount(lastIndex);
                        this.suffixFixedStart$.next(null);
                        break;
                    }
                    else if (totalWidth + maxRestWith > containerWidth) {
                        // Can not hold all the content to show rest
                        this.updateDisplayCount(i - 1);
                        this.suffixFixedStart$.next(totalWidth - currentItemWidth - suffixWidth + restWidth);
                        break;
                    }
                    this.cdr.detectChanges();
                }
            }
            if (this.overflowSuffix &&
                overflowItemsWidth[0] !== undefined &&
                overflowItemsWidth[0] + suffixWidth > containerWidth) {
                this.suffixFixedStart$.next(null);
            }
            this.cdr.detectChanges();
        });
        combineLatest([this.suffixFixedStart$, this.displayCount$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([suffixFixedStart, displayCount]) => {
            this.overflowSuffix?.setSuffixStyle(suffixFixedStart, displayCount);
        });
        combineLatest([this.displayCount$, this.overflowItems$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([displayCount, overflowItems]) => overflowItems.forEach((item, index) => item.setItemStyle(index <= displayCount, index)));
        combineLatest([this.displayRest$, this.displayCount$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([displayRest, displayCount]) => {
            this.overflowRest?.setRestStyle(displayRest, displayRest ? displayCount : Number.MAX_SAFE_INTEGER);
        });
    }
    ngAfterContentInit() {
        this.overflowItems?.changes.pipe(startWith(this.overflowItems)).subscribe(this.overflowItems$);
        this.overflowSuffix?.suffixWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.suffixWidth$);
        this.overflowRest?.restWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.restWidth$);
        this.contentInit$.next();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowContainerComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzOverflowContainerComponent, isStandalone: true, selector: "nz-overflow-container", providers: [NzResizeObserver], queries: [{ propertyName: "overflowSuffix", first: true, predicate: NzOverflowSuffixDirective, descendants: true }, { propertyName: "overflowRest", first: true, predicate: NzOverflowRestDirective, descendants: true }, { propertyName: "overflowItems", predicate: NzOverflowItemDirective }], ngImport: i0, template: ` <ng-content></ng-content>
    <ng-content select="[appOverflowRest]"></ng-content>
    <ng-content select="[appOverflowSuffix]"></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-overflow-container',
                    template: ` <ng-content></ng-content>
    <ng-content select="[appOverflowRest]"></ng-content>
    <ng-content select="[appOverflowSuffix]"></ng-content>`,
                    providers: [NzResizeObserver],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { overflowItems: [{
                type: ContentChildren,
                args: [NzOverflowItemDirective]
            }], overflowSuffix: [{
                type: ContentChild,
                args: [NzOverflowSuffixDirective]
            }], overflowRest: [{
                type: ContentChild,
                args: [NzOverflowRestDirective]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzOverflowModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowModule, imports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective], exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzOverflowModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective],
                    exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowModule, NzOverflowRestDirective, NzOverflowSuffixDirective };
//# sourceMappingURL=ng-zorro-antd-cdk-overflow.mjs.map
