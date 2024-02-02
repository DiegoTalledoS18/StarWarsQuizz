import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

const theme = createTheme({
    palette: {
        primary: {
            main: "#F2BC02",
        },
        secondary: {
            main: "#ffffff",
        },
    },
});

import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CssBaseline />
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <App></App>
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
