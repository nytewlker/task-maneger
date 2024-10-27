// src/components/NotFound.js
import React, { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    const heading = document.querySelector('.not-found-heading');
    heading.classList.add('fade-in');
  }, []);

  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3555/3555168.png" // Replace with your desired vector image URL
        alt="Page Not Found"
        style={styles.image}
      />
      <h1 className="not-found-heading" style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>The page you are looking for does not exist.</p>
      <a href="/" style={styles.button}>Go Back to Home</a>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-in forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa', // Light background color
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    padding: '20px',
  },
  image: {
    maxWidth: '300px',
    marginBottom: '20px',
    animation: 'bounce 2s infinite', // Simple bounce animation
  },
  heading: {
    color: '#dc3545', // Bootstrap danger color for the header
  },
  paragraph: {
    color: '#6c757d', // Bootstrap secondary text color
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#007bff', // Bootstrap primary color
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

// Adding hover effect for the button
// const buttonHoverStyle = {
//   '&:hover': {
//     backgroundColor: '#0056b3', // Darker shade for hover effect
//   },
// };

export default NotFound;
