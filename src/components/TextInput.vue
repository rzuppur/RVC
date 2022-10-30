<script setup lang="ts">

import { useAttrs } from "vue";

const emits = defineEmits(["update:modelValue"]);
const attrs = useAttrs();
const uid = `_${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;

const props: any = defineProps({
  label: String,
  placeholder: String,
  help: { type: String, default: undefined },
  error: { type: String, default: undefined },
  type: { type: String, default: "text" },
  fullwidth: { type: Boolean, default: true },
  small: { type: Boolean, default: false },
  modelValue: [String, Number],
});

</script>
<script lang="ts">

export default {
  inheritAttrs: false,
}

</script>
<template lang="pug">

.r-text-input

  label.r-form-label.r-text-medium.r-m-b-xs(v-if="props.label" :for="uid") {{ props.label }}

    .r-text-color-muted.r-text-xxs.r-text-regular(v-if="props.help") {{ props.help }}

  input.r-input-text(
    :id="uid"
    :type="props.type"
    :class="{ fullwidth: props.fullwidth, invalid: props.error, small: props.small }"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    v-bind="attrs"
    @input="(event) => $emit('update:modelValue', event.target.value)"
  )

  .r-text-color-red.r-text-medium.r-m-t-xs(v-if="props.error") {{ props.error }}

</template>
