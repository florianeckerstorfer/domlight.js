(function(factory) {
    // Support three module loading scenarios
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [1] CommonJS/Node.js
        var target = module['exports'] || exports; // module.exports is for Node.js
        factory(target, require);
    } else if (typeof define === 'function' && define['amd']) {
        // [2] AMD anonymous module
        define(['exports', 'require'], factory);
    } else {
        // [3] No module loader (plain <script> tag) - put directly in global namespace
        factory(window['domlight'] = {});
    }
}(function(domlightExports, require){
    var domlight = typeof domlightExports !== 'undefined' ? domlightExports : {};

    domlight.defaultOptions = {
        'borderWidth': 3,
        'borderColor': 'rgba(255, 0, 0, 0.7)',
        'backgroundColor': 'rgba(255, 0, 0, 0)'
    };

    domlight.highlights = [];

    domlight.getOptions = function (options) {
        var newOptions = domlight.defaultOptions;
        for (var attrname in options) {
            newOptions[attrname] = options[attrname];
        }

        return newOptions;
    };

    domlight.highlight = function (element, options) {
        domlight.unlight(element);
        var highlight = domlight.createHighlightElement(domlight.computePosition(element), domlight.getOptions(options));
        document.querySelector('body').appendChild(highlight);

        domlight.highlights.push({'element': element, 'highlight': highlight});
    };

    domlight.highlightAll = function (elements, options) {
        for (var i = 0; i < elements.length; i++) {
            domlight.highlight(elements[i], options);
        }
    };

    domlight.unlight = function (element) {
        var index = domlight.getHighlightIndex(element);
        if (index !== null) {
            document.querySelector('body').removeChild(domlight.highlights[index].highlight);
            domlight.highlights[index] = null;
        }
    }

    domlight.unlightAll = function (elements) {
        for (var i = 0; i < elements.length; i++) {
            domlight.unlight(elements[i]);
        }
    };

    domlight.getHighlightIndex = function (element) {
        for (var i = 0; i < domlight.highlights.length; i++) {
            if (domlight.highlights[i] && domlight.highlights[i].element === element) {
                return i;
            }
        }

        return null;
    }

    domlight.computePosition = function (element) {
        var range = document.createRange();
        range.selectNode(element);
        var rect = range.getBoundingClientRect();
        var left = window.pageXOffset+rect.left;
        var top = window.pageYOffset+rect.top;

        return {
            x1: left,
            x2: left+rect.width,
            y1: top,
            y2: top+rect.height
        };
    };

    domlight.createHighlightElement = function (position, options) {
        var elem = document.createElement('div');
        elem.appendChild(document.createTextNode(' '));
        elem.style.borderWidth = options.borderWidth+'px'
        elem.style.borderColor = options.borderColor;
        elem.style.borderStyle = 'solid';
        elem.style.backgroundColor = options.backgroundColor;
        elem.style.position = 'absolute';
        elem.style.left = (position.x1-options.borderWidth)+'px';
        elem.style.top = (position.y1-options.borderWidth)+'px';
        elem.style.width = (position.x2-position.x1)+'px';
        elem.style.height = (position.y2-position.y1)+'px';

        return elem;
    }
}));
