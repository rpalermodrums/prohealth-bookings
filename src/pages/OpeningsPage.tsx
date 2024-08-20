import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const OpeningsPage = () => {
  const navigate = useNavigate();

  const handleScheduleInterview = () => {
    navigate('/schedule');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto bg-gray-50 shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold text-dark-blue text-center mb-6">Book Your Eye Care Career Interview</h1>
          <p className="text-center text-dark-blue mb-8">
            Welcome to ProHealth Resource Group's interview booking system. We're excited about your interest in joining our eye care team!
          </p>
          <div className="text-center">
            <p className="mb-6 text-dark-blue">Ready to take the next step in your eye care career? Click below to schedule your interview.</p>
            <Button onClick={handleScheduleInterview} className="text-lg bg-primary-blue hover:bg-dark-blue text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Schedule Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpeningsPage;