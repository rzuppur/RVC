```html
<r-modal
  title: string | false
  blocking: boolean // optional
  buttons: boolean // optional, set to false to hide bottom bar with buttons
  size: string  // optional, ("xs" | "sm" | "md" | "xl" | "xxl" | "fill")
>
  {{ modal content }}
  <template v-slot:buttons>
    {{ r-buttons }}
  </template>
</r-modal>
```

Confirmation modal
```typescript
import { useModalConfirm } from "@rzuppur/rvc";
const confirmModal = useModalConfirm();
const confirmed: boolean = await confirmModal(
    "Question",
    "Yes text", // optional
    "No text", // optional
    "Description text", // optional
);
```
