<script setup lang="ts">

import { ref, computed } from "vue";

const version = __APP_VERSION__;

// DARK MODE DEMO
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("darkMode");
};

// ICONS DEMO
import { ALL_ICONS } from "./icons";
const filterText = ref("");
const iconSize = ref("md");
const iconFill = ref(false);
const iconLimit = ref(54);
const icons = computed(() => {
  if (filterText.value.length) return ALL_ICONS.filter(icon => icon.split("_").some(t => t.startsWith(filterText.value.toLocaleLowerCase())));
  return ALL_ICONS;
});
const copyIconText = (iconText: string) => {
  navigator.permissions.query({ name: "clipboard-write" } as unknown as PermissionDescriptor).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.clipboard.writeText(iconText).then(() => {
        toast(`Copied ${iconText} to clipboard`);
      });
    }
  });
};

// TOAST
import { useToast } from "./main";
const toast = useToast();
const testText = ref<string>("Long text notification that should hopefully wrap to multiple lines and you should be able to read this entire text before it disappears.");

// BUTTONS
const clickTest = () => window.alert("Click test");
const ctrlClickTest = () => window.alert("Ctrl+click test");

// MODALS
import { useModalConfirm } from "./main";
const confirmModal = useModalConfirm();
const confirmModalDemo = async () => {
  const result = await confirmModal("Modal question?", "Confirm", "Cancel", "Description text");
  toast(result ? "Confirmed" : "Cancelled");
};

// CSS VARIABLES
const allVariables = [...document.styleSheets]
  .filter(s => { try { s.cssRules; return true; } catch { return false; } })
  .reduce((result, sheet) => {
    return result.concat(
      [...sheet.cssRules]
        .filter(rule => rule.type === 1)
    );
  }, []);
const darkModeVariables = allVariables
  .filter(rule => rule.selectorText === "html.darkMode")
  .reduce((result, cssRule) => {
    return result.concat(
      [...cssRule.style]
        .reduce((result, rules) => result.concat(rules), [])
        .map(rule => {
          return {
            name: rule.trim(),
            value: cssRule.style.getPropertyValue(rule).trim(),
          };
        }))
        .filter(rule => rule.name.startsWith("--"));
  }, []);
const rootVariables = allVariables
  .filter(rule => rule.selectorText === ":root")
  .reduce((result, cssRule) => {
    return result.concat(
      [...cssRule.style]
        .reduce((result, rules) => result.concat(rules), [])
        .map(rule => {
          const darkMode = darkModeVariables.find(variable => variable.name === rule.trim());
          return {
            name: rule.trim(),
            value: cssRule.style.getPropertyValue(rule).trim(),
            valueDarkMode: darkMode && darkMode.value,
          };
        }))
        .filter(rule => rule.name.startsWith("--"));
  }, []);
const copyVar = (name: string) => {
  navigator.permissions.query({ name: "clipboard-write" } as unknown as PermissionDescriptor).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      const text = `var(${name})`;
      navigator.clipboard.writeText(text).then(() => {
        toast(`Copied ${text} to clipboard`);
      });
    }
  });
};

</script>
<template lang="pug">

