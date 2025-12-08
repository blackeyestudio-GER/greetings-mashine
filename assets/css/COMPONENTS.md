# Tailwind Component Classes

This file documents the custom component classes defined in `main.css` using Tailwind's `@apply` directive.

## Button Components

### Base Class
- **`.btn`** - Base button with common properties (rounded, transitions, flex layout)

### Size Variants
- **`.btn-icon`** - Small icon-only buttons (p-3)
- **`.btn-md`** - Medium buttons (px-6 py-3)
- **`.btn-lg`** - Large buttons (px-8 py-4)
- **`.btn-xl`** - Extra large buttons (px-8 py-5)

### Color Variants
- **`.btn-primary`** - Green outline (create, save, add actions)
- **`.btn-secondary`** - Blue outline (server actions)
- **`.btn-warning`** - Yellow outline (edit actions)
- **`.btn-danger`** - Red outline (delete actions)
- **`.btn-neutral`** - Gray outline (cancel, secondary actions)

### Common Combinations (Shortcuts)
- **`.btn-add`** - `btn + btn-icon + btn-primary` (Add/Plus buttons)
- **`.btn-edit`** - `btn + btn-icon + btn-warning` (Edit/Pencil buttons)
- **`.btn-delete`** - `btn + btn-icon + btn-danger` (Delete/Trash buttons)
- **`.btn-copy`** - `btn + btn-icon + btn-secondary` (Copy buttons)
- **`.btn-action-primary`** - `btn + btn-lg + btn-primary` (Primary CTAs)
- **`.btn-action-secondary`** - `btn + btn-lg + btn-secondary` (Secondary CTAs)
- **`.btn-cancel`** - `btn + btn-lg + btn-neutral` (Cancel buttons)

## Usage Examples

### Before (Cluttered)
```vue
<button class="p-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors duration-200">
  <Icon icon="heroicons:pencil-20-solid" />
</button>
```

### After (Clean)
```vue
<button class="btn-edit">
  <Icon icon="heroicons:pencil-20-solid" />
</button>
```

### Custom Combinations
```vue
<!-- Icon button with custom color -->
<button class="btn btn-icon btn-primary">
  <Icon icon="heroicons:plus-20-solid" />
</button>

<!-- Large secondary action button -->
<button class="btn-action-secondary mx-auto">
  <Icon icon="heroicons:server-20-solid" class="mr-2" />
  Add Server
</button>

<!-- Disabled button -->
<button class="btn-action-primary" disabled>
  Save Changes
</button>
```

## Benefits

✅ **Consistency** - All buttons look and behave the same way
✅ **Maintainability** - Change button styles in one place
✅ **Readability** - Clear semantic class names
✅ **Reduced Code** - ~80% less class clutter in templates
✅ **Type Safety** - Easy to spot typos (btn-prrimary → error)

## Adding New Patterns

To add new button types or other components:

1. Identify the repeating pattern
2. Add it to `main.css` using `@apply`
3. Use semantic naming (e.g., `btn-{action}`)
4. Update this documentation

### Example: Adding a "btn-outline" variant
```css
.btn-outline {
    @apply border-2 bg-transparent hover:bg-gray-800;
}
```

