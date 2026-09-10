import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Categoria from './pages/Categoria'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Categoria />
  </StrictMode>,
)
