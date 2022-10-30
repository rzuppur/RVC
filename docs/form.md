Bind value with v-model. Same props (except _type_ and _small_) apply for `r-text-input` and `r-text-area`.

```html
<div class="r-form-group">
  <r-text-input
    v-model
    label?: string
    placeholder?: string
    help?: string
    error?: string // setting this will mark the field as invalid
    type?: string // default "text"
    fullwidth?: boolean // default true
    small?: boolean // default false
  >
  </r-text-input>
</div>
```
