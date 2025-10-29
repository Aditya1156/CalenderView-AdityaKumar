import { useState, useCallback } from 'react';
import { CalendarView, CalendarState, CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { getNextMonth, getPreviousMonth } from '@/utils/date.utils';

interface UseCalendarReturn extends CalendarState {
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  goToToday: () => void;
  setView: (view: CalendarView) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  openCreateModal: (date: Date) => void;
  openEditModal: (event: CalendarEvent) => void;
  closeModal: () => void;
}

export const useCalendar = (
  initialDate: Date = new Date(),
  initialView: CalendarView = 'month'
): UseCalendarReturn => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView,
    selectedDate: null,
    selectedEvent: null,
    isModalOpen: false,
    modalMode: null,
  });

  const goToNextMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: getNextMonth(prev.currentDate),
    }));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: getPreviousMonth(prev.currentDate),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(),
    }));
  }, []);

  const setView = useCallback((view: CalendarView) => {
    setState(prev => ({
      ...prev,
      view,
    }));
  }, []);

  const setSelectedDate = useCallback((date: Date | null) => {
    setState(prev => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  const setSelectedEvent = useCallback((event: CalendarEvent | null) => {
    setState(prev => ({
      ...prev,
      selectedEvent: event,
    }));
  }, []);

  const openCreateModal = useCallback((date: Date) => {
    setState(prev => ({
      ...prev,
      selectedDate: date,
      selectedEvent: null,
      isModalOpen: true,
      modalMode: 'create',
    }));
  }, []);

  const openEditModal = useCallback((event: CalendarEvent) => {
    setState(prev => ({
      ...prev,
      selectedEvent: event,
      isModalOpen: true,
      modalMode: 'edit',
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isModalOpen: false,
      modalMode: null,
    }));
  }, []);

  return {
    ...state,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    setView,
    setSelectedDate,
    setSelectedEvent,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
