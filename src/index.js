import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Creating a root React DOM node to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the app within a StrictMode wrapper for enhanced development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// What this code does:

// 1. Imports necessary modules from React and ReactDOM.
// 2. Imports the main App component.
// 3. Creates a root React DOM node using ReactDOM.createRoot().
// 4. Renders the App component within a React.StrictMode wrapper for enhanced development checks.





