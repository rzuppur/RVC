<script setup lang="ts">

import { ref } from "vue";
import { activeTooltips, tooltips } from "../global";

const tooltipsWithLocation = ref([]);

const keepAlive = new Map();

const KEEP_ALIVE_TICKS = 4;
const TICK_LENGTH = 64;

setInterval(() => {
  tooltipsWithLocation.value = Array.from(tooltips.value)
  .filter(x => x[1].value) // Remove null directive values
  .map(x => {
    const id = x[0];
    const tooltip = x[1];
    let active = activeTooltips.value.has(id);

    tooltip.alive = false;

    if (active) {
      if (!keepAlive.has(id)) {
        active = false; // If tooltip was hidden, skip active for 1 tick to allow fading in
      }
      keepAlive.set(id, KEEP_ALIVE_TICKS);
    }

    if (keepAlive.has(id)) {
      const stepsLeft = keepAlive.get(id);

      if (stepsLeft > 0) {
        keepAlive.set(id, stepsLeft - 1);
        tooltip.alive = true;
      } else {
        keepAlive.delete(id);
      }
    }

    return { ...tooltip, active, id };
  })
  .filter(tooltip => tooltip.alive)
  .map(tooltip => {
    const boundingBox = tooltip.el.getBoundingClientRect();
    let left, top;

    if (tooltip.modifiers.left || tooltip.modifiers.right) {
      top = boundingBox.top + boundingBox.height / 2;

      if (tooltip.modifiers.left) {
        left = boundingBox.left - 5;
      } else {
        left = boundingBox.left + boundingBox.width + 5;
      }

    } else  {
      left = boundingBox.left + boundingBox.width / 2;

      if (tooltip.modifiers.bottom) {
        top = boundingBox.bottom + 20;
      } else {
        top = boundingBox.top - 20;
      }
    }

    tooltip.style = { left: Math.round(left) + "px", top: Math.round(top) + "px" };

    return tooltip;
  });
}, TICK_LENGTH);

</script>
<template lang="pug">

.r-tooltip(
  v-for="tt in tooltipsWithLocation"
  :key="tt.id"
  :class="{ active: tt.active, left: tt.modifiers.left, right: tt.modifiers.right, bottom: tt.modifiers.bottom }"
  :style="tt.style"
)
  .r-text-xxs {{ tt.value }}

</template>
