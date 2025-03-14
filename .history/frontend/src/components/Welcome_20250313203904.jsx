import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../images/background.png';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
        🌟 Welcome to Nova's Tarot Magic! 🌟
      </h1>
      <p className="text-xl text-gray-100 mb-6">
        I'm Nova, your guide through the mysteries of tarot.
      </p>
      <button
        className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-800"
        onClick={() => navigate('/input')}
      >
        Start Your Journey
      </button>
    </div>
  );
};

export default Welcome;
