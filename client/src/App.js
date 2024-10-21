import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Projects from './pages/Projects/Project'; // Import the Projects component
import Tasks from './pages/Tasks/Task'; // Import the Tasks component
import Settings from './pages/panels/Setting'; // Import the Settings component
import NotFound from './components/NotFound'; // Ensure you have a NotFound component for 404 pages
import Layout from './components/Layout'; // Import Layout
import Home from './pages/Home'; // Use capitalized name for Home component
import ContactUs from './pages/Contact'; // Use capitalized name for ContactUs component
import AboutUs from './pages/About'; // Use capitalized name for AboutUs component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes here */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Default route to the Home component */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Projects />} /> {/* Route for Projects */}
            <Route path="/tasks" element={<Tasks />} /> {/* Route for Tasks */}
            <Route path="/settings" element={<Settings />} /> {/* Route for Settings */}
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
