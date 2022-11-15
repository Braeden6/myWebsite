import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./configFiles/authConfig"
import './index.css';

// disable console when in production
/*
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}*/

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);

