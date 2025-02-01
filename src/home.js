import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1> Custom Greeting Card Maker</h1>
      <button onClick={() => navigate('/editor')}>Start Designing</button>
    </div>
  );
};

export default Home;
