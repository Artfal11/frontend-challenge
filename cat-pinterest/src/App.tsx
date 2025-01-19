import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import CatList from './components/CatList';
import FavoriteCats from './components/FavoriteCats';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-[#2196F3] h-[7vh] shadow-md mb-4">
          <div className="container mx-auto h-full flex items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[14px] px-[16px] h-full flex items-center transition-colors ${
                  isActive ? 'bg-[#1E88E5] text-white' : 'text-[rgba(255,255,255,0.7)] hover:text-white'
                }`
              }
            >
              Все котики
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `text-[14px] px-[16px] h-full flex items-center transition-colors ${
                  isActive ? 'bg-[#1E88E5] text-white' : 'text-[rgba(255,255,255,0.7)] hover:text-white'
                }`
              }
            >
              Любимые котики
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<CatList />} />
          <Route path="/favorites" element={<FavoriteCats />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;