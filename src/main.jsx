// this is the entry point of our React app
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

// render the App inside the div with id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <ErrorBoundary> 
         <App />
       </ErrorBoundary>
  </React.StrictMode>
)
