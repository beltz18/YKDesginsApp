import React           from 'react'
import ReactDOM        from 'react-dom/client'
import App             from './App'
import reportWebVitals from './reportWebVitals'
import * as service    from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals()
service.register()