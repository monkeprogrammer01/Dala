import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './components/Sidebar.jsx'
import MapView from './components/MapView.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NationPage from './components/NationPage.jsx'
import MainPage from './components/MainPage.jsx'
import AddNationForm from './components/AddNationForm.jsx'
function App() {

  return (
    <>
      <Router>
        <Sidebar />  
        <div className="App">
                  <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/map" element={<MapView />} />

          <Route path="/:slug" element={<NationPage />} />
          <Route path="/add" element={<AddNationForm />} />
        </Routes>
        </div> 

      </Router>
    </>
  )
}

export default App;
