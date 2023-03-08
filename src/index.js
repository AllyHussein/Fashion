import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { theme } from "./theme"
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import cartReducer from "./state"
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer : {
    cart : cartReducer
  }
})

root.render(

  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);