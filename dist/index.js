import { ref, defineComponent, useAttrs, openBlock, createBlock, h, useSlots, resolveComponent, createElementBlock, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, mergeProps, unref, Teleport, createVNode, Transition, withCtx, withKeys, withModifiers, normalizeStyle, normalizeClass, renderSlot, Fragment, renderList, watchEffect, TransitionGroup, createApp, inject } from 'vue';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$5 = "*,:after,:before{box-sizing:border-box}blockquote,body,dd,dl,figcaption,figure,h1,h2,h3,h4,hr,li,ol,p,pre,ul{margin:0}body{-webkit-text-size-adjust:100%;text-size-adjust:100%;background:#fff;font-kerning:normal;scroll-behavior:smooth}a:not([class]){text-decoration-skip-ink:auto}img{display:block;max-width:100%}button,input,select,textarea{font:inherit}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}:root{--c-background:#f4f4f4}html.darkMode{--c-background:#171717}:root{--c-background-raised:#fff}html.darkMode{--c-background-raised:#212121}:root{--c-text:#212121}html.darkMode{--c-text:#bdbdbd}:root{--c-text-muted:#616161}html.darkMode{--c-text-muted:#9e9e9e}:root{--c-text-blue:#0168b7}html.darkMode{--c-text-blue:#178adb}:root{--c-text-purple:#6b36b5}html.darkMode{--c-text-purple:#9873cc}:root{--c-text-red:#c0401c}html.darkMode{--c-text-red:#cc6f60}:root,html.darkMode{--c-text-yellow:#f6b400}:root,html.darkMode{--c-text-white:#fff}:root{--c-border-light:#eee}html.darkMode{--c-border-light:#333}:root{--c-border-medium:#e0e0e0}html.darkMode{--c-border-medium:#424242}:root{--c-border-dark:#9e9e9e}html.darkMode{--c-border-dark:#757575}:root,html.darkMode{--c-accent-white:#fff}:root,html.darkMode{--c-accent-black:#000}:root{--c-accent-yellow:#f6cb2a}html.darkMode{--c-accent-yellow:#f6a200}:root{--c-accent-focus:#65b6ed}html.darkMode{--c-accent-focus:#0b78c8}:root,html.darkMode{--c-accent-error:#cc6f60}:root{--c-button-hover:rgba(0,0,0,.03)}html.darkMode{--c-button-hover:hsla(0,0%,100%,.05)}:root,html.darkMode{--c-button-primary:#0b78c8}:root,html.darkMode{--c-button-primary-hover:#178adb}:root{--c-button-gray:#f4f4f4}html.darkMode{--c-button-gray:#333}:root,html.darkMode{--c-background-tooltip:rgba(0,0,0,.9)}:root{--c-background-toast:rgba(0,0,0,.8)}html.darkMode{--c-background-toast:rgba(0,0,0,.9)}:root{--s-none:0;--s-xxs:2px;--s-xs:4px;--s-sm:8px;--s-md:16px;--s-lg:32px;--s-xl:64px;--s-xxl:128px;--container-xs:380px;--container-sm:540px;--container-md:720px;--container-lg:960px;--container-xl:1140px;--container-xxl:1320px;--t-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--t-weight-light:300;--t-weight-regular:400;--t-weight-medium:500;--t-weight-bold:700;--t-line-height-base:1.5;--t-size-base:16px;--t-size-xxs:calc(max(var(--t-size-base) * 0.750187546886722, 14px));--t-size-xs:calc(var(--t-size-base)*1);--t-size-sm:calc(var(--t-size-base)*1.333);--t-size-md:calc(var(--t-size-base)*1.77689);--t-size-lg:calc(var(--t-size-base)*2.36859);--t-size-xl:calc(var(--t-size-base)*3.15733);--t-size-xxl:calc(var(--t-size-base)*4.20873);--t-letter-spacing-xxs:0.02em;--t-letter-spacing-xs:0.01em;--t-letter-spacing-sm:0em;--t-letter-spacing-md:-0.01em;--t-letter-spacing-lg:-0.01em;--t-letter-spacing-xl:-0.02em;--t-letter-spacing-xxl:-0.02em;--t-line-height-xxs:calc(var(--t-line-height-base)*1.1);--t-line-height-xs:calc(var(--t-line-height-base)*1);--t-line-height-sm:calc(var(--t-line-height-base)*1);--t-line-height-md:calc(var(--t-line-height-base)*1);--t-line-height-lg:calc(var(--t-line-height-base)*0.9);--t-line-height-xl:calc(var(--t-line-height-base)*0.8);--t-line-height-xxl:calc(var(--t-line-height-base)*0.8)}body,html{height:100%}#app{min-height:100%}html{color-scheme:light}html.darkMode{color-scheme:dark}body{background:var(--c-background);color:var(--c-text)}.r-container-fill,.r-container-lg,.r-container-md,.r-container-sm,.r-container-xl,.r-container-xs,.r-container-xxl{margin-left:auto;margin-right:auto;padding-left:var(--s-md);padding-right:var(--s-md)}.r-container-xs{max-width:var(--container-xs)}.r-container-sm{max-width:var(--container-sm)}.r-container-md{max-width:var(--container-md)}.r-container-lg{max-width:var(--container-lg)}.r-container-xl{max-width:var(--container-xl)}.r-container-xxl{max-width:var(--container-xxl)}.r-background{background:var(--c-background)}.r-background-raised{background:var(--c-background-raised)}.r-border-radius-none{border-radius:var(--s-none)!important}.r-m-none{margin:var(--s-none)!important}.r-m-t-none{margin-top:var(--s-none)!important}.r-m-b-none{margin-bottom:var(--s-none)!important}.r-m-l-none{margin-left:var(--s-none)!important}.r-m-r-none{margin-right:var(--s-none)!important}.r-p-none{padding:var(--s-none)!important}.r-p-t-none{padding-top:var(--s-none)!important}.r-p-b-none{padding-bottom:var(--s-none)!important}.r-p-l-none{padding-left:var(--s-none)!important}.r-p-r-none{padding-right:var(--s-none)!important}.r-border-radius-xxs{border-radius:var(--s-xxs)!important}.r-m-xxs{margin:var(--s-xxs)!important}.r-m-t-xxs{margin-top:var(--s-xxs)!important}.r-m-b-xxs{margin-bottom:var(--s-xxs)!important}.r-m-l-xxs{margin-left:var(--s-xxs)!important}.r-m-r-xxs{margin-right:var(--s-xxs)!important}.r-p-xxs{padding:var(--s-xxs)!important}.r-p-t-xxs{padding-top:var(--s-xxs)!important}.r-p-b-xxs{padding-bottom:var(--s-xxs)!important}.r-p-l-xxs{padding-left:var(--s-xxs)!important}.r-p-r-xxs{padding-right:var(--s-xxs)!important}.r-border-radius-xs{border-radius:var(--s-xs)!important}.r-m-xs{margin:var(--s-xs)!important}.r-m-t-xs{margin-top:var(--s-xs)!important}.r-m-b-xs{margin-bottom:var(--s-xs)!important}.r-m-l-xs{margin-left:var(--s-xs)!important}.r-m-r-xs{margin-right:var(--s-xs)!important}.r-p-xs{padding:var(--s-xs)!important}.r-p-t-xs{padding-top:var(--s-xs)!important}.r-p-b-xs{padding-bottom:var(--s-xs)!important}.r-p-l-xs{padding-left:var(--s-xs)!important}.r-p-r-xs{padding-right:var(--s-xs)!important}.r-border-radius-sm{border-radius:var(--s-sm)!important}.r-m-sm{margin:var(--s-sm)!important}.r-m-t-sm{margin-top:var(--s-sm)!important}.r-m-b-sm{margin-bottom:var(--s-sm)!important}.r-m-l-sm{margin-left:var(--s-sm)!important}.r-m-r-sm{margin-right:var(--s-sm)!important}.r-p-sm{padding:var(--s-sm)!important}.r-p-t-sm{padding-top:var(--s-sm)!important}.r-p-b-sm{padding-bottom:var(--s-sm)!important}.r-p-l-sm{padding-left:var(--s-sm)!important}.r-p-r-sm{padding-right:var(--s-sm)!important}.r-border-radius-md{border-radius:var(--s-md)!important}.r-m-md{margin:var(--s-md)!important}.r-m-t-md{margin-top:var(--s-md)!important}.r-m-b-md{margin-bottom:var(--s-md)!important}.r-m-l-md{margin-left:var(--s-md)!important}.r-m-r-md{margin-right:var(--s-md)!important}.r-p-md{padding:var(--s-md)!important}.r-p-t-md{padding-top:var(--s-md)!important}.r-p-b-md{padding-bottom:var(--s-md)!important}.r-p-l-md{padding-left:var(--s-md)!important}.r-p-r-md{padding-right:var(--s-md)!important}.r-border-radius-lg{border-radius:var(--s-lg)!important}.r-m-lg{margin:var(--s-lg)!important}.r-m-t-lg{margin-top:var(--s-lg)!important}.r-m-b-lg{margin-bottom:var(--s-lg)!important}.r-m-l-lg{margin-left:var(--s-lg)!important}.r-m-r-lg{margin-right:var(--s-lg)!important}.r-p-lg{padding:var(--s-lg)!important}.r-p-t-lg{padding-top:var(--s-lg)!important}.r-p-b-lg{padding-bottom:var(--s-lg)!important}.r-p-l-lg{padding-left:var(--s-lg)!important}.r-p-r-lg{padding-right:var(--s-lg)!important}.r-border-radius-xl{border-radius:var(--s-xl)!important}.r-m-xl{margin:var(--s-xl)!important}.r-m-t-xl{margin-top:var(--s-xl)!important}.r-m-b-xl{margin-bottom:var(--s-xl)!important}.r-m-l-xl{margin-left:var(--s-xl)!important}.r-m-r-xl{margin-right:var(--s-xl)!important}.r-p-xl{padding:var(--s-xl)!important}.r-p-t-xl{padding-top:var(--s-xl)!important}.r-p-b-xl{padding-bottom:var(--s-xl)!important}.r-p-l-xl{padding-left:var(--s-xl)!important}.r-p-r-xl{padding-right:var(--s-xl)!important}.r-border-radius-xxl{border-radius:var(--s-xxl)!important}.r-m-xxl{margin:var(--s-xxl)!important}.r-m-t-xxl{margin-top:var(--s-xxl)!important}.r-m-b-xxl{margin-bottom:var(--s-xxl)!important}.r-m-l-xxl{margin-left:var(--s-xxl)!important}.r-m-r-xxl{margin-right:var(--s-xxl)!important}.r-p-xxl{padding:var(--s-xxl)!important}.r-p-t-xxl{padding-top:var(--s-xxl)!important}.r-p-b-xxl{padding-bottom:var(--s-xxl)!important}.r-p-l-xxl{padding-left:var(--s-xxl)!important}.r-p-r-xxl{padding-right:var(--s-xxl)!important}.r-clearfix:after,.r-clearfix:before{content:\" \";display:table}.r-clearfix:after{clear:both}@media (max-width:380px){.r-media-hide-under-xs{display:none!important}}@media (min-width:380.1px){.r-media-hide-over-xs{display:none!important}}@media (max-width:540px){.r-media-hide-under-sm{display:none!important}}@media (min-width:540.1px){.r-media-hide-over-sm{display:none!important}}@media (max-width:720px){.r-media-hide-under-md{display:none!important}}@media (min-width:720.1px){.r-media-hide-over-md{display:none!important}}@media (max-width:960px){.r-media-hide-under-lg{display:none!important}}@media (min-width:960.1px){.r-media-hide-over-lg{display:none!important}}@media (max-width:1140px){.r-media-hide-under-xl{display:none!important}}@media (min-width:1140.1px){.r-media-hide-over-xl{display:none!important}}@media (max-width:1320px){.r-media-hide-under-xxl{display:none!important}}@media (min-width:1320.1px){.r-media-hide-over-xxl{display:none!important}}.r-flex-container{display:flex;flex-direction:row}.r-flex-container-column{flex-direction:column}.r-flex-items-start{align-items:flex-start}.r-flex-items-center{align-items:center}.r-flex-items-end{align-items:flex-end}.r-flex-0{flex:0 0 auto}.r-flex-1{flex:1 1 auto}.r-flex-2{flex:2 2 auto}.r-flex-3{flex:3 3 auto}body{font-family:var(--t-family);line-height:var(--t-line-height-base);word-break:break-word}.r-text-size-xxs{font-size:var(--t-size-xxs)}.r-text-letter-spacing-xxs{letter-spacing:var(--t-letter-spacing-xxs)}.r-text-line-height-xxs,.r-text-xxs{line-height:var(--t-line-height-xxs)}.r-text-xxs{font-size:var(--t-size-xxs);letter-spacing:var(--t-letter-spacing-xxs)}.r-text-size-xs{font-size:var(--t-size-xs)}.r-text-letter-spacing-xs{letter-spacing:var(--t-letter-spacing-xs)}.r-text-line-height-xs,.r-text-xs{line-height:var(--t-line-height-xs)}.r-text-xs{font-size:var(--t-size-xs);letter-spacing:var(--t-letter-spacing-xs)}.r-text-size-sm{font-size:var(--t-size-sm)}.r-text-letter-spacing-sm{letter-spacing:var(--t-letter-spacing-sm)}.r-text-line-height-sm,.r-text-sm{line-height:var(--t-line-height-sm)}.r-text-sm{font-size:var(--t-size-sm);letter-spacing:var(--t-letter-spacing-sm)}.r-text-size-md{font-size:var(--t-size-md)}.r-text-letter-spacing-md{letter-spacing:var(--t-letter-spacing-md)}.r-text-line-height-md,.r-text-md{line-height:var(--t-line-height-md)}.r-text-md{font-size:var(--t-size-md);letter-spacing:var(--t-letter-spacing-md)}.r-text-size-lg{font-size:var(--t-size-lg)}.r-text-letter-spacing-lg{letter-spacing:var(--t-letter-spacing-lg)}.r-text-lg,.r-text-line-height-lg{line-height:var(--t-line-height-lg)}.r-text-lg{font-size:var(--t-size-lg);letter-spacing:var(--t-letter-spacing-lg)}.r-text-size-xl{font-size:var(--t-size-xl)}.r-text-letter-spacing-xl{letter-spacing:var(--t-letter-spacing-xl)}.r-text-line-height-xl,.r-text-xl{line-height:var(--t-line-height-xl)}.r-text-xl{font-size:var(--t-size-xl);letter-spacing:var(--t-letter-spacing-xl)}.r-text-size-xxl{font-size:var(--t-size-xxl)}.r-text-letter-spacing-xxl{letter-spacing:var(--t-letter-spacing-xxl)}.r-text-line-height-xxl,.r-text-xxl{line-height:var(--t-line-height-xxl)}.r-text-xxl{font-size:var(--t-size-xxl);letter-spacing:var(--t-letter-spacing-xxl)}.r-text-light{font-weight:var(--t-weight-light)}.r-text-regular{font-weight:var(--t-weight-regular)}.r-text-medium{font-weight:var(--t-weight-medium)}.r-text-bold,b,strong{font-weight:var(--t-weight-bold)}:is(h1,h2,h3,h4,h5,h6,p,ul,ol,pre,.r-space)+:is(p,ul,ol,pre,.r-space){margin-top:var(--s-md)}a{color:var(--c-text-blue);cursor:pointer;text-underline-position:under}a:visited{color:var(--c-text-purple)}.r-text-color-regular{color:var(--c-text)}.r-text-color-muted{color:var(--c-text-muted)}.r-text-color-red{color:var(--c-text-red)}.r-text-left{text-align:left}.r-text-center{text-align:center}.r-text-right{text-align:right}.r-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}hr{background:var(--c-border-medium);border:none;box-shadow:none;height:2px;outline:none;padding:0}code:not([class]),pre{border:2px solid var(--c-border-light);border-radius:var(--s-sm);padding:var(--s-xxs) var(--s-sm)}pre{overflow-x:auto;padding:var(--s-md)}ol,ul{padding-left:var(--s-lg)}.r-form-group{margin-bottom:var(--s-md)}.r-form-label{display:block;margin-bottom:$space-extra-tiny}.r-input-text{-webkit-touch-callout:none;align-items:center;-webkit-appearance:none;-moz-appearance:none;background:var(--c-background-raised);border:1px solid var(--c-border-medium);border-radius:var(--s-sm);color:var(--c-text);display:inline-flex;font-family:var(--t-family);height:42px;justify-content:center;padding:0 12px;position:relative;text-decoration:none;vertical-align:top}.r-input-text:active,.r-input-text:focus{outline:none}.r-input-text[disabled]{pointer-events:none}.r-input-text:active:not([disabled]),.r-input-text:focus:not(:active){border-color:var(--c-accent-focus);box-shadow:0 0 2px var(--c-accent-focus)}.r-input-text.fullwidth{display:flex;width:100%}.r-input-text.small{height:34px}.r-input-text::placeholder{color:$c-text-quiet;opacity:.8}.r-input-text.invalid{border-color:var(--c-accent-error);box-shadow:inset 0 0 2px var(--c-accent-error)}textarea.r-input-text{height:auto;overflow:hidden;padding:9px 12px;resize:vertical}";
styleInject(css_248z$5);

