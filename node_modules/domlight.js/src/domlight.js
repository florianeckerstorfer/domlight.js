(function(window, factory) {
    'use strict';

    // Support three module loading scenarios
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [1] CommonJS/Node.js
        module.exports = factory();
    } else if (typeof define === 'function' && define['amd']) {
        // [2] AMD anonymous module
        define(['exports', 'require'], function() { return factory(); });
    } else {
        // [3] No module loader (plain <script> tag) - put directly in global namespace
        window.Domlight = factory();
    }
}(window, function factory() {
    var Domlight = function(options) {
        this.highlights = [];
        this.options = this.constructor.defaultOptions;
        for (var attrname in options) {
            this.options[attrname] = options[attrname];
        }
    };

    Domlight.defaultOptions = {
        'borderWidth': 3,
        'borderColor': 'rgba(255, 0, 0, 0.7)',
        'backgroundColor': 'rgba(255, 0, 0, 0)'
    };

    Domlight.prototype.highlight = function (element) {
        this.unlight(element);
        var highlight = this.createHighlightElement(this.computePosition(element), this.options);
        document.querySelector('body').appendChild(highlight);

        this.highlights.push({'element': element, 'highlight': highlight});
    };

    Domlight.prototype.highlightAll = function (elements) {
        for (var i = 0; i < elements.length; i++) {
            this.highlight(elements[i]);
        }
    };

    Domlight.prototype.unlight = function (element) {
        var index = this.getHighlightIndex(element);
        if (index !== null) {
            document.querySelector('body').removeChild(this.highlights[index].highlight);
            this.highlights[index] = null;
        }
    }

    Domlight.prototype.unlightAll = function (elements) {
        for (var i = 0; i < elements.length; i++) {
            this.unlight(elements[i]);
        }
    };

    Domlight.prototype.getHighlightIndex = function (element) {
        for (var i = 0; i < this.highlights.length; i++) {
            if (this.highlights[i] && this.highlights[i].element === element) {
                return i;
            }
        }

        return null;
    }

    Domlight.prototype.computePosition = function (element) {
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

    Domlight.prototype.createHighlightElement = function (position, options) {
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

    return Domlight;
}));
