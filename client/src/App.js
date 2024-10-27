import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'; // Import Layout

import Home from './pages/Home'; // Use capitalized name for Home component
import AboutUs from './pages/About'; // Use capitalized name for AboutUs component
import ContactUs from './pages/Contact'; // Use capitalized name for ContactUs component
import NotFound from './components/NotFound'; // Ensure you have a NotFound component for 404 pages

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import Dashboard from './pages/panels/dashboard';
import CreateProject from './pages/panels/project/CreateProject';
import Settings from './pages/panels/Setting'; // Import the Settings component


import AddEditProject from './pages/panels/project/AddEditProject';
import ProjectDetails from './pages/panels/project/ProjectDetails';
import Projects from './pages/panels/project/Projects';
import ForgotPassword from './pages/Auth/forgetpassword';
import VerifyCode from './pages/Auth/verifycode';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes here */}
        <Routes>
          <Route path="/" element={<Layout panel={'dashboard'} />}> {/* Pass 'dashboard' as a string */}
            <Route index element={<Home />} /> {/* Default route to the Home component */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget" element={<ForgotPassword />} />
            <Route path="/verify" element={<VerifyCode />} />
          </Route>
          <Route path="/" element={<Layout panel={'userPanel'} />}>
            <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Projects */}
            <Route path="/createproject" element={<CreateProject />} /> {/* Route for Tasks */}
            <Route path="/setting" element={<Settings />} /> {/* Route for Settings */}

            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/add" element={<AddEditProject />} />
            <Route path="/projects/edit/:id" element={<AddEditProject />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
