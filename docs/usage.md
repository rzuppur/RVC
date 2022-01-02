`yarn add @rzuppur/rvc` or `npm install --save @rzuppur/rvc`

```typescript
import { createApp } from "vue";
import rvc from "@rzuppur/rvc";
import App from "./App.vue";

const testApp = createApp(App);
testApp.use(rvc);

testApp.mount("#app");
```
