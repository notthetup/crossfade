# crossfade
Simple cross fader between two AudioNodes for WebAudio.

[![npm version](https://badge.fury.io/js/crossfade.svg)](http://badge.fury.io/js/crossfade)

# Usage

```
npm install crossfader
```

```
var crossfader = require('crossfader');
var c = crossfader(context, node1, node2);
c.connect(context.destination);

document.getElementById('slider').addEventListener('input', function(){
	c.fade.value = parseFloat(this.value);
});
```

# API

## Constructor

eg : `var c = crossfader(context, node1, node2);`

- `context`: _AudioContext_ - The [AudioContext](http://webaudio.github.io/web-audio-api/#the-audiocontext-interface) within which the [AudioNodes](http://webaudio.github.io/web-audio-api/#idl-def-AudioNode) have been created.
- `node1` : _AudioNode_ - Any AudioNode within the AudioContext. Will be assigned to the negative value of the `fade` property.
- `node2` : _AudioNode_ - Any AudioNode within the AudioContext. Will be assigned to the negative value of the `fade` property.

## Methods

- `connect` : Connect the crossfade Node to other AudioNodes.
	eg :

	```
	c.connect(context.destination);
	```
	- arguments :
		- `destination` : _AudioNode_ - The AudioNode to connect the output of the crossfader to.

- `disconnect` : Disconnect the crossfade Node from other AudioNodes.
	eg :
	```
	c.disconnect();
	```
	- supports the same arguments as [disconnect method on AudioNodes](http://webaudio.github.io/web-audio-api/#widl-AudioNode-disconnect-void)

## Properties

- `fade`: _AudioParam_ - A value in the range [-1,1] that defines how much to cross fade between `node1` and `node2`.

	eg:
	```
	c.fade.value = 0.5; //Cross fade position with equal volume from both AudioNodes
	c.fade.linearRampToValueAtTime(1, context.currentTime + 5); // Automation
	```

	`fade` property is an [AudioParam](http://webaudio.github.io/web-audio-api/#idl-def-AudioParam) and supports all [AudioParam automation methods](http://webaudio.github.io/web-audio-api/#widl-AudioParam-exponentialRampToValueAtTime-void-float-value-double-endTime).

	- A `fade` value of -1 implies 100% volume on node1, and 0% volume on node2, while a `fade` value of 1 implies 0% volume on node1, and 100% volume on node2.

	- The mapping between the value of fade and the volume follows the [equal power curve](http://www.soundonsound.com/sos/feb07/articles/ptworkshop_0207.htm).

# Credits

Thanks to [tambien](https://github.com/tambien) for the [his idea](https://github.com/TONEnoTONE/Tone.js/tree/master/Tone/signal) of using a generator + shaper to create a-rate, first class, custom AudioParams (like `fade` in this case).


# License

MIT

See License file
