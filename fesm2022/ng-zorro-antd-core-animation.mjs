import { trigger, state, transition, style, animate, query, stagger } from '@angular/animations';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class AnimationDuration {
    static SLOW = '0.3s'; // Modal
    static BASE = '0.2s';
    static FAST = '0.1s'; // Tooltip
}
class AnimationCurves {
    static EASE_BASE_OUT = 'cubic-bezier(0.7, 0.3, 0.1, 1)';
    static EASE_BASE_IN = 'cubic-bezier(0.9, 0, 0.3, 0.7)';
    static EASE_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
    static EASE_IN = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
    static EASE_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
    static EASE_OUT_BACK = 'cubic-bezier(0.12, 0.4, 0.29, 1.46)';
    static EASE_IN_BACK = 'cubic-bezier(0.71, -0.46, 0.88, 0.6)';
    static EASE_IN_OUT_BACK = 'cubic-bezier(0.71, -0.46, 0.29, 1.46)';
    static EASE_OUT_CIRC = 'cubic-bezier(0.08, 0.82, 0.17, 1)';
    static EASE_IN_CIRC = 'cubic-bezier(0.6, 0.04, 0.98, 0.34)';
    static EASE_IN_OUT_CIRC = 'cubic-bezier(0.78, 0.14, 0.15, 0.86)';
    static EASE_OUT_QUINT = 'cubic-bezier(0.23, 1, 0.32, 1)';
    static EASE_IN_QUINT = 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
    static EASE_IN_OUT_QUINT = 'cubic-bezier(0.86, 0, 0.07, 1)';
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const collapseMotion = trigger('collapseMotion', [
    state('expanded', style({ height: '*' })),
    state('collapsed', style({ height: 0, overflow: 'hidden' })),
    state('hidden', style({ height: 0, overflow: 'hidden', borderTopWidth: '0' })),
    transition('expanded => collapsed', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
    transition('expanded => hidden', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
    transition('collapsed => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
    transition('hidden => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`))
]);
const treeCollapseMotion = trigger('treeCollapseMotion', [
    transition('* => *', [
        query('nz-tree-node:leave,nz-tree-builtin-node:leave', [
            style({ overflow: 'hidden' }),
            stagger(0, [
                animate(`150ms ${AnimationCurves.EASE_IN_OUT}`, style({ height: 0, opacity: 0, 'padding-bottom': 0 }))
            ])
        ], {
            optional: true
        }),
        query('nz-tree-node:enter,nz-tree-builtin-node:enter', [
            style({ overflow: 'hidden', height: 0, opacity: 0, 'padding-bottom': 0 }),
            stagger(0, [
                animate(`150ms ${AnimationCurves.EASE_IN_OUT}`, style({ overflow: 'hidden', height: '*', opacity: '*', 'padding-bottom': '*' }))
            ])
        ], {
            optional: true
        })
    ])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const drawerMaskMotion = trigger('drawerMaskMotion', [
    transition(':enter', [style({ opacity: 0 }), animate(`${AnimationDuration.SLOW}`, style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate(`${AnimationDuration.SLOW}`, style({ opacity: 0 }))])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const fadeMotion = trigger('fadeMotion', [
    transition('* => enter', [style({ opacity: 0 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 1 }))]),
    transition('* => leave, :leave', [style({ opacity: 1 }), animate(`${AnimationDuration.BASE}`, style({ opacity: 0 }))])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const helpMotion = trigger('helpMotion', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(-5px)'
        }),
        animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
            opacity: 1,
            transform: 'translateY(0)'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateY(0)'
        }),
        animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
            opacity: 0,
            transform: 'translateY(-5px)'
        }))
    ])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const moveUpMotion = trigger('moveUpMotion', [
    transition('* => enter', [
        style({
            transformOrigin: '0 0',
            transform: 'translateY(-100%)',
            opacity: 0
        }),
        animate(`${AnimationDuration.BASE}`, style({
            transformOrigin: '0 0',
            transform: 'translateY(0%)',
            opacity: 1
        }))
    ]),
    transition('* => leave', [
        style({
            transformOrigin: '0 0',
            transform: 'translateY(0%)',
            opacity: 1
        }),
        animate(`${AnimationDuration.BASE}`, style({
            transformOrigin: '0 0',
            transform: 'translateY(-100%)',
            opacity: 0
        }))
    ])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const notificationMotion = trigger('notificationMotion', [
    state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('* => enterRight', [style({ opacity: 0, transform: 'translateX(5%)' }), animate('100ms linear')]),
    state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('* => enterLeft', [style({ opacity: 0, transform: 'translateX(-5%)' }), animate('100ms linear')]),
    state('enterTop', style({ opacity: 1, transform: 'translateY(0)' })),
    transition('* => enterTop', [style({ opacity: 0, transform: 'translateY(-5%)' }), animate('100ms linear')]),
    state('enterBottom', style({ opacity: 1, transform: 'translateY(0)' })),
    transition('* => enterBottom', [style({ opacity: 0, transform: 'translateY(5%)' }), animate('100ms linear')]),
    state('leave', style({
        opacity: 0,
        transform: 'scaleY(0.8)',
        transformOrigin: '0% 0%'
    })),
    transition('* => leave', [
        style({
            opacity: 1,
            transform: 'scaleY(1)',
            transformOrigin: '0% 0%'
        }),
        animate('100ms linear')
    ])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const ANIMATION_TRANSITION_IN = `${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_QUINT}`;
const ANIMATION_TRANSITION_OUT = `${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_QUINT}`;
const slideMotion = trigger('slideMotion', [
    state('void', style({
        opacity: 0,
        transform: 'scaleY(0.8)'
    })),
    state('enter', style({
        opacity: 1,
        transform: 'scaleY(1)'
    })),
    transition('void => *', [animate(ANIMATION_TRANSITION_IN)]),
    transition('* => void', [animate(ANIMATION_TRANSITION_OUT)])
]);
const slideAlertMotion = trigger('slideAlertMotion', [
    transition(':leave', [
        style({ opacity: 1, transform: 'scaleY(1)', transformOrigin: '0% 0%' }),
        animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT_CIRC}`, style({
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: '0% 0%'
        }))
    ])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const tabSwitchMotion = trigger('tabSwitchMotion', [
    state('leave', style({
        display: 'none'
    })),
    transition('* => enter', [
        style({
            display: 'block',
            opacity: 0
        }),
        animate(AnimationDuration.SLOW)
    ]),
    transition('* => leave, :leave', [
        style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
        }),
        animate(AnimationDuration.SLOW, style({
            opacity: 0
        })),
        style({
            display: 'none'
        })
    ])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const thumbMotion = trigger('thumbMotion', [
    state('from', style({ transform: 'translateX({{ transform }}px)', width: '{{ width }}px' }), {
        params: { transform: 0, width: 0 }
    }),
    state('to', style({ transform: 'translateX({{ transform }}px)', width: '{{ width }}px' }), {
        params: { transform: 100, width: 0 }
    }),
    transition('from => to', animate(`300ms ${AnimationCurves.EASE_IN_OUT}`))
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const zoomBigMotion = trigger('zoomBigMotion', [
    transition('void => active', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(`${AnimationDuration.BASE} ${AnimationCurves.EASE_OUT_CIRC}`, style({
            opacity: 1,
            transform: 'scale(1)'
        }))
    ]),
    transition('active => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(`${AnimationDuration.BASE} ${AnimationCurves.EASE_IN_OUT_CIRC}`, style({
            opacity: 0,
            transform: 'scale(0.8)'
        }))
    ])
]);
const zoomBadgeMotion = trigger('zoomBadgeMotion', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) translate(50%, -50%)' }),
        animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_OUT_BACK}`, style({
            opacity: 1,
            transform: 'scale(1) translate(50%, -50%)'
        }))
    ]),
    transition(':leave', [
        style({ opacity: 1, transform: 'scale(1) translate(50%, -50%)' }),
        animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_BACK}`, style({
            opacity: 0,
            transform: 'scale(0) translate(50%, -50%)'
        }))
    ])
]);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AnimationCurves, AnimationDuration, collapseMotion, drawerMaskMotion, fadeMotion, helpMotion, moveUpMotion, notificationMotion, slideAlertMotion, slideMotion, tabSwitchMotion, thumbMotion, treeCollapseMotion, zoomBadgeMotion, zoomBigMotion };
//# sourceMappingURL=ng-zorro-antd-core-animation.mjs.map
