# RVC

User interface components and styles for Vue 3

![npm version](https://img.shields.io/npm/v/@rzuppur/rvc)
![Licence](https://img.shields.io/npm/l/@rzuppur/rvc)
![Netlify demo build](https://img.shields.io/netlify/0f67bc1f-5af9-4c5a-ad7d-25c4e7ecdc00?label=demo%20build)

[View demo & docs](https://rvc-demo.netlify.com/)

<br>

### Install
`yarn add @rzuppur/rvc` or `npm install --save @rzuppur/rvc`

```typescript
import { createApp } from "vue";
import rvc from "@rzuppur/rvc";
import App from "./App.vue";

const testApp = createApp(App);
testApp.use(rvc);

testApp.mount("#app");
```
### Buttons
Every property listed is optional. If button contains no childs but has an icon, it will be shown as an icon button (width equal to height).
```html
  <r-button
    primary: boolean
    gray: boolean 
    borderless: boolean
    small: boolean
    fullwidth: boolean
    disabled: boolean
    loading: boolean  // Shows a loading spinner and disables the button
    submit: boolean  // default type="button", this sets it to "submit" (for forms)
    action: function  // @click handler
    actionWithModifier: function  // @click.ctrl.exact handler
    label: string  // aria-label, for icon only buttons
    icon: string  // One of valid r-icon icons
    icon-right: boolean  // default false
    icon-color: string  // ("gray" | "green" | "red" | "blue" | "gold" | "white")
  >
    {{ text }}
  </r-button>
```

Grouped buttons
```html
<div class="r-buttons-grouped">
  <div class="r-button-group">
    {{ r-buttons }}
  </div>
  <div class="r-button-group">
    {{ r-buttons }}
  </div>
</div>
```
### Containers
Containers for assigning a maximum width to content and adding a padding to sides.
- `r-container-xs`
- `r-container-sm`
- `r-container-md`
- `r-container-lg`
- `r-container-xl`
- `r-container-fill`
### Forms
Bind value with v-model. Same props (except _type_) apply for `r-text-input` and `r-text-area`

```html
<div class="r-form-group">
  <r-text-input
    label: string
    placeholder: string
    help: string
    error: string // setting this will mark the field as invalid
    type: string // default "text"
    fullwidth: boolean  // default true
  >
  </r-text-input>
</div>
```
### Icons
Material or modified material icons as 24x24px svg.
```html
<r-icon
  icon: string
  class?: "gray" | "green" | "red" | "blue" | "white"
/>
```
### Modal
Exposed methods: `open` and `close`

Emits: `close`

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
### Theming
You can customize colors, spacing and fonts using CSS variables.
Some variables and their default values are shown here, see source code for others.

**Typography**
```css
:root {
    --t-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --t-size-base: 16px;
}
```

**Colors**
```css
:root {
    --c-background: #f4f4f4;
    --c-background-raised: #ffffff;
    --c-text: #212121;
    --c-text-muted: #616161;
}
html.darkMode {
    --c-background: #171717;
    --c-background-raised: #212121;
    --c-text: #bdbdbd;
    --c-text-muted: #9e9e9e;
}
```
**Sizes**
```css
:root {
    --s-xxs: 2px;
    --s-xs: 4px;
    --s-sm: 8px;
    --s-md: 16px;
    --s-lg: 32px;
    --s-xl: 64px;
    --s-xxl: 128px;
}
```

**Containers**
```css
:root {
    --container-xs: 380px;
    --container-sm: 540px;
    --container-md: 720px;
    --container-lg: 960px;
    --container-xl: 1140px;
    --container-xxl: 1320px;
}
```
NB! Media query utility classes (`r-media-hide-under-{size}`, `r-media-hide-over-{size}`) use these static values since CSS variables can not be used for a media query.### Toast notification
```typescript
import { useToast } from "@rzuppur/rvc";

const toast = useToast();
toast("message");
```
### Tooltip
A basic tooltip directive `v-r-tip`. Supports top (default), bottom, left and right alignment: `v-r-tip.bottom`, `v-r-tip.left`, `v-r-tip.right`.
```html
<div
  v-r-tip="'Tooltip text'"
></div>
```
### Typography
Font size, letter spacing, line height

- `r-text-{size}`
- `r-text-size-{size}`
- `r-text-letter-spacing-{size}`
- `r-text-line-height-{size}`

Weight

- `r-text-light`
- `r-text-regular`
- `r-text-medium`
- `r-text-bold`

Color
- `r-text-color-regular`
- `r-text-color-muted`
- `r-text-color-red`

Alignment 
- `r-text-left`
- `r-text-center`
- `r-text-right`

Overflow
- `r-ellipsis`

Spacing
- All adjacent `p`, `ul`, `ol`, `pre`, `.r-space` have a margin added between them.
### Utilities
Add background color
- `r-background`

Add raised background color (cards, for example)
- `r-background-raised`

Border radius, margin, padding `r-{type}-{size}`
- Type:
  - Border radius: `border-radius`
  - Margin: `m`
  - Padding: `p`
- Size: `xxs` to `xxl`

Margin and padding can also be used with direction `r-{type}-{direction}-{size}`
- Direction: `t` `b` `l` `r` (top, bottom, left, right)

Hide under viewport size (`xs` to `xxl`)
- `r-media-hide-under-{size}`

Hide over viewport size (`xs` to `xxl`)
- `r-media-hide-over-{size}`

Apply display flex, direction row
- `r-flex-container`

Apply flex direction column
- `r-flex-container-column`

Align flex childs
- `r-flex-items-{"start" | "center" | "end"}`

Flex child grow and shrink value
- `r-flex-{0-3}`

Clearfix
- `r-clearfix`