var modalsOpen = ref([]);
var modalConfirm = ref();
var tooltips = ref(new Map());
var activeTooltips = ref(new Set());
var notify = ref();

var setTooltip = function (id, binding, el) {
    tooltips.value.set(id, { value: binding.value, modifiers: binding.modifiers, el: el });
};
var onMouseEnter = function (event) {
    var id = event.target._uid;
    activeTooltips.value.add(id);
};
var onMouseLeave = function (event) {
    var id = event.target._uid;
    activeTooltips.value["delete"](id);
};
var TooltipDirectiveOptions = {
    mounted: function (el, binding) {
        var id = "_".concat(Math.random().toString(36).substr(2)).concat(Math.random().toString(36).substr(2));
        el._uid = id;
        setTooltip(id, binding, el);
        el.addEventListener("mouseenter", onMouseEnter, { passive: true });
        el.addEventListener("mouseleave", onMouseLeave, { passive: true });
    },
    updated: function (el, binding) {
        var id = el._uid;
        setTooltip(id, binding, el);
    },
    beforeUnmount: function (el) {
        var id = el._uid;
        tooltips.value["delete"](id);
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
    }
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/* eslint-disable quote-props */

const ICONS = {
  "add": "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  "add image": "M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z",
  "add text": "M8.5,7H10.5L16,21H13.6L12.5,18H6.3L5.2,21H3L8.5,7M7.1,16H11.9L9.5,9.7L7.1,16M22,5V7H19V10H17V7H14V5H17V2H19V5H22Z",
  "add date": "M19,19V7H5V19H19M16,1H18V3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1M11,9H13V12H16V14H13V17H11V14H8V12H11V9Z",
  "add article": "M17 19.22H5V7H12V5H5C3.9 5 3 5.9 3 7V19C3 20.1 3.9 21 5 21H17C18.1 21 19 20.1 19 19V12H17V19.22Z M19 2H17V5H14C14.01 5.01 14 7 14 7H17V9.99C17.01 10 19 9.99 19 9.99V7H22V5H19V2Z M15 9H7V11H15V9Z M7 12V14H15V12H7Z M15 15H7V17H15V15Z",

  "send": "M2,21L23,12L2,3V10L17,12L2,14V21Z",
  "check": "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
  "undo": "M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z",
  "redo": "M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z",
  "attention": "M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z",
  "close": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  "more": "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",

  "date": "M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z",
  "merge": "M17,20.41L18.41,19L15,15.59L13.59,17M7.5,8H11V13.59L5.59,19L7,20.41L13,14.41V8H16.5L12,3.5",
  "download": "M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z",
  "sync": "M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z",
  "log out": "M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z",
  "file": "M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z",
  "upload": "M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z",
  "edit": "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
  "delete": "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z",
  "images": "M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z",
  "modal": "M18 18V20H4A2 2 0 0 1 2 18V8H4V18M22 6V14A2 2 0 0 1 20 16H8A2 2 0 0 1 6 14V6A2 2 0 0 1 8 4H20A2 2 0 0 1 22 6M20 6H8V14H20Z",
  "notification": "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21",
  "search": "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
  "search file": "M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M5,3H19C20.11,3 21,3.89 21,5V13.03C20.5,12.23 19.81,11.54 19,11V5H5V19H9.5C9.81,19.75 10.26,20.42 10.81,21H5C3.89,21 3,20.11 3,19V5C3,3.89 3.89,3 5,3M7,7H17V9H7V7M7,11H12.03C11.23,11.5 10.54,12.19 10,13H7V11M7,15H9.17C9.06,15.5 9,16 9,16.5V17H7V15Z",
  "history": "M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3",
  "web": "M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  "public": "M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  "settings": "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",
  "menu": "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
  "home": "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",

  "new message": "M16.2561 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9.74394C21.5308 9.90977 21.026 10 20.5 10C20.331 10 20.1642 9.99068 20 9.97254V18H4V8L12 13L18.006 9.24624C17.5187 8.92119 17.0984 8.5036 16.7703 8.01858L12 11L4 6H16.0275C16.0093 5.83583 16 5.669 16 5.5C16 4.97405 16.0902 4.46917 16.2561 4ZM18,5.5a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0Z",
  "mail": "M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z",
  "pin": "M16 12V6L18 5V3H6V5L8 6V12L5 14V16H11.2V22H12.8V16H19V14L16 12Z",
  "pin off": "M2 5.27L3.28 4L20 20.72L18.73 22L12.8 16.07V22H11.2V16H5V14L8 12V11.27L2 5.27ZM16 12L19 14V16H17.82L8 6.18V6L6 5V3H18V5L16 6V12Z",
  "reply": "M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z",

  "play": "M8,5.14V19.14L19,12.14L8,5.14Z",
  "pause": "M14,19H18V5H14M6,19H10V5H6V19Z",
  "power": "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",

  "expand": "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z",
  "collapse": "M16.59,5.41L15.17,4L12,7.17L8.83,4L7.41,5.41L12,10M7.41,18.59L8.83,20L12,16.83L15.17,20L16.58,18.59L12,14L7.41,18.59Z",

  "eye hidden": "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z",
  "eye visible": "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",
  "brightness dark": "M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z",
  "brightness bright": "M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z",
  "brightness auto": "M14.3,16L13.6,14H10.4L9.7,16H7.8L11,7H13L16.2,16H14.3M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69M10.85,12.65H13.15L12,9L10.85,12.65Z",
  "dark mode": "M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z",
  "light mode": "M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z",

  "arrow up": "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
  "arrow down": "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
  "arrow left": "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",
  "arrow right": "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",
  "arrow max": "M4.08,11.92L12,4L19.92,11.92L18.5,13.33L13,7.83V22H11V7.83L5.5,13.33L4.08,11.92M12,4H22V2H2V4H12Z",
  "arrow min": "M19.92,12.08L12,20L4.08,12.08L5.5,10.67L11,16.17V2H13V16.17L18.5,10.66L19.92,12.08M12,20H2V22H22V20H12Z",

  "chevron down": "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  "chevron up": "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",
  "chevron left": "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
  "chevron right": "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",

  "star": "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
  "star outline": "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",

  "user": "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",
  "user circle": "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z",
  "user leave": "M19,21V19H15V17H19V15L22,18L19,21M13,18C13,18.71 13.15,19.39 13.42,20H2V17C2,14.79 5.58,13 10,13C11,13 11.96,13.09 12.85,13.26C13.68,13.42 14.44,13.64 15.11,13.92C13.83,14.83 13,16.32 13,18M4,17V18H11C11,16.96 11.23,15.97 11.64,15.08L10,15C6.69,15 4,15.9 4,17M10,4A4,4 0 0,1 14,8A4,4 0 0,1 10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M10,6A2,2 0 0,0 8,8A2,2 0 0,0 10,10A2,2 0 0,0 12,8A2,2 0 0,0 10,6Z",
  "user join": "M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z",

  "text bold": "M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z",
  "text italic": "M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z",
  "text underline": "M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z",
  "text title": "M5,4V7H10.5V19H13.5V7H19V4H5Z",
  "text h1": "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z",
  "text h2": "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z",
  "text h3": "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z",
  "text quote": "M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z",
  "text code": "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z",
  "text code block": "M11,6.5V9.33L8.33,12L11,14.67V17.5L5.5,12M13,6.43L18.57,12L13,17.57V14.74L15.74,12L13,9.26M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5Z",

  "dice 1": "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z",
  "dice 2": "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z",
  "dice 3": "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15Z",
  "dice 4": "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z",
  "dice 5": "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z",
  "dice 6": "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,10A2,2 0 0,0 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M7,10A2,2 0 0,0 5,12A2,2 0 0,0 7,14A2,2 0 0,0 9,12A2,2 0 0,0 7,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z",
  "dice multiple": "M19.78,3H11.22C10.55,3 10,3.55 10,4.22V8H16V14H19.78C20.45,14 21,13.45 21,12.78V4.22C21,3.55 20.45,3 19.78,3M12.44,6.67C11.76,6.67 11.21,6.12 11.21,5.44C11.21,4.76 11.76,4.21 12.44,4.21A1.23,1.23 0 0,1 13.67,5.44C13.67,6.12 13.12,6.67 12.44,6.67M18.56,12.78C17.88,12.79 17.33,12.24 17.32,11.56C17.31,10.88 17.86,10.33 18.54,10.32C19.22,10.31 19.77,10.86 19.78,11.56C19.77,12.23 19.23,12.77 18.56,12.78M18.56,6.67C17.88,6.68 17.33,6.13 17.32,5.45C17.31,4.77 17.86,4.22 18.54,4.21C19.22,4.2 19.77,4.75 19.78,5.44C19.78,6.12 19.24,6.66 18.56,6.67M4.22,10H12.78A1.22,1.22 0 0,1 14,11.22V19.78C14,20.45 13.45,21 12.78,21H4.22C3.55,21 3,20.45 3,19.78V11.22C3,10.55 3.55,10 4.22,10M8.5,14.28C7.83,14.28 7.28,14.83 7.28,15.5C7.28,16.17 7.83,16.72 8.5,16.72C9.17,16.72 9.72,16.17 9.72,15.5A1.22,1.22 0 0,0 8.5,14.28M5.44,11.22C4.77,11.22 4.22,11.77 4.22,12.44A1.22,1.22 0 0,0 5.44,13.66C6.11,13.66 6.66,13.11 6.66,12.44V12.44C6.66,11.77 6.11,11.22 5.44,11.22M11.55,17.33C10.88,17.33 10.33,17.88 10.33,18.55C10.33,19.22 10.88,19.77 11.55,19.77A1.22,1.22 0 0,0 12.77,18.55H12.77C12.77,17.88 12.23,17.34 11.56,17.33H11.55Z",
};

var script$7 = defineComponent({
    props: {
        icon: {
            type: String,
            required: true,
            validator: function (value) {
                if (__spreadArray(__spreadArray([], Object.keys(ICONS), true), ["missing"], false).includes(value)) {
                    return true;
                }
                console.warn("Invalid icon name ".concat(value, ", available names are ").concat(Object.keys(ICONS).join(", ")));
                return false;
            }
        }
    },
    setup: function (__props) {
        var props = __props;
        var attrs = useAttrs();
        var MISSING_ICON = "M21.5,10.8L13.2,2.5C12.5,1.8 11.5,1.8 10.8,2.5L2.5,10.8C1.8,11.5 1.8,12.5 2.5,13.2L10.8,21.5C11.5,22.2 12.5,22.2 13.2,21.5L21.5,13.2C22.1,12.5 22.1,11.5 21.5,10.8M12.5,17H11V15.5H12.5V17M14.3,11.8C13.9,12.3 13.2,12.6 12.9,13.1C12.6,13.5 12.6,14 12.6,14.5H11C11,13.7 11,13 11.3,12.5C11.6,12 12.3,11.7 12.7,11.4C13.9,10.3 13.6,8.7 11.9,8.6C11.1,8.6 10.4,9.3 10.4,10.1H9C9,8.4 10.3,7.1 12,7.1C14.7,7.1 15.9,9.8 14.3,11.8Z";
        var toSvgTag = function (svgPath) { return "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\"><path d=\"".concat(svgPath, "\" /></svg>"); };
        var valid = !!ICONS[props.icon];
        var Icon = function () {
            return h("span", {
                "aria-hidden": true,
                "class": ["r-icon", valid ? "" : "red"],
                directives: attrs.directives,
                innerHTML: valid ? toSvgTag(ICONS[props.icon]) : toSvgTag(MISSING_ICON)
            });
        };
        return function (_ctx, _cache) {
            return (openBlock(), createBlock(Icon));
        };
    }
});

var css_248z$4 = ":root{--c-background:#f4f4f4}html.darkMode{--c-background:#171717}:root{--c-background-raised:#fff}html.darkMode{--c-background-raised:#212121}:root{--c-text:#212121}html.darkMode{--c-text:#bdbdbd}:root{--c-text-muted:#616161}html.darkMode{--c-text-muted:#9e9e9e}:root{--c-text-blue:#0168b7}html.darkMode{--c-text-blue:#178adb}:root{--c-text-purple:#6b36b5}html.darkMode{--c-text-purple:#9873cc}:root{--c-text-red:#c0401c}html.darkMode{--c-text-red:#cc6f60}:root,html.darkMode{--c-text-yellow:#f6b400}:root,html.darkMode{--c-text-white:#fff}:root{--c-border-light:#eee}html.darkMode{--c-border-light:#333}:root{--c-border-medium:#e0e0e0}html.darkMode{--c-border-medium:#424242}:root{--c-border-dark:#9e9e9e}html.darkMode{--c-border-dark:#757575}:root,html.darkMode{--c-accent-white:#fff}:root,html.darkMode{--c-accent-black:#000}:root{--c-accent-yellow:#f6cb2a}html.darkMode{--c-accent-yellow:#f6a200}:root{--c-accent-focus:#65b6ed}html.darkMode{--c-accent-focus:#0b78c8}:root,html.darkMode{--c-accent-error:#cc6f60}:root{--c-button-hover:rgba(0,0,0,.03)}html.darkMode{--c-button-hover:hsla(0,0%,100%,.05)}:root,html.darkMode{--c-button-primary:#0b78c8}:root,html.darkMode{--c-button-primary-hover:#178adb}:root{--c-button-gray:#f4f4f4}html.darkMode{--c-button-gray:#333}:root,html.darkMode{--c-background-tooltip:rgba(0,0,0,.9)}:root{--c-background-toast:rgba(0,0,0,.8)}html.darkMode{--c-background-toast:rgba(0,0,0,.9)}:root{--s-none:0;--s-xxs:2px;--s-xs:4px;--s-sm:8px;--s-md:16px;--s-lg:32px;--s-xl:64px;--s-xxl:128px;--container-xs:380px;--container-sm:540px;--container-md:720px;--container-lg:960px;--container-xl:1140px;--container-xxl:1320px;--t-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--t-weight-light:300;--t-weight-regular:400;--t-weight-medium:500;--t-weight-bold:700;--t-line-height-base:1.5;--t-size-base:16px;--t-size-xxs:calc(max(var(--t-size-base) * 0.750187546886722, 14px));--t-size-xs:calc(var(--t-size-base)*1);--t-size-sm:calc(var(--t-size-base)*1.333);--t-size-md:calc(var(--t-size-base)*1.77689);--t-size-lg:calc(var(--t-size-base)*2.36859);--t-size-xl:calc(var(--t-size-base)*3.15733);--t-size-xxl:calc(var(--t-size-base)*4.20873);--t-letter-spacing-xxs:0.02em;--t-letter-spacing-xs:0.01em;--t-letter-spacing-sm:0em;--t-letter-spacing-md:-0.01em;--t-letter-spacing-lg:-0.01em;--t-letter-spacing-xl:-0.02em;--t-letter-spacing-xxl:-0.02em;--t-line-height-xxs:calc(var(--t-line-height-base)*1.1);--t-line-height-xs:calc(var(--t-line-height-base)*1);--t-line-height-sm:calc(var(--t-line-height-base)*1);--t-line-height-md:calc(var(--t-line-height-base)*1);--t-line-height-lg:calc(var(--t-line-height-base)*0.9);--t-line-height-xl:calc(var(--t-line-height-base)*0.8);--t-line-height-xxl:calc(var(--t-line-height-base)*0.8)}.r-icon{display:inline-block;height:24px;width:24px}.r-icon.icon-text{display:inline-block;position:relative;top:1px;vertical-align:text-bottom}.r-icon.icon-text,.r-icon.icon-text svg{height:18px!important;width:18px!important}.r-icon.gray svg{fill:var(--c-text-muted)}.r-icon.green svg{fill:green}.r-icon.red svg{fill:var(--c-text-red)}.r-icon.blue svg{fill:var(--c-text-blue)}.r-icon.gold svg{fill:var(--c-text-yellow)}.r-icon.white svg{fill:var(--c-text-white)}";
styleInject(css_248z$4);

script$7.__file = "src/components/Icon.vue";

var script$6 = defineComponent({
    props: {
        action: Function,
        actionWithModifier: Function,
        label: String,
        icon: String,
        iconRight: Boolean,
        iconColor: String,
        borderless: Boolean,
        primary: Boolean,
        gray: Boolean,
        fullwidth: Boolean,
        small: Boolean,
        loading: Boolean,
        submit: Boolean,
        disabled: Boolean
    },
    setup: function (__props) {
        var props = __props;
        var attrs = useAttrs();
        var slots = useSlots();
        var Icon = resolveComponent("r-icon");
        var Button = function () {
            var childrenNodes = [];
            var textSlot = slots["default"] && slots["default"]();
            var icon;
            if (props.icon) {
                icon = h(Icon, {
                    icon: props.icon,
                    "class": [{
                            white: props.primary,
                            gray: !props.primary && !props.iconColor
                        }, props.iconColor]
                });
            }
            if (icon && !props.iconRight) {
                childrenNodes.push(icon);
            }
            if (textSlot) {
                childrenNodes.push(h("span", {}, [textSlot]));
            }
            if (icon && props.iconRight) {
                childrenNodes.push(icon);
            }
            var buttonClasses = {
                "r-button": true,
                "icon-only": props.icon && !textSlot,
                borderless: props.borderless,
                primary: props.primary,
                gray: props.gray,
                fullwidth: props.fullwidth,
                small: props.small,
                loading: props.loading
            };
            return h("button", {
                "aria-label": props.label,
                disabled: props.disabled || props.loading,
                type: props.submit ? "submit" : "button",
                "class": buttonClasses,
                directives: attrs.directives,
                onClick: function (event) {
                    if (props.actionWithModifier && event.getModifierState("Control") && !event.getModifierState("Shift") && !event.getModifierState("Alt") && !event.getModifierState("Meta")) {
                        props.actionWithModifier(event);
                        return;
                    }
                    if (props.action) {
                        props.action(event);
                    }
                },
                onPointerdown: function (event) {
                    event.preventDefault();
                    event.currentTarget.focus();
                    event.currentTarget.blur();
                }
            }, childrenNodes);
        };
        return function (_ctx, _cache) {
            return (openBlock(), createBlock(Button));
        };
    }
});

var css_248z$3 = ":root{--c-background:#f4f4f4}html.darkMode{--c-background:#171717}:root{--c-background-raised:#fff}html.darkMode{--c-background-raised:#212121}:root{--c-text:#212121}html.darkMode{--c-text:#bdbdbd}:root{--c-text-muted:#616161}html.darkMode{--c-text-muted:#9e9e9e}:root{--c-text-blue:#0168b7}html.darkMode{--c-text-blue:#178adb}:root{--c-text-purple:#6b36b5}html.darkMode{--c-text-purple:#9873cc}:root{--c-text-red:#c0401c}html.darkMode{--c-text-red:#cc6f60}:root,html.darkMode{--c-text-yellow:#f6b400}:root,html.darkMode{--c-text-white:#fff}:root{--c-border-light:#eee}html.darkMode{--c-border-light:#333}:root{--c-border-medium:#e0e0e0}html.darkMode{--c-border-medium:#424242}:root{--c-border-dark:#9e9e9e}html.darkMode{--c-border-dark:#757575}:root,html.darkMode{--c-accent-white:#fff}:root,html.darkMode{--c-accent-black:#000}:root{--c-accent-yellow:#f6cb2a}html.darkMode{--c-accent-yellow:#f6a200}:root{--c-accent-focus:#65b6ed}html.darkMode{--c-accent-focus:#0b78c8}:root,html.darkMode{--c-accent-error:#cc6f60}:root{--c-button-hover:rgba(0,0,0,.03)}html.darkMode{--c-button-hover:hsla(0,0%,100%,.05)}:root,html.darkMode{--c-button-primary:#0b78c8}:root,html.darkMode{--c-button-primary-hover:#178adb}:root{--c-button-gray:#f4f4f4}html.darkMode{--c-button-gray:#333}:root,html.darkMode{--c-background-tooltip:rgba(0,0,0,.9)}:root{--c-background-toast:rgba(0,0,0,.8)}html.darkMode{--c-background-toast:rgba(0,0,0,.9)}:root{--s-none:0;--s-xxs:2px;--s-xs:4px;--s-sm:8px;--s-md:16px;--s-lg:32px;--s-xl:64px;--s-xxl:128px;--container-xs:380px;--container-sm:540px;--container-md:720px;--container-lg:960px;--container-xl:1140px;--container-xxl:1320px;--t-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--t-weight-light:300;--t-weight-regular:400;--t-weight-medium:500;--t-weight-bold:700;--t-line-height-base:1.5;--t-size-base:16px;--t-size-xxs:calc(max(var(--t-size-base) * 0.750187546886722, 14px));--t-size-xs:calc(var(--t-size-base)*1);--t-size-sm:calc(var(--t-size-base)*1.333);--t-size-md:calc(var(--t-size-base)*1.77689);--t-size-lg:calc(var(--t-size-base)*2.36859);--t-size-xl:calc(var(--t-size-base)*3.15733);--t-size-xxl:calc(var(--t-size-base)*4.20873);--t-letter-spacing-xxs:0.02em;--t-letter-spacing-xs:0.01em;--t-letter-spacing-sm:0em;--t-letter-spacing-md:-0.01em;--t-letter-spacing-lg:-0.01em;--t-letter-spacing-xl:-0.02em;--t-letter-spacing-xxl:-0.02em;--t-line-height-xxs:calc(var(--t-line-height-base)*1.1);--t-line-height-xs:calc(var(--t-line-height-base)*1);--t-line-height-sm:calc(var(--t-line-height-base)*1);--t-line-height-md:calc(var(--t-line-height-base)*1);--t-line-height-lg:calc(var(--t-line-height-base)*0.9);--t-line-height-xl:calc(var(--t-line-height-base)*0.8);--t-line-height-xxl:calc(var(--t-line-height-base)*0.8)}.r-button{-webkit-touch-callout:none;align-items:center;-webkit-appearance:none;-moz-appearance:none;background:var(--c-background-raised);border:1px solid var(--c-border-medium);border-radius:var(--s-sm);color:var(--c-text);cursor:pointer;display:inline-flex;font-family:var(--t-family);height:42px;justify-content:center;padding:0 12px;position:relative;text-align:center;text-decoration:none;user-select:none;vertical-align:top;white-space:nowrap}.r-button:active,.r-button:focus{outline:none}.r-button[disabled]{pointer-events:none}.r-button:active:not([disabled]),.r-button:focus:not(:active){border-color:var(--c-accent-focus);box-shadow:0 0 2px var(--c-accent-focus)}.r-button.fullwidth{display:flex;width:100%}.r-button.small{height:34px}.r-button.borderless:hover,.r-button:hover{background:var(--c-button-hover)}.r-button:focus{border-color:var(--c-accent-black)!important;box-shadow:inset 0 0 0 1px var(--c-accent-black),inset 0 0 0 3px var(--c-accent-yellow)!important}.r-button.borderless{background-color:transparent;border-color:transparent}.r-button.primary{background:var(--c-button-primary);border-color:transparent;color:var(--c-text-white)}.r-button.primary:hover{background:var(--c-button-primary-hover)}.r-button.gray{background:var(--c-button-gray)}.r-button.gray:hover{background:var(--c-button-hover)}.r-button[disabled]{box-shadow:none!important;opacity:.5}.r-button.icon-only{min-width:42px;padding:0;width:42px}.r-button.icon-only.small{min-width:34px;width:34px}.r-button:not(.icon-only){min-width:65px}.r-button.loading{color:transparent!important;pointer-events:none}.r-button.loading>span{opacity:0}.r-button.loading:after{animation:rSpin .6s linear infinite;border-bottom:2px solid transparent;border-left:2px solid transparent;border-radius:100%;border-right:2px solid transparent;border-right-color:var(--c-border-dark);border-top:2px solid transparent;border-top-color:var(--c-border-dark);content:\"\";height:18px;position:absolute!important;width:18px}.r-button.loading.primary:after{border-right-color:var(--c-accent-white);border-top-color:var(--c-accent-white)}.r-button:not(.muted)>span:not(.icon){font-weight:var(--t-weight-medium)}.r-button>span{transition:opacity 75ms}.r-button>span:not(.r-icon){font-size:var(--t-size-xs);overflow:hidden;position:relative;text-overflow:ellipsis;white-space:nowrap}.r-button>.r-icon:first-child:not(:last-child){margin-left:-2px;margin-right:8px}.r-button>.r-icon:last-child:not(:first-child){margin-left:8px;margin-right:-2px}.r-button>.r-icon:first-child:last-child{margin-left:0;margin-right:0}.small>.r-icon:first-child:not(:last-child){margin-left:-4px;margin-right:5px}.small>.r-icon:last-child:not(:first-child){margin-left:5px;margin-right:-4px}.r-buttons{align-items:center;display:flex;flex-direction:row;flex-wrap:wrap;margin-bottom:-8px;margin-right:-8px}.r-buttons .r-button{flex:0 0 auto;margin-bottom:8px;margin-right:8px}.r-buttons-grouped{margin-bottom:-8px;margin-right:-8px}.r-buttons-grouped .r-button-group{display:inline-block;margin-bottom:8px;margin-right:8px}.r-buttons-grouped .r-button-group .r-button+.r-button{border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.r-buttons-grouped .r-button-group .r-button:focus,.r-buttons-grouped .r-button-group .r-button:hover{z-index:1}.r-buttons-grouped .r-button-group .r-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}@-moz-keyframes rSpin{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}@-webkit-keyframes rSpin{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}@-o-keyframes rSpin{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}@keyframes rSpin{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}";
styleInject(css_248z$3);

script$6.__file = "src/components/Button.vue";

var _hoisted_1$5 = { "class": "r-text-input" };
var _hoisted_2$3 = {
    key: 0,
    "class": "r-text-color-muted r-text-xxs r-text-regular"
};
var _hoisted_3$2 = ["type", "placeholder", "value"];
var _hoisted_4$2 = {
    key: 1,
    "class": "r-text-color-red r-text-medium r-m-t-xs"
};
var __default__$1 = {
    inheritAttrs: false
};
var script$5 = defineComponent(__assign(__assign({}, __default__$1), { props: {
        label: String,
        placeholder: String,
        help: { type: String, "default": undefined },
        error: { type: String, "default": undefined },
        type: { type: String, "default": "text" },
        fullwidth: { type: Boolean, "default": true },
        modelValue: [String, Number]
    }, emits: ["update:modelValue"], setup: function (__props, _a) {
        _a.emit;
        var props = __props;
        var attrs = useAttrs();
        var uid = "_".concat(Math.random().toString(36).substr(2)).concat(Math.random().toString(36).substr(2));
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("div", _hoisted_1$5, [
                (props.label)
                    ? (openBlock(), createElementBlock("label", {
                        key: 0,
                        "class": "r-form-label r-text-medium r-m-b-xs",
                        "for": uid
                    }, [
                        createTextVNode(toDisplayString(props.label), 1),
                        (props.help)
                            ? (openBlock(), createElementBlock("div", _hoisted_2$3, toDisplayString(props.help), 1))
                            : createCommentVNode("v-if", true)
                    ]))
                    : createCommentVNode("v-if", true),
                createElementVNode("input", mergeProps({
                    "class": ["r-input-text", { fullwidth: props.fullwidth, invalid: props.error }],
                    id: uid,
                    type: props.type,
                    placeholder: props.placeholder,
                    value: props.modelValue
                }, unref(attrs), {
                    onInput: _cache[0] || (_cache[0] = function (event) { return _ctx.$emit('update:modelValue', event.target.value); })
                }), null, 16, _hoisted_3$2),
                (props.error)
                    ? (openBlock(), createElementBlock("div", _hoisted_4$2, toDisplayString(props.error), 1))
                    : createCommentVNode("v-if", true)
            ]));
        };
    } }));

