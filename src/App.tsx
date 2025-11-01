import { useState } from 'react';
import { CalendarView } from './components/Calendar/CalendarView';
import { CalendarEvent } from './components/Calendar/CalendarView.types';

// Some sample events to get started
const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(2025, 9, 29, 9, 0),
    endDate: new Date(2025, 9, 29, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    description: 'Review new component designs',
    startDate: new Date(2025, 9, 29, 14, 0),
    endDate: new Date(2025, 9, 29, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt-3',
    title: 'Client Presentation',
    startDate: new Date(2025, 9, 30, 10, 0),
    endDate: new Date(2025, 9, 30, 11, 30),
    color: '#f59e0b',
    category: 'Meeting',
  },
];

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    setEvents([...events, newEvent]);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents(events.map(e => (e.id === id ? { ...e, ...updates } : e)));
  };

  const handleEventDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Calendar View
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1 sm:mt-2">
            Interactive calendar with event management
          </p>
        </div>
        <CalendarView
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      </div>
    </div>
  );
}

export default App;
