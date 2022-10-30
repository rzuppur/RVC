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
    icon-color: string  // ("gray" | "green" | "red" | "blue" | "yellow")
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
