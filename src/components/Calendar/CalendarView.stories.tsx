import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import { CalendarEvent } from './CalendarView.types';

const generateManyEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];
  const categories = ['Meeting', 'Work', 'Personal', 'Design', 'Development'];
  
  for (let i = 1; i <= 25; i++) {
    events.push({
      id: `evt-${i}`,
      title: `Event ${i}`,
      description: `Description for event ${i}`,
      startDate: new Date(2025, 9, i, 9 + (i % 8), 0),
      endDate: new Date(2025, 9, i, 10 + (i % 8), 30),
      color: colors[i % colors.length],
      category: categories[i % categories.length],
    });
  }
  return events;
};

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
  {
    id: 'evt-4',
    title: 'Development Sprint',
    description: 'Sprint planning and task assignment',
    startDate: new Date(2025, 9, 31, 9, 0),
    endDate: new Date(2025, 9, 31, 17, 0),
    color: '#8b5cf6',
    category: 'Work',
  },
];

const meta = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A fully functional calendar component with month and week views, event management, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
  },
};

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    initialView: 'week',
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
  },
};

export const WithManyEvents: Story = {
  args: {
    events: generateManyEvents(),
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
  },
};

export const InteractivePlayground: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: (event) => console.log('Event added:', event),
    onEventUpdate: (id, updates) => console.log('Event updated:', id, updates),
    onEventDelete: (id) => console.log('Event deleted:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive calendar. Try creating, editing, and deleting events!',
      },
    },
  },
};
