import { Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Promo from './component/Promo/Promo'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cablist" element={<Promo />} />
    </Routes>
  )
}

export default App
