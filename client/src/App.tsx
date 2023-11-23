import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { SignIn } from './pages/login'
import { SignUp } from './pages/SignUp'
// import { Navbar } from './components/NavBar'
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from './pages/Dashboard'
import Schedule from './pages/Schedule'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
          <Route path="/dashboard/*" element={<PrivateRoute />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
