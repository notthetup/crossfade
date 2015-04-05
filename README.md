# crossfade
Simple cross fader between two AudioNodes for WebAudio.

# Usage

- Example usage

```
var crossfader = require('crossfader');
var c = crossfader(context, node1, node2);
c.connect(context.destination);

c.fade.value = 1 //[-1,1]
```

# API

- crossfader exposes a `connect` and `disconnect` API just like other [AudioNodes](http://webaudio.github.io/web-audio-api/#idl-def-AudioNode)

- `fade` property is an [AudioParam](http://webaudio.github.io/web-audio-api/#idl-def-AudioParam). It accepts all values in the range [-1,1].

- A `fade` value of -1 implies 100% volume on node1, and 0% volume on node2, while a `fade` value of 1 implies 0% volume on node1, and 100% volume on node2.

- The mapping of `fade` to volume of each channel is currently linear.

# Thanks

Thanks to [tambien](https://github.com/tambien) for the [his idea](https://github.com/TONEnoTONE/Tone.js/tree/master/Tone/signal) of using a generator + shaper to create a-rate, first class, AudioParams.


# License

MIT

See License file
