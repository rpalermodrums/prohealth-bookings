import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import OpeningsPage from './pages/OpeningsPage';
import InterviewScheduler from './components/InterviewScheduler';
import AppointmentDetailsPage from './pages/AppointmentDetailsPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<OpeningsPage />} />
          <Route path="/schedule" element={<InterviewScheduler />} />
          <Route path="/details" element={<AppointmentDetailsPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;