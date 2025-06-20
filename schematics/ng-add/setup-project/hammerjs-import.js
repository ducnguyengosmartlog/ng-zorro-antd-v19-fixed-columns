"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hammerjsImport = hammerjsImport;
const schematics_1 = require("@angular/cdk/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const chalk_1 = require("chalk");
const hammerjsImportStatement = `import 'hammerjs';`;
/** Adds HammerJS to the main file of the specified Angular CLI project. */
function hammerjsImport(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, options.project);
        const mainFile = (0, schematics_1.getProjectMainFile)(project);
        const recorder = host.beginUpdate(mainFile);
        const buffer = host.read(mainFile);
        if (!buffer) {
            console.log();
            console.error((0, chalk_1.red)(`Could not read the project main file (${(0, chalk_1.blue)(mainFile)}). Please manually ` +
                `import HammerJS in your main TypeScript file.`));
            return;
        }
        const fileContent = buffer.toString('utf8');
        if (fileContent.includes(hammerjsImportStatement)) {
            console.log();
            console.log(`HammerJS is already imported in the project main file (${(0, chalk_1.blue)(mainFile)}).`);
            return;
        }
        recorder.insertRight(0, `${hammerjsImportStatement}\n`);
        host.commitUpdate(recorder);
    });
}
//# sourceMappingURL=hammerjs-import.js.map