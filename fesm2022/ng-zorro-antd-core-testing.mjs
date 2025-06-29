import * as i0 from '@angular/core';
import { NgZone, EventEmitter, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/** Creates a browser MouseEvent with the specified options. */
function createMouseEvent(type, x = 0, y = 0, button = 0) {
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, true /* canBubble */, false /* cancelable */, window /* view */, 0 /* detail */, x /* screenX */, y /* screenY */, x /* clientX */, y /* clientY */, false /* ctrlKey */, false /* altKey */, false /* shiftKey */, false /* metaKey */, button /* button */, null /* relatedTarget */);
    // `initMouseEvent` doesn't allow us to pass the `buttons` and
    // defaults it to 0 which looks like a fake event.
    Object.defineProperty(event, 'buttons', { get: () => 1 });
    return event;
}
/** Creates a browser TouchEvent with the specified pointer coordinates. */
function createTouchEvent(type, pageX = 0, pageY = 0) {
    // In favor of creating events that work for most of the browsers, the event is created
    // as a basic UI Event. The necessary details for the event will be set manually.
    const event = new UIEvent(type, { detail: 0, view: window });
    const touchDetails = { pageX, pageY, clientX: pageX, clientY: pageY };
    // Most of the browsers don't have a "initTouchEvent" method that can be used to define
    // the touch details.
    Object.defineProperties(event, {
        touches: { value: [touchDetails] },
        targetTouches: { value: [touchDetails] },
        changedTouches: { value: [touchDetails] }
    });
    return event;
}
/** Dispatches a keydown event from an element. */
function createKeyboardEvent(type, keyCode, target, key, ctrlKey, metaKey, shiftKey) {
    const event = document.createEvent('KeyboardEvent');
    const originalPreventDefault = event.preventDefault;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    if (event.initKeyEvent) {
        event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
    }
    else {
        event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
    }
    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: () => keyCode },
        key: { get: () => key },
        target: { get: () => target },
        ctrlKey: { get: () => ctrlKey },
        metaKey: { get: () => metaKey },
        shiftKey: { get: () => shiftKey }
    });
    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function () {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true, configurable: true });
        // eslint-disable-next-line prefer-rest-params
        return originalPreventDefault.apply(this, arguments);
    };
    return event;
}
/** Creates a fake event object with any desired event type. */
function createFakeEvent(type, canBubble = true, cancelable = true) {
    const event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    return event;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/** Utility to dispatch any event on a Node. */
function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/** Shorthand to dispatch a fake event on a specified node. */
function dispatchFakeEvent(node, type, canBubble) {
    return dispatchEvent(node, createFakeEvent(type, canBubble));
}
/** Shorthand to dispatch a keyboard event with a specified key code. */
function dispatchKeyboardEvent(node, type, keyCode, target) {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, target));
}
/** Shorthand to dispatch a mouse event on the specified coordinates. */
function dispatchMouseEvent(node, type, x = 0, y = 0, event = createMouseEvent(type, x, y)) {
    return dispatchEvent(node, event);
}
/** Shorthand to dispatch a touch event on the specified coordinates. */
function dispatchTouchEvent(node, type, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 *
 * @param value Value to be set on the input.
 * @param element Element onto which to set the value.
 */
function typeInElement(value, element) {
    element.focus();
    element.value = value;
    dispatchFakeEvent(element, 'input');
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Gets a RegExp used to detect an angular wrapped error message.
 * See https://github.com/angular/angular/issues/8348
 *
 * @internal
 * @deprecated Internal use only, do not use directly. Will be removed in v20
 */
function wrappedErrorMessage(e) {
    const escapedMessage = e.message.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    return new RegExp(escapedMessage);
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @internal
 * @deprecated Internal use only, do not use directly. Will be removed in v20
 */
class FakeViewportRuler {
    getViewportRect() {
        return {
            left: 0,
            top: 0,
            width: 1014,
            height: 686,
            bottom: 686,
            right: 1014
        };
    }
    getViewportSize() {
        return { width: 1014, height: 686 };
    }
    getViewportScrollPosition() {
        return { top: 0, left: 0 };
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 *
 * @docs-private
 */
class MockNgZone extends NgZone {
    onStable = new EventEmitter(false);
    constructor() {
        super({ enableLongStackTrace: false });
    }
    run(fn) {
        return fn();
    }
    runOutsideAngular(fn) {
        return fn();
    }
    simulateZoneExit() {
        this.onStable.emit(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: MockNgZone, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: MockNgZone });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: MockNgZone, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @internal
 * @deprecated Internal use only, do not use directly. Will be removed in v20
 */
function createComponentBed(component, options = {
    providers: [],
    declarations: [],
    imports: []
}) {
    const { imports, declarations, providers } = options;
    const config = {
        imports: [NoopAnimationsModule, CommonModule, ...(imports || [])],
        declarations: [component, ...(declarations || [])],
        schemas: [NO_ERRORS_SCHEMA],
        providers: providers || []
    };
    const bed = TestBed.configureTestingModule(config);
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return {
        bed,
        fixture,
        nativeElement: fixture.nativeElement,
        debugElement: fixture.debugElement,
        component: fixture.componentInstance
    };
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FakeViewportRuler, MockNgZone, createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent, dispatchEvent, dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent, typeInElement, wrappedErrorMessage, createComponentBed as ɵcreateComponentBed };
//# sourceMappingURL=ng-zorro-antd-core-testing.mjs.map
