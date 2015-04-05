/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	crossfader = __webpack_require__(1);

	window.addEventListener('load', function(){
		var context = new AudioContext();
		var s1 = context.createOscillator();
		s1.frequency.value = 300;
		var s2 = context.createOscillator();
		s2.frequency.value = 1000;

		s1.start();
		s2.start();

		var c = crossfader(context,s1,s2);
		c.connect(context.destination);

		c.fade.value = 0;

		document.getElementById('slider').addEventListener('input', function(){
			console.log(this.value);
			c.fade.value = parseFloat(this.value);
		})

		window.setTimeout(function(){
			c.disconnect(0);
		},10000)

	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
		var crossfader = require('crossfader');
		var c = crossfader(context, node1,node2);
		c.connect(context.destination);

		*/

		module.exports = function (context, source1, source2){
			var source1Gain = context.createGain();
			var source2Gain = context.createGain();

			source1.connect(source1Gain);
			source2.connect(source2Gain);
			source1Gain.gain.value = 0;
			source2Gain.gain.value = 0;

			var _generator = context.createOscillator();
			var _constant = context.createWaveShaper();
			var _scaler = context.createGain();
			var _constantCurve = new Float32Array(2);
			_constantCurve[0] = 1;
			_constantCurve[1] = 1;
			_constant.curve = _constantCurve;
			_generator.connect(_constant);
			_constant.connect(_scaler);

			_generator.start();
			_scaler.gain.value = 0;

			var _source1Shaper = context.createWaveShaper();
			var _source1ShaperCurve = createEqPowerCurve(1024, 'up');
			_source1Shaper.curve = _source1ShaperCurve;
			var _source2Shaper = context.createWaveShaper();
			var _source2ShaperCurve = createEqPowerCurve(1024, 'down');
			_source2Shaper.curve = _source2ShaperCurve;

			_scaler.connect(_source1Shaper);
			_source1Shaper.connect(source1Gain.gain);
			_scaler.connect(_source2Shaper);
			_source2Shaper.connect(source2Gain.gain);

			return {
				connect : function (destination){
					source1Gain.connect(destination);
					source2Gain.connect(destination);
				},
				disconnect: function(){
					source1Gain.disconnect.apply(source1Gain,arguments);
					source2Gain.disconnect.apply(source2Gain,arguments);
				},
				fade : _scaler.gain
			}

			function createEqPowerCurve(size, dir){
				var curveArray = new Float32Array(size);

				for (index=0;index<size;index++){
					var currIndex;
					if (dir === 'up'){
						currIndex = index
					}else if (dir === 'down'){
						currIndex = size-index;
					}
					curveArray[index] = Math.sqrt(currIndex/size)
				}

				return curveArray;
			}
		}


/***/ }
/******/ ]);