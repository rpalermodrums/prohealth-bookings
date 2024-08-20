import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, startOfWeek } from 'date-fns';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CalendarViewProps {
  role: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ role }) => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Simulate fetching available slots from an API
    const fetchAvailableSlots = () => {
      const slots: { [key: string]: string[] } = {};
      for (let i = 0; i < 7; i++) {
        const date = format(addDays(currentWeek, i), 'yyyy-MM-dd');
        slots[date] = generateRandomSlots();
      }
      setAvailableSlots(slots);
    };

    fetchAvailableSlots();
  }, [currentWeek]);

  const generateRandomSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    for (let hour = startHour; hour < endHour; hour++) {
      if (Math.random() > 0.5) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
      if (Math.random() > 0.5) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const handleSlotSelect = (date: string, time: string) => {
    setSelectedSlot(`${date} ${time}`);
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      navigate('/details', { state: { selectedSlot, role } });
    }
  };

  const renderTimeSlots = (date: string) => {
    return availableSlots[date]?.map((time) => (
      <Button
        key={`${date}-${time}`}
        variant={selectedSlot === `${date} ${time}` ? 'default' : 'outline'}
        className={`m-1 transition-colors ${
          selectedSlot === `${date} ${time}`
            ? 'bg-primary-blue text-white hover:bg-primary-blue/90'
            : 'hover:bg-light-blue'
        }`}
        onClick={() => handleSlotSelect(date, time)}
      >
        {time}
      </Button>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={() => setCurrentWeek(addDays(currentWeek, -7))} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Week
        </Button>
        <span className="font-bold">
          {format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}
        </span>
        <Button onClick={() => setCurrentWeek(addDays(currentWeek, 7))} variant="outline">
          Next Week
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {[...Array(7)].map((_, index) => {
          const date = addDays(currentWeek, index);
          const dateStr = format(date, 'yyyy-MM-dd');
          return (
            <Card key={dateStr} className="overflow-hidden">
              <CardContent className="p-2">
                <div className="font-bold text-center mb-2 h-14 flex items-center justify-center">
                  {format(date, 'EEE, MMM d')}
                </div>
                <div className="flex flex-wrap justify-center">
                  {renderTimeSlots(dateStr)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Button
        className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white"
        disabled={!selectedSlot}
        onClick={handleConfirm}
      >
        Confirm Selection
      </Button>
    </div>
  );
};

export default CalendarView;