![domlight.js](https://raw.githubusercontent.com/florianeckerstorfer/domlight.js/master/docs/domlightjs.png)
===

> **domlight.js** is a library to highlight DOM elements.

Developed by [Florian Eckerstorfer](https://florian.ec) in Vienna, Europe.

Installation
------------


Usage
-----

Use the `highlight()` and `unlight()` methods of the `DomLight` object to highlight an element or remove the highlight.
```javascript
var domlight = new DomLight();
domlight.highlight(document.querySelector('#elem1'));
domlight.unlight(document.querySelector('#elem1'));
```

You can change the color and style of the highlight by passing an settings object to the constructor:
```javascript
var domlight = new DomLight({
    'borderColor':     'rgba(126, 211, 33, 0.7)',
    'backgroundColor': 'rgba(126, 211, 33, 0.2)',
    'borderWidth':     1
});
```

You can highlight multiple elements by providing a `NodeList` to `highlightAll()`. The highlight can be removed using `unlightAll()`.
```javascript
domlight.highlightAll(document.querySelector('#my-list li'));
domlight.unlightAll(document.querySelector('#my-list li'));
```

Changelog
---------

*No version released yet.*

License
--------

The MIT license applies to domlight.js. For the full copyright and license information, please view the LICENSE file distributed with this source code.

