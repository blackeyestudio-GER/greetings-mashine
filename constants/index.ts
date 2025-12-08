/**
 * Shared constants used across the application
 */

// Day keys type for type safety
export type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Unified weekday map with both full and short labels
export const WEEKDAYS = [
  { key: 'monday' as const, labelFull: 'Monday', labelShort: 'Mo' },
  { key: 'tuesday' as const, labelFull: 'Tuesday', labelShort: 'Tu' },
  { key: 'wednesday' as const, labelFull: 'Wednesday', labelShort: 'We' },
  { key: 'thursday' as const, labelFull: 'Thursday', labelShort: 'Th' },
  { key: 'friday' as const, labelFull: 'Friday', labelShort: 'Fr' },
  { key: 'saturday' as const, labelFull: 'Saturday', labelShort: 'Sa' },
  { key: 'sunday' as const, labelFull: 'Sunday', labelShort: 'Su' }
] as const;

// Day index array (Sunday = 0, Monday = 1, etc.) - matches JavaScript Date.getDay()
export const DAY_INDEX_MAP = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

// Default days state (all days enabled)
export const DEFAULT_DAYS = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true
} as const;