script$5.__file = "src/components/TextInput.vue";

var _hoisted_1$4 = { "class": "r-text-input" };
var _hoisted_2$2 = {
    key: 0,
    "class": "r-text-color-muted r-text-xxs r-text-regular"
};
var _hoisted_3$1 = ["type", "placeholder", "value"];
var _hoisted_4$1 = {
    key: 1,
    "class": "r-text-color-red r-text-medium r-m-t-xs"
};
var __default__ = {
    inheritAttrs: false
};
var script$4 = defineComponent(__assign(__assign({}, __default__), { props: {
        label: String,
        placeholder: String,
        help: { type: String, "default": undefined },
        error: { type: String, "default": undefined },
        type: { type: String, "default": "text" },
        fullwidth: { type: Boolean, "default": true },
        modelValue: [String, Number]
    }, emits: ["update:modelValue"], setup: function (__props, _a) {
        var emits = _a.emit;
        var props = __props;
        var attrs = useAttrs();
        var uid = "_".concat(Math.random().toString(36).substr(2)).concat(Math.random().toString(36).substr(2));
        var updateHeightFromEvent = function (event) {
            event.target.style.height = "auto";
            event.target.style.height = "".concat(event.target.scrollHeight, "px");
        };
        var onInput = function (event) {
            updateHeightFromEvent(event);
            emits('update:modelValue', event.target.value);
        };
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("div", _hoisted_1$4, [
                (props.label)
                    ? (openBlock(), createElementBlock("label", {
                        key: 0,
                        "class": "r-form-label r-text-medium r-m-b-xs",
                        "for": uid
                    }, [
                        createTextVNode(toDisplayString(props.label), 1),
                        (props.help)
                            ? (openBlock(), createElementBlock("div", _hoisted_2$2, toDisplayString(props.help), 1))
                            : createCommentVNode("v-if", true)
                    ]))
                    : createCommentVNode("v-if", true),
                createElementVNode("textarea", mergeProps({
                    "class": ["r-input-text", { fullwidth: props.fullwidth, invalid: props.error }],
                    id: uid,
                    type: props.type,
                    placeholder: props.placeholder,
                    value: props.modelValue
                }, unref(attrs), {
                    onInput: onInput,
                    onFocus: updateHeightFromEvent
                }), null, 16, _hoisted_3$1),
                (props.error)
                    ? (openBlock(), createElementBlock("div", _hoisted_4$1, toDisplayString(props.error), 1))
                    : createCommentVNode("v-if", true)
            ]));
        };
    } }));