.r-p-t-md.r-p-b-xl
  .r-container-md

    .r-background-raised.r-m-b-md.r-border-radius-md
      .r-p-lg
        h1.r-text-xl.r-text-light.r-m-b-sm RVC
          span.r-m-l-sm.r-text-xs.r-text-regular v{{ version }}
        h2.r-text-sm User interface components and styles for Vue 3
        r-button.r-m-t-md(small :action="toggleDarkMode" icon="brightness_medium") Toggle dark theme

        p.r-m-t-lg
          a(href="https://github.com/rzuppur/rvc/blob/master/demo/App.vue" target="_blank") View current page source code
          br
          a(href="https://github.com/rzuppur/rvc" target="_blank") GitHub
          br
          a(href="https://www.npmjs.com/package/@rzuppur/rvc" target="_blank") NPM
      hr
      .r-p-lg
        h3.r-text-sm.r-text-bold Contents
        ol
          li #[a(href="#1") Install ]
          li #[a(href="#2") Buttons ]
          li #[a(href="#3") Containers ]
          li #[a(href="#4") Forms ]
          li #[a(href="#5") Icons ]
          li #[a(href="#6") Modal ]
          li #[a(href="#7") Theming ]
          li #[a(href="#8") Toast notification ]
          li #[a(href="#9") Tooltip ]
          li #[a(href="#10") Typography ]
          li #[a(href="#11") Utilities ]

    .r-background-raised.r-m-b-md.r-border-radius-md#1
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 1. Install
        include:markdown-it ../docs/usage.md

    .r-background-raised.r-m-b-md.r-border-radius-md#2
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 2. Buttons
        include:markdown-it ../docs/button.md
      hr
      .r-p-lg
        mixin buttonsTests()
          .r-buttons.r-space
            r-button&attributes(
              attributes) Normal
            r-button(primary)&attributes(
              attributes) Primary
            r-button(borderless)&attributes(
              attributes) Borderless
            r-button(gray)&attributes(
              attributes) Gray
        +buttonsTests()
        +buttonsTests()(disabled=true)
        +buttonsTests()(loading=true)
        .r-buttons.r-space
          r-button(icon="arrow_back") Icon
          r-button(icon="arrow_forward" icon-right) Icon right
          r-button(primary icon="add") Icon
          r-button(borderless icon="close" icon-color="red") Icon
          r-button(gray icon="edit" icon-color="blue") Icon
          r-button(icon="image" icon-color="green")
          r-button(borderless icon="visibility" icon-color="yellow")
        .r-buttons.r-space
          r-button(:action="clickTest" :actionWithModifier="ctrlClickTest") Test click
          r-button(small) Small
          r-button(small icon="arrow_back") Small icon
          r-button(small icon="arrow_forward" icon-right) Icon right
          r-button(small icon="close")
          r-button(small borderless icon="edit")
        .r-buttons-grouped.r-space
          .r-button-group
            r-button(icon="format_bold")
            r-button(icon="format_italic")
            r-button(icon="format_underlined")
          .r-button-group
            r-button Buttons
            r-button Grouped

  .r-container-fill

    .r-background-raised.r-m-b-md.r-border-radius-md#3
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 3. Containers
        include:markdown-it ../docs/container.md
      hr
      .r-p-lg
        each size in ["xs", "sm", "md", "lg", "xl", "xxl", "fill"]
          .r-m-b-md(class="r-container-" + size)
            .container-demo r-container-#{size}

  .r-container-md

    .r-background-raised.r-m-b-md.r-border-radius-md#4
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 4. Forms
        include:markdown-it ../docs/form.md
      hr
      .r-p-lg
        .r-form-group
          r-text-input(label="Text input" :fullwidth="false" placeholder="Placeholder")
        .r-form-group
          r-text-input(label="Small input" :small="true")
        .r-form-group
          r-text-input(label="Full width" model-value="Text input")
        .r-form-group
          r-text-input(label="With error" error="Error message")
        .r-form-group
          r-text-input(label="With help" help="Help text")
        .r-form-group
          r-text-area(label="Textarea" helper-text="Description text")

    .r-background-raised.r-m-b-md.r-border-radius-md#5
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 5. Icons
        include:markdown-it ../docs/icon.md
      hr
      .r-p-lg.r-p-b-none
        r-text-input(label="Filter" :fullwidth="false" :small="true" v-model.trim="filterText")
        .r-buttons-grouped.r-m-t-sm
          .r-button-group
            r-button(small :action="() => { iconSize = 'sm'; }" :icon="iconSize === 'sm' ? 'radio_button_checked' : 'radio_button_unchecked'") sm
            r-button(small :action="() => { iconSize = 'md'; }" :icon="iconSize === 'md' ? 'radio_button_checked' : 'radio_button_unchecked'") md
            r-button(small :action="() => { iconSize = 'lg'; }" :icon="iconSize === 'lg' ? 'radio_button_checked' : 'radio_button_unchecked'") lg
          .r-button-group
            r-button(small :action="() => { iconFill = false; }" :icon="!iconFill ? 'radio_button_checked' : 'radio_button_unchecked'") outline
            r-button(small :action="() => { iconFill = true; }" :icon="!!iconFill ? 'radio_button_checked' : 'radio_button_unchecked'") filled
      .icons.r-p-lg
        r-icon.gray(v-for="icon in icons.slice(0, iconLimit)" :icon="icon" :size="iconSize" :filled="iconFill" v-r-tip="icon" @click="() => { copyIconText(icon); }")
        div
          a(v-if="iconLimit < 10_000" @click="() => { iconLimit = 10_000; }") Show all

    .r-background-raised.r-m-b-md.r-border-radius-md#6
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 6. Modal
        include:markdown-it ../docs/modal.md
      hr
      .r-p-lg
        mixin modalButtons()
          r-button(:action="() => { $refs.modal1.open(); }") default
          r-button(:action="() => { $refs.modal2.open(); }") md
          r-button(:action="() => { $refs.modal3.open(); }") lg
          r-button(:action="() => { $refs.modal6.open(); }") blocking
          r-button(:action="() => { $refs.modal7.open(); }") no buttons
          r-button(:action="confirmModalDemo") confirmation modal
        .r-buttons
          +modalButtons()
        r-modal(ref="modal1" title="Default size (sm)")
          p Modal content start
          p(v-for="i in 20") .
          p Modal content end
          template(v-slot:buttons)
            +modalButtons()
        r-modal(ref="modal2" title="Medium size" size="md")
          template(v-slot:buttons)
            +modalButtons()
        r-modal(ref="modal3" title="Large size" size="lg")
          template(v-slot:buttons)
            +modalButtons()
        r-modal(ref="modal6" title="Blocking modal" :blocking="true")
          p Can't close this
          template(v-slot:buttons="buttons")
            r-button(:action="buttons.close") Unless you click here
        r-modal(ref="modal7" title="No buttons modal" :buttons="false")
          p(v-for="i in 10") Modal content

    .r-background-raised.r-m-b-md.r-border-radius-md#7
      .r-p-lg
        h1.r-text-md.r-text-bold 7. Theming
        p.r-m-b-md Use CSS variables to customize and/or extend colors, text styles and more. Click on the variable name below to copy it to clipboard.
        .variable(v-for="variable in rootVariables" @click="copyVar(variable.name)")
          .name {{ variable.name }}
          .value.r-text-color-muted
            .color(v-if="variable.value.startsWith('#')" :style="{ background:  variable.value }")
            | {{ variable.value }}
            r-icon(v-if="variable.valueDarkMode" icon="light_mode" size="sm")
          .value.r-text-color-muted(v-if="variable.valueDarkMode")
            .color(v-if="variable.valueDarkMode.startsWith('#')" :style="{ background:  variable.valueDarkMode }")
            | {{ variable.valueDarkMode }}
            r-icon(icon="dark_mode" size="sm")
      hr
      .r-p-lg(v-pre)
        include:markdown-it ../docs/variables.md

    .r-background-raised.r-m-b-md.r-border-radius-md#8
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 8. Toast notification
        include:markdown-it ../docs/toast.md
      hr
      .r-p-lg
        form.r-flex-container.r-flex-items-end(@submit.prevent="() => { toast(testText) }")
          .r-flex-1
            r-text-area(v-model="testText" placeholder="Notification text")
          r-button.r-m-l-sm.r-flex-0(primary submit) Notify

    .r-background-raised.r-m-b-md.r-border-radius-md#9
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 9. Tooltip
        include:markdown-it ../docs/tooltip.md
      hr
      .r-p-lg
        .r-buttons
          r-button(v-r-tip="'Default tooltip with long test text'") Default
          r-button(v-r-tip.bottom="'Position bottom'") Bottom
          r-button(v-r-tip.left="'Position left'") Left
          r-button(v-r-tip.right="'Position right'") Right
          r-button(v-r-tip="null") Null

    .r-background-raised.r-m-b-md.r-border-radius-md#10
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 10. Typography
        include:markdown-it ../docs/typography.md
      hr
      .r-p-lg
        .r-text-xxl XXL text
        .r-text-xl XL text
        .r-text-lg LG text
        .r-text-md MD text
        .r-text-sm SM text
        .r-text-xs XS text
        .r-text-xxs.r-space XXS text
        p.r-text-color-muted Color muted
        p.r-text-color-red Color red
        p.r-text-light Weight light
        p.r-text-regular Weight regular
        p.r-text-medium Weight medium
        p.r-text-bold Weight bold

    .r-background-raised.r-m-b-md.r-border-radius-md#11
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 11. Utilities
        include:markdown-it ../docs/utils.md

