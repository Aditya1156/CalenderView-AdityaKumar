import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  isToday as isTodayFn,
  addMonths,
  subMonths,
  startOfDay as startOfDayFn,
  endOfDay as endOfDayFn,
  isWithinInterval,
  startOfWeek as getStartOfWeek,
  endOfWeek as getEndOfWeek,
} from 'date-fns';

// Re-export commonly used functions
export const startOfDay = startOfDayFn;
export const endOfDay = endOfDayFn;

// Calculate how many days between two dates
export const daysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startMs = startOfDayFn(start).getTime();
  const endMs = startOfDayFn(end).getTime();
  return Math.floor((endMs - startMs) / msPerDay);
};

// Check if two dates are the same day (ignores time)
export const isSameDayUtil = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

// Check if date is today
export const isToday = (date: Date): boolean => {
  return isTodayFn(date);
};

// Get all days in a given month
export const getDaysInMonth = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days: Date[] = [];
  
  let current = start;
  while (current <= end) {
    days.push(new Date(current));
    current = addDays(current, 1);
  }
  
  return days;
};

// Get the 42-cell calendar grid for month view
// Includes days from previous and next months to fill the grid
export const getCalendarGrid = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  const grid: Date[] = [];
  let current = startDate;
  
  while (current <= endDate) {
    grid.push(new Date(current));
    current = addDays(current, 1);
  }
  
  // Make sure we always have 42 cells (6 weeks)
  while (grid.length < 42) {
    grid.push(new Date(current));
    current = addDays(current, 1);
  }
  
  return grid;
};

/**
 * Gets the week days for week view
 */
export const getWeekDays = (date: Date): Date[] => {
  const start = getStartOfWeek(date, { weekStartsOn: 0 });
  const end = getEndOfWeek(date, { weekStartsOn: 0 });
  
  const days: Date[] = [];
  let current = start;
  
  while (current <= end) {
    days.push(new Date(current));
    current = addDays(current, 1);
  }
  
  return days;
};

/**
 * Checks if a date is in the current month
 */
export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return isSameMonth(date, currentDate);
};

/**
 * Formats a date for display
 */
export const formatDate = (date: Date, formatStr: string): string => {
  return format(date, formatStr);
};

/**
 * Gets the next month
 */
export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

/**
 * Gets the previous month
 */
export const getPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

/**
 * Generates time slots for week view (24 hours in 1-hour intervals)
 */
export const generateTimeSlots = (date: Date): Date[] => {
  const slots: Date[] = [];
  const dayStart = startOfDayFn(date);
  
  for (let hour = 0; hour < 24; hour++) {
    const slot = new Date(dayStart);
    slot.setHours(hour, 0, 0, 0);
    slots.push(slot);
  }
  
  return slots;
};

/**
 * Checks if an event overlaps with a time slot
 */
export const isEventInTimeSlot = (
  eventStart: Date,
  eventEnd: Date,
  slotStart: Date,
  slotEnd: Date
): boolean => {
  return (
    (eventStart >= slotStart && eventStart < slotEnd) ||
    (eventEnd > slotStart && eventEnd <= slotEnd) ||
    (eventStart <= slotStart && eventEnd >= slotEnd)
  );
};

/**
 * Gets the position and height of an event in the week view
 */
export const getEventPosition = (
  eventStart: Date,
  eventEnd: Date
): { top: number; height: number } => {
  const hourHeight = 60; // pixels per hour
  
  const startHour = eventStart.getHours() + eventStart.getMinutes() / 60;
  const endHour = eventEnd.getHours() + eventEnd.getMinutes() / 60;
  
  const top = startHour * hourHeight;
  const height = (endHour - startHour) * hourHeight;
  
  return { top, height: Math.max(height, 30) }; // Minimum height of 30px
};

/**
 * Checks if an event occurs on a specific date
 */
export const isEventOnDate = (event: { startDate: Date; endDate: Date }, date: Date): boolean => {
  const dayStart = startOfDayFn(date);
  const dayEnd = endOfDayFn(date);
  
  return isWithinInterval(dayStart, { start: startOfDayFn(event.startDate), end: endOfDayFn(event.endDate) }) ||
         isWithinInterval(dayEnd, { start: startOfDayFn(event.startDate), end: endOfDayFn(event.endDate) }) ||
         (event.startDate <= dayStart && event.endDate >= dayEnd);
};

/**
 * Gets events for a specific date
 */
export const getEventsForDate = <T extends { startDate: Date; endDate: Date }>(
  events: T[],
  date: Date
): T[] => {
  return events.filter(event => isEventOnDate(event, date));
};

/**
 * Creates a date with a specific time
 */
export const setTimeOnDate = (date: Date, hours: number, minutes: number = 0): Date => {
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};

/**
 * Validates that end date is after start date
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return endDate > startDate;
};
