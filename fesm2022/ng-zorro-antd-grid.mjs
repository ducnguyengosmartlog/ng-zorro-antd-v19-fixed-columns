import * as i0 from '@angular/core';
import { Input, Directive, inject, NgModule } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i3 from 'ng-zorro-antd/core/services';
import { gridResponsiveMap } from 'ng-zorro-antd/core/services';
import * as i1 from '@angular/cdk/layout';
import * as i2 from '@angular/cdk/platform';
import * as i4 from '@angular/cdk/bidi';
import { isNotNil } from 'ng-zorro-antd/core/util';

class NzRowDirective {
    elementRef;
    renderer;
    mediaMatcher;
    ngZone;
    platform;
    breakpointService;
    directionality;
    nzAlign = null;
    nzJustify = null;
    nzGutter = null;
    actualGutter$ = new ReplaySubject(1);
    dir = 'ltr';
    destroy$ = new Subject();
    getGutter() {
        const results = [null, null];
        const gutter = this.nzGutter || 0;
        const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
        normalizedGutter.forEach((g, index) => {
            if (typeof g === 'object' && g !== null) {
                results[index] = null;
                Object.keys(gridResponsiveMap).map((screen) => {
                    const bp = screen;
                    if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
                        results[index] = g[bp];
                    }
                });
            }
            else {
                results[index] = Number(g) || null;
            }
        });
        return results;
    }
    setGutterStyle() {
        const [horizontalGutter, verticalGutter] = this.getGutter();
        this.actualGutter$.next([horizontalGutter, verticalGutter]);
        const renderGutter = (name, gutter) => {
            const nativeElement = this.elementRef.nativeElement;
            if (gutter !== null) {
                this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
            }
        };
        renderGutter('margin-left', horizontalGutter);
        renderGutter('margin-right', horizontalGutter);
        renderGutter('margin-top', verticalGutter);
        renderGutter('margin-bottom', verticalGutter);
    }
    constructor(elementRef, renderer, mediaMatcher, ngZone, platform, breakpointService, directionality) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.mediaMatcher = mediaMatcher;
        this.ngZone = ngZone;
        this.platform = platform;
        this.breakpointService = breakpointService;
        this.directionality = directionality;
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
        this.setGutterStyle();
    }
    ngOnChanges(changes) {
        if (changes.nzGutter) {
            this.setGutterStyle();
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(gridResponsiveMap)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.setGutterStyle();
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRowDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.MediaMatcher }, { token: i0.NgZone }, { token: i2.Platform }, { token: i3.NzBreakpointService }, { token: i4.Directionality }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzRowDirective, isStandalone: true, selector: "[nz-row],nz-row,nz-form-item", inputs: { nzAlign: "nzAlign", nzJustify: "nzJustify", nzGutter: "nzGutter" }, host: { properties: { "class.ant-row-top": "nzAlign === 'top'", "class.ant-row-middle": "nzAlign === 'middle'", "class.ant-row-bottom": "nzAlign === 'bottom'", "class.ant-row-start": "nzJustify === 'start'", "class.ant-row-end": "nzJustify === 'end'", "class.ant-row-center": "nzJustify === 'center'", "class.ant-row-space-around": "nzJustify === 'space-around'", "class.ant-row-space-between": "nzJustify === 'space-between'", "class.ant-row-space-evenly": "nzJustify === 'space-evenly'", "class.ant-row-rtl": "dir === \"rtl\"" }, classAttribute: "ant-row" }, exportAs: ["nzRow"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-row],nz-row,nz-form-item',
                    exportAs: 'nzRow',
                    host: {
                        class: 'ant-row',
                        '[class.ant-row-top]': `nzAlign === 'top'`,
                        '[class.ant-row-middle]': `nzAlign === 'middle'`,
                        '[class.ant-row-bottom]': `nzAlign === 'bottom'`,
                        '[class.ant-row-start]': `nzJustify === 'start'`,
                        '[class.ant-row-end]': `nzJustify === 'end'`,
                        '[class.ant-row-center]': `nzJustify === 'center'`,
                        '[class.ant-row-space-around]': `nzJustify === 'space-around'`,
                        '[class.ant-row-space-between]': `nzJustify === 'space-between'`,
                        '[class.ant-row-space-evenly]': `nzJustify === 'space-evenly'`,
                        '[class.ant-row-rtl]': `dir === "rtl"`
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.MediaMatcher }, { type: i0.NgZone }, { type: i2.Platform }, { type: i3.NzBreakpointService }, { type: i4.Directionality }], propDecorators: { nzAlign: [{
                type: Input
            }], nzJustify: [{
                type: Input
            }], nzGutter: [{
                type: Input
            }] } });

