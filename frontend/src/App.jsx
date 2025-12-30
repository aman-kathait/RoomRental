import {Routes, Route } from "react-router-dom"
import Login from "../src/pages/Auth/Login"
import Register from "../src/pages/Auth/Signup"
import Dashboard from "./pages/Dashboard/Dashboard"
import Layout from "./pages/Layout"
import Rooms from "./pages/Rooms/Rooms"
import FindRoom from "./pages/Rooms/FindRoom"
import RoomDetails from "./pages/Rooms/RoomDetails"
import Profile from "./pages/Profile/Profile"
  import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/search-rooms" element={<FindRoom />} />
      <Route path="/get-room/:roomId" element={<RoomDetails />} />
      <Route path="/profile/:userId" element={<Profile />} />
       </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     
    </Routes>
    </>
  )
}

export default App