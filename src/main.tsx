import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./main.css"

// if (navigator.userAgent.indexOf('iPhone') > -1) {
//   document.querySelector("[name=viewport]")!.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
// }
//code above targets iphone safary to add maximum scale which fixes annoying zoom on input. Shouldn't change anything on other browsers, so I decided to statically add it to html

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
