import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import reportWebVitals from "./reportWebVitals";


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
   <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
)


reportWebVitals()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals