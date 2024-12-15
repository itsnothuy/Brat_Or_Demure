// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [username, setUsername] = useState('');
//   const [result, setResult] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/generate', { username });
//       setResult(response.data.result);
//     } catch (error) {
//       setResult('Error generating response. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>BRAT or Demure?</h1>
//       <input
//         type="text"
//         placeholder="Enter Instagram username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? 'Loading...' : 'Submit'}
//       </button>
//       {result && <p style={{ marginTop: '20px' }}>{result}</p>}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/generate', { username });
      setResult(response.data.result);
    } catch (error) {
      setResult('Error generating response. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-instagram text-white">
      <h1 className="text-4xl font-bold mb-4 text-shadow">BRAT or <span className="text-purple">Demure?</span></h1>
      
      <div className="w-4/5 max-w-md bg-white rounded-lg p-6 shadow-lg text-black text-center">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 text-lg mb-4"
          placeholder="Enter your IG handle to discover your vibe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className={`w-full py-2 px-4 text-lg font-semibold rounded-md ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple hover:bg-purple-700 text-white'
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Loading...' : "What's My Vibe?"}
        </button>
      </div>

      {result && (
      <div className="mt-6 bg-white rounded-lg p-6 shadow-lg text-black w-4/5 max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-purple">
          {result.startsWith('BRAT') ? 'BRAT ⚡' : 'Demure 🌸'}
        </h2>
        <p className="text-lg whitespace-pre-line">{result}</p> {/* Preserves line breaks */}
      </div>
      )}
    </div>
  );
};

export default App;
