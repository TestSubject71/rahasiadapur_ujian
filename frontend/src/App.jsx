import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: Login Page (Default) */}
        <Route path="/" element={<Login />} />
        
        {/* Route 2: Register Page */}
        <Route path="/register" element={<Register />} />
        
        {/* Route 3: Home Page (Menu) */}
        <Route path="/home" element={<Home />} />
        
        {/* Route 4: Detail Page (Dynamic ID) */}
        <Route path="/recipe/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;