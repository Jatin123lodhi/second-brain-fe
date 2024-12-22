
import { ProductedRoute } from './components/ProductedRoute'
import './index.css'
import Dashboard from './pages/Dashboard'
import { SharedBrain } from './pages/SharedBrain'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<div>Home </div>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={
        <ProductedRoute><Dashboard/></ProductedRoute>
      } />
      <Route path='/brain/:id' element={<ProductedRoute><SharedBrain/></ProductedRoute>} />
    </Routes>
  </BrowserRouter>
   
}

export default App
