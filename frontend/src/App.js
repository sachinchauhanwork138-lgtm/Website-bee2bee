import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="Philosophy">
        <div style={{ position: 'absolute', right: 0, top: 0, width: '50vw', height: '100%' }}>
          <img src="path/to/image.jpg" alt="Philosophy Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
        {/* Other content of the Philosophy section */}
      </section>
    </div>
  );
}

export default App;