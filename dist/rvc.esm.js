/*!
 * rvc v0.48.1 
 * (c) 2021 Reino Zuppur
 * Released under the MIT License.
 */
import PortalVue, { PortalTarget } from 'portal-vue';
import ResizeObserver from 'resize-observer-polyfill';

var script = {
  name: "Button",
  functional: true,
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
  render: function render(createElement, context) {
    var d = context.data;
    var p = context.props;
    var childrenNodes = [];
    var textSlot = context.slots().default;
    var icon;

    if (p.icon) {
      icon = createElement("r-icon", {
        props: {
          icon: p.icon
        },
        class: [{
          white: p.primary,
          gray: !p.primary && !p.iconColor
        }, p.iconColor]
      });
    }

    if (icon && !p.iconRight) {
      childrenNodes.push(icon);
    }

    if (textSlot) {
      childrenNodes.push(createElement("span", {}, [textSlot]));
    }

    if (icon && p.iconRight) {
      childrenNodes.push(icon);
    }

    var buttonClasses = {
      "r-button": true,
      "icon-only": p.icon && !textSlot,
      borderless: p.borderless,
      primary: p.primary,
      gray: p.gray,
      fullwidth: p.fullwidth,
      small: p.small,
      loading: p.loading
    };
    return createElement("button", {
      attrs: {
        "aria-label": p.label
      },
      class: [buttonClasses, d.staticClass, d.class],
      style: [d.staticStyle, d.style],
      directives: d.directives,
      domProps: {
        disabled: p.disabled || p.loading,
        type: p.submit ? "submit" : "button"
      },
      on: {
        click: function click(event) {
          // Check for ctrl+click
          if (p.actionWithModifier && event.getModifierState("Control") && !event.getModifierState("Shift") && !event.getModifierState("Alt") && !event.getModifierState("Meta") && !event.getModifierState("Meta") && !event.getModifierState("Hyper") && !event.getModifierState("OS") && !event.getModifierState("Super") && !event.getModifierState("Win")) {
            p.actionWithModifier(event);
            return;
          } // Check if normal click handler is present


          if (p.action) p.action(event);
        },
        pointerdown: function pointerdown(event) {
          event.preventDefault();
        }
      }
    }, childrenNodes);
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

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Button = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

/* eslint-disable quote-props */
var ICONS = {
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
  "dice multiple": "M19.78,3H11.22C10.55,3 10,3.55 10,4.22V8H16V14H19.78C20.45,14 21,13.45 21,12.78V4.22C21,3.55 20.45,3 19.78,3M12.44,6.67C11.76,6.67 11.21,6.12 11.21,5.44C11.21,4.76 11.76,4.21 12.44,4.21A1.23,1.23 0 0,1 13.67,5.44C13.67,6.12 13.12,6.67 12.44,6.67M18.56,12.78C17.88,12.79 17.33,12.24 17.32,11.56C17.31,10.88 17.86,10.33 18.54,10.32C19.22,10.31 19.77,10.86 19.78,11.56C19.77,12.23 19.23,12.77 18.56,12.78M18.56,6.67C17.88,6.68 17.33,6.13 17.32,5.45C17.31,4.77 17.86,4.22 18.54,4.21C19.22,4.2 19.77,4.75 19.78,5.44C19.78,6.12 19.24,6.66 18.56,6.67M4.22,10H12.78A1.22,1.22 0 0,1 14,11.22V19.78C14,20.45 13.45,21 12.78,21H4.22C3.55,21 3,20.45 3,19.78V11.22C3,10.55 3.55,10 4.22,10M8.5,14.28C7.83,14.28 7.28,14.83 7.28,15.5C7.28,16.17 7.83,16.72 8.5,16.72C9.17,16.72 9.72,16.17 9.72,15.5A1.22,1.22 0 0,0 8.5,14.28M5.44,11.22C4.77,11.22 4.22,11.77 4.22,12.44A1.22,1.22 0 0,0 5.44,13.66C6.11,13.66 6.66,13.11 6.66,12.44V12.44C6.66,11.77 6.11,11.22 5.44,11.22M11.55,17.33C10.88,17.33 10.33,17.88 10.33,18.55C10.33,19.22 10.88,19.77 11.55,19.77A1.22,1.22 0 0,0 12.77,18.55H12.77C12.77,17.88 12.23,17.34 11.56,17.33H11.55Z"
};

var toSvgTag = function toSvgTag(svgPath) {
  return "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\"><path d=\"".concat(svgPath, "\" /></svg>");
};

var script$1 = {
  name: "Icon",
  functional: true,
  props: {
    icon: {
      validator: function validator(value) {
        if (value === "missing") return true;
        var valid = Object.keys(ICONS).includes(value); // eslint-disable-next-line no-console

        if (!valid) console.warn("Invalid icon name, available names are\n".concat(Object.keys(ICONS).join(", ")));
        return valid;
      }
    },
    iconsObject: {
      type: Object,
      required: false,
      default: function _default() {
        return ICONS;
      }
    },
    fallbackIcon: {
      type: String,
      required: false,
      default: function _default() {
        return "M21.5,10.8L13.2,2.5C12.5,1.8 11.5,1.8 10.8,2.5L2.5,10.8C1.8,11.5 1.8,12.5 2.5,13.2L10.8,21.5C11.5,22.2 12.5,22.2 13.2,21.5L21.5,13.2C22.1,12.5 22.1,11.5 21.5,10.8M12.5,17H11V15.5H12.5V17M14.3,11.8C13.9,12.3 13.2,12.6 12.9,13.1C12.6,13.5 12.6,14 12.6,14.5H11C11,13.7 11,13 11.3,12.5C11.6,12 12.3,11.7 12.7,11.4C13.9,10.3 13.6,8.7 11.9,8.6C11.1,8.6 10.4,9.3 10.4,10.1H9C9,8.4 10.3,7.1 12,7.1C14.7,7.1 15.9,9.8 14.3,11.8Z";
      }
    }
  },
  render: function render(createElement, context) {
    var d = context.data;
    var p = context.props;
    var iconValid = !!p.iconsObject[p.icon];
    return createElement("span", {
      attrs: {
        "aria-hidden": true
      },
      class: ["r-icon", iconValid ? "" : "red", d.staticClass, d.class],
      style: [d.staticStyle, d.style],
      directives: d.directives,
      domProps: {
        innerHTML: iconValid ? toSvgTag(p.iconsObject[p.icon]) : toSvgTag(p.fallbackIcon)
      }
    });
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Icon = normalizeComponent_1(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

var script$2 = {
  name: "Modal",
  props: {
    title: {
      default: "Modal title",
      type: [String, Boolean]
    },
    blocking: {
      default: false,
      type: Boolean
    },
    buttons: {
      default: true,
      type: Boolean
    },
    size: {
      default: "small",
      type: String
    }
  },
  data: function data() {
    return {
      modalOpen: false,
      contentScrolls: false,
      showTopBorder: false,
      showBottomBorder: false
    };
  },
  computed: {
    myIndex: function myIndex() {
      return this.$root.rModalsOpen.indexOf(this._id);
    },
    modalContainerClass: function modalContainerClass() {
      return "r-container-".concat(this.size);
    },
    modalOverlayZIndex: function modalOverlayZIndex() {
      return 10000 + this.$root.rModalsOpen.indexOf(this._id);
    },
    modalZIndex: function modalZIndex() {
      return 10001 + this.$root.rModalsOpen.indexOf(this._id);
    }
  },
  beforeCreate: function beforeCreate() {
    this._id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  },
  mounted: function mounted() {
    var _this = this;

    this.contentObs = new ResizeObserver(function () {
      _this.checkContentScroll();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.modalOpen) this.close();
    if (this.contentObs) this.contentObs.disconnect();
  },
  methods: {
    open: function () {
      var _open = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee() {
        var index;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                index = this.$root.rModalsOpen.indexOf(this._id);
                if (index >= 0) this.$root.rModalsOpen.splice(index, 1);
                this.$root.rModalsOpen.push(this._id);
                this.modalOpen = true;
                document.body.classList.add("r-modal-open");
                _context.next = 7;
                return this.$nextTick();

              case 7:
                if (this.$refs.modalContent) {
                  this.contentObs.observe(this.$refs.modalContent);
                }

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open() {
        return _open.apply(this, arguments);
      }

      return open;
    }(),
    close: function close() {
      this.$root.rModalsOpen.splice(this.$root.rModalsOpen.indexOf(this._id), 1);
      this.modalOpen = false;
      this.$emit("close");
      if (this.$root.rModalsOpen.length === 0) document.body.classList.remove("r-modal-open");
    },
    outsideClose: function outsideClose() {
      if (!this.blocking) this.close();
    },
    checkContentScroll: function checkContentScroll() {
      if (this.$refs.modalContent) {
        var overflow = this.$refs.modalContent.scrollHeight - this.$refs.modalContent.clientHeight;
        this.contentScrolls = overflow > 0;
        this.updateScrollPosition();
      }
    },
    updateScrollPosition: function updateScrollPosition() {
      var content = this.$refs.modalContent;

      if (content) {
        this.showTopBorder = content.scrollTop > 4;
        this.showBottomBorder = content.scrollTop < content.scrollHeight - content.offsetHeight - 5;
      }
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('portal',{attrs:{"to":"r-modals"}},[_c('transition',{attrs:{"name":"r-modal"}},[(_vm.modalOpen)?_c('div',{staticClass:"r-modal-overlay",style:({ 'z-index': _vm.modalOverlayZIndex }),on:{"click":_vm.outsideClose,"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.stopPropagation();return _vm.outsideClose($event)}}},[_c('div',{staticClass:"r-modal-container r-container",class:_vm.modalContainerClass},[_c('div',{ref:"modal",staticClass:"r-modal r-elevation-3",style:({ 'z-index': _vm.modalZIndex }),attrs:{"role":"dialog","aria-labelledby":_vm.title ? ("dialog-title-" + _vm._id) : null},on:{"click":function($event){$event.stopPropagation();},"!keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.outsideClose($event)}}},[(_vm.title !== false)?_c('div',{staticClass:"r-modal-header"},[_c('h1',{staticClass:"r-modal-title r-title-5",attrs:{"id":("dialog-title-" + _vm._id)}},[_vm._v(_vm._s(_vm.title))]),(!_vm.blocking)?_c('r-button',{staticClass:"r-modal-close",attrs:{"borderless":"borderless","action":_vm.close,"label":"Close dialog","icon":"close"}}):_vm._e()],1):_vm._e(),(_vm.showTopBorder)?_c('div',{staticClass:"r-flex-0 r-modal-top-shadow"}):_vm._e(),_c('div',{ref:"modalContent",staticClass:"r-modal-content",class:{ 'r-modal-content-scroll': _vm.contentScrolls, 'no-buttons': !_vm.buttons },on:{"&scroll":function($event){return _vm.updateScrollPosition($event)}}},[_c('div',{staticClass:"r-modal-content-inner"},[_vm._t("default")],2)]),(_vm.showBottomBorder)?_c('div',{staticClass:"r-flex-0 r-modal-bottom-shadow"}):_vm._e(),(_vm.buttons)?_c('div',{staticClass:"r-modal-buttons"},[_c('div',{staticClass:"r-buttons"},[_vm._t("buttons",[_c('r-button',{attrs:{"action":_vm.close}},[_vm._v("Close")])],{"close":_vm.close})],2)]):_vm._e()])])]):_vm._e()])],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Modal = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var script$3 = {
  name: "ModalConfirm",
  components: {
    Modal: Modal
  },
  data: function data() {
    return {
      question: "",
      desc: false,
      yesText: "Yes",
      noText: "No",
      promiseResolve: null,
      promiseReject: null
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (this.promiseReject) this.promiseReject(new Error("Component destroyed"));
  },
  mounted: function mounted() {
    this.$root.rModalConfirm = this.confirm;
  },
  methods: {
    confirm: function () {
      var _confirm = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee(question, yesText, noText, desc) {
        var _this = this;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.promiseResolve || this.promiseReject)) {
                  _context.next = 3;
                  break;
                }

                console.warn("! Already confirming");
                return _context.abrupt("return", Promise.reject());

              case 3:
                this.question = question;
                if (desc) this.desc = desc;
                if (yesText) this.yesText = yesText;
                if (noText) this.noText = noText;
                setTimeout(function () {
                  if (!_this.$refs.confirmModal) {
                    console.warn("! No confirmModal");

                    _this.promiseReject();
                  } else {
                    _this.$refs.confirmModal.open();
                  }
                }, 0);
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this.promiseResolve = resolve;
                  _this.promiseReject = reject;
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function confirm(_x, _x2, _x3, _x4) {
        return _confirm.apply(this, arguments);
      }

      return confirm;
    }(),
    no: function no() {
      if (this.promiseResolve) {
        this.promiseResolve(false);
      } else {
        console.warn("! No promiseResolve");
      }

      this._cleanup();
    },
    yes: function yes() {
      if (this.promiseResolve) {
        this.promiseResolve(true);
      } else {
        console.warn("! No promiseResolve");
      }

      this._cleanup();
    },
    _cleanup: function _cleanup() {
      this.$refs.confirmModal && this.$refs.confirmModal.modalOpen && this.$refs.confirmModal.close();
      this.question = "";
      this.desc = false;
      this.yesText = "Yes";
      this.noText = "No";
      this.promiseResolve = null;
      this.promiseReject = null;
    }
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.promiseResolve)?_c('r-modal',{ref:"confirmModal",attrs:{"title":_vm.question},on:{"close":_vm.no},scopedSlots:_vm._u([{key:"buttons",fn:function(){return [_c('r-button',{attrs:{"primary":"primary","action":_vm.yes}},[_vm._v(_vm._s(_vm.yesText))]),_c('r-button',{attrs:{"action":_vm.no}},[_vm._v(_vm._s(_vm.noText))])]},proxy:true}],null,false,1587310570)},[(_vm.desc)?_c('p',[_vm._v(_vm._s(_vm.desc))]):_vm._e()]):_vm._e()};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalConfirm = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

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
var script$4 = {
  name: "Tabs",
  props: {
    extendLine: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      tabs: [],
      activeTabName: null
    };
  },
  created: function created() {
    this.tabs = this.$children;
  },
  mounted: function mounted() {
    if (this.tabs.length) {
      this.setTabActive(this.tabs[0].name);
    }
  },
  methods: {
    setTabActive: function setTabActive(tabName) {
      this.activeTabName = tabName;
      this.tabs.forEach(function (tab) {
        tab.isActive = tab.name === tabName;
      });
    }
  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"r-tabs-container"},[_c('div',{staticClass:"r-tabs"},_vm._l((_vm.tabs),function(tab){return _c('r-button',{key:'tab-' + tab.name,staticClass:"r-tab",class:{ active: tab.isActive },attrs:{"icon":tab.icon,"icon-color":tab.isActive ? 'blue' : null,"action":function () { _vm.setTabActive(tab.name); },"borderless":"borderless"}},[_c('span',{class:{ 'r-text-color-quiet': !tab.isActive }},[_vm._v(_vm._s(tab.name))])])}),1),(_vm.line)?_c('div',{staticClass:"r-tabs-line r-margin-bottom-medium",class:{ extendLine: _vm.extendLine }}):_vm._e(),_c('div',{staticClass:"r-tabs-content"},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Tabs = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
var script$5 = {
  name: "TabContent",
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  },
  data: function data() {
    return {
      isActive: false
    };
  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isActive)?_c('div',{staticClass:"tab-content"},[_vm._t("default")],2):_vm._e()};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var TabContent = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

var genId = function genId() {
  return "_".concat(Math.random().toString(36).substr(2)).concat(Math.random().toString(36).substr(2));
};

var UIDMixin = {
  beforeCreate: function beforeCreate() {
    this._uid = genId();
  },
  computed: {
    /**
     * @return {string}
     */
    UID: function UID() {
      return this._uid;
    }
  }
};

var script$6 = {
  name: "TextInput",
  mixins: [UIDMixin],
  props: {
    label: String,
    placeholder: String,
    helperText: {
      type: String,
      default: undefined
    },
    invalidMessage: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: "text"
    },
    fullwidth: {
      type: Boolean,
      default: true
    },
    value: [String, Number]
  },
  computed: {
    inputListeners: function inputListeners() {
      var _this = this;

      return _objectSpread2({}, this.$listeners, {
        input: function input(event) {
          return _this.$emit("input", event.target.value);
        }
      });
    }
  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"r-text-input"},[(_vm.label)?_c('label',{staticClass:"r-form-label r-text-medium",attrs:{"for":_vm.UID}},[_vm._v(_vm._s(_vm.label)),(_vm.helperText)?_c('div',{staticClass:"r-text-color-quiet r-text-small r-margin-bottom-tiny r-text-regular"},[_vm._v(_vm._s(_vm.helperText))]):_vm._e()]):_vm._e(),_c('input',_vm._g(_vm._b({staticClass:"r-input-text",class:{ fullwidth: _vm.fullwidth, invalid: _vm.invalidMessage },attrs:{"id":_vm.UID,"type":_vm.type,"placeholder":_vm.placeholder},domProps:{"value":_vm.value}},'input',_vm.$attrs,false),_vm.inputListeners)),(_vm.invalidMessage)?_c('div',{staticClass:"r-text-color-error r-margin-top-tiny"},[_vm._v(_vm._s(_vm.invalidMessage))]):_vm._e()])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var TextInput = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

var script$7 = {
  name: "TextInputArea",
  mixins: [UIDMixin],
  props: {
    label: String,
    placeholder: String,
    helperText: {
      type: String,
      default: undefined
    },
    invalidMessage: {
      type: String,
      default: undefined
    },
    fullwidth: {
      type: Boolean,
      default: true
    },
    value: [String, Number]
  },
  computed: {
    inputListeners: function inputListeners() {
      var _this = this;

      return _objectSpread2({}, this.$listeners, {
        input: function input(event) {
          return _this.$emit("input", event.target.value);
        },
        "&input": function input(event) {
          // & for passive listener
          event.target.style.height = "auto";
          event.target.style.height = "".concat(event.target.scrollHeight, "px");
        }
      });
    }
  },
  watch: {
    value: function () {
      var _value = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee() {
        var el;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                el = this.$refs.textarea;

                if (!el) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return this.$nextTick();

              case 4:
                el.style.height = "auto";
                el.style.height = "".concat(el.scrollHeight, "px");

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function value() {
        return _value.apply(this, arguments);
      }

      return value;
    }()
  },
  mounted: function mounted() {
    this.$refs.textarea.style.height = "".concat(this.$refs.textarea.scrollHeight, "px");
  }
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"r-text-input-area"},[(_vm.label)?_c('label',{staticClass:"r-form-label r-text-medium",attrs:{"for":_vm.UID}},[_vm._v(_vm._s(_vm.label)),(_vm.helperText)?_c('div',{staticClass:"r-text-color-quiet r-text-small r-margin-bottom-tiny r-text-regular"},[_vm._v(_vm._s(_vm.helperText))]):_vm._e()]):_vm._e(),_c('textarea',_vm._g(_vm._b({ref:"textarea",staticClass:"r-input-text",class:{ fullwidth: _vm.fullwidth, invalid: _vm.invalidMessage },attrs:{"id":_vm.UID,"placeholder":_vm.placeholder},domProps:{"value":_vm.value}},'textarea',_vm.$attrs,false),_vm.inputListeners)),(_vm.invalidMessage)?_c('div',{staticClass:"r-text-color-error r-margin-top-tiny"},[_vm._v(_vm._s(_vm.invalidMessage))]):_vm._e()])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var TextInputArea = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
var MAX_SHOWN = 3;
var script$8 = {
  name: "Toast",
  data: function data() {
    return {
      queue: []
    };
  },
  watch: {
    queue: {
      handler: function handler(val) {
        var _this = this;

        if (val.length) {
          this.lastTimeout = setTimeout(function () {
            _this.remove(val[0].index);
          }, 1900 + val[0].text.length * 60);
        }
      }
    }
  },
  created: function created() {
    this.index = 0;
  },
  mounted: function mounted() {
    document.addEventListener("visibilitychange", this.onVisibilityChange, false);
    this.onVisibilityChange();
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
  },
  methods: {
    onVisibilityChange: function onVisibilityChange() {
      var _this2 = this;

      clearTimeout(this.lastTimeout);

      if (!document.hidden && this.queue.length) {
        this.lastTimeout = setTimeout(function () {
          _this2.remove(_this2.queue[0].index);
        }, 900 + this.queue[0].text.length * 70);
      }
    },
    notify: function notify(text) {
      var index = this.index;
      this.index += 1;
      text = text.toString();
      this.queue.push({
        text: text,
        index: index
      });

      if (this.queue.length > MAX_SHOWN) {
        this.queue = this.queue.slice(-MAX_SHOWN);
      }
    },
    remove: function remove(index) {
      this.queue = this.queue.filter(function (notif) {
        return notif.index !== index;
      });
    }
  }
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"r-toast-list"},[_c('transition-group',{staticClass:"r-toast-list-inner",attrs:{"name":"r-toast-list","tag":"div"}},_vm._l((_vm.queue),function(notification){return _c('div',{key:notification.index,staticClass:"r-toast-notification-wrap"},[_c('div',{staticClass:"r-toast-notification",on:{"click":function($event){return _vm.remove(notification.index)}}},[_vm._v(_vm._s(notification.text))])])}),0)],1)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Toast = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

//
var script$9 = {
  name: "Tooltip",
  data: function data() {
    return {
      visible: false,
      show: false,
      el: null,
      text: "",
      tooltip_x: 0,
      tooltip_y: 0,
      arrow_x: 0,
      arrow_y: 0,
      width: 0,
      height: 0,
      location: "top"
    };
  },
  computed: {
    tooltipStyle: function tooltipStyle() {
      return {
        left: "".concat(this.tooltip_x, "px"),
        top: "".concat(this.tooltip_y, "px")
      };
    },
    arrowStyle: function arrowStyle() {
      return {
        left: "".concat(this.arrow_x, "px"),
        top: "".concat(this.arrow_y, "px"),
        transform: {
          top: "",
          bottom: "rotate(180deg)",
          left: "rotate(270deg)",
          right: "rotate(90deg)"
        }[this.location]
      };
    }
  },
  watch: {
    show: {
      handler: function handler(val, oldVal) {
        var _this = this;

        if (val === oldVal) return;

        if (val === false) {
          clearTimeout(this.hideShowTimeout);
          this.hideShowTimeout = setTimeout(function () {
            _this.visible = false;
          }, 100);
        } else {
          clearTimeout(this.hideShowTimeout);

          if (this.el && this.el.tooltipData) {
            var tooltipData = this.el.tooltipData;
            this.text = tooltipData.text;
            if (!this.text) return;
          }

          this.hideShowTimeout = setTimeout(function () {
            _this.visible = true;
          }, 200);
        }
      }
    }
  },
  mounted: function mounted() {
    this.positionInterval = setInterval(this.update, 10);
    this.resizeObs = new ResizeObserver(this.tooltipSize);
    if (this.$refs.tooltip) this.resizeObs.observe(this.$refs.tooltip);
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.positionInterval);
    this.resizeObs.disconnect();
  },
  methods: {
    update: function update() {
      var _this2 = this;

      if (this.visible) {
        window.cancelAnimationFrame(this.animFrame);
        this.animFrame = window.requestAnimationFrame(function () {
          _this2.getData();

          _this2.position();
        });
      }
    },
    getData: function getData() {
      if (this.visible) {
        if (this.el && this.el.tooltipData && document.body.contains(this.el) && this.el.offsetHeight > 0) {
          var tooltipData = this.el.tooltipData;
          this.text = tooltipData.text;

          if (!this.text) {
            this.forceHide();
            return;
          }

          if (Object.keys(tooltipData.modifiers).length) {
            if (tooltipData.modifiers.bottom) {
              this.location = "bottom";
            } else if (tooltipData.modifiers.left) {
              this.location = "left";
            } else if (tooltipData.modifiers.right) {
              this.location = "right";
            }
          } else {
            this.location = "top";
          }
        } else {
          this.forceHide();
        }
      }
    },
    forceHide: function forceHide() {
      clearTimeout(this.hideShowTimeout);
      this.visible = false;
      this.show = false;
    },
    position: function position() {
      if (this.visible && this.el) {
        var rect = this.el.getBoundingClientRect();

        switch (this.location) {
          case "bottom":
            this.arrow_x = Math.round(rect.x + rect.width / 2) - 7;
            this.arrow_y = Math.round(rect.y + rect.height) - 9;
            this.tooltip_x = Math.round(rect.x + rect.width / 2 - this.width / 2);
            this.tooltip_y = Math.round(rect.y + rect.height) + 5;
            break;

          case "left":
            this.arrow_x = Math.round(rect.x) - 5;
            this.arrow_y = Math.round(rect.y + rect.height / 2) - 7;
            this.tooltip_x = Math.round(rect.x - this.width) - 5;
            this.tooltip_y = Math.round(rect.y + rect.height / 2 - this.height / 2);
            break;

          case "right":
            this.arrow_x = Math.round(rect.x + rect.width) - 9;
            this.arrow_y = Math.round(rect.y + rect.height / 2) - 7;
            this.tooltip_x = Math.round(rect.x + rect.width) + 5;
            this.tooltip_y = Math.round(rect.y + rect.height / 2 - this.height / 2);
            break;

          default:
            this.arrow_x = Math.round(rect.x + rect.width / 2) - 7;
            this.arrow_y = Math.round(rect.y) - 5;
            this.tooltip_x = Math.round(rect.x + rect.width / 2 - this.width / 2);
            this.tooltip_y = Math.round(rect.y - this.height) - 5;
            break;
        }

        if (this.location !== "left" && this.tooltip_x < 5) this.tooltip_x = 5;
      }
    },
    tooltipSize: function tooltipSize() {
      if (this.$refs.tooltip) {
        this.width = this.$refs.tooltip.clientWidth;
        this.height = this.$refs.tooltip.clientHeight;
      }
    }
  }
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition',{attrs:{"name":"r-tooltip"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"tooltip",staticClass:"r-tooltip",style:(_vm.tooltipStyle)},[_vm._v(_vm._s(_vm.text))])]),_c('transition',{attrs:{"name":"r-tooltip-arrow"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"r-tooltip-arrow",style:(_vm.arrowStyle)})])],1)};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var TooltipComponent = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

var TooltipComponentSymbol = Symbol("TooltipComponentSymbol");

var Tooltip =
/*#__PURE__*/
function () {
  function Tooltip(context) {
    _classCallCheck(this, Tooltip);

    if (!context) throw new Error("No context");
    if (!context.$root) throw new Error("No context $root"); // @ts-ignore

    this.tooltipComponent = context.$root[TooltipComponentSymbol];
  }

  _createClass(Tooltip, [{
    key: "attach",
    value: function attach(el) {
      el.addEventListener("mouseenter", this.mouseEnter.bind(this), {
        passive: true
      });
      el.addEventListener("mouseleave", this.mouseLeave.bind(this), {
        passive: true
      }); // el.addEventListener("touchstart", this.touchStart.bind(this), { passive: true });
      // el.addEventListener("touchend", this.touchEnd.bind(this), { passive: true });
    }
  }, {
    key: "detach",
    value: function detach(el) {
      el.removeEventListener("mouseenter", this.mouseEnter);
      el.removeEventListener("mouseleave", this.mouseLeave); // el.removeEventListener("touchstart", this.touchStart);
      // el.removeEventListener("touchend", this.touchEnd);
    }
  }, {
    key: "mouseEnter",
    value: function mouseEnter(event) {
      this.tooltipComponent.el = event.currentTarget;
      this.tooltipComponent.show = true;
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave(event) {
      this.tooltipComponent.show = false;
    }
    /*
    private touchStart(event: TouchEvent) {
      // @ts-ignore
      const { tooltipData } = event.currentTarget;
      console.log("touchStart", tooltipData);
    }
        private touchEnd(event: TouchEvent) {
      // @ts-ignore
      const { tooltipData } = event.currentTarget;
      console.log("touchEnd", tooltipData);
    }
    */

  }], [{
    key: "createTooltipComponentInApp",
    value: function createTooltipComponentInApp(context, vue) {
      if (!context) throw new Error("No context");
      if (!context.$root) throw new Error("No context $root"); // @ts-ignore

      if (context.$root[TooltipComponentSymbol]) return;
      var node = document.createElement("div");
      context.$root.$el.appendChild(node);
      var TooltipConstructor = vue.extend(TooltipComponent); // @ts-ignore

      context.$root[TooltipComponentSymbol] = new TooltipConstructor({
        parent: context.$root
      }).$mount(node);
    }
  }]);

  return Tooltip;
}();

var RTip = function RTip(vue) {
  return {
    // bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode_) {},
    inserted: function inserted(el, binding, vnode) {
      Tooltip.createTooltipComponentInApp(vnode.context, vue); // Create a Tooltip instance for element and save it with VNode

      vnode._tooltip = new Tooltip(vnode.context);

      vnode._tooltip.attach(el); // Save tooltipData with element


      el.tooltipData = {
        text: binding.value,
        modifiers: binding.modifiers
      };
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      if (binding.oldValue === binding.value) return; // Save tooltipData with element

      el.tooltipData = {
        text: binding.value,
        modifiers: binding.modifiers
      };
    },
    unbind: function unbind(el, binding, vnode) {
      vnode._tooltip && vnode._tooltip.detach(el);
    }
  };
};

var version = "0.48.1";

var mountComponentToRoot = function mountComponentToRoot(vue, parent, componentConstructor) {
  var propsData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var node = document.createElement("div");
  parent.$el.appendChild(node);
  var Constructor = vue.extend(componentConstructor);
  return new Constructor({
    parent: parent,
    propsData: propsData
  }).$mount(node);
};

var install = function install(Vue) {
  Vue.use(PortalVue);
  Vue.component("r-button", Button);
  Vue.component("r-icon", Icon);
  Vue.component("r-modal", Modal);
  Vue.component("r-tabs", Tabs);
  Vue.component("r-tab-content", TabContent);
  Vue.component("r-text-input", TextInput);
  Vue.component("r-text-input-area", TextInputArea);
  Vue.directive("rtip", RTip(Vue));
  var toastComponent;
  var portalTargetComponent;
  var modalConfirmComponent;
  Vue.mixin({
    data: function data() {
      return this.$parent ? {} : {
        rModalsOpen: []
      };
    },
    mounted: function mounted() {
      // @ts-ignore
      if (!this.$parent) {
        // @ts-ignore
        toastComponent = mountComponentToRoot(Vue, this, Toast); // @ts-ignore

        portalTargetComponent = mountComponentToRoot(Vue, this, PortalTarget, {
          name: "r-modals",
          multiple: true
        }); // @ts-ignore

        modalConfirmComponent = mountComponentToRoot(Vue, this, ModalConfirm);
      }
    }
  });

  Vue.prototype.$rNotifyToast = function (message) {
    // @ts-ignore
    toastComponent.notify(message);
  };
};

var plugin = {
  install: install,
  version: version
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
