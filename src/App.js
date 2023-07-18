import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import SurveyQuestions from './SurveyQuestions';
import {Routes, Route, Navigate } from 'react-router-dom';
import {useAuthContext} from './Hooks/useAuthContext';

function App() {


  const {user} = useAuthContext();

  return (
    <div className="App">
      
      <Routes>
        {user ? <Route path='/' element={<SurveyQuestions />} />
        :  <Route path='/' element={<LoginForm />} />}
        <Route path='*'  element={<Navigate to={"/"}/>} />

        
      </Routes>
    </div>
  );
}

export default App;
