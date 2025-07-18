import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import Shell from './shell.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shell />
  </StrictMode>,
)
