import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async' // 1. Importar
import './index.css'
import App from './App.tsx'
import ReactGA from "react-ga4";

ReactGA.initialize("G-6G4C2BDD4X");
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Envolver a App */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)