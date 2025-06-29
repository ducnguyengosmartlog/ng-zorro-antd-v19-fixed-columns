"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputNamesMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const upgrade_data_1 = require("../upgrade-data");
/**
 * Migration that walks through every template or stylesheet and replaces outdated input
 * names to the new input name. Selectors in stylesheets could also target input
 * bindings declared as static attribute. See for example:
 *
 * e.g. `<my-component color="primary">` becomes `my-component[color]`
 */
class InputNamesMigration extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        /** Change data that upgrades to the specified target version. */
        this.data = (0, upgrade_data_1.getVersionUpgradeData)(this, 'inputNames');
        // Only enable the migration rule if there is upgrade data.
        this.enabled = this.data.length !== 0;
    }
    visitStylesheet(stylesheet) {
        this.data.forEach(name => {
            const currentSelector = `[${name.replace}]`;
            const updatedSelector = `[${name.replaceWith}]`;
            (0, schematics_1.findAllSubstringIndices)(stylesheet.content, currentSelector)
                .map(offset => stylesheet.start + offset)
                .forEach(start => this._replaceInputName(stylesheet.filePath, start, currentSelector.length, updatedSelector));
        });
    }
    visitTemplate(template) {
        this.data.forEach(name => {
            const limitedTo = name.limitedTo;
            const relativeOffsets = [];
            if (limitedTo.attributes) {
                relativeOffsets.push(...(0, schematics_1.findInputsOnElementWithAttr)(template.content, name.replace, limitedTo.attributes));
            }
            if (limitedTo.elements) {
                relativeOffsets.push(...(0, schematics_1.findInputsOnElementWithTag)(template.content, name.replace, limitedTo.elements));
            }
            relativeOffsets
                .map(offset => template.start + offset)
                .forEach(start => this._replaceInputName(template.filePath, start, name.replace.length, name.replaceWith));
        });
    }
    _replaceInputName(filePath, start, width, newName) {
        this.fileSystem.edit(filePath).remove(start, width).insertRight(start, newName);
    }
}
exports.InputNamesMigration = InputNamesMigration;
//# sourceMappingURL=input-names.js.map