class NzColDirective {
    elementRef;
    renderer;
    directionality;
    classMap = {};
    destroy$ = new Subject();
    hostFlexStyle = null;
    dir = 'ltr';
    nzFlex = null;
    nzSpan = null;
    nzOrder = null;
    nzOffset = null;
    nzPush = null;
    nzPull = null;
    nzXs = null;
    nzSm = null;
    nzMd = null;
    nzLg = null;
    nzXl = null;
    nzXXl = null;
    setHostClassMap() {
        const hostClassMap = {
            ['ant-col']: true,
            [`ant-col-${this.nzSpan}`]: isNotNil(this.nzSpan),
            [`ant-col-order-${this.nzOrder}`]: isNotNil(this.nzOrder),
            [`ant-col-offset-${this.nzOffset}`]: isNotNil(this.nzOffset),
            [`ant-col-pull-${this.nzPull}`]: isNotNil(this.nzPull),
            [`ant-col-push-${this.nzPush}`]: isNotNil(this.nzPush),
            ['ant-col-rtl']: this.dir === 'rtl',
            ...this.generateClass()
        };
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i)) {
                this.renderer.removeClass(this.elementRef.nativeElement, i);
            }
        }
        this.classMap = { ...hostClassMap };
        for (const i in this.classMap) {
            if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
                this.renderer.addClass(this.elementRef.nativeElement, i);
            }
        }
    }
    setHostFlexStyle() {
        this.hostFlexStyle = this.parseFlex(this.nzFlex);
    }
    parseFlex(flex) {
        if (typeof flex === 'number') {
            return `${flex} ${flex} auto`;
        }
        else if (typeof flex === 'string') {
            if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
                return `0 0 ${flex}`;
            }
        }
        return flex;
    }
    generateClass() {
        const listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
        const listClassMap = {};
        listOfSizeInputName.forEach(name => {
            const sizeName = name.replace('nz', '').toLowerCase();
            if (isNotNil(this[name])) {
                if (typeof this[name] === 'number' || typeof this[name] === 'string') {
                    listClassMap[`ant-col-${sizeName}-${this[name]}`] = true;
                }
                else {
                    const embedded = this[name];
                    const prefixArray = ['span', 'pull', 'push', 'offset', 'order'];
                    prefixArray.forEach(prefix => {
                        const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
                        listClassMap[`ant-col-${sizeName}${prefixClass}${embedded[prefix]}`] =
                            embedded && isNotNil(embedded[prefix]);
                    });
                }
            }
        });
        return listClassMap;
    }
    nzRowDirective = inject(NzRowDirective, { host: true, optional: true });
    constructor(elementRef, renderer, directionality) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.directionality = directionality;
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.setHostClassMap();
        });
        this.setHostClassMap();
        this.setHostFlexStyle();
    }
    ngOnChanges(changes) {
        this.setHostClassMap();
        const { nzFlex } = changes;
        if (nzFlex) {
            this.setHostFlexStyle();
        }
    }
    ngAfterViewInit() {
        if (this.nzRowDirective) {
            this.nzRowDirective.actualGutter$
                .pipe(takeUntil(this.destroy$))
                .subscribe(([horizontalGutter, verticalGutter]) => {
                const renderGutter = (name, gutter) => {
                    const nativeElement = this.elementRef.nativeElement;
                    if (gutter !== null) {
                        this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
                    }
                };
                renderGutter('padding-left', horizontalGutter);
                renderGutter('padding-right', horizontalGutter);
                renderGutter('padding-top', verticalGutter);
                renderGutter('padding-bottom', verticalGutter);
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzColDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i4.Directionality }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzColDirective, isStandalone: true, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: { nzFlex: "nzFlex", nzSpan: "nzSpan", nzOrder: "nzOrder", nzOffset: "nzOffset", nzPush: "nzPush", nzPull: "nzPull", nzXs: "nzXs", nzSm: "nzSm", nzMd: "nzMd", nzLg: "nzLg", nzXl: "nzXl", nzXXl: "nzXXl" }, host: { properties: { "style.flex": "hostFlexStyle" } }, exportAs: ["nzCol"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzColDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
                    exportAs: 'nzCol',
                    host: {
                        '[style.flex]': 'hostFlexStyle'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i4.Directionality }], propDecorators: { nzFlex: [{
                type: Input
            }], nzSpan: [{
                type: Input
            }], nzOrder: [{
                type: Input
            }], nzOffset: [{
                type: Input
            }], nzPush: [{
                type: Input
            }], nzPull: [{
                type: Input
            }], nzXs: [{
                type: Input
            }], nzSm: [{
                type: Input
            }], nzMd: [{
                type: Input
            }], nzLg: [{
                type: Input
            }], nzXl: [{
                type: Input
            }], nzXXl: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzGridModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzGridModule, imports: [NzColDirective, NzRowDirective], exports: [NzColDirective, NzRowDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGridModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzColDirective, NzRowDirective],
                    exports: [NzColDirective, NzRowDirective]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzColDirective, NzGridModule, NzRowDirective };
//# sourceMappingURL=ng-zorro-antd-grid.mjs.map
