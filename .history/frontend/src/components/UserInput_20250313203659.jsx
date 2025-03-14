import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInput = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [birthday, setBirthday] = React.useState('');

  const handleSubmit = () => {
    navigate('/features');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
      <h2 className="text-3xl font-bold mb-6">Tell Nova about yourself!</h2>
      <input
        type="text"
        placeholder="Enter your username"
        className="mb-4 px-4 py-2 rounded border"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="date"
        className="mb-4 px-4 py-2 rounded border"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-800"
        onClick={handleSubmit}
      >
        Next
      </button>
    </div>
  );
};

export default UserInput;
