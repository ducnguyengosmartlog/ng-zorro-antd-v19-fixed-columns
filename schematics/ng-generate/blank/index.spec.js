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
const testing_1 = require("@angular-devkit/schematics/testing");
const test_app_1 = require("../../testing/test-app");
describe('ng-component schematic', () => {
    const defaultOptions = {
        project: 'ng-zorro',
    };
    let runner;
    let appTree;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../../collection.json'));
        appTree = yield (0, test_app_1.createTestApp)(runner);
    }));
    it('should update app.component.html', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const appComponentHTMLPath = '/projects/ng-zorro/src/app/app.component.html';
        const tree = yield runner.runSchematic('blank', options, appTree);
        const appComponentHTML = tree.readContent(appComponentHTMLPath);
        const files = tree.files;
        expect(files).toEqual(jasmine.arrayContaining([appComponentHTMLPath]));
        expect(appComponentHTML).toContain('href="https://github.com/NG-ZORRO/ng-zorro-antd"');
    }));
});
//# sourceMappingURL=index.spec.js.map