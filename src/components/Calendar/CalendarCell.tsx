import React, { memo, useCallback } from 'react';
import clsx from 'clsx';
import { CalendarCellProps } from './CalendarView.types';
import { formatDate } from '@/utils/date.utils';

export const CalendarCell = memo<CalendarCellProps>(
  ({ date, events, isToday, isCurrentMonth, isSelected, onClick, onEventClick }) => {
    const dayNumber = formatDate(date, 'd');

    const handleClick = useCallback(() => {
      onClick(date);
    }, [date, onClick]);

    const handleEventClick = useCallback(
      (e: React.MouseEvent, eventId: string) => {
        e.stopPropagation();
        const event = events.find(evt => evt.id === eventId);
        if (event) {
          onEventClick(event);
        }
      },
      [events, onEventClick]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(date);
        }
      },
      [date, onClick]
    );

    const visibleEvents = events.slice(0, 3);
    const remainingCount = Math.max(0, events.length - 3);

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`${formatDate(date, 'MMMM d, yyyy')}. ${events.length} ${
          events.length === 1 ? 'event' : 'events'
        }.`}
        aria-pressed={isSelected}
        className={clsx(
          'border border-neutral-200 min-h-[120px] md:h-32 p-2',
          'hover:bg-neutral-50 transition-colors cursor-pointer',
          'focus-ring',
          {
            'bg-primary-50 border-primary-300': isSelected,
            'bg-white': !isSelected && isCurrentMonth,
            'bg-neutral-50': !isSelected && !isCurrentMonth,
          }
        )}
      >
        <div className="flex justify-between items-start mb-1">
          {isToday ? (
            <span className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full text-white text-sm flex items-center justify-center font-bold shadow-md">
              {dayNumber}
            </span>
          ) : (
            <span
              className={clsx('text-sm font-semibold', {
                'text-neutral-900': isCurrentMonth,
                'text-neutral-400': !isCurrentMonth,
              })}
            >
              {dayNumber}
            </span>
          )}
        </div>

        <div className="space-y-1 overflow-hidden">
          {visibleEvents.map(event => (
            <button
              key={event.id}
              onClick={(e) => handleEventClick(e, event.id)}
              className="w-full text-left text-xs px-2 py-1 rounded-md truncate hover:brightness-110 hover:scale-[1.02] transition-all focus-ring shadow-sm font-medium border border-white/20"
              style={{ 
                backgroundColor: event.color || '#3b82f6', 
                color: '#ffffff',
                textShadow: '0 1px 1px rgba(0,0,0,0.2)'
              }}
              title={event.title}
            >
              {event.title}
            </button>
          ))}
          {remainingCount > 0 && (
            <button
              onClick={handleClick}
              className="text-xs text-primary-600 hover:text-primary-700 hover:underline focus-ring font-semibold"
            >
              +{remainingCount} more
            </button>
          )}
        </div>
      </div>
    );
  }
);

CalendarCell.displayName = 'CalendarCell';
