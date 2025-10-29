# Calendar View Component

An interactive calendar built with React, TypeScript, and Tailwind CSS. Supports both month and week views with full event management capabilities.

## Live Demo

**Storybook**: [Add your deployed Storybook link here]

## Features

- Month View with 42-cell grid layout
- Week View showing hourly time slots
- Create, edit, and delete events
- Responsive design works on mobile, tablet, and desktop
- Keyboard navigation support
- Built with TypeScript for type safety
- Optimized rendering with React hooks
- No external UI libraries - custom components only

## 📦 Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd calendar-view-component

# Install dependencies
npm install

# Run development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx          # Main component
│   │   ├── CalendarView.types.ts     # Type definitions
│   │   ├── CalendarView.stories.tsx  # Storybook stories
│   │   ├── MonthView.tsx             # Month grid view
│   │   ├── WeekView.tsx              # Week time-slot view
│   │   ├── CalendarCell.tsx          # Individual day cell
│   │   └── EventModal.tsx            # Event create/edit modal
│   └── primitives/
│       ├── Button.tsx                # Reusable button
│       ├── Modal.tsx                 # Base modal component
│       ├── Input.tsx                 # Form input
│       ├── Textarea.tsx              # Form textarea
│       └── Select.tsx                # Form select dropdown
├── hooks/
│   ├── useCalendar.ts                # Calendar state management
│   └── useEventManager.ts            # Event CRUD operations
├── utils/
│   ├── date.utils.ts                 # Date manipulation helpers
│   └── event.utils.ts                # Event filtering & validation
└── styles/
    └── globals.css                   # Global styles & Tailwind
```

### Design Approach

The calendar is split into small, reusable components. Business logic lives in custom hooks while utility functions handle date calculations. I focused on making it accessible with proper ARIA labels and keyboard support. Performance is handled through React's memoization hooks where needed.

## Storybook Documentation

I've created several stories to showcase different states:

1. Default - Shows current month with some sample events
2. Empty State - Clean calendar with no events
3. Week View - Demonstrates the week layout
4. Large Dataset - Tests performance with 20+ events
5. Interactive Playground - Play around with all features

## Technologies Used

- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- Vite 5.0.8 (for building)
- Storybook 7.6.6 (for documentation)
- date-fns 3.0.0 (date handling)
- clsx 2.1.0 (class management)
- zustand 4.4.7 (state management)

## Usage Example

```tsx
import { CalendarView } from '@/components/Calendar/CalendarView';
import { useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  const handleEventAdd = (event) => {
    setEvents([...events, { ...event, id: generateId() }]);
  };

  const handleEventUpdate = (id, updates) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const handleEventDelete = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <CalendarView
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="month"
    />
  );
}
```

### Event Data Structure

```tsx
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Navigate between interactive elements |
| `Arrow Keys` | Navigate calendar grid cells |
| `Enter` / `Space` | Activate focused element |
| `Escape` | Close modal or cancel action |
| `Home` / `End` | Jump to first/last item |

## Accessibility

The calendar includes proper ARIA labels for screen readers, full keyboard navigation, and maintains logical focus order. Color contrast meets WCAG AA standards. Focus indicators are visible for keyboard users.

## Performance Notes

The bundle stays under 200KB gzipped. Initial render is fast thanks to React.memo on the calendar cells and memoized date calculations. Used useCallback and useMemo where it made sense to avoid unnecessary re-renders.

## Building

```bash
npm run lint        # Check for errors
npm run build       # Production build
npm run preview     # Preview the build
```

## Development Notes

Some interesting challenges I ran into:

- Generating the 42-cell grid that includes days from adjacent months took some thought
- Positioning events in the week view, especially overlapping ones, required careful calculation
- Making sure date handling works correctly with timezones using date-fns
- Implementing keyboard navigation through the calendar grid while keeping it accessible
- Keeping performance smooth when displaying lots of events

Things I'd like to add later:
- Drag and drop to reschedule events
- Recurring events support  
- Multiple calendar views
- Filter events by category
- Dark mode
- Save events to localStorage
- Export calendar to iCal format

## License

Created for a hiring assignment.

## Contact

Your Name  
your.email@example.com  
GitHub: @yourusername
