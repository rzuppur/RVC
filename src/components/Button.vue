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
    borderless: props.borderless,
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
    onPointerdown(event) {
      event.preventDefault();
      event.currentTarget.focus();
      event.currentTarget.blur();
    },
  }, childrenNodes);
};

</script>
<template lang="pug">

Button

</template>
<style lang="stylus">

@require "../styles/shared.styl"

@keyframes rSpin
  from
    transform rotate(0deg)
  to
    transform rotate(359deg)

.r-button
  control()
  cursor pointer
  user-select none
  white-space nowrap
  text-align center

  &:hover,
  &.borderless:hover
    background $c-button-hover

  &:focus
    box-shadow inset 0 0 0 1px $c-accent-black, inset 0 0 0 3px $c-accent-yellow !important
    border-color $c-accent-black !important

  &.borderless
    background-color transparent
    border-color transparent

  &.primary
    background $c-button-primary
    border-color transparent
    color $c-text-white

    &:hover
      background $c-button-primary-hover

  &.gray
    background $c-button-gray

    &:hover
      background $c-button-hover

  &[disabled]
    box-shadow none !important
    opacity 0.5

  &.icon-only
    width _$input-height
    min-width @width
    padding 0

    &.small
      width _$input-height-small
      min-width @width

  &:not(.icon-only)
    min-width 65px

  &.loading
    color transparent !important
    pointer-events none

    & > span
      opacity 0

    &::after
      content ""
      width 18px
      height @width
      border 2px solid transparent
      border-top-color $c-border-dark
      border-right-color $c-border-dark
      border-radius 100%
      animation rSpin 0.6s infinite linear
      position absolute !important

  &.loading.primary::after
    border-top-color $c-accent-white
    border-right-color $c-accent-white

  &:not(.muted) > span:not(.icon)
    font-weight $t-weight-medium

  & > span
    transition opacity 75ms

    &:not(.r-icon)
      position relative
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size $t-size-xs

  & > .r-icon

    &:first-child:not(:last-child)
      margin-left -2px
      margin-right 8px

    &:last-child:not(:first-child)
      margin-left 8px
      margin-right -2px

    &:first-child:last-child
      margin-left 0
      margin-right 0

&.small > .r-icon

  &:first-child:not(:last-child)
    margin-left -4px
    margin-right 5px

  &:last-child:not(:first-child)
    margin-right -4px
    margin-left 5px


_$buttons_margin = _$s-sm

.r-buttons
  margin-right -(_$buttons_margin)
  margin-bottom -(_$buttons_margin)
  display flex
  flex-direction row
  flex-wrap wrap
  align-items center

  .r-button
    margin-right _$buttons_margin
    margin-bottom _$buttons_margin
    flex 0 0 auto

.r-buttons-grouped
  margin-right -(_$buttons_margin)
  margin-bottom -(_$buttons_margin)

  .r-button-group
    display inline-block
    margin-right _$buttons_margin
    margin-bottom _$buttons_margin

    .r-button + .r-button
      border-top-left-radius 0
      border-bottom-left-radius 0
      margin-left -1px

    .r-button

      &:hover,
      &:focus
        z-index 1

      &:not(:last-child)
        border-top-right-radius 0
        border-bottom-right-radius 0

</style>