script$4.__file = "src/components/TextArea.vue";

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index$1 = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

var script$3 = {
  name: "Modal",
  emits: ["close"],
  props: {
    title: {
      default: "Modal title",
      type: [String, Boolean],
    },
    blocking: {
      default: false,
      type: Boolean,
    },
    buttons: {
      default: true,
      type: Boolean,
    },
    size: {
      default: "sm",
      type: String,
    },
  },
  data() {
    return {
      modalOpen: false,
      contentScrolls: false,
      showTopBorder: false,
      showBottomBorder: false,
    };
  },
  computed: {
    myIndex() {
      return modalsOpen.value.indexOf(this._id);
    },
    modalContainerClass() {
      return `r-container-${this.size}`;
    },
    modalOverlayZIndex() {
      return 10000 + modalsOpen.value.indexOf(this._id);
    },
    modalZIndex() {
      return 10001 + modalsOpen.value.indexOf(this._id);
    },
  },
  beforeCreate() {
    this._id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  },
  mounted() {
    this.contentObs = new index$1(() => {
      this.checkContentScroll();
    });
  },
  beforeDestroy() {
    if (this.modalOpen) this.close();
    if (this.contentObs) this.contentObs.disconnect();
  },
  methods: {
    async open() {
      const index = modalsOpen.value.indexOf(this._id);
      if (index >= 0) modalsOpen.value.splice(index, 1);
      modalsOpen.value.push(this._id);
      this.modalOpen = true;
      document.body.classList.add("r-modal-open");

      await this.$nextTick();

      if (this.$refs.modalContent) {
        this.contentObs.observe(this.$refs.modalContent);
      }
    },
    close() {
      modalsOpen.value.splice(modalsOpen.value.indexOf(this._id), 1);
      this.modalOpen = false;
      this.$emit("close");
      if (modalsOpen.value.length === 0) document.body.classList.remove("r-modal-open");
    },
    outsideClose() {
      if (!this.blocking) this.close();
    },
    checkContentScroll() {
      if (this.$refs.modalContent) {
        const overflow = this.$refs.modalContent.scrollHeight - this.$refs.modalContent.clientHeight;
        this.contentScrolls = overflow > 0;
        this.updateScrollPosition();
      }
    },
    updateScrollPosition() {
      const content = this.$refs.modalContent;
      if (content) {
        this.showTopBorder = content.scrollTop > 4;
        this.showBottomBorder = content.scrollTop < ( content.scrollHeight - content.offsetHeight - 5 );
      }
    },
  },
};

