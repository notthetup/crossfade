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
			var _source1ShaperCurve = new Float32Array(2);
		  _source1ShaperCurve[0] = 1;
		  _source1ShaperCurve[1] = 0;
		  _source1Shaper.curve = _source1ShaperCurve;
			var _source2Shaper = context.createWaveShaper();
			var _source2ShaperCurve = new Float32Array(2);
		  _source2ShaperCurve[0] = 0;
		  _source2ShaperCurve[1] = 1;
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
						source1Gain.disconnect();
						source2Gain.disconnect();
					},
					fade : _scaler.gain
			}
		}
