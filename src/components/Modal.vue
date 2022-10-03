<script lang="ts" setup>

import { ref, computed, onBeforeMount, onMounted, onBeforeUnmount, nextTick, Teleport as teleport_ } from "vue";
import type { Ref, TeleportProps, VNodeProps } from "vue";
import ResizeObserver from "resize-observer-polyfill";
import { modalsOpen } from "../global";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const props = defineProps({
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
});

let id: string;
onBeforeMount(() => {
  id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
});

const myIndex = computed(() => {
  return modalsOpen.value.indexOf(id);
});

const modalContainerClass = computed(() => {
  return `r-container-${props.size}`;
});

const modalOverlayZIndex = computed(() => {
  return 10000 + modalsOpen.value.indexOf(id);
});

const modalZIndex = computed(() => {
  return 10001 + modalsOpen.value.indexOf(id);
});

let contentObs: ResizeObserver;
onMounted(() => {
  contentObs = new ResizeObserver(() => {
    checkContentScroll();
  });
});

const modalOpen = ref(false);
onBeforeUnmount(() => {
  if (modalOpen.value) close();
  if (contentObs) contentObs.disconnect();
});

const modalContent: Ref<HTMLElement> = ref(null);

const open = async () => {
  const index = modalsOpen.value.indexOf(id);
  if (index >= 0) modalsOpen.value.splice(index, 1);
  modalsOpen.value.push(id);
  modalOpen.value = true;
  document.body.classList.add("r-modal-open");

  await nextTick();

  if (modalContent.value) {
    contentObs.observe(modalContent.value);
  }
};

const close = () => {
  modalsOpen.value.splice(modalsOpen.value.indexOf(id), 1);
  modalOpen.value = false;
  emit("close");
  if (modalsOpen.value.length === 0) document.body.classList.remove("r-modal-open");
};

const outsideClose = () => {
  if (!props.blocking) close();
};

const contentScrolls = ref(false);
const checkContentScroll = () => {
  if (modalContent.value) {
    const overflow = modalContent.value.scrollHeight - modalContent.value.clientHeight;
    contentScrolls.value = overflow > 0;
    updateScrollPosition();
  }
};

const showTopBorder = ref(false);
const showBottomBorder = ref(false);
const updateScrollPosition = () => {
  const content = modalContent.value;
  if (content) {
    showTopBorder.value = content.scrollTop > 4;
    showBottomBorder.value = content.scrollTop < ( content.scrollHeight - content.offsetHeight - 5 );
  }
};

defineExpose({
  open,
  close,
});

// todo: workaround, see https://github.com/vuejs/core/issues/2855
const Teleport = teleport_ as {
  new (): {
    $props: VNodeProps & TeleportProps
  }
}

</script>
<template lang="pug">

component(:is="Teleport" to="#rOverlayTarget")

  transition(name="r-modal")

    .r-modal-overlay(
      v-if="modalOpen"
      @click="outsideClose"
      @keyup.esc.stop="outsideClose"
      :style="{ 'z-index': modalOverlayZIndex }"
    )

      .r-modal-container(:class="modalContainerClass")

        .r-modal(
          ref="modal"
          role="dialog"
          @click.stop=""
          :aria-labelledby="title ? `dialog-title-${id}` : null"
          @keydown.capture.esc="outsideClose"
          :style="{ 'z-index': modalZIndex }"
        )

          .r-modal-header(v-if="title !== false")

            h1.r-modal-title.r-text-md.r-text-medium(:id="`dialog-title-${id}`") {{ title }}

            r-button.r-modal-close(v-if="!blocking" borderless :action="close" label="Close dialog" icon="close")

          .r-flex-0.r-modal-top-shadow(v-if="showTopBorder")

          .r-modal-content(
            :class="{ 'r-modal-content-scroll': contentScrolls, 'no-buttons': !buttons }"
            @scroll.passive="updateScrollPosition"
            ref="modalContent"
          )
            .r-modal-content-inner
              slot

          .r-flex-0.r-modal-bottom-shadow(v-if="showBottomBorder")

          .r-modal-buttons(v-if="buttons")
            .r-buttons
              slot(name="buttons" :close="close")
                r-button(:action="close") Close

</template>
<style lang="stylus">

@require "../styles/shared.styl"

body.r-modal-open
  overflow hidden

.r-modal-enter-active,
.r-modal-leave-active
  transition opacity 100ms ease-out

  .r-modal
    transition transform 100ms ease-out

