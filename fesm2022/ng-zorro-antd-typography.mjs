import * as i0 from '@angular/core';
import { inject, ElementRef, EventEmitter, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, Injector, afterNextRender, ViewChild, numberAttribute, booleanAttribute, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil, switchMap, first } from 'rxjs/operators';
import * as i6 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i4 from 'ng-zorro-antd/core/trans-button';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import * as i5 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i3 from 'ng-zorro-antd/tooltip';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import * as i1 from '@angular/cdk/clipboard';
import * as i2 from 'ng-zorro-antd/i18n';
import { ESCAPE, ENTER } from '@angular/cdk/keycodes';
import * as i2$1 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular, isStyleSupport, measure } from 'ng-zorro-antd/core/util';
import * as i3$1 from 'ng-zorro-antd/input';
import { NzInputModule, NzAutosizeDirective } from 'ng-zorro-antd/input';
import { __esDecorate, __runInitializers } from 'tslib';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import * as i1$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { cancelRequestAnimationFrame, reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import * as i2$2 from '@angular/cdk/platform';
import * as i5$1 from '@angular/cdk/bidi';

class NzTextCopyComponent {
    cdr;
    clipboard;
    i18n;
    copied = false;
    copyId;
    locale;
    nativeElement = inject(ElementRef).nativeElement;
    copyTooltip = null;
    copedTooltip = null;
    copyIcon = 'copy';
    copedIcon = 'check';
    destroy$ = new Subject();
    text;
    tooltips;
    icons = ['copy', 'check'];
    textCopy = new EventEmitter();
    constructor(cdr, clipboard, i18n) {
        this.cdr = cdr;
        this.clipboard = clipboard;
        this.i18n = i18n;
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.updateTooltips();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { tooltips, icons } = changes;
        if (tooltips) {
            this.updateTooltips();
        }
        if (icons) {
            this.updateIcons();
        }
    }
    ngOnDestroy() {
        clearTimeout(this.copyId);
        this.destroy$.next(true);
        this.destroy$.complete();
    }
    onClick() {
        if (this.copied) {
            return;
        }
        this.copied = true;
        this.cdr.detectChanges();
        const text = this.text;
        this.textCopy.emit(text);
        this.clipboard.copy(text);
        this.onCopied();
    }
    onCopied() {
        clearTimeout(this.copyId);
        this.copyId = setTimeout(() => {
            this.copied = false;
            this.cdr.detectChanges();
        }, 3000);
    }
    updateTooltips() {
        if (this.tooltips === null) {
            this.copedTooltip = null;
            this.copyTooltip = null;
        }
        else if (Array.isArray(this.tooltips)) {
            const [copyTooltip, copedTooltip] = this.tooltips;
            this.copyTooltip = copyTooltip || this.locale?.copy;
            this.copedTooltip = copedTooltip || this.locale?.copied;
        }
        else {
            this.copyTooltip = this.locale?.copy;
            this.copedTooltip = this.locale?.copied;
        }
        this.cdr.markForCheck();
    }
    updateIcons() {
        const [copyIcon, copedIcon] = this.icons;
        this.copyIcon = copyIcon;
        this.copedIcon = copedIcon;
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTextCopyComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.Clipboard }, { token: i2.NzI18nService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.2", type: NzTextCopyComponent, isStandalone: true, selector: "nz-text-copy", inputs: { text: "text", tooltips: "tooltips", icons: "icons" }, outputs: { textCopy: "textCopy" }, exportAs: ["nzTextCopy"], usesOnChanges: true, ngImport: i0, template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <nz-icon [nzType]="icon" />
      </ng-container>
    </button>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzToolTipModule }, { kind: "directive", type: i3.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "ngmodule", type: NzTransButtonModule }, { kind: "directive", type: i4.NzTransButtonDirective, selector: "button[nz-trans-button]" }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i5.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTextCopyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-text-copy',
                    exportAs: 'nzTextCopy',
                    template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <nz-icon [nzType]="icon" />
      </ng-container>
    </button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    imports: [NzToolTipModule, NzTransButtonModule, NzIconModule, NzOutletModule]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.Clipboard }, { type: i2.NzI18nService }], propDecorators: { text: [{
                type: Input
            }], tooltips: [{
                type: Input
            }], icons: [{
                type: Input
            }], textCopy: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTextEditComponent {
    ngZone;
    cdr;
    i18n;
    destroy$;
    editing = false;
    locale;
    text;
    icon = 'edit';
    tooltip;
    startEditing = new EventEmitter();
    endEditing = new EventEmitter(true);
    set textarea(textarea) {
        this.textarea$.next(textarea);
    }
    autosizeDirective;
    beforeText;
    currentText;
    nativeElement = inject(ElementRef).nativeElement;
    // We could've saved the textarea within some private property (e.g. `_textarea`) and have a getter,
    // but having subject makes the code more reactive and cancellable (e.g. event listeners will be
    // automatically removed and re-added through the `switchMap` below).
    textarea$ = new BehaviorSubject(null);
    injector = inject(Injector);
    constructor(ngZone, cdr, i18n, destroy$) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.i18n = i18n;
        this.destroy$ = destroy$;
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.cdr.markForCheck();
        });
        this.textarea$
            .pipe(switchMap(textarea => fromEventOutsideAngular(textarea?.nativeElement, 'keydown')), takeUntil(this.destroy$))
            .subscribe(event => {
            // Caretaker note: adding modifier at the end (for instance `(keydown.esc)`) will tell Angular to add
            // an event listener through the `KeyEventsPlugin`, which always runs `ngZone.runGuarded()` internally.
            // We're interested only in escape and enter keyboard buttons, otherwise Angular will run change detection
            // on any `keydown` event.
            if (event.keyCode !== ESCAPE && event.keyCode !== ENTER) {
                return;
            }
            this.ngZone.run(() => {
                if (event.keyCode === ESCAPE) {
                    this.onCancel();
                }
                else {
                    this.onEnter(event);
                }
                this.cdr.markForCheck();
            });
        });
        this.textarea$
            .pipe(switchMap(textarea => fromEventOutsideAngular(textarea?.nativeElement, 'input')), takeUntil(this.destroy$))
            .subscribe(event => {
            this.currentText = event.target.value;
        });
    }
    onClick() {
        this.beforeText = this.text;
        this.currentText = this.beforeText;
        this.editing = true;
        this.startEditing.emit();
        this.focusAndSetValue();
    }
    confirm() {
        this.editing = false;
        this.endEditing.emit(this.currentText);
    }
    onEnter(event) {
        event.stopPropagation();
        event.preventDefault();
        this.confirm();
    }
    onCancel() {
        this.currentText = this.beforeText;
        this.confirm();
    }
    focusAndSetValue() {
        const { injector } = this;
        afterNextRender(() => {
            this.textarea$
                .pipe(
            // It may still not be available, so we need to wait until view queries
            // are executed during the change detection. It's safer to wait until
            // the query runs and the textarea is set on the behavior subject.
            first((textarea) => textarea != null), takeUntil(this.destroy$))
                .subscribe(textarea => {
                textarea.nativeElement.focus();
                textarea.nativeElement.value = this.currentText || '';
                this.autosizeDirective.resizeToFitContent();
                this.cdr.markForCheck();
            });
        }, { injector });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTextEditComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.NzI18nService }, { token: i2$1.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTextEditComponent, isStandalone: true, selector: "nz-text-edit", inputs: { text: "text", icon: "icon", tooltip: "tooltip" }, outputs: { startEditing: "startEditing", endEditing: "endEditing" }, providers: [NzDestroyService], viewQueries: [{ propertyName: "textarea", first: true, predicate: ["textarea"], descendants: true }, { propertyName: "autosizeDirective", first: true, predicate: NzAutosizeDirective, descendants: true }], exportAs: ["nzTextEdit"], ngImport: i0, template: `
    @if (editing) {
      <textarea #textarea nz-input nzAutosize (blur)="confirm()"></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <nz-icon nzType="enter" />
      </button>
    } @else {
      <button
        nz-tooltip
        nz-trans-button
        class="ant-typography-edit"
        [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
        (click)="onClick()"
      >
        <ng-container *nzStringTemplateOutlet="icon; let icon">
          <nz-icon [nzType]="icon" />
        </ng-container>
      </button>
    }
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: NzInputModule }, { kind: "directive", type: i3$1.NzInputDirective, selector: "input[nz-input],textarea[nz-input]", inputs: ["nzBorderless", "nzSize", "nzStepperless", "nzStatus", "disabled"], exportAs: ["nzInput"] }, { kind: "directive", type: i3$1.NzAutosizeDirective, selector: "textarea[nzAutosize]", inputs: ["nzAutosize"], exportAs: ["nzAutosize"] }, { kind: "ngmodule", type: NzTransButtonModule }, { kind: "directive", type: i4.NzTransButtonDirective, selector: "button[nz-trans-button]" }, { kind: "ngmodule", type: NzIconModule }, { kind: "directive", type: i5.NzIconDirective, selector: "nz-icon,[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { kind: "ngmodule", type: NzToolTipModule }, { kind: "directive", type: i3.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "cdkConnectedOverlayPush", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { kind: "ngmodule", type: NzOutletModule }, { kind: "directive", type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTextEditComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-text-edit',
                    exportAs: 'nzTextEdit',
                    template: `
    @if (editing) {
      <textarea #textarea nz-input nzAutosize (blur)="confirm()"></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <nz-icon nzType="enter" />
      </button>
    } @else {
      <button
        nz-tooltip
        nz-trans-button
        class="ant-typography-edit"
        [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
        (click)="onClick()"
      >
        <ng-container *nzStringTemplateOutlet="icon; let icon">
          <nz-icon [nzType]="icon" />
        </ng-container>
      </button>
    }
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    providers: [NzDestroyService],
                    imports: [NzInputModule, NzTransButtonModule, NzIconModule, NzToolTipModule, NzOutletModule]
                }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.NzI18nService }, { type: i2$1.NzDestroyService }], propDecorators: { text: [{
                type: Input
            }], icon: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], startEditing: [{
                type: Output
            }], endEditing: [{
                type: Output
            }], textarea: [{
                type: ViewChild,
                args: ['textarea', { static: false }]
            }], autosizeDirective: [{
                type: ViewChild,
                args: [NzAutosizeDirective, { static: false }]
            }] } });

