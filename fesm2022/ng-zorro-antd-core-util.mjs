import { TemplateRef, numberAttribute } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty, coerceCssPixelValue } from '@angular/cdk/coercion';
import { warn } from 'ng-zorro-antd/core/logger';
import { Subject, isObservable, from, of, EMPTY, Observable, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function toArray(value) {
    let ret;
    if (value == null) {
        ret = [];
    }
    else if (!Array.isArray(value)) {
        ret = [value];
    }
    else {
        ret = value;
    }
    return ret;
}
function arraysEqual(array1, array2) {
    if (!array1 || !array2 || array1.length !== array2.length) {
        return false;
    }
    const len = array1.length;
    for (let i = 0; i < len; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
function shallowCopyArray(source) {
    return source.slice();
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isNotNil(value) {
    return typeof value !== 'undefined' && value !== null;
}
function isNil(value) {
    return typeof value === 'undefined' || value === null;
}
/**
 * Examine if two objects are shallowly equaled.
 */
function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }
    if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let idx = 0; idx < keysA.length; idx++) {
        const key = keysA[idx];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        if (objA[key] !== objB[key]) {
            return false;
        }
    }
    return true;
}
function isNonEmptyString(value) {
    return typeof value === 'string' && value !== '';
}
function isTemplateRef(value) {
    return value instanceof TemplateRef;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function toBoolean(value) {
    return coerceBooleanProperty(value);
}
function numberAttributeWithZeroFallback(value) {
    return numberAttribute(value, 0);
}
function numberAttributeWithOneFallback(value) {
    return numberAttribute(value, 1);
}
function numberAttributeWithInfinityFallback(value) {
    return numberAttribute(value, Infinity);
}
function toNumber(value, fallbackValue = 0) {
    return coerceNumberProperty(value, fallbackValue);
}
function toCssPixel(value) {
    return coerceCssPixelValue(value);
}
// eslint-disable  no-invalid-this
/**
 * Get the function-property type's value
 */
function valueFunctionProp(prop, ...args) {
    return typeof prop === 'function' ? prop(...args) : prop;
}
function propDecoratorFactory(name, fallback) {
    function propDecorator(target, propName, originalDescriptor) {
        const privatePropName = `$$__zorroPropDecorator__${propName}`;
        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
        }
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });
        return {
            get() {
                return originalDescriptor && originalDescriptor.get
                    ? originalDescriptor.get.bind(this)()
                    : this[privatePropName];
            },
            set(value) {
                if (originalDescriptor && originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(fallback(value));
                }
                this[privatePropName] = fallback(value);
            }
        };
    }
    return propDecorator;
}
/**
 * @deprecated Use input transform instead: `@Input({ transform })`
 *
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * Why not using @InputBoolean alone without @Input? AOT needs @Input to be visible
 *
 * @howToUse
 * ```
 * @Input() @InputBoolean() visible: boolean = false;
 *
 * // Act as below:
 * // @Input()
 * // get visible() { return this.__visible; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 */
function InputBoolean() {
    return propDecoratorFactory('InputBoolean', toBoolean);
}
/**
 * @deprecated Use input transform instead: `@Input({ transform })`
 */
function InputCssPixel() {
    return propDecoratorFactory('InputCssPixel', toCssPixel);
}
/**
 * @deprecated Use input transform instead: `@Input({ transform })`
 */
function InputNumber(fallbackValue) {
    return propDecoratorFactory('InputNumber', (value) => toNumber(value, fallbackValue));
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Silent an event by stopping and preventing it.
 */
function silentEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}
function getElementOffset(elem) {
    if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
    }
    const rect = elem.getBoundingClientRect();
    const win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
}
/**
 * Investigate if an event is a `TouchEvent`.
 */
