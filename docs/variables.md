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
NB! Media query utility classes (`r-media-hide-under-{size}`, `r-media-hide-over-{size}`) use these static values since CSS variables can not be used for a media query.
