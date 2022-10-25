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
