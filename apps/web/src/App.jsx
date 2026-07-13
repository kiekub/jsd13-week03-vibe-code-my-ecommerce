import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Hosts from './pages/Hosts'
import HostDetail from './pages/HostDetail'
import Plans from './pages/Plans'
import BookingPage from './pages/BookingPage'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hosts" element={<Hosts />} />
            <Route path="/hosts/:id" element={<HostDetail />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
