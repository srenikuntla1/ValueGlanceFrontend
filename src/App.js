import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Posts from './components/Posts';
import GetBlogPost from './components/GetBlogPost';
import EditBlogPost from './components/EditBlogPost';
import './App.css';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
    // Optionally, redirect the user to the home page or login page after logout
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
          <div className="flex space-x-4">
            <Link to="/" className="px-2 py-1 hover:bg-gray-700 rounded">Home</Link>
            {!token && <Link to="/register" className="px-2 py-1 hover:bg-gray-700 rounded">Register</Link>}
            {!token && <Link to="/login" className="px-2 py-1 hover:bg-gray-700 rounded">Login</Link>}
            {token && <Link to="/posts" className="px-2 py-1 hover:bg-gray-700 rounded">Posts</Link>}
          </div>
          {token && (
            <button onClick={handleLogout} className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded">
              Logout
            </button>
          )}
        </nav>
        <main className="flex-grow flex items-center justify-center bg-gray-100 p-8">
          <Routes>
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login setToken={setToken} />}
            />
            <Route
              path="/posts"
              element={token ? <Posts token={token} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/posts/:id"
              element={token ? <GetBlogPost token={token} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/posts/:id/edit"
              element={token ? <EditBlogPost token={token} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">Welcome to the Blog</h1>
                  <p className="text-lg mb-6">Explore the world of blogging with us. Share your thoughts and read what others have to say.</p>
                  {!token ? (
                    <div>
                      <Link to="/register" className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Register</Link>
                      <Link to="/login" className="mx-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">Login</Link>
                    </div>
                  ) : (
                    <Link to="/posts" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Go to Posts</Link>
                  )}
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; {new Date().getFullYear()} Blog App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;