import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signupform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost/todoapp/todo/src/assets/signup.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Response:', responseData);
        if (responseData.success) {
          navigate('/loading');
        } else {
          alert('Signup failed!');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
     
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='TodoWrapper-login'>
        <h3>Sign Up</h3>
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
        <button className='todo-btn-login' type="submit">Sign Up</button>
      </div>
    </form>
  );
};
