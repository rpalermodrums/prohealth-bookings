import { useState } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import CalendarView from './CalendarView';

const InterviewScheduler = () => {
  const [role, setRole] = useState<string | null>(null);

  const handleRoleSelect = (value: string) => {
    setRole(value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-bold text-dark-blue text-center flex-grow">Schedule Your Eye Care Interview</h2>
      </CardHeader>
      <CardContent className="px-8 py-6">
        {!role ? (
          <div className="space-y-6">
            <Label htmlFor="role" className="text-lg">Select the eye care role you're interviewing for:</Label>
            <Select onValueChange={handleRoleSelect}>
              <SelectTrigger id="role" className="w-full max-w-xs mx-auto">
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="optometrist">Optometrist</SelectItem>
                <SelectItem value="optician">Optician</SelectItem>
                <SelectItem value="technician">Eye Care Technician</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <>
            <p className="mb-6 text-dark-blue text-lg">
              As an {role === 'optometrist' ? 'Optometrist' : role === 'optician' ? 'Optician' : 'Eye Care Technician'}, 
              you'll play a crucial role in providing top-quality care to our patients, 
              {role === 'optometrist' ? ' conducting comprehensive eye exams and diagnosing eye conditions.' :
               role === 'optician' ? ' fitting and dispensing corrective lenses and frames.' :
               ' assisting with examinations and ensuring a smooth clinic experience.'}
            </p>
            <CalendarView role={role} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InterviewScheduler;