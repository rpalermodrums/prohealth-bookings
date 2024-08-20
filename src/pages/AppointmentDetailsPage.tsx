import { BaseSyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, UseFormTrigger } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { IMaskInput } from 'react-imask';

// Define the schema for form validation
const formSchema = z.object({
  title: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  middleInitial: z.string().max(1).optional(),
  lastName: z.string().min(1, 'Last name is required'),
  suffix: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone number must be in the format (123) 456-7890'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

const AppointmentDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSlot, role } = location.state || {};

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');

  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const handlePhoneChange = (value: string, trigger: UseFormTrigger<any>) => {
    setPhoneValue(value);
    setValue('phone', value);
    trigger('phone');
  };

  const onSubmit = (data: any) => {
    navigate('/confirmation', { 
      state: { 
        appointmentDetails: {
          ...data,
          date: selectedSlot.split(' ')[0],
          time: selectedSlot.split(' ')[1],
          position: role,
        }
      }
    });
  };
  const handleFormSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    e?.preventDefault();
    setIsSubmitted(true);
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)(e);
    }
  };

  const formattedDate = selectedSlot ? format(new Date(selectedSlot), "MMMM d, yyyy 'at' h:mm a") : '';

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-lg bg-gray-50">
        <CardHeader className="pb-6">
          <h1 className="text-3xl font-bold text-dark-blue text-center">Interview Details</h1>
          <p className="text-center text-dark-blue mt-2">
            {selectedSlot ? `Selected interview slot: ${formattedDate}` : 'Please fill in your details'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <Label htmlFor="firstName" className="text-left block mb-2 pl-2">
                  First Name <span className="text-left text-error-red">*</span>
                </Label>
                <Input 
                  id="firstName" 
                  {...register('firstName')}
                  placeholder="John" 
                  className={`w-full bg-white pl-3 ${isSubmitted && errors.firstName ? 'border-error-red' : ''}`}
                />
                {isSubmitted && errors.firstName && <p className="text-left text-error-red text-sm mt-1 pl-3">{errors.firstName.message?.toString()}</p>}
              </div>
              <div className="col-span-2">
                <Label htmlFor="lastName" className="text-left block mb-2 pl-3">
                  Last Name <span className="text-left text-error-red">*</span>
                </Label>
                <Input 
                  id="lastName" 
                  {...register('lastName')}
                  placeholder="Doe" 
                  className={`w-full bg-white pl-3 ${isSubmitted && errors.lastName ? 'border-error-red' : ''}`}
                />
                {isSubmitted && errors.lastName && <p className="text-left text-error-red text-sm mt-1 ">{errors.lastName.message?.toString()}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-left block mb-2 pl-2">
                Email <span className="text-left text-error-red">*</span>
              </Label>
              <Input 
                id="email" 
                type="email" 
                {...register('email')}
                placeholder="john@example.com" 
                className={`w-full bg-white pl-3 ${isSubmitted && errors.email ? 'border-error-red' : ''}`}
                aria-invalid={isSubmitted && errors.email ? 'true' : 'false'}
              />
              {isSubmitted && errors.email && <p className="text-left text-error-red text-sm mt-1 pl-3">{errors.email.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-left block mb-2 pl-2">
                Phone Number <span className="text-left text-error-red">*</span>
              </Label>
              <IMaskInput
                mask="(000) 000-0000"
                value={phoneValue}
                onAccept={(value) => handlePhoneChange(value, trigger)}
                {...register('phone')}
                placeholder="(123) 456-7890"
                className={`w-full h-10 px-3 py-2 rounded-md border bg-white pl-3 ${errors.phone ? 'border-error-red' : 'border-input'}`}
              />
              {isSubmitted && errors.phone && <p className="text-left text-error-red text-sm mt-1 pl-3">{errors.phone.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-left block mb-2 pl-2">Additional Information (Optional)</Label>
              <Textarea 
                id="notes" 
                {...register('notes')}
                placeholder="Any additional information or questions..." 
                className="w-full bg-white pl-3"
                rows={4}
                maxLength={500}
              />
              {isSubmitted && errors.notes && <p className="text-left text-error-red text-sm mt-1 pl-3">{errors.notes.message?.toString()}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary-blue hover:bg-dark-blue text-white font-bold py-3 rounded-lg transition duration-300">
              Confirm Interview
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentDetailsPage;