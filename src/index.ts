import type { Plugin } from "vue";
import "./styles/main.styl";
import { install, useToast, useModalConfirm } from "./plugin";

export { useToast, useModalConfirm };

export default {
  install,
} as Plugin;
