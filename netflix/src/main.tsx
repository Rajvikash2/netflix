import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='478427529114-m59uau1edtekkfu7a8nimmpdvqjrnvje.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
)
