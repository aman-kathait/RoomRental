import {Routes, Route } from "react-router-dom"
import Login from "../src/pages/Auth/Login"
import Register from "../src/pages/Auth/Signup"
import Dashboard from "./pages/Dashboard/Dashboard"
import Layout from "./pages/Layout"
import Rooms from "./pages/Rooms/Rooms"
import FindRoom from "./pages/Rooms/FindRoom"
import RoomDetails from "./pages/Rooms/RoomDetails"
import Profile from "./pages/Profile/Profile"
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/search-rooms" element={<FindRoom />} />
      <Route path="/get-room/:roomId" element={<RoomDetails />} />
      <Route path="/profile" element={<Profile />} />
       </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     
    </Routes>
  )
}

export default App