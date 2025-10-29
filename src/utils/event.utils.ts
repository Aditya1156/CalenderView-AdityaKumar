import { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { isEventOnDate, isEventInTimeSlot, startOfDay, endOfDay } from '@/utils/date.utils';

// Generate a unique ID for new events
export const generateEventId = (): string => {
  return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Sort events by start date (earliest first)
export const sortEventsByStartDate = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

/**
 * Filters events by date
 */
export const filterEventsByDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => isEventOnDate(event, date));
};

/**
 * Alias for filterEventsByDate for convenience
 */
export const getEventsForDate = filterEventsByDate;

/**
 * Filters events by date range
 */
export const filterEventsByDateRange = (
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date
): CalendarEvent[] => {
  const rangeStart = startOfDay(startDate);
  const rangeEnd = endOfDay(endDate);
  
  return events.filter(event => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = endOfDay(event.endDate);
    
    return (
      (eventStart >= rangeStart && eventStart <= rangeEnd) ||
      (eventEnd >= rangeStart && eventEnd <= rangeEnd) ||
      (eventStart <= rangeStart && eventEnd >= rangeEnd)
    );
  });
};

/**
 * Gets overlapping events in a time slot
 */
export const getOverlappingEvents = (
  events: CalendarEvent[],
  slotStart: Date,
  slotEnd: Date
): CalendarEvent[] => {
  return events.filter(event =>
    isEventInTimeSlot(event.startDate, event.endDate, slotStart, slotEnd)
  );
};

/**
 * Calculates event duration in minutes
 */
export const getEventDuration = (event: CalendarEvent): number => {
  return Math.floor((event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60));
};

/**
 * Formats event duration for display
 */
export const formatEventDuration = (event: CalendarEvent): string => {
  const minutes = getEventDuration(event);
  
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

// Check if event data is valid before saving
export const validateEvent = (event: Partial<CalendarEvent>): string[] => {
  const errors: string[] = [];
  
  if (!event.title || event.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (event.title && event.title.length > 100) {
    errors.push('Title must be 100 characters or less');
  }
  
  if (event.description && event.description.length > 500) {
    errors.push('Description must be 500 characters or less');
  }
  
  if (!event.startDate) {
    errors.push('Start date is required');
  }
  
  if (!event.endDate) {
    errors.push('End date is required');
  }
  
  if (event.startDate && event.endDate && event.endDate <= event.startDate) {
    errors.push('End date must be after start date');
  }
  
  return errors;
};

/**
 * Creates a default event object
 */
export const createDefaultEvent = (date: Date): Omit<CalendarEvent, 'id'> => {
  const startDate = new Date(date);
  startDate.setHours(9, 0, 0, 0);
  
  const endDate = new Date(date);
  endDate.setHours(10, 0, 0, 0);
  
  return {
    title: '',
    description: '',
    startDate,
    endDate,
    color: '#3b82f6',
    category: 'Other',
  };
};

/**
 * Groups events by date
 */
export const groupEventsByDate = (events: CalendarEvent[]): Map<string, CalendarEvent[]> => {
  const grouped = new Map<string, CalendarEvent[]>();
  
  events.forEach(event => {
    const dateKey = startOfDay(event.startDate).toISOString();
    const existing = grouped.get(dateKey) || [];
    grouped.set(dateKey, [...existing, event]);
  });
  
  return grouped;
};

/**
 * Checks if an event is multi-day
 */
export const isMultiDayEvent = (event: CalendarEvent): boolean => {
  const start = startOfDay(event.startDate);
  const end = startOfDay(event.endDate);
  return end.getTime() > start.getTime();
};
