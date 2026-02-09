import Homepage from './pages/Homepage'
import StudentAccess from './pages/StudentAccess'
import EmployeeAccess from './pages/EmployeeAccess'
import './App.css'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/student" element={<StudentAccess />} />
      <Route path="/employee" element={<EmployeeAccess />} />
    </Routes>
  )
}

export default App
