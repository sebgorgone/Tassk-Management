import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../public/index.css'
import Shell from './shell.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shell />
  </StrictMode>,
)
