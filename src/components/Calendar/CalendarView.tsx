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
    <div className="w-full max-w-full overflow-hidden">
      <div className="bg-white rounded-lg shadow-card p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex flex-col gap-3">
          {/* Navigation and Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={calendar.goToPreviousMonth}
                aria-label="Previous month"
                className="p-1.5 sm:p-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={calendar.goToNextMonth}
                aria-label="Next month"
                className="p-1.5 sm:p-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>

              <h2 className="text-base sm:text-xl font-semibold text-neutral-900 ml-1 sm:ml-2">
                {monthYearDisplay}
              </h2>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={calendar.goToToday}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              Today
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex bg-neutral-100 rounded-lg p-1 w-full sm:w-auto">
            <Button
              variant={calendar.view === 'month' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => calendar.setView('month')}
              className="flex-1 sm:flex-none text-xs sm:text-sm"
            >
              Month
            </Button>
            <Button
              variant={calendar.view === 'week' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => calendar.setView('week')}
              className="flex-1 sm:flex-none text-xs sm:text-sm"
            >
              Week
            </Button>
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
