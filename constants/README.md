# Constants

This folder contains shared constants used across the application to avoid code duplication.

## Available Constants

### Weekday Constants

- **`WEEKDAYS`** - Unified weekday map with both full and short labels
  - Each day has: `key`, `labelFull`, `labelShort`
  - Use `labelFull` in: Forms, user-facing labels (Monday, Tuesday, etc.)
  - Use `labelShort` in: Compact lists, badges (Mo, Tu, etc.)

- **`DAY_INDEX_MAP`** - JavaScript Date.getDay() index to day name mapping
  - Use in: Date calculations, getting today's day name
  - Index 0 = Sunday, 1 = Monday, etc.

- **`DEFAULT_DAYS`** - Object with all days set to `true`
  - Use in: Initializing new greetings

### Type Exports

- **`DayKey`** - TypeScript type for valid day keys
  - Values: `'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'`

## Usage Example

```typescript
import { WEEKDAYS, DAY_INDEX_MAP, DEFAULT_DAYS } from '~/constants';

// Get today's day name
const today = DAY_INDEX_MAP[new Date().getDay()]; // 'monday', 'tuesday', etc.

// Initialize greeting with all days enabled
const newGreeting = {
  text: '',
  days: { ...DEFAULT_DAYS },
  serverIds: ['all']
};

// Loop through weekdays - use full labels in forms
WEEKDAYS.forEach(day => {
  console.log(day.key, day.labelFull); // 'monday' 'Monday'
});

// Loop through weekdays - use short labels in compact lists
WEEKDAYS.forEach(day => {
  console.log(day.key, day.labelShort); // 'monday' 'Mo'
});
```

## Benefits

✅ **Single Source of Truth** - Update weekdays in one place  
✅ **Type Safety** - TypeScript autocomplete and validation  
✅ **No Duplication** - Reuse across all components  
✅ **Easy Maintenance** - Change once, apply everywhere

