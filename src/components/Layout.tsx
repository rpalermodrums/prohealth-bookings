import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-light-blue">
      <header className="bg-primary-blue shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {location.pathname !== '/' && (
            <Button variant="ghost" onClick={() => navigate(-1)} className="text-white">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          )}
          <h1 
            className="text-2xl font-bold text-white cursor-pointer" 
            onClick={handleHome}
          >
            ProHealth Resource Group
          </h1>
          <div className="w-20"></div> {/* Spacer to balance the layout */}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;