</template>
<style lang="stylus">

body
  --t-family "Inter", sans-serif !important
  font-feature-settings "calt" 1

.icons
  .r-icon
    margin-right 10px
    margin-bottom 10px

    &:hover
      border-radius var(--s-xs)
      box-shadow 0 0 0 3px var(--c-accent-yellow)

.container-demo
  background var(--c-border-medium)

.variable
  display flex
  font-family monospace
  margin-top 6px
  font-size 11px

  &:hover
    cursor pointer
    filter brightness(0.95)

  & > *
    padding 3px 6px
    background var(--c-background)

    .color
      height 14px
      width @height
      margin-top -3px
      margin-bottom @margin-top
      display inline-block
      border-radius 4px
      margin-right 4px
      position relative

      &:after
        content ""
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        border 1px solid #fff2
        border-radius 4px
        mix-blend-mode exclusion

    .r-icon
      margin-left 4px
      vertical-align top
      transform scale(0.9)
      margin-top -1px
      margin-right -2px

    &:first-child
      border-top-left-radius var(--s-sm)
      border-bottom-left-radius var(--s-sm)
      white-space nowrap
      flex 0 0 auto
      font-weight var(--t-weight-bold)
      background var(--c-border-light)

    &:not(:last-child)
      border-right 2px solid var(--c-border-medium)

    &:last-child
      border-top-right-radius var(--s-sm)
      border-bottom-right-radius var(--s-sm)
      flex 0 1 auto

</style>
