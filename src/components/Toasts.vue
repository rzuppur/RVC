<script setup lang="ts">

import { ref, watchEffect } from "vue";
import { notify } from "../global";

const MAX_SHOWN = 3;
const index = ref(0);

const queue = ref<{ message: string, index: number }[]>([]);
const remove = (index: number) => {
  queue.value = queue.value.filter(n => n.index !== index);
};

watchEffect(() => {
  if (queue.value.length) {
    const firstNotification = queue.value[0];
    setTimeout(() => {
      remove(firstNotification.index);
    }, 1900 + firstNotification.message.length * 90);
  }
});

notify.value = (message: string) => {
  queue.value.push({
    message,
    index: index.value,
  });
  index.value += 1;

  if (queue.value.length > MAX_SHOWN) {
    queue.value = queue.value.slice(-MAX_SHOWN);
  }
};

</script>
<template lang="pug">

.r-toast-list
  transition-group.r-toast-list-inner(name="r-toast-list" tag="div")
    .r-toast-notification-wrap(v-for="notification in queue" :key="notification.index")
      .r-toast-notification(@click="remove(notification.index)") {{ notification.message }}

</template>
<style lang="stylus">

@require "../styles/shared.styl"

.r-toast-list
  position fixed
  top 36px
  left 10px
  right 10px
  z-index 13000
  user-select none
  pointer-events none

.r-toast-list-inner
  max-width 660px
  margin 0 auto
  position relative
  text-align center

.r-toast-notification
  display inline-block
  margin-bottom 5px
  word-break break-word
  pointer-events all
  user-select none
  background $c-background-toast
  color $c-text-white
  padding $s-md $s-lg
  border-radius $s-md

.r-toast-list-enter-from,
.r-toast-list-leave-to
  opacity 0

.r-toast-list-enter-active,
.r-toast-list-leave-active,
.r-toast-list-move
  transition all .2s

.r-toast-list-leave-active
  position absolute
  left 0
  right 0

</style>
