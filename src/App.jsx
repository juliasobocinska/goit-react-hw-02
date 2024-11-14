import { useState, useEffect } from 'react';
import './App.css';
import Options from './Options.jsx';
import Feedback from './Feedback.jsx';
import Notification from './Notification.jsx';

function App() {
  // Pobieramy stan z localStorage lub ustawiamy początkowe wartości, obsługując ewentualne błędy
  const [feedback, setFeedback] = useState(() => {
    try {
      const savedFeedback = JSON.parse(localStorage.getItem('feedback'));
      return savedFeedback || { good: 0, neutral: 0, bad: 0 };
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => {
      const updatedFeedback = {
        ...prevFeedback,
        [feedbackType]: prevFeedback[feedbackType] + 1,
      };
      localStorage.setItem('feedback', JSON.stringify(updatedFeedback)); // Zapisujemy do localStorage
      return updatedFeedback;
    });
  };

  const resetFeedback = () => {
    const resetFeedbackState = { good: 0, neutral: 0, bad: 0 };
    setFeedback(resetFeedbackState);
    localStorage.setItem('feedback', JSON.stringify(resetFeedbackState)); // Resetujemy także w localStorage
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <>
      <div>
        <h1>Sip Happens Café</h1>
        <p>Please leave your feedback about our service by selecting one of the options below.</p>

        <Options 
          updateFeedback={updateFeedback}
          resetFeedback={resetFeedback} 
          totalFeedback={totalFeedback} 
        />

        {totalFeedback > 0 ? (
          <Feedback feedback={{ ...feedback, total: totalFeedback, positive: positiveFeedback }} />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}

export default App;
