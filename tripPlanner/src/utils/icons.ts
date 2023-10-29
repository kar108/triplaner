import {ImageSourcePropType} from 'react-native';

// common icons
const logo = require('../assets/images/logo.png');
const eyeOpen = require('../assets/images/eyeOpen.png');
const eyeClosed = require('../assets/images/eyeclosed.png');
const right = require('../assets/images/right.png');
const map = require('../assets/images/map.png');
const tick = require('../assets/images/check.png');

export const icons: Record<string, ImageSourcePropType> = {
    logo,
    eyeOpen,
    eyeClosed,
    right,
    map,
    tick
};