function isTouchEvent(event) {
    return event.type.startsWith('touch');
}
function getEventPosition(event) {
    return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getRegExp(prefix) {
    const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
    let prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');
    if (prefixArray.length > 1) {
        prefixToken = `[${prefixToken}]`;
    }
    return new RegExp(`(\\s|^)(${prefixToken})[^\\s]*`, 'g');
}
function getMentions(value, prefix = '@') {
    if (typeof value !== 'string') {
        return [];
    }
    const regex = getRegExp(prefix);
    const mentions = value.match(regex);
    return mentions !== null ? mentions.map(e => e.trim()) : [];
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Much like lodash.
 */
function padStart(toPad, length, element) {
    if (toPad.length > length) {
        return toPad;
    }
    const joined = `${getRepeatedElement(length, element)}${toPad}`;
    return joined.slice(joined.length - length, joined.length);
}
function padEnd(toPad, length, element) {
    const joined = `${toPad}${getRepeatedElement(length, element)}`;
    return joined.slice(0, length);
}
function getRepeatedElement(length, element) {
    return Array(length).fill(element).join('');
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isPromise(obj) {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getPercent(min, max, value) {
    return ((value - min) / (max - min)) * 100;
}
function getPrecision(num) {
    const numStr = num.toString();
    const dotIndex = numStr.indexOf('.');
    return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
}
function ensureNumberInRange(num, min, max) {
    if (isNaN(num) || num < min) {
        return min;
    }
    else if (num > max) {
        return max;
    }
    else {
        return num;
    }
}
function isNumberFinite(value) {
    return typeof value === 'number' && isFinite(value);
}
function toDecimal(value, decimal) {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}
function sum(input, initial = 0) {
    return input.reduce((previous, current) => previous + current, initial);
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function scrollIntoView(node) {
    const nodeAsAny = node;
    if (nodeAsAny.scrollIntoViewIfNeeded) {
        nodeAsAny.scrollIntoViewIfNeeded(false);
        return;
    }
    if (node.scrollIntoView) {
        node.scrollIntoView(false);
        return;
    }
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
// from https://github.com/component/textarea-caret-position
// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
const properties = [
    'direction', // RTL support
    'boxSizing',
    'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
    'height',
    'overflowX',
    'overflowY', // copy the scrollbar for IE
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration', // might not make a difference, but better be safe
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
];
const isBrowser = typeof window !== 'undefined';
const isFirefox = isBrowser && window.mozInnerScreenX != null;
const _parseInt = (str) => parseInt(str, 10);
function getCaretCoordinates(element, position, options) {
    if (!isBrowser) {
        throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
    }
    const debug = (options && options.debug) || false;
    if (debug) {
        const el = document.querySelector('#input-textarea-caret-position-mirror-div');
        if (el) {
            el.parentNode.removeChild(el);
        }
    }
    // The mirror div will replicate the textarea's style
    const div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);
    const style = div.style;
    const computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9
    const isInput = element.nodeName === 'INPUT';
    // Default textarea styles
    style.whiteSpace = 'pre-wrap';
    if (!isInput) {
        style.wordWrap = 'break-word'; // only for textarea-s
    }
    // Position off-screen
    style.position = 'absolute'; // required to return coordinates properly
    if (!debug) {
        style.visibility = 'hidden';
    } // not 'display: none' because we want rendering
    // Transfer the element's properties to the div
    properties.forEach((prop) => {
        if (isInput && prop === 'lineHeight') {
            // Special case for <input>s because text is rendered centered and line height may be != height
            style.lineHeight = computed.height;
        }
        else {
            // @ts-ignore
            style[prop] = computed[prop];
        }
    });
    if (isFirefox) {
        // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
        if (element.scrollHeight > _parseInt(computed.height)) {
            style.overflowY = 'scroll';
        }
    }
    else {
        style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }
    div.textContent = element.value.substring(0, position);
    // The second special handling for input type="text" vs textarea:
    // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
    if (isInput) {
        div.textContent = div.textContent.replace(/\s/g, '\u00a0');
    }
    const span = document.createElement('span');
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.
    span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
    div.appendChild(span);
    const coordinates = {
        top: span.offsetTop + _parseInt(computed.borderTopWidth),
        left: span.offsetLeft + _parseInt(computed.borderLeftWidth),
        height: _parseInt(computed.lineHeight)
    };
    if (debug) {
        span.style.backgroundColor = '#eee';
        createDebugEle(element, coordinates);
    }
    else {
        document.body.removeChild(div);
    }
    return coordinates;
}
function createDebugEle(element, coordinates) {
    const fontSize = getComputedStyle(element).getPropertyValue('font-size');
    const rect = document.querySelector('#DEBUG') || document.createElement('div');
    document.body.appendChild(rect);
    rect.id = 'DEBUG';
    rect.style.position = 'absolute';
    rect.style.backgroundColor = 'red';
    rect.style.height = fontSize;
    rect.style.width = '1px';
    rect.style.top = `${element.getBoundingClientRect().top - element.scrollTop + window.pageYOffset + coordinates.top}px`;
    rect.style.left = `${element.getBoundingClientRect().left - element.scrollLeft + window.pageXOffset + coordinates.left}px`;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isStyleSupport(styleName) {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
        const { documentElement } = window.document;
        return styleNameList.some(name => name in documentElement.style);
    }
    return false;
}
function getStyleAsText(styles) {
    if (!styles) {
        return '';
    }
    return Object.keys(styles)
        .map(key => {
        const val = styles[key];
        return `${key}:${typeof val === 'string' ? val : `${val}px`}`;
    })
        .join(';');
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
// We only handle element & text node.
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
let ellipsisContainer;
const wrapperStyle = {
    padding: '0',
    margin: '0',
    display: 'inline',
    lineHeight: 'inherit'
};
function pxToNumber(value) {
    if (!value) {
        return 0;
    }
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
}
function styleToString(style) {
    // There are some different behavior between Firefox & Chrome.
    // We have to handle this ourself.
    const styleNames = Array.prototype.slice.apply(style);
    return styleNames.map(name => `${name}: ${style.getPropertyValue(name)};`).join('');
}
function mergeChildren(children) {
    const childList = [];
    children.forEach((child) => {
        const prevChild = childList[childList.length - 1];
        if (prevChild && child.nodeType === TEXT_NODE && prevChild.nodeType === TEXT_NODE) {
            prevChild.data += child.data;
        }
        else {
            childList.push(child);
        }
    });
    return childList;
}
function measure(originEle, rows, contentNodes, fixedContent, ellipsisStr, suffixStr = '') {
    if (!ellipsisContainer) {
        ellipsisContainer = document.createElement('div');
        ellipsisContainer.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ellipsisContainer);
    }
    // Get origin style
    const originStyle = window.getComputedStyle(originEle);
    const originCSS = styleToString(originStyle);
    const lineHeight = pxToNumber(originStyle.lineHeight);
    const maxHeight = Math.round(lineHeight * (rows + 1) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
    // Set shadow
    ellipsisContainer.setAttribute('style', originCSS);
    ellipsisContainer.style.position = 'fixed';
    ellipsisContainer.style.left = '0';
    ellipsisContainer.style.height = 'auto';
    ellipsisContainer.style.minHeight = 'auto';
    ellipsisContainer.style.maxHeight = 'auto';
    ellipsisContainer.style.top = '-999999px';
    ellipsisContainer.style.zIndex = '-1000';
    // clean up css overflow
    ellipsisContainer.style.textOverflow = 'clip';
    ellipsisContainer.style.whiteSpace = 'normal';
    ellipsisContainer.style.webkitLineClamp = 'none';
    const contentList = mergeChildren(contentNodes);
    const container = document.createElement('div');
    const contentContainer = document.createElement('span');
    const suffixContainer = document.createTextNode(suffixStr);
    const fixedContainer = document.createElement('span');
    // Add styles in container
    Object.assign(container.style, wrapperStyle);
    Object.assign(contentContainer.style, wrapperStyle);
    Object.assign(fixedContainer.style, wrapperStyle);
    contentList.forEach(n => {
        contentContainer.appendChild(n);
    });
    contentContainer.appendChild(suffixContainer);
    fixedContent.forEach(node => {
        fixedContainer.appendChild(node.cloneNode(true));
    });
    container.appendChild(contentContainer);
    container.appendChild(fixedContainer);
    // Render in the fake container
    ellipsisContainer.appendChild(container);
    // Check if ellipsis in measure div is height enough for content
    function inRange() {
        return ellipsisContainer.offsetHeight < maxHeight;
    }
    if (inRange()) {
        const text = ellipsisContainer.innerHTML;
        ellipsisContainer.removeChild(container);
        return { contentNodes, text, ellipsis: false };
    }
    // We should clone the childNode since they're controlled by React and we can't reuse it without warning
    const childNodes = Array.prototype.slice
        .apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes)
        .filter(({ nodeType }) => nodeType !== COMMENT_NODE);
    const fixedNodes = Array.prototype.slice.apply(ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes);
    ellipsisContainer.removeChild(container);
    // ========================= Find match ellipsis content =========================
    ellipsisContainer.innerHTML = '';
    // Create origin content holder
    const ellipsisContentHolder = document.createElement('span');
    ellipsisContainer.appendChild(ellipsisContentHolder);
    const ellipsisTextNode = document.createTextNode(ellipsisStr + suffixStr);
    ellipsisContentHolder.appendChild(ellipsisTextNode);
    fixedNodes.forEach(childNode => {
        ellipsisContainer.appendChild(childNode);
    });
    // Append before fixed nodes
    function appendChildNode(node) {
        ellipsisContentHolder.insertBefore(node, ellipsisTextNode);
    }
    // Get maximum text
    function measureText(textNode, fullText, startLoc = 0, endLoc = fullText.length, lastSuccessLoc = 0) {
        const midLoc = Math.floor((startLoc + endLoc) / 2);
        textNode.textContent = fullText.slice(0, midLoc);
        if (startLoc >= endLoc - 1) {
            // Loop when step is small
            for (let step = endLoc; step >= startLoc; step -= 1) {
                const currentStepText = fullText.slice(0, step);
                textNode.textContent = currentStepText;
                if (inRange() || !currentStepText) {
                    return step === fullText.length
                        ? {
                            finished: false,
                            node: document.createTextNode(fullText)
                        }
                        : {
                            finished: true,
                            node: document.createTextNode(currentStepText)
                        };
                }
            }
        }
        if (inRange()) {
            return measureText(textNode, fullText, midLoc, endLoc, midLoc);
        }
        else {
            return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc);
        }
    }
    function measureNode(childNode, index) {
        const type = childNode.nodeType;
        if (type === ELEMENT_NODE) {
            // We don't split element, it will keep if whole element can be displayed.
            // appendChildNode(childNode);
            if (inRange()) {
                return {
                    finished: false,
                    node: contentList[index]
                };
            }
            // Clean up if can not pull in
            ellipsisContentHolder.removeChild(childNode);
            return {
                finished: true,
                node: null
            };
        }
        else if (type === TEXT_NODE) {
            const fullText = childNode.textContent || '';
            const textNode = document.createTextNode(fullText);
            appendChildNode(textNode);
            return measureText(textNode, fullText);
        }
        // Not handle other type of content
        // PS: This code should not be attached after react 16
        return {
            finished: false,
            node: null
        };
    }
    const ellipsisNodes = [];
    childNodes.some((childNode, index) => {
        const { finished, node } = measureNode(childNode, index);
        if (node) {
            ellipsisNodes.push(node);
        }
        return finished;
    });
    const result = {
        contentNodes: ellipsisNodes,
        text: ellipsisContainer.innerHTML,
        ellipsis: true
    };
    while (ellipsisContainer.firstChild) {
        ellipsisContainer.removeChild(ellipsisContainer.firstChild);
    }
    return result;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
let scrollbarVerticalSize;
let scrollbarHorizontalSize;
// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px'
};
function measureScrollbar(direction = 'vertical', prefix = 'ant') {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return 0;
    }
    const isVertical = direction === 'vertical';
    if (isVertical && scrollbarVerticalSize) {
        return scrollbarVerticalSize;
    }
    else if (!isVertical && scrollbarHorizontalSize) {
        return scrollbarHorizontalSize;
    }
    const scrollDiv = document.createElement('div');
    Object.keys(scrollbarMeasure).forEach(scrollProp => {
        // @ts-ignore
        scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    });
    // apply hide scrollbar className ahead
    scrollDiv.className = `${prefix}-hide-scrollbar scroll-div-append-to-body`;
    // Append related overflow style
    if (isVertical) {
        scrollDiv.style.overflowY = 'scroll';
    }
    else {
        scrollDiv.style.overflowX = 'scroll';
    }
    document.body.appendChild(scrollDiv);
    let size = 0;
    if (isVertical) {
        size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        scrollbarVerticalSize = size;
    }
    else {
        size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        scrollbarHorizontalSize = size;
    }
    document.body.removeChild(scrollDiv);
    return size;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function ensureInBounds(value, boundValue) {
    return value ? (value < boundValue ? value : boundValue) : boundValue;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function inNextTick() {
    const timer = new Subject();
    Promise.resolve().then(() => timer.next());
    return timer.pipe(take(1));
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        // Use `Promise.resolve()` to wrap promise-like instances.
        return from(Promise.resolve(value));
    }
    return of(value);
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Sync from rc-util [https://github.com/react-component/util]
 */
function canUseDom() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Sync from rc-util [https://github.com/react-component/util]
 */
const MARK_KEY = `rc-util-key`;
function getMark({ mark } = {}) {
    if (mark) {
        return mark.startsWith('data-') ? mark : `data-${mark}`;
    }
    return MARK_KEY;
}
function getContainer(option) {
    if (option.attachTo) {
        return option.attachTo;
    }
    const head = document.querySelector('head');
    return head || document.body;
}
function injectCSS(css, options = {}) {
    if (!canUseDom()) {
        return null;
    }
    const styleNode = document.createElement('style');
    if (options.cspNonce) {
        styleNode.nonce = options.cspNonce;
    }
    styleNode.innerHTML = css;
    const container = getContainer(options);
    const { firstChild } = container;
    if (options.prepend && container.prepend) {
        // Use `prepend` first
        container.prepend(styleNode);
    }
    else if (options.prepend && firstChild) {
        // Fallback to `insertBefore` like IE not support `prepend`
        container.insertBefore(styleNode, firstChild);
    }
    else {
        container.appendChild(styleNode);
    }
    return styleNode;
}
const containerCache = new Map();
function findExistNode(key, option = {}) {
    const container = getContainer(option);
    return Array.from(containerCache.get(container)?.children || []).find(node => node.tagName === 'STYLE' && node.getAttribute(getMark(option)) === key);
}
function removeCSS(key, option = {}) {
    const existNode = findExistNode(key, option);
    existNode?.parentNode?.removeChild(existNode);
}
function updateCSS(css, key, options = {}) {
    const container = getContainer(options);
    // Get real parent
    if (!containerCache.has(container)) {
        const placeholderStyle = injectCSS('', options);
        // @ts-ignore
        const { parentNode } = placeholderStyle;
        containerCache.set(container, parentNode);
        parentNode.removeChild(placeholderStyle);
    }
    const existNode = findExistNode(key, options);
    if (existNode) {
        if (options.cspNonce && existNode.nonce !== options.cspNonce) {
            existNode.nonce = options.cspNonce;
        }
        if (existNode.innerHTML !== css) {
            existNode.innerHTML = css;
        }
        return existNode;
    }
    const newNode = injectCSS(css, options);
    newNode?.setAttribute(getMark(options), key);
    return newNode;
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function getStatusClassNames(prefixCls, status, hasFeedback) {
    return {
        [`${prefixCls}-status-success`]: status === 'success',
        [`${prefixCls}-status-warning`]: status === 'warning',
        [`${prefixCls}-status-error`]: status === 'error',
        [`${prefixCls}-status-validating`]: status === 'validating',
        [`${prefixCls}-has-feedback`]: hasFeedback
    };
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function runOutsideAngular(fn) {
    // The function that does the same job as `NgZone.runOutsideAngular`.
    // The difference is that we don't need to rely on the `NgZone` service,
    // allowing `fromEventOutsideAngular` to function without requiring an explicit
    // injection context (where we might otherwise call `inject(NgZone)`).
    return typeof Zone !== 'undefined' ? Zone.root.run(fn) : fn();
}
/**
 * This function replaces `runOutsideAngular` with `fromEvent`, introducing a
 * lot of boilerplate where we need to inject the `NgZone` service and then subscribe
 * to `fromEvent` within the `runOutsideAngular` callback.
 */
function fromEventOutsideAngular(target, name, options) {
    // Allow the event target to be nullable to avoid requiring callers to check
    // if the target exists. We simply complete the observable immediately,
    // as this might potentially be used within a `switchMap`.
    if (!target) {
        return EMPTY;
    }
    return new Observable(subscriber => {
        // Note that we're wrapping fromEvent with an observable because `fromEvent`
        // is eager and only calls `addEventListener` when a new subscriber comes in.
        // Therefore, we're wrapping the subscription with `runOutsideAngular` to ensure
        // that `addEventListener` is also called outside of Angular when there's a subscriber.
        return runOutsideAngular(() => 
        // Casting because the inferred overload is incorrect :(
        fromEvent(target, name, options).subscribe(subscriber));
    });
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { InputBoolean, InputCssPixel, InputNumber, arraysEqual, canUseDom, createDebugEle, ensureInBounds, ensureNumberInRange, fromEventOutsideAngular, getCaretCoordinates, getElementOffset, getEventPosition, getMentions, getPercent, getPrecision, getRegExp, getRepeatedElement, getStatusClassNames, getStyleAsText, inNextTick, injectCSS, isNil, isNonEmptyString, isNotNil, isNumberFinite, isPromise, isStyleSupport, isTemplateRef, isTouchEvent, measure, measureScrollbar, numberAttributeWithInfinityFallback, numberAttributeWithOneFallback, numberAttributeWithZeroFallback, padEnd, padStart, properties, pxToNumber, removeCSS, scrollIntoView, shallowCopyArray, shallowEqual, silentEvent, sum, toArray, toBoolean, toCssPixel, toDecimal, toNumber, updateCSS, valueFunctionProp, wrapIntoObservable };
//# sourceMappingURL=ng-zorro-antd-core-util.mjs.map
