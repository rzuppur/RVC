<script setup lang="ts">

import { ref } from "vue";

const version = __APP_VERSION__;

// DARK MODE DEMO
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("darkMode");
};

// ICONS DEMO
import ICONS from "../src/icons";

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

</script>
<template lang="pug">

.r-p-t-md.r-p-b-xl
  .r-container-md

    .r-background-raised.r-m-b-md.r-border-radius-md
      .r-p-lg
        h1.r-text-xl.r-text-light.r-m-b-sm RVC
          span.r-m-l-sm.r-text-xs.r-text-regular v{{ version }}
        h2.r-text-sm User interface components and styles for Vue 3
        r-button.r-m-t-md(small :action="toggleDarkMode" icon="brightness dark") Toggle dark theme

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
            r-button(gray borderless)&attributes(
              attributes) Gray borderless
            r-button(gray)&attributes(
              attributes) Gray
        +buttonsTests()
        +buttonsTests()(disabled=true)
        +buttonsTests()(loading=true)
        .r-buttons.r-space
          r-button(icon="arrow left") Icon
          r-button(icon="arrow right" icon-right) Icon right
          r-button(primary icon="add") Icon
          r-button(borderless icon="close" icon-color="red") Icon
          r-button(gray borderless icon="edit" icon-color="blue") Icon
          r-button(gray icon="check" icon-color="green") Icon
          r-button(icon="add image" icon-color="gold")
          r-button(borderless icon="eye visible")
        .r-buttons.r-space
          r-button(:action="clickTest" :actionWithModifier="ctrlClickTest") Test click
          r-button(small) Small
          r-button(small icon="arrow left") Small icon
          r-button(small icon="arrow right" icon-right) Icon right
          r-button(small icon="close")
          r-button(small borderless icon="edit")
        .r-buttons-grouped.r-space
          .r-button-group
            r-button(icon="text bold")
            r-button(icon="text italic")
            r-button(icon="text underline")
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
      .icons.r-p-lg
        r-icon.gray(v-for="icon in [...Object.keys(ICONS), 'missing']" :icon="icon" v-r-tip="icon")

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
      .r-p-lg(v-pre)
        h1.r-text-md.r-text-bold 7. Theming
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

</style>
