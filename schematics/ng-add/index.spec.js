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
const schematics_1 = require("@angular/cdk/schematics");
const core_1 = require("@angular-devkit/core");
const options_1 = require("@angular-devkit/schematics/tasks/package-manager/options");
const testing_1 = require("@angular-devkit/schematics/testing");
const workspace_1 = require("@schematics/angular/utility/workspace");
const path_1 = require("path");
const test_app_1 = require("../testing/test-app");
const create_custom_theme_1 = require("../utils/create-custom-theme");
const get_file_content_1 = require("../utils/get-file-content");
describe('ng-add schematic', () => {
    const defaultOptions = {
        project: 'ng-zorro'
    };
    let runner;
    let appTree;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../collection.json'));
        appTree = yield (0, test_app_1.createTestApp)(runner, { standalone: false });
    }));
    it('should update package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const tree = yield runner.runSchematic('ng-add', options, appTree);
        const packageJson = JSON.parse((0, get_file_content_1.getFileContent)(tree, '/package.json'));
        const dependencies = packageJson.dependencies;
        expect(dependencies['ng-zorro-antd']).toBeDefined();
        expect(runner.tasks.some(task => task.name === options_1.NodePackageName)).toBe(true);
    }));
    it('should add hammerjs to package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { gestures: true });
        const tree = yield runner.runSchematic('ng-add', options, appTree);
        const packageJson = JSON.parse((0, get_file_content_1.getFileContent)(tree, '/package.json'));
        const dependencies = packageJson.dependencies;
        expect(dependencies.hammerjs).toBeDefined();
    }));
    it('should skip package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { skipPackageJson: true });
        const tree = yield runner.runSchematic('ng-add', options, appTree);
        const packageJson = JSON.parse((0, get_file_content_1.getFileContent)(tree, '/package.json'));
        const dependencies = packageJson.dependencies;
        expect(dependencies['ng-zorro-antd']).toBeUndefined();
    }));
    it('should skip install dependency package', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { skipInstall: true });
        yield runner.runSchematic('ng-add', options, appTree);
        expect(runner.tasks.some(task => task.name === options_1.NodePackageName)).toBe(false);
    }));
    it('should add hammerjs import to project main file', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { gestures: true });
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, defaultOptions.project);
        const fileContent = (0, get_file_content_1.getFileContent)(tree, (0, core_1.normalize)((0, path_1.join)(project.sourceRoot, 'main.ts')));
        expect(fileContent).toContain(`import 'hammerjs';`);
    }));
    it('should add default theme', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, defaultOptions.project);
        expect((0, schematics_1.getProjectTargetOptions)(project, 'build').styles).toContain('./node_modules/ng-zorro-antd/ng-zorro-antd.min.css');
    }));
    it('should add custom theme', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: true });
        appTree = yield (0, test_app_1.createTestApp)(runner, { style: 'less', standalone: false });
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, defaultOptions.project);
        const customThemePath = (0, core_1.normalize)((0, path_1.join)(project.sourceRoot, 'styles.less'));
        const buffer = tree.read(customThemePath);
        const themeContent = buffer.toString();
        expect(themeContent).toContain((0, create_custom_theme_1.createCustomTheme)());
        expect((0, schematics_1.getProjectTargetOptions)(project, 'build').styles).toContain('projects/ng-zorro/src/styles.less');
    }));
    it('should add custom theme file when no LESS file in project', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { theme: true });
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, defaultOptions.project);
        expect((0, schematics_1.getProjectTargetOptions)(project, 'build').styles).toContain('projects/ng-zorro/src/theme.less');
    }));
    it('should add icon assets', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { dynamicIcon: true });
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, defaultOptions.project);
        const assets = (0, schematics_1.getProjectTargetOptions)(project, 'build').assets;
        const assetsString = JSON.stringify(assets);
        const iconPathSegment = '@ant-design/icons-angular';
        expect(assetsString).toContain(iconPathSegment);
    }));
    it('should required modules and providers', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const fileContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro/src/app/app.module.ts');
        expect(fileContent).toContain('provideHttpClient()');
        expect(fileContent).toContain('FormsModule');
    }));
    it('should add provideAnimationsAsync() function call if animations is enable', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { animations: true });
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const fileContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro/src/app/app.module.ts');
        expect(fileContent).toContain('provideAnimationsAsync()');
    }));
    it(`should add provideAnimationsAsync('noop') function call if animations is disable`, () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { animations: false });
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const fileContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro/src/app/app.module.ts');
        expect(fileContent).toContain(`provideAnimationsAsync('noop')`);
    }));
    it('should register default locale id', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const fileContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro/src/app/app.module.ts');
        expect(fileContent).not.toContain('NZ_I18N');
        expect(fileContent).toContain('provideNzI18n(en_US)');
        expect(fileContent).toContain('registerLocaleData(en)');
    }));
    it('should register specified locale id', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { locale: 'zh_CN' });
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const fileContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro/src/app/app.module.ts');
        expect(fileContent).not.toContain('NZ_I18N');
        expect(fileContent).toContain('provideNzI18n(zh_CN)');
        expect(fileContent).toContain('registerLocaleData(zh)');
    }));
    /**
     * Test skip because it seems that it's not possible anymore to call the runSchematics method twice in the same test.
     * error: getStart of undefined
     */
    xit('should not add locale id if locale id is set up', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { i18n: 'zh_CN' });
        yield runner.runSchematic('ng-add-setup-project', Object.assign({}, defaultOptions), appTree);
        spyOn(console, 'log');
        const tree = yield runner.runSchematic('ng-add-setup-project', options, appTree);
        const fileContent = (0, get_file_content_1.getFileContent)(tree, '/projects/ng-zorro/src/app/app.module.ts');
        expect(fileContent).toContain('provideNzI18n(en_US)');
        expect(fileContent).toContain('registerLocaleData(en)');
        expect(fileContent).not.toContain('NZ_I18N');
        expect(fileContent).not.toContain('provideNzI18n(zh_CN)');
        expect(fileContent).not.toContain('registerLocaleData(zh)');
        expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Could not add the registerLocaleData to file/));
    }));
});
//# sourceMappingURL=index.spec.js.map