import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createAppTheme } from './theme.js'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'

const theme = createAppTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)