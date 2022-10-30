<script setup lang="ts">

import { h, useAttrs } from "vue";

const attrs = useAttrs();

const props: any = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
    default: "md",
    validator(value: string) {
      if (["sm", "md", "lg"].includes(value)) return true;
      console.warn(`Invalid icon size ${value}, available sizes are sm, md, lg`);
      return false;
    },
  },
  filled: {
    type: Boolean,
    required: false,
  }
});


const Icon = () => {
  const classes = ["r-icon", `icon-${props.size}`];
  if (props.filled) classes.push("filled");
  return h("span", {
    "aria-hidden": true,
    class: classes,
    directives: attrs.directives,
  }, props.icon);
};

</script>
<template lang="pug">

Icon

</template>
