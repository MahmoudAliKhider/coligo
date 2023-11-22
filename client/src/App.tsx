import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { SignIn } from './pages/login'
import { SignUp } from './pages/SignUp'

function App() {
  

  return (
    <div >
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
