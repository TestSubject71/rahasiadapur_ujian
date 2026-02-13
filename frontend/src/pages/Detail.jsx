import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Debugging: Check if the URL is correct in the console
    console.log("Fetching URL:", `${import.meta.env.VITE_API_URL}/recipes/${id}`);

    axios.get(`${import.meta.env.VITE_API_URL}/recipes/${id}`)
      .then(response => {
        console.log("Data received:", response.data); // Debugging
        setRecipe(response.data);
      })
      .catch(error => console.error("Error:", error));
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return null; // Return null instead of empty string
    try {
      if (url.includes('embed')) return url;
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) { return null; }
  };

  if (!recipe) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading Recipe...</div>;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.contentWrapper}>
        
        {/* Back Button Area */}
        <div style={styles.navBar}>
          <button onClick={() => navigate('/home')} style={styles.backBtn}>
            ← Back
          </button>
          <h3 style={{ margin: 0, color: '#555' }}>Recipe Detail</h3>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          <h1 style={styles.title}>{recipe.menuName}</h1>

          {/* Video Section - Only render if videoLink exists! */}
          {recipe.videoLink && getEmbedUrl(recipe.videoLink) ? (
            <div style={styles.videoWrapper}>
              <iframe 
                src={getEmbedUrl(recipe.videoLink)} 
                title={recipe.menuName}
                style={styles.iframe}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
              (No video available for this recipe)
            </div>
          )}

          {/* Description Section */}
          <div style={styles.instructions}>
            <h3 style={{ borderBottom: '2px solid #ff9f43', display: 'inline-block', paddingBottom: '5px' }}>
              How to Cook
            </h3>
            <p style={{ whiteSpace: 'pre-line', color: '#555', lineHeight: '1.8' }}>
              {recipe.description || "No instructions provided."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    minHeight: '100vh',
    backgroundColor: '#fff3e0',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '600px',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  backBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#ff9f43',
    border: '2px solid #ff9f43',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px'
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    borderRadius: '10px',
    marginBottom: '20px',
    backgroundColor: '#000',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
  instructions: {
    textAlign: 'left',
  }
};

export default Detail;