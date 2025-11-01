import { memo, useMemo } from 'react';
import { MonthViewProps } from './CalendarView.types';
import { CalendarCell } from './CalendarCell';
import { getCalendarGrid, isToday, isCurrentMonth, formatDate } from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const MonthView = memo<MonthViewProps>(
  ({ currentDate, events, onDateClick, onEventClick, selectedDate }) => {
    const calendarGrid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);

    const gridCells = useMemo(() => {
      return calendarGrid.map(date => {
        const dateEvents = getEventsForDate(events, date);
        const isTodayFlag = isToday(date);
        const isCurrentMonthFlag = isCurrentMonth(date, currentDate);
        const isSelected = selectedDate
          ? formatDate(date, 'yyyy-MM-dd') === formatDate(selectedDate, 'yyyy-MM-dd')
          : false;

        return {
          date,
          events: dateEvents,
          isToday: isTodayFlag,
          isCurrentMonth: isCurrentMonthFlag,
          isSelected,
        };
      });
    }, [calendarGrid, events, currentDate, selectedDate]);

    return (
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        {/* Weekday headers - Full names on desktop, single letter on mobile */}
        <div className="grid grid-cols-7 bg-neutral-50 border-b border-neutral-200">
          {WEEKDAYS.map((day, index) => (
            <div
              key={day}
              className="py-2 sm:py-3 px-1 sm:px-2 text-center text-xs sm:text-sm font-semibold text-neutral-700"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{WEEKDAYS_SHORT[index]}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {gridCells.map(({ date, events, isToday, isCurrentMonth, isSelected }) => (
            <CalendarCell
              key={date.toISOString()}
              date={date}
              events={events}
              isToday={isToday}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              onClick={onDateClick}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
    );
  }
);

MonthView.displayName = 'MonthView';