.r-modal-enter-from,
.r-modal-leave-to
  opacity 0

  .r-modal
    transform scale(.95)


@media (max-width _$container-sm)

  .r-modal-enter-active,
  .r-modal-leave-active
    transition opacity 100ms ease-out

    .r-modal
      transition transform 100ms cubic-bezier(.31, .79, .46, .92)

  .r-modal-enter,
  .r-modal-leave-to
    .r-modal
      transform translateY(12px)

.r-modal-overlay
  overflow hidden
  -webkit-overflow-scrolling touch
  position fixed
  text-align center
  left 0
  top 0
  right 0
  bottom 0
  height 100%
  background alpha(black, 0.6)

  @supports (display: grid)
    @media (min-width _$container-sm + 0.1px)
      grid-template-columns 100%
      grid-template-rows 1fr max-content 2fr
      display grid

      .r-modal-container
        grid-column 1
        grid-row 2
        width 100%

.r-modal-container
  text-align left

.r-modal
  background $c-background-raised
  border-radius $s-md
  word-wrap break-word
  overflow-y auto
  display flex
  flex-direction column
  max-height "calc(100vh - %s)" % $s-md
  box-shadow 0 15px 10px -5px alpha(black, 20%)

.r-modal-header,
.r-modal-buttons
  flex 0 0 auto

.r-modal-header
  display flex
  padding $s-lg $s-lg $s-md

  .r-modal-title
    flex 1 1 auto
    align-self center
    margin 0

  .r-modal-close
    flex 0 0 auto
    align-self flex-start

.r-modal-buttons
  padding $s-md $s-lg $s-lg

.r-modal-content
  padding 0 $s-lg
  flex 0 1 auto
  overflow hidden

  &.no-buttons
    padding-bottom $s-md

  &.r-modal-content-scroll
    min-height $s-lg
    padding 0 $s-lg $s-md
    overflow-y auto

@media (max-width _$container-sm)

  .r-modal-container
    padding 0
    justify-content flex-end
    height 100%
    display flex
    flex-direction column

  .r-modal
    border-radius 0

.r-modal-top-shadow,
.r-modal-bottom-shadow
  position relative
  z-index 10

  &:after
    content ""
    user-select none
    pointer-events none
    height 20px
    position absolute
    left 0
    right 0
    opacity 0.07

  .darkMode &
    height 1px
    background $c-border-medium

    &:after
      opacity 0.3
      height 40px

.r-modal-top-shadow:after
  top 0
  background linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.878) 4.3%,
    rgba(0, 0, 0, 0.764) 8.6%,
    rgba(0, 0, 0, 0.657) 12.9%,
    rgba(0, 0, 0, 0.558) 17.3%,
    rgba(0, 0, 0, 0.467) 21.9%,
    rgba(0, 0, 0, 0.384) 26.8%,
    rgba(0, 0, 0, 0.309) 32.2%,
    rgba(0, 0, 0, 0.243) 38%,
    rgba(0, 0, 0, 0.184) 44.4%,
    rgba(0, 0, 0, 0.133) 51.4%,
    rgba(0, 0, 0, 0.09) 59.2%,
    rgba(0, 0, 0, 0.055) 67.9%,
    rgba(0, 0, 0, 0.028) 77.5%,
    rgba(0, 0, 0, 0.01) 88.2%,
    rgba(0, 0, 0, 0) 100%)

.r-modal-bottom-shadow:after
  bottom 0
  background linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.878) 4.3%,
    rgba(0, 0, 0, 0.764) 8.6%,
    rgba(0, 0, 0, 0.657) 12.9%,
    rgba(0, 0, 0, 0.558) 17.3%,
    rgba(0, 0, 0, 0.467) 21.9%,
    rgba(0, 0, 0, 0.384) 26.8%,
    rgba(0, 0, 0, 0.309) 32.2%,
    rgba(0, 0, 0, 0.243) 38%,
    rgba(0, 0, 0, 0.184) 44.4%,
    rgba(0, 0, 0, 0.133) 51.4%,
    rgba(0, 0, 0, 0.09) 59.2%,
    rgba(0, 0, 0, 0.055) 67.9%,
    rgba(0, 0, 0, 0.028) 77.5%,
    rgba(0, 0, 0, 0.01) 88.2%,
    rgba(0, 0, 0, 0) 100%)

</style>
