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
const schema_1 = require("@schematics/angular/ng-new/schema");
const test_app_1 = require("../../testing/test-app");
const get_file_content_1 = require("../../utils/get-file-content");
describe('top-nav schematic', () => {
    const defaultOptions = {
        project: 'ng-zorro-top-nav'
    };
    let runner;
    let appTree;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../../collection.json'));
        appTree = yield (0, test_app_1.createTestApp)(runner, { name: 'ng-zorro-top-nav', standalone: false });
    }));
    it('should create top-nav files', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const tree = yield runner.runSchematic('topnav', options, appTree);
        const files = tree.files;
        expect(files).toEqual(jasmine.arrayContaining([
            '/projects/ng-zorro-top-nav/src/app/app.component.html',
            '/projects/ng-zorro-top-nav/src/app/app.component.css',
            '/projects/ng-zorro-top-nav/src/app/app.component.ts',
            '/projects/ng-zorro-top-nav/src/app/app-routing.module.ts',
            '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome-routing.module.ts',
            '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts',
            '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.css',
            '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.html'
        ]));
    }));
    it('should set the style preprocessor correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { style: schema_1.Style.Less });
        const tree = yield runner.runSchematic('topnav', options, appTree);
        const files = tree.files;
        const appContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro-top-nav/src/app/app.component.ts');
        const welcomeContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts');
        expect(appContent).toContain('app.component.less');
        expect(welcomeContent).toContain('welcome.component.less');
        expect(files).toEqual(jasmine.arrayContaining([
            '/projects/ng-zorro-top-nav/src/app/app.component.less',
            '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.less'
        ]));
    }));
    it('should set the prefix correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { prefix: 'nz' });
        const tree = yield runner.runSchematic('topnav', options, appTree);
        const appContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro-top-nav/src/app/app.component.ts');
        const welcomeContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts');
        expect(appContent).toContain(`selector: 'nz-root'`);
        expect(welcomeContent).toContain(`selector: 'nz-welcome'`);
    }));
    it('should set standalone to be false', () => __awaiter(void 0, void 0, void 0, function* () {
        const tree = yield runner.runSchematic('topnav', defaultOptions, appTree);
        const appContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro-top-nav/src/app/app.component.ts');
        const welcomeContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts');
        expect(appContent).toContain('standalone: false');
        expect(welcomeContent).toContain('standalone: false');
    }));
});
//# sourceMappingURL=index.spec.js.map