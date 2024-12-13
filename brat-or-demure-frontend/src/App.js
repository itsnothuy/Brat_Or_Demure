import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate', { username });
      setResult(response.data.result);
    } catch (error) {
      setResult('Error generating response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>BRAT or Demure?</h1>
      <input
        type="text"
        placeholder="Enter Instagram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
      {result && <p style={{ marginTop: '20px' }}>{result}</p>}
    </div>
  );
};

export default App;
