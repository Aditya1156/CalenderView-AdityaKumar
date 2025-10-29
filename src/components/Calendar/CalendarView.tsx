import React, { useCallback, useMemo } from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.types';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { Button } from '../primitives/Button';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager } from '@/hooks/useEventManager';
import { formatDate } from '@/utils/date.utils';

export const CalendarView: React.FC<CalendarViewProps> = ({
  events: externalEvents,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate = new Date(),
}) => {
  const calendar = useCalendar(initialDate, initialView);
  const eventManager = useEventManager({
    initialEvents: externalEvents,
    onEventAdd,
    onEventUpdate,
    onEventDelete,
  });

  const handleDateClick = useCallback(
    (date: Date) => {
      calendar.openCreateModal(date);
    },
    [calendar]
  );

  const handleEventClick = useCallback(
    (event: CalendarEvent) => {
      calendar.openEditModal(event);
    },
    [calendar]
  );

  const handleEventSave = useCallback(
    (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
      if ('id' in eventData) {
        const { id, ...updates } = eventData;
        eventManager.updateEvent(id, updates);
      } else {
        eventManager.addEvent(eventData);
      }
    },
    [eventManager]
  );

  const monthYearDisplay = useMemo(
    () => formatDate(calendar.currentDate, 'MMMM yyyy'),
    [calendar.currentDate]
  );

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-card p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={calendar.goToPreviousMonth}
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={calendar.goToNextMonth}
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>

            <h2 className="text-xl font-semibold text-neutral-900 ml-2">
              {monthYearDisplay}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={calendar.goToToday}>
              Today
            </Button>
            
            <div className="flex bg-neutral-100 rounded-lg p-1">
              <Button
                variant={calendar.view === 'month' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => calendar.setView('month')}
              >
                Month
              </Button>
              <Button
                variant={calendar.view === 'week' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => calendar.setView('week')}
              >
                Week
              </Button>
            </div>
          </div>
        </div>
      </div>

      {calendar.view === 'month' ? (
        <MonthView
          currentDate={calendar.currentDate}
          events={eventManager.events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          selectedDate={calendar.selectedDate}
        />
      ) : (
        <WeekView
          currentDate={calendar.currentDate}
          events={eventManager.events}
          onTimeSlotClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      )}

      {calendar.modalMode && (
        <EventModal
          isOpen={calendar.isModalOpen}
          mode={calendar.modalMode}
          event={calendar.selectedEvent || undefined}
          initialDate={calendar.selectedDate || undefined}
          onClose={calendar.closeModal}
          onSave={handleEventSave}
          onDelete={eventManager.deleteEvent}
        />
      )}
    </div>
  );
};
