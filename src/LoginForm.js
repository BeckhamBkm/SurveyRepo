import React, {useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import './Login.css';





function LoginForm() {

  const {dispatch} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const navigate = useNavigate();

  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('http://localhost:3001/users/login',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({username,password})
    });

    if(!response.ok){
      const errorData = await response.json();
      console.error(errorData.message);
      return;
    }
    const data = await response.json();
    dispatch({type:'LOGIN',payload:data})
    navigate('/survey');

    const storedState = localStorage.getItem('data');
    if (storedState) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedState) });
    }
    localStorage.setItem('authState', JSON.stringify(data));

  }
 
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    if(username.length < 4){
        return alert("Username must be at least 4 characters long");
    }

    if(password.length < 5){
        return alert("Password must be at least 5 characters long");
    }

    const response = await fetch('http://localhost:3001/users/register',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        body:JSON.stringify({username,password})
    });

    if(!response.ok){
      const errorData = await response.json();
      console.error(errorData.message);
      return;
    }

    const data = await response.json();
    dispatch({type:'LOGIN',payload:data});
    navigate('/survey');
    console.log(data);
    
  }

  const toggleMode = () => {
    setUsername('');
    setPassword('');
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
        <div className="login-form">
          <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
          <form onSubmit={isLoginMode ? handleLoginSubmit : handleRegistrationSubmit}>
            <label>
              <span>Username:</span>
              <input type="text" value={username} onChange={handleUsernameChange} />
</label>
<label>
<span>Password:</span>
<input type="password" value={password} onChange={handlePasswordChange} />
</label>
<button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
</form>
<button onClick={toggleMode}>
{isLoginMode ? 'Create new account' : 'Back to login'}
</button>
</div>
</>
);
}

export default LoginForm;
