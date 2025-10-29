// Main Calendar Component
export { CalendarView } from './CalendarView';

// Calendar Sub-components (not typically exported, but available if needed)
export { MonthView } from './MonthView';
export { WeekView } from './WeekView';
export { CalendarCell } from './CalendarCell';
export { EventModal } from './EventModal';

// Types
export type {
  CalendarEvent,
  CalendarView as CalendarViewType,
  CalendarViewProps,
  CalendarState,
  MonthViewProps,
  WeekViewProps,
  CalendarCellProps,
  EventModalProps,
  EventFormData,
  FormErrors,
  EventColor,
  EventCategory,
} from './CalendarView.types';

// Constants
export { EVENT_COLORS, EVENT_CATEGORIES } from './CalendarView.types';
