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
    }, 1900 + firstNotification.message.length * 70);
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
