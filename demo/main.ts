import { createApp } from "vue";
import rvc, { useToast, useModalConfirm } from "../src/index";
import App from "./App.vue";

export { useToast, useModalConfirm };

const testApp = createApp(App);
testApp.use(rvc);

testApp.mount("#app");
