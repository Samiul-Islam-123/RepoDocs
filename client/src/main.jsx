import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createAppTheme } from './theme.js'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { SocketProvider } from './context/SocketContext.jsx'

const theme = createAppTheme()
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <SocketProvider>

      <BrowserRouter>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BrowserRouter>
      </SocketProvider>
    </ClerkProvider>
)