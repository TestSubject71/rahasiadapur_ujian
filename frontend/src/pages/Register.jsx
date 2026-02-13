import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, { username, password });
      alert('Registration Successful! Please Login.');
      navigate('/'); // Redirect to Login Page
    } catch (error) {
      alert('Registration Failed: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p>
          Already have an account? <span onClick={() => navigate('/')} style={styles.link}>Login here</span>
        </p>
      </div>
    </div>
  );
}

// Simple Inline CSS
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff3e0' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center', color :'black' },
  inputGroup: { marginBottom: '15px', textAlign: 'left' },
  input: { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' },
  link: { color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }
};

export default Register;