import { useState, useCallback } from 'react';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { generateEventId } from '@/utils/event.utils';

interface UseEventManagerProps {
  initialEvents?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
}

interface UseEventManagerReturn {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => CalendarEvent | undefined;
}

export const useEventManager = ({
  initialEvents = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
}: UseEventManagerProps = {}): UseEventManagerReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = useCallback(
    (event: Omit<CalendarEvent, 'id'>) => {
      const newEvent: CalendarEvent = {
        ...event,
        id: generateEventId(),
      };

      setEvents(prev => [...prev, newEvent]);
      onEventAdd?.(newEvent);
    },
    [onEventAdd]
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<CalendarEvent>) => {
      setEvents(prev =>
        prev.map(event =>
          event.id === id ? { ...event, ...updates } : event
        )
      );
      onEventUpdate?.(id, updates);
    },
    [onEventUpdate]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      setEvents(prev => prev.filter(event => event.id !== id));
      onEventDelete?.(id);
    },
    [onEventDelete]
  );

  const getEventById = useCallback(
    (id: string): CalendarEvent | undefined => {
      return events.find(event => event.id === id);
    },
    [events]
  );

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  };
};
