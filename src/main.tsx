import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { LandingRouter } from './features/landing/application/LandingRouter'
import { DocsRouter } from './features/docs/application/DocsRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/docs/*' element={<DocsRouter />} />
        <Route path='/*' element={<LandingRouter />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
