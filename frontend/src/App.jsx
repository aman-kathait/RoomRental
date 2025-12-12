import {Routes, Route } from "react-router-dom"
import Login from "../src/pages/Auth/Login"
import Register from "../src/pages/Auth/Signup"
import Dashboard from "../src/pages/Dashboard"
import Layout from "./pages/Layout"
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
       </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     
    </Routes>
  )
}

export default App