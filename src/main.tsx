import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import {movieStore} from "./stores/movieStore.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={movieStore}>
          <App />
    </Provider>
  </StrictMode>,
)
