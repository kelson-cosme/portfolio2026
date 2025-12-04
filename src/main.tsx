import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async' // 1. Importar
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Envolver a App */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)