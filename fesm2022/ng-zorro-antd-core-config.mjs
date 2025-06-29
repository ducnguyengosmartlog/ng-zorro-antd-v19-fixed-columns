import * as i0 from '@angular/core';
import { InjectionToken, makeEnvironmentProviders, inject, CSP_NONCE, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TinyColor } from '@ctrl/tinycolor';
import { generate } from 'ng-zorro-antd/core/color';
import { warn } from 'ng-zorro-antd/core/logger';
import { canUseDom, updateCSS } from 'ng-zorro-antd/core/util';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * User should provide an object implements this interface to set global configurations.
 */
const NZ_CONFIG = new InjectionToken('nz-config');
function provideNzConfig(config) {
    return makeEnvironmentProviders([{ provide: NZ_CONFIG, useValue: config }]);
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Sync from @ant-design/colors(https://github.com/ant-design/ant-design-colors)
 */
const dynamicStyleMark = `-ant-${Date.now()}-${Math.random()}`;
function getStyle(globalPrefixCls, theme) {
    const variables = {};
    const formatColor = (color, updater) => {
        let clone = color.clone();
        clone = updater?.(clone) || clone;
        return clone.toRgbString();
    };
    const fillColor = (colorVal, type) => {
        const baseColor = new TinyColor(colorVal);
        const colorPalettes = generate(baseColor.toRgbString());
        variables[`${type}-color`] = formatColor(baseColor);
        variables[`${type}-color-disabled`] = colorPalettes[1];
        variables[`${type}-color-hover`] = colorPalettes[4];
        variables[`${type}-color-active`] = colorPalettes[7];
        variables[`${type}-color-outline`] = baseColor.clone().setAlpha(0.2).toRgbString();
        variables[`${type}-color-deprecated-bg`] = colorPalettes[1];
        variables[`${type}-color-deprecated-border`] = colorPalettes[3];
    };
    // ================ Primary Color ================
    if (theme.primaryColor) {
        fillColor(theme.primaryColor, 'primary');
        const primaryColor = new TinyColor(theme.primaryColor);
        const primaryColors = generate(primaryColor.toRgbString());
        // Legacy - We should use semantic naming standard
        primaryColors.forEach((color, index) => {
            variables[`primary-${index + 1}`] = color;
        });
        // Deprecated
        variables['primary-color-deprecated-l-35'] = formatColor(primaryColor, c => c.lighten(35));
        variables['primary-color-deprecated-l-20'] = formatColor(primaryColor, c => c.lighten(20));
        variables['primary-color-deprecated-t-20'] = formatColor(primaryColor, c => c.tint(20));
        variables['primary-color-deprecated-t-50'] = formatColor(primaryColor, c => c.tint(50));
        variables['primary-color-deprecated-f-12'] = formatColor(primaryColor, c => c.setAlpha(c.getAlpha() * 0.12));
        const primaryActiveColor = new TinyColor(primaryColors[0]);
        variables['primary-color-active-deprecated-f-30'] = formatColor(primaryActiveColor, c => c.setAlpha(c.getAlpha() * 0.3));
        variables['primary-color-active-deprecated-d-02'] = formatColor(primaryActiveColor, c => c.darken(2));
    }
    // ================ Success Color ================
    if (theme.successColor) {
        fillColor(theme.successColor, 'success');
    }
    // ================ Warning Color ================
    if (theme.warningColor) {
        fillColor(theme.warningColor, 'warning');
    }
    // ================= Error Color =================
    if (theme.errorColor) {
        fillColor(theme.errorColor, 'error');
    }
    // ================= Info Color ==================
    if (theme.infoColor) {
        fillColor(theme.infoColor, 'info');
    }
    // Convert to css variables
    const cssList = Object.keys(variables).map(key => `--${globalPrefixCls}-${key}: ${variables[key]};`);
    return `
  :root {
    ${cssList.join('\n')}
  }
  `.trim();
}
function registerTheme(globalPrefixCls, theme, cspNonce) {
    const style = getStyle(globalPrefixCls, theme);
    if (canUseDom()) {
        updateCSS(style, `${dynamicStyleMark}-dynamic-theme`, { cspNonce });
    }
    else {
        warn(`NzConfigService: SSR do not support dynamic theme with css variables.`);
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const isDefined = function (value) {
    return value !== undefined;
};
const defaultPrefixCls = 'ant';
class NzConfigService {
    configUpdated$ = new Subject();
    /** Global config holding property. */
    config = inject(NZ_CONFIG, { optional: true }) || {};
    cspNonce = inject(CSP_NONCE, { optional: true });
    constructor() {
        if (this.config.theme) {
            // If theme is set with NZ_CONFIG, register theme to make sure css variables work
            registerTheme(this.getConfig().prefixCls?.prefixCls || defaultPrefixCls, this.config.theme, this.cspNonce);
        }
    }
    getConfig() {
        return this.config;
    }
    getConfigForComponent(componentName) {
        return this.config[componentName];
    }
    getConfigChangeEventForComponent(componentName) {
        return this.configUpdated$.pipe(filter(n => n === componentName), map(() => undefined));
    }
    set(componentName, value) {
        this.config[componentName] = { ...this.config[componentName], ...value };
        if (componentName === 'theme' && this.config.theme) {
            registerTheme(this.getConfig().prefixCls?.prefixCls || defaultPrefixCls, this.config.theme, this.cspNonce);
        }
        this.configUpdated$.next(componentName);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzConfigService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzConfigService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });
/**
 * This decorator is used to decorate class field. If a class field is decorated and unassigned, it would try to load default value from `NZ_CONFIG`
 *
 * @note that the class must have `_nzModuleName`({@link NzConfigKey}) property.
 * @example
 * ```ts
 * class ExampleComponent {
 *   private readonly _nzModuleName: NzConfigKey = 'button';
 *   @WithConfig() size: string = 'default';
 * }
 * ```
 */
function WithConfig() {
    return function (_value, context) {
        context.addInitializer(function () {
            const nzConfigService = inject(NzConfigService);
            const originalValue = this[context.name];
            let value;
            let assignedByUser = false;
            Object.defineProperty(this, context.name, {
                get: () => {
                    const configValue = nzConfigService.getConfigForComponent(this['_nzModuleName'])?.[context.name];
                    if (assignedByUser) {
                        return value;
                    }
                    if (isDefined(configValue)) {
                        return configValue;
                    }
                    return originalValue;
                },
                set: (newValue) => {
                    // if the newValue is undefined, we also consider it as not assigned by user
                    assignedByUser = isDefined(newValue);
                    value = newValue;
                },
                enumerable: true,
                configurable: true
            });
        });
    };
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NZ_CONFIG, NzConfigService, WithConfig, getStyle, provideNzConfig, registerTheme };
//# sourceMappingURL=ng-zorro-antd-core-config.mjs.map
