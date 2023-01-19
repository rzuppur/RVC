<script setup lang="ts">

import { h, resolveComponent, useAttrs, useSlots } from "vue";

const attrs = useAttrs();
const slots = useSlots()

const props: any = defineProps({
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
  disabled: Boolean,
});

const Icon = resolveComponent("r-icon");

const Button = () => {
  const childrenNodes = [];
  const textSlot = slots.default && slots.default();

  let icon;
  if (props.icon) {
    icon = h(Icon, {
      icon: props.icon,
      size: props.small ? "sm" : "md",
      class: [{
        white: props.primary,
        gray: !props.primary && !props.iconColor,
      }, props.iconColor],
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

  const buttonClasses = {
    "r-button": true,
    "icon-only": props.icon && !textSlot,
    borderless: props.borderless || props.gray,
    primary: props.primary,
    gray: props.gray,
    fullwidth: props.fullwidth,
    small: props.small,
    loading: props.loading,
  };

  return h("button", {
    "aria-label": props.label,
    disabled: props.disabled || props.loading,
    type: props.submit ? "submit" : "button",
    class: buttonClasses,
    directives: attrs.directives,
    onClick: (event) => {
      // Check for ctrl+click
      if (props.actionWithModifier && event.getModifierState("Control") && !event.getModifierState("Shift") && !event.getModifierState("Alt") && !event.getModifierState("Meta")) {
        props.actionWithModifier(event);
        return;
      }

      // Check if normal click handler is present
      if (props.action) {
        props.action(event);
      }
    },
    onPointerup(event) {
      event.currentTarget.focus();
      event.currentTarget.blur();
    },
  }, childrenNodes);
};

</script>
<template lang="pug">

Button

</template>
