import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './features'


createRoot(document.getElementById('root')!).render(
  <Suspense>
      <RouterProvider router={router}></RouterProvider>
  </Suspense>,
)
