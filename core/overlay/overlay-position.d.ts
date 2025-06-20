/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
export declare const POSITION_MAP: {
    top: ConnectionPositionPair;
    topCenter: ConnectionPositionPair;
    topLeft: ConnectionPositionPair;
    topRight: ConnectionPositionPair;
    right: ConnectionPositionPair;
    rightTop: ConnectionPositionPair;
    rightBottom: ConnectionPositionPair;
    bottom: ConnectionPositionPair;
    bottomCenter: ConnectionPositionPair;
    bottomLeft: ConnectionPositionPair;
    bottomRight: ConnectionPositionPair;
    left: ConnectionPositionPair;
    leftTop: ConnectionPositionPair;
    leftBottom: ConnectionPositionPair;
};
export type POSITION_TYPE = keyof typeof POSITION_MAP;
export type POSITION_TYPE_HORIZONTAL = Extract<POSITION_TYPE, 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'>;
export declare const DEFAULT_TOOLTIP_POSITIONS: ConnectionPositionPair[];
export declare const DEFAULT_CASCADER_POSITIONS: ConnectionPositionPair[];
export declare const DEFAULT_MENTION_TOP_POSITIONS: ConnectionPositionPair[];
export declare const DEFAULT_MENTION_BOTTOM_POSITIONS: ConnectionPositionPair[];
export declare function getPlacementName(position: ConnectedOverlayPositionChange): string | undefined;
export declare const DATE_PICKER_POSITION_MAP: {
    bottomLeft: ConnectionPositionPair;
    topLeft: ConnectionPositionPair;
    bottomRight: ConnectionPositionPair;
    topRight: ConnectionPositionPair;
};
export declare const DEFAULT_DATE_PICKER_POSITIONS: ConnectionPositionPair[];
