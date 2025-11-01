import { memo, useMemo } from 'react';
import clsx from 'clsx';
import { WeekViewProps } from './CalendarView.types';
import { getWeekDays, formatDate, getEventPosition } from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const WeekView = memo<WeekViewProps>(
  ({ currentDate, events, onTimeSlotClick, onEventClick }) => {
    const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

    const handleTimeSlotClick = (date: Date, hour: number) => {
      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);
      onTimeSlotClick(slotDate);
    };

    return (
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header with dates */}
            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b-2 border-neutral-200 bg-gradient-to-b from-neutral-50 to-white sticky top-0 z-20">
              <div className="p-3" />
              {weekDays.map(date => {
                const isToday = new Date().toDateString() === date.toDateString();
                return (
                  <div
                    key={date.toISOString()}
                    className={clsx(
                      'p-3 text-center border-l border-neutral-200 transition-colors',
                      isToday && 'bg-primary-50'
                    )}
                  >
                    <div className={clsx(
                      'text-sm font-semibold',
                      isToday ? 'text-primary-600' : 'text-neutral-700'
                    )}>
                      {formatDate(date, 'EEE')}
                    </div>
                    <div className={clsx(
                      'text-xs mt-0.5',
                      isToday ? 'text-primary-500 font-medium' : 'text-neutral-500'
                    )}>
                      {formatDate(date, 'MMM d')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time grid */}
            <div className="relative bg-white">
              {HOURS.map(hour => (
                <div
                  key={hour}
                  className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors"
                  style={{ height: '60px' }}
                >
                  <div className="p-2 text-xs text-neutral-500 text-right pr-3 font-medium bg-neutral-50/50">
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  {weekDays.map(date => {
                    const dayEvents = getEventsForDate(events, date).filter(
                      event =>
                        event.startDate.getHours() === hour ||
                        (event.startDate.getHours() < hour && event.endDate.getHours() > hour)
                    );

                    return (
                      <div
                        key={`${date.toISOString()}-${hour}`}
                        className="border-l border-neutral-100 hover:bg-blue-50/30 cursor-pointer relative transition-colors group"
                        onClick={() => handleTimeSlotClick(date, hour)}
                      >
                        {dayEvents.length > 0 && hour === dayEvents[0].startDate.getHours() && (
                          <div className="relative z-10">
                            {dayEvents.map(event => {
                              const { top, height } = getEventPosition(
                                event.startDate,
                                event.endDate
                              );
                              const offsetTop = top % 60;

                              return (
                                <button
                                  key={event.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEventClick(event);
                                  }}
                                  className={clsx(
                                    'absolute left-1 right-1 rounded-md px-2 py-1.5',
                                    'text-xs font-semibold',
                                    'hover:brightness-110 hover:scale-[1.02] transition-all',
                                    'focus-ring overflow-hidden shadow-md border border-white/20'
                                  )}
                                  style={{
                                    backgroundColor: event.color || '#3b82f6',
                                    color: '#ffffff',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                    top: `${offsetTop}px`,
                                    height: `${Math.min(height, 180)}px`,
                                  }}
                                  title={`${event.title}\n${formatDate(
                                    event.startDate,
                                    'HH:mm'
                                  )} - ${formatDate(event.endDate, 'HH:mm')}`}
                                >
                                  <div className="truncate font-bold">{event.title}</div>
                                  <div className="text-[10px] font-medium mt-0.5" style={{ opacity: 0.95 }}>
                                    {formatDate(event.startDate, 'HH:mm')} - {formatDate(event.endDate, 'HH:mm')}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

WeekView.displayName = 'WeekView';
