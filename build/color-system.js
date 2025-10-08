/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/color-system.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLOR_SYSTEM: () => (/* binding */ COLOR_SYSTEM),
/* harmony export */   getAutoTextColor: () => (/* binding */ getAutoTextColor)
/* harmony export */ });
// Define your color system
const COLOR_SYSTEM = {
  backgrounds: {
    'transparent': {
      value: 'transparent',
      label: 'Transparent',
      autoText: '#1a1a1a' // Dark text on transparent
    },
    'white': {
      value: '#ffffff',
      label: 'White',
      autoText: '#1a1a1a'
    },
    'blue': {
      value: '#3b82f6',
      label: 'Blue',
      autoText: '#ffffff'
    },
    'dark-blue': {
      value: '#1e3a8a',
      label: 'Dark Blue',
      autoText: '#ffffff'
    },
    'gray': {
      value: '#6b7280',
      label: 'Gray',
      autoText: '#ffffff'
    }
  },
  textColors: {
    'auto': {
      value: 'auto',
      label: 'Auto'
    },
    'white': {
      value: '#ffffff',
      label: 'White'
    },
    'black': {
      value: '#1a1a1a',
      label: 'Black'
    },
    'blue': {
      value: '#3b82f6',
      label: 'Blue'
    },
    'yellow': {
      value: '#fbbf24',
      label: 'Yellow'
    }
  }
};

// Helper function to get auto text color for a background
function getAutoTextColor(backgroundKey) {
  const bgConfig = COLOR_SYSTEM.backgrounds[backgroundKey];
  return bgConfig ? bgConfig.autoText : '#1a1a1a';
}
/******/ })()
;
//# sourceMappingURL=color-system.js.map