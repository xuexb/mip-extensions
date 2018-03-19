/**
 * @file 动画逻辑处理
 * @author xuexb <fe.xiaowu@gmail.com>
 * @description 大部分动画方法参考 amp-story 动画处理，感谢 AMP 为业界做的贡献
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var naboo = util.naboo;
    var extend = util.fn.extend;

    /**
     * 动画处理
     *
     * @type {Object}
     * @param {string} key 以动画名称为 key
     * @param {number} value.duration 默认动画时长
     * @param {string} value.ease 默认动画过滤类型
     * @param {number} value.delay 默认动画延迟时间
     * @param {Object|Function} value.before 动画前设置样式，如果是 function 则回调参数为元素的 offset
     * @param {Object|Function} value.after 动画数属性，如果是 function 则回调参数为元素的 offset
     */
    var animates = {
        'fade-in': {
            duration: 500,
            easing: 'ease-out',
            before: {
                opacity: 0
            },
            after:{
                opacity: 1
            }
        },
        'fly-in-top': {
            duration: 500,
            easing: 'ease-out',
            before: function (offset) {
                var offsetY = -(offset.top + offset.height);
                return {
                    transform: 'translateY(' + offsetY +'px)'
                };
            },
            after:{
                transform: 'translateY(0)'
            }
        },
        'fly-in-bottom': {
            duration: 500,
            easing: 'ease-out',
            before: function (offset) {
                var offsetY = offset.pageHeight + offset.top;
                return {
                    transform: 'translateY(' + offsetY +'px)'
                };
            },
            after:{
                transform: 'translateY(0)'
            }
        },
        'fly-in-left': {
            duration: 500,
            easing: 'ease-out',
            before: function (offset) {
                var offsetX = -(offset.left + offset.width);
                return {
                    transform: 'translateX(' + offsetX +'px)'
                };
            },
            after:{
                transform: 'translateX(0)'
            }
        },
        'fly-in-right': {
            duration: 500,
            easing: 'ease-out',
            before: function (offset) {
                var offsetX = offset.pageWidth - offset.left;
                return {
                    transform: 'translateX(' + offsetX +'px)'
                };
            },
            after:{
                transform: 'translateX(0)'
            }
        },
        'twirl-in': {
            duration: 1000,
            easing: 'cubic-bezier(.2, .75, .4, 1)',
            before: {
                transform: 'rotate(-540deg) scale(.1)',
                opacity: 0
            },
            after: {
                transform: 'none',
                opacity: 1
            }
        },
        'whoosh-in-left': {
            duration: 500,
            easing: 'ease-out',
            before: function (offset) {
                var offsetX = -(offset.left + offset.width);
                return {
                    opacity: 0,
                    transform: 'translate(' + offsetX + 'px, 0) scale(.15)'
                }
            },
            after: {
                opacity: 1,
                transform: 'translate(0, 0) scale(1)'
            }
        },
        'whoosh-in-right': {
            duration: 500,
            easing: 'ease-out',
            before: function (offset) {
                var offsetX = offset.left + offset.width;
                return {
                    opacity: 0,
                    transform: 'translate(' + offsetX + 'px, 0) scale(.15)'
                }
            },
            after: {
                opacity: 1,
                transform: 'translate(0, 0) scale(1)'
            }
        },
        'rotate-in-left': {
            duration: 700,
            easing: 'ease-out',
            before: function (offset) {
                var offsetX = -(offset.left + offset.width);
                return {
                    transform: 'translate(' + offsetX + 'px, 0) rotate(-360deg)'
                }
            },
            after: {
                transform: 'translate(0, 0) rotate(0)'
            }
        },
        'rotate-in-right': {
            duration: 700,
            easing: 'ease-out',
            before: function (offset) {
                var offsetX = offset.left + offset.width;
                return {
                    transform: 'translate(' + offsetX + 'px, 0) rotate(360deg)'
                }
            },
            after: {
                transform: 'translate(0, 0) rotate(0)'
            }
        }
    };

    Object.keys(animates).forEach(function (key) {
        var value = animates[key];

        // 这里处理下名称是因为 naboo register 的 key 没有做去重，可能被别的项目注册覆盖，关爱代码更关爱你。
        naboo.register('mip-story-' + key, function (next, el, opts, offset) {
            opts.duration = opts.duration || value.duration || 300;
            opts.delay = opts.delay || value.delay || 0;
            opts.easing = opts.easing || value.easing || '-ease-out';

            var before = value.before;
            var after = value.after;

            if ('function' === typeof before) {
                before = before(offset);
            }
            if ('function' === typeof after) {
                after = after(offset);
            }

            util.css(el, before);

            naboo.animate(el, after, opts).start(next);
        });
    });

    naboo.keyframes = animates;

    return naboo;
});