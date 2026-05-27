import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Competitions from './pages/Competitions'
import Certifications from './pages/Certifications'
import ProjectWorks from './pages/ProjectWorks'
import Responsibilities from './pages/Responsibilities'
import Contact from './pages/Contact'

function App() {
  const location = useLocation()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/project-works" element={<ProjectWorks />} />
            <Route path="/responsibilities" element={<Responsibilities />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default App
