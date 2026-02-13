import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/recipes`)
      .then(response => setRecipes(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={styles.pageBackground}>
      <div style={styles.contentWrapper}>
        
        {/* Header Section */}
        <header style={styles.header}>
          <h2 style={{ margin: 0 }}> Menu</h2>
          <button onClick={() => navigate('/')} style={styles.logoutBtn}>Logout</button>
        </header>

        {/* The Grid */}
        <div style={styles.grid}>
          {recipes.map((recipe) => (
            <div key={recipe._id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img 
                  src={recipe.image} 
                  alt={recipe.menuName} 
                  style={styles.image} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }} 
                />
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{recipe.menuName}</h3>
                <button 
                  onClick={() => navigate(`/recipe/${recipe._id}`)}
                  style={styles.button}
                >
                  See Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  // 1. Makes the whole page background colored
  pageBackground: {
    minHeight: '100vh',
    backgroundColor: '#fff3e0',
    display: 'flex',
    justifyContent: 'center', // Centers the wrapper horizontally
    padding: '20px',
  },
  // 2. The "Mobile View" Container
  contentWrapper: {
    width: '100%',
    maxWidth: '800px', // Limits width on big screens to look like an app
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  logoutBtn: {
    padding: '8px 12px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Auto-adjusts for mobile vs desktop
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    backgroundColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '15px',
    textAlign: 'center',
  },
  cardTitle: {
    margin: '0 0 15px 0',
    fontSize: '18px',
    color: '#333',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff9f43',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  }
};

export default Home;