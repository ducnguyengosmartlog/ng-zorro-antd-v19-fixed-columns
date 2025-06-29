/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { InjectionToken, EnvironmentProviders } from '@angular/core';
import { NzI18nInterface } from './nz-i18n.interface';
export declare const NZ_I18N: InjectionToken<NzI18nInterface>;
export declare function provideNzI18n(config: NzI18nInterface): EnvironmentProviders;
/** Locale for date operations, should import from date-fns, see example: https://github.com/date-fns/date-fns/blob/v1.30.1/src/locale/zh_cn/index.js */
export declare const NZ_DATE_LOCALE: InjectionToken<Locale>;