const _hoisted_1$3 = ["aria-labelledby"];
const _hoisted_2$1 = {
  key: 0,
  class: "r-modal-header"
};
const _hoisted_3 = ["id"];
const _hoisted_4 = {
  key: 1,
  class: "r-flex-0 r-modal-top-shadow"
};
const _hoisted_5 = { class: "r-modal-content-inner" };
const _hoisted_6 = {
  key: 2,
  class: "r-flex-0 r-modal-bottom-shadow"
};
const _hoisted_7 = {
  key: 3,
  class: "r-modal-buttons"
};
const _hoisted_8 = { class: "r-buttons" };
const _hoisted_9 = /*#__PURE__*/createTextVNode("Close");

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_r_button = resolveComponent("r-button");

  return (openBlock(), createBlock(Teleport, { to: "#rOverlayTarget" }, [
    createVNode(Transition, { name: "r-modal" }, {
      default: withCtx(() => [
        ($data.modalOpen)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "r-modal-overlay",
              onClick: _cache[3] || (_cache[3] = (...args) => ($options.outsideClose && $options.outsideClose(...args))),
              onKeyup: _cache[4] || (_cache[4] = withKeys(withModifiers((...args) => ($options.outsideClose && $options.outsideClose(...args)), ["stop"]), ["esc"])),
              style: normalizeStyle({ 'z-index': $options.modalOverlayZIndex })
            }, [
              createElementVNode("div", {
                class: normalizeClass(["r-modal-container", $options.modalContainerClass])
              }, [
                createElementVNode("div", {
                  class: "r-modal",
                  ref: "modal",
                  role: "dialog",
                  onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
                  "aria-labelledby": $props.title ? `dialog-title-${_ctx._id}` : null,
                  onKeydownCapture: _cache[2] || (_cache[2] = withKeys((...args) => ($options.outsideClose && $options.outsideClose(...args)), ["esc"])),
                  style: normalizeStyle({ 'z-index': $options.modalZIndex })
                }, [
                  ($props.title !== false)
                    ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                        createElementVNode("h1", {
                          class: "r-modal-title r-text-md r-text-medium",
                          id: `dialog-title-${_ctx._id}`
                        }, toDisplayString($props.title), 9 /* TEXT, PROPS */, _hoisted_3),
                        (!$props.blocking)
                          ? (openBlock(), createBlock(_component_r_button, {
                              key: 0,
                              class: "r-modal-close",
                              borderless: "borderless",
                              action: $options.close,
                              label: "Close dialog",
                              icon: "close"
                            }, null, 8 /* PROPS */, ["action"]))
                          : createCommentVNode("v-if", true)
                      ]))
                    : createCommentVNode("v-if", true),
                  ($data.showTopBorder)
                    ? (openBlock(), createElementBlock("div", _hoisted_4))
                    : createCommentVNode("v-if", true),
                  createElementVNode("div", {
                    class: normalizeClass(["r-modal-content", { 'r-modal-content-scroll': $data.contentScrolls, 'no-buttons': !$props.buttons }]),
                    onScrollPassive: _cache[0] || (_cache[0] = (...args) => ($options.updateScrollPosition && $options.updateScrollPosition(...args))),
                    ref: "modalContent"
                  }, [
                    createElementVNode("div", _hoisted_5, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ], 34 /* CLASS, HYDRATE_EVENTS */),
                  ($data.showBottomBorder)
                    ? (openBlock(), createElementBlock("div", _hoisted_6))
                    : createCommentVNode("v-if", true),
                  ($props.buttons)
                    ? (openBlock(), createElementBlock("div", _hoisted_7, [
                        createElementVNode("div", _hoisted_8, [
                          renderSlot(_ctx.$slots, "buttons", { close: $options.close }, () => [
                            createVNode(_component_r_button, { action: $options.close }, {
                              default: withCtx(() => [
                                _hoisted_9
                              ]),
                              _: 1 /* STABLE */
                            }, 8 /* PROPS */, ["action"])
                          ])
                        ])
                      ]))
                    : createCommentVNode("v-if", true)
                ], 44 /* STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1$3)
              ], 2 /* CLASS */)
            ], 36 /* STYLE, HYDRATE_EVENTS */))
          : createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}

var css_248z$2 = ":root{--c-background:#f4f4f4}html.darkMode{--c-background:#171717}:root{--c-background-raised:#fff}html.darkMode{--c-background-raised:#212121}:root{--c-text:#212121}html.darkMode{--c-text:#bdbdbd}:root{--c-text-muted:#616161}html.darkMode{--c-text-muted:#9e9e9e}:root{--c-text-blue:#0168b7}html.darkMode{--c-text-blue:#178adb}:root{--c-text-purple:#6b36b5}html.darkMode{--c-text-purple:#9873cc}:root{--c-text-red:#c0401c}html.darkMode{--c-text-red:#cc6f60}:root,html.darkMode{--c-text-yellow:#f6b400}:root,html.darkMode{--c-text-white:#fff}:root{--c-border-light:#eee}html.darkMode{--c-border-light:#333}:root{--c-border-medium:#e0e0e0}html.darkMode{--c-border-medium:#424242}:root{--c-border-dark:#9e9e9e}html.darkMode{--c-border-dark:#757575}:root,html.darkMode{--c-accent-white:#fff}:root,html.darkMode{--c-accent-black:#000}:root{--c-accent-yellow:#f6cb2a}html.darkMode{--c-accent-yellow:#f6a200}:root{--c-accent-focus:#65b6ed}html.darkMode{--c-accent-focus:#0b78c8}:root,html.darkMode{--c-accent-error:#cc6f60}:root{--c-button-hover:rgba(0,0,0,.03)}html.darkMode{--c-button-hover:hsla(0,0%,100%,.05)}:root,html.darkMode{--c-button-primary:#0b78c8}:root,html.darkMode{--c-button-primary-hover:#178adb}:root{--c-button-gray:#f4f4f4}html.darkMode{--c-button-gray:#333}:root,html.darkMode{--c-background-tooltip:rgba(0,0,0,.9)}:root{--c-background-toast:rgba(0,0,0,.8)}html.darkMode{--c-background-toast:rgba(0,0,0,.9)}:root{--s-none:0;--s-xxs:2px;--s-xs:4px;--s-sm:8px;--s-md:16px;--s-lg:32px;--s-xl:64px;--s-xxl:128px;--container-xs:380px;--container-sm:540px;--container-md:720px;--container-lg:960px;--container-xl:1140px;--container-xxl:1320px;--t-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--t-weight-light:300;--t-weight-regular:400;--t-weight-medium:500;--t-weight-bold:700;--t-line-height-base:1.5;--t-size-base:16px;--t-size-xxs:calc(max(var(--t-size-base) * 0.750187546886722, 14px));--t-size-xs:calc(var(--t-size-base)*1);--t-size-sm:calc(var(--t-size-base)*1.333);--t-size-md:calc(var(--t-size-base)*1.77689);--t-size-lg:calc(var(--t-size-base)*2.36859);--t-size-xl:calc(var(--t-size-base)*3.15733);--t-size-xxl:calc(var(--t-size-base)*4.20873);--t-letter-spacing-xxs:0.02em;--t-letter-spacing-xs:0.01em;--t-letter-spacing-sm:0em;--t-letter-spacing-md:-0.01em;--t-letter-spacing-lg:-0.01em;--t-letter-spacing-xl:-0.02em;--t-letter-spacing-xxl:-0.02em;--t-line-height-xxs:calc(var(--t-line-height-base)*1.1);--t-line-height-xs:calc(var(--t-line-height-base)*1);--t-line-height-sm:calc(var(--t-line-height-base)*1);--t-line-height-md:calc(var(--t-line-height-base)*1);--t-line-height-lg:calc(var(--t-line-height-base)*0.9);--t-line-height-xl:calc(var(--t-line-height-base)*0.8);--t-line-height-xxl:calc(var(--t-line-height-base)*0.8)}body.r-modal-open{overflow:hidden}.r-modal-enter-active,.r-modal-leave-active{transition:opacity .1s ease-out}.r-modal-enter-active .r-modal,.r-modal-leave-active .r-modal{transition:transform .1s ease-out}.r-modal-enter-from,.r-modal-leave-to{opacity:0}.r-modal-enter-from .r-modal,.r-modal-leave-to .r-modal{transform:scale(.95)}@media (max-width:540px){.r-modal-enter-active,.r-modal-leave-active{transition:opacity .1s ease-out}.r-modal-enter-active .r-modal,.r-modal-leave-active .r-modal{transition:transform .1s cubic-bezier(.31,.79,.46,.92)}.r-modal-enter .r-modal,.r-modal-leave-to .r-modal{transform:translateY(12px)}}.r-modal-overlay{-webkit-overflow-scrolling:touch;background:rgba(0,0,0,.6);bottom:0;height:100%;left:0;overflow:hidden;position:fixed;right:0;text-align:center;top:0}@supports (display:grid){@media (min-width:540.1px){.r-modal-overlay{display:grid;grid-template-columns:100%;grid-template-rows:1fr max-content 2fr}.r-modal-overlay .r-modal-container{grid-column:1;grid-row:2;width:100%}}}.r-modal-container{text-align:left}.r-modal{word-wrap:break-word;background:var(--c-background-raised);border-radius:var(--s-md);box-shadow:0 15px 10px -5px rgba(0,0,0,.2);display:flex;flex-direction:column;max-height:calc(100vh - var(--s-md));overflow-y:auto}.r-modal-buttons,.r-modal-header{flex:0 0 auto}.r-modal-header{display:flex;padding:var(--s-lg) var(--s-lg) var(--s-md)}.r-modal-header .r-modal-title{align-self:center;flex:1 1 auto;margin:0}.r-modal-header .r-modal-close{align-self:flex-start;flex:0 0 auto}.r-modal-buttons{padding:var(--s-md) var(--s-lg) var(--s-lg)}.r-modal-content{flex:0 1 auto;overflow:hidden;padding:0 var(--s-lg)}.r-modal-content.no-buttons{padding-bottom:var(--s-md)}.r-modal-content.r-modal-content-scroll{min-height:var(--s-lg);overflow-y:auto;padding:0 var(--s-lg) var(--s-md)}@media (max-width:540px){.r-modal-container{display:flex;flex-direction:column;height:100%;justify-content:flex-end;padding:0}.r-modal{border-radius:0}}.r-modal-bottom-shadow,.r-modal-top-shadow{position:relative;z-index:10}.r-modal-bottom-shadow:after,.r-modal-top-shadow:after{content:\"\";height:20px;left:0;opacity:.07;pointer-events:none;position:absolute;right:0;user-select:none}.darkMode .r-modal-bottom-shadow,.darkMode .r-modal-top-shadow{background:var(--c-border-medium);height:1px}.darkMode .r-modal-bottom-shadow:after,.darkMode .r-modal-top-shadow:after{height:40px;opacity:.3}.r-modal-top-shadow:after{background:linear-gradient(180deg,#000 0,rgba(0,0,0,.878) 4.3%,rgba(0,0,0,.764) 8.6%,rgba(0,0,0,.657) 12.9%,rgba(0,0,0,.558) 17.3%,rgba(0,0,0,.467) 21.9%,rgba(0,0,0,.384) 26.8%,rgba(0,0,0,.309) 32.2%,rgba(0,0,0,.243) 38%,rgba(0,0,0,.184) 44.4%,rgba(0,0,0,.133) 51.4%,rgba(0,0,0,.09) 59.2%,rgba(0,0,0,.055) 67.9%,rgba(0,0,0,.028) 77.5%,rgba(0,0,0,.01) 88.2%,transparent);top:0}.r-modal-bottom-shadow:after{background:linear-gradient(0deg,#000 0,rgba(0,0,0,.878) 4.3%,rgba(0,0,0,.764) 8.6%,rgba(0,0,0,.657) 12.9%,rgba(0,0,0,.558) 17.3%,rgba(0,0,0,.467) 21.9%,rgba(0,0,0,.384) 26.8%,rgba(0,0,0,.309) 32.2%,rgba(0,0,0,.243) 38%,rgba(0,0,0,.184) 44.4%,rgba(0,0,0,.133) 51.4%,rgba(0,0,0,.09) 59.2%,rgba(0,0,0,.055) 67.9%,rgba(0,0,0,.028) 77.5%,rgba(0,0,0,.01) 88.2%,transparent);bottom:0}";
styleInject(css_248z$2);

script$3.render = render$1;
script$3.__file = "src/components/Modal.vue";

var script$2 = {
  name: "ModalConfirm",
  components: { Modal: script$3 },
  data() {
    return {
      question: "",
      desc: false,
      yesText: "Yes",
      noText: "No",
      promiseResolve: null,
      promiseReject: null,
    };
  },
  beforeDestroy() {
    if (this.promiseReject) this.promiseReject(new Error("Component destroyed"));
  },
  created() {
    modalConfirm.value = this.confirm;
  },
  methods: {
    async confirm(question, yesText, noText, desc) {
      if (this.promiseResolve || this.promiseReject) {
        console.warn("! Already confirming");
        return Promise.reject();
      }
      this.question = question;
      if (desc) this.desc = desc;
      if (yesText) this.yesText = yesText;
      if (noText) this.noText = noText;

      setTimeout(() => {
        if (!this.$refs.confirmModal) {
          console.warn("! No confirmModal");
          this.promiseReject();
        } else {
          this.$refs.confirmModal.open();
        }
      }, 0);

      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve;
        this.promiseReject = reject;
      });
    },
    no() {
      if (this.promiseResolve) {
        this.promiseResolve(false);
      } else {
        console.warn("! No promiseResolve");
      }
      this._cleanup();
    },
    yes() {
      if (this.promiseResolve) {
        this.promiseResolve(true);
      } else {
        console.warn("! No promiseResolve");
      }
      this._cleanup();
    },
    _cleanup() {
      this.$refs.confirmModal && this.$refs.confirmModal.modalOpen && this.$refs.confirmModal.close();
      this.question = "";
      this.desc = false;
      this.yesText = "Yes";
      this.noText = "No";
      this.promiseResolve = null;
      this.promiseReject = null;
    },
  },
};

const _hoisted_1$2 = { key: 0 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_r_button = resolveComponent("r-button");
  const _component_r_modal = resolveComponent("r-modal");

  return ($data.promiseResolve)
    ? (openBlock(), createBlock(_component_r_modal, {
        key: 0,
        title: $data.question,
        ref: "confirmModal",
        onClose: $options.no
      }, {
        buttons: withCtx(() => [
          createVNode(_component_r_button, {
            primary: "primary",
            action: $options.yes
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($data.yesText), 1 /* TEXT */)
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["action"]),
          createVNode(_component_r_button, { action: $options.no }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($data.noText), 1 /* TEXT */)
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["action"])
        ]),
        default: withCtx(() => [
          ($data.desc)
            ? (openBlock(), createElementBlock("p", _hoisted_1$2, toDisplayString($data.desc), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["title", "onClose"]))
    : createCommentVNode("v-if", true)
}

script$2.render = render;
script$2.__file = "src/components/ModalConfirm.vue";

var _hoisted_1$1 = { "class": "r-text-xxs" };
var script$1 = defineComponent({
    setup: function (__props) {
        var tooltipsWithLocation = ref([]);
        var keepAlive = new Map();
        var KEEP_ALIVE_TICKS = 4;
        var TICK_LENGTH = 64;
        setInterval(function () {
            tooltipsWithLocation.value = Array.from(tooltips.value)
                .filter(function (x) { return x[1].value; })
                .map(function (x) {
                var id = x[0];
                var tooltip = x[1];
                var active = activeTooltips.value.has(id);
                tooltip.alive = false;
                if (active) {
                    if (!keepAlive.has(id)) {
                        active = false;
                    }
                    keepAlive.set(id, KEEP_ALIVE_TICKS);
                }
                if (keepAlive.has(id)) {
                    var stepsLeft = keepAlive.get(id);
                    if (stepsLeft > 0) {
                        keepAlive.set(id, stepsLeft - 1);
                        tooltip.alive = true;
                    }
                    else {
                        keepAlive["delete"](id);
                    }
                }
                return __assign(__assign({}, tooltip), { active: active, id: id });
            })
                .filter(function (tooltip) { return tooltip.alive; })
                .map(function (tooltip) {
                var boundingBox = tooltip.el.getBoundingClientRect();
                var left, top;
                if (tooltip.modifiers.left || tooltip.modifiers.right) {
                    top = boundingBox.top + boundingBox.height / 2;
                    if (tooltip.modifiers.left) {
                        left = boundingBox.left - 5;
                    }
                    else {
                        left = boundingBox.left + boundingBox.width + 5;
                    }
                }
                else {
                    left = boundingBox.left + boundingBox.width / 2;
                    if (tooltip.modifiers.bottom) {
                        top = boundingBox.bottom + 20;
                    }
                    else {
                        top = boundingBox.top - 20;
                    }
                }
                tooltip.style = { left: Math.round(left) + "px", top: Math.round(top) + "px" };
                return tooltip;
            });
        }, TICK_LENGTH);
        return function (_ctx, _cache) {
            return (openBlock(true), createElementBlock(Fragment, null, renderList(tooltipsWithLocation.value, function (tt) {
                return (openBlock(), createElementBlock("div", {
                    "class": normalizeClass(["tooltip", { active: tt.active, left: tt.modifiers.left, right: tt.modifiers.right, bottom: tt.modifiers.bottom }]),
                    key: tt.id,
                    style: normalizeStyle(tt.style)
                }, [
                    createElementVNode("div", _hoisted_1$1, toDisplayString(tt.value), 1)
                ], 6));
            }), 128));
        };
    }
});

var css_248z$1 = "[data-v-36416900]:root{--c-background:#f4f4f4}html.darkMode[data-v-36416900]{--c-background:#171717}[data-v-36416900]:root{--c-background-raised:#fff}html.darkMode[data-v-36416900]{--c-background-raised:#212121}[data-v-36416900]:root{--c-text:#212121}html.darkMode[data-v-36416900]{--c-text:#bdbdbd}[data-v-36416900]:root{--c-text-muted:#616161}html.darkMode[data-v-36416900]{--c-text-muted:#9e9e9e}[data-v-36416900]:root{--c-text-blue:#0168b7}html.darkMode[data-v-36416900]{--c-text-blue:#178adb}[data-v-36416900]:root{--c-text-purple:#6b36b5}html.darkMode[data-v-36416900]{--c-text-purple:#9873cc}[data-v-36416900]:root{--c-text-red:#c0401c}html.darkMode[data-v-36416900]{--c-text-red:#cc6f60}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-text-yellow:#f6b400}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-text-white:#fff}[data-v-36416900]:root{--c-border-light:#eee}html.darkMode[data-v-36416900]{--c-border-light:#333}[data-v-36416900]:root{--c-border-medium:#e0e0e0}html.darkMode[data-v-36416900]{--c-border-medium:#424242}[data-v-36416900]:root{--c-border-dark:#9e9e9e}html.darkMode[data-v-36416900]{--c-border-dark:#757575}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-accent-white:#fff}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-accent-black:#000}[data-v-36416900]:root{--c-accent-yellow:#f6cb2a}html.darkMode[data-v-36416900]{--c-accent-yellow:#f6a200}[data-v-36416900]:root{--c-accent-focus:#65b6ed}html.darkMode[data-v-36416900]{--c-accent-focus:#0b78c8}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-accent-error:#cc6f60}[data-v-36416900]:root{--c-button-hover:rgba(0,0,0,.03)}html.darkMode[data-v-36416900]{--c-button-hover:hsla(0,0%,100%,.05)}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-button-primary:#0b78c8}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-button-primary-hover:#178adb}[data-v-36416900]:root{--c-button-gray:#f4f4f4}html.darkMode[data-v-36416900]{--c-button-gray:#333}[data-v-36416900]:root,html.darkMode[data-v-36416900]{--c-background-tooltip:rgba(0,0,0,.9)}[data-v-36416900]:root{--c-background-toast:rgba(0,0,0,.8)}html.darkMode[data-v-36416900]{--c-background-toast:rgba(0,0,0,.9)}[data-v-36416900]:root{--s-none:0;--s-xxs:2px;--s-xs:4px;--s-sm:8px;--s-md:16px;--s-lg:32px;--s-xl:64px;--s-xxl:128px;--container-xs:380px;--container-sm:540px;--container-md:720px;--container-lg:960px;--container-xl:1140px;--container-xxl:1320px;--t-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--t-weight-light:300;--t-weight-regular:400;--t-weight-medium:500;--t-weight-bold:700;--t-line-height-base:1.5;--t-size-base:16px;--t-size-xxs:calc(max(var(--t-size-base) * 0.750187546886722, 14px));--t-size-xs:calc(var(--t-size-base)*1);--t-size-sm:calc(var(--t-size-base)*1.333);--t-size-md:calc(var(--t-size-base)*1.77689);--t-size-lg:calc(var(--t-size-base)*2.36859);--t-size-xl:calc(var(--t-size-base)*3.15733);--t-size-xxl:calc(var(--t-size-base)*4.20873);--t-letter-spacing-xxs:0.02em;--t-letter-spacing-xs:0.01em;--t-letter-spacing-sm:0em;--t-letter-spacing-md:-0.01em;--t-letter-spacing-lg:-0.01em;--t-letter-spacing-xl:-0.02em;--t-letter-spacing-xxl:-0.02em;--t-line-height-xxs:calc(var(--t-line-height-base)*1.1);--t-line-height-xs:calc(var(--t-line-height-base)*1);--t-line-height-sm:calc(var(--t-line-height-base)*1);--t-line-height-md:calc(var(--t-line-height-base)*1);--t-line-height-lg:calc(var(--t-line-height-base)*0.9);--t-line-height-xl:calc(var(--t-line-height-base)*0.8);--t-line-height-xxl:calc(var(--t-line-height-base)*0.8)}.tooltip[data-v-36416900]{background:var(--c-background-tooltip);border-radius:var(--s-sm);color:var(--c-text-white);padding:var(--s-xs) var(--s-sm);pointer-events:none;position:fixed;transform:translateX(-50%) translateY(-50%);transition:top .1s,left .1s,opacity .1s;transition-delay:50ms;user-select:none;white-space:nowrap;z-index:12000}.tooltip.left[data-v-36416900]{transform:translateX(-100%) translateY(-50%)}.tooltip.right[data-v-36416900]{transform:translateX(0) translateY(-50%)}.tooltip[data-v-36416900]:not(.active){opacity:0}";
styleInject(css_248z$1);

script$1.__scopeId = "data-v-36416900";
script$1.__file = "src/components/Tooltips.vue";

var _hoisted_1 = { "class": "r-toast-list" };
var _hoisted_2 = ["onClick"];
var script = defineComponent({
    setup: function (__props) {
        var MAX_SHOWN = 3;
        var index = ref(0);
        var queue = ref([]);
        var remove = function (index) {
            queue.value = queue.value.filter(function (n) { return n.index !== index; });
        };
        watchEffect(function () {
            if (queue.value.length) {
                var firstNotification_1 = queue.value[0];
                setTimeout(function () {
                    remove(firstNotification_1.index);
                }, 1900 + firstNotification_1.message.length * 90);
            }
        });
        notify.value = function (message) {
            queue.value.push({
                message: message,
                index: index.value
            });
            index.value += 1;
            if (queue.value.length > MAX_SHOWN) {
                queue.value = queue.value.slice(-MAX_SHOWN);
            }
        };
        return function (_ctx, _cache) {
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                createVNode(TransitionGroup, {
                    "class": "r-toast-list-inner",
                    name: "r-toast-list",
                    tag: "div"
                }, {
                    "default": withCtx(function () { return [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(queue.value, function (notification) {
                            return (openBlock(), createElementBlock("div", {
                                "class": "r-toast-notification-wrap",
                                key: notification.index
                            }, [
                                createElementVNode("div", {
                                    "class": "r-toast-notification",
                                    onClick: function ($event) { return (remove(notification.index)); }
                                }, toDisplayString(notification.message), 9, _hoisted_2)
                            ]));
                        }), 128))
                    ]; }),
                    _: 1
                })
            ]));
        };
    }
});

