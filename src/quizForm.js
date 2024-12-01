import React, { useState } from 'react';

function QuizForm() {
  const [quizData, setQuizData] = useState({
    title: '',
    category: 'general',
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: ''
  });

  const handleChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send quiz data to backend
    try {
      const response = await fetch('http://localhost:5000/api/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Quiz created successfully!');
      } else {
        alert('Error creating quiz.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="quiz-form">
      <h1>Create Your Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={quizData.title}
          onChange={handleChange}
          placeholder="Quiz Title"
          required
        />
        <select
          name="category"
          value={quizData.category}
          onChange={handleChange}
        >
          <option value="general">General Knowledge</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
        <input
          type="text"
          name="question"
          value={quizData.question}
          onChange={handleChange}
          placeholder="Enter question"
          required
        />
        {quizData.answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            name={`answer${index + 1}`}
            value={quizData.answers[index]}
            onChange={(e) => {
              const newAnswers = [...quizData.answers];
              newAnswers[index] = e.target.value;
              setQuizData({ ...quizData, answers: newAnswers });
            }}
            placeholder={`Answer ${index + 1}`}
            required
          />
        ))}
        <select
          name="correctAnswer"
          value={quizData.correctAnswer}
          onChange={handleChange}
          required
        >
          {quizData.answers.map((answer, index) => (
            <option key={index} value={`answer${index + 1}`}>
              {answer}
            </option>
          ))}
        </select>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}

export default QuizForm;
