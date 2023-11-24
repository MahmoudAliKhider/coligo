import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { SignIn } from './pages/login'
import { SignUp } from './pages/SignUp'
// import { Navbar } from './components/NavBar'
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from './pages/Dashboard'
import Schedule from './pages/Schedule'
import { Announcement } from './pages/Announcement'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* <Route path="/dashboard/*" element={<PrivateRoute />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule/:quizId" element={<Schedule />} />
            <Route path="/announcement" element={<Announcement />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
