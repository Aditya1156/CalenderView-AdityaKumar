import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from '../primitives/Modal';
import { Input } from '../primitives/Input';
import { Textarea } from '../primitives/Textarea';
import { Select } from '../primitives/Select';
import { Button } from '../primitives/Button';
import { EventModalProps, EVENT_COLORS, EVENT_CATEGORIES, FormErrors } from './CalendarView.types';
import { validateEvent, createDefaultEvent } from '@/utils/event.utils';
import { formatDate } from '@/utils/date.utils';

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  mode,
  event,
  initialDate,
  onClose,
  onSave,
  onDelete,
}) => {
  const defaultEvent = initialDate ? createDefaultEvent(initialDate) : createDefaultEvent(new Date());
  
  const [formData, setFormData] = useState(() => event || defaultEvent);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && event) {
        setFormData(event);
      } else if (mode === 'create') {
        setFormData(initialDate ? createDefaultEvent(initialDate) : createDefaultEvent(new Date()));
      }
      setErrors({});
    }
  }, [isOpen, mode, event, initialDate]);

  const handleChange = useCallback((field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      
      const validationErrors = validateEvent(formData);
      if (validationErrors.length > 0) {
        const errorObj: FormErrors = {};
        validationErrors.forEach(err => {
          if (err.includes('Title')) errorObj.title = err;
          if (err.includes('Description')) errorObj.description = err;
          if (err.includes('Start')) errorObj.startDate = err;
          if (err.includes('End')) errorObj.endDate = err;
        });
        setErrors(errorObj);
        return;
      }

      onSave(formData);
      onClose();
    },
    [formData, onSave, onClose]
  );

  const handleDelete = useCallback(() => {
    if (mode === 'edit' && event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  }, [mode, event, onDelete, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Create Event' : 'Edit Event'}
      description={mode === 'create' ? 'Add a new event to your calendar' : 'Update event details'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <Input
          label="Title *"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          placeholder="Event title"
          maxLength={100}
          fullWidth
          autoFocus
        />

        <Textarea
          label="Description"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
          placeholder="Event description (optional)"
          maxLength={500}
          rows={3}
          fullWidth
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            label="Start Date & Time *"
            type="datetime-local"
            value={formatDate(formData.startDate, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => handleChange('startDate', new Date(e.target.value))}
            error={errors.startDate}
            fullWidth
          />

          <Input
            label="End Date & Time *"
            type="datetime-local"
            value={formatDate(formData.endDate, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => handleChange('endDate', new Date(e.target.value))}
            error={errors.endDate}
            fullWidth
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Color *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {EVENT_COLORS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleChange('color', value)}
                  className={`w-full h-9 sm:h-10 rounded-lg border-2 transition-all hover:scale-105 focus-ring ${
                    formData.color === value ? 'border-neutral-900 ring-2 ring-neutral-300' : 'border-neutral-200'
                  }`}
                  style={{ backgroundColor: value }}
                  title={label}
                  aria-label={`Select ${label} color`}
                />
              ))}
            </div>
          </div>

          <Select
            label="Category"
            value={formData.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            options={EVENT_CATEGORIES.map(cat => ({ value: cat, label: cat }))}
            fullWidth
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-neutral-200">
          {mode === 'edit' && onDelete && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              className="sm:mr-auto w-full sm:w-auto"
            >
              Delete
            </Button>
          )}
          <div className="flex gap-2 sm:gap-3 sm:ml-auto">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="flex-1 sm:flex-none"
            >
              {mode === 'create' ? 'Create Event' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
