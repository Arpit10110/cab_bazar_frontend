import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Promo from './component/Promo/Promo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cablist" element={<Promo />} />
      </Routes>
    </Router>
  )
}

export default App
