"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const add_icon_assets_1 = require("./add-icon-assets");
const add_required_modules_1 = require("./add-required-modules");
const add_required_providers_1 = require("./add-required-providers");
const hammerjs_import_1 = require("./hammerjs-import");
const register_locale_1 = require("./register-locale");
const theming_1 = require("./theming");
function default_1(options) {
    return (0, schematics_1.chain)([
        (0, register_locale_1.registerLocale)(options),
        (0, add_required_modules_1.addRequiredModules)(options),
        (0, add_required_providers_1.addRequiredProviders)(options),
        (0, theming_1.addThemeToAppStyles)(options),
        options.dynamicIcon ? (0, add_icon_assets_1.addIconToAssets)(options) : (0, schematics_1.noop)(),
        options.gestures ? (0, hammerjs_import_1.hammerjsImport)(options) : (0, schematics_1.noop)()
    ]);
}
//# sourceMappingURL=index.js.map