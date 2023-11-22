import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { SignIn } from './pages/login'

function App() {
  

  return (
    <div >
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
