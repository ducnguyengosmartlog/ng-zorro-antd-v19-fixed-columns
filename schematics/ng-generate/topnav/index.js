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
exports.default = default_1;
const schematics_1 = require("@angular/cdk/schematics");
const core_1 = require("@angular-devkit/core");
const schematics_2 = require("@angular-devkit/schematics");
const schema_1 = require("@schematics/angular/application/schema");
const workspace_1 = require("@schematics/angular/utility/workspace");
const root_module_1 = require("../../utils/root-module");
function default_1(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, options.project);
        const mainFile = (0, schematics_1.getProjectMainFile)(project);
        const prefix = options.prefix || project.prefix;
        const style = options.style || schema_1.Style.Css;
        if ((0, schematics_1.isStandaloneApp)(host, mainFile)) {
            return (0, schematics_2.chain)([
                (0, schematics_2.mergeWith)((0, schematics_2.apply)((0, schematics_2.url)('./standalone/src'), [
                    (0, schematics_2.applyTemplates)(Object.assign(Object.assign({ prefix,
                        style }, core_1.strings), options)),
                    (0, schematics_2.move)(project.sourceRoot),
                    (0, schematics_2.forEach)((fileEntry) => {
                        if (host.exists(fileEntry.path)) {
                            host.overwrite(fileEntry.path, fileEntry.content);
                        }
                        return fileEntry;
                    })
                ]), schematics_2.MergeStrategy.Overwrite)
            ]);
        }
        else {
            return (0, schematics_2.chain)([
                (0, schematics_2.mergeWith)((0, schematics_2.apply)((0, schematics_2.url)('./files/src'), [
                    (0, schematics_2.applyTemplates)(Object.assign(Object.assign({ prefix,
                        style }, core_1.strings), options)),
                    (0, schematics_2.move)(project.sourceRoot),
                    (0, schematics_2.forEach)((fileEntry) => {
                        if (host.exists(fileEntry.path)) {
                            host.overwrite(fileEntry.path, fileEntry.content);
                        }
                        return fileEntry;
                    })
                ]), schematics_2.MergeStrategy.Overwrite),
                (0, root_module_1.addModule)('AppRoutingModule', './app-routing.module', options.project)
            ]);
        }
    });
}
//# sourceMappingURL=index.js.map