import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost/todoapp/todo/src/assets/login.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Response:', responseData);
        if (responseData.success) {
          navigate('/loading');
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  return (
    <div className='TodoWrapper-login'>
      <h3>
        {/* ... Your SVG and title */}
      </h3>
      <form onSubmit={handleFormSubmit}>
        <h2>Email:</h2>
        <input
          className='todo-input-login'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2>Password:</h2>
        <input
          className='todo-input-login'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='todo-btn-login' type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
