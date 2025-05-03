import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './components/Sidebar.jsx'
import MapView from './components/MapView.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NationPage from './components/NationPage.jsx'
function App() {

  return (
    <>
      <Router>
        <Sidebar />  
        <div className="MapView">
                  <Routes>
          
          <Route path="/" element={<MapView />} />

          <Route path="/:slug" element={<NationPage />} />
        </Routes>
        </div> 

      </Router>
    </>
  )
}

export default App;
