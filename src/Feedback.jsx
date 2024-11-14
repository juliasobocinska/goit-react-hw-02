import React from 'react';

const Feedback = ({ feedback }) => {
    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const totalPositive = Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100);


    return (
        <div>
            <p>Good: {feedback.good}</p>
            <p>Neutral: {feedback.neutral}</p>
            <p>Bad: {feedback.bad}</p>
            <p>Total: {totalFeedback}</p>
            <p>Positive: {totalPositive}%</p>

        </div>
    )
}

export default Feedback;