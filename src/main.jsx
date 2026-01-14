import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'rsuite/dist/rsuite-no-reset.css'
import { HelmetProvider } from 'react-helmet-async'
// Buni o'chiring: import 'rsuite/dist/rsuite-no-reset.css'
// Buni qo'shing:
import 'rsuite/dist/rsuite.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)
