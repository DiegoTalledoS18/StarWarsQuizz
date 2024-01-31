import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <App></App>
      </ThemeProvider>

  </React.StrictMode>,
)
