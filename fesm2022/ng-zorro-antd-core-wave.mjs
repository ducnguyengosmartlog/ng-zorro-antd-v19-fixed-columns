import { Platform } from '@angular/cdk/platform';
import * as i0 from '@angular/core';
import { InjectionToken, makeEnvironmentProviders, inject, CSP_NONCE, Input, Directive, NgModule } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzWaveRenderer {
    triggerElement;
    ngZone;
    insertExtraNode;
    platform;
    cspNonce;
    waveTransitionDuration = 400;
    styleForPseudo = null;
    extraNode = null;
    lastTime = 0;
    clickHandler;
    get waveAttributeName() {
        return this.insertExtraNode ? 'ant-click-animating' : 'ant-click-animating-without-extra-node';
    }
    constructor(triggerElement, ngZone, insertExtraNode, platform, cspNonce) {
        this.triggerElement = triggerElement;
        this.ngZone = ngZone;
        this.insertExtraNode = insertExtraNode;
        this.platform = platform;
        this.cspNonce = cspNonce;
        this.clickHandler = this.onClick.bind(this);
        this.bindTriggerEvent();
    }
    onClick = (event) => {
        if (!this.triggerElement ||
            !this.triggerElement.getAttribute ||
            this.triggerElement.getAttribute('disabled') ||
            event.target.tagName === 'INPUT' ||
            this.triggerElement.className.indexOf('disabled') >= 0) {
            return;
        }
        this.fadeOutWave();
    };
    bindTriggerEvent() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                this.removeTriggerEvent();
                if (this.triggerElement) {
                    this.triggerElement.addEventListener('click', this.clickHandler, true);
                }
            });
        }
    }
    removeTriggerEvent() {
        if (this.triggerElement) {
            this.triggerElement.removeEventListener('click', this.clickHandler, true);
        }
    }
    removeStyleAndExtraNode() {
        if (this.styleForPseudo && document.body.contains(this.styleForPseudo)) {
            document.body.removeChild(this.styleForPseudo);
            this.styleForPseudo = null;
        }
        if (this.insertExtraNode && this.triggerElement.contains(this.extraNode)) {
            this.triggerElement.removeChild(this.extraNode);
        }
    }
    destroy() {
        this.removeTriggerEvent();
        this.removeStyleAndExtraNode();
    }
    fadeOutWave() {
        const node = this.triggerElement;
        const waveColor = this.getWaveColor(node);
        node.setAttribute(this.waveAttributeName, 'true');
        if (Date.now() < this.lastTime + this.waveTransitionDuration) {
            return;
        }
        if (this.isValidColor(waveColor)) {
            if (!this.styleForPseudo) {
                this.styleForPseudo = document.createElement('style');
                if (this.cspNonce) {
                    this.styleForPseudo.nonce = this.cspNonce;
                }
            }
            this.styleForPseudo.innerHTML = `
      [ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {
        --antd-wave-shadow-color: ${waveColor};
      }`;
            document.body.appendChild(this.styleForPseudo);
        }
        if (this.insertExtraNode) {
            if (!this.extraNode) {
                this.extraNode = document.createElement('div');
            }
            this.extraNode.className = 'ant-click-animating-node';
            node.appendChild(this.extraNode);
        }
        this.lastTime = Date.now();
        this.runTimeoutOutsideZone(() => {
            node.removeAttribute(this.waveAttributeName);
            this.removeStyleAndExtraNode();
        }, this.waveTransitionDuration);
    }
    isValidColor(color) {
        return (!!color &&
            color !== '#ffffff' &&
            color !== 'rgb(255, 255, 255)' &&
            this.isNotGrey(color) &&
            !/rgba\(\d*, \d*, \d*, 0\)/.test(color) &&
            color !== 'transparent');
    }
    isNotGrey(color) {
        const match = color.match(/rgba?\((\d*), (\d*), (\d*)(, [.\d]*)?\)/);
        if (match && match[1] && match[2] && match[3]) {
            return !(match[1] === match[2] && match[2] === match[3]);
        }
        return true;
    }
    getWaveColor(node) {
        const nodeStyle = getComputedStyle(node);
        return (nodeStyle.getPropertyValue('border-top-color') || // Firefox Compatible
            nodeStyle.getPropertyValue('border-color') ||
            nodeStyle.getPropertyValue('background-color'));
    }
    runTimeoutOutsideZone(fn, delay) {
        this.ngZone.runOutsideAngular(() => setTimeout(fn, delay));
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_WAVE_GLOBAL_DEFAULT_CONFIG = {
    disabled: false
};
const NZ_WAVE_GLOBAL_CONFIG = new InjectionToken('nz-wave-global-options');
function provideNzWave(config) {
    return makeEnvironmentProviders([{ provide: NZ_WAVE_GLOBAL_CONFIG, useValue: config }]);
}
class NzWaveDirective {
    ngZone;
    elementRef;
    nzWaveExtraNode = false;
    waveRenderer;
    waveDisabled = false;
    get disabled() {
        return this.waveDisabled;
    }
    get rendererRef() {
        return this.waveRenderer;
    }
    cspNonce = inject(CSP_NONCE, { optional: true });
    platform = inject(Platform);
    config = inject(NZ_WAVE_GLOBAL_CONFIG, { optional: true });
    animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
    constructor(ngZone, elementRef) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.waveDisabled = this.isConfigDisabled();
    }
    isConfigDisabled() {
        let disabled = false;
        if (this.config && typeof this.config.disabled === 'boolean') {
            disabled = this.config.disabled;
        }
        if (this.animationType === 'NoopAnimations') {
            disabled = true;
        }
        return disabled;
    }
    ngOnDestroy() {
        if (this.waveRenderer) {
            this.waveRenderer.destroy();
        }
    }
    ngOnInit() {
        this.renderWaveIfEnabled();
    }
    renderWaveIfEnabled() {
        if (!this.waveDisabled && this.elementRef.nativeElement) {
            this.waveRenderer = new NzWaveRenderer(this.elementRef.nativeElement, this.ngZone, this.nzWaveExtraNode, this.platform, this.cspNonce);
        }
    }
    disable() {
        this.waveDisabled = true;
        if (this.waveRenderer) {
            this.waveRenderer.removeTriggerEvent();
            this.waveRenderer.removeStyleAndExtraNode();
        }
    }
    enable() {
        // config priority
        this.waveDisabled = this.isConfigDisabled() || false;
        if (this.waveRenderer) {
            this.waveRenderer.bindTriggerEvent();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaveDirective, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: NzWaveDirective, isStandalone: true, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: { nzWaveExtraNode: "nzWaveExtraNode" }, exportAs: ["nzWave"], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaveDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-wave],button[nz-button]:not([nzType="link"]):not([nzType="text"])',
                    exportAs: 'nzWave'
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ElementRef }], propDecorators: { nzWaveExtraNode: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzWaveModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzWaveModule, imports: [NzWaveDirective], exports: [NzWaveDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaveModule, providers: [provideNzWave(NZ_WAVE_GLOBAL_DEFAULT_CONFIG)] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzWaveModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzWaveDirective],
                    exports: [NzWaveDirective],
                    providers: [provideNzWave(NZ_WAVE_GLOBAL_DEFAULT_CONFIG)]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_WAVE_GLOBAL_CONFIG, NZ_WAVE_GLOBAL_DEFAULT_CONFIG, NzWaveDirective, NzWaveModule, NzWaveRenderer, provideNzWave };
//# sourceMappingURL=ng-zorro-antd-core-wave.mjs.map