var css_248z = ":root{--c-background:#f4f4f4}html.darkMode{--c-background:#171717}:root{--c-background-raised:#fff}html.darkMode{--c-background-raised:#212121}:root{--c-text:#212121}html.darkMode{--c-text:#bdbdbd}:root{--c-text-muted:#616161}html.darkMode{--c-text-muted:#9e9e9e}:root{--c-text-blue:#0168b7}html.darkMode{--c-text-blue:#178adb}:root{--c-text-purple:#6b36b5}html.darkMode{--c-text-purple:#9873cc}:root{--c-text-red:#c0401c}html.darkMode{--c-text-red:#cc6f60}:root,html.darkMode{--c-text-yellow:#f6b400}:root,html.darkMode{--c-text-white:#fff}:root{--c-border-light:#eee}html.darkMode{--c-border-light:#333}:root{--c-border-medium:#e0e0e0}html.darkMode{--c-border-medium:#424242}:root{--c-border-dark:#9e9e9e}html.darkMode{--c-border-dark:#757575}:root,html.darkMode{--c-accent-white:#fff}:root,html.darkMode{--c-accent-black:#000}:root{--c-accent-yellow:#f6cb2a}html.darkMode{--c-accent-yellow:#f6a200}:root{--c-accent-focus:#65b6ed}html.darkMode{--c-accent-focus:#0b78c8}:root,html.darkMode{--c-accent-error:#cc6f60}:root{--c-button-hover:rgba(0,0,0,.03)}html.darkMode{--c-button-hover:hsla(0,0%,100%,.05)}:root,html.darkMode{--c-button-primary:#0b78c8}:root,html.darkMode{--c-button-primary-hover:#178adb}:root{--c-button-gray:#f4f4f4}html.darkMode{--c-button-gray:#333}:root,html.darkMode{--c-background-tooltip:rgba(0,0,0,.9)}:root{--c-background-toast:rgba(0,0,0,.8)}html.darkMode{--c-background-toast:rgba(0,0,0,.9)}:root{--s-none:0;--s-xxs:2px;--s-xs:4px;--s-sm:8px;--s-md:16px;--s-lg:32px;--s-xl:64px;--s-xxl:128px;--container-xs:380px;--container-sm:540px;--container-md:720px;--container-lg:960px;--container-xl:1140px;--container-xxl:1320px;--t-family:BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";--t-weight-light:300;--t-weight-regular:400;--t-weight-medium:500;--t-weight-bold:700;--t-line-height-base:1.5;--t-size-base:16px;--t-size-xxs:calc(max(var(--t-size-base) * 0.750187546886722, 14px));--t-size-xs:calc(var(--t-size-base)*1);--t-size-sm:calc(var(--t-size-base)*1.333);--t-size-md:calc(var(--t-size-base)*1.77689);--t-size-lg:calc(var(--t-size-base)*2.36859);--t-size-xl:calc(var(--t-size-base)*3.15733);--t-size-xxl:calc(var(--t-size-base)*4.20873);--t-letter-spacing-xxs:0.02em;--t-letter-spacing-xs:0.01em;--t-letter-spacing-sm:0em;--t-letter-spacing-md:-0.01em;--t-letter-spacing-lg:-0.01em;--t-letter-spacing-xl:-0.02em;--t-letter-spacing-xxl:-0.02em;--t-line-height-xxs:calc(var(--t-line-height-base)*1.1);--t-line-height-xs:calc(var(--t-line-height-base)*1);--t-line-height-sm:calc(var(--t-line-height-base)*1);--t-line-height-md:calc(var(--t-line-height-base)*1);--t-line-height-lg:calc(var(--t-line-height-base)*0.9);--t-line-height-xl:calc(var(--t-line-height-base)*0.8);--t-line-height-xxl:calc(var(--t-line-height-base)*0.8)}.r-toast-list{left:10px;pointer-events:none;position:fixed;right:10px;top:36px;user-select:none;z-index:13000}.r-toast-list-inner{margin:0 auto;max-width:660px;position:relative;text-align:center}.r-toast-notification{background:var(--c-background-toast);border-radius:var(--s-md);color:var(--c-text-white);display:inline-block;font-weight:var(--t-weight-medium);margin-bottom:5px;padding:var(--s-md) var(--s-lg);pointer-events:all;user-select:none;word-break:break-word}.r-toast-list-enter-from,.r-toast-list-leave-to{opacity:0}.r-toast-list-enter-active,.r-toast-list-leave-active,.r-toast-list-move{transition:all .2s}.r-toast-list-leave-active{left:0;position:absolute;right:0}";
styleInject(css_248z);

