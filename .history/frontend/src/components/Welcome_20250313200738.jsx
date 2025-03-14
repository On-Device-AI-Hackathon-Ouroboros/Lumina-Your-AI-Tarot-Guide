// Welcome.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigateToNextPage = () => {
    // 跳转到下一个页面（用户输入页面）
    // 例如：navigate('/user-input') 使用 react-router-dom
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <img src="/nova.gif" alt="Nova" className="w-48 h-48 mb-6" />
      <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
        🌟 Welcome to Nova's World! 🌌
      </h1>
      <p className="text-xl text-white font-medium">
        Let Nova guide you through your magical journey!
      </p>
      <button
        onClick={novaGreeting}
        className="mt-8 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-purple-800 transition"
      >
        Start Adventure ✨
      </button>
    </div>
  );
}

export default Welcome;
