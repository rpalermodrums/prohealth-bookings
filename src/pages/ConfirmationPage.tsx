import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, Calendar, Clock, User } from 'lucide-react';

const generateBookingReference = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return 'PRG' + Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const ConfirmationPage = () => {
  const location = useLocation();
  const appointmentDetails = location.state?.appointmentDetails || {
    name: 'John Doe',
    date: '2023-12-15',
    time: '09:00 AM',
    position: 'Eye Care Technician',
  };

  const bookingRef = generateBookingReference();

  const handleAddToCalendar = () => {
    const { date, time, position } = appointmentDetails;
    const eventTitle = `Eye Care Interview - ${position}`;
    const eventDetails = `Interview for ${position} position at ProHealth Resource Group`;
    const eventDateTime = new Date(`${date} ${time}`);
    const endDateTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000); // Assume 1 hour duration

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&dates=${eventDateTime.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDateTime.toISOString().replace(/-|:|\.\d\d\d/g, "")}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-lg bg-gray-50">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto bg-success-green rounded-full p-3 w-20 h-20 flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-dark-blue mb-2">Interview Confirmed!</h1>
          <p className="text-dark-blue">Your eye care career interview has been scheduled successfully.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-light-blue rounded-lg p-4 space-y-3">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-primary-blue" />
              <span className="text-dark-blue">{appointmentDetails.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-primary-blue" />
              <span className="text-dark-blue">{appointmentDetails.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-primary-blue" />
              <span className="text-dark-blue">{appointmentDetails.time}</span>
            </div>
          </div>
          <p className="text-center text-dark-blue">
            <span className="font-semibold">Position:</span> {appointmentDetails.position}
          </p>
          <p className="text-center text-dark-blue">
            <span className="font-semibold">Booking Reference:</span> {bookingRef}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pt-6">
          <Button className="w-full bg-teal hover:bg-light-teal text-white" onClick={handleAddToCalendar}>
            Add to Calendar
          </Button>
          <Button variant="outline" className="w-full" onClick={() => window.location.href = '/'}>Return to Home</Button>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center text-dark-blue">
        <p>Please arrive 10 minutes early and bring a copy of your resume.</p>
        <p>If you need to reschedule, please give us at least 24 hours' notice.</p>
      </div>
    </div>
  );
};

export default ConfirmationPage;