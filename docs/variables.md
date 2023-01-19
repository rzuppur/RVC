You can customize colors, spacing and fonts using CSS variables.

Media query utility classes (`r-media-hide-under-{size}`, `r-media-hide-over-{size}`) use these static values since CSS variables can not be used for a media query.
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
