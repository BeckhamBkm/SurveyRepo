import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './survey.css'
import NavBar from './NavBar';
import {useAuthContext} from './Hooks/useAuthContext';


function SurveyQuestions() {

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const {user, dispatch} = useAuthContext();
  const [, setUserAnswers] = useState([]);


  const onLogout = () =>{

 
    localStorage.removeItem('authState', JSON.stringify(null));
    localStorage.removeItem('surveyAnswers', JSON.stringify(null));
    localStorage.removeItem('currentQuestionIndex', JSON.stringify(null));
    
    dispatch({type:'LOGOUT'})
  
  }

  

  useEffect(() => {

    const storedAnswers = JSON.parse(localStorage.getItem('surveyAnswers'));
    const storedQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);

    if (storedAnswers) {
      setAnswers(storedAnswers);
    }

    if (storedQuestionIndex > 0) {
      setCurrentQuestionIndex(storedQuestionIndex);
    }
    async function fetchQuestions() {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
  }, [answers, currentQuestionIndex]);

  const handleNextQuestion = (event) => {
    event.preventDefault();
    const inputType = questions[currentQuestionIndex].input_type;
    let selectedValue;


    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questions[currentQuestionIndex].question_id, answer: selectedValue },
    ]);

    if (inputType === 'checkbox') {
      const selectedOptions = Array.from(event.target.elements.answer)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      selectedValue = selectedOptions.join(', ');
    } else if (inputType === 'multiple_select') {
      selectedValue = Array.from(event.target.elements.answer)
        .filter((option) => option.selected)
        .map((option) => option.value)
        .join(', ');
    } else {
      selectedValue = event.target.answer.value;
    }
    
    // setUserAnswers((prevAnswers) => [
    //   ...prevAnswers,
    //   { questionId: questions[currentQuestionIndex].question_id, answer: selectedValue },
    // ]);

    axios.post('http://localhost:3001/answers', {
      userId: user.username,
      answers: [
        { questionId: questions[currentQuestionIndex]._id, answer: selectedValue },
      ],
    })
      .then(response => { 
        console.log('Answer posted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error posting answer:', error);
      });

    console.log(answers)
    setCurrentQuestionIndex((prevState) => prevState + 1);
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
  };


  const handlePrevQuestion = (event) => {
    event.preventDefault();
    setCurrentQuestionIndex((prevState) => prevState - 1);
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + questions.map((question, index) => {
        const answer = answers[index] || '';
        return `${question.question_text}, ${answer}`;
      }).join('\n');
    const encodedURI = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedURI);
    link.setAttribute('download', 'survey_responses.csv');
    document.body.appendChild(link);
    link.click();

  
  }


  
  
  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h1>Survey Responses!</h1>
        <ul>
  {questions.map((question, index) => (
    <li key={question.question_id}>
      <h3>{question.question_text}</h3>
      {question.input_type === 'checkbox' ? (
        <ul>
          {answers[index].split(', ').map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      ) : (
        <p>{answers[index]}</p>
      )}
    </li>
  ))}
</ul>
<button onClick={downloadCSV}>Download as CSV</button>
<button onClick={onLogout}>Logout</button>
      </div>
    );
  }

  if(user)
  return (
     
    <div>

     <NavBar username={user.username} onLogout={onLogout} />
      <h1>Question {currentQuestionIndex + 1}</h1>
      <form onSubmit={handleNextQuestion}>
        <h3>{questions[currentQuestionIndex].question_text}</h3>
        {questions[currentQuestionIndex].input_type === 'numerical' && (
          <input type="number" name="answer" defaultValue={answers[currentQuestionIndex] || '' }  required min={1} />
        )}
        {questions[currentQuestionIndex].input_type === 'text' && (
          <input type="text" name="answer" defaultValue={answers[currentQuestionIndex] || ''} required />
        )}
        {questions[currentQuestionIndex].input_type === 'checkbox' && (
          <>
            {questions[currentQuestionIndex].options.map((option) => (
              <div key={option}>
                <input type="checkbox" id={option} name="answer" value={option} multiple defaultValue={answers[currentQuestionIndex] || '' }/>
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </>
        )}
        {questions[currentQuestionIndex].input_type === 'multiple_select' && (
          <select name="answer" defaultValue={answers[currentQuestionIndex.options]} multiple required>
            {questions[currentQuestionIndex].options.map((option) => (
              <option key={option} value={option} selected={
                answers[currentQuestionIndex] &&
                answers[currentQuestionIndex].includes(option)
              } >
                {option}
              </option>
            ))}
          </select>
        )}
        
        {currentQuestionIndex > 0 && (
          <button onClick={handlePrevQuestion}>Previous</button>
        )}
        <button type="submit">Next</button>
      </form>

    </div>
        
  );
        
}

export default SurveyQuestions;
