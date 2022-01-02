import { Directive, VNode, } from "vue";
import { tooltips, activeTooltips } from "../global";

interface TooltipHTMLElement extends HTMLElement {
  _uid: string;
}

const setTooltip = (id, binding, el) => {
  tooltips.value.set(id, { value: binding.value, modifiers: binding.modifiers, el });
};

const onMouseEnter = (event) => {
  const id = event.target._uid;
  activeTooltips.value.add(id);
};

const onMouseLeave = (event) => {
  const id = event.target._uid;
  activeTooltips.value.delete(id);
};

export const TooltipDirectiveOptions: Directive<TooltipHTMLElement, VNode> = {
  mounted(el, binding) {
    const id = `_${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;
    el._uid = id;
    setTooltip(id, binding, el);

    el.addEventListener("mouseenter", onMouseEnter, { passive: true });
    el.addEventListener("mouseleave", onMouseLeave, { passive: true });
  },
  updated(el, binding) {
    const id = el._uid;
    setTooltip(id, binding, el);
  },
  beforeUnmount(el) {
    const id = el._uid;
    tooltips.value.delete(id);

    el.removeEventListener("mouseenter", onMouseEnter);
    el.removeEventListener("mouseleave", onMouseLeave);
  }
};