const NZ_CONFIG_MODULE_NAME = 'typography';
const EXPAND_ELEMENT_CLASSNAME = 'ant-typography-expand';
let NzTypographyComponent = (() => {
    let _nzCopyTooltips_decorators;
    let _nzCopyTooltips_initializers = [];
    let _nzCopyTooltips_extraInitializers = [];
    let _nzCopyIcons_decorators;
    let _nzCopyIcons_initializers = [];
    let _nzCopyIcons_extraInitializers = [];
    let _nzEditTooltip_decorators;
    let _nzEditTooltip_initializers = [];
    let _nzEditTooltip_extraInitializers = [];
    let _nzEditIcon_decorators;
    let _nzEditIcon_initializers = [];
    let _nzEditIcon_extraInitializers = [];
    let _nzEllipsisRows_decorators;
    let _nzEllipsisRows_initializers = [];
    let _nzEllipsisRows_extraInitializers = [];
    return class NzTypographyComponent {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nzCopyTooltips_decorators = [WithConfig()];
            _nzCopyIcons_decorators = [WithConfig()];
            _nzEditTooltip_decorators = [WithConfig()];
            _nzEditIcon_decorators = [WithConfig()];
            _nzEllipsisRows_decorators = [WithConfig()];
            __esDecorate(null, null, _nzCopyTooltips_decorators, { kind: "field", name: "nzCopyTooltips", static: false, private: false, access: { has: obj => "nzCopyTooltips" in obj, get: obj => obj.nzCopyTooltips, set: (obj, value) => { obj.nzCopyTooltips = value; } }, metadata: _metadata }, _nzCopyTooltips_initializers, _nzCopyTooltips_extraInitializers);
            __esDecorate(null, null, _nzCopyIcons_decorators, { kind: "field", name: "nzCopyIcons", static: false, private: false, access: { has: obj => "nzCopyIcons" in obj, get: obj => obj.nzCopyIcons, set: (obj, value) => { obj.nzCopyIcons = value; } }, metadata: _metadata }, _nzCopyIcons_initializers, _nzCopyIcons_extraInitializers);
            __esDecorate(null, null, _nzEditTooltip_decorators, { kind: "field", name: "nzEditTooltip", static: false, private: false, access: { has: obj => "nzEditTooltip" in obj, get: obj => obj.nzEditTooltip, set: (obj, value) => { obj.nzEditTooltip = value; } }, metadata: _metadata }, _nzEditTooltip_initializers, _nzEditTooltip_extraInitializers);
            __esDecorate(null, null, _nzEditIcon_decorators, { kind: "field", name: "nzEditIcon", static: false, private: false, access: { has: obj => "nzEditIcon" in obj, get: obj => obj.nzEditIcon, set: (obj, value) => { obj.nzEditIcon = value; } }, metadata: _metadata }, _nzEditIcon_initializers, _nzEditIcon_extraInitializers);
            __esDecorate(null, null, _nzEllipsisRows_decorators, { kind: "field", name: "nzEllipsisRows", static: false, private: false, access: { has: obj => "nzEllipsisRows" in obj, get: obj => obj.nzEllipsisRows, set: (obj, value) => { obj.nzEllipsisRows = value; } }, metadata: _metadata }, _nzEllipsisRows_initializers, _nzEllipsisRows_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        nzConfigService;
        host;
        cdr;
        viewContainerRef;
        renderer;
        platform;
        i18n;
        resizeService;
        directionality;
        _nzModuleName = NZ_CONFIG_MODULE_NAME;
        nzCopyable = false;
        nzEditable = false;
        nzDisabled = false;
        nzExpandable = false;
        nzEllipsis = false;
        nzCopyTooltips = __runInitializers(this, _nzCopyTooltips_initializers, undefined);
        nzCopyIcons = (__runInitializers(this, _nzCopyTooltips_extraInitializers), __runInitializers(this, _nzCopyIcons_initializers, ['copy', 'check']));
        nzEditTooltip = (__runInitializers(this, _nzCopyIcons_extraInitializers), __runInitializers(this, _nzEditTooltip_initializers, undefined));
        nzEditIcon = (__runInitializers(this, _nzEditTooltip_extraInitializers), __runInitializers(this, _nzEditIcon_initializers, 'edit'));
        nzContent = __runInitializers(this, _nzEditIcon_extraInitializers);
        nzEllipsisRows = __runInitializers(this, _nzEllipsisRows_initializers, 1);
        nzType = __runInitializers(this, _nzEllipsisRows_extraInitializers);
        nzCopyText;
        nzSuffix;
        nzContentChange = new EventEmitter();
        nzCopy = new EventEmitter();
        nzExpandChange = new EventEmitter();
        // This is not a two-way binding output with {@link nzEllipsis}
        nzOnEllipsis = new EventEmitter();
        textEditRef;
        textCopyRef;
        ellipsisContainer;
        expandableBtn;
        contentTemplate;
        locale;
        document = inject(DOCUMENT);
        expandableBtnElementCache = null;
        editing = false;
        ellipsisText;
        cssEllipsis = false;
        isEllipsis = true;
        expanded = false;
        ellipsisStr = '...';
        dir = 'ltr';
        get hasEllipsisObservers() {
            return this.nzOnEllipsis.observers.length > 0;
        }
        get canCssEllipsis() {
            return this.nzEllipsis && this.cssEllipsis && !this.expanded && !this.hasEllipsisObservers;
        }
        get hasOperationsWithEllipsis() {
            return (this.nzCopyable || this.nzEditable || this.nzExpandable) && this.nzEllipsis;
        }
        viewInit = false;
        rfaId = -1;
        destroy$ = new Subject();
        windowResizeSubscription = Subscription.EMPTY;
        get copyText() {
            return (typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent);
        }
        constructor(nzConfigService, host, cdr, viewContainerRef, renderer, platform, i18n, resizeService, directionality) {
            this.nzConfigService = nzConfigService;
            this.host = host;
            this.cdr = cdr;
            this.viewContainerRef = viewContainerRef;
            this.renderer = renderer;
            this.platform = platform;
            this.i18n = i18n;
            this.resizeService = resizeService;
            this.directionality = directionality;
        }
        onTextCopy(text) {
            this.nzCopy.emit(text);
        }
        onStartEditing() {
            this.editing = true;
        }
        onEndEditing(text) {
            this.editing = false;
            this.nzContentChange.emit(text);
            if (this.nzContent === text) {
                this.renderOnNextFrame();
            }
            this.cdr.markForCheck();
        }
        onExpand() {
            this.isEllipsis = false;
            this.expanded = true;
            this.nzExpandChange.emit();
            this.nzOnEllipsis.emit(false);
        }
        canUseCSSEllipsis() {
            if (this.nzEditable || this.nzCopyable || this.nzExpandable || this.nzSuffix) {
                return false;
            }
            // make sure {@link nzOnEllipsis} works, will force use JS to calculations
            if (this.hasEllipsisObservers) {
                return false;
            }
            if (this.nzEllipsisRows === 1) {
                return isStyleSupport('textOverflow');
            }
            else {
                return isStyleSupport('webkitLineClamp');
            }
        }
        renderOnNextFrame() {
            cancelRequestAnimationFrame(this.rfaId);
            if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
                return;
            }
            this.rfaId = reqAnimFrame(() => {
                this.syncEllipsis();
            });
        }
        getOriginContentViewRef() {
            const viewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate, {
                content: this.nzContent
            });
            viewRef.detectChanges();
            return {
                viewRef,
                removeView: () => {
                    this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef));
                }
            };
        }
        syncEllipsis() {
            if (this.cssEllipsis) {
                return;
            }
            const { viewRef, removeView } = this.getOriginContentViewRef();
            const fixedNodes = [this.textCopyRef, this.textEditRef]
                .filter(e => e && e.nativeElement)
                .map(e => e.nativeElement);
            const expandableBtnElement = this.getExpandableBtnElement();
            if (expandableBtnElement) {
                fixedNodes.push(expandableBtnElement);
            }
            const { contentNodes, text, ellipsis } = measure(this.host.nativeElement, this.nzEllipsisRows, viewRef.rootNodes, fixedNodes, this.ellipsisStr, this.nzSuffix);
            removeView();
            this.ellipsisText = text;
            if (ellipsis !== this.isEllipsis) {
                this.isEllipsis = ellipsis;
                this.nzOnEllipsis.emit(ellipsis);
            }
            const ellipsisContainerNativeElement = this.ellipsisContainer.nativeElement;
            while (ellipsisContainerNativeElement.firstChild) {
                this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
            }
            contentNodes.forEach(n => {
                this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
            });
            this.cdr.markForCheck();
        }
        // Need to create the element for calculation size before view init
        getExpandableBtnElement() {
            if (this.nzExpandable) {
                const expandText = this.locale ? this.locale.expand : '';
                const cache = this.expandableBtnElementCache;
                if (!cache || cache.innerText === expandText) {
                    const el = this.document.createElement('a');
                    el.className = EXPAND_ELEMENT_CLASSNAME;
                    el.innerText = expandText;
                    this.expandableBtnElementCache = el;
                }
                return this.expandableBtnElementCache;
            }
            else {
                this.expandableBtnElementCache = null;
                return null;
            }
        }
        renderAndSubscribeWindowResize() {
            if (this.platform.isBrowser) {
                this.windowResizeSubscription.unsubscribe();
                this.cssEllipsis = this.canUseCSSEllipsis();
                this.renderOnNextFrame();
                this.windowResizeSubscription = this.resizeService
                    .subscribe()
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => this.renderOnNextFrame());
            }
        }
        ngOnInit() {
            this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.locale = this.i18n.getLocaleData('Text');
                this.cdr.markForCheck();
            });
            this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
                this.dir = direction;
                this.cdr.detectChanges();
            });
            this.dir = this.directionality.value;
        }
        ngAfterViewInit() {
            this.viewInit = true;
            this.renderAndSubscribeWindowResize();
        }
        ngOnChanges(changes) {
            const { nzCopyable, nzEditable, nzExpandable, nzEllipsis, nzContent, nzEllipsisRows, nzSuffix } = changes;
            if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows || nzSuffix) {
                if (this.nzEllipsis) {
                    if (this.expanded) {
                        this.windowResizeSubscription.unsubscribe();
                    }
                    else {
                        this.renderAndSubscribeWindowResize();
                    }
                }
            }
        }
        ngOnDestroy() {
            this.destroy$.next(true);
            this.destroy$.complete();
            this.expandableBtnElementCache = null;
            this.windowResizeSubscription.unsubscribe();
        }
        static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTypographyComponent, deps: [{ token: i1$1.NzConfigService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i2$2.Platform }, { token: i2.NzI18nService }, { token: i2$1.NzResizeService }, { token: i5$1.Directionality }], target: i0.ɵɵFactoryTarget.Component });
        static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: NzTypographyComponent, isStandalone: true, selector: "\n  nz-typography,\n  [nz-typography],\n  p[nz-paragraph],\n  span[nz-text],\n  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]\n  ", inputs: { nzCopyable: ["nzCopyable", "nzCopyable", booleanAttribute], nzEditable: ["nzEditable", "nzEditable", booleanAttribute], nzDisabled: ["nzDisabled", "nzDisabled", booleanAttribute], nzExpandable: ["nzExpandable", "nzExpandable", booleanAttribute], nzEllipsis: ["nzEllipsis", "nzEllipsis", booleanAttribute], nzCopyTooltips: "nzCopyTooltips", nzCopyIcons: "nzCopyIcons", nzEditTooltip: "nzEditTooltip", nzEditIcon: "nzEditIcon", nzContent: "nzContent", nzEllipsisRows: ["nzEllipsisRows", "nzEllipsisRows", numberAttribute], nzType: "nzType", nzCopyText: "nzCopyText", nzSuffix: "nzSuffix" }, outputs: { nzContentChange: "nzContentChange", nzCopy: "nzCopy", nzExpandChange: "nzExpandChange", nzOnEllipsis: "nzOnEllipsis" }, host: { properties: { "class.ant-typography": "!editing", "class.ant-typography-rtl": "dir === \"rtl\"", "class.ant-typography-edit-content": "editing", "class.ant-typography-secondary": "nzType === \"secondary\"", "class.ant-typography-warning": "nzType === \"warning\"", "class.ant-typography-danger": "nzType === \"danger\"", "class.ant-typography-success": "nzType === \"success\"", "class.ant-typography-disabled": "nzDisabled", "class.ant-typography-ellipsis": "nzEllipsis && !expanded", "class.ant-typography-single-line": "nzEllipsis && nzEllipsisRows === 1", "class.ant-typography-ellipsis-single-line": "canCssEllipsis && nzEllipsisRows === 1", "class.ant-typography-ellipsis-multiple-line": "canCssEllipsis && nzEllipsisRows > 1", "style.-webkit-line-clamp": "(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null" } }, viewQueries: [{ propertyName: "textEditRef", first: true, predicate: NzTextEditComponent, descendants: true }, { propertyName: "textCopyRef", first: true, predicate: NzTextCopyComponent, descendants: true }, { propertyName: "ellipsisContainer", first: true, predicate: ["ellipsisContainer"], descendants: true }, { propertyName: "expandableBtn", first: true, predicate: ["expandable"], descendants: true }, { propertyName: "contentTemplate", first: true, predicate: ["contentTemplate"], descendants: true }], exportAs: ["nzTypography"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #contentTemplate let-content="content">
      @if (!content) {
        <ng-content></ng-content>
      }
      {{ content }}
    </ng-template>
    @if (!editing) {
      @if (
        expanded ||
        (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
        canCssEllipsis ||
        (nzSuffix && expanded)
      ) {
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
      } @else {
        <span #ellipsisContainer></span>
        @if (isEllipsis) {
          {{ ellipsisStr }}
        }
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
        @if (nzExpandable && isEllipsis) {
          <a #expandable class="ant-typography-expand" (click)="onExpand()">
            {{ locale?.expand }}
          </a>
        }
      }
    }

    @if (nzEditable) {
      <nz-text-edit
        [text]="nzContent"
        [icon]="nzEditIcon"
        [tooltip]="nzEditTooltip"
        (endEditing)="onEndEditing($event)"
        (startEditing)="onStartEditing()"
      ></nz-text-edit>
    }

    @if (nzCopyable && !editing) {
      <nz-text-copy
        [text]="copyText"
        [tooltips]="nzCopyTooltips"
        [icons]="nzCopyIcons"
        (textCopy)="onTextCopy($event)"
      ></nz-text-copy>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NzTextEditComponent, selector: "nz-text-edit", inputs: ["text", "icon", "tooltip"], outputs: ["startEditing", "endEditing"], exportAs: ["nzTextEdit"] }, { kind: "component", type: NzTextCopyComponent, selector: "nz-text-copy", inputs: ["text", "tooltips", "icons"], outputs: ["textCopy"], exportAs: ["nzTextCopy"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
    };
})();
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTypographyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `
  nz-typography,
  [nz-typography],
  p[nz-paragraph],
  span[nz-text],
  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]
  `,
                    exportAs: 'nzTypography',
                    template: `
    <ng-template #contentTemplate let-content="content">
      @if (!content) {
        <ng-content></ng-content>
      }
      {{ content }}
    </ng-template>
    @if (!editing) {
      @if (
        expanded ||
        (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
        canCssEllipsis ||
        (nzSuffix && expanded)
      ) {
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
      } @else {
        <span #ellipsisContainer></span>
        @if (isEllipsis) {
          {{ ellipsisStr }}
        }
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
        @if (nzExpandable && isEllipsis) {
          <a #expandable class="ant-typography-expand" (click)="onExpand()">
            {{ locale?.expand }}
          </a>
        }
      }
    }

    @if (nzEditable) {
      <nz-text-edit
        [text]="nzContent"
        [icon]="nzEditIcon"
        [tooltip]="nzEditTooltip"
        (endEditing)="onEndEditing($event)"
        (startEditing)="onStartEditing()"
      ></nz-text-edit>
    }

    @if (nzCopyable && !editing) {
      <nz-text-copy
        [text]="copyText"
        [tooltips]="nzCopyTooltips"
        [icons]="nzCopyIcons"
        (textCopy)="onTextCopy($event)"
      ></nz-text-copy>
    }
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-typography]': '!editing',
                        '[class.ant-typography-rtl]': 'dir === "rtl"',
                        '[class.ant-typography-edit-content]': 'editing',
                        '[class.ant-typography-secondary]': 'nzType === "secondary"',
                        '[class.ant-typography-warning]': 'nzType === "warning"',
                        '[class.ant-typography-danger]': 'nzType === "danger"',
                        '[class.ant-typography-success]': 'nzType === "success"',
                        '[class.ant-typography-disabled]': 'nzDisabled',
                        '[class.ant-typography-ellipsis]': 'nzEllipsis && !expanded',
                        '[class.ant-typography-single-line]': 'nzEllipsis && nzEllipsisRows === 1',
                        '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
                        '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
                        '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
                    },
                    imports: [NgTemplateOutlet, NzTextEditComponent, NzTextCopyComponent]
                }]
        }], ctorParameters: () => [{ type: i1$1.NzConfigService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i2$2.Platform }, { type: i2.NzI18nService }, { type: i2$1.NzResizeService }, { type: i5$1.Directionality }], propDecorators: { nzCopyable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzEditable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzExpandable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzEllipsis: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nzCopyTooltips: [{
                type: Input
            }], nzCopyIcons: [{
                type: Input
            }], nzEditTooltip: [{
                type: Input
            }], nzEditIcon: [{
                type: Input
            }], nzContent: [{
                type: Input
            }], nzEllipsisRows: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], nzType: [{
                type: Input
            }], nzCopyText: [{
                type: Input
            }], nzSuffix: [{
                type: Input
            }], nzContentChange: [{
                type: Output
            }], nzCopy: [{
                type: Output
            }], nzExpandChange: [{
                type: Output
            }], nzOnEllipsis: [{
                type: Output
            }], textEditRef: [{
                type: ViewChild,
                args: [NzTextEditComponent, { static: false }]
            }], textCopyRef: [{
                type: ViewChild,
                args: [NzTextCopyComponent, { static: false }]
            }], ellipsisContainer: [{
                type: ViewChild,
                args: ['ellipsisContainer', { static: false }]
            }], expandableBtn: [{
                type: ViewChild,
                args: ['expandable', { static: false }]
            }], contentTemplate: [{
                type: ViewChild,
                args: ['contentTemplate', { static: false }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTypographyModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTypographyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: NzTypographyModule, imports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent], exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTypographyModule, imports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: NzTypographyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent],
                    exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTextCopyComponent, NzTextEditComponent, NzTypographyComponent, NzTypographyModule };
//# sourceMappingURL=ng-zorro-antd-typography.mjs.map
