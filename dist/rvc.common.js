/*!
 * rvc v0.2.0 
 * (c) 2019 Reino Zuppur
 * Released under the UNLICENSED License.
 */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'Button',
  props: {
    action: Function,
    label: String,
    icon: String,
    iconColor: String,
    borderless: Boolean,
    primary: Boolean,
    gray: Boolean,
    fullwidth: Boolean,
    loading: Boolean,
    submit: Boolean,
    disabled: Boolean
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function (_h,_vm) {var _c=_vm._c;return _c('button',{staticClass:"r-button",class:[    (_vm.props.borderless || _vm.props.borderless === '') ? 'borderless' : '',    (_vm.props.icon && !_vm.children) ? 'icon-only' : '',    (_vm.props.primary || _vm.props.primary === '') ? 'primary' : '',    (_vm.props.gray || _vm.props.gray === '') ? 'gray' : '',    (_vm.props.fullwidth || _vm.props.fullwidth === '') ? 'fullwidth' : '',    (_vm.props.loading || _vm.props.loading === '') ? 'loading' : '',    _vm.data.class,    _vm.data.staticClass ],attrs:{"type":(_vm.props.submit || _vm.props.submit === '') ? 'submit' : 'button',"disabled":(_vm.props.disabled || _vm.props.disabled === '') || _vm.props.loading,"aria-label":_vm.props.label},on:{"pointerdown":function($event){$event.preventDefault();},"click":function($event){_vm.props.action ? _vm.props.action : function () {};}}},[(_vm.props.icon)?_c('r-icon',{class:(_vm.props.primary || _vm.props.primary === '') ? 'white' : (_vm.props.iconColor ? _vm.props.iconColor : 'gray'),attrs:{"icon":_vm.props.icon}}):_vm._e(),(_vm.children)?_c('span',[_vm._t("default")],2):_vm._e()],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-3172bed9_0", { source: ".r-button{cursor:pointer;user-select:none;-webkit-touch-callout:none;-webkit-appearance:none;-moz-appearance:none;position:relative;vertical-align:top;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 12px;border:1px solid #ddd;border-radius:4px;font-family:Inter,BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:400;text-align:center;color:#4a4a4a;background-color:#fff;box-shadow:none;transition:transform .1s,box-shadow .1s}.darkMode .r-button{background-color:transparent;color:#e1e3e5;border-color:rgba(255,255,255,.15)}.r-button,.r-button:hover{text-decoration:none;color:#4a4a4a}.darkMode .r-button,.darkMode .r-button:hover{color:#e1e3e5}.r-button.is-active,.r-button.is-focused,.r-button:active,.r-button:focus{outline:0}.r-button[disabled]{cursor:not-allowed}.r-button:active:not([disabled]){transform:scale(.98)}.r-button.borderless{background-color:transparent;box-shadow:none;border:none}.r-button.borderless:focus,.r-button.borderless:hover{background:rgba(0,0,0,.04)}.darkMode .r-button.borderless:focus,.darkMode .r-button.borderless:hover{background:rgba(255,255,255,.08)}.r-button.borderless:focus{box-shadow:inset 0 0 0 2px rgba(13,124,200,.2)}.r-button:hover:not(.borderless){box-shadow:0 0 0 2px rgba(13,124,200,.3)!important}.r-button:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2),0 0 0 1px #0d7cc8!important}.r-button.primary{background:#209cee;color:#fff}.r-button.primary:focus,.r-button.primary:hover{background:#1296ed}.r-button.primary:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2),inset 0 0 0 1px #0a5e98!important}.r-button.gray{background:#f9f9fa}.darkMode .r-button.gray{background:rgba(255,255,255,.1)}.r-button[disabled]{box-shadow:none!important;opacity:.4}.r-button.fullwidth{display:flex;width:100%}.r-button.icon-only{width:40px;padding:0}.r-button:not(.icon-only){min-width:65px}.r-button.loading{color:transparent!important;pointer-events:none}.r-button.loading span{opacity:0}.r-button.loading::after{content:\"\";width:18px;height:18px;border:2px solid transparent;border-top-color:rgba(0,0,0,.3);border-right-color:rgba(0,0,0,.3);border-radius:100%;animation:spinAround .6s infinite linear;position:absolute!important}.darkMode .r-button.loading::after{border-top-color:rgba(255,255,255,.4);border-right-color:rgba(255,255,255,.4)}.r-button:not(.muted) span:not(.icon){font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:600}.r-button span{transition:opacity 75ms}.r-button span:not(.icon){position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.r-button .icon:first-child:not(:last-child){margin-left:-2px;margin-right:8px}.r-button .icon:last-child:not(:first-child){margin-left:8px;margin-right:-2px}.r-button .icon:first-child:last-child{margin-left:0;margin-right:0}@-moz-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@-webkit-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@-o-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = true;
  /* style inject SSR */
  

  
  var Button = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

/* script */

/* template */
var __vue_render__$1 = function (_h,_vm) {var _c=_vm._c;return _c('span',{staticClass:"icon material",class:[ _vm.data.class, _vm.data.staticClass ]},[(_vm.props.icon === 'add image')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z"}})])]:(_vm.props.icon === 'add text')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M8.5,7H10.5L16,21H13.6L12.5,18H6.3L5.2,21H3L8.5,7M7.1,16H11.9L9.5,9.7L7.1,16M22,5V7H19V10H17V7H14V5H17V2H19V5H22Z"}})])]:(_vm.props.icon === 'add date')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M19,19V7H5V19H19M16,1H18V3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1M11,9H13V12H16V14H13V17H11V14H8V12H11V9Z"}})])]:(_vm.props.icon === 'date')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"}})])]:(_vm.props.icon === 'check')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}})])]:(_vm.props.icon === 'undo')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z"}})])]:(_vm.props.icon === 'arrow up')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"}})])]:(_vm.props.icon === 'arrow down')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"}})])]:(_vm.props.icon === 'arrow left')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}})])]:(_vm.props.icon === 'arrow right')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"}})])]:(_vm.props.icon === 'close')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}})])]:(_vm.props.icon === 'more')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}})])]:(_vm.props.icon === 'merge')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M17,20.41L18.41,19L15,15.59L13.59,17M7.5,8H11V13.59L5.59,19L7,20.41L13,14.41V8H16.5L12,3.5"}})])]:(_vm.props.icon === 'eye hidden')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"}})])]:(_vm.props.icon === 'eye visible')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"}})])]:(_vm.props.icon === 'edit')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}})])]:(_vm.props.icon === 'chevron down')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}})])]:(_vm.props.icon === 'chevron up')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}})])]:(_vm.props.icon === 'attention')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z"}})])]:(_vm.props.icon === 'download')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z"}})])]:(_vm.props.icon === 'sync')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z"}})])]:(_vm.props.icon === 'images')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z"}})])]:(_vm.props.icon === 'expand')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"}})])]:(_vm.props.icon === 'collapse')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M16.59,5.41L15.17,4L12,7.17L8.83,4L7.41,5.41L12,10M7.41,18.59L8.83,20L12,16.83L15.17,20L16.58,18.59L12,14L7.41,18.59Z"}})])]:(_vm.props.icon === 'add')?[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}})])]:[_vm._v("?")]],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-7ff01726_0", { source: ".icon.material{height:24px;width:24px}.icon.material.icon-text{vertical-align:text-top;display:inline-block;position:relative;top:1px}.icon.material.icon-text,.icon.material.icon-text svg{height:18px!important;width:18px!important}.darkMode .icon.material svg{fill:#e1e3e5}.icon.material.gray svg{fill:#777}.darkMode .icon.material.gray svg{fill:#aab0b6}.icon.material.light-gray svg{fill:$color-gray-text-light}.icon.material.green svg{fill:#009826}.icon.material.red svg{fill:#a61216}.darkMode .icon.material.red svg{fill:#e24161}.icon.material.blue svg{fill:#2c61b6}.darkMode .icon.material.blue svg{fill:#0f91ea}.icon.material.white svg{fill:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = true;
  /* style inject SSR */
  

  
  var Icon = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    {},
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );

var version = '0.2.0';

var install = function install(Vue) {
  Vue.component('r-button', Button);
  Vue.component('r-icon', Icon);
};

var plugin = {
  install: install,
  version: version
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
