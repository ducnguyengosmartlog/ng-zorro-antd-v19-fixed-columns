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
exports.buildComponent = buildComponent;
const schematics_1 = require("@angular/cdk/schematics");
const core_1 = require("@angular-devkit/core");
const schematics_2 = require("@angular-devkit/schematics");
const schema_1 = require("@schematics/angular/component/schema");
const ts = require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const find_module_1 = require("@schematics/angular/utility/find-module");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const validation_1 = require("@schematics/angular/utility/validation");
const workspace_1 = require("@schematics/angular/utility/workspace");
const workspace_models_1 = require("@schematics/angular/utility/workspace-models");
const fs_1 = require("fs");
const path_1 = require("path");
function findClassDeclarationParent(node) {
    if (ts.isClassDeclaration(node)) {
        return node;
    }
    return node.parent && findClassDeclarationParent(node.parent);
}
function getFirstNgModuleName(source) {
    // First, find the @NgModule decorators.
    const ngModulesMetadata = (0, ast_utils_1.getDecoratorMetadata)(source, 'NgModule', '@angular/core');
    if (ngModulesMetadata.length === 0) {
        return undefined;
    }
    // Then walk parent pointers up the AST, looking for the ClassDeclaration parent of the NgModule
    // metadata.
    const moduleClass = findClassDeclarationParent(ngModulesMetadata[0]);
    if (!moduleClass || !moduleClass.name) {
        return undefined;
    }
    // Get the class name of the module ClassDeclaration.
    return moduleClass.name.text;
}
/**
 * Build a default project path for generating.
 *
 * @param project The project to build the path for.
 */
function buildDefaultPath(project) {
    const root = project.sourceRoot ? `/${project.sourceRoot}/` : `/${project.root}/src/`;
    const projectDirName = project.extensions['projectType'] === workspace_models_1.ProjectType.Application ? 'app' : 'lib';
    return `${root}${projectDirName}`;
}
/**
 * List of style extensions which are CSS compatible. All supported CLI style extensions can be
 * found here: angular/angular-cli/master/packages/schematics/angular/ng-new/schema.json#L118-L122
 */
