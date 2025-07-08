import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;




// src/App.js
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthContext';

// App-level error fallback
function AppErrorFallback({ error }) {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#fff8f8',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      margin: '2rem'
    }}>
      <h2>Application Error</h2>
      <pre style={{ 
        color: '#d32f2f',
        whiteSpace: 'pre-wrap',
        textAlign: 'left'
      }}>
        {error.message}
      </pre>
      <button 
        onClick={() => window.location.reload()}
        style={{
          padding: '0.5rem 1rem',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        Reload Application
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

