/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/container-block/block.json":
/*!***********************************************!*\
  !*** ./src/blocks/container-block/block.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wagepoint/container","title":"Container","category":"layout","icon":"admin-page","description":"A flexible container with background and spacing controls.","supports":{"html":false},"attributes":{"containerBackground":{"type":"string","default":"transparent"},"topSpacing":{"type":"string","default":"auto"},"bottomSpacing":{"type":"string","default":"auto"}},"textdomain":"wagepoint","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ }),

/***/ "./src/blocks/container-block/edit.js":
/*!********************************************!*\
  !*** ./src/blocks/container-block/edit.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_CustomColorSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/CustomColorSelect */ "./src/components/CustomColorSelect.js");
/* harmony import */ var _color_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../color-system */ "./src/color-system.js");






const SPACING_OPTIONS = [{
  label: 'Auto',
  value: "auto"
}, {
  label: 'Small',
  value: 'sm'
}, {
  label: 'Medium',
  value: 'md'
}, {
  label: 'Large',
  value: 'lg'
}];
function Edit({
  attributes,
  setAttributes
}) {
  const {
    containerBackground,
    verticalSpacing,
    topSpacing,
    bottomSpacing
  } = attributes;
  const onBackgroundChange = newBackground => {
    setAttributes({
      containerBackground: newBackground
    });
  };
  const onTopSpacingChange = newSpacing => {
    setAttributes({
      topSpacing: newSpacing
    });
  };
  const onBottomSpacingChange = newSpacing => {
    setAttributes({
      bottomSpacing: newSpacing
    });
  };
  const getBlockClass = () => {
    return ["container", topSpacing !== "auto" ? `top-${topSpacing}` : "", bottomSpacing !== "auto" ? `bottom-${bottomSpacing}` : ""].join(" ");
  };
  const containerStyles = {
    backgroundColor: _color_system__WEBPACK_IMPORTED_MODULE_5__.COLOR_SYSTEM.backgrounds[containerBackground]?.value || 'transparent'
  };
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: getBlockClass()
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Container Settings', 'custom-blocks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CustomColorSelect__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'custom-blocks'),
    value: containerBackground,
    onChange: onBackgroundChange,
    colors: _color_system__WEBPACK_IMPORTED_MODULE_5__.COLOR_SYSTEM.backgrounds
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top Spacing', 'custom-blocks'),
    value: topSpacing,
    onChange: onTopSpacingChange,
    options: SPACING_OPTIONS
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom Spacing', 'custom-blocks'),
    value: bottomSpacing,
    onChange: onBottomSpacingChange,
    options: SPACING_OPTIONS
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container__content",
    style: containerStyles
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, null))));
}

/***/ }),

/***/ "./src/blocks/container-block/index.js":
/*!*********************************************!*\
  !*** ./src/blocks/container-block/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/container-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/blocks/container-block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/blocks/container-block/block.json");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/container-block/style.scss");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/blocks/container-block/save.js":
/*!********************************************!*\
  !*** ./src/blocks/container-block/save.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _color_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../color-system */ "./src/color-system.js");



const SPACING_OPTIONS = [{
  label: 'Auto',
  value: "auto"
}, {
  label: 'Small',
  value: 'sm'
}, {
  label: 'Medium',
  value: 'md'
}, {
  label: 'Large',
  value: 'lg'
}];
function save({
  attributes
}) {
  const {
    containerBackground,
    topSpacing,
    bottomSpacing
  } = attributes;
  const getBlockClass = () => {
    return ["container", topSpacing !== "auto" ? `top-${topSpacing}` : "", bottomSpacing !== "auto" ? `bottom-${bottomSpacing}` : ""].join(" ");
  };
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: getBlockClass()
  });
  const containerStyles = {
    backgroundColor: _color_system__WEBPACK_IMPORTED_MODULE_2__.COLOR_SYSTEM.backgrounds[containerBackground]?.value || 'transparent'
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "container__content",
    style: containerStyles
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null)));
}

/***/ }),

/***/ "./src/blocks/container-block/style.scss":
/*!***********************************************!*\
  !*** ./src/blocks/container-block/style.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/color-system.js":
/*!*****************************!*\
  !*** ./src/color-system.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./src/components/CustomColorSelect.js":
/*!*********************************************!*\
  !*** ./src/components/CustomColorSelect.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);

// Custom Color Select Component


function CustomColorSelect({
  label,
  value,
  onChange,
  colors,
  showAutoOption = false,
  autoColor = '#1a1a1a'
}) {
  const getCurrentColor = () => {
    if (value === 'auto' && showAutoOption) {
      return autoColor;
    }
    return colors[value]?.value || '#000000';
  };
  const getCurrentLabel = () => {
    if (value === 'auto' && showAutoOption) {
      return 'Auto';
    }
    return colors[value]?.label || 'Unknown';
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    label: label
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      onClick: onToggle,
      "aria-expanded": isOpen,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        border: '1px solid #949494',
        borderRadius: '2px',
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'flex-start'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
      colorValue: getCurrentColor()
    }), getCurrentLabel()),
    renderContent: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        padding: '8px',
        minWidth: '200px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '2px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }
    }, Object.entries(colors).map(([key, config]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: key,
      onClick: () => onChange(key),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px',
        width: '100%',
        border: 'none',
        backgroundColor: value === key ? '#f0f0f0' : 'transparent',
        textAlign: 'left',
        cursor: 'pointer'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
      colorValue: config.value
    }), config.label)))
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomColorSelect);

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/container-block/index": 0,
/******/ 			"blocks/container-block/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkwagepoint"] = globalThis["webpackChunkwagepoint"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/container-block/style-index"], () => (__webpack_require__("./src/blocks/container-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map