const supportedCssExtensions = ['css', 'scss', 'sass', 'less', 'none'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readIntoSourceFile(host, modulePath) {
    const text = host.read(modulePath);
    if (text === null) {
        throw new schematics_2.SchematicsException(`File ${modulePath} does not exist.`);
    }
    return ts.createSourceFile(modulePath, text.toString('utf-8'), ts.ScriptTarget.Latest, true);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getModuleClassnamePrefix(source) {
    var _a;
    const className = getFirstNgModuleName(source);
    if (className) {
        const execArray = /(\w+)Module/gi.exec(className);
        return (_a = execArray === null || execArray === void 0 ? void 0 : execArray[1]) !== null && _a !== void 0 ? _a : null;
    }
    else {
        return null;
    }
}
function addDeclarationToNgModule(options) {
    return (host) => {
        if (options.skipImport || options.standalone || !options.module) {
            return host;
        }
        const modulePath = options.module;
        let source = readIntoSourceFile(host, modulePath);
        const componentPath = `/${options.path}/${options.flat ? '' : `${core_1.strings.dasherize(options.name)}/`}${core_1.strings.dasherize(options.name)}.component`;
        const relativePath = (0, find_module_1.buildRelativePath)(modulePath, componentPath);
        let classifiedName = core_1.strings.classify(`${options.name}Component`);
        if (options.classnameWithModule) {
            const modulePrefix = getModuleClassnamePrefix(source);
            if (modulePrefix) {
                classifiedName = `${modulePrefix}${classifiedName}`;
            }
        }
        const declarationChanges = (0, ast_utils_1.addDeclarationToModule)(source, modulePath, classifiedName, relativePath);
        const declarationRecorder = host.beginUpdate(modulePath);
        for (const change of declarationChanges) {
            if (change instanceof change_1.InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);
        if (options.export) {
            // Need to refresh the AST because we overwrote the file in the host.
            source = readIntoSourceFile(host, modulePath);
            const exportRecorder = host.beginUpdate(modulePath);
            const exportChanges = (0, ast_utils_1.addExportToModule)(source, modulePath, core_1.strings.classify(`${options.name}Component`), relativePath);
            for (const change of exportChanges) {
                if (change instanceof change_1.InsertChange) {
                    exportRecorder.insertLeft(change.pos, change.toAdd);
                }
            }
            host.commitUpdate(exportRecorder);
        }
        return host;
    };
}
function buildSelector(options, projectPrefix, modulePrefixName) {
    let selector = core_1.strings.dasherize(options.name);
    let modulePrefix = '';
    if (modulePrefixName) {
        modulePrefix = `${core_1.strings.dasherize(modulePrefixName)}-`;
    }
    if (options.prefix) {
        selector = `${options.prefix}-${modulePrefix}${selector}`;
    }
    else if (options.prefix === undefined && projectPrefix) {
        selector = `${projectPrefix}-${modulePrefix}${selector}`;
    }
    return selector;
}
/**
 * Indents the text content with the amount of specified spaces. The spaces will be added after
 * every line-break. This utility function can be used inside EJS templates to properly
 * include the additional files.
 */
function indentTextContent(text, numSpaces) {
    // In the Material project there should be only LF line-endings, but the schematic files
    // are not being linted and therefore there can be also CRLF or just CR line-endings.
    return text.replace(/(\r\n|\r|\n)/g, `$1${' '.repeat(numSpaces)}`);
}
/**
 * Rule that copies and interpolates the files that belong to this schematic context. Additionally
 * a list of file paths can be passed to this rule in order to expose them inside the EJS
 * template context.
 *
 * This allows inlining the external template or stylesheet files in EJS without having
 * to manually duplicate the file content.
 */
function buildComponent(options, additionalFiles = {}) {
    return (host, context) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, options.project);
        const defaultZorroComponentOptions = (0, schematics_1.getDefaultComponentOptions)(project);
        let modulePrefix = '';
        // TODO(devversion): Remove if we drop support for older CLI versions.
        // This handles an unreported breaking change from the @angular-devkit/schematics. Previously
        // the description path resolved to the factory file, but starting from 6.2.0, it resolves
        // to the factory directory.
        const schematicPath = (0, fs_1.statSync)(context.schematic.description.path).isDirectory()
            ? context.schematic.description.path
            : (0, path_1.dirname)(context.schematic.description.path);
        const schematicFilesUrl = './files';
        const schematicFilesPath = (0, path_1.resolve)(schematicPath, schematicFilesUrl);
        options.style = options.style || schema_1.Style.Css;
        // Add the default component option values to the options if an option is not explicitly
        // specified but a default component option is available.
        Object.keys(options)
            .filter(optionName => options[optionName] == null && defaultZorroComponentOptions[optionName])
            .forEach(optionName => (options[optionName] = defaultZorroComponentOptions[optionName]));
        if (options.path === undefined) {
            options.path = buildDefaultPath(project);
        }
        options.standalone = yield (0, schematics_1.isStandaloneSchematic)(host, options);
        if (!options.standalone) {
            options.module = (0, find_module_1.findModuleFromOptions)(host, options);
        }
        const parsedPath = (0, parse_name_1.parseName)(options.path, options.name);
        if (options.classnameWithModule && !options.skipImport && options.module) {
            const source = readIntoSourceFile(host, options.module);
            modulePrefix = getModuleClassnamePrefix(source);
        }
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        options.selector = options.selector || buildSelector(options, project.prefix, modulePrefix);
        (0, validation_1.validateHtmlSelector)(options.selector);
        const skipStyleFile = options.inlineStyle || options.style === schema_1.Style.None;
        // In case the specified style extension is not part of the supported CSS supersets,
        // we generate the stylesheets with the "css" extension. This ensures that we don't
        // accidentally generate invalid stylesheets (e.g. drag-drop-comp.styl) which will
        // break the Angular CLI project. See: https://github.com/angular/components/issues/15164
        if (!skipStyleFile && !supportedCssExtensions.includes(options.style)) {
            options.style = schema_1.Style.Css;
        }
        const classifyCovered = (name) => {
            return `${modulePrefix}${core_1.strings.classify(name)}`;
        };
        // Object that will be used as context for the EJS templates.
        const baseTemplateContext = Object.assign(Object.assign(Object.assign({}, core_1.strings), { 'if-flat': (s) => (options.flat ? '' : s), classify: classifyCovered }), options);
        // Key-value object that includes the specified additional files with their loaded content.
        // The resolved contents can be used inside EJS templates.
        const resolvedFiles = {};
        for (const key in additionalFiles) {
            if (additionalFiles[key]) {
                const fileContent = (0, fs_1.readFileSync)((0, path_1.join)(schematicFilesPath, additionalFiles[key]), 'utf-8');
                // Interpolate the additional files with the base EJS template context.
                resolvedFiles[key] = (0, core_1.template)(fileContent)(baseTemplateContext);
            }
        }
        const templateSource = (0, schematics_2.apply)((0, schematics_2.url)(schematicFilesUrl), [
            options.skipTests ? (0, schematics_2.filter)(path => !path.endsWith('.spec.ts.template')) : (0, schematics_2.noop)(),
            skipStyleFile ? (0, schematics_2.filter)(path => !path.endsWith('.__style__.template')) : (0, schematics_2.noop)(),
            options.inlineTemplate ? (0, schematics_2.filter)(path => !path.endsWith('.html.template')) : (0, schematics_2.noop)(),
            // Treat the template options as any, because the type definition for the template options
            // is made unnecessarily explicit. Every type of object can be used in the EJS template.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (0, schematics_2.applyTemplates)(Object.assign({ indentTextContent, resolvedFiles }, baseTemplateContext)),
            // TODO(devversion): figure out why we cannot just remove the first parameter
            // See for example: angular-cli#schematics/angular/component/index.ts#L160
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (0, schematics_2.move)(null, parsedPath.path)
        ]);
        return () => (0, schematics_2.chain)([(0, schematics_2.branchAndMerge)((0, schematics_2.chain)([addDeclarationToNgModule(options), (0, schematics_2.mergeWith)(templateSource)]))])(host, context);
    });
}
//# sourceMappingURL=build-component.js.map