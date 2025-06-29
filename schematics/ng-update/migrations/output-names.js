"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputNamesMigration = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const upgrade_data_1 = require("../upgrade-data");
/**
 * Migration that walks through every inline or external HTML template and switches
 * changed output binding names to the proper new output name.
 */
class OutputNamesMigration extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        /** Change data that upgrades to the specified target version. */
        this.data = (0, upgrade_data_1.getVersionUpgradeData)(this, 'outputNames');
        // Only enable the migration rule if there is upgrade data.
        this.enabled = this.data.length !== 0;
    }
    visitTemplate(template) {
        this.data.forEach(name => {
            const limitedTo = name.limitedTo;
            const relativeOffsets = [];
            if (limitedTo.attributes) {
                relativeOffsets.push(...(0, schematics_1.findOutputsOnElementWithAttr)(template.content, name.replace, limitedTo.attributes));
            }
            if (limitedTo.elements) {
                relativeOffsets.push(...(0, schematics_1.findOutputsOnElementWithTag)(template.content, name.replace, limitedTo.elements));
            }
            relativeOffsets
                .map(offset => template.start + offset)
                .forEach(start => this._replaceOutputName(template.filePath, start, name.replace.length, name.replaceWith));
        });
    }
    _replaceOutputName(filePath, start, width, newName) {
        this.fileSystem.edit(filePath).remove(start, width).insertRight(start, newName);
    }
}
exports.OutputNamesMigration = OutputNamesMigration;
//# sourceMappingURL=output-names.js.map