export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
}

export type CalendarView = 'month' | 'week';

export interface CalendarViewProps {
  events: CalendarEvent[];
  onEventAdd: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
  initialView?: CalendarView;
  initialDate?: Date;
}

export interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  selectedDate: Date | null;
  selectedEvent: CalendarEvent | null;
  isModalOpen: boolean;
  modalMode: 'create' | 'edit' | null;
}

export interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  selectedDate: Date | null;
}

export interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  isSelected: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface EventModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  event?: CalendarEvent;
  initialDate?: Date;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => void;
  onDelete?: (id: string) => void;
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  color: string;
  category: string;
}

export type FormErrors = Partial<Record<keyof EventFormData, string>>;

export interface TimeSlot {
  time: Date;
  events: CalendarEvent[];
}

export const EVENT_COLORS = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ef4444', label: 'Red' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#84cc16', label: 'Lime' },
] as const;

export const EVENT_CATEGORIES = [
  'Meeting',
  'Work',
  'Personal',
  'Design',
  'Development',
  'Other',
] as const;

export type EventColor = typeof EVENT_COLORS[number]['value'];
export type EventCategory = typeof EVENT_CATEGORIES[number];
