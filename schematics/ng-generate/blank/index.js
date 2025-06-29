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
const schematics_2 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const fs_1 = require("fs");
const bootPageHTML = `<!-- NG-ZORRO -->
<a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" style="display: flex;align-items: center;justify-content: center;height: 100%;width: 100%;">
  <img height="300" alt="logo" src="https://img.alicdn.com/tfs/TB1X.qJJgHqK1RjSZFgXXa7JXXa-89-131.svg">
</a>`;
function default_1(options) {
    return (host, context) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, options.project);
        const appHTMLFile = `${project.sourceRoot}/app/app.component.html`;
        const buffer = host.read(appHTMLFile);
        if (!buffer) {
            context.logger.error(`Could not find the project ${appHTMLFile} file inside of the ` + `workspace config`);
            return (0, schematics_2.noop)();
        }
        if ((0, fs_1.existsSync)(appHTMLFile)) {
            const stat = (0, fs_1.statSync)(appHTMLFile);
            if (stat.mtimeMs === stat.ctimeMs) {
                host.overwrite(appHTMLFile, bootPageHTML);
            }
        }
        else {
            host.overwrite(appHTMLFile, bootPageHTML);
        }
        return (0, schematics_2.noop)();
    });
}
//# sourceMappingURL=index.js.map