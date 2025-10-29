# Calendar View

A calendar app I built with React and TypeScript. It has month and week views where you can add, edit, and delete events.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 to see it running.

## What It Does

I built this as an interactive calendar where you can:
- Switch between month view and week view
- Click any day to create a new event
- Click existing events to edit or delete them
- Navigate months with previous/next/today buttons
- See events displayed in different colors
- Choose categories for your events

The month view shows a standard calendar grid, and the week view breaks it down by hour so you can see your schedule for the week.

## Tech Stack

Built with React 18, TypeScript, Tailwind CSS, and Vite. I'm using date-fns for date handling since it's lightweight and works well with timezones.

Full list:
- React 18.2.0
- TypeScript 5.3.3  
- Tailwind CSS 3.4.0
- Vite 5.0.8
- date-fns 3.0.0
- Storybook 7.6.6

## Project Structure

```
src/
├── components/
│   ├── Calendar/          Main calendar components
│   └── primitives/        Reusable UI elements (buttons, modals, etc)
├── hooks/                 Custom React hooks
├── utils/                 Helper functions for dates and events
└── styles/                CSS and Tailwind config
```

The architecture is pretty straightforward - components handle the UI, hooks manage state, and utilities do the heavy lifting with dates and event data.

## Quick Example

```tsx
import { CalendarView } from './components/Calendar/CalendarView';

function App() {
  const [events, setEvents] = useState([]);

  return (
    <CalendarView 
      events={events} 
      onEventAdd={(e) => setEvents([...events, e])}
      onEventUpdate={(id, updates) => setEvents(events.map(ev => 
        ev.id === id ? {...ev, ...updates} : ev
      ))}
      onEventDelete={(id) => setEvents(events.filter(e => e.id !== id))}
    />
  );
}
```

## Features

**Month View**
- 42-cell grid showing full weeks
- Current day highlighted
- Shows up to 3 events per cell, with a "+X more" indicator
- Days from previous/next months shown in gray

**Week View**  
- Hourly slots from 00:00 to 23:00
- Events positioned by their actual time
- Click any time slot to create an event
- Today's column highlighted

**Event Management**
- Modal form for creating and editing
- Title, description, start/end times
- 8 color options to choose from
- 6 categories (Meeting, Personal, Work, etc)
- Validation to make sure dates make sense

**Accessibility**
- Keyboard navigation works throughout
- Screen reader friendly with ARIA labels
- Good color contrast
- Focus indicators visible

## Development Challenges

A few things that were tricky to figure out:

**Calendar Grid Layout** - Getting the 42-cell grid to work right took some thinking. Had to calculate which days from the previous and next months to show so the weeks line up properly.

**Week View Positioning** - Calculating where to place events on the hourly grid was interesting, especially when events overlap or span multiple hours.

**Date Handling** - Making sure everything works with timezones and doesn't have weird edge cases. Using date-fns helped a lot here.

**Performance** - With lots of events, rendering was getting slow. Added React.memo to the calendar cells and memoized some calculations which helped.

**Keyboard Navigation** - Wanted to make sure you could navigate the whole calendar with just the keyboard. Took some work to get the focus management right.

## What I'd Add Next

Some features I think would be cool to add:
- Drag and drop to move events around
- Recurring events (daily, weekly, monthly)
- Multiple calendars you can toggle on/off
- Filter by category
- Dark mode
- LocalStorage to persist events
- Export to iCal or Google Calendar
- Mobile swipe gestures
- Different view options (day view, agenda view)

## Storybook

Run `npm run storybook` to see the component documentation with interactive examples. I've set up stories for different states like empty calendar, busy schedule, edge cases, etc.

## Building

```bash
npm run build      # Creates production build
npm run preview    # Preview the production build
npm run lint       # Check for issues
```

## Notes

This was built as part of a hiring assignment. The goal was to create a production-ready calendar component with clean code, good UX, and proper accessibility.

I focused on making it feel smooth and responsive while keeping the code maintainable. No massive dependencies - just a few well-chosen libraries and custom components for everything else.