script.__file = "src/components/Toasts.vue";

var injectionFactory = function (name) {
    var key = Symbol(name);
    return {
        use: function () {
            var injected = inject(key);
            if (!injected)
                throw new Error("Could not resolve ".concat(key.description));
            return injected;
        },
        key: key
    };
};
var _a = injectionFactory("RToast"), useToast = _a.use, toastKey = _a.key;
var _b = injectionFactory("RModalConfirm"), useModalConfirm = _b.use, modalConfirmKey = _b.key;
function install(app) {
    var pluginRootTarget = document.createElement("div");
    var pluginRoot = createApp({
        render: function () {
            return [
                h(script$2),
                h(script$1),
                h(script),
                h("div", { id: "rOverlayTarget" }),
            ];
        }
    });
    pluginRoot.component("r-icon", script$7);
    pluginRoot.component("r-button", script$6);
    pluginRoot.component("r-modal", script$3);
    pluginRoot.mount(pluginRootTarget);
    document.body.append(pluginRootTarget);
    app.provide(toastKey, notify.value);
    app.provide(modalConfirmKey, modalConfirm.value);
    app.directive("r-tip", TooltipDirectiveOptions);
    app.component("r-icon", script$7);
    app.component("r-button", script$6);
    app.component("r-text-input", script$5);
    app.component("r-text-area", script$4);
    app.component("r-modal", script$3);
}

var index = {
    install: install
};

export { index as default, useModalConfirm, useToast };
