module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _atom = __webpack_require__(1);

var _child_process = __webpack_require__(2);

var gitBranchesFactory = function gitBranchesFactory(React, store) {
	var loadData = function loadData(onData) {
		var cwd = atom.project.getPaths()[0];
		var cmdProcess = (0, _child_process.spawn)('git', ['branch'], { cwd: cwd });
		cmdProcess.stdout.on('data', function (data) {
			onData(data.toString('utf-8').split('\n').filter(function (s) {
				return s.length > 1;
			}).map(function (value) {
				return { value: value };
			}));
		});
	};

	var accept = function accept(branch) {
		var cwd = atom.project.getPaths()[0];
		var value = branch.value.trim(0);

		if (/^\*/.test(value)) {
			console.log('Already on ' + value.substring(2));
			return;
		}

		var cmdProcess = (0, _child_process.spawn)('git', ['checkout', value], { cwd: cwd });
		cmdProcess.stdout.on('data', function () {
			store.dispatch({
				type: 'HIDE'
			});
		});
	};

	return { loadData: loadData, accept: accept };
};

module.exports = {
	subscriptions: null,

	activate: function activate() {
		this.subscriptions = new _atom.CompositeDisposable();
	},
	consumeSparkling: function consumeSparkling(sparklingSearch) {
		var gitBranches = sparklingSearch(gitBranchesFactory);

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'sparkling-extras:gitBranches': gitBranches
		}));
	},
	deactivate: function deactivate() {
		this.disposables = [];
		this.subscriptions.dispose();

		this.renameView && this.renameView.destroy();
		this.renameView = null;
	},
	serialize: function serialize() {
		return {};
	}
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("atom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map