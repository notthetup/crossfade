crossfader = require('./index.js');

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

})
