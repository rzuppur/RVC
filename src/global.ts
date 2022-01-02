import { ref, Ref } from "vue";

export const modalsOpen: Ref<string[]> = ref([]);

export const modalConfirm = ref();

interface tooltipModifiers {
  left?: boolean,
  bottom?: boolean,
  right?: boolean
}

export const tooltips: Ref<Map<string, { value: string | null, modifiers: tooltipModifiers, el: HTMLElement, alive?: boolean, style?: { left: string, top: string } }>> = ref(new Map());
export const activeTooltips: Ref<Set<string>> = ref(new Set());

export const notify = ref();
