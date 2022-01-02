import { App, createApp, h, inject, InjectionKey } from "vue";
import { TooltipDirectiveOptions } from "./directives/tooltip";
import { modalConfirm, notify } from "./global";
import Icon from "./components/Icon.vue";
import Button from "./components/Button.vue";
import TextInput from "./components/TextInput.vue";
import TextArea from "./components/TextArea.vue";
import Modal from "./components/Modal.vue";
import ModalConfirm from "./components/ModalConfirm.vue";
import Tooltips from "./components/Tooltips.vue";
import Toasts from "./components/Toasts.vue";

const injectionFactory = <T>(name: string) => {
  const key: InjectionKey<T> = Symbol(name);
  return {
    use() {
      const injected = inject(key);
      if (!injected) throw new Error(`Could not resolve ${key.description}`);
      return injected;
    },
    key,
  };
}

const { use: useToast, key: toastKey } = injectionFactory<(message: string) => void>("RToast");
const { use: useModalConfirm, key: modalConfirmKey } = injectionFactory<(question: string, yesText?: string, noText?: string, description?: string) => Promise<boolean>>("RModalConfirm");
export { useToast, useModalConfirm };

export function install(app: App): void {
  const pluginRootTarget = document.createElement("div");
  const pluginRoot = createApp({
    render() {
      return [
        h(ModalConfirm),
        h(Tooltips),
        h(Toasts),
        h("div", { id: "rOverlayTarget" }),
      ];
    },
  });
  pluginRoot.component("r-icon", Icon);
  pluginRoot.component("r-button", Button);
  pluginRoot.component("r-modal", Modal);
  pluginRoot.mount(pluginRootTarget);
  document.body.append(pluginRootTarget);

  app.provide(toastKey, notify.value);
  app.provide(modalConfirmKey, modalConfirm.value);

  app.directive("r-tip", TooltipDirectiveOptions);

  app.component("r-icon", Icon);
  app.component("r-button", Button);
  app.component("r-text-input", TextInput);
  app.component("r-text-area", TextArea);
  app.component("r-modal", Modal);
}
