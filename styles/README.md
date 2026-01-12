# Design System

This directory contains the SCSS-based design system.

## Architecture

### Directory Structure
```
styles/
├── index.scss          # Main entry point with @forward declarations
├── global.scss         # Global styles and CSS custom properties
├── tokens/             # Design tokens
│   ├── colors.scss     # Color palette
│   ├── spacing.scss    # Spacing scale (4px grid)
│   ├── typography.scss # Font families, sizes, weights
│   ├── radius.scss     # Border radius values
│   ├── shadow.scss     # Box shadow values
│   ├── transition.scss # Transition timing
│   ├── effects.scss    # Special effects (glows, gradients)
│   └── layout.scss     # Layout constraints
├── utilities/          # Utility classes
│   └── utilities.scss  # Common utility patterns
├── mixins/             # SCSS mixins
│   └── mixin.scss      # Media queries, component patterns
└── theme/              # Theme overrides
    └── dark.scss       # Dark mode styles
```

## Design Tokens

### Colors
- **Primary**: `$primary` - Main brand color (#2f4a5c)
- **Accent**: `$accent` - Secondary accent (#7a927f)
- **Semantic**: `$link`, `$caption`, `$sentence` for text hierarchy
- **Common**: `$commonWhite`, `$commonGreen` for utilities

### Spacing Scale
Based on 4px grid system:
- `$space-1`: 4px, `$space-2`: 8px, `$space-3`: 12px, etc.

### Typography Scale
- Font sizes: `$font-size-xs` (12px) to `$font-size-5xl` (48px)
- Font weights: `$font-weight-light` (300) to `$font-weight-bold` (700)
- Line heights: `$line-height-tight` (1.25) to `$line-height-relaxed` (1.625)

## Usage

### Importing Tokens
```scss
@use '../../../styles/tokens/colors' as c;
@use '../../../styles/tokens/spacing' as s;

.my-component {
  color: c.$primary;
  padding: s.$space-4;
}
```

### Using Utilities
```scss
@use '../../../styles/utilities/utilities';

// In your component
<button class="btn btn-primary">Click me</button>
```

### BEM Naming Convention
- Block: `.component-name`
- Element: `.component-name__element-name`
- Modifier: `.component-name__element-name--modifier`

## Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Use CSS Modules** for component-scoped styles
3. **Follow BEM** for consistent naming
4. **Leverage utilities** for common patterns
5. **Test responsive design** across breakpoints
6. **Consider accessibility** in color choices and interactions

## Responsive Design

Uses mobile-first approach with custom breakpoints:
- `sp`: max-width 450px (mobile)
- `tab`: max-width 700px (tablet)
- `pc`: min-width 1025px (desktop)

```scss
@include m.mq(sp) {
  // Mobile styles
}
```