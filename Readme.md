
# store-mirror

  Web socket mirroring plugin for [store](http://github.com/bredele/store)

## Installation

  Install with [component](http://component.io):

    $ component install bredele/store-mirror

  Install with [nodejs](http://nodejs.org):

    $ component install bredele/store-mirror

  > browserify is currently not supported


## Concept

This plugin allows you to map a [store](http://github.com/bredele/store) in client and server side. If a change occurs in server side, the store in client side will immediately be updated and vice versa.

`mirror` is also really simple (see [test](https://github.com/bredele/store-mirror/tree/master/test)) and its API is the same in both sides:

### Client

```js
var mirror = require('store-mirror');

store.use(mirror('test'));
```

 > `mirror` uses [socket.io](https://github.com/LearnBoost/socket.io) as a transport layer.

### Server

```js
var mirror = require('store-mirror');
var io = require('socket.io').listen(80);

store.use(mirror('test', io));
```

### Have fun on both sides

See [store](http://github.com/bredele/store) for more information.

```js
store.set('name', 'bredele');
```

## API

### mirror(channel, origin)

 `mirror` opens a web socket `channel` and redirect every messages through this channel.

#### browser

 In client slide, `origin` is optional and should be your websocket server's address (window origin by default):

```js
store.use(mirror('test', 'http://localhost'));
```

  > don't forget to include the socket.io script in your document.

#### nodejs

 In server slide, `origin` is mandatory and is socket.io itself:

```js
var mirror = require('store-mirror');
var io = require('socket.io').listen(80);

store.use(mirror('test', io));
```


## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.