<template lang="pug">

teleport(to="#rOverlayTarget")

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
          :aria-labelledby="title ? `dialog-title-${_id}` : null"
          @keydown.capture.esc="outsideClose"
          :style="{ 'z-index': modalZIndex }"
        )

          .r-modal-header(v-if="title !== false")

            h1.r-modal-title.r-text-md.r-text-medium(:id="`dialog-title-${_id}`") {{ title }}

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

<script>

import ResizeObserver from "resize-observer-polyfill";
import { modalsOpen } from "../global";

export default {
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
    this.contentObs = new ResizeObserver(() => {
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

</script>

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
