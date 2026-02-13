import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      
      // Optional: Save user info if needed
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert('Login Successful!');
      navigate('/home'); // Redirect to Home Page
    } catch (error) {
      alert('Login Failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🍳 Rahasia Dapur</h1>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label>Username:</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p>
          Don't have an account? <span onClick={() => navigate('/register')} style={styles.link}>Register here</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff3e0' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center', color : 'black' },
  inputGroup: { marginBottom: '15px', textAlign: 'left' },
  input: { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { width: '100%', padding: '10px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' },
  link: { color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }
};

export default